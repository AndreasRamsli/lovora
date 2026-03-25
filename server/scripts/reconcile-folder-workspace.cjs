#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const SERVER_ROOT = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(SERVER_ROOT, ".env") });
dotenv.config({
  path: path.join(SERVER_ROOT, ".env.development"),
  override: false,
});

const { Workspace } = require("../models/workspace");
const { Document } = require("../models/documents");
const {
  documentsPath,
  normalizePath,
  purgeVectorCache,
} = require("../utils/files");

function parseArgs(argv = []) {
  const args = {
    workspace: null,
    folder: null,
    mode: "verify-only",
    limit: null,
    json: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--workspace") args.workspace = argv[++i];
    else if (arg === "--folder") args.folder = argv[++i];
    else if (arg === "--mode") args.mode = argv[++i];
    else if (arg === "--limit") {
      const limit = Number(argv[++i]);
      args.limit = Number.isInteger(limit) && limit > 0 ? limit : null;
    } else if (arg === "--json") {
      args.json = true;
    } else if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!args.workspace) throw new Error("Missing required --workspace");
  if (!args.folder) throw new Error("Missing required --folder");
  if (
    !["verify-only", "dedupe-only", "reattach-missing"].includes(args.mode)
  ) {
    throw new Error(
      `Invalid --mode '${args.mode}'. Use verify-only, dedupe-only, or reattach-missing.`
    );
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node server/scripts/reconcile-folder-workspace.cjs \\
    --workspace lovora \\
    --folder avgjorelser-lra \\
    --mode verify-only

Options:
  --workspace <slug>   Required workspace slug.
  --folder <name>      Required folder name under documents/.
  --mode <mode>        verify-only | dedupe-only | reattach-missing
  --limit <n>          Optional limit for reattach-missing.
  --json               Print JSON instead of a human summary.
  --help               Show this message.
`);
}

function ensureFolder(folder = "") {
  const folderPath = path.resolve(documentsPath, normalizePath(folder));
  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    throw new Error(`Folder not found: ${folder}`);
  }
  return folderPath;
}

function readFolderDocuments(folder = "") {
  const folderPath = ensureFolder(folder);
  const docs = [];
  for (const name of fs.readdirSync(folderPath)) {
    if (path.extname(name) !== ".json") continue;
    const absPath = path.join(folderPath, name);
    const raw = fs.readFileSync(absPath, "utf8");
    const parsed = JSON.parse(raw);
    const stats = fs.statSync(absPath);
    docs.push({
      name,
      location: `${folder}/${name}`,
      absPath,
      chunkSource: parsed.chunkSource || null,
      url: parsed.url || null,
      title: parsed.title || null,
      mtimeMs: stats.mtimeMs,
    });
  }
  return docs.sort((a, b) => a.location.localeCompare(b.location));
}

function countDuplicates(counter) {
  return Array.from(counter.values()).reduce(
    (sum, docs) => sum + Math.max(docs.length - 1, 0),
    0
  );
}

function canonicalForGroup(group = [], attachedDocpaths = new Set()) {
  return [...group].sort((a, b) => {
    const aAttached = attachedDocpaths.has(a.location) ? 0 : 1;
    const bAttached = attachedDocpaths.has(b.location) ? 0 : 1;
    if (aAttached !== bAttached) return aAttached - bAttached;
    if (a.mtimeMs !== b.mtimeMs) return a.mtimeMs - b.mtimeMs;
    return a.location.localeCompare(b.location);
  })[0];
}

function serializeDoc(doc) {
  return {
    location: doc.location,
    name: doc.name,
    title: doc.title,
    url: doc.url,
    chunkSource: doc.chunkSource,
    mtimeMs: doc.mtimeMs,
  };
}

async function buildState(workspace, folder) {
  const folderDocs = readFolderDocuments(folder);
  const allWorkspaceDocs = await Document.where(
    {
      docpath: { startsWith: `${folder}/` },
    },
    null,
    null,
    null,
    { workspaceId: true, docpath: true }
  );
  const workspaceDocs = await Document.where(
    {
      workspaceId: workspace.id,
      docpath: { startsWith: `${folder}/` },
    },
    null,
    null,
    null,
    { id: true, docId: true, docpath: true }
  );

  const attachedDocpaths = new Set(workspaceDocs.map((doc) => doc.docpath));
  const attachedAnywhereDocpaths = new Set(
    allWorkspaceDocs.map((doc) => doc.docpath)
  );

  const byChunkSource = new Map();
  const byUrl = new Map();
  for (const doc of folderDocs) {
    const chunkSourceKey = doc.chunkSource || `__missing__:${doc.location}`;
    const urlKey = doc.url || `__missing__:${doc.location}`;
    if (!byChunkSource.has(chunkSourceKey)) byChunkSource.set(chunkSourceKey, []);
    if (!byUrl.has(urlKey)) byUrl.set(urlKey, []);
    byChunkSource.get(chunkSourceKey).push(doc);
    byUrl.get(urlKey).push(doc);
  }

  const duplicateGroupsByChunkSource = Array.from(byChunkSource.entries())
    .filter(([, docs]) => docs.length > 1)
    .map(([chunkSource, docs]) => {
      const canonical = canonicalForGroup(docs, attachedAnywhereDocpaths);
      return {
        chunkSource,
        canonical: serializeDoc(canonical),
        duplicates: docs.map(serializeDoc),
      };
    })
    .sort((a, b) => a.chunkSource.localeCompare(b.chunkSource));

  const duplicateGroupsByUrl = Array.from(byUrl.entries())
    .filter(([, docs]) => docs.length > 1)
    .map(([url, docs]) => ({ url, duplicates: docs.map(serializeDoc) }))
    .sort((a, b) => a.url.localeCompare(b.url));

  const canonicalDocs = Array.from(byChunkSource.values())
    .map((docs) => canonicalForGroup(docs, attachedAnywhereDocpaths))
    .sort((a, b) => a.location.localeCompare(b.location));

  const unattachedCanonicalDocs = canonicalDocs
    .filter((doc) => !attachedDocpaths.has(doc.location))
    .map(serializeDoc);

  const workspaceDocpathCounts = workspaceDocs.reduce((acc, doc) => {
    acc.set(doc.docpath, (acc.get(doc.docpath) || 0) + 1);
    return acc;
  }, new Map());

  const duplicateWorkspaceDocpaths = Array.from(workspaceDocpathCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([docpath, count]) => ({ docpath, count }))
    .sort((a, b) => a.docpath.localeCompare(b.docpath));

  return {
    workspace: workspace.slug,
    folder,
    summary: {
      folderTotal: folderDocs.length,
      uniqueChunkSource: byChunkSource.size,
      uniqueUrl: byUrl.size,
      duplicateOverChunkSource: countDuplicates(byChunkSource),
      duplicateOverUrl: countDuplicates(byUrl),
      workspaceAttached: workspaceDocs.length,
      workspaceUniqueDocpath: workspaceDocpathCounts.size,
      unattachedCanonicalCount: unattachedCanonicalDocs.length,
      duplicateWorkspaceDocpaths: duplicateWorkspaceDocpaths.length,
    },
    duplicateGroupsByChunkSource,
    duplicateGroupsByUrl,
    unattachedCanonicalDocs,
  };
}

async function dedupeFolder(workspace, folder) {
  const initialState = await buildState(workspace, folder);
  const operations = [];
  for (const group of initialState.duplicateGroupsByChunkSource) {
    const keep = group.canonical.location;
    for (const doc of group.duplicates) {
      if (doc.location === keep) continue;

      const attachments = await Document.where(
        { docpath: doc.location },
        null,
        null,
        null,
        { workspaceId: true }
      );

      for (const attachment of attachments) {
        const attachedWorkspace = await Workspace.get({
          id: attachment.workspaceId,
        });
        if (!attachedWorkspace) continue;
        await Document.removeDocuments(attachedWorkspace, [doc.location]);
      }

      purgeVectorCache(doc.location);
      fs.unlinkSync(path.resolve(documentsPath, normalizePath(doc.location)));
      operations.push({
        removed: doc.location,
        kept: keep,
        chunkSource: group.chunkSource,
        removedAttachedDocument: attachments.length > 0,
      });
    }
  }

  return {
    operations,
    finalState: await buildState(workspace, folder),
  };
}

async function reattachMissing(workspace, folder, limit = null) {
  const initialState = await buildState(workspace, folder);
  const targets =
    limit !== null
      ? initialState.unattachedCanonicalDocs.slice(0, limit)
      : initialState.unattachedCanonicalDocs;
  const operations = [];

  for (const doc of targets) {
    const result = await Document.api.uploadToWorkspace(
      workspace.slug,
      doc.location
    );
    operations.push({
      docpath: doc.location,
      attempted: result.attempted,
      success: result.success,
      errors: result.errors,
      skippedExisting: result.skippedExisting,
    });
  }

  return {
    operations,
    finalState: await buildState(workspace, folder),
  };
}

function printHumanReport(report) {
  console.log(`mode: ${report.mode}`);
  console.log(`workspace: ${report.state.workspace}`);
  console.log(`folder: ${report.state.folder}`);
  console.log("");
  console.log("summary:");
  for (const [key, value] of Object.entries(report.state.summary)) {
    console.log(`  ${key}: ${value}`);
  }

  if (report.operations) {
    console.log("");
    console.log(`operations: ${report.operations.length}`);
    for (const operation of report.operations) {
      console.log(`  ${JSON.stringify(operation)}`);
    }
  }

  if (report.state.duplicateGroupsByChunkSource.length > 0) {
    console.log("");
    console.log("duplicateGroupsByChunkSource:");
    for (const group of report.state.duplicateGroupsByChunkSource) {
      console.log(`  chunkSource: ${group.chunkSource}`);
      console.log(`    keep: ${group.canonical.location}`);
      for (const doc of group.duplicates) {
        console.log(`    doc: ${doc.location}`);
      }
    }
  }

  if (report.state.unattachedCanonicalDocs.length > 0) {
    console.log("");
    console.log("unattachedCanonicalDocs:");
    for (const doc of report.state.unattachedCanonicalDocs) {
      console.log(`  ${doc.location}`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = await Workspace.get({ slug: args.workspace });
  if (!workspace) throw new Error(`Workspace not found: ${args.workspace}`);

  if (args.mode === "verify-only") {
    const state = await buildState(workspace, args.folder);
    const report = { mode: args.mode, state };
    if (args.json) console.log(JSON.stringify(report, null, 2));
    else printHumanReport(report);
    return;
  }

  if (args.mode === "dedupe-only") {
    const { operations, finalState } = await dedupeFolder(workspace, args.folder);
    const report = { mode: args.mode, state: finalState, operations };
    if (args.json) console.log(JSON.stringify(report, null, 2));
    else printHumanReport(report);
    return;
  }

  const { operations, finalState } = await reattachMissing(
    workspace,
    args.folder,
    args.limit
  );
  const report = { mode: args.mode, state: finalState, operations };
  if (args.json) console.log(JSON.stringify(report, null, 2));
  else printHumanReport(report);
}

main().catch((error) => {
  console.error(error.message, error);
  process.exit(1);
});

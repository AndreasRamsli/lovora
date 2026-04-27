#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(1024 * 1024 * 8);
  try {
    while (true) {
      const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      hash.update(buffer.subarray(0, bytesRead));
    }
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest("hex");
}

function copyAtomic(source, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const tempPath = `${destination}.tmp-${process.pid}`;
  fs.copyFileSync(source, tempPath);
  fs.renameSync(tempPath, destination);
}

function installLegalRetrievalArtifacts({
  workspace,
  sourceRoot,
  storageDir,
}) {
  const embeddingManifest = path.resolve(sourceRoot, "embedding_manifest.jsonl");
  const canonicalIndex = path.resolve(sourceRoot, "canonical_section_index.jsonl");

  if (!fs.existsSync(embeddingManifest)) {
    throw new Error(`Missing embedding manifest: ${embeddingManifest}`);
  }
  if (!fs.existsSync(canonicalIndex)) {
    throw new Error(`Missing canonical section index: ${canonicalIndex}`);
  }

  const destinationRoot = path.resolve(
    storageDir,
    "legal-retrieval",
    workspace
  );
  const embeddingDestination = path.join(destinationRoot, "embedding_manifest.jsonl");
  const canonicalDestination = path.join(
    destinationRoot,
    "canonical_section_index.jsonl"
  );
  const manifestDestination = path.join(destinationRoot, "manifest.json");

  copyAtomic(embeddingManifest, embeddingDestination);
  copyAtomic(canonicalIndex, canonicalDestination);

  const manifest = {
    schemaVersion: "lovora.legal-retrieval-artifacts/v1",
    workspace,
    generatedAt: new Date().toISOString(),
    files: {
      embeddingManifest: {
        path: embeddingDestination,
        sourcePath: embeddingManifest,
        sha256: sha256File(embeddingDestination),
      },
      canonicalSectionIndex: {
        path: canonicalDestination,
        sourcePath: canonicalIndex,
        sha256: sha256File(canonicalDestination),
      },
    },
  };

  fs.writeFileSync(
    `${manifestDestination}.tmp-${process.pid}`,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );
  fs.renameSync(`${manifestDestination}.tmp-${process.pid}`, manifestDestination);
  return manifest;
}

function parseArgs(argv) {
  const args = {
    workspace: "lovora-alpha",
    sourceRoot: path.resolve(__dirname, "../../legal_embedding_bundled"),
    storageDir: process.env.STORAGE_DIR || path.resolve(__dirname, "../server/storage"),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) throw new Error(`Missing value for ${current}`);
      return argv[index];
    };

    switch (current) {
      case "--workspace":
        args.workspace = next();
        break;
      case "--source-root":
        args.sourceRoot = path.resolve(next());
        break;
      case "--storage-dir":
        args.storageDir = path.resolve(next());
        break;
      case "--help":
        console.log(`Usage: install-legal-retrieval-artifacts.cjs [options]

Options:
  --workspace <slug>   Workspace slug. Default: lovora-alpha
  --source-root <dir>  Directory containing embedding_manifest.jsonl and canonical_section_index.jsonl.
  --storage-dir <dir>  AnythingLLM server storage dir. Default: server/storage`);
        process.exit(0);
      default:
        throw new Error(`Unknown argument: ${current}`);
    }
  }

  return args;
}

function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const manifest = installLegalRetrievalArtifacts(args);
  console.log(
    `[legal-retrieval] installed artifacts for ${manifest.workspace} at ${path.dirname(
      manifest.files.embeddingManifest.path
    )}`
  );
  return 0;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(error?.message || error);
    process.exitCode = 1;
  }
}

module.exports = {
  installLegalRetrievalArtifacts,
  parseArgs,
  main,
  sha256File,
};

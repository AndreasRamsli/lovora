const fs = require("fs");
const path = require("path");
const { normalizeLegalCitationText } = require("./legalCitationQuery");

const storeCache = new Map();
const DEFAULT_READ_CHUNK_SIZE = 1024 * 1024 * 8;

function parseJsonlLine(lineBuffer) {
  const line = lineBuffer.toString("utf8").replace(/\r$/, "");
  if (!line.trim()) return null;
  return JSON.parse(line);
}

function readJsonl(
  filePath,
  { mapRecord = null, chunkSize = DEFAULT_READ_CHUNK_SIZE } = {}
) {
  if (!fs.existsSync(filePath)) return [];
  const records = [];
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(chunkSize);
  let pending = Buffer.alloc(0);
  let pendingStart = 0;

  try {
    while (true) {
      const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      const combined = pending.length
        ? Buffer.concat([pending, buffer.subarray(0, bytesRead)])
        : buffer.subarray(0, bytesRead);
      let lineStart = 0;

      for (let index = 0; index < combined.length; index += 1) {
        if (combined[index] !== 10) continue;
        const lineBuffer = combined.subarray(lineStart, index);
        const lineOffset = pendingStart + lineStart;
        const record = parseJsonlLine(lineBuffer);
        if (record) {
          records.push(
            mapRecord
              ? mapRecord(record, {
                  filePath,
                  offset: lineOffset,
                  byteLength: lineBuffer.length,
                })
              : record
          );
        }
        lineStart = index + 1;
      }

      pending = Buffer.from(combined.subarray(lineStart));
      pendingStart += lineStart;
    }

    const record = parseJsonlLine(pending);
    if (record) {
      records.push(
        mapRecord
          ? mapRecord(record, {
              filePath,
              offset: pendingStart,
              byteLength: pending.length,
            })
          : record
      );
    }
  } finally {
    fs.closeSync(fd);
  }

  return records;
}

function artifactPathsForWorkspace({ workspaceSlug, storageDir }) {
  const root =
    storageDir ||
    process.env.STORAGE_DIR ||
    path.resolve(__dirname, "../storage");
  const artifactRoot = path.resolve(root, "legal-retrieval", workspaceSlug);
  return {
    artifactRoot,
    manifestPath: path.join(artifactRoot, "manifest.json"),
    canonicalSectionIndexPath: path.join(
      artifactRoot,
      "canonical_section_index.jsonl"
    ),
    embeddingManifestPath: path.join(artifactRoot, "embedding_manifest.jsonl"),
  };
}

function artifactCacheKey(paths) {
  const parts = [paths.canonicalSectionIndexPath, paths.embeddingManifestPath];
  if (fs.existsSync(paths.manifestPath)) {
    parts.push(fs.readFileSync(paths.manifestPath, "utf8"));
  } else {
    for (const filePath of [
      paths.canonicalSectionIndexPath,
      paths.embeddingManifestPath,
    ]) {
      const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
      parts.push(stat ? String(stat.mtimeMs) : "missing");
    }
  }
  return parts.join("|");
}

function addToMultiMap(map, key, value) {
  if (!key) return;
  if (!map.has(key)) map.set(key, []);
  map.get(key).push(value);
}

function addAlias(aliasToDocumentIds, alias, documentId) {
  const normalized = normalizeLegalCitationText(alias);
  if (!normalized || !documentId) return;
  if (!aliasToDocumentIds.has(normalized)) {
    aliasToDocumentIds.set(normalized, new Set());
  }
  aliasToDocumentIds.get(normalized).add(documentId);
}

function slimCanonicalRow(row, source = null) {
  const slim = {
    schemaVersion: row.schemaVersion,
    jurisdiction: row.jurisdiction,
    corpus: row.corpus,
    documentId: row.documentId,
    lovdataId: row.lovdataId,
    canonicalTitle: row.canonicalTitle,
    title: row.title,
    aliases: row.aliases,
    section: row.section,
    sectionTitle: row.sectionTitle,
    subsection: row.subsection,
    subsectionLabel: row.subsectionLabel,
    versionType: row.versionType,
    segmentType: row.segmentType,
    canonicalSectionId: row.canonicalSectionId,
    canonicalSourceId: row.canonicalSourceId,
    embeddingChunkIds: row.embeddingChunkIds,
    embeddingChunkSources: row.embeddingChunkSources,
    url: row.url,
    chunkSource: row.chunkSource,
  };

  if (source) {
    slim._jsonlPath = source.filePath;
    slim._offset = source.offset;
    slim._byteLength = source.byteLength;
  } else {
    slim.text = row.text || "";
  }
  return slim;
}

function slimEmbeddingRow(row) {
  return {
    schemaVersion: row.schemaVersion,
    jurisdiction: row.jurisdiction,
    corpus: row.corpus,
    documentId: row.documentId,
    lovdataId: row.lovdataId,
    canonicalTitle: row.canonicalTitle,
    versionType: row.versionType,
    embeddingChunkId: row.embeddingChunkId,
    canonicalSectionIds: row.canonicalSectionIds,
    canonicalSourceIds: row.canonicalSourceIds,
    canonicalSubsectionIds: row.canonicalSubsectionIds,
    chunkSource: row.chunkSource,
    outputPath: row.outputPath,
  };
}

function readJsonlRowAt({ filePath, offset, byteLength }) {
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(byteLength);
  try {
    fs.readSync(fd, buffer, 0, byteLength, offset);
    return parseJsonlLine(buffer) || {};
  } finally {
    fs.closeSync(fd);
  }
}

function materializeCanonicalText(row = {}) {
  if (typeof row.text === "string") return row.text;
  if (
    !row._jsonlPath ||
    row._offset === undefined ||
    row._byteLength === undefined
  )
    return "";
  return (
    readJsonlRowAt({
      filePath: row._jsonlPath,
      offset: row._offset,
      byteLength: row._byteLength,
    }).text || ""
  );
}

function buildStore(canonicalRows, embeddingRows) {
  const canonicalBySourceId = new Map();
  const canonicalBySectionId = new Map();
  const canonicalBySection = new Map();
  const canonicalByDocumentSection = new Map();
  const embeddingByChunkId = new Map();
  const aliasToDocumentIds = new Map();

  for (const row of canonicalRows) {
    if (row.canonicalSourceId)
      canonicalBySourceId.set(row.canonicalSourceId, row);
    addToMultiMap(canonicalBySectionId, row.canonicalSectionId, row);
    addToMultiMap(canonicalBySection, row.section, row);
    addToMultiMap(
      canonicalByDocumentSection,
      `${row.documentId || ""}:${row.section || ""}`,
      row
    );
    for (const alias of [
      ...(Array.isArray(row.aliases) ? row.aliases : []),
      row.canonicalTitle,
      row.title,
      row.documentId,
      row.lovdataId,
    ]) {
      addAlias(aliasToDocumentIds, alias, row.documentId);
    }
    delete row.aliases;
  }

  for (const row of embeddingRows) {
    if (row.embeddingChunkId) embeddingByChunkId.set(row.embeddingChunkId, row);
  }

  return {
    canonicalRows,
    embeddingRows,
    canonicalBySourceId,
    canonicalBySectionId,
    canonicalBySection,
    canonicalByDocumentSection,
    embeddingByChunkId,
    aliasToDocumentIds,
  };
}

function loadLegalRetrievalStore({ workspaceSlug, storageDir } = {}) {
  if (!workspaceSlug) throw new Error("workspaceSlug is required");
  const paths = artifactPathsForWorkspace({ workspaceSlug, storageDir });
  const cacheKey = artifactCacheKey(paths);
  if (storeCache.has(cacheKey)) return storeCache.get(cacheKey);

  const store = buildStore(
    readJsonl(paths.canonicalSectionIndexPath, {
      mapRecord: (row, source) => slimCanonicalRow(row, source),
    }),
    readJsonl(paths.embeddingManifestPath, {
      mapRecord: (row) => slimEmbeddingRow(row),
    })
  );
  store.paths = paths;
  storeCache.clear();
  storeCache.set(cacheKey, store);
  return store;
}

function hasLegalRetrievalArtifacts({ workspaceSlug, storageDir } = {}) {
  if (!workspaceSlug) return false;
  const paths = artifactPathsForWorkspace({ workspaceSlug, storageDir });
  return (
    fs.existsSync(paths.canonicalSectionIndexPath) &&
    fs.existsSync(paths.embeddingManifestPath)
  );
}

module.exports = {
  artifactPathsForWorkspace,
  hasLegalRetrievalArtifacts,
  loadLegalRetrievalStore,
  materializeCanonicalText,
  readJsonl,
  slimCanonicalRow,
  slimEmbeddingRow,
};

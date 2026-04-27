const { sourceIdentifier } = require("../sourceIdentity");
const { fillSourceWindow } = require("../helpers/chat");
const { getVectorDbClass } = require("../helpers");
const { parseLegalCitationQuery } = require("../legalCitationQuery");
const { resolveLegalReferences } = require("../legalReferenceResolver");
const { hasLegalRetrievalArtifacts } = require("../legalRetrievalStore");

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim().startsWith("[")) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeReasons(value = []) {
  if (Array.isArray(value)) return unique(value.map(String));
  if (typeof value === "string" && value.trim().startsWith("[")) {
    return unique(parseJsonArray(value).map(String));
  }
  return unique(
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  );
}

function sourceDedupeKey(source = {}) {
  if (source.canonicalSourceId) return `canonical:${source.canonicalSourceId}`;
  const canonicalSourceIds = parseJsonArray(source.canonicalSourceIds);
  if (canonicalSourceIds.length) return `canonical:${canonicalSourceIds[0]}`;
  if (source.embeddingChunkId) return `embedding:${source.embeddingChunkId}`;
  return sourceIdentifier(source);
}

function withVectorReason(source = {}) {
  return {
    ...source,
    retrievalReasons: unique([
      ...normalizeReasons(source.retrievalReasons),
      "vector_fallback",
    ]),
  };
}

function dedupeRetrievedSources(sources = []) {
  const seen = new Map();
  for (const source of sources) {
    const key = sourceDedupeKey(source);
    if (!seen.has(key)) {
      seen.set(key, {
        ...source,
        retrievalReasons: normalizeReasons(source.retrievalReasons),
      });
      continue;
    }
    const existing = seen.get(key);
    existing.retrievalReasons = unique([
      ...normalizeReasons(existing.retrievalReasons),
      "canonical_id_dedupe",
    ]);
  }
  return [...seen.values()];
}

async function defaultResolveExactSources({
  parsedQuery,
  workspaceSlug,
  storageDir,
  limit,
}) {
  return resolveLegalReferences({
    parsedQuery,
    workspaceSlug,
    storageDir,
    limit,
  });
}

async function retrieveWorkspaceContext({
  query,
  workspace,
  workspaceSlug = workspace?.slug,
  LLMConnector,
  topN = workspace?.topN || 4,
  similarityThreshold = workspace?.similarityThreshold,
  rerank = workspace?.vectorSearchMode === "rerank",
  filterIdentifiers = [],
  rawHistory = [],
  includeHistoryBackfill = true,
  vectorSearchEnabled = true,
  vectorDb = null,
  storageDir,
  resolveExactSources = defaultResolveExactSources,
} = {}) {
  const parsedQuery = parseLegalCitationQuery(query);
  const exactSources = await resolveExactSources({
    parsedQuery,
    workspaceSlug,
    storageDir,
    limit: topN,
  });

  const remaining = Math.max(0, topN - exactSources.length);
  let vectorSearchResults = { contextTexts: [], sources: [], message: false };
  if (vectorSearchEnabled && remaining > 0 && LLMConnector) {
    const activeVectorDb = vectorDb || getVectorDbClass();
    if (activeVectorDb) {
      vectorSearchResults = await activeVectorDb.performSimilaritySearch({
        namespace: workspaceSlug,
        input: query,
        LLMConnector,
        similarityThreshold,
        topN: remaining,
        filterIdentifiers,
        rerank,
      });
    }
  }

  if (vectorSearchResults.message && exactSources.length === 0) {
    return {
      contextTexts: [],
      sources: [],
      message: vectorSearchResults.message,
      diagnostics: {
        parsedQuery,
        retrievalReasons: [],
        pinned: [],
      },
    };
  }

  const searchResults = dedupeRetrievedSources([
    ...exactSources,
    ...(!vectorSearchResults.message
      ? (vectorSearchResults.sources || []).map(withVectorReason)
      : []),
  ]).slice(0, topN);

  const filled = fillSourceWindow({
    nDocs: topN,
    searchResults,
    history: includeHistoryBackfill ? rawHistory : [],
    filterIdentifiers,
  });

  const diagnostics = {
    parsedQuery,
    retrievalReasons: unique(
      searchResults.flatMap((source) =>
        normalizeReasons(source.retrievalReasons)
      )
    ),
    vectorError: vectorSearchResults.message || false,
    pinned: exactSources
      .map((source) => source.canonicalSourceId)
      .filter(Boolean),
  };

  if (process.env.LEGAL_RETRIEVAL_DEBUG === "1") {
    console.log(
      "[legal-retrieval]",
      JSON.stringify({
        workspace: workspaceSlug,
        query,
        reasons: diagnostics.retrievalReasons,
        pinned: diagnostics.pinned,
      })
    );
  }

  return {
    contextTexts: filled.contextTexts,
    sources: searchResults,
    message: false,
    diagnostics,
  };
}

function shouldUseWorkspaceContextRetrieval({
  embeddingsCount = 0,
  hasVectorizedSpace = true,
  workspaceSlug,
  storageDir,
  hasLegalArtifacts = hasLegalRetrievalArtifacts,
} = {}) {
  if (hasVectorizedSpace !== false && Number(embeddingsCount) > 0) return true;
  return hasLegalArtifacts({ workspaceSlug, storageDir });
}

module.exports = {
  dedupeRetrievedSources,
  retrieveWorkspaceContext,
  shouldUseWorkspaceContextRetrieval,
};

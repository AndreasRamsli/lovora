const { normalizeLegalCitationText } = require("./legalCitationQuery");
const {
  loadLegalRetrievalStore,
  materializeCanonicalText,
} = require("./legalRetrievalStore");

const VERSION_PRECEDENCE = {
  consolidated: 0,
  act: 0,
  regulation: 0,
  amending_act: 3,
  amending_regulation: 3,
  appendix: 4,
};
const CURRENT_VERSION_TYPES = new Set(["consolidated", "act", "regulation"]);
const AMENDING_VERSION_TYPES = new Set(["amending_act", "amending_regulation"]);

const MATCH_PRECEDENCE = {
  subsection: 0,
  section: 1,
  neighbor: 2,
};

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function documentIdsForReference(reference, store) {
  const ids = new Set();
  for (const hint of reference.documentHints || []) {
    const matches = store.aliasToDocumentIds.get(
      normalizeLegalCitationText(hint)
    );
    if (matches) for (const id of matches) ids.add(id);
  }
  for (const hint of reference.datedSourceHints || []) {
    const matches = store.aliasToDocumentIds.get(
      normalizeLegalCitationText(hint)
    );
    if (matches) for (const id of matches) ids.add(id);
  }
  return ids;
}

function aliasReasons(reference) {
  const reasons = [];
  if ((reference.documentHints || []).length) reasons.push("title_alias_match");
  if ((reference.datedSourceHints || []).length)
    reasons.push("dated_source_alias_match");
  return reasons;
}

function retrievalReasonForMatch(matchType, row = {}) {
  if (row.matchReason) return row.matchReason;
  if (matchType === "subsection") return "exact_section_subsection_match";
  if (matchType === "neighbor") return "same_doc_neighbor_section";
  return "exact_section_match";
}

function publicCanonicalRow(row = {}) {
  const publicRow = { ...row };
  delete publicRow._jsonlPath;
  delete publicRow._offset;
  delete publicRow._byteLength;
  delete publicRow.aliases;
  return publicRow;
}

function candidateForRow(row, reference, matchType, referenceIndex = 0) {
  const embeddingChunkId = Array.isArray(row.embeddingChunkIds)
    ? row.embeddingChunkIds[0]
    : row.embeddingChunkId || "";
  const chunkSource = Array.isArray(row.embeddingChunkSources)
    ? row.embeddingChunkSources[0]
    : row.chunkSource || "";
  const retrievalReasons = [
    ...aliasReasons(reference),
    retrievalReasonForMatch(matchType, row),
  ];

  return {
    ...publicCanonicalRow(row),
    text: materializeCanonicalText(row),
    title: row.title || row.canonicalTitle || "",
    url: row.url || "",
    chunkSource,
    score: 10_000 - MATCH_PRECEDENCE[matchType],
    embeddingChunkId,
    matchType,
    preferredVersionType: reference.preferredVersionType || "current",
    referenceIndex,
    retrievalReasons: unique(retrievalReasons),
  };
}

function isCurrentVersion(row = {}) {
  return CURRENT_VERSION_TYPES.has(String(row.versionType || ""));
}

function isAmendingVersion(row = {}) {
  return AMENDING_VERSION_TYPES.has(String(row.versionType || ""));
}

function rowsForPreferredVersionType(reference = {}, matchingRows = []) {
  const preferredVersionType = reference.preferredVersionType || "current";
  const filtered =
    preferredVersionType === "amending"
      ? matchingRows.filter((row) => isAmendingVersion(row))
      : matchingRows.filter((row) => !isAmendingVersion(row));
  return filtered.length ? filtered : matchingRows;
}

function currentLawReferenceForAmendmentFallback(reference = {}) {
  if (reference.preferredVersionType !== "amending") return null;
  const targetHints = unique(
    (reference.documentHints || [])
      .map((hint) => {
        const match = normalizeLegalCitationText(hint).match(
          /^endrings(?:lov|forskrift)(?:en)?\s+til\s+(.+)$/
        );
        return match?.[1] || "";
      })
      .filter(Boolean)
  );
  if (!targetHints.length) return null;
  return {
    ...reference,
    documentHints: targetHints,
    preferredVersionType: "current",
  };
}

function neighboringSectionRefs(section = "") {
  const match = String(section).match(/^(\d+)-(\d+)$/);
  if (!match) return [];
  const chapter = match[1];
  const number = Number(match[2]);
  if (!Number.isInteger(number)) return [];
  return [number - 1, number + 1]
    .filter((value) => value > 0)
    .map((value) => `${chapter}-${value}`);
}

function exactRowsForSection(store, documentIds, section) {
  if (documentIds.size && store.canonicalByDocumentSection) {
    return [...documentIds].flatMap(
      (documentId) =>
        store.canonicalByDocumentSection.get(`${documentId}:${section}`) || []
    );
  }
  if (!documentIds.size && store.canonicalBySection) {
    return store.canonicalBySection.get(section) || [];
  }
  return (store.canonicalRows || []).filter((row) => {
    if (row.section !== section) return false;
    if (documentIds.size && !documentIds.has(row.documentId)) return false;
    return true;
  });
}

function neighborRowsForSections(store, documentIds, sections) {
  if (store.canonicalByDocumentSection) {
    return [...documentIds].flatMap((documentId) =>
      [...sections].flatMap((section) =>
        (
          store.canonicalByDocumentSection.get(`${documentId}:${section}`) || []
        ).filter((row) => !row.subsection && isCurrentVersion(row))
      )
    );
  }
  return (store.canonicalRows || []).filter((row) => {
    if (row.subsection) return false;
    if (!sections.has(row.section)) return false;
    if (!documentIds.has(row.documentId)) return false;
    return isCurrentVersion(row);
  });
}

function rowsForReference(reference, store, referenceIndex = 0) {
  const documentIds = documentIdsForReference(reference, store);
  const matchingRows = exactRowsForSection(
    store,
    documentIds,
    reference.section
  );
  if (!matchingRows.length) {
    const fallbackReference =
      currentLawReferenceForAmendmentFallback(reference);
    if (fallbackReference) {
      return rowsForReference(fallbackReference, store, referenceIndex);
    }
  }
  const resolvedDocumentIds = new Set(
    matchingRows.map((row) => row.documentId).filter(Boolean)
  );
  if (!documentIds.size && resolvedDocumentIds.size !== 1) return [];
  const rows = rowsForPreferredVersionType(reference, matchingRows);
  const currentExactDocumentIds = new Set(
    rows
      .filter(
        (row) => row.section === reference.section && isCurrentVersion(row)
      )
      .map((row) => row.documentId)
      .filter(Boolean)
  );
  const neighborSections = new Set(neighboringSectionRefs(reference.section));
  const neighborRows =
    currentExactDocumentIds.size && neighborSections.size
      ? neighborRowsForSections(
          store,
          currentExactDocumentIds,
          neighborSections
        )
      : [];
  const wantedSubsections = new Set(
    (reference.subsections || []).map((item) => `${item.type}:${item.number}`)
  );

  if (wantedSubsections.size > 0) {
    const subsectionRows = rows.filter((row) =>
      wantedSubsections.has(row.subsection)
    );
    if (subsectionRows.length) {
      const sectionRows = rows.filter((row) => !row.subsection);
      return [
        ...subsectionRows.map((row) =>
          candidateForRow(row, reference, "subsection", referenceIndex)
        ),
        ...sectionRows.map((row) =>
          candidateForRow(row, reference, "section", referenceIndex)
        ),
        ...neighborRows.map((row) =>
          candidateForRow(row, reference, "neighbor", referenceIndex)
        ),
      ];
    }
  }

  const sectionRows = rows.filter((row) => !row.subsection);
  return [
    ...sectionRows.map((row) =>
      candidateForRow(row, reference, "section", referenceIndex)
    ),
    ...neighborRows.map((row) =>
      candidateForRow(row, reference, "neighbor", referenceIndex)
    ),
  ];
}

function candidatePrecedence(candidate = {}) {
  if (
    candidate.preferredVersionType === "amending" &&
    isAmendingVersion(candidate)
  ) {
    return MATCH_PRECEDENCE[candidate.matchType] ?? 2;
  }
  const version = VERSION_PRECEDENCE[candidate.versionType] ?? 2;
  if (version >= 3) return version;
  return MATCH_PRECEDENCE[candidate.matchType] ?? 2;
}

function rankLegalCandidates(candidates = []) {
  return [...candidates].sort((a, b) => {
    const aPrecedence = candidatePrecedence(a);
    const bPrecedence = candidatePrecedence(b);
    if (aPrecedence !== bPrecedence) return aPrecedence - bPrecedence;
    const aReferenceIndex = Number.isInteger(a.referenceIndex)
      ? a.referenceIndex
      : Number.MAX_SAFE_INTEGER;
    const bReferenceIndex = Number.isInteger(b.referenceIndex)
      ? b.referenceIndex
      : Number.MAX_SAFE_INTEGER;
    if (aReferenceIndex !== bReferenceIndex) {
      return aReferenceIndex - bReferenceIndex;
    }

    return String(a.canonicalSourceId || "").localeCompare(
      String(b.canonicalSourceId || "")
    );
  });
}

function dedupeCanonicalCandidates(candidates = []) {
  const byId = new Map();
  for (const candidate of candidates) {
    const id =
      candidate.canonicalSourceId ||
      candidate.embeddingChunkId ||
      candidate.chunkSource;
    if (!id) continue;
    if (!byId.has(id)) {
      byId.set(id, {
        ...candidate,
        retrievalReasons: candidate.retrievalReasons || [],
      });
      continue;
    }
    const existing = byId.get(id);
    existing.retrievalReasons = unique([
      ...(existing.retrievalReasons || []),
      ...(candidate.retrievalReasons || []),
    ]);
  }
  return [...byId.values()];
}

function resolveLegalReferences({
  parsedQuery,
  workspaceSlug,
  storageDir,
  store,
  limit = 3,
} = {}) {
  if (!parsedQuery?.hasLegalReference) return [];
  const activeStore =
    store || loadLegalRetrievalStore({ workspaceSlug, storageDir });

  const candidates = [];
  for (const [index, reference] of (parsedQuery.references || []).entries()) {
    candidates.push(...rowsForReference(reference, activeStore, index));
  }

  return dedupeCanonicalCandidates(rankLegalCandidates(candidates)).slice(
    0,
    limit
  );
}

module.exports = {
  dedupeCanonicalCandidates,
  rankLegalCandidates,
  resolveLegalReferences,
};

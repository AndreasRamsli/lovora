function parseList(value, mapper = (item) => item) {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(mapper);
}

function buildConfigs({
  modes = ["rerank", "default"],
  topNs = [4, 6, 8],
  thresholds = [0.2, 0.25, 0.3],
}) {
  const configs = [];
  for (const mode of modes) {
    for (const topN of topNs) {
      for (const threshold of thresholds) {
        configs.push({
          id: `${mode}-top${topN}-thr${String(threshold).replace(".", "_")}`,
          rerank: mode === "rerank",
          topN,
          similarityThreshold: threshold,
        });
      }
    }
  }
  return configs;
}

function round(value, decimals = 4) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatStatuteLovdataId(corpus, year, month, day, sequence) {
  const sequenceWidth = corpus === "SF" ? 4 : 3;
  return `${corpus.toLowerCase()}-${year}${month}${day}-${sequence.padStart(sequenceWidth, "0")}`;
}

function canonicalDocument(value = "") {
  const source = String(value).toLowerCase();
  const match = source.match(
    /\/dokument\/(hrstr|trr|emdn|nl|sf|lti)\/(avgjorelse|lov|forskrift)\/([a-z0-9-]+)(?=[/?#]|$)/
  );
  if (match) {
    const [, rawCorpus, documentType, documentId] = match;
    const corpus =
      rawCorpus === "hrstr"
        ? "HRA"
        : rawCorpus === "lti"
          ? documentType === "forskrift"
            ? "SF"
            : "NL"
          : rawCorpus.toUpperCase();
    const statuteMatch = documentId.match(/^(\d{4})-(\d{2})-(\d{2})-(\d+)$/);
    return {
      corpus,
      documentType,
      lovdataId:
        corpus === "HRA" || corpus === "TRR" || corpus === "EMDN"
          ? documentId
          : statuteMatch
            ? formatStatuteLovdataId(
                corpus,
                statuteMatch[1],
                statuteMatch[2],
                statuteMatch[3],
                statuteMatch[4]
              )
            : null,
    };
  }

  const prefixedStatuteMatch = source.match(
    /\/dokument\/(nl|sf)\/(lov|for)-(\d{4})-(\d{2})-(\d{2})-(\d+)(?=[/?#]|$)/
  );
  if (!prefixedStatuteMatch) return null;
  const [, rawCorpus, documentPrefix, year, month, day, sequence] =
    prefixedStatuteMatch;
  const corpus = rawCorpus.toUpperCase();
  return {
    corpus,
    documentType: documentPrefix === "lov" ? "lov" : "forskrift",
    lovdataId: formatStatuteLovdataId(corpus, year, month, day, sequence),
  };
}

function deriveLovdataId(result = {}) {
  if (result.lovdataId) return String(result.lovdataId).toLowerCase();
  const metadata = result.metadata || {};
  if (metadata.lovdataId) return String(metadata.lovdataId).toLowerCase();
  for (const value of [
    metadata.chunkSource,
    metadata.url,
    result.chunkSource,
    result.url,
  ]) {
    const doc = canonicalDocument(value);
    if (doc?.lovdataId) return doc.lovdataId;
  }
  return null;
}

function deriveCorpus(result = {}) {
  const resultCorpus = result.corpus ? String(result.corpus).toUpperCase() : "";
  if (resultCorpus && resultCorpus !== "LTI") return resultCorpus;
  const metadata = result.metadata || {};
  const metadataCorpus = metadata.corpus
    ? String(metadata.corpus).toUpperCase()
    : "";
  const lovdataId = deriveLovdataId(result);
  if (lovdataId?.startsWith("nl-")) return "NL";
  if (lovdataId?.startsWith("sf-")) return "SF";
  if (metadataCorpus && metadataCorpus !== "LTI") return metadataCorpus;
  for (const value of [
    metadata.chunkSource,
    metadata.url,
    result.chunkSource,
    result.url,
  ]) {
    const doc = canonicalDocument(value);
    if (doc?.corpus) return doc.corpus;
  }
  return null;
}

function normalizeRemoteResult(result = {}) {
  const metadata = result.metadata || {};
  return {
    text: result.text || metadata.text || "",
    title: metadata.title || result.title || "",
    url: metadata.url || result.url || "",
    chunkSource: metadata.chunkSource || result.chunkSource || "",
    score: result.score,
    corpus: deriveCorpus(result),
    lovdataId: deriveLovdataId(result),
  };
}

function matchesSingleExpectation(result, expect = {}) {
  if (expect.corpus && result.corpus !== expect.corpus) return false;
  if (
    expect.lovdataId &&
    result.lovdataId !== String(expect.lovdataId).toLowerCase()
  )
    return false;
  if (
    expect.urlIncludes &&
    ![result.url, result.chunkSource].some((value) =>
      String(value).toLowerCase().includes(String(expect.urlIncludes).toLowerCase())
    )
  )
    return false;
  if (
    expect.textIncludes &&
    !String(result.text)
      .toLowerCase()
      .includes(String(expect.textIncludes).toLowerCase())
  )
    return false;
  if (
    expect.titleIncludes &&
    !String(result.title)
      .toLowerCase()
      .includes(String(expect.titleIncludes).toLowerCase())
  )
    return false;
  return true;
}

function matchesExpectation(result, expect = {}) {
  if (Array.isArray(expect.anyOf) && expect.anyOf.length > 0) {
    return expect.anyOf.some((item) => matchesSingleExpectation(result, item));
  }
  return matchesSingleExpectation(result, expect);
}

function rankOfFirstMatch(results = [], expect = {}) {
  for (let index = 0; index < results.length; index++) {
    if (matchesExpectation(normalizeRemoteResult(results[index]), expect))
      return index + 1;
  }
  return null;
}

function computeMetrics(caseResults = [], topN = 4) {
  const total = caseResults.length;
  const hitAt1 = caseResults.filter((item) => item.rank === 1).length;
  const hitAt3 = caseResults.filter(
    (item) => item.rank !== null && item.rank <= 3
  ).length;
  const hitAtK = caseResults.filter(
    (item) => item.rank !== null && item.rank <= topN
  ).length;
  const reciprocalRanks = caseResults.map((item) =>
    item.rank ? 1 / item.rank : 0
  );
  const mrr = reciprocalRanks.reduce((sum, value) => sum + value, 0) / total;
  return {
    total,
    hitAt1: round(hitAt1 / total),
    hitAt3: round(hitAt3 / total),
    [`hitAt${topN}`]: round(hitAtK / total),
    mrr: round(mrr),
  };
}

function isRetryableStatus(status) {
  return [429, 500, 502, 503, 504].includes(Number(status));
}

module.exports = {
  parseList,
  buildConfigs,
  computeMetrics,
  deriveLovdataId,
  normalizeRemoteResult,
  rankOfFirstMatch,
  isRetryableStatus,
};

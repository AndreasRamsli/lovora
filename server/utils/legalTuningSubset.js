const STOP_WORDS = new Set([
  "hva",
  "hvilken",
  "hvilke",
  "sier",
  "gjelder",
  "eller",
  "skal",
  "som",
  "for",
  "med",
  "til",
  "den",
  "det",
  "om",
  "og",
  "på",
  "i",
  "av",
]);

function normalizeText(value = "") {
  return String(value).toLowerCase();
}

function estimateTokensFromChars(charCount = 0) {
  return Math.ceil(Number(charCount || 0) / 3.5);
}

function collectExpectationIds(expect = {}, ids = new Set()) {
  if (!expect || typeof expect !== "object") return ids;
  if (expect.lovdataId) ids.add(String(expect.lovdataId).toLowerCase());
  if (Array.isArray(expect.anyOf)) {
    for (const item of expect.anyOf) collectExpectationIds(item, ids);
  }
  return ids;
}

function expectedLovdataIds(benchmark = []) {
  const ids = new Set();
  for (const item of benchmark) collectExpectationIds(item.expect, ids);
  return ids;
}

function keywordSet(value = "") {
  const words = normalizeText(value)
    .split(/[^a-z0-9æøå]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length >= 5 && !STOP_WORDS.has(word));
  return new Set(words);
}

function scoreRecordForBenchmark(record = {}, benchmarkCase = {}) {
  let score = 0;
  const expect = benchmarkCase.expect || {};
  const recordId = normalizeText(record.doc_id);
  const corpus = String(record.corpus || "").toUpperCase();
  const expectedCorpus = String(expect.corpus || "").toUpperCase();
  if (expectedCorpus && corpus === expectedCorpus) score += 10;
  if (recordId && collectExpectationIds(expect).has(recordId)) score += 1000;
  const queryTerms = keywordSet(benchmarkCase.query || "");
  const haystack = keywordSet(
    [
      record.title,
      record.shortTitle,
      record.section,
      record.chapter,
      record.subchapter,
      record.docType,
      record.segmentType,
    ].join(" ")
  );
  for (const term of queryTerms) {
    if (haystack.has(term)) score += 5;
  }
  if (record.segmentType === "appendix") score += 1;
  if (record.docType === "amending_act") score += 1;
  return score;
}

function uniqueRecords(records = []) {
  const seen = new Set();
  const result = [];
  for (const record of records) {
    const key = `${record.doc_id}:${record.sectionIndex ?? record.outputPath}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(record);
  }
  return result;
}

function selectTargetedRecords({
  records = [],
  benchmark = [],
  maxEstimatedTokens = 12_000_000,
  maxDistractorsPerCase = 25,
}) {
  const expectedIds = expectedLovdataIds(benchmark);
  const expectedRecords = records.filter((record) =>
    expectedIds.has(normalizeText(record.doc_id))
  );
  const distractors = [];
  for (const benchmarkCase of benchmark) {
    const ranked = records
      .filter((record) => !expectedIds.has(normalizeText(record.doc_id)))
      .map((record) => ({
        record,
        score: scoreRecordForBenchmark(record, benchmarkCase),
      }))
      .filter((item) => item.score > 10)
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score;
        return Number(left.record.textLength || 0) - Number(right.record.textLength || 0);
      })
      .slice(0, maxDistractorsPerCase)
      .map((item) => item.record);
    distractors.push(...ranked);
  }

  const selected = [];
  let estimatedTokens = 0;
  for (const record of uniqueRecords([...expectedRecords, ...distractors])) {
    const recordTokens = estimateTokensFromChars(record.textLength || 0);
    const isExpected = expectedIds.has(normalizeText(record.doc_id));
    if (!isExpected && estimatedTokens + recordTokens > maxEstimatedTokens) continue;
    selected.push(record);
    estimatedTokens += recordTokens;
  }

  return {
    records: selected,
    stats: {
      benchmarkCaseCount: benchmark.length,
      expectedDocumentCount: expectedIds.size,
      expectedRecordCount: expectedRecords.length,
      selectedRecordCount: selected.length,
      estimatedTokens,
      maxEstimatedTokens,
      maxDistractorsPerCase,
    },
  };
}

module.exports = {
  estimateTokensFromChars,
  expectedLovdataIds,
  keywordSet,
  scoreRecordForBenchmark,
  selectTargetedRecords,
};

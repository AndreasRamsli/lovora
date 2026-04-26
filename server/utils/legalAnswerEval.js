function round(value, decimals = 4) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function includesLoose(haystack = "", needle = "") {
  return normalizeText(haystack).includes(normalizeText(needle));
}

function extractContextRefs(response = "") {
  const refs = new Set();
  const pattern = /\[CONTEXT\s+(\d+)\]/gi;
  let match;
  while ((match = pattern.exec(String(response))) !== null) refs.add(match[1]);
  return [...refs];
}

function hasLegalCitation(response = "") {
  const text = String(response);
  const paragraphPattern =
    /(?:§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?(?:\s*(?:første|andre|annet|tredje|fjerde|femte|sjette|sjuende|syvende|åttende|niende|tiende)\s+(?:ledd|punktum))?)/i;
  const datedLawPattern =
    /\b(?:lov|forskrift)\s+\d{1,2}\.\s+[a-zæøå]+\s+\d{4}\s+nr\.\s+\d+/i;
  const namedLawWithParagraphPattern =
    /\b[a-zæøå][a-zæøå0-9 -]*(?:loven|forskriften)\s+§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?/i;
  return (
    paragraphPattern.test(text) ||
    datedLawPattern.test(text) ||
    namedLawWithParagraphPattern.test(text)
  );
}

function requiredCitationPassed(response = "", pattern = "") {
  if (!pattern) return true;
  const escaped = escapeRegExp(pattern)
    .replace(/\\§/g, "§")
    .replace(/\s+/g, "\\s+");
  return new RegExp(escaped, "i").test(response);
}

function check(name, passed, details = {}) {
  return { name, passed: Boolean(passed), ...details };
}

function evaluateAnswerCase(benchmarkCase = {}, answer = {}) {
  const response = String(answer.response || answer.textResponse || "");
  const contextRefs = extractContextRefs(response);
  const requiredTerms = benchmarkCase.requiredTerms || [];
  const requiredCitationPatterns = benchmarkCase.requiredCitationPatterns || [];
  const minContextRefs =
    benchmarkCase.minContextRefs === undefined ? 1 : Number(benchmarkCase.minContextRefs);

  const missingTerms = requiredTerms.filter((term) => !includesLoose(response, term));
  const missingCitationPatterns = requiredCitationPatterns.filter(
    (pattern) => !requiredCitationPassed(response, pattern)
  );
  const hasRequiredCitationText =
    requiredCitationPatterns.length > 0 && missingCitationPatterns.length === 0;

  const checks = {
    hasNorwegianHeadings: check(
      "hasNorwegianHeadings",
      /(^|\n|\s)(Kort svar|Kildegrunnlag|Vurdering|Forbehold)\s*:/i.test(response)
    ),
    avoidsEnglishHeadings: check(
      "avoidsEnglishHeadings",
      !/\b(Short answer|Sources|Source basis|Assessment|Caveats?)\s*:/i.test(response)
    ),
    hasLegalCitation: check(
      "hasLegalCitation",
      hasLegalCitation(response) || hasRequiredCitationText
    ),
    hasEnoughContextRefs: check(
      "hasEnoughContextRefs",
      contextRefs.length >= minContextRefs,
      { expected: minContextRefs, actual: contextRefs.length }
    ),
    hasRequiredTerms: check("hasRequiredTerms", missingTerms.length === 0, {
      missing: missingTerms,
    }),
    hasRequiredCitationPatterns: check(
      "hasRequiredCitationPatterns",
      missingCitationPatterns.length === 0,
      { missing: missingCitationPatterns }
    ),
  };

  const passed = Object.values(checks).every((item) => item.passed);
  return {
    id: benchmarkCase.id || answer.id || null,
    passed,
    checks,
    contextRefs,
  };
}

function evaluateAnswerReport({ benchmark = [], answers = [] } = {}) {
  const answerById = new Map(answers.map((answer) => [String(answer.id), answer]));
  const cases = benchmark.map((benchmarkCase) => {
    const answer = answerById.get(String(benchmarkCase.id)) || {};
    return evaluateAnswerCase(benchmarkCase, answer);
  });
  const passed = cases.filter((item) => item.passed).length;
  const total = cases.length;
  return {
    summary: {
      total,
      passed,
      failed: total - passed,
      passRate: total === 0 ? 0 : round(passed / total),
    },
    cases,
  };
}

function collectCaseResults(report = {}) {
  const results = new Map();
  const addCase = (item = {}, configId = null) => {
    if (!item.id || results.has(item.id)) return;
    results.set(item.id, { ...item, configId });
  };

  for (const config of report.configResults || []) {
    for (const item of config.caseResults || []) addCase(item, config.id);
  }
  for (const childReport of report.reports || []) {
    for (const config of childReport.configResults || []) {
      for (const item of config.caseResults || []) addCase(item, config.id);
    }
    for (const item of childReport.cases || []) addCase(item, childReport.config || null);
  }
  for (const item of report.cases || []) addCase(item, report.config || null);

  return results;
}

function evaluateRetrievalWatch({ report = {}, watches = [] } = {}) {
  const caseResults = collectCaseResults(report);
  const items = watches.map((watch) => {
    const result = caseResults.get(watch.id) || null;
    const observedRank = result?.rank ?? null;
    const maxRank = Number(watch.maxRank || 3);
    const targetRank = Number(watch.targetRank || 1);

    let status = "fail";
    if (observedRank !== null && observedRank <= targetRank) status = "pass";
    else if (observedRank !== null && observedRank <= maxRank) status = "warn";

    return {
      id: watch.id,
      status,
      severity: watch.severity || (status === "warn" ? "warn" : "fail"),
      observedRank,
      targetRank,
      maxRank,
      configId: result?.configId || null,
      matched: Boolean(result?.matched),
    };
  });

  return {
    summary: {
      total: items.length,
      passed: items.filter((item) => item.status === "pass").length,
      warnings: items.filter((item) => item.status === "warn").length,
      failed: items.filter((item) => item.status === "fail").length,
    },
    items,
  };
}

module.exports = {
  evaluateAnswerCase,
  evaluateAnswerReport,
  evaluateRetrievalWatch,
  extractContextRefs,
  hasLegalCitation,
};

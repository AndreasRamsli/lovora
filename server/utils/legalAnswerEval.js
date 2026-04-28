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

function hasNorwegianHeading(response = "") {
  return /(^|\n|\s)(?:#{1,6}\s*)?(?:\*\*)?\s*(Kort svar|Kildegrunnlag|Vurdering|Forbehold)\s*:(?:\*\*)?/i.test(
    String(response)
  );
}

function hasEnglishHeading(response = "") {
  return /(^|\n|\s)(?:#{1,6}\s*)?(?:\*\*)?\s*(Short answer|Sources|Source basis|Assessment|Caveats?)\s*:(?:\*\*)?/i.test(
    String(response)
  );
}

function hasLegalCitation(response = "") {
  const text = String(response);
  const paragraph =
    /§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?(?:\s*(?:første|andre|annet|tredje|fjerde|femte|sjette|sjuende|syvende|åttende|niende|tiende)\s+(?:ledd|punktum))?/i;
  const datedLawPattern =
    /\b(?:lov|forskrift)\s+\d{1,2}\.\s+[a-zæøå]+\s+\d{4}\s+nr\.\s+\d+(?:\s+§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)?/i;
  const namedLawWithParagraphPattern =
    /\b[a-zæøå][a-zæøå0-9 -]*(?:loven|forskriften)\s+§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?/i;
  const legalTitleWithParagraphPattern =
    /\b(?:lov|forskrift)\s+om\s+[a-zæøå0-9 ,()./-]{2,120}\s+§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?/i;
  const courtDecisionPattern =
    /\b(?:HR|Rt|LB|LE|LG|LA|LF|LH|RG)-?\d{4}-\d{1,5}(?:-[A-Z])?(?:\s+avsnitt\s+\d+)?/i;
  return (
    datedLawPattern.test(text) ||
    namedLawWithParagraphPattern.test(text) ||
    legalTitleWithParagraphPattern.test(text) ||
    courtDecisionPattern.test(text) ||
    /\bnorske lov\b/i.test(text) ||
    (/\b(?:loven|forskriften|tvisteloven|husleieloven|arbeidsmiljøloven)\b/i.test(
      text
    ) &&
      paragraph.test(text))
  );
}

function hasSourceGroundedRefusal(response = "") {
  const text = String(response);
  const headingText = text.replace(/\*\*/g, "");
  const shortAnswerMatch = headingText.match(
    /Kort svar\s*:\s*([\s\S]*?)(?:Kildegrunnlag\s*:|Vurdering\s*:|Forbehold\s*:|$)/i
  );
  const opening = (shortAnswerMatch ? shortAnswerMatch[1] : headingText).slice(
    0,
    600
  );
  const refusalPattern =
    /\b(?:jeg\s+)?(?:kan ikke|finner ikke|har ikke|ikke nok|ikke tilstrekkelig|utilstrekkelig)\b/i;
  const contextGapConclusion =
    /\b(?:(?:konteksten|kildene|de\s+foreliggende\s+kildene)\s+(?:inneholder|gir|sier)\s+(?:ikke|ingenting)|(?:det\s+)?mangler\s+(?!ikke\b)(?:[^.]{0,80}\s+)?(?:i|fra)\s+(?:konteksten|kildene|de\s+foreliggende\s+kildene))\b/i;
  return (
    (refusalPattern.test(opening) || contextGapConclusion.test(opening)) &&
    extractContextRefs(text).length > 0
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

function classifyAnswerCase({
  benchmarkCase = {},
  response = "",
  checks = {},
  passed = false,
}) {
  if (benchmarkCase.expectedBehavior === "refusal") {
    return checks.hasSourceGroundedRefusal?.passed
      ? "expected_refusal"
      : "refusal_quality";
  }
  if (passed) return "answerable";
  if (hasSourceGroundedRefusal(response)) return "retrieval_debug";

  const failedChecks = Object.values(checks)
    .filter((item) => !item.passed)
    .map((item) => item.name);
  if (
    failedChecks.length > 0 &&
    failedChecks.every((name) =>
      [
        "hasLegalCitation",
        "hasRequiredCitationPatterns",
        "hasNorwegianHeadings",
        "avoidsEnglishHeadings",
      ].includes(name)
    )
  ) {
    return "citation_quality";
  }
  if (failedChecks.includes("hasEnoughContextRefs")) return "traceability";
  return "answer_quality";
}

function evaluateAnswerCase(benchmarkCase = {}, answer = {}) {
  const response = String(answer.response || answer.textResponse || "");
  const contextRefs = extractContextRefs(response);
  const requiredTerms = benchmarkCase.requiredTerms || [];
  const requiredCitationPatterns = benchmarkCase.requiredCitationPatterns || [];
  const expectedBehavior = benchmarkCase.expectedBehavior || "answer";
  const minContextRefs =
    benchmarkCase.minContextRefs === undefined
      ? 1
      : Number(benchmarkCase.minContextRefs);

  const missingTerms = requiredTerms.filter(
    (term) => !includesLoose(response, term)
  );
  const missingCitationPatterns = requiredCitationPatterns.filter(
    (pattern) => !requiredCitationPassed(response, pattern)
  );
  const hasRequiredCitationText =
    requiredCitationPatterns.length > 0 && missingCitationPatterns.length === 0;

  const checks = {
    hasNorwegianHeadings: check(
      "hasNorwegianHeadings",
      hasNorwegianHeading(response)
    ),
    avoidsEnglishHeadings: check(
      "avoidsEnglishHeadings",
      !hasEnglishHeading(response)
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

  if (expectedBehavior === "refusal") {
    checks.hasSourceGroundedRefusal = check(
      "hasSourceGroundedRefusal",
      hasSourceGroundedRefusal(response)
    );
  }

  const passed = Object.values(checks).every((item) => item.passed);
  const triage = classifyAnswerCase({
    benchmarkCase,
    response,
    checks,
    passed,
  });
  return {
    id: benchmarkCase.id || answer.id || null,
    passed,
    triage,
    checks,
    contextRefs,
  };
}

function countBy(items = [], field) {
  return items.reduce((counts, item) => {
    const key = item[field] || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function evaluateAnswerReport({ benchmark = [], answers = [] } = {}) {
  const answerById = new Map(
    answers.map((answer) => [String(answer.id), answer])
  );
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
      triage: countBy(cases, "triage"),
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
    for (const item of childReport.cases || [])
      addCase(item, childReport.config || null);
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
  hasSourceGroundedRefusal,
  hasNorwegianHeading,
  hasLegalCitation,
};

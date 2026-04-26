const {
  evaluateAnswerCase,
  evaluateAnswerReport,
  evaluateRetrievalWatch,
} = require("../../utils/legalAnswerEval");

describe("legalAnswerEval", () => {
  test("passes a Norwegian answer with legal citations and context traceability", () => {
    const result = evaluateAnswerCase(
      {
        id: "husleietvistutvalget-uavhengighet",
        requiredTerms: ["Husleietvistutvalget", "faglig uavhengig"],
        requiredCitationPatterns: ["husleieloven § 12-5", "lov 22. desember 2025 nr. 127"],
        minContextRefs: 2,
      },
      {
        response:
          "Kort svar: Lov 22. desember 2025 nr. 127 endrer husleieloven § 12-5. " +
          "Kildegrunnlag: Husleieloven § 12-5 første og andre ledd [CONTEXT 0] og " +
          "lov 22. desember 2025 nr. 127 [CONTEXT 1]. " +
          "Vurdering: Husleietvistutvalget er faglig uavhengig etter husleieloven § 12-5 andre ledd [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasNorwegianHeadings.passed).toBe(true);
    expect(result.checks.hasLegalCitation.passed).toBe(true);
    expect(result.checks.hasEnoughContextRefs.passed).toBe(true);
    expect(result.contextRefs).toEqual(["0", "1"]);
  });

  test("fails when an answer only has generic context references and no legal citation", () => {
    const result = evaluateAnswerCase(
      {
        id: "generic-citation",
        requiredTerms: ["Husleietvistutvalget"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Dette følger av kilden. Kildegrunnlag: [CONTEXT 0]. " +
          "Vurdering: Husleietvistutvalget er omtalt der.",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasLegalCitation.passed).toBe(false);
  });

  test("fails when the answer uses English headings", () => {
    const result = evaluateAnswerCase(
      { id: "english-heading", minContextRefs: 1 },
      {
        response:
          "Short answer: The act applies. Sources: husleieloven § 12-5 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.avoidsEnglishHeadings.passed).toBe(false);
  });

  test("aggregates answer report pass rates", () => {
    const report = evaluateAnswerReport({
      benchmark: [
        { id: "a", requiredTerms: ["A"], minContextRefs: 1 },
        { id: "b", requiredTerms: ["B"], minContextRefs: 1 },
      ],
      answers: [
        { id: "a", response: "Kort svar: A. Kildegrunnlag: lov 1. januar 2025 nr. 1 § 1 [CONTEXT 0]." },
        { id: "b", response: "Kort svar: B. Kildegrunnlag: [CONTEXT 0]." },
      ],
    });

    expect(report.summary.total).toBe(2);
    expect(report.summary.passed).toBe(1);
    expect(report.summary.failed).toBe(1);
    expect(report.summary.passRate).toBe(0.5);
  });

  test("marks rank-two watched canary as warning, not failure", () => {
    const result = evaluateRetrievalWatch({
      report: {
        configResults: [
          {
            id: "rerank-top6-thr0_25",
            caseResults: [
              { id: "nl_skattebetalingsloven_2025_120", matched: true, rank: 2 },
            ],
          },
        ],
      },
      watches: [
        {
          id: "nl_skattebetalingsloven_2025_120",
          targetRank: 1,
          maxRank: 3,
          severity: "warn",
        },
      ],
    });

    expect(result.summary.failed).toBe(0);
    expect(result.summary.warnings).toBe(1);
    expect(result.items[0]).toMatchObject({
      id: "nl_skattebetalingsloven_2025_120",
      status: "warn",
      observedRank: 2,
    });
  });

  test("fails watched canary when rank exceeds maxRank", () => {
    const result = evaluateRetrievalWatch({
      report: {
        reports: [
          {
            cases: [
              { id: "nl_skattebetalingsloven_2025_120", matched: true, rank: 4 },
            ],
          },
        ],
      },
      watches: [
        {
          id: "nl_skattebetalingsloven_2025_120",
          targetRank: 1,
          maxRank: 3,
        },
      ],
    });

    expect(result.summary.failed).toBe(1);
    expect(result.items[0].status).toBe("fail");
  });
});

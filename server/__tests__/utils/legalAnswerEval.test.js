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

  test("accepts Markdown-formatted Norwegian answer headings", () => {
    const result = evaluateAnswerCase(
      {
        id: "markdown-headings",
        requiredTerms: ["Husleietvistutvalget"],
        requiredCitationPatterns: ["husleieloven § 12-5"],
        minContextRefs: 1,
      },
      {
        response:
          "**Kort svar:** Husleietvistutvalget er regulert i husleieloven § 12-5 [CONTEXT 0].\n\n" +
          "**Kildegrunnlag:** Husleieloven § 12-5 første ledd [CONTEXT 0].\n\n" +
          "**Vurdering:** Min vurdering er at kilden gir direkte støtte for svaret [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasNorwegianHeadings.passed).toBe(true);
  });

  test("requires lawyer-style citations instead of bare paragraph references", () => {
    const result = evaluateAnswerCase(
      {
        id: "bare-paragraph",
        requiredTerms: ["sakskostnader"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Sakskostnader reguleres i § 20-2 første ledd [CONTEXT 0]. " +
          "Kildegrunnlag: § 20-2 første ledd [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasLegalCitation.passed).toBe(false);
  });

  test("accepts short follow-up paragraph citations after the law name is introduced", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation",
        requiredTerms: ["31. mai", "tredje året", "utsatt formuesskatt"],
        requiredCitationPatterns: [
          "skattebetalingsloven § 9-3",
          "skattebetalingsloven § 10-51",
        ],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 " +
          "forfaller 31. mai i det tredje året etter fastsettingsåret, " +
          "jf. § 10-51 fjerde ledd [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 og jf. § 10-51 fjerde ledd [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(true);
  });

  test("does not treat longer section numbers as full named citation matches", () => {
    const result = evaluateAnswerCase(
      {
        id: "full-named-citation-section-prefix",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-5"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt følger av skattebetalingsloven § 10-51 fjerde ledd [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 10-51 fjerde ledd [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(false);
  });

  test("matches exact required citations with non-standard section hyphens", () => {
    const result = evaluateAnswerCase(
      {
        id: "section-non-standard-hyphen",
        requiredTerms: ["gebyr"],
        requiredCitationPatterns: ["§ 11-1"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Gebyr følger av forskriften § 11‑1 [CONTEXT 0]. " +
          "Kildegrunnlag: Forskrift 16. januar 2026 nr. 54 § 11‑1 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(true);
  });

  test("does not treat longer section numbers as short follow-up citation matches", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation-section-prefix",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-5"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 " +
          "omtales sammen med forfall, jf. § 10-51 fjerde ledd [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 og jf. § 10-51 fjerde ledd [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(false);
  });

  test("does not accept short follow-up citations tied to another named law", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation-wrong-law",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-51"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 er omtalt her. " +
          "Arveloven § 10-51 gjelder et annet tema, jf. § 10-51 [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(false);
  });

  test("does not accept short follow-up citations tied to another legal title", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation-wrong-legal-title",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-51"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 er omtalt her. " +
          "Lov om arv § 10-51 gjelder et annet tema [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(false);
  });

  test("does not accept short follow-up citations qualified by Arveloven after the section", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation-post-qualified-arveloven",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-51"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 er omtalt her, " +
          "jf. § 10-51 i Arveloven [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(false);
  });

  test("does not accept short follow-up citations qualified by lov om arv after the section", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation-post-qualified-lov-om-arv",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-51"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 er omtalt her, " +
          "jf. § 10-51 i lov om arv [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(false);
  });

  test("accepts generic law follow-up wording after the law name is introduced", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation-generic-law",
        requiredTerms: ["utsatt formuesskatt"],
        requiredCitationPatterns: ["skattebetalingsloven § 10-51"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 kan utsettes. " +
          "Etter loven, jf. § 10-51 fjerde ledd, forfaller kravet senere [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(true);
  });

  test("matches required terms case-insensitively", () => {
    const result = evaluateAnswerCase(
      {
        id: "case-insensitive-required-terms",
        requiredTerms: ["stamhusbesidderen", "leilændingsgods"],
        requiredCitationPatterns: ["forskrift 26. juni 1896"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Stamhusbesidderen må sende dokumentene ved salg av Leilændingsgods. " +
          "Kildegrunnlag: forskrift 26. juni 1896 § 1 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasRequiredTerms.passed).toBe(true);
  });

  test("recognizes court-style case citations with paragraph references", () => {
    const result = evaluateAnswerCase(
      {
        id: "court-citation",
        requiredTerms: ["tungtveiende grunner"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Terskelen for sakskostnadsansvar etter tungtveiende grunner er relativt høy, jf. HR-2020-2017-A avsnitt 54 [CONTEXT 0]. " +
          "Kildegrunnlag: HR-2020-2017-A avsnitt 54 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasLegalCitation.passed).toBe(true);
  });

  test("passes expected source-gap refusals when they are cited and explicit", () => {
    const result = evaluateAnswerCase(
      {
        id: "expected-refusal",
        expectedBehavior: "refusal",
        requiredCitationPatterns: ["lov 22. desember 2025 nr. 127"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Jeg kan ikke svare sikkert ut fra kildene i konteksten. " +
          "Kildegrunnlag: lov 22. desember 2025 nr. 127 [CONTEXT 0]. " +
          "Forbehold: Konteksten inneholder ikke forarbeidene som forklarer bakgrunnen [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.triage).toBe("expected_refusal");
    expect(result.checks.hasSourceGroundedRefusal.passed).toBe(true);
  });

  test("accepts source-gap refusals phrased as missing information in the sources", () => {
    const result = evaluateAnswerCase(
      {
        id: "expected-refusal-source-wording",
        expectedBehavior: "refusal",
        requiredTerms: ["forarbeider", "kildene"],
        requiredCitationPatterns: ["lov 22. desember 2025 nr. 127"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Nei, kildene sier ingenting om forarbeider eller begrunnelsen. [CONTEXT 0] " +
          "Kildegrunnlag: lov 22. desember 2025 nr. 127 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.triage).toBe("expected_refusal");
    expect(result.checks.hasSourceGroundedRefusal.passed).toBe(true);
  });

  test("does not accept negated missing-source wording as a refusal", () => {
    const result = evaluateAnswerCase(
      {
        id: "negated-refusal",
        expectedBehavior: "refusal",
        requiredTerms: ["forarbeider", "kildene"],
        requiredCitationPatterns: ["lov 22. desember 2025 nr. 127"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Det mangler ikke forarbeider i kildene. [CONTEXT 0] " +
          "Kildegrunnlag: lov 22. desember 2025 nr. 127 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.checks.hasSourceGroundedRefusal.passed).toBe(false);
  });

  test("classifies unexpected source-gap refusals as retrieval debug cases", () => {
    const result = evaluateAnswerCase(
      {
        id: "unexpected-refusal",
        requiredTerms: ["8 520"],
        requiredCitationPatterns: ["forskrift 16. januar 2026 nr. 54", "§ 11-1"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Jeg finner ikke nok relevant kildemateriale i konteksten til å svare sikkert. " +
          "Kildegrunnlag: forskrift 16. januar 2026 nr. 54 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.triage).toBe("retrieval_debug");
  });

  test("does not classify an answered response as retrieval debug just because it has caveats", () => {
    const result = evaluateAnswerCase(
      {
        id: "answered-with-caveat",
        requiredTerms: ["8 520"],
        requiredCitationPatterns: ["forskrift 16. januar 2026 nr. 54"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Gebyret er kr 8 520 etter FOR-2026-01-16-54 § 11-1 [CONTEXT 0]. " +
          "Kildegrunnlag: FOR-2026-01-16-54 § 11-1 [CONTEXT 0]. " +
          "Forbehold: Konteksten inneholder ikke senere endringer [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(false);
    expect(result.triage).toBe("citation_quality");
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

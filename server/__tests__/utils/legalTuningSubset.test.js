const {
  estimateTokensFromChars,
  expectedLovdataIds,
  keywordSet,
  scoreRecordForBenchmark,
  selectTargetedRecords,
} = require("../../utils/legalTuningSubset");

describe("legalTuningSubset", () => {
  const benchmark = [
    {
      id: "nl_contracter",
      query: "Hva sier Norske Lov om contracter og forpligter?",
      tags: ["nl", "statute"],
      expect: { lovdataId: "nl-16870415-000", corpus: "NL" },
    },
    {
      id: "sf_kongeflaget",
      query: "Hvilken forskrift gjelder Kongeflaget?",
      tags: ["sf", "regulation"],
      expect: { lovdataId: "sf-19051115-0002", corpus: "SF" },
    },
  ];

  const records = [
    {
      doc_id: "nl-16870415-000",
      corpus: "NL",
      docType: "act",
      segmentType: "legal_section",
      title: "Kong Christian Den Femtis Norske Lov",
      section: "15 Art",
      outputPath: "/tmp/nl.md",
      textLength: 1200,
    },
    {
      doc_id: "sf-19051115-0002",
      corpus: "SF",
      docType: "regulation",
      segmentType: "legal_section",
      title: "Kongeflaget",
      section: "§ 1",
      outputPath: "/tmp/sf.md",
      textLength: 900,
    },
    {
      doc_id: "sf-19051230-0001",
      corpus: "SF",
      docType: "regulation",
      segmentType: "legal_section",
      title: "Kongevaabenet",
      section: "§ 1",
      outputPath: "/tmp/sf-distractor.md",
      textLength: 800,
    },
    {
      doc_id: "nl-20251219-113",
      corpus: "NL",
      docType: "amending_act",
      segmentType: "appendix",
      title: "CRPD endringslov",
      section: "Vedlegg",
      outputPath: "/tmp/appendix.md",
      textLength: 100000,
    },
  ];

  test("expectedLovdataIds extracts flat expectations", () => {
    expect([...expectedLovdataIds(benchmark)].sort()).toEqual([
      "nl-16870415-000",
      "sf-19051115-0002",
    ]);
  });

  test("keywordSet removes short noise words", () => {
    expect([...keywordSet("Hva sier Norske Lov om contracter?")].sort()).toEqual([
      "contracter",
      "norske",
    ]);
  });

  test("scoreRecordForBenchmark rewards corpus and keyword overlap", () => {
    const score = scoreRecordForBenchmark(records[2], benchmark[1]);
    expect(score).toBeGreaterThan(0);
    expect(scoreRecordForBenchmark(records[2], benchmark[0])).toBeLessThan(score);
  });

  test("estimateTokensFromChars uses conservative 3.5 chars per token", () => {
    expect(estimateTokensFromChars(3500)).toBe(1000);
    expect(estimateTokensFromChars(3501)).toBe(1001);
  });

  test("selectTargetedRecords always keeps expected documents inside budget", () => {
    const result = selectTargetedRecords({
      records,
      benchmark,
      maxEstimatedTokens: 1500,
      maxDistractorsPerCase: 2,
    });

    expect(result.records.map((record) => record.doc_id)).toEqual([
      "nl-16870415-000",
      "sf-19051115-0002",
    ]);
    expect(result.stats.expectedRecordCount).toBe(2);
    expect(result.stats.estimatedTokens).toBeLessThanOrEqual(1500);
  });

  test("selectTargetedRecords throws when expected records exceed token budget", () => {
    expect(() =>
      selectTargetedRecords({
        records,
        benchmark,
        maxEstimatedTokens: 100,
      })
    ).toThrow(/Expected records exceed token budget.*estimated=.*max=/);
  });

  test("selectTargetedRecords does not select appendix amending records from metadata alone", () => {
    const result = selectTargetedRecords({
      records,
      benchmark: [benchmark[0]],
      maxDistractorsPerCase: 25,
    });

    expect(result.records.map((record) => record.doc_id)).not.toContain(
      "nl-20251219-113"
    );
  });

  test("selectTargetedRecords excludes same-corpus distractors with only generic Norske overlap", () => {
    const unrelatedNorskeRecord = {
      doc_id: "nl-19000101-001",
      corpus: "NL",
      docType: "act",
      segmentType: "legal_section",
      title: "Lov om Norske foreninger",
      section: "1 Art",
      outputPath: "/tmp/norske-distractor.md",
      textLength: 700,
    };

    const result = selectTargetedRecords({
      records: [...records, unrelatedNorskeRecord],
      benchmark: [benchmark[0]],
      maxDistractorsPerCase: 25,
    });

    expect(result.records.map((record) => record.doc_id)).not.toContain(
      unrelatedNorskeRecord.doc_id
    );
  });

  test("selectTargetedRecords includes same-corpus distractors with meaningful contracter overlap", () => {
    const contracterRecord = {
      doc_id: "nl-19000101-002",
      corpus: "NL",
      docType: "act",
      segmentType: "legal_section",
      title: "Lov om contracter",
      section: "2 Art",
      outputPath: "/tmp/contracter-distractor.md",
      textLength: 700,
    };

    const result = selectTargetedRecords({
      records: [...records, contracterRecord],
      benchmark: [benchmark[0]],
      maxEstimatedTokens: 10_000,
      maxDistractorsPerCase: 25,
    });

    expect(result.records.map((record) => record.doc_id)).toContain(
      contracterRecord.doc_id
    );
  });

  test("selectTargetedRecords reports selected count and token budget", () => {
    const meaningfulDistractors = [
      {
        doc_id: "nl-19000101-003",
        corpus: "NL",
        docType: "act",
        segmentType: "legal_section",
        title: "Lov om contracter",
        section: "3 Art",
        outputPath: "/tmp/contracter-stats-distractor.md",
        textLength: 700,
      },
      {
        doc_id: "sf-19000101-0003",
        corpus: "SF",
        docType: "regulation",
        segmentType: "legal_section",
        title: "Forskrift om Kongeflaget",
        section: "§ 2",
        outputPath: "/tmp/kongeflaget-stats-distractor.md",
        textLength: 700,
      },
    ];

    const result = selectTargetedRecords({
      records: [...records, ...meaningfulDistractors],
      benchmark,
      maxEstimatedTokens: 10_000,
      maxDistractorsPerCase: 1,
    });

    expect(result.stats).toMatchObject({
      benchmarkCaseCount: 2,
      expectedDocumentCount: 2,
      selectedRecordCount: 4,
      maxEstimatedTokens: 10_000,
    });
  });
});

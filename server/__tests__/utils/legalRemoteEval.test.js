const {
  buildConfigs,
  computeMetrics,
  deriveLovdataId,
  normalizeRemoteResult,
  rankOfFirstMatch,
  isRetryableStatus,
} = require("../../utils/legalRemoteEval");

describe("legalRemoteEval", () => {
  test("buildConfigs creates stable config IDs", () => {
    expect(
      buildConfigs({
        modes: ["default"],
        topNs: [4],
        thresholds: [0.2],
      })
    ).toEqual([
      {
        id: "default-top4-thr0_2",
        rerank: false,
        topN: 4,
        similarityThreshold: 0.2,
      },
    ]);
  });

  test("deriveLovdataId normalizes canonical statute URLs", () => {
    expect(
      deriveLovdataId({
        url: "https://lovdata.no/dokument/NL/lov/1687-04-15-0#section-0001",
      })
    ).toBe("nl-16870415-000");
  });

  test("rankOfFirstMatch finds expected Lovdata ID", () => {
    const rank = rankOfFirstMatch(
      [
        { metadata: { url: "https://lovdata.no/dokument/SF/forskrift/1905-12-30-1" } },
        { metadata: { url: "https://lovdata.no/dokument/NL/lov/1687-04-15-0" } },
      ],
      { lovdataId: "nl-16870415-000", corpus: "NL" }
    );
    expect(rank).toBe(2);
  });

  test("computeMetrics reports hit rates and mrr", () => {
    expect(
      computeMetrics(
        [
          { rank: 1 },
          { rank: 3 },
          { rank: null },
        ],
        4
      )
    ).toEqual({
      total: 3,
      hitAt1: 0.3333,
      hitAt3: 0.6667,
      hitAt4: 0.6667,
      mrr: 0.4444,
    });
  });

  test("isRetryableStatus covers transient HTTP failures", () => {
    expect(isRetryableStatus(429)).toBe(true);
    expect(isRetryableStatus(503)).toBe(true);
    expect(isRetryableStatus(403)).toBe(false);
  });
});

const {
  percentile,
  summarizeLengths,
  summarizeSweepResults,
  chooseWinningSize,
} = require("../../../server/utils/legalChunkTuning");

describe("legalChunkTuning", () => {
  test("summarizeLengths computes stable percentiles", () => {
    expect(summarizeLengths([10, 20, 30, 40, 50])).toEqual({
      count: 5,
      min: 10,
      p50: 30,
      p75: 40,
      p90: 40,
      p95: 40,
      p99: 40,
      max: 50,
    });
  });

  test("percentile uses floor over length minus one for even-sized inputs", () => {
    expect(percentile([10, 20, 30, 40], 0.9)).toBe(30);
    expect(percentile([10, 20, 30, 40], 0.95)).toBe(30);
  });

  test("summarizeSweepResults keeps per-size totals", () => {
    expect(
      summarizeSweepResults([
        { size: 1100, totalChunks: 10, uploadableRecords: 5, nlExactHits: 4 },
        { size: 1300, totalChunks: 8, uploadableRecords: 5, nlExactHits: 4 },
      ])
    ).toEqual([
      {
        size: 1100,
        totalChunks: 10,
        uploadableRecords: 5,
        avgChunksPerRecord: 2,
        nlExactHits: 4,
      },
      {
        size: 1300,
        totalChunks: 8,
        uploadableRecords: 5,
        avgChunksPerRecord: 1.6,
        nlExactHits: 4,
      },
    ]);
  });

  test("chooseWinningSize prefers retrieval score, then NL exact hits, then lower chunk count", () => {
    const winner = chooseWinningSize([
      { size: 1100, retrievalScore: 72, nlExactHits: 4, totalChunks: 200000 },
      { size: 1300, retrievalScore: 72, nlExactHits: 4, totalChunks: 170000 },
      { size: 1500, retrievalScore: 71, nlExactHits: 4, totalChunks: 145000 },
    ]);

    expect(winner.size).toBe(1300);
  });

  test("chooseWinningSize prefers explicit size order over unknown sizes on a full tie", () => {
    const winner = chooseWinningSize([
      { size: 1700, retrievalScore: 72, nlExactHits: 4, totalChunks: 170000 },
      { size: 1300, retrievalScore: 72, nlExactHits: 4, totalChunks: 170000 },
    ]);

    expect(winner.size).toBe(1300);
  });
});

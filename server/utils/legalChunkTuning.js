function percentile(sortedValues, fraction) {
  if (!sortedValues.length) return null;

  const index = Math.min(
    sortedValues.length - 1,
    Math.floor((sortedValues.length - 1) * fraction)
  );

  return sortedValues[index];
}

function summarizeLengths(values = []) {
  const sorted = [...values].sort((a, b) => a - b);

  if (!sorted.length) {
    return {
      count: 0,
      min: null,
      p50: null,
      p75: null,
      p90: null,
      p95: null,
      p99: null,
      max: null,
    };
  }

  return {
    count: sorted.length,
    min: sorted[0],
    p50: percentile(sorted, 0.5),
    p75: percentile(sorted, 0.75),
    p90: percentile(sorted, 0.9),
    p95: percentile(sorted, 0.95),
    p99: percentile(sorted, 0.99),
    max: sorted[sorted.length - 1],
  };
}

function summarizeSweepResults(rows = []) {
  return rows.map((row) => ({
    ...row,
    avgChunksPerRecord:
      row.uploadableRecords > 0
        ? Number((row.totalChunks / row.uploadableRecords).toFixed(3))
        : 0,
  }));
}

function chooseWinningSize(rows = []) {
  return [...rows].sort((left, right) => {
    if (right.retrievalScore !== left.retrievalScore) {
      return right.retrievalScore - left.retrievalScore;
    }

    if (right.nlExactHits !== left.nlExactHits) {
      return right.nlExactHits - left.nlExactHits;
    }

    if (left.totalChunks !== right.totalChunks) {
      return left.totalChunks - right.totalChunks;
    }

    const preference = [1300, 1500, 1100, 900];
    const leftRank =
      preference.indexOf(left.size) === -1
        ? preference.length
        : preference.indexOf(left.size);
    const rightRank =
      preference.indexOf(right.size) === -1
        ? preference.length
        : preference.indexOf(right.size);

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return left.size - right.size;
  })[0];
}

module.exports = {
  percentile,
  summarizeLengths,
  summarizeSweepResults,
  chooseWinningSize,
};

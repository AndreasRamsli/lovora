#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function printHelp() {
  console.log(`Usage:
  node scripts/score-legal-chunking.cjs [options]

Options:
  --stats <path>             Chunk stats JSON path.
                             Default: test-results/legal-chunking-stats.json
  --retrieval <path>         Retrieval report JSON path. Repeat for each size.
  --report-json <path>       JSON score report output.
                             Default: test-results/legal-chunking-score.json
  --report-md <path>         Markdown score report output.
                             Default: test-results/legal-chunking-score.md
  --help                     Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    stats: path.resolve("test-results/legal-chunking-stats.json"),
    retrieval: [],
    reportJson: path.resolve("test-results/legal-chunking-score.json"),
    reportMd: path.resolve("test-results/legal-chunking-score.md"),
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    }
    if (arg === "--stats") args.stats = path.resolve(argv[++i]);
    else if (arg === "--retrieval") args.retrieval.push(path.resolve(argv[++i]));
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (args.retrieval.length === 0) {
    throw new Error("Provide at least one --retrieval report.");
  }

  return args;
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
    const leftRank = preference.includes(left.size)
      ? preference.indexOf(left.size)
      : preference.length;
    const rightRank = preference.includes(right.size)
      ? preference.indexOf(right.size)
      : preference.length;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return left.size - right.size;
  })[0];
}

function extractSizeFromFilePath(filePath) {
  const match = path.basename(filePath).match(/(\d{3,4})(?=\.json$)/);
  if (!match) {
    throw new Error(`Could not infer chunk size from retrieval report path: ${filePath}`);
  }
  return Number(match[1]);
}

function hitAtKForConfig(config) {
  return Number(config.metrics?.[`hitAt${config.topN}`] || 0);
}

function collectConfigsById(report) {
  if (!Array.isArray(report.configResults) || report.configResults.length === 0) {
    throw new Error("Retrieval report has no configResults.");
  }

  return new Map(report.configResults.map((config) => [String(config.id), config]));
}

function extractTagHits(report, tag) {
  const caseResults = (report.configResults || []).flatMap(
    (config) => config.caseResults || []
  );
  return caseResults.filter(
    (item) => Array.isArray(item.tags) && item.tags.includes(tag) && item.rank === 1
  ).length;
}

function chooseComparisonConfigId(reports) {
  const configMaps = reports.map((report) => collectConfigsById(report));
  const commonIds = [...configMaps[0].keys()].filter((id) =>
    configMaps.every((configMap) => configMap.has(id))
  );

  if (commonIds.length === 0) {
    throw new Error(
      "Retrieval reports do not share a common config set, so chunk-size comparison would be misleading."
    );
  }

  return [...commonIds]
    .map((id) => {
      const configs = configMaps.map((configMap) => configMap.get(id));
      const totalHitAtK = configs.reduce(
        (sum, config) => sum + hitAtKForConfig(config),
        0
      );
      const totalHitAt1 = configs.reduce(
        (sum, config) => sum + Number(config.metrics?.hitAt1 || 0),
        0
      );
      return {
        id,
        averageHitAtK: totalHitAtK / configs.length,
        averageHitAt1: totalHitAt1 / configs.length,
      };
    })
    .sort((left, right) => {
      if (right.averageHitAtK !== left.averageHitAtK) {
        return right.averageHitAtK - left.averageHitAtK;
      }
      if (right.averageHitAt1 !== left.averageHitAt1) {
        return right.averageHitAt1 - left.averageHitAt1;
      }
      return String(left.id).localeCompare(String(right.id));
    })[0].id;
}

function formatMetric(value) {
  return Number(value).toFixed(4);
}

function renderMarkdown(payload) {
  const lines = ["# Legal Chunking Score", ""];
  lines.push(`- Winner: \`${payload.winner.size}\``);
  lines.push(
    `- Replace default 1100: \`${payload.replaceDefault ? "yes" : "no"}\``
  );
  lines.push(
    `- Shared comparison config: \`${payload.comparisonConfigId}\``
  );
  lines.push(
    "- Decision rule: highest retrieval score from the shared config, then highest NL exact hits, then lowest total chunks, then size preference `1300 > 1500 > 1100 > 900`."
  );
  lines.push("");
  lines.push("| size | retrievalScore | comparisonConfig | nlExactHits | sfExactHits | totalChunks |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  for (const row of payload.rows) {
    lines.push(
      `| ${row.size} | ${formatMetric(row.retrievalScore)} | ${row.comparisonConfigId} | ${row.nlExactHits} | ${row.sfExactHits} | ${row.totalChunks} |`
    );
  }
  lines.push("");
  return lines.join("\n");
}

function buildRow(stats, report, size, comparisonConfigId) {
  const statRow = stats.sweep.find((row) => row.size === size);
  if (!statRow) {
    throw new Error(`No chunk stats found for size ${size}`);
  }

  const configMap = collectConfigsById(report);
  const comparisonConfig = configMap.get(comparisonConfigId);
  if (!comparisonConfig) {
    throw new Error(
      `Comparison config ${comparisonConfigId} is missing from report for size ${size}`
    );
  }

  const retrievalScore = hitAtKForConfig(comparisonConfig);
  return {
    size,
    retrievalScore,
    comparisonConfigId,
    bestHitAtKLabel: `hitAt${comparisonConfig.topN}`,
    bestHitAtK: retrievalScore,
    bestHitAt1: Number(comparisonConfig.metrics?.hitAt1 || 0),
    bestMrr: Number(comparisonConfig.metrics?.mrr || 0),
    nlExactHits: extractTagHits(report, "nl"),
    sfExactHits: extractTagHits(report, "sf"),
    totalChunks: statRow.totalChunks,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const stats = JSON.parse(fs.readFileSync(args.stats, "utf8"));
  const retrievalInputs = args.retrieval.map((filePath) => ({
    filePath,
    size: extractSizeFromFilePath(filePath),
    report: JSON.parse(fs.readFileSync(filePath, "utf8")),
  }));
  const comparisonConfigId = chooseComparisonConfigId(
    retrievalInputs.map((input) => input.report)
  );
  const rows = retrievalInputs.map((input) =>
    buildRow(stats, input.report, input.size, comparisonConfigId)
  );
  const winner = chooseWinningSize(rows);
  const baseline1100 = rows.find((row) => row.size === 1100) || null;
  const replaceDefault =
    baseline1100 !== null
      ? winner.retrievalScore > baseline1100.retrievalScore &&
        winner.nlExactHits >= baseline1100.nlExactHits
      : winner.size !== 1100;
  const payload = {
    createdAt: new Date().toISOString(),
    statsPath: args.stats,
    retrievalReports: args.retrieval,
    comparisonConfigId,
    decisionRule: {
      primary: "highest retrievalScore from shared comparison config",
      tieBreak1: "highest nlExactHits",
      tieBreak2: "lowest totalChunks",
      tieBreak3: "size preference 1300 > 1500 > 1100 > 900",
    },
    rows,
    winner,
    replaceDefault,
  };

  fs.mkdirSync(path.dirname(args.reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(args.reportJson, JSON.stringify(payload, null, 2));
  fs.writeFileSync(args.reportMd, renderMarkdown(payload));

  console.log(`[chunking] winner ${winner.size}`);
  console.log(`[chunking] wrote JSON report to ${args.reportJson}`);
  console.log(`[chunking] wrote Markdown report to ${args.reportMd}`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}

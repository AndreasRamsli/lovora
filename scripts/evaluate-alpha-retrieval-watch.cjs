#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { evaluateRetrievalWatch } = require("../server/utils/legalAnswerEval");

function printHelp() {
  console.log(`Usage:
  node scripts/evaluate-alpha-retrieval-watch.cjs --retrieval-report path [options]

Options:
  --retrieval-report <path>  Retrieval report JSON from remote/local eval. Required.
  --watchlist <path>         Rank watch JSON.
                             Default: scripts/benchmarks/lovora_alpha_rank_watch.json
  --report-json <path>       JSON report output.
                             Default: test-results/alpha-retrieval-watch.json
  --report-md <path>         Markdown report output.
                             Default: test-results/alpha-retrieval-watch.md
  --fail-on-warning          Exit non-zero when watched cases are warnings.
  --help                     Show this message.

Example:
  node scripts/evaluate-alpha-retrieval-watch.cjs --retrieval-report test-results/retrieval-eval-report.json
`);
}

function parseArgs(argv) {
  const args = {
    retrievalReport: null,
    watchlist: path.resolve("scripts/benchmarks/lovora_alpha_rank_watch.json"),
    reportJson: path.resolve("test-results/alpha-retrieval-watch.json"),
    reportMd: path.resolve("test-results/alpha-retrieval-watch.md"),
    failOnWarning: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "--retrieval-report")
      args.retrievalReport = path.resolve(argv[++index]);
    else if (arg === "--watchlist") args.watchlist = path.resolve(argv[++index]);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++index]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++index]);
    else if (arg === "--fail-on-warning") args.failOnWarning = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.retrievalReport) throw new Error("--retrieval-report is required");
  return args;
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw missingInputFileError({
      filePath,
      placeholder: "path/to/retrieval-report.json",
      example: "test-results/retrieval-eval-report.json",
      flag: "--retrieval-report",
    });
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function missingInputFileError({ filePath, placeholder, example, flag }) {
  const relativePath = path.relative(process.cwd(), filePath);
  const lines = [`Input file does not exist: ${filePath}`];

  if (relativePath === placeholder) {
    lines.push("");
    lines.push(
      `Replace \`${placeholder}\` with a real file path, for example \`${example}\`.`
    );
  }

  lines.push("");
  lines.push(
    `The \`${flag}\` file should be the JSON report produced by \`scripts/evaluate-retrieval.cjs\` or \`scripts/remote-vector-eval.cjs\`.`
  );

  return new Error(lines.join("\n"));
}

function renderMarkdown(report, args) {
  const lines = ["# Alpha Retrieval Watch Report", ""];
  lines.push(`- Retrieval report: \`${path.relative(process.cwd(), args.retrievalReport)}\``);
  lines.push(`- Watchlist: \`${path.relative(process.cwd(), args.watchlist)}\``);
  lines.push(`- Passed: \`${report.summary.passed}\``);
  lines.push(`- Warnings: \`${report.summary.warnings}\``);
  lines.push(`- Failed: \`${report.summary.failed}\``);
  lines.push("");
  lines.push("| case | status | observed rank | target rank | max rank |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const item of report.items) {
    lines.push(
      `| ${item.id} | ${item.status} | ${item.observedRank ?? "-"} | ${item.targetRank} | ${item.maxRank} |`
    );
  }
  lines.push("");
  return lines.join("\n");
}

function writeReports(args, report) {
  fs.mkdirSync(path.dirname(args.reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(args.reportJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(args.reportMd, renderMarkdown(report, args));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const retrievalReport = readJson(args.retrievalReport);
  const watches = readJson(args.watchlist);
  const report = {
    createdAt: new Date().toISOString(),
    retrievalReportPath: args.retrievalReport,
    watchlistPath: args.watchlist,
    ...evaluateRetrievalWatch({ report: retrievalReport, watches }),
  };
  writeReports(args, report);
  console.log(`[alpha-watch] wrote JSON report to ${args.reportJson}`);
  console.log(`[alpha-watch] wrote Markdown report to ${args.reportMd}`);
  if (report.summary.failed > 0 || (args.failOnWarning && report.summary.warnings > 0)) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error?.message || error);
    process.exit(1);
  }
}

module.exports = { parseArgs, readJson, renderMarkdown, main };

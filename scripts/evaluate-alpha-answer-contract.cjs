#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { evaluateAnswerReport } = require("../server/utils/legalAnswerEval");

function printHelp() {
  console.log(`Usage:
  node scripts/evaluate-alpha-answer-contract.cjs --answers path [options]
  node scripts/evaluate-alpha-answer-contract.cjs --init-template path [options]

Options:
  --benchmark <path>      Answer benchmark JSON.
                          Default: scripts/benchmarks/lovora_alpha_answer_contract.json
  --answers <path>        JSON array of { id, response } answers. Required.
  --init-template <path>  Write an answer template from the benchmark and exit.
  --report-json <path>    JSON report output.
                          Default: test-results/alpha-answer-contract.json
  --report-md <path>      Markdown report output.
                          Default: test-results/alpha-answer-contract.md
  --fail-on-warning       Reserved for parity with other alpha gates.
  --help                  Show this message.

Example:
  node scripts/evaluate-alpha-answer-contract.cjs --init-template test-results/alpha-answers.json
  node scripts/evaluate-alpha-answer-contract.cjs --answers test-results/alpha-answers.json
`);
}

function parseArgs(argv) {
  const args = {
    benchmark: path.resolve("scripts/benchmarks/lovora_alpha_answer_contract.json"),
    answers: null,
    initTemplate: null,
    reportJson: path.resolve("test-results/alpha-answer-contract.json"),
    reportMd: path.resolve("test-results/alpha-answer-contract.md"),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "--benchmark") args.benchmark = path.resolve(argv[++index]);
    else if (arg === "--answers") args.answers = path.resolve(argv[++index]);
    else if (arg === "--init-template")
      args.initTemplate = path.resolve(argv[++index]);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++index]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++index]);
    else if (arg === "--fail-on-warning") {
      // Kept for CLI consistency; answer contract has pass/fail only today.
    } else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.answers && !args.initTemplate) {
    throw new Error(
      "--answers is required. To create the file first, run: node scripts/evaluate-alpha-answer-contract.cjs --init-template test-results/alpha-answers.json"
    );
  }
  return args;
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw missingInputFileError({
      filePath,
      placeholder: "path/to/alpha-answers.json",
      example: "test-results/alpha-answers.json",
      flag: "--answers",
    });
  }

  const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.answers)) return payload.answers;
  if (Array.isArray(payload.benchmark)) return payload.benchmark;
  throw new Error(`Expected JSON array or known wrapper object: ${filePath}`);
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
    `To create an answer template, run: node scripts/evaluate-alpha-answer-contract.cjs --init-template ${example}`
  );
  lines.push("");
  lines.push(`The \`${flag}\` file should contain captured alpha answers like:`);
  lines.push(
    JSON.stringify(
      [
        {
          id: "alpha_husleietvistutvalget_uavhengighet",
          response:
            "Kort svar: ... husleieloven § 12-5 ... [CONTEXT 0]",
        },
      ],
      null,
      2
    )
  );

  return new Error(lines.join("\n"));
}

function buildAnswerTemplate(benchmark = []) {
  return benchmark.map((item) => ({
    id: item.id,
    question: item.question || item.query || "",
    response: "",
  }));
}

function writeAnswerTemplate(filePath, benchmark = []) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(buildAnswerTemplate(benchmark), null, 2)}\n`
  );
}

function renderMarkdown(report, args) {
  const lines = ["# Alpha Answer Contract Report", ""];
  lines.push(`- Benchmark: \`${path.relative(process.cwd(), args.benchmark)}\``);
  lines.push(`- Answers: \`${path.relative(process.cwd(), args.answers)}\``);
  lines.push(`- Total: \`${report.summary.total}\``);
  lines.push(`- Passed: \`${report.summary.passed}\``);
  lines.push(`- Failed: \`${report.summary.failed}\``);
  lines.push(`- Pass rate: \`${report.summary.passRate}\``);
  lines.push("");
  lines.push("| case | status | failed checks |");
  lines.push("| --- | --- | --- |");
  for (const item of report.cases) {
    const failedChecks = Object.values(item.checks)
      .filter((check) => !check.passed)
      .map((check) => check.name)
      .join(", ");
    lines.push(`| ${item.id} | ${item.passed ? "pass" : "fail"} | ${failedChecks || "-"} |`);
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
  const benchmark = readJson(args.benchmark);

  if (args.initTemplate) {
    writeAnswerTemplate(args.initTemplate, benchmark);
    console.log(`[alpha-answer] wrote answer template to ${args.initTemplate}`);
    console.log("[alpha-answer] fill each response, then rerun with --answers");
    return;
  }

  const answers = readJson(args.answers);
  const report = {
    createdAt: new Date().toISOString(),
    benchmarkPath: args.benchmark,
    answersPath: args.answers,
    ...evaluateAnswerReport({ benchmark, answers }),
  };
  writeReports(args, report);
  console.log(`[alpha-answer] wrote JSON report to ${args.reportJson}`);
  console.log(`[alpha-answer] wrote Markdown report to ${args.reportMd}`);
  if (report.summary.failed > 0) process.exitCode = 1;
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error?.message || error);
    process.exit(1);
  }
}

module.exports = {
  parseArgs,
  readJson,
  renderMarkdown,
  buildAnswerTemplate,
  writeAnswerTemplate,
  main,
};

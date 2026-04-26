#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { evaluateAnswerReport } = require("../server/utils/legalAnswerEval");
const { renderMarkdown } = require("./evaluate-alpha-answer-contract.cjs");

function printHelp() {
  console.log(`Usage:
  node scripts/run-alpha-answer-eval.cjs --workspace slug --workspace-api-key key [options]

Options:
  --workspace <slug>          Workspace slug. Default: lovora-alpha
  --benchmark <path>          Answer benchmark JSON.
                              Default: scripts/benchmarks/lovora_alpha_answer_contract.json
  --api-base <url>            API base URL.
                              Default: ANYTHINGLLM_BASE_URL or http://localhost:3001/api
  --workspace-api-key <key>   Workspace-service API key.
                              Default: ANYTHINGLLM_WORKSPACE_API_KEY, ANYTHINGLLM_SEARCH_API_KEY, or ANYTHINGLLM_API_KEY
  --answers-out <path>        Captured answer JSON output.
                              Default: test-results/alpha-answers-live.json
  --report-json <path>        Evaluation JSON report output.
                              Default: test-results/alpha-answer-contract.json
  --report-md <path>          Evaluation Markdown report output.
                              Default: test-results/alpha-answer-contract.md
  --limit <n>                 Optional max benchmark cases.
  --delay-ms <n>              Delay between questions. Default: 500
  --session-prefix <value>    Session id prefix. Default: alpha-answer-eval
  --help                      Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    workspace: "lovora-alpha",
    benchmark: path.resolve("scripts/benchmarks/lovora_alpha_answer_contract.json"),
    apiBase: (process.env.ANYTHINGLLM_BASE_URL || "http://localhost:3001/api").replace(/\/$/, ""),
    workspaceApiKey:
      process.env.ANYTHINGLLM_WORKSPACE_API_KEY ||
      process.env.ANYTHINGLLM_SEARCH_API_KEY ||
      process.env.ANYTHINGLLM_API_KEY ||
      "",
    answersOut: path.resolve("test-results/alpha-answers-live.json"),
    reportJson: path.resolve("test-results/alpha-answer-contract.json"),
    reportMd: path.resolve("test-results/alpha-answer-contract.md"),
    limit: null,
    delayMs: 500,
    sessionPrefix: "alpha-answer-eval",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "--workspace") args.workspace = argv[++index];
    else if (arg === "--benchmark") args.benchmark = path.resolve(argv[++index]);
    else if (arg === "--api-base") args.apiBase = argv[++index].replace(/\/$/, "");
    else if (arg === "--workspace-api-key") args.workspaceApiKey = argv[++index];
    else if (arg === "--answers-out") args.answersOut = path.resolve(argv[++index]);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++index]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++index]);
    else if (arg === "--limit") args.limit = Number(argv[++index]) || null;
    else if (arg === "--delay-ms") args.delayMs = Number(argv[++index]) || 0;
    else if (arg === "--session-prefix") args.sessionPrefix = argv[++index];
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.workspaceApiKey) {
    throw new Error(
      "--workspace-api-key or ANYTHINGLLM_WORKSPACE_API_KEY is required. Use a workspace-service key scoped to the alpha workspace."
    );
  }

  return args;
}

function readBenchmark(filePath, limit = null) {
  const payload = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const cases = Array.isArray(payload) ? payload : payload.benchmark || [];
  return limit ? cases.slice(0, limit) : cases;
}

function caseQuestion(benchmarkCase) {
  return benchmarkCase.question || benchmarkCase.query || benchmarkCase.message || "";
}

function buildChatRequestBody(benchmarkCase, sessionPrefix) {
  return {
    message: caseQuestion(benchmarkCase),
    mode: "query",
    sessionId: `${sessionPrefix}-${benchmarkCase.id}`,
    reset: true,
  };
}

async function postChat({ args, benchmarkCase, fetchImpl }) {
  const response = await fetchImpl(
    `${args.apiBase}/v1/workspace/${args.workspace}/chat`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.workspaceApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        buildChatRequestBody(benchmarkCase, args.sessionPrefix)
      ),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Chat request failed for ${benchmarkCase.id}: ${response.status} ${text.slice(0, 300)}`
    );
  }

  return response.json();
}

function answerRecord(benchmarkCase, payload) {
  return {
    id: benchmarkCase.id,
    question: caseQuestion(benchmarkCase),
    response: payload.textResponse || payload.response || "",
    type: payload.type || null,
    sources: payload.sources || [],
    error: payload.error || null,
  };
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function writeReports(args, report) {
  writeJson(args.reportJson, report);
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(
    args.reportMd,
    renderMarkdown(report, {
      benchmark: args.benchmark,
      answers: args.answersOut,
    })
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAnswerEval(args, deps = {}) {
  const fetchImpl = deps.fetch || fetch;
  const logger = deps.logger || console;
  const now = deps.now || (() => new Date());
  const benchmark = deps.benchmark || readBenchmark(args.benchmark, args.limit);
  const answers = [];

  for (const benchmarkCase of benchmark) {
    const question = caseQuestion(benchmarkCase);
    if (!question) throw new Error(`Benchmark case has no question/query: ${benchmarkCase.id}`);
    logger.log(`[alpha-answer] asking ${benchmarkCase.id}`);
    const payload = await postChat({ args, benchmarkCase, fetchImpl });
    answers.push(answerRecord(benchmarkCase, payload));
    if (args.delayMs > 0) await sleep(args.delayMs);
  }

  writeJson(args.answersOut, answers);
  const report = {
    createdAt: now().toISOString(),
    workspace: args.workspace,
    benchmarkPath: args.benchmark,
    answersPath: args.answersOut,
    ...evaluateAnswerReport({ benchmark, answers }),
  };
  writeReports(args, report);
  logger.log(`[alpha-answer] wrote answers to ${args.answersOut}`);
  logger.log(`[alpha-answer] wrote JSON report to ${args.reportJson}`);
  logger.log(`[alpha-answer] wrote Markdown report to ${args.reportMd}`);
  return report;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const report = await runAnswerEval(args);
  if (report.summary.failed > 0) process.exitCode = 1;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error?.message || error);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  readBenchmark,
  buildChatRequestBody,
  runAnswerEval,
  main,
};

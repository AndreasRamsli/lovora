#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  parseList,
  buildConfigs,
  computeMetrics,
  normalizeRemoteResult,
  rankOfFirstMatch,
  isRetryableStatus,
} = require("../server/utils/legalRemoteEval");

function printHelp() {
  console.log(`Usage:
  node scripts/remote-vector-eval.cjs --workspace slug --api-key key --report-json path --report-md path

Options:
  --workspace <slug>      Workspace slug to evaluate. Required.
  --benchmark <path>      Benchmark JSON file.
                          Default: scripts/benchmarks/lovora_alpha_chunk_tuning.json
  --api-base <url>        API base URL. Default: ANYTHINGLLM_BASE_URL or https://app.lovora.no/api
  --api-key <key>         AnythingLLM API key. Default: ANYTHINGLLM_API_KEY
  --modes <list>          Comma-separated: rerank,default. Default: rerank,default
  --topNs <list>          Comma-separated integers. Default: 4,6,8
  --thresholds <list>     Comma-separated floats. Default: 0.2,0.25,0.3
  --report-json <path>    JSON report output path.
  --report-md <path>      Markdown report output path.
  --help                  Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    workspace: null,
    benchmark: path.resolve("scripts/benchmarks/lovora_alpha_chunk_tuning.json"),
    apiBase: process.env.ANYTHINGLLM_BASE_URL || "https://app.lovora.no/api",
    apiKey: process.env.ANYTHINGLLM_API_KEY || "",
    modes: ["rerank", "default"],
    topNs: [4, 6, 8],
    thresholds: [0.2, 0.25, 0.3],
    reportJson: null,
    reportMd: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "--workspace") args.workspace = argv[++i];
    else if (arg === "--benchmark") args.benchmark = path.resolve(argv[++i]);
    else if (arg === "--api-base") args.apiBase = argv[++i].replace(/\/$/, "");
    else if (arg === "--api-key") args.apiKey = argv[++i];
    else if (arg === "--modes") args.modes = parseList(argv[++i]);
    else if (arg === "--topNs") args.topNs = parseList(argv[++i], Number);
    else if (arg === "--thresholds") args.thresholds = parseList(argv[++i], Number);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.workspace) throw new Error("--workspace is required");
  if (!args.apiKey) throw new Error("--api-key or ANYTHINGLLM_API_KEY is required");
  args.reportJson ||= path.resolve(`test-results/legal-retrieval-${args.workspace}.json`);
  args.reportMd ||= path.resolve(`test-results/legal-retrieval-${args.workspace}.md`);
  return args;
}

async function postJsonWithRetry(url, body, apiKey, attempts = 6) {
  let lastError = null;
  for (let attempt = 0; attempt < attempts; attempt++) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) return response.json();

    const text = await response.text();
    lastError = new Error(`${response.status} ${text.slice(0, 200)}`);
    if (!isRetryableStatus(response.status)) break;
    await new Promise((resolve) => setTimeout(resolve, Math.min(10_000, 1_500 * (attempt + 1))));
  }
  throw lastError;
}

async function updateWorkspaceMode(args, mode) {
  await postJsonWithRetry(
    `${args.apiBase}/v1/workspace/${args.workspace}/update`,
    { vectorSearchMode: mode },
    args.apiKey
  );
}

async function vectorSearch(args, query, config) {
  const payload = await postJsonWithRetry(
    `${args.apiBase}/v1/workspace/${args.workspace}/vector-search`,
    {
      query,
      topN: config.topN,
      scoreThreshold: config.similarityThreshold,
    },
    args.apiKey
  );
  return payload.results || [];
}

function summarizeCase(results, benchmarkCase) {
  const rank = rankOfFirstMatch(results, benchmarkCase.expect);
  return {
    id: benchmarkCase.id,
    query: benchmarkCase.query,
    tags: benchmarkCase.tags || [],
    expected: benchmarkCase.expect,
    matched: rank !== null,
    rank,
    topResults: results.slice(0, 5).map((result, index) => ({
      rank: index + 1,
      ...normalizeRemoteResult(result),
    })),
  };
}

function renderMarkdown(report) {
  const lines = ["# Retrieval Evaluation Report", ""];
  lines.push(`- Workspace: \`${report.workspace}\``);
  lines.push(`- Cases: \`${report.caseCount}\``);
  lines.push("");
  lines.push("| config | hitAt1 | hitAt3 | hitAtK | mrr |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const config of report.configResults) {
    lines.push(
      `| ${config.id} | ${config.metrics.hitAt1} | ${config.metrics.hitAt3} | ${config.metrics[`hitAt${config.topN}`]} | ${config.metrics.mrr} |`
    );
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const benchmark = JSON.parse(fs.readFileSync(args.benchmark, "utf8"));
  const configs = buildConfigs(args);
  const configResults = [];
  let currentMode = null;

  for (const config of configs) {
    const mode = config.rerank ? "rerank" : "default";
    if (mode !== currentMode) {
      await updateWorkspaceMode(args, mode);
      currentMode = mode;
    }

    console.log(`[remote-eval] running ${config.id} across ${benchmark.length} cases`);
    const caseResults = [];
    for (const benchmarkCase of benchmark) {
      const results = await vectorSearch(args, benchmarkCase.query, config);
      caseResults.push(summarizeCase(results, benchmarkCase));
    }

    configResults.push({
      ...config,
      metrics: computeMetrics(caseResults, config.topN),
      caseResults,
    });
  }

  configResults.sort((left, right) => {
    if (right.metrics.mrr !== left.metrics.mrr) return right.metrics.mrr - left.metrics.mrr;
    return right.metrics.hitAt1 - left.metrics.hitAt1;
  });

  const report = {
    createdAt: new Date().toISOString(),
    workspace: args.workspace,
    benchmarkPath: args.benchmark,
    caseCount: benchmark.length,
    configResults,
  };

  fs.mkdirSync(path.dirname(args.reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(args.reportJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(args.reportMd, renderMarkdown(report));
  console.log(`[remote-eval] wrote JSON report to ${args.reportJson}`);
  console.log(`[remote-eval] wrote Markdown report to ${args.reportMd}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  postJsonWithRetry,
  renderMarkdown,
  main,
};

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
  node scripts/remote-vector-eval.cjs --workspace slug --management-api-key key --search-api-key key --report-json path --report-md path

Options:
  --workspace <slug>      Workspace slug to evaluate. Required.
  --benchmark <path>      Benchmark JSON file.
                          Default: scripts/benchmarks/lovora_alpha_chunk_tuning.json
  --api-base <url>        API base URL. Default: ANYTHINGLLM_BASE_URL or https://app.lovora.no/api
  --management-api-key <key>
                          Management API key for workspace GET/update/restore.
                          Default: ANYTHINGLLM_MANAGEMENT_API_KEY
  --search-api-key <key>  Search API key for workspace vector-search.
                          Default: ANYTHINGLLM_SEARCH_API_KEY
  --api-key <key>         Legacy fallback key used for both management and search
                          when split keys are not provided. Default: ANYTHINGLLM_API_KEY
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
    managementApiKey: process.env.ANYTHINGLLM_MANAGEMENT_API_KEY || "",
    searchApiKey: process.env.ANYTHINGLLM_SEARCH_API_KEY || "",
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
    else if (arg === "--api-key") {
      args.apiKey = argv[++i];
    } else if (arg === "--management-api-key") args.managementApiKey = argv[++i];
    else if (arg === "--search-api-key") args.searchApiKey = argv[++i];
    else if (arg === "--modes") args.modes = parseList(argv[++i]);
    else if (arg === "--topNs") args.topNs = parseList(argv[++i], Number);
    else if (arg === "--thresholds") args.thresholds = parseList(argv[++i], Number);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.workspace) throw new Error("--workspace is required");
  args.managementApiKey ||= args.apiKey;
  args.searchApiKey ||= args.apiKey;
  if (!args.managementApiKey || !args.searchApiKey) {
    throw new Error(
      "--management-api-key/ANYTHINGLLM_MANAGEMENT_API_KEY and --search-api-key/ANYTHINGLLM_SEARCH_API_KEY are required. " +
        "Legacy --api-key/ANYTHINGLLM_API_KEY can fill both for backwards compatibility, but live policy may require split keys."
    );
  }
  args.reportJson ||= path.resolve(`test-results/legal-retrieval-${args.workspace}.json`);
  args.reportMd ||= path.resolve(`test-results/legal-retrieval-${args.workspace}.md`);
  return args;
}

async function requestJsonWithRetry(method, url, body, apiKey, attempts = 6) {
  let lastError = null;
  for (let attempt = 0; attempt < attempts; attempt++) {
    const headers = { Authorization: `Bearer ${apiKey}` };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (response.ok) return response.json();

    const text = await response.text();
    lastError = new Error(`${response.status} ${text.slice(0, 200)}`);
    if (!isRetryableStatus(response.status)) break;
    await new Promise((resolve) => setTimeout(resolve, Math.min(10_000, 1_500 * (attempt + 1))));
  }
  throw lastError;
}

async function postJsonWithRetry(url, body, apiKey, attempts = 6) {
  return requestJsonWithRetry("POST", url, body, apiKey, attempts);
}

async function getJsonWithRetry(url, apiKey, attempts = 6) {
  return requestJsonWithRetry("GET", url, undefined, apiKey, attempts);
}

async function getWorkspace(args) {
  const payload = await getJsonWithRetry(
    `${args.apiBase}/v1/workspace/${args.workspace}`,
    args.managementApiKey
  );
  return Array.isArray(payload.workspace) ? payload.workspace[0] : payload.workspace;
}

async function updateWorkspaceMode(args, mode) {
  await postJsonWithRetry(
    `${args.apiBase}/v1/workspace/${args.workspace}/update`,
    { vectorSearchMode: mode },
    args.managementApiKey
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
    args.searchApiKey
  );
  return payload.results || [];
}

function normalizeVectorSearchMode(mode) {
  const normalized = String(mode || "").trim();
  return normalized || "default";
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

function loadBenchmark(args) {
  return JSON.parse(fs.readFileSync(args.benchmark, "utf8"));
}

function writeReports(args, report) {
  fs.mkdirSync(path.dirname(args.reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(args.reportJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(args.reportMd, renderMarkdown(report));
}

async function runEvaluation(args, deps = {}) {
  const loadBenchmarkDep = deps.loadBenchmark || loadBenchmark;
  const getWorkspaceDep = deps.getWorkspace || getWorkspace;
  const updateWorkspaceModeDep = deps.updateWorkspaceMode || updateWorkspaceMode;
  const vectorSearchDep = deps.vectorSearch || vectorSearch;
  const writeReportsDep = deps.writeReports || writeReports;
  const logger = deps.logger || console;
  const now = deps.now || (() => new Date());

  const benchmark = await loadBenchmarkDep(args);
  const workspace = await getWorkspaceDep(args);
  const originalMode = normalizeVectorSearchMode(workspace?.vectorSearchMode);
  const configs = buildConfigs(args);
  const configResults = [];
  let currentMode = originalMode;
  let evaluatorChangedMode = false;
  let originalError = null;

  try {
    for (const config of configs) {
      const mode = config.rerank ? "rerank" : "default";
      if (mode !== currentMode) {
        await updateWorkspaceModeDep(args, mode);
        currentMode = mode;
        evaluatorChangedMode = true;
      }

      logger.log(`[remote-eval] running ${config.id} across ${benchmark.length} cases`);
      const caseResults = [];
      for (const benchmarkCase of benchmark) {
        const results = await vectorSearchDep(args, benchmarkCase.query, config);
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
      createdAt: now().toISOString(),
      workspace: args.workspace,
      benchmarkPath: args.benchmark,
      caseCount: benchmark.length,
      configResults,
    };

    await writeReportsDep(args, report);
    logger.log(`[remote-eval] wrote JSON report to ${args.reportJson}`);
    logger.log(`[remote-eval] wrote Markdown report to ${args.reportMd}`);
    return report;
  } catch (error) {
    originalError = error;
    throw error;
  } finally {
    if (evaluatorChangedMode && currentMode !== originalMode) {
      try {
        await updateWorkspaceModeDep(args, originalMode);
      } catch (restoreError) {
        logger.error(
          `[remote-eval] failed to restore vectorSearchMode to ${originalMode}: ${restoreError.message}`
        );
        if (!originalError) throw restoreError;
      }
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await runEvaluation(args);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  getWorkspace,
  getJsonWithRetry,
  postJsonWithRetry,
  runEvaluation,
  renderMarkdown,
  main,
};

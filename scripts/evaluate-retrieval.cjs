#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const serverRoot = path.join(repoRoot, "server");

function loadDotenv() {
  try {
    return require("dotenv");
  } catch {}

  return require(path.join(serverRoot, "node_modules", "dotenv"));
}

const dotenv = loadDotenv();

dotenv.config({ path: path.join(serverRoot, ".env") });
dotenv.config({ path: path.join(serverRoot, ".env.development"), override: false });

const { getVectorDbClass, getLLMProvider } = require(path.join(
  serverRoot,
  "utils/helpers"
));
const { Workspace } = require(path.join(serverRoot, "models/workspace"));

function printHelp() {
  console.log(`Usage:
  node scripts/evaluate-retrieval.cjs [options]

Options:
  --workspace <slug>          Workspace slug. Default: lovora
  --benchmark <path>          Path to benchmark JSON file.
                              Default: scripts/benchmarks/lovora_retrieval_starter.json
  --modes <list>              Comma-separated: rerank,default
                              Default: rerank,default
  --topNs <list>              Comma-separated integers. Default: 4,6,8
  --thresholds <list>         Comma-separated floats. Default: 0.2,0.25,0.3
  --tag <tag>                 Optional tag filter. Repeatable.
  --report-json <path>        Optional JSON report output.
  --report-md <path>          Optional Markdown report output.
  --limit <n>                 Optional max benchmark cases after filtering.
  --help                      Show this message.

Benchmark case shape:
[
  {
    "id": "hra_lugano",
    "query": "Kan et selskap utenfor konvensjonsområdet saksøke i Norge ...",
    "tags": ["hra", "jurisdiction"],
    "expect": {
      "lovdataId": "hr-2012-2393-a",
      "corpus": "HRA"
    }
  }
]

Any subset of the following expectation keys can be used:
  corpus, lovdataId, chunkSourceIncludes, urlIncludes, textIncludes, titleIncludes, titleExact

You can also use:
  "expect": {
    "anyOf": [
      { "lovdataId": "trr-2024-135" },
      { "lovdataId": "trr-2024-504" }
    ]
  }
`);
}

function parseArgList(value, mapper = (v) => v) {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(mapper);
}

function parseArgs(argv) {
  const args = {
    workspace: "lovora",
    benchmark: path.join(
      repoRoot,
      "scripts/benchmarks/lovora_retrieval_starter.json"
    ),
    modes: ["rerank", "default"],
    topNs: [4, 6, 8],
    thresholds: [0.2, 0.25, 0.3],
    tags: [],
    reportJson: null,
    reportMd: null,
    limit: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    }
    if (arg === "--workspace") args.workspace = argv[++i];
    else if (arg === "--benchmark") args.benchmark = path.resolve(argv[++i]);
    else if (arg === "--modes") args.modes = parseArgList(argv[++i]);
    else if (arg === "--topNs")
      args.topNs = parseArgList(argv[++i], (v) => Number(v)).filter(
        (v) => Number.isInteger(v) && v > 0
      );
    else if (arg === "--thresholds")
      args.thresholds = parseArgList(argv[++i], (v) => Number(v)).filter(
        (v) => !Number.isNaN(v) && v >= 0 && v <= 1
      );
    else if (arg === "--tag") args.tags.push(argv[++i]);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else if (arg === "--limit") {
      const limit = Number(argv[++i]);
      args.limit = Number.isInteger(limit) && limit > 0 ? limit : null;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function loadBenchmark(filePath) {
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(parsed)) {
    throw new Error(`Benchmark file must be an array: ${filePath}`);
  }
  return parsed.map((item, index) => {
    if (!item?.id || !item?.query || !item?.expect) {
      throw new Error(`Invalid benchmark case at index ${index}`);
    }
    return {
      id: String(item.id),
      query: String(item.query),
      tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
      notes: item.notes ? String(item.notes) : null,
      expect: item.expect,
    };
  });
}

function filterBenchmark(cases, tags = [], limit = null) {
  let filtered = cases;
  if (tags.length > 0) {
    const tagSet = new Set(tags);
    filtered = filtered.filter((item) => item.tags.some((tag) => tagSet.has(tag)));
  }
  if (limit) filtered = filtered.slice(0, limit);
  return filtered;
}

function buildConfigs({ modes, topNs, thresholds }) {
  const configs = [];
  for (const mode of modes) {
    for (const topN of topNs) {
      for (const threshold of thresholds) {
        configs.push({
          id: `${mode}-top${topN}-thr${String(threshold).replace(".", "_")}`,
          rerank: mode === "rerank",
          topN,
          similarityThreshold: threshold,
        });
      }
    }
  }
  return configs;
}

function toLower(value) {
  return typeof value === "string" ? value.toLowerCase() : "";
}

function extractCanonicalLovdataDocument(value = "") {
  const match = String(value)
    .toLowerCase()
    .match(
      /\/dokument\/(hrstr|trr|emdn|nl|sf)\/(avgjorelse|lov|forskrift)\/([a-z0-9-]+)(?=[/?#]|$)/
    );
  if (!match) return null;

  const [, rawCorpus, documentType, documentId] = match;
  const corpus = rawCorpus === "hrstr" ? "HRA" : rawCorpus.toUpperCase();
  const statuteMatch = documentId.match(
    /^(\d{4})-(\d{2})-(\d{2})-(\d+)$/
  );
  return {
    corpus,
    documentType,
    lovdataId:
      corpus === "HRA" || corpus === "TRR" || corpus === "EMDN"
        ? `${documentId}`.toLowerCase()
        : statuteMatch
          ? `${corpus.toLowerCase()}-${statuteMatch[1]}${statuteMatch[2]}${statuteMatch[3]}-${statuteMatch[4].padStart(3, "0")}`
          : null,
  };
}

function deriveLovdataId(result = {}) {
  if (result.lovdataId) return toLower(result.lovdataId);

  const canonicalDocument = [result.chunkSource, result.url]
    .filter(Boolean)
    .map(extractCanonicalLovdataDocument)
    .find(Boolean);
  if (canonicalDocument) return canonicalDocument.lovdataId;

  const candidates = [result.chunkSource, result.url, result.title]
    .filter(Boolean)
    .map(String);

  for (const value of candidates) {
    const lower = value.toLowerCase();
    let match =
      lower.match(/\/avgjorelse\/((?:hr|trr|emdn)-[a-z0-9-]+)/) ||
      lower.match(/\b((?:hr|trr|emdn)-[a-z0-9-]+)\b/);
    if (match) return match[1];
  }

  return null;
}

function deriveCorpus(result = {}) {
  if (result.corpus) return String(result.corpus).toUpperCase();
  if (result.lovdataId) {
    const normalizedId = toLower(result.lovdataId);
    if (normalizedId.startsWith("nl-")) return "NL";
    if (normalizedId.startsWith("sf-")) return "SF";
  }

  const canonicalDocument = [result.chunkSource, result.url]
    .filter(Boolean)
    .map(extractCanonicalLovdataDocument)
    .find(Boolean);
  if (canonicalDocument) return canonicalDocument.corpus;

  const candidates = [result.chunkSource, result.url, result.title]
    .filter(Boolean)
    .map((value) => String(value).toUpperCase());

  for (const value of candidates) {
    if (value.includes("/DOKUMENT/HRSIV/") || value.includes("HR-")) return "HRA";
    if (value.includes("/DOKUMENT/EMDN/") || value.includes("EMDN-")) return "EMDN";
    if (value.includes("/DOKUMENT/TRR/") || value.includes("TRR-")) return "TRR";
    if (value.includes("/NAV/RUNDSKRIV/")) return "NAV";
  }

  return null;
}

function normalizeResult(result = {}) {
  return {
    ...result,
    text: result.text || result.chunk || "",
    title: result.title || "",
    url: result.url || "",
    chunkSource: result.chunkSource || "",
    corpus: deriveCorpus(result),
    lovdataId: deriveLovdataId(result),
  };
}

function matchesSingleExpectation(result, expect) {
  if (expect.corpus && result.corpus !== expect.corpus) return false;
  if (expect.lovdataId && result.lovdataId !== expect.lovdataId) return false;
  if (
    expect.chunkSourceIncludes &&
    !toLower(result.chunkSource).includes(toLower(expect.chunkSourceIncludes))
  )
    return false;
  if (
    expect.urlIncludes &&
    ![result.url, result.chunkSource].some((value) =>
      toLower(value).includes(toLower(expect.urlIncludes))
    )
  )
    return false;
  if (
    expect.textIncludes &&
    !toLower(result.text).includes(toLower(expect.textIncludes))
  )
    return false;
  if (
    expect.titleIncludes &&
    !toLower(result.title).includes(toLower(expect.titleIncludes))
  )
    return false;
  if (
    expect.titleExact &&
    toLower(result.title) !== toLower(expect.titleExact)
  )
    return false;
  return true;
}

function matchesExpectation(result, expect) {
  if (Array.isArray(expect.anyOf) && expect.anyOf.length > 0) {
    return expect.anyOf.some((subexpect) =>
      matchesSingleExpectation(result, subexpect)
    );
  }
  return matchesSingleExpectation(result, expect);
}

function rankOfFirstMatch(results, expect) {
  for (let i = 0; i < results.length; i++) {
    if (matchesExpectation(normalizeResult(results[i]), expect)) return i + 1;
  }
  return null;
}

function summarizeCase(resultSet, benchmarkCase) {
  const rank = rankOfFirstMatch(resultSet.results, benchmarkCase.expect);
  return {
    id: benchmarkCase.id,
    query: benchmarkCase.query,
    tags: benchmarkCase.tags,
    notes: benchmarkCase.notes,
    expected: benchmarkCase.expect,
    matched: rank !== null,
    rank,
    topResults: resultSet.results.slice(0, Math.min(5, resultSet.results.length)).map(
      (rawItem, index) => {
        const item = normalizeResult(rawItem);
        return {
        rank: index + 1,
        title: item.title,
        score: item.score,
        corpus: item.corpus || null,
        lovdataId: item.lovdataId || null,
        url: item.url || null,
        chunkSource: item.chunkSource || null,
      };
      }
    ),
  };
}

function average(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value, decimals = 4) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function computeMetrics(caseResults, topN) {
  const total = caseResults.length;
  const hitAt1 = caseResults.filter((item) => item.rank === 1).length;
  const hitAt3 = caseResults.filter((item) => item.rank !== null && item.rank <= 3)
    .length;
  const hitAtK = caseResults.filter(
    (item) => item.rank !== null && item.rank <= topN
  ).length;
  const reciprocalRanks = caseResults.map((item) =>
    item.rank ? 1 / item.rank : 0
  );

  return {
    total,
    hitAt1: round(hitAt1 / total),
    hitAt3: round(hitAt3 / total),
    [`hitAt${topN}`]: round(hitAtK / total),
    mrr: round(average(reciprocalRanks)),
  };
}

function markdownTable(rows) {
  const header = [
    "Config",
    "Cases",
    "Hit@1",
    "Hit@3",
    "Hit@K",
    "MRR",
  ];
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
  ];
  for (const row of rows) {
    lines.push(
      `| ${row.config} | ${row.cases} | ${row.hitAt1} | ${row.hitAt3} | ${row.hitAtK} | ${row.mrr} |`
    );
  }
  return lines.join("\n");
}

function renderMarkdownReport(report) {
  const lines = [];
  lines.push(`# Retrieval Evaluation Report`);
  lines.push("");
  lines.push(`- Workspace: \`${report.workspace}\``);
  lines.push(`- Benchmark: \`${report.benchmarkPath}\``);
  lines.push(`- Cases: \`${report.caseCount}\``);
  lines.push("");
  lines.push(`## Summary`);
  lines.push("");

  const summaryRows = report.configResults.map((config) => ({
    config: config.id,
    cases: config.metrics.total,
    hitAt1: config.metrics.hitAt1,
    hitAt3: config.metrics.hitAt3,
    hitAtK: config.metrics[`hitAt${config.topN}`],
    mrr: config.metrics.mrr,
  }));
  lines.push(markdownTable(summaryRows));
  lines.push("");

  for (const config of report.configResults) {
    lines.push(`## ${config.id}`);
    lines.push("");
    lines.push(
      `- rerank: \`${config.rerank}\`, topN: \`${config.topN}\`, similarityThreshold: \`${config.similarityThreshold}\``
    );
    lines.push(
      `- hit@1: \`${config.metrics.hitAt1}\`, hit@3: \`${config.metrics.hitAt3}\`, hit@${config.topN}: \`${config.metrics[`hitAt${config.topN}`]}\`, mrr: \`${config.metrics.mrr}\``
    );
    lines.push("");
    lines.push(`### Misses`);
    lines.push("");

    const misses = config.caseResults.filter((item) => !item.matched);
    if (misses.length === 0) {
      lines.push(`All benchmark cases matched.`);
      lines.push("");
      continue;
    }

    for (const miss of misses) {
      lines.push(`- \`${miss.id}\`: ${miss.query}`);
      if (miss.expected?.lovdataId)
        lines.push(`  expected lovdataId: \`${miss.expected.lovdataId}\``);
      if (miss.expected?.corpus)
        lines.push(`  expected corpus: \`${miss.expected.corpus}\``);
      if (miss.topResults.length > 0) {
        const preview = miss.topResults
          .map((item) =>
            `#${item.rank} ${item.lovdataId || item.title || "unknown"} (${item.corpus || "?"}, ${round(item.score || 0, 3)})`
          )
          .join(" | ");
        lines.push(`  got: ${preview}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

async function evaluateConfig({
  workspace,
  benchmark,
  vectorDb,
  llmProvider,
  config,
}) {
  const caseResults = [];
  for (const item of benchmark) {
    const searchResult = await vectorDb.performSimilaritySearch({
      namespace: workspace.slug,
      input: item.query,
      LLMConnector: llmProvider,
      similarityThreshold: config.similarityThreshold,
      topN: config.topN,
      rerank: config.rerank,
    });
    caseResults.push(
      summarizeCase(
        { results: searchResult.sources || [] },
        item
      )
    );
  }

  return {
    ...config,
    metrics: computeMetrics(caseResults, config.topN),
    caseResults,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const benchmarkCases = filterBenchmark(
    loadBenchmark(args.benchmark),
    args.tags,
    args.limit
  );

  if (benchmarkCases.length === 0) {
    throw new Error("No benchmark cases remained after filtering.");
  }

  const workspace = await Workspace.get({ slug: args.workspace });
  if (!workspace) {
    throw new Error(`Workspace not found: ${args.workspace}`);
  }

  const vectorDb = getVectorDbClass();
  const llmProvider = getLLMProvider();
  const configs = buildConfigs(args);
  const configResults = [];

  for (const config of configs) {
    console.log(
      `[eval] running ${config.id} across ${benchmarkCases.length} cases`
    );
    configResults.push(
      await evaluateConfig({
        workspace,
        benchmark: benchmarkCases,
        vectorDb,
        llmProvider,
        config,
      })
    );
  }

  configResults.sort((a, b) => {
    if (b.metrics.mrr !== a.metrics.mrr) return b.metrics.mrr - a.metrics.mrr;
    return b.metrics.hitAt1 - a.metrics.hitAt1;
  });

  const report = {
    createdAt: new Date().toISOString(),
    workspace: workspace.slug,
    benchmarkPath: args.benchmark,
    caseCount: benchmarkCases.length,
    configResults,
  };

  const reportJson =
    args.reportJson ||
    path.join(repoRoot, "test-results", "retrieval-eval-report.json");
  const reportMd =
    args.reportMd ||
    path.join(repoRoot, "test-results", "retrieval-eval-report.md");

  fs.mkdirSync(path.dirname(reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(reportMd), { recursive: true });
  fs.writeFileSync(reportJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(reportMd, renderMarkdownReport(report));

  console.log(`[eval] wrote JSON report to ${reportJson}`);
  console.log(`[eval] wrote Markdown report to ${reportMd}`);
  console.log("[eval] top configs:");
  for (const item of configResults.slice(0, 5)) {
    console.log(
      `  - ${item.id}: mrr=${item.metrics.mrr} hit@1=${item.metrics.hitAt1} hit@${item.topN}=${item.metrics[`hitAt${item.topN}`]}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

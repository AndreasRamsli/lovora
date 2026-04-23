#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  selectTargetedRecords,
} = require("../server/utils/legalTuningSubset");

const DEFAULT_MAX_ESTIMATED_TOKENS = 12_000_000;
const DEFAULT_MAX_DISTRACTORS_PER_CASE = 25;

function printHelp() {
  console.log(`Usage:
  node scripts/build-legal-tuning-subset.cjs [options]

Options:
  --manifest <path>                 Source JSONL manifest.
                                    Default: ../legal_embedding_ready/_manifest.jsonl
  --benchmark <path>                Benchmark JSON array.
                                    Default: scripts/benchmarks/lovora_alpha_chunk_tuning.json
  --out-manifest <path>             Selected JSONL manifest output.
                                    Default: test-results/legal-tuning-subset/_manifest.jsonl
  --report-json <path>              JSON stats report output.
                                    Default: test-results/legal-tuning-subset/stats.json
  --report-md <path>                Markdown stats report output.
                                    Default: test-results/legal-tuning-subset/stats.md
  --max-estimated-tokens <n>        Token budget.
                                    Default: ${DEFAULT_MAX_ESTIMATED_TOKENS}
  --max-distractors-per-case <n>    Max distractors per benchmark case.
                                    Default: ${DEFAULT_MAX_DISTRACTORS_PER_CASE}
  --help                            Show this message.
`);
}

function parsePositiveInteger(value, optionName) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${optionName} must be a non-negative integer.`);
  }
  return parsed;
}

function parseArgs(argv) {
  const args = {
    manifest: path.resolve("../legal_embedding_ready/_manifest.jsonl"),
    benchmark: path.resolve("scripts/benchmarks/lovora_alpha_chunk_tuning.json"),
    outManifest: path.resolve("test-results/legal-tuning-subset/_manifest.jsonl"),
    reportJson: path.resolve("test-results/legal-tuning-subset/stats.json"),
    reportMd: path.resolve("test-results/legal-tuning-subset/stats.md"),
    maxEstimatedTokens: DEFAULT_MAX_ESTIMATED_TOKENS,
    maxDistractorsPerCase: DEFAULT_MAX_DISTRACTORS_PER_CASE,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    }

    if (arg === "--manifest") args.manifest = path.resolve(argv[++i]);
    else if (arg === "--benchmark") args.benchmark = path.resolve(argv[++i]);
    else if (arg === "--out-manifest") args.outManifest = path.resolve(argv[++i]);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else if (arg === "--max-estimated-tokens") {
      args.maxEstimatedTokens = parsePositiveInteger(argv[++i], arg);
    } else if (arg === "--max-distractors-per-case") {
      args.maxDistractorsPerCase = parsePositiveInteger(argv[++i], arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function readJsonlManifest(manifestPath) {
  const manifestDir = path.dirname(manifestPath);
  const lines = fs.readFileSync(manifestPath, "utf8").split(/\r?\n/);
  const records = [];

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) continue;

    let record;
    try {
      record = JSON.parse(line);
    } catch (error) {
      throw new Error(
        `Invalid JSON in manifest ${manifestPath} on line ${index + 1}: ${error.message}`
      );
    }

    if (record.skipUpload === true) continue;
    if (!record.outputPath) {
      throw new Error(`Manifest line ${index + 1} is missing outputPath.`);
    }

    const outputPath = path.isAbsolute(record.outputPath)
      ? record.outputPath
      : path.resolve(manifestDir, record.outputPath);
    const text = fs.readFileSync(outputPath, "utf8");
    records.push({ ...record, outputPath, textLength: text.length });
  }

  return records;
}

function loadBenchmark(benchmarkPath) {
  const benchmark = JSON.parse(fs.readFileSync(benchmarkPath, "utf8"));
  if (!Array.isArray(benchmark)) {
    throw new Error(`Benchmark must be a JSON array: ${benchmarkPath}`);
  }
  return benchmark;
}

function countByCorpus(records) {
  const byCorpus = {};
  for (const record of records) {
    const corpus = String(record.corpus || "UNKNOWN").toUpperCase();
    if (!byCorpus[corpus]) {
      byCorpus[corpus] = {
        recordCount: 0,
        estimatedTokens: 0,
        textLength: 0,
      };
    }
    byCorpus[corpus].recordCount += 1;
    byCorpus[corpus].estimatedTokens += Math.ceil(Number(record.textLength || 0) / 3.5);
    byCorpus[corpus].textLength += Number(record.textLength || 0);
  }
  return byCorpus;
}

function writeJsonl(filePath, records) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const content = records.map((record) => JSON.stringify(record)).join("\n");
  fs.writeFileSync(filePath, `${content}\n`);
}

function writeJson(filePath, payload) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function renderMarkdown(payload) {
  const lines = ["# Legal Tuning Subset", ""];
  lines.push(`- Selected records: ${formatNumber(payload.stats.selectedRecordCount)}`);
  lines.push(`- Expected records: ${formatNumber(payload.stats.expectedRecordCount)}`);
  lines.push(`- Expected documents: ${formatNumber(payload.stats.expectedDocumentCount)}`);
  lines.push(`- Estimated tokens: ${formatNumber(payload.stats.estimatedTokens)}`);
  lines.push(`- Token budget: ${formatNumber(payload.stats.maxEstimatedTokens)}`);
  lines.push("");
  lines.push("## By Corpus");
  lines.push("");
  lines.push("| corpus | records | estimated tokens | text length |");
  lines.push("| --- | ---: | ---: | ---: |");
  for (const corpus of Object.keys(payload.byCorpus).sort()) {
    const row = payload.byCorpus[corpus];
    lines.push(
      `| ${corpus} | ${formatNumber(row.recordCount)} | ${formatNumber(row.estimatedTokens)} | ${formatNumber(row.textLength)} |`
    );
  }
  lines.push("");
  lines.push("## Selected Records");
  lines.push("");
  lines.push("| corpus | doc_id | section | title | estimated tokens |");
  lines.push("| --- | --- | --- | --- | ---: |");
  for (const record of payload.selectedRecords) {
    lines.push(
      `| ${escapeTableCell(record.corpus)} | ${escapeTableCell(record.doc_id)} | ${escapeTableCell(record.section)} | ${escapeTableCell(record.title)} | ${formatNumber(Math.ceil(Number(record.textLength || 0) / 3.5))} |`
    );
  }
  lines.push("");
  return lines.join("\n");
}

function escapeTableCell(value = "") {
  return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const records = readJsonlManifest(args.manifest);
  const benchmark = loadBenchmark(args.benchmark);
  const result = selectTargetedRecords({
    records,
    benchmark,
    maxEstimatedTokens: args.maxEstimatedTokens,
    maxDistractorsPerCase: args.maxDistractorsPerCase,
  });
  const byCorpus = countByCorpus(result.records);
  const payload = {
    createdAt: new Date().toISOString(),
    manifest: args.manifest,
    benchmark: args.benchmark,
    stats: result.stats,
    byCorpus,
    selectedRecords: result.records.map((record) => ({
      corpus: record.corpus,
      doc_id: record.doc_id,
      section: record.section,
      title: record.title,
      outputPath: record.outputPath,
      textLength: record.textLength,
    })),
  };

  writeJsonl(args.outManifest, result.records);
  writeJson(args.reportJson, payload);
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(args.reportMd, renderMarkdown(payload));

  console.log(`[subset] wrote manifest to ${args.outManifest}`);
  console.log(`[subset] selected ${result.stats.selectedRecordCount} records`);
  console.log(
    `[subset] estimated tokens ${result.stats.estimatedTokens}/${result.stats.maxEstimatedTokens}`
  );
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
} else {
  module.exports = { readJsonlManifest };
}

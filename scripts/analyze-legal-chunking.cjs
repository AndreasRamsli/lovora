#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function printHelp() {
  console.log(`Usage:
  node scripts/analyze-legal-chunking.cjs [options]

Options:
  --manifest <path>          Manifest JSONL path.
                             Default: legal_embedding_ready/_manifest.jsonl
  --sizes <list>             Comma-separated chunk sizes. Default: 1100,1300,1500
  --report-json <path>       JSON report output.
                             Default: test-results/legal-chunking-stats.json
  --report-md <path>         Markdown report output.
                             Default: test-results/legal-chunking-stats.md
  --help                     Show this message.
`);
}

function parseSizeList(value) {
  return String(value)
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item) && item > 0);
}

function parseArgs(argv) {
  const args = {
    manifest: path.resolve("legal_embedding_ready/_manifest.jsonl"),
    sizes: [1100, 1300, 1500],
    reportJson: path.resolve("test-results/legal-chunking-stats.json"),
    reportMd: path.resolve("test-results/legal-chunking-stats.md"),
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    }
    if (arg === "--manifest") args.manifest = path.resolve(argv[++i]);
    else if (arg === "--sizes") {
      const sizes = parseSizeList(argv[++i]);
      if (sizes.length === 0) throw new Error("Expected at least one chunk size.");
      args.sizes = sizes;
    } else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function fallbackPercentile(sortedValues, fraction) {
  if (!sortedValues.length) return null;
  const index = Math.min(
    sortedValues.length - 1,
    Math.floor((sortedValues.length - 1) * fraction)
  );
  return sortedValues[index];
}

function fallbackSummarizeLengths(values = []) {
  const sorted = [...values].sort((left, right) => left - right);
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
    p50: fallbackPercentile(sorted, 0.5),
    p75: fallbackPercentile(sorted, 0.75),
    p90: fallbackPercentile(sorted, 0.9),
    p95: fallbackPercentile(sorted, 0.95),
    p99: fallbackPercentile(sorted, 0.99),
    max: sorted[sorted.length - 1],
  };
}

function fallbackSummarizeSweepResults(rows = []) {
  return rows.map((row) => ({
    ...row,
    avgChunksPerRecord:
      row.uploadableRecords > 0
        ? Number((row.totalChunks / row.uploadableRecords).toFixed(3))
        : 0,
  }));
}

function loadHelpers() {
  try {
    return {
      source: "../server/utils/legalChunkTuning",
      ...require("../server/utils/legalChunkTuning"),
    };
  } catch (error) {
    if (error?.code !== "MODULE_NOT_FOUND") throw error;
    return {
      source: "local-fallback",
      summarizeLengths: fallbackSummarizeLengths,
      summarizeSweepResults: fallbackSummarizeSweepResults,
    };
  }
}

function readManifest(manifestPath) {
  const raw = fs.readFileSync(manifestPath, "utf8").trim();
  if (!raw) return [];

  return raw
    .split("\n")
    .map((line) => JSON.parse(line))
    .filter((record) => !record.skipUpload);
}

function ensureText(record) {
  if (!record?.outputPath) {
    throw new Error(`Manifest record missing outputPath for ${record?.doc_id || "unknown"}`);
  }

  return fs.readFileSync(record.outputPath, "utf8");
}

function loadPreparedRecords(manifestPath) {
  return readManifest(manifestPath).map((record) => ({
    ...record,
    text: ensureText(record),
  }));
}

function buildSplitterMetadata(record) {
  return {
    title: record.title,
    published: record.effectiveDate || record.lastChanged || null,
    corpus: record.corpus,
    documentType: record.docType || null,
    chunkSource: record.chunkSource,
    url: record.url,
    docSource: "Lovdata",
  };
}

async function runQuietly(fn) {
  const originalLog = console.log;
  console.log = () => {};
  try {
    return await fn();
  } finally {
    console.log = originalLog;
  }
}

async function sweepChunkSizes(records, sizes) {
  const { TextSplitter } = require("../server/utils/TextSplitter");
  const rows = [];

  for (const size of sizes) {
    console.log(`[chunking] simulating size ${size} across ${records.length} records`);
    let totalChunks = 0;

    for (const record of records) {
      const metadata = buildSplitterMetadata(record);
      const chunks = await runQuietly(async () => {
        const splitter = new TextSplitter({
          chunkSize: size,
          chunkHeaderMeta: TextSplitter.buildHeaderMeta(metadata),
          documentMetadata: metadata,
        });
        return splitter.splitText(record.text);
      });
      totalChunks += chunks.length;
    }

    rows.push({
      size,
      uploadableRecords: records.length,
      totalChunks,
    });
  }

  return rows;
}

function summarizeByPredicate(records, predicate, summarize) {
  return summarize(records.filter(predicate).map((record) => record.text.length));
}

function renderMarkdown(report) {
  const lines = ["# Legal Chunking Stats", ""];

  lines.push(`- Manifest: \`${report.manifest}\``);
  lines.push(`- Uploadable records: \`${report.uploadableRecords}\``);
  lines.push(`- Candidate sizes: \`${report.sizes.join(", ")}\``);
  lines.push(`- Summarizer source: \`${report.summarizerSource}\``);
  lines.push("");
  lines.push("## Prepared Record Lengths");
  lines.push("");

  for (const [label, stats] of Object.entries(report.lengths)) {
    lines.push(`### ${label}`);
    lines.push("");
    lines.push(`- count: \`${stats.count}\``);
    lines.push(`- min: \`${stats.min}\``);
    lines.push(`- p50: \`${stats.p50}\``);
    lines.push(`- p75: \`${stats.p75}\``);
    lines.push(`- p90: \`${stats.p90}\``);
    lines.push(`- p95: \`${stats.p95}\``);
    lines.push(`- p99: \`${stats.p99}\``);
    lines.push(`- max: \`${stats.max}\``);
    lines.push("");
  }

  lines.push("## Splitter Sweep");
  lines.push("");
  lines.push("| size | uploadableRecords | totalChunks | avgChunksPerRecord |");
  lines.push("| --- | --- | --- | --- |");
  for (const row of report.sweep) {
    lines.push(
      `| ${row.size} | ${row.uploadableRecords} | ${row.totalChunks} | ${row.avgChunksPerRecord} |`
    );
  }
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const {
    source,
    summarizeLengths: summarize,
    summarizeSweepResults: summarizeSweep,
  } = loadHelpers();

  const records = loadPreparedRecords(args.manifest);
  const lengths = {
    all: summarize(records.map((record) => record.text.length)),
    NL: summarizeByPredicate(records, (record) => record.corpus === "NL", summarize),
    SF: summarizeByPredicate(records, (record) => record.corpus === "SF", summarize),
    appendix: summarizeByPredicate(
      records,
      (record) => record.segmentType === "appendix",
      summarize
    ),
  };
  const sweep = summarizeSweep(await sweepChunkSizes(records, args.sizes));
  const report = {
    createdAt: new Date().toISOString(),
    manifest: args.manifest,
    uploadableRecords: records.length,
    sizes: args.sizes,
    summarizerSource: source,
    lengths,
    sweep,
  };

  fs.mkdirSync(path.dirname(args.reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(args.reportJson, JSON.stringify(report, null, 2));
  fs.writeFileSync(args.reportMd, renderMarkdown(report));

  console.log(`[chunking] wrote JSON report to ${args.reportJson}`);
  console.log(`[chunking] wrote Markdown report to ${args.reportMd}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

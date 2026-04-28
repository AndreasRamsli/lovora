#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const MONTHS = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

function printHelp() {
  console.log(`Usage:
  node scripts/build-alpha-source-question-set.cjs [options]

Options:
  --manifest <path>  Source manifest JSONL.
                     Default: ../legal_embedding_bundled/_manifest.jsonl
  --out <path>       Benchmark JSON output.
                     Default: scripts/benchmarks/lovora_alpha_source_questions.json
  --limit <n>        Maximum cases. Default: 40
  --corpus <list>    Comma-separated corpus filter. Default: NL,SF
  --help             Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    manifest: path.resolve("../legal_embedding_bundled/_manifest.jsonl"),
    out: path.resolve("scripts/benchmarks/lovora_alpha_source_questions.json"),
    limit: 40,
    corpus: new Set(["NL", "SF"]),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      printHelp();
      process.exit(0);
    } else if (arg === "--manifest") args.manifest = path.resolve(argv[++index]);
    else if (arg === "--out") args.out = path.resolve(argv[++index]);
    else if (arg === "--limit") args.limit = Number(argv[++index]) || args.limit;
    else if (arg === "--corpus") {
      args.corpus = new Set(
        String(argv[++index])
          .split(",")
          .map((item) => item.trim().toUpperCase())
          .filter(Boolean)
      );
    } else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function readJsonl(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function readRecordText(record, manifestPath) {
  if (record.text) return String(record.text);

  const bundlePath = record.outputPath
    ? path.resolve(path.dirname(manifestPath), record.outputPath)
    : null;
  if (bundlePath && fs.existsSync(bundlePath)) {
    return fs.readFileSync(bundlePath, "utf8");
  }
  if (record.sourcePath && fs.existsSync(record.sourcePath)) {
    return fs.readFileSync(record.sourcePath, "utf8");
  }
  return "";
}

function loadSourceRecords(args) {
  return readJsonl(args.manifest)
    .filter((record) => args.corpus.has(String(record.corpus || "").toUpperCase()))
    .map((record) => ({
      ...record,
      text: readRecordText(record, args.manifest),
    }))
    .filter((record) => record.text.trim().length > 0);
}

function normalizeId(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

function sourceCitationPattern(record = {}) {
  const match = String(record.url || "").match(
    /\/(?:lov|forskrift)\/(\d{4})-(\d{2})-(\d{2})-(\d+)(?:[/?#]|$)/
  );
  if (!match) return record.shortTitle || record.title || "";
  const [, year, month, day, number] = match;
  const sourceType = String(record.url || "").includes("/forskrift/")
    ? "forskrift"
    : "lov";
  return `${sourceType} ${Number(day)}. ${MONTHS[Number(month) - 1]} ${year} nr. ${Number(number)}`;
}

function usefulTerms(snippet = "", maxTerms = 3) {
  const stopWords = new Set([
    "skal",
    "lyde",
    "etter",
    "eller",
    "dette",
    "denne",
    "første",
    "andre",
    "annet",
    "tredje",
    "fjerde",
    "punktum",
    "ledd",
    "loven",
    "forskriften",
  ]);
  return uniq(
    String(snippet)
      .match(/[A-ZÆØÅa-zæøå][A-ZÆØÅa-zæøå0-9-]{5,}/g) || []
  )
    .filter((term) => !stopWords.has(term.toLowerCase()))
    .slice(0, maxTerms);
}

function caseBase(record, suffix, question, requiredTerms, requiredCitationPatterns) {
  return {
    id: `${normalizeId(record.doc_id || record.documentId || record.title)}_${suffix}`,
    question,
    sourceType: "source_mined",
    tags: uniq([
      String(record.corpus || "").toLowerCase(),
      "answer-contract",
      "source-mined",
      record.docType || null,
    ]),
    source: {
      corpus: record.corpus || null,
      lovdataId: record.doc_id || null,
      title: record.title || null,
      shortTitle: record.shortTitle || null,
      url: record.url || null,
      chunkSource: record.chunkSource || null,
    },
    requiredTerms: uniq(requiredTerms).slice(0, 4),
    requiredCitationPatterns: uniq(requiredCitationPatterns).slice(0, 3),
    minContextRefs: 1,
  };
}

function sectionCases(record) {
  const cases = [];
  const sourceCitation = sourceCitationPattern(record);
  const pattern = /(?:Ny\s+)?(§{1,2}\s*\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)[^\n]{0,80}skal lyde:\s*([\s\S]{0,700})/gi;
  let match;
  while ((match = pattern.exec(record.text)) !== null && cases.length < 3) {
    const paragraph = match[1].replace(/\s+/g, " ").trim();
    const snippet = match[2].split(/\n\s*\n/)[0] || match[2];
    cases.push(
      caseBase(
        record,
        `section_${normalizeId(paragraph)}`,
        `Hva sier ${record.shortTitle || record.title} om ${paragraph}?`,
        usefulTerms(snippet),
        [paragraph, sourceCitation]
      )
    );
  }
  return cases;
}

function effectiveDateCase(record) {
  if (!/trer i kraft|gjelder fra|virkning fra/i.test(record.text)) return null;
  const sourceCitation = sourceCitationPattern(record);
  const dateMatch = record.text.match(
    /(?:trer i kraft|gjelder fra|virkning fra)[^.:\n]*(?:\d{1,2}\.\s+[a-zæøå]+\s+\d{4}|inntektsåret\s+\d{4}|rapporteringsåret\s+\d{4})?/i
  );
  const requiredTerms = dateMatch ? usefulTerms(dateMatch[0], 4) : ["trer i kraft"];
  return caseBase(
    record,
    "effective_date",
    `Når trer endringene i ${record.shortTitle || record.title} i kraft, eller fra når får de virkning?`,
    requiredTerms.length ? requiredTerms : ["trer i kraft"],
    [sourceCitation]
  );
}

function amendmentCase(record) {
  if (!/Endringer i følgende|gjøres følgende endringer|Følgende .* nye|går ut|endrer navn/i.test(record.text)) {
    return null;
  }
  const sourceCitation = sourceCitationPattern(record);
  const terms = usefulTerms(record.text, 4);
  return caseBase(
    record,
    "amendment_summary",
    `Hvilke hovedendringer fremgår av ${record.shortTitle || record.title}?`,
    terms,
    [sourceCitation]
  );
}

function recordPriority(record = {}) {
  const text = String(record.text || "");
  const dateMatch = String(record.url || record.doc_id || "").match(/(\d{4})/);
  const year = dateMatch ? Number(dateMatch[1]) : 0;
  return (
    year +
    (String(record.url || "").includes("/LTI/") ? 5000 : 0) +
    (/amending/i.test(String(record.docType || "")) ? 1000 : 0) +
    (/skal lyde/i.test(text) ? 700 : 0) +
    (/§\s*\d/i.test(text) ? 300 : 0) +
    (/trer i kraft|virkning fra/i.test(text) ? 100 : 0)
  );
}

function buildQuestionCases(records = [], options = {}) {
  const limit = Number(options.limit || 40);
  const cases = [];
  const seen = new Set();

  const addCase = (item) => {
    if (!item || seen.has(item.id) || cases.length >= limit) return;
    if (!item.requiredTerms.length || !item.requiredCitationPatterns.length) return;
    seen.add(item.id);
    cases.push(item);
  };

  const sortedRecords = [...records].sort((a, b) => {
    const scoreDelta = recordPriority(b) - recordPriority(a);
    if (scoreDelta !== 0) return scoreDelta;
    return String(a.doc_id || "").localeCompare(String(b.doc_id || ""));
  });

  for (const record of sortedRecords) {
    for (const item of sectionCases(record)) addCase(item);
    addCase(effectiveDateCase(record));
    addCase(amendmentCase(record));
    if (cases.length >= limit) break;
  }

  return cases;
}

function writeBenchmark(filePath, cases) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(cases, null, 2)}\n`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const records = loadSourceRecords(args);
  const cases = buildQuestionCases(records, { limit: args.limit });
  writeBenchmark(args.out, cases);
  console.log(`[alpha-source] wrote ${cases.length} cases to ${args.out}`);
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
  buildQuestionCases,
  loadSourceRecords,
  recordPriority,
  sourceCitationPattern,
  main,
};

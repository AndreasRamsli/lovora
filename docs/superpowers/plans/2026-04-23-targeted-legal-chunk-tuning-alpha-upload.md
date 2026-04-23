# Targeted Legal Chunk Tuning And Alpha Upload Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Choose the NL + SF alpha statute chunk size without spending the 50M free Voyage API tokens on three full corpus uploads, then perform one verified full alpha upload.

**Architecture:** Keep the existing full `legal_embedding_ready` snapshot as the release artifact, but add a token-budgeted targeted tuning subset for experimentation. Harden upload validation, add a checked-in remote vector-search evaluator, score `1100`, `1300`, and `1500` on targeted staging workspaces, then upload the full alpha corpus once at the winning size with `6` workers.

**Tech Stack:** Python 3 unittest, Node.js 20 CommonJS CLIs, Jest, AnythingLLM HTTP API, Hetzner SSH/Docker Compose, Voyage `voyage-law-2`, LanceDB.

---

## File Structure

**Create**
- `tests/test_upload_legal_corpus.py` - root uploader unit tests, focused on workspace attach validation and target selection.
- `lovora/server/utils/legalTuningSubset.js` - pure helpers for selecting a token-budgeted targeted manifest from the full manifest and benchmark fixture.
- `lovora/server/__tests__/utils/legalTuningSubset.test.js` - Jest tests for subset selection, token estimation, and benchmark-document guarantees.
- `lovora/server/utils/legalRemoteEval.js` - pure helpers for remote vector-search retrieval evaluation and report rendering.
- `lovora/server/__tests__/utils/legalRemoteEval.test.js` - Jest tests for ranking, metrics, retryable response classification, and Lovdata ID normalization.
- `lovora/scripts/build-legal-tuning-subset.cjs` - CLI to produce `test-results/legal-tuning-subset/_manifest.jsonl`, stats JSON, and Markdown report.
- `lovora/scripts/remote-vector-eval.cjs` - CLI to evaluate a workspace through `/api/v1/workspace/:slug/vector-search`.
- `lovora/docs/superpowers/plans/2026-04-23-targeted-legal-chunk-tuning-alpha-upload.md` - this plan.

**Modify**
- `upload_legal_corpus.py` - fail an upload when the API response reports `workspaceAttach.success=false`.
- `lovora/scripts/score-legal-chunking.cjs` - reuse existing scorer unchanged unless tests expose a regression.
- `lovora/deploy/hetzner/anythingllm.env.example` - update `LEGAL_CHUNK_SIZE_STATUTE` only after targeted evidence picks a winner.
- `lovora/server/.env.example` - align `LEGAL_CHUNK_SIZE_STATUTE` with the winner.
- `lovora/docker/.env.example` - align `LEGAL_CHUNK_SIZE_STATUTE` with the winner.
- `lovora/deploy/hetzner/README.md` - document the token-budgeted tuning workflow and the final single full upload.

**Generated During Execution**
- `lovora/test-results/legal-tuning-subset/_manifest.jsonl`
- `lovora/test-results/legal-tuning-subset/stats.json`
- `lovora/test-results/legal-tuning-subset/stats.md`
- `lovora/test-results/legal-retrieval-1100.json`
- `lovora/test-results/legal-retrieval-1100.md`
- `lovora/test-results/legal-retrieval-1300.json`
- `lovora/test-results/legal-retrieval-1300.md`
- `lovora/test-results/legal-retrieval-1500.json`
- `lovora/test-results/legal-retrieval-1500.md`
- `lovora/test-results/legal-chunking-score.json`
- `lovora/test-results/legal-chunking-score.md`

## Operating Constraints

- Do not run a full `1100`, `1300`, and `1500` live upload. The uploadable corpus is about `145.9M` characters, which is a lower-bound `36.5M-41.7M` embedding-token estimate for one pass before chunk headers and overlap.
- Use a targeted tuning subset capped by `--max-estimated-tokens 12000000` for the three-way sweep. This keeps three variants under the `50M` free-token budget with room for retries.
- Use the final full corpus upload only once, after the targeted sweep picks a statute chunk size.
- Use `--workers 6` for the final full alpha upload.
- Keep staging workspaces isolated from the production `workspace` slug.
- Clean up the partial `chunk-tune-*` workspaces and the temporary API key after the sweep.
- Before live tuning, clean up the local repos, commit and push the embedding-critical changes, then update the Hetzner checkout and runtime image to the exact committed git SHA.
- Before the final overnight alpha upload, prove embeddings persist across a Hetzner app container recreate.

## Task 1: Harden Root Uploader Workspace Attach Validation

**Files:**
- Create: `tests/test_upload_legal_corpus.py`
- Modify: `upload_legal_corpus.py`

- [ ] **Step 1: Write the failing tests**

Create `tests/test_upload_legal_corpus.py` with this content:

```python
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

import upload_legal_corpus


class UploadLegalCorpusTests(unittest.TestCase):
    def setUp(self):
        upload_legal_corpus.CONFIG = {
            "base_url": "https://example.test",
            "workspace": "chunk-tune-test",
            "upload_timeout": 10,
            "dry_run": False,
        }
        upload_legal_corpus.HEADERS = {"Authorization": "Bearer test"}

    def test_upload_record_fails_when_workspace_attach_fails(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            file_path = Path(tmpdir) / "section.md"
            file_path.write_text("# Section\n\nBody", encoding="utf-8")
            record = {
                "outputPath": str(file_path),
                "upload_folder": "lovdata-nl",
                "title": "Title",
                "url": "https://lovdata.no/dokument/NL/LOV-1687-04-15-0",
                "corpus": "NL",
                "section": "1 Art",
                "doc_id": "nl-16870415-000",
            }
            response = Mock()
            response.raise_for_status.return_value = None
            response.json.return_value = {
                "success": True,
                "documents": [{"location": "lovdata-nl/section.json"}],
                "workspaceAttach": {
                    "attempted": True,
                    "success": False,
                    "errors": ["No valid workspaces found for slugs: chunk-tune-test"],
                },
            }

            with patch("upload_legal_corpus.requests.post", return_value=response):
                with self.assertRaisesRegex(RuntimeError, "Workspace attach failed"):
                    upload_legal_corpus.upload_record(record)

    def test_upload_record_returns_location_when_workspace_attach_succeeds(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            file_path = Path(tmpdir) / "section.md"
            file_path.write_text("# Section\n\nBody", encoding="utf-8")
            record = {
                "outputPath": str(file_path),
                "upload_folder": "lovdata-nl",
                "title": "Title",
                "url": "https://lovdata.no/dokument/NL/LOV-1687-04-15-0",
                "corpus": "NL",
                "section": "1 Art",
                "doc_id": "nl-16870415-000",
            }
            response = Mock()
            response.raise_for_status.return_value = None
            response.json.return_value = {
                "success": True,
                "documents": [{"location": "lovdata-nl/section.json"}],
                "workspaceAttach": {
                    "attempted": True,
                    "success": True,
                    "errors": [],
                    "embedded": ["chunk-tune-test"],
                },
            }

            with patch("upload_legal_corpus.requests.post", return_value=response):
                self.assertEqual(
                    upload_legal_corpus.upload_record(record),
                    "lovdata-nl/section.json",
                )

    def test_select_records_excludes_skip_upload_by_default(self):
        records = [
            {"doc_id": "keep", "corpus": "NL", "skipUpload": False},
            {"doc_id": "skip", "corpus": "NL", "skipUpload": True},
        ]

        self.assertEqual(
            upload_legal_corpus.select_records(
                records,
                corpora=["NL"],
                limit=None,
                doc_ids=None,
                include_skipped=False,
            ),
            [{"doc_id": "keep", "corpus": "NL", "skipUpload": False}],
        )


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd /Users/andreas/fun/lovora
python3 -m unittest tests.test_upload_legal_corpus -v
```

Expected: FAIL with `RuntimeError not raised` for `test_upload_record_fails_when_workspace_attach_fails`.

- [ ] **Step 3: Implement attach-response validation**

In `upload_legal_corpus.py`, add this helper after `metadata_payload`:

```python
def validate_upload_response(payload: dict[str, object]) -> str:
    if not payload.get("success"):
        raise RuntimeError(str(payload))

    workspace_attach = payload.get("workspaceAttach")
    if isinstance(workspace_attach, dict):
        attempted = bool(workspace_attach.get("attempted"))
        success = bool(workspace_attach.get("success"))
        if attempted and not success:
            errors = workspace_attach.get("errors") or []
            raise RuntimeError(f"Workspace attach failed: {errors}")

    document = payload.get("documents", [{}])[0]
    return str(document.get("location") or "")
```

Then replace the bottom of `upload_record`:

```python
    payload = response.json()
    if not payload.get("success"):
        raise RuntimeError(str(payload))
    document = payload.get("documents", [{}])[0]
    return str(document.get("location") or "")
```

with:

```python
    return validate_upload_response(response.json())
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
cd /Users/andreas/fun/lovora
python3 -m unittest tests.test_upload_legal_corpus -v
```

Expected: PASS with `3 passed`.

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora
git add upload_legal_corpus.py tests/test_upload_legal_corpus.py
git commit -m "fix: validate legal corpus workspace attach"
```

## Task 2: Add Token-Budgeted Tuning Subset Helpers

**Files:**
- Create: `lovora/server/utils/legalTuningSubset.js`
- Create: `lovora/server/__tests__/utils/legalTuningSubset.test.js`

- [ ] **Step 1: Write the failing tests**

Create `lovora/server/__tests__/utils/legalTuningSubset.test.js`:

```js
const {
  estimateTokensFromChars,
  expectedLovdataIds,
  keywordSet,
  scoreRecordForBenchmark,
  selectTargetedRecords,
} = require("../../utils/legalTuningSubset");

describe("legalTuningSubset", () => {
  const benchmark = [
    {
      id: "nl_contracter",
      query: "Hva sier Norske Lov om contracter og forpligter?",
      tags: ["nl", "statute"],
      expect: { lovdataId: "nl-16870415-000", corpus: "NL" },
    },
    {
      id: "sf_kongeflaget",
      query: "Hvilken forskrift gjelder Kongeflaget?",
      tags: ["sf", "regulation"],
      expect: { lovdataId: "sf-19051115-0002", corpus: "SF" },
    },
  ];

  const records = [
    {
      doc_id: "nl-16870415-000",
      corpus: "NL",
      docType: "act",
      segmentType: "legal_section",
      title: "Kong Christian Den Femtis Norske Lov",
      section: "15 Art",
      outputPath: "/tmp/nl.md",
      textLength: 1200,
    },
    {
      doc_id: "sf-19051115-0002",
      corpus: "SF",
      docType: "regulation",
      segmentType: "legal_section",
      title: "Kongeflaget",
      section: "§ 1",
      outputPath: "/tmp/sf.md",
      textLength: 900,
    },
    {
      doc_id: "sf-19051230-0001",
      corpus: "SF",
      docType: "regulation",
      segmentType: "legal_section",
      title: "Kongevaabenet",
      section: "§ 1",
      outputPath: "/tmp/sf-distractor.md",
      textLength: 800,
    },
    {
      doc_id: "nl-20251219-113",
      corpus: "NL",
      docType: "amending_act",
      segmentType: "appendix",
      title: "CRPD endringslov",
      section: "Vedlegg",
      outputPath: "/tmp/appendix.md",
      textLength: 100000,
    },
  ];

  test("expectedLovdataIds extracts flat expectations", () => {
    expect([...expectedLovdataIds(benchmark)].sort()).toEqual([
      "nl-16870415-000",
      "sf-19051115-0002",
    ]);
  });

  test("keywordSet removes short noise words", () => {
    expect([...keywordSet("Hva sier Norske Lov om contracter?")].sort()).toEqual([
      "contracter",
      "norske",
    ]);
  });

  test("scoreRecordForBenchmark rewards corpus and keyword overlap", () => {
    const score = scoreRecordForBenchmark(records[2], benchmark[1]);
    expect(score).toBeGreaterThan(0);
    expect(scoreRecordForBenchmark(records[2], benchmark[0])).toBeLessThan(score);
  });

  test("estimateTokensFromChars uses conservative 3.5 chars per token", () => {
    expect(estimateTokensFromChars(3500)).toBe(1000);
    expect(estimateTokensFromChars(3501)).toBe(1001);
  });

  test("selectTargetedRecords always keeps expected documents inside budget", () => {
    const result = selectTargetedRecords({
      records,
      benchmark,
      maxEstimatedTokens: 1500,
      maxDistractorsPerCase: 2,
    });

    expect(result.records.map((record) => record.doc_id)).toEqual([
      "nl-16870415-000",
      "sf-19051115-0002",
    ]);
    expect(result.stats.expectedRecordCount).toBe(2);
    expect(result.stats.estimatedTokens).toBeLessThanOrEqual(1500);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/legalTuningSubset.test.js --runInBand
```

Expected: FAIL with `Cannot find module '../../utils/legalTuningSubset'`.

- [ ] **Step 3: Implement the helper**

Create `lovora/server/utils/legalTuningSubset.js`:

```js
const STOP_WORDS = new Set([
  "hva",
  "hvilken",
  "hvilke",
  "sier",
  "gjelder",
  "eller",
  "skal",
  "som",
  "for",
  "med",
  "til",
  "den",
  "det",
  "om",
  "og",
  "på",
  "i",
  "av",
]);

function normalizeText(value = "") {
  return String(value).toLowerCase();
}

function estimateTokensFromChars(charCount = 0) {
  return Math.ceil(Number(charCount || 0) / 3.5);
}

function collectExpectationIds(expect = {}, ids = new Set()) {
  if (!expect || typeof expect !== "object") return ids;
  if (expect.lovdataId) ids.add(String(expect.lovdataId).toLowerCase());
  if (Array.isArray(expect.anyOf)) {
    for (const item of expect.anyOf) collectExpectationIds(item, ids);
  }
  return ids;
}

function expectedLovdataIds(benchmark = []) {
  const ids = new Set();
  for (const item of benchmark) collectExpectationIds(item.expect, ids);
  return ids;
}

function keywordSet(value = "") {
  const words = normalizeText(value)
    .split(/[^a-z0-9æøå]+/i)
    .map((word) => word.trim())
    .filter((word) => word.length >= 5 && !STOP_WORDS.has(word));
  return new Set(words);
}

function scoreRecordForBenchmark(record = {}, benchmarkCase = {}) {
  let score = 0;
  const expect = benchmarkCase.expect || {};
  const recordId = normalizeText(record.doc_id);
  const corpus = String(record.corpus || "").toUpperCase();
  const expectedCorpus = String(expect.corpus || "").toUpperCase();
  if (expectedCorpus && corpus === expectedCorpus) score += 10;
  if (recordId && collectExpectationIds(expect).has(recordId)) score += 1000;
  const queryTerms = keywordSet(benchmarkCase.query || "");
  const haystack = keywordSet(
    [
      record.title,
      record.shortTitle,
      record.section,
      record.chapter,
      record.subchapter,
      record.docType,
      record.segmentType,
    ].join(" ")
  );
  for (const term of queryTerms) {
    if (haystack.has(term)) score += 5;
  }
  if (record.segmentType === "appendix") score += 1;
  if (record.docType === "amending_act") score += 1;
  return score;
}

function uniqueRecords(records = []) {
  const seen = new Set();
  const result = [];
  for (const record of records) {
    const key = `${record.doc_id}:${record.sectionIndex ?? record.outputPath}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(record);
  }
  return result;
}

function selectTargetedRecords({
  records = [],
  benchmark = [],
  maxEstimatedTokens = 12_000_000,
  maxDistractorsPerCase = 25,
}) {
  const expectedIds = expectedLovdataIds(benchmark);
  const expectedRecords = records.filter((record) =>
    expectedIds.has(normalizeText(record.doc_id))
  );
  const distractors = [];
  for (const benchmarkCase of benchmark) {
    const ranked = records
      .filter((record) => !expectedIds.has(normalizeText(record.doc_id)))
      .map((record) => ({
        record,
        score: scoreRecordForBenchmark(record, benchmarkCase),
      }))
      .filter((item) => item.score > 0)
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score;
        return Number(left.record.textLength || 0) - Number(right.record.textLength || 0);
      })
      .slice(0, maxDistractorsPerCase)
      .map((item) => item.record);
    distractors.push(...ranked);
  }

  const selected = [];
  let estimatedTokens = 0;
  for (const record of uniqueRecords([...expectedRecords, ...distractors])) {
    const recordTokens = estimateTokensFromChars(record.textLength || 0);
    const isExpected = expectedIds.has(normalizeText(record.doc_id));
    if (!isExpected && estimatedTokens + recordTokens > maxEstimatedTokens) continue;
    selected.push(record);
    estimatedTokens += recordTokens;
  }

  return {
    records: selected,
    stats: {
      benchmarkCaseCount: benchmark.length,
      expectedDocumentCount: expectedIds.size,
      expectedRecordCount: expectedRecords.length,
      selectedRecordCount: selected.length,
      estimatedTokens,
      maxEstimatedTokens,
      maxDistractorsPerCase,
    },
  };
}

module.exports = {
  estimateTokensFromChars,
  expectedLovdataIds,
  keywordSet,
  scoreRecordForBenchmark,
  selectTargetedRecords,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/legalTuningSubset.test.js --runInBand
```

Expected: PASS with `5 passed`.

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/utils/legalTuningSubset.js server/__tests__/utils/legalTuningSubset.test.js
git commit -m "feat: add legal tuning subset selection"
```

## Task 3: Add The Targeted Manifest Builder CLI

**Files:**
- Create: `lovora/scripts/build-legal-tuning-subset.cjs`
- Modify: `lovora/server/__tests__/utils/legalTuningSubset.test.js`

- [ ] **Step 1: Add a CLI smoke fixture test to the helper test**

Append this test to `lovora/server/__tests__/utils/legalTuningSubset.test.js`:

```js
test("selectTargetedRecords reports selected count and token budget", () => {
  const result = selectTargetedRecords({
    records,
    benchmark,
    maxEstimatedTokens: 10_000,
    maxDistractorsPerCase: 1,
  });

  expect(result.stats).toMatchObject({
    benchmarkCaseCount: 2,
    expectedDocumentCount: 2,
    selectedRecordCount: 4,
    maxEstimatedTokens: 10_000,
  });
});
```

- [ ] **Step 2: Run test to verify helper still passes**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/legalTuningSubset.test.js --runInBand
```

Expected: PASS with `6 passed`.

- [ ] **Step 3: Implement the CLI**

Create `lovora/scripts/build-legal-tuning-subset.cjs`:

```js
#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {
  selectTargetedRecords,
  estimateTokensFromChars,
} = require("../server/utils/legalTuningSubset");

function printHelp() {
  console.log(`Usage:
  node scripts/build-legal-tuning-subset.cjs [options]

Options:
  --manifest <path>              Full manifest JSONL.
  --benchmark <path>             Benchmark JSON file.
  --out-manifest <path>          Targeted manifest JSONL output.
  --report-json <path>           Stats JSON output.
  --report-md <path>             Stats Markdown output.
  --max-estimated-tokens <n>     Default: 12000000
  --max-distractors-per-case <n> Default: 25
  --help                         Show this message.
`);
}

function parseArgs(argv) {
  const args = {
    manifest: path.resolve("../legal_embedding_ready/_manifest.jsonl"),
    benchmark: path.resolve("scripts/benchmarks/lovora_alpha_chunk_tuning.json"),
    outManifest: path.resolve("test-results/legal-tuning-subset/_manifest.jsonl"),
    reportJson: path.resolve("test-results/legal-tuning-subset/stats.json"),
    reportMd: path.resolve("test-results/legal-tuning-subset/stats.md"),
    maxEstimatedTokens: 12_000_000,
    maxDistractorsPerCase: 25,
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
    else if (arg === "--max-estimated-tokens") args.maxEstimatedTokens = Number(argv[++i]);
    else if (arg === "--max-distractors-per-case") args.maxDistractorsPerCase = Number(argv[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function readManifest(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").trim();
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => JSON.parse(line))
    .filter((record) => !record.skipUpload)
    .map((record) => {
      const text = fs.readFileSync(record.outputPath, "utf8");
      return { ...record, textLength: text.length };
    });
}

function renderMarkdown(payload) {
  const lines = ["# Legal Tuning Subset", ""];
  lines.push(`- Full manifest: \`${payload.manifest}\``);
  lines.push(`- Benchmark: \`${payload.benchmark}\``);
  lines.push(`- Selected records: \`${payload.stats.selectedRecordCount}\``);
  lines.push(`- Expected records: \`${payload.stats.expectedRecordCount}\``);
  lines.push(`- Estimated tokens: \`${payload.stats.estimatedTokens}\``);
  lines.push(`- Token budget: \`${payload.stats.maxEstimatedTokens}\``);
  lines.push("");
  lines.push("| corpus | records | estimatedTokens |");
  lines.push("| --- | --- | --- |");
  for (const [corpus, row] of Object.entries(payload.byCorpus)) {
    lines.push(`| ${corpus} | ${row.records} | ${row.estimatedTokens} |`);
  }
  lines.push("");
  return lines.join("\n");
}

function summarizeByCorpus(records) {
  const summary = {};
  for (const record of records) {
    const corpus = record.corpus || "unknown";
    if (!summary[corpus]) summary[corpus] = { records: 0, estimatedTokens: 0 };
    summary[corpus].records += 1;
    summary[corpus].estimatedTokens += estimateTokensFromChars(record.textLength || 0);
  }
  return summary;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const records = readManifest(args.manifest);
  const benchmark = JSON.parse(fs.readFileSync(args.benchmark, "utf8"));
  const { records: selectedRecords, stats } = selectTargetedRecords({
    records,
    benchmark,
    maxEstimatedTokens: args.maxEstimatedTokens,
    maxDistractorsPerCase: args.maxDistractorsPerCase,
  });
  const payload = {
    createdAt: new Date().toISOString(),
    manifest: args.manifest,
    benchmark: args.benchmark,
    stats,
    byCorpus: summarizeByCorpus(selectedRecords),
  };

  fs.mkdirSync(path.dirname(args.outManifest), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportJson), { recursive: true });
  fs.mkdirSync(path.dirname(args.reportMd), { recursive: true });
  fs.writeFileSync(
    args.outManifest,
    selectedRecords.map((record) => JSON.stringify(record)).join("\n") + "\n"
  );
  fs.writeFileSync(args.reportJson, JSON.stringify(payload, null, 2));
  fs.writeFileSync(args.reportMd, renderMarkdown(payload));
  console.log(`[subset] wrote manifest to ${args.outManifest}`);
  console.log(`[subset] selected ${stats.selectedRecordCount} records`);
  console.log(`[subset] estimated tokens ${stats.estimatedTokens}/${stats.maxEstimatedTokens}`);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
```

- [ ] **Step 4: Run CLI help and real subset build**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node scripts/build-legal-tuning-subset.cjs --help
node scripts/build-legal-tuning-subset.cjs \
  --manifest /Users/andreas/fun/lovora/legal_embedding_ready/_manifest.jsonl \
  --benchmark scripts/benchmarks/lovora_alpha_chunk_tuning.json \
  --out-manifest test-results/legal-tuning-subset/_manifest.jsonl \
  --report-json test-results/legal-tuning-subset/stats.json \
  --report-md test-results/legal-tuning-subset/stats.md \
  --max-estimated-tokens 12000000 \
  --max-distractors-per-case 25
```

Expected: PASS. The second command prints `[subset] selected 1 or more records` and an estimated token total less than or equal to `12000000`.

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add scripts/build-legal-tuning-subset.cjs server/__tests__/utils/legalTuningSubset.test.js
git commit -m "feat: build targeted legal tuning subset"
```

## Task 4: Add Remote Vector Retrieval Evaluation

**Files:**
- Create: `lovora/server/utils/legalRemoteEval.js`
- Create: `lovora/server/__tests__/utils/legalRemoteEval.test.js`
- Create: `lovora/scripts/remote-vector-eval.cjs`

- [ ] **Step 1: Write the failing tests**

Create `lovora/server/__tests__/utils/legalRemoteEval.test.js`:

```js
const {
  buildConfigs,
  computeMetrics,
  deriveLovdataId,
  normalizeRemoteResult,
  rankOfFirstMatch,
  isRetryableStatus,
} = require("../../utils/legalRemoteEval");

describe("legalRemoteEval", () => {
  test("buildConfigs creates stable config IDs", () => {
    expect(
      buildConfigs({
        modes: ["default"],
        topNs: [4],
        thresholds: [0.2],
      })
    ).toEqual([
      {
        id: "default-top4-thr0_2",
        rerank: false,
        topN: 4,
        similarityThreshold: 0.2,
      },
    ]);
  });

  test("deriveLovdataId normalizes canonical statute URLs", () => {
    expect(
      deriveLovdataId({
        url: "https://lovdata.no/dokument/NL/lov/1687-04-15-0#section-0001",
      })
    ).toBe("nl-16870415-000");
  });

  test("rankOfFirstMatch finds expected Lovdata ID", () => {
    const rank = rankOfFirstMatch(
      [
        { metadata: { url: "https://lovdata.no/dokument/SF/forskrift/1905-12-30-1" } },
        { metadata: { url: "https://lovdata.no/dokument/NL/lov/1687-04-15-0" } },
      ],
      { lovdataId: "nl-16870415-000", corpus: "NL" }
    );
    expect(rank).toBe(2);
  });

  test("computeMetrics reports hit rates and mrr", () => {
    expect(
      computeMetrics(
        [
          { rank: 1 },
          { rank: 3 },
          { rank: null },
        ],
        4
      )
    ).toEqual({
      total: 3,
      hitAt1: 0.3333,
      hitAt3: 0.6667,
      hitAt4: 0.6667,
      mrr: 0.4444,
    });
  });

  test("isRetryableStatus covers transient HTTP failures", () => {
    expect(isRetryableStatus(429)).toBe(true);
    expect(isRetryableStatus(503)).toBe(true);
    expect(isRetryableStatus(403)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/legalRemoteEval.test.js --runInBand
```

Expected: FAIL with `Cannot find module '../../utils/legalRemoteEval'`.

- [ ] **Step 3: Implement the helper**

Create `lovora/server/utils/legalRemoteEval.js`:

```js
function parseList(value, mapper = (item) => item) {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(mapper);
}

function buildConfigs({ modes = ["rerank", "default"], topNs = [4, 6, 8], thresholds = [0.2, 0.25, 0.3] }) {
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

function round(value, decimals = 4) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function canonicalDocument(value = "") {
  const match = String(value)
    .toLowerCase()
    .match(/\/dokument\/(hrstr|trr|emdn|nl|sf)\/(avgjorelse|lov|forskrift)\/([a-z0-9-]+)(?=[/?#]|$)/);
  if (!match) return null;
  const [, rawCorpus, documentType, documentId] = match;
  const corpus = rawCorpus === "hrstr" ? "HRA" : rawCorpus.toUpperCase();
  const statuteMatch = documentId.match(/^(\d{4})-(\d{2})-(\d{2})-(\d+)$/);
  return {
    corpus,
    documentType,
    lovdataId:
      corpus === "HRA" || corpus === "TRR" || corpus === "EMDN"
        ? documentId
        : statuteMatch
          ? `${corpus.toLowerCase()}-${statuteMatch[1]}${statuteMatch[2]}${statuteMatch[3]}-${statuteMatch[4].padStart(3, "0")}`
          : null,
  };
}

function deriveLovdataId(result = {}) {
  if (result.lovdataId) return String(result.lovdataId).toLowerCase();
  const metadata = result.metadata || {};
  for (const value of [metadata.chunkSource, metadata.url, result.chunkSource, result.url]) {
    const doc = canonicalDocument(value);
    if (doc?.lovdataId) return doc.lovdataId;
  }
  return null;
}

function deriveCorpus(result = {}) {
  if (result.corpus) return String(result.corpus).toUpperCase();
  const metadata = result.metadata || {};
  if (metadata.corpus) return String(metadata.corpus).toUpperCase();
  const lovdataId = deriveLovdataId(result);
  if (lovdataId?.startsWith("nl-")) return "NL";
  if (lovdataId?.startsWith("sf-")) return "SF";
  for (const value of [metadata.chunkSource, metadata.url, result.chunkSource, result.url]) {
    const doc = canonicalDocument(value);
    if (doc?.corpus) return doc.corpus;
  }
  return null;
}

function normalizeRemoteResult(result = {}) {
  const metadata = result.metadata || {};
  return {
    title: metadata.title || result.title || "",
    url: metadata.url || result.url || "",
    chunkSource: metadata.chunkSource || result.chunkSource || "",
    score: result.score,
    corpus: deriveCorpus(result),
    lovdataId: deriveLovdataId(result),
  };
}

function matchesSingleExpectation(result, expect = {}) {
  if (expect.corpus && result.corpus !== expect.corpus) return false;
  if (expect.lovdataId && result.lovdataId !== String(expect.lovdataId).toLowerCase()) return false;
  if (expect.urlIncludes && !String(result.url).toLowerCase().includes(String(expect.urlIncludes).toLowerCase())) return false;
  if (expect.titleIncludes && !String(result.title).toLowerCase().includes(String(expect.titleIncludes).toLowerCase())) return false;
  return true;
}

function matchesExpectation(result, expect = {}) {
  if (Array.isArray(expect.anyOf) && expect.anyOf.length > 0) {
    return expect.anyOf.some((item) => matchesSingleExpectation(result, item));
  }
  return matchesSingleExpectation(result, expect);
}

function rankOfFirstMatch(results = [], expect = {}) {
  for (let index = 0; index < results.length; index++) {
    if (matchesExpectation(normalizeRemoteResult(results[index]), expect)) return index + 1;
  }
  return null;
}

function computeMetrics(caseResults = [], topN = 4) {
  const total = caseResults.length;
  const hitAt1 = caseResults.filter((item) => item.rank === 1).length;
  const hitAt3 = caseResults.filter((item) => item.rank !== null && item.rank <= 3).length;
  const hitAtK = caseResults.filter((item) => item.rank !== null && item.rank <= topN).length;
  const reciprocalRanks = caseResults.map((item) => (item.rank ? 1 / item.rank : 0));
  const mrr = reciprocalRanks.reduce((sum, value) => sum + value, 0) / total;
  return {
    total,
    hitAt1: round(hitAt1 / total),
    hitAt3: round(hitAt3 / total),
    [`hitAt${topN}`]: round(hitAtK / total),
    mrr: round(mrr),
  };
}

function isRetryableStatus(status) {
  return [429, 500, 502, 503, 504].includes(Number(status));
}

module.exports = {
  parseList,
  buildConfigs,
  computeMetrics,
  deriveLovdataId,
  normalizeRemoteResult,
  rankOfFirstMatch,
  isRetryableStatus,
};
```

- [ ] **Step 4: Implement the CLI**

Create `lovora/scripts/remote-vector-eval.cjs`:

```js
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
    if (arg === "--workspace") args.workspace = argv[++i];
    else if (arg === "--benchmark") args.benchmark = path.resolve(argv[++i]);
    else if (arg === "--api-base") args.apiBase = argv[++i].replace(/\/$/, "");
    else if (arg === "--api-key") args.apiKey = argv[++i];
    else if (arg === "--modes") args.modes = parseList(argv[++i]);
    else if (arg === "--topNs") args.topNs = parseList(argv[++i], Number);
    else if (arg === "--thresholds") args.thresholds = parseList(argv[++i], Number);
    else if (arg === "--report-json") args.reportJson = path.resolve(argv[++i]);
    else if (arg === "--report-md") args.reportMd = path.resolve(argv[++i]);
    else if (arg === "--help") {
      console.log("Usage: node scripts/remote-vector-eval.cjs --workspace slug --api-key key --report-json path --report-md path");
      process.exit(0);
    } else throw new Error(`Unknown argument: ${arg}`);
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

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

- [ ] **Step 5: Run tests and CLI help**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/legalRemoteEval.test.js --runInBand
node scripts/remote-vector-eval.cjs --help
```

Expected: Jest PASS with `5 passed`, CLI prints usage.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/utils/legalRemoteEval.js server/__tests__/utils/legalRemoteEval.test.js scripts/remote-vector-eval.cjs
git commit -m "feat: add remote legal retrieval evaluation"
```

## Task 5: Clean Up Local Git And Push Embedding-Critical Changes

**Files:**
- Root repo: `/Users/andreas/fun/lovora`
- App repo: `/Users/andreas/fun/lovora/lovora`

- [ ] **Step 1: Inspect both repo states**

Run:

```bash
git -C /Users/andreas/fun/lovora status --short
git -C /Users/andreas/fun/lovora/lovora status --short
```

Expected: the root repo is clean or only has corpus files intentionally changed in this plan. The app repo may contain unrelated privacy/API-key work; do not stage unrelated files.

- [ ] **Step 2: Create or switch to an embedding-focused branch in the app repo**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git switch -c codex/targeted-legal-chunk-tuning || git switch codex/targeted-legal-chunk-tuning
```

Expected: current branch is `codex/targeted-legal-chunk-tuning`.

- [ ] **Step 3: Stage only app embedding-critical files**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git add \
  docs/superpowers/plans/2026-04-23-targeted-legal-chunk-tuning-alpha-upload.md \
  scripts/analyze-legal-chunking.cjs \
  scripts/build-legal-tuning-subset.cjs \
  scripts/remote-vector-eval.cjs \
  scripts/score-legal-chunking.cjs \
  scripts/benchmarks/lovora_alpha_chunk_tuning.json \
  server/utils/legalChunkTuning.js \
  server/utils/legalTuningSubset.js \
  server/utils/legalRemoteEval.js \
  server/__tests__/utils/legalChunkTuning.test.js \
  server/__tests__/utils/legalTuningSubset.test.js \
  server/__tests__/utils/legalRemoteEval.test.js \
  deploy/hetzner/anythingllm.env.example \
  server/.env.example \
  docker/.env.example \
  deploy/hetzner/README.md
git diff --cached --stat
```

Expected: staged files are limited to legal chunk tuning, targeted evaluation, env examples, and deploy docs.

- [ ] **Step 4: Commit and push the app embedding-critical files**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git commit -m "feat: add targeted legal chunk tuning workflow"
git push -u origin codex/targeted-legal-chunk-tuning
```

Expected: commit and push succeed.

- [ ] **Step 5: Commit root corpus tooling only if it is dirty**

Run:

```bash
cd /Users/andreas/fun/lovora
git status --short -- prepare_legal_corpus.py upload_legal_corpus.py tests/test_prepare_legal_corpus.py tests/test_upload_legal_corpus.py
```

If that command prints files, run:

```bash
cd /Users/andreas/fun/lovora
git switch -c codex/legal-corpus-source-of-truth || git switch codex/legal-corpus-source-of-truth
git add prepare_legal_corpus.py upload_legal_corpus.py tests/test_prepare_legal_corpus.py tests/test_upload_legal_corpus.py
git commit -m "fix: harden legal corpus preparation and upload"
git push -u origin codex/legal-corpus-source-of-truth
```

Expected: root corpus-tooling changes are committed and pushed if they exist. Generated `legal_embedding_ready` files are not staged.

- [ ] **Step 6: Verify unrelated local changes remain unstaged**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git diff --cached --name-only
git status --short | rg -v '^(A|M|D)  (docs/superpowers/plans/2026-04-23-targeted-legal-chunk-tuning-alpha-upload.md|scripts/|server/utils/legal|server/__tests__/utils/legal|deploy/hetzner/|server/.env.example|docker/.env.example)' || true
```

Expected: the first command shows no staged files after commit. The second command may show unrelated work, but those files are unstaged and intentionally left alone.

## Task 6: Deploy The Current Git SHA To Hetzner

**Files:**
- Live server checkout: `/srv/lovora/lovora`
- Live deployment bundle: `/srv/lovora/lovora/deploy/hetzner`

- [ ] **Step 1: Verify local implementation commits exist**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git log --oneline -5
git status --short scripts/build-legal-tuning-subset.cjs scripts/remote-vector-eval.cjs server/utils/legalTuningSubset.js server/utils/legalRemoteEval.js server/__tests__/utils/legalTuningSubset.test.js server/__tests__/utils/legalRemoteEval.test.js deploy/hetzner/README.md deploy/hetzner/anythingllm.env.example server/.env.example docker/.env.example
```

Expected: the recent commits include the task commits from this plan, and the scoped `git status --short` output is empty.

- [ ] **Step 2: Push the current branch**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
export LOVORA_DEPLOY_BRANCH="$(git branch --show-current)"
export LOVORA_DEPLOY_SHA="$(git rev-parse HEAD)"
git push origin "$LOVORA_DEPLOY_BRANCH"
```

Expected: push succeeds and `LOVORA_DEPLOY_SHA` is the commit that should run on Hetzner.

- [ ] **Step 3: Confirm the server checkout is clean enough to switch**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora && git status --short'
```

Expected: no output. If this prints files, stop this task and inspect those server-side changes before deploying.

- [ ] **Step 4: Move the server checkout to the exact git SHA and roll out**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "
set -euo pipefail
cd /srv/lovora/lovora
git fetch origin \"$LOVORA_DEPLOY_BRANCH\"
git checkout \"$LOVORA_DEPLOY_SHA\"
cd /srv/lovora/lovora/deploy/hetzner
bash scripts/preflight.sh
bash scripts/rollout.sh
"
```

Expected: preflight and rollout exit `0`.

- [ ] **Step 5: Verify the server is running the committed SHA**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "
cd /srv/lovora/lovora
test \"\$(git rev-parse HEAD)\" = \"$LOVORA_DEPLOY_SHA\"
cd /srv/lovora/lovora/deploy/hetzner
docker compose -f docker-compose.yml ps
"
curl -fsS https://app.lovora.no/api/health
curl -fsS https://app.lovora.no/v1/api/health
curl -fsS https://app.lovora.no/api/setup-complete
```

Expected: the SHA test exits `0`, Docker Compose shows healthy services, and all three health checks exit `0`.

## Task 7: Prove Hetzner Embedding Persistence

**Files:**
- Live compose file: `/srv/lovora/lovora/deploy/hetzner/docker-compose.yml`
- Live persistent storage: `/srv/lovora/lovora/.data/hetzner/server/storage`

- [ ] **Step 1: Verify storage is host-mounted**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "
set -euo pipefail
cd /srv/lovora/lovora/deploy/hetzner
docker compose -f docker-compose.yml config | rg '/app/server/storage'
test -d /srv/lovora/lovora/.data/hetzner/server/storage
test -d /srv/lovora/lovora/.data/hetzner/server/storage/lancedb || mkdir -p /srv/lovora/lovora/.data/hetzner/server/storage/lancedb
"
```

Expected: compose config shows a host path mounted to `/app/server/storage`, and the host `storage/lancedb` directory exists.

- [ ] **Step 2: Create a temporary management API key on Hetzner**

Run:

```bash
export LOVORA_CHUNK_TUNE_API_KEY="$(
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 'python3 - <<'"'"'PY'"'"'
import json
import secrets
import sqlite3

db = "/srv/lovora/lovora/.data/hetzner/server/storage/anythingllm.db"
secret = "codex_chunk_tune_" + secrets.token_hex(24)
scopes = [
    "management:metadata:read",
    "management:metadata:write",
    "management:moderation:write",
    "management:users:read",
    "management:users:write",
]
conn = sqlite3.connect(db)
conn.execute(
    """
    INSERT INTO api_keys (secret, name, createdBy, principalType, workspaceId, scopes)
    VALUES (?, ?, ?, ?, ?, ?)
    """,
    (secret, "Codex chunk tuning temporary key", None, "management", None, json.dumps(scopes)),
)
conn.commit()
conn.close()
print(secret)
PY'
)"
printf 'Created temporary key prefix: %.24s\n' "$LOVORA_CHUNK_TUNE_API_KEY"
```

Expected: prints a prefix that starts with `Created temporary key prefix: codex_chunk_tune_`.

- [ ] **Step 3: Create a temporary persistence workspace**

Run:

```bash
python3 - <<'PY' > /tmp/lovora_persistence_workspace.txt
import datetime
import os
import requests

api_key = os.environ["LOVORA_CHUNK_TUNE_API_KEY"]
base = "https://app.lovora.no/api"
name = "persistence-probe-" + datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
response = requests.post(
    f"{base}/v1/workspace/new",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={"name": name},
    timeout=30,
)
response.raise_for_status()
print(response.json()["workspace"]["slug"])
PY
export PERSISTENCE_WS="$(cat /tmp/lovora_persistence_workspace.txt)"
printf 'Persistence workspace: %s\n' "$PERSISTENCE_WS"
```

Expected: prints a workspace slug beginning with `persistence-probe-`.

- [ ] **Step 4: Upload a tiny probe document**

Run:

```bash
cat > /tmp/lovora-persistence-probe.md <<'EOF'
# Lovora Persistence Probe

The phrase persistent-embedding-proof-20260423 verifies LanceDB survives an app container recreate.
EOF

curl -fsS \
  -H "Authorization: Bearer $LOVORA_CHUNK_TUNE_API_KEY" \
  -F "file=@/tmp/lovora-persistence-probe.md;type=text/markdown" \
  -F "addToWorkspaces=$PERSISTENCE_WS" \
  -F 'metadata={"title":"Lovora Persistence Probe","docSource":"Codex","chunkSource":"persistence://lovora-20260423"}' \
  "https://app.lovora.no/api/v1/document/upload/lovora-persistence-probe" \
  > /tmp/lovora_persistence_upload.json
python3 -m json.tool /tmp/lovora_persistence_upload.json
```

Expected: JSON contains `"success": true` and a `workspaceAttach` object where `"attempted": true` and `"success": true`.

- [ ] **Step 5: Verify search before recreate**

Run:

```bash
curl -fsS \
  -H "Authorization: Bearer $LOVORA_CHUNK_TUNE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query":"persistent-embedding-proof-20260423","topN":3,"scoreThreshold":0.1}' \
  "https://app.lovora.no/api/v1/workspace/$PERSISTENCE_WS/vector-search" \
  > /tmp/lovora_persistence_before.json
python3 - <<'PY'
import json
payload = json.load(open("/tmp/lovora_persistence_before.json"))
assert payload["results"], payload
print(payload["results"][0]["metadata"]["title"])
PY
```

Expected: prints `Lovora Persistence Probe`.

- [ ] **Step 6: Recreate the app container and verify search after recreate**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "
set -euo pipefail
cd /srv/lovora/lovora/deploy/hetzner
docker compose -f docker-compose.yml up -d --force-recreate app
"
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'until curl -fsS https://app.lovora.no/api/health >/dev/null; do sleep 5; done'
curl -fsS \
  -H "Authorization: Bearer $LOVORA_CHUNK_TUNE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query":"persistent-embedding-proof-20260423","topN":3,"scoreThreshold":0.1}' \
  "https://app.lovora.no/api/v1/workspace/$PERSISTENCE_WS/vector-search" \
  > /tmp/lovora_persistence_after.json
python3 - <<'PY'
import json
payload = json.load(open("/tmp/lovora_persistence_after.json"))
assert payload["results"], payload
print(payload["results"][0]["metadata"]["title"])
PY
```

Expected: prints `Lovora Persistence Probe` after the app container has been recreated.

- [ ] **Step 7: Delete the persistence workspace**

Run:

```bash
curl -fsS \
  -X DELETE \
  -H "Authorization: Bearer $LOVORA_CHUNK_TUNE_API_KEY" \
  "https://app.lovora.no/api/v1/workspace/$PERSISTENCE_WS"
```

Expected: exits `0`.

## Task 8: Execute The Targeted Live Chunk Sweep

**Files:**
- Generated: `lovora/test-results/legal-tuning-subset/_manifest.jsonl`
- Generated: `lovora/test-results/legal-retrieval-1100.json`
- Generated: `lovora/test-results/legal-retrieval-1300.json`
- Generated: `lovora/test-results/legal-retrieval-1500.json`
- Generated: `lovora/test-results/legal-chunking-score.json`

- [ ] **Step 1: Stop any accidental full-corpus upload process**

Run:

```bash
pkill -TERM -f 'upload_legal_corpus.py.*chunk-tune-' || true
sleep 2
ps -axo pid,command | rg 'upload_legal_corpus.py.*chunk-tune-' || true
```

Expected: no running `upload_legal_corpus.py` process remains.

- [ ] **Step 2: Verify the temporary management API key is available**

Run:

```bash
test -n "${LOVORA_CHUNK_TUNE_API_KEY:-}"
printf 'Using temporary key prefix: %.24s\n' "$LOVORA_CHUNK_TUNE_API_KEY"
```

Expected: prints a prefix that starts with `Using temporary key prefix: codex_chunk_tune_`.

- [ ] **Step 3: Build the targeted subset**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node scripts/build-legal-tuning-subset.cjs \
  --manifest /Users/andreas/fun/lovora/legal_embedding_ready/_manifest.jsonl \
  --benchmark scripts/benchmarks/lovora_alpha_chunk_tuning.json \
  --out-manifest test-results/legal-tuning-subset/_manifest.jsonl \
  --report-json test-results/legal-tuning-subset/stats.json \
  --report-md test-results/legal-tuning-subset/stats.md \
  --max-estimated-tokens 12000000 \
  --max-distractors-per-case 25
```

Expected: prints selected record count and estimated tokens. The estimated token count must be `<=12000000`.

- [ ] **Step 4: Create isolated staging workspaces**

Run:

```bash
python3 - <<'PY' > /tmp/lovora_chunk_tune_slugs.json
import datetime
import json
import os
import requests

api_key = os.environ["LOVORA_CHUNK_TUNE_API_KEY"]
base = "https://app.lovora.no/api"
stamp = datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")
slugs = {}
for size in (1100, 1300, 1500):
    response = requests.post(
        f"{base}/v1/workspace/new",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        json={"name": f"chunk-tune-{size}-{stamp}"},
        timeout=30,
    )
    response.raise_for_status()
    slugs[str(size)] = response.json()["workspace"]["slug"]
print(json.dumps(slugs))
PY
export CHUNK_WS_1100="$(python3 -c 'import json; print(json.load(open("/tmp/lovora_chunk_tune_slugs.json"))["1100"])')"
export CHUNK_WS_1300="$(python3 -c 'import json; print(json.load(open("/tmp/lovora_chunk_tune_slugs.json"))["1300"])')"
export CHUNK_WS_1500="$(python3 -c 'import json; print(json.load(open("/tmp/lovora_chunk_tune_slugs.json"))["1500"])')"
cat /tmp/lovora_chunk_tune_slugs.json
```

Expected: prints JSON with `1100`, `1300`, and `1500` keys, and exports all three `CHUNK_WS_*` variables.

- [ ] **Step 5: Run the targeted upload/eval loop for each size**

Run the following block once:

```bash
set -euo pipefail
cd /Users/andreas/fun/lovora

run_size() {
  size="$1"
  workspace="$2"
  echo "== setting LEGAL_CHUNK_SIZE_STATUTE=$size =="
  ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "python3 - <<'PY'
from pathlib import Path
env = Path('/srv/lovora/lovora/deploy/hetzner/anythingllm.env')
lines = env.read_text().splitlines()
out = []
for line in lines:
    if line.startswith('LEGAL_CHUNK_SIZE_STATUTE='):
        out.append('LEGAL_CHUNK_SIZE_STATUTE=$size')
    else:
        out.append(line)
env.write_text('\\n'.join(out) + '\\n')
PY
cd /srv/lovora/lovora/deploy/hetzner && docker compose -f docker-compose.yml up -d --force-recreate app"

  ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
    'until curl -fsS https://app.lovora.no/api/health >/dev/null; do sleep 5; done'

  python3 upload_legal_corpus.py \
    --base-url https://app.lovora.no \
    --api-key "$LOVORA_CHUNK_TUNE_API_KEY" \
    --workspace "$workspace" \
    --manifest /Users/andreas/fun/lovora/lovora/test-results/legal-tuning-subset/_manifest.jsonl \
    --workers 6

  cd /Users/andreas/fun/lovora/lovora
  node scripts/remote-vector-eval.cjs \
    --workspace "$workspace" \
    --benchmark scripts/benchmarks/lovora_alpha_chunk_tuning.json \
    --api-base https://app.lovora.no/api \
    --api-key "$LOVORA_CHUNK_TUNE_API_KEY" \
    --report-json "test-results/legal-retrieval-${size}.json" \
    --report-md "test-results/legal-retrieval-${size}.md"
}

run_size 1100 "$CHUNK_WS_1100"
run_size 1300 "$CHUNK_WS_1300"
run_size 1500 "$CHUNK_WS_1500"
```

Expected: each upload reports `Failed  : 0`; each eval writes a JSON and Markdown report.

- [ ] **Step 6: Score the three retrieval reports**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node scripts/score-legal-chunking.cjs \
  --stats test-results/legal-chunking-stats.json \
  --retrieval test-results/legal-retrieval-1100.json \
  --retrieval test-results/legal-retrieval-1300.json \
  --retrieval test-results/legal-retrieval-1500.json \
  --report-json test-results/legal-chunking-score.json \
  --report-md test-results/legal-chunking-score.md
```

Expected: prints `[chunking] winner 1100`, `[chunking] winner 1300`, or `[chunking] winner 1500`. Use that size for Task 9.

## Task 9: Lock The Winning Chunk Size And Upload Full Alpha Once

**Files:**
- Modify: `lovora/deploy/hetzner/anythingllm.env.example`
- Modify: `lovora/server/.env.example`
- Modify: `lovora/docker/.env.example`
- Modify: `lovora/deploy/hetzner/README.md`

- [ ] **Step 1: Update env examples**

If `test-results/legal-chunking-score.json` reports winner `1300`, replace `LEGAL_CHUNK_SIZE_STATUTE=1100` with:

```dotenv
LEGAL_CHUNK_SIZE_STATUTE=1300
```

in:

```bash
/Users/andreas/fun/lovora/lovora/deploy/hetzner/anythingllm.env.example
/Users/andreas/fun/lovora/lovora/server/.env.example
/Users/andreas/fun/lovora/lovora/docker/.env.example
```

If the winner is `1100` or `1500`, use that winning integer instead.

- [ ] **Step 2: Update the Hetzner README**

Add this section before `## 8. Upload The First Corpus` in `lovora/deploy/hetzner/README.md`:

```markdown
## Legal Chunk Tuning

Before the first NL + SF alpha upload, run the targeted chunk tuning workflow instead of uploading the full corpus at multiple chunk sizes.

The full corpus is too large to embed three times inside the free Voyage token budget. Build a targeted subset, evaluate `1100`, `1300`, and `1500`, then upload the full corpus once at the selected `LEGAL_CHUNK_SIZE_STATUTE`.

```bash
cd /srv/lovora
python3 upload_legal_corpus.py \
  --base-url "https://$DOMAIN" \
  --api-key "$ANYTHINGLLM_API_KEY" \
  --workspace workspace \
  --workers 6
```
```

- [ ] **Step 3: Set the winning size on Hetzner**

Run with the real winner from `test-results/legal-chunking-score.json`:

```bash
export WINNING_STATUTE_CHUNK_SIZE="$(node -e "console.log(require('/Users/andreas/fun/lovora/lovora/test-results/legal-chunking-score.json').winner.size)")"
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "python3 - <<PY
from pathlib import Path
size = '$WINNING_STATUTE_CHUNK_SIZE'
env = Path('/srv/lovora/lovora/deploy/hetzner/anythingllm.env')
lines = env.read_text().splitlines()
out = []
for line in lines:
    if line.startswith('LEGAL_CHUNK_SIZE_STATUTE='):
        out.append(f'LEGAL_CHUNK_SIZE_STATUTE={size}')
    else:
        out.append(line)
env.write_text('\\n'.join(out) + '\\n')
PY
cd /srv/lovora/lovora/deploy/hetzner && docker compose -f docker-compose.yml up -d --force-recreate app"
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'until curl -fsS https://app.lovora.no/api/health >/dev/null; do sleep 5; done'
```

Expected: health check exits `0`.

- [ ] **Step 4: Upload the full alpha corpus once with 6 workers**

Run:

```bash
cd /Users/andreas/fun/lovora
python3 upload_legal_corpus.py \
  --base-url https://app.lovora.no \
  --api-key "$LOVORA_CHUNK_TUNE_API_KEY" \
  --workspace workspace \
  --manifest /Users/andreas/fun/lovora/legal_embedding_ready/_manifest.jsonl \
  --workers 6
```

Expected: `Uploaded: 84245/84245`, `Failed  : 0`.

- [ ] **Step 5: Run post-upload retrieval evaluation on the production workspace**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node scripts/remote-vector-eval.cjs \
  --workspace workspace \
  --benchmark scripts/benchmarks/lovora_alpha_chunk_tuning.json \
  --api-base https://app.lovora.no/api \
  --api-key "$LOVORA_CHUNK_TUNE_API_KEY" \
  --report-json test-results/legal-alpha-retrieval.json \
  --report-md test-results/legal-alpha-retrieval.md
```

Expected: writes both reports and includes at least one config with `hitAt1 > 0`.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add deploy/hetzner/anythingllm.env.example server/.env.example docker/.env.example deploy/hetzner/README.md
git commit -m "docs: document legal chunk tuning workflow"
```

## Task 10: Review Pass

**Files:**
- Review all files touched in Tasks 1-6.

- [ ] **Step 1: Run focused tests**

Run:

```bash
cd /Users/andreas/fun/lovora
python3 -m unittest tests.test_upload_legal_corpus -v

cd /Users/andreas/fun/lovora/lovora
npx jest \
  server/__tests__/utils/legalChunkTuning.test.js \
  server/__tests__/utils/legalTuningSubset.test.js \
  server/__tests__/utils/legalRemoteEval.test.js \
  --runInBand
```

Expected: all tests PASS.

- [ ] **Step 2: Run CLI smoke checks**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node scripts/analyze-legal-chunking.cjs --help
node scripts/build-legal-tuning-subset.cjs --help
node scripts/remote-vector-eval.cjs --help
node scripts/score-legal-chunking.cjs --help
```

Expected: each command prints usage and exits `0`.

- [ ] **Step 3: Inspect diffs for accidental broad changes**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git diff --stat
git diff -- scripts server/utils server/__tests__/utils deploy/hetzner/README.md deploy/hetzner/anythingllm.env.example server/.env.example docker/.env.example
```

Expected: diffs are limited to chunk-tuning tooling, docs, and env examples.

- [ ] **Step 4: Review token-budget artifacts**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node - <<'NODE'
const stats = require("./test-results/legal-tuning-subset/stats.json");
if (stats.stats.estimatedTokens > 12000000) {
  throw new Error(`subset estimate too high: ${stats.stats.estimatedTokens}`);
}
console.log({
  selectedRecordCount: stats.stats.selectedRecordCount,
  estimatedTokens: stats.stats.estimatedTokens,
  maxEstimatedTokens: stats.stats.maxEstimatedTokens,
});
NODE
```

Expected: prints selected record count and estimated tokens without throwing.

## Task 11: Verification And Cleanup

**Files:**
- Generated reports under `lovora/test-results/`
- Live Hetzner database and workspaces

- [ ] **Step 1: Verify app health**

Run:

```bash
curl -fsS https://app.lovora.no/api/health
curl -fsS https://app.lovora.no/v1/api/health
curl -fsS https://app.lovora.no/api/setup-complete
```

Expected: all commands exit `0`.

- [ ] **Step 2: Verify final workspace document count**

Run:

```bash
python3 - <<'PY'
import os
import requests

api_key = os.environ["LOVORA_CHUNK_TUNE_API_KEY"]
response = requests.get(
    "https://app.lovora.no/api/v1/workspace/workspace",
    headers={"Authorization": f"Bearer {api_key}"},
    timeout=60,
)
response.raise_for_status()
workspace = response.json()["workspace"][0]
print({"slug": workspace["slug"], "documentCount": len(workspace.get("documents", []))})
PY
```

Expected: `documentCount` is `84245` after the full alpha upload.

- [ ] **Step 3: Verify retrieval report has no total failure**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
node - <<'NODE'
const report = require("./test-results/legal-alpha-retrieval.json");
const best = report.configResults[0];
if (!best || best.metrics.hitAt1 === 0 && best.metrics.mrr === 0) {
  throw new Error("alpha retrieval report has no successful retrieval signal");
}
console.log({
  workspace: report.workspace,
  bestConfig: best.id,
  hitAt1: best.metrics.hitAt1,
  mrr: best.metrics.mrr,
});
NODE
```

Expected: prints best config, `hitAt1`, and `mrr`.

- [ ] **Step 4: Delete staging workspaces**

Run:

```bash
python3 - <<'PY'
import os
import requests

api_key = os.environ["LOVORA_CHUNK_TUNE_API_KEY"]
base = "https://app.lovora.no/api"
response = requests.get(
    f"{base}/v1/workspaces",
    headers={"Authorization": f"Bearer {api_key}"},
    timeout=60,
)
response.raise_for_status()
configured_slugs = {
    os.environ.get("CHUNK_WS_1100", ""),
    os.environ.get("CHUNK_WS_1300", ""),
    os.environ.get("CHUNK_WS_1500", ""),
}
prefix_slugs = {
    workspace["slug"]
    for workspace in response.json()["workspaces"]
    if workspace["slug"].startswith("chunk-tune-")
    or workspace["slug"].startswith("persistence-probe-")
}
for slug in sorted(configured_slugs | prefix_slugs):
    if not slug:
        continue
    response = requests.delete(
        f"{base}/v1/workspace/{slug}",
        headers={"Authorization": f"Bearer {api_key}"},
        timeout=60,
    )
    print(slug, response.status_code)
PY
```

Expected: every printed staging/probe workspace returns `200`. If nothing prints, no temporary workspaces remain.

- [ ] **Step 5: Delete the temporary API key**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 "LOVORA_CHUNK_TUNE_API_KEY='$LOVORA_CHUNK_TUNE_API_KEY' python3 - <<'PY'
import os
import sqlite3

secret = os.environ.get('LOVORA_CHUNK_TUNE_API_KEY', '')
db = '/srv/lovora/lovora/.data/hetzner/server/storage/anythingllm.db'
conn = sqlite3.connect(db)
deleted = conn.execute(
    """
    delete from api_keys
    where secret = ?
       or secret like 'codex_chunk_tune_%'
       or name = 'Codex chunk tuning temporary key'
    """,
    (secret,),
).rowcount
conn.commit()
print({'deleted': deleted})
PY" 
```

Expected: prints a `deleted` count greater than or equal to `1`.

- [ ] **Step 6: Final git status review**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
git status --short
```

Expected: only intended source, docs, and test-result artifacts remain. Do not stage generated full corpus files unless explicitly requested.

## Self-Review

**Spec coverage:** This plan implements token-budgeted targeted tuning, avoids three full corpus uploads, uses `6` workers for the final alpha upload, includes a review pass, and includes verification after completion.

**Placeholder scan:** The plan uses concrete paths, commands, code, and expected outputs. Environment variables are defined by concrete commands before use.

**Type consistency:** Helper names used by scripts match the module exports defined in earlier tasks: `selectTargetedRecords`, `buildConfigs`, `rankOfFirstMatch`, `computeMetrics`, and `isRetryableStatus`.

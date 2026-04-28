# Alpha Amendment Section Resolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make alpha evaluation honest and make exact legal lookup reliable for amendment-section questions without re-embedding.

**Architecture:** Keep embeddings unchanged. Patch the deterministic sidecar layer: evaluator normalization, benchmark generation, legal citation parsing, legal retrieval store virtual anchors, resolver ranking, and retrieval diagnostics. Normal consolidated law references should still resolve to canonical current-law sections; explicit endringslov/amending-act references should resolve through amendment-aware virtual section anchors.

**Tech Stack:** Node.js CommonJS scripts, Jest, AnythingLLM/LanceDB retrieval, JSONL legal sidecar artifacts.

---

## File Structure

- Modify `server/utils/legalAnswerEval.js`
  - Owns answer-contract checks.
  - Add legal citation pattern matching that accepts lawyer-style short follow-up citations after a named law has already appeared.
  - Preserve current Norwegian heading/context checks.

- Modify `server/__tests__/utils/legalAnswerEval.test.js`
  - Add regression tests for short follow-up citations and case-insensitive required-term matching.

- Modify `scripts/build-alpha-source-question-set.cjs`
  - Add optional canonical index input.
  - Generate exact `section_X` questions only when the canonical index exposes the exact document/section key.
  - Generate broader amendment questions for full-document amending chunks.

- Modify `server/__tests__/utils/legalAlphaCli.test.js`
  - Add generator tests for valid exact-section generation and invalid full-document amendment filtering.

- Create `server/utils/legalAmendingAnchors.js`
  - Parse internal `§` references from full-document amending chunks.
  - Build virtual canonical rows pointing back to the same embedding chunk.

- Create `server/__tests__/utils/legalAmendingAnchors.test.js`
  - Unit-test anchor extraction and virtual row shape.

- Modify `server/utils/legalRetrievalStore.js`
  - Load virtual amendment section rows into the same store maps as canonical rows.
  - Keep original rows unchanged.

- Modify `server/__tests__/utils/legalRetrievalStore.test.js`
  - Verify virtual amendment rows are indexed by `documentId:section`.

- Modify `server/utils/legalCitationQuery.js`
  - Parse document hints such as `Endringslov til havressurslova § 46`.
  - Mark explicit amendment intent on parsed references.

- Modify `server/__tests__/utils/legalCitationQuery.test.js`
  - Add parser tests for normal law intent vs amendment-law intent.

- Modify `server/utils/legalReferenceResolver.js`
  - Prefer current/consolidated rows for normal law references.
  - Prefer virtual amendment rows for explicit amendment references.
  - Emit `amending_act_section_match`.

- Modify `server/__tests__/utils/legalReferenceResolver.test.js`
  - Add intent-split resolver tests.

- Modify `server/utils/chats/workspaceContextRetriever.js`
  - Add legal fallback diagnostic fields and one structured log line for legal references that fell back to vector search.

- Modify `server/__tests__/utils/workspaceContextRetriever.test.js`
  - Add diagnostics/logging regression test.

- Modify `scripts/benchmarks/lovora_alpha_exact_section_watch.json`
  - Add one amendment-section watch case after resolver support lands.

---

### Task 1: Evaluator Looseners

**Files:**
- Modify: `server/utils/legalAnswerEval.js`
- Test: `server/__tests__/utils/legalAnswerEval.test.js`

- [ ] **Step 1: Add failing tests for lawyer-style short follow-up citations**

Add this test near the existing citation tests in `server/__tests__/utils/legalAnswerEval.test.js`:

```js
  test("accepts short follow-up paragraph citations after the law name is introduced", () => {
    const result = evaluateAnswerCase(
      {
        id: "short-follow-up-citation",
        requiredTerms: ["31. mai", "tredje året", "utsatt formuesskatt"],
        requiredCitationPatterns: [
          "skattebetalingsloven § 9-3",
          "skattebetalingsloven § 10-51",
        ],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Utsatt formuesskatt etter skattebetalingsloven § 9-3 " +
          "forfaller 31. mai i det tredje året etter fastsettingsåret, " +
          "jf. § 10-51 fjerde ledd [CONTEXT 0]. " +
          "Kildegrunnlag: Skattebetalingsloven § 9-3 og jf. § 10-51 fjerde ledd [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasRequiredCitationPatterns.passed).toBe(true);
  });
```

- [ ] **Step 2: Add a regression test documenting required-term casing**

Add this test in the same file:

```js
  test("matches required terms case-insensitively", () => {
    const result = evaluateAnswerCase(
      {
        id: "case-insensitive-required-terms",
        requiredTerms: ["stamhusbesidderen", "leilændingsgods"],
        requiredCitationPatterns: ["forskrift 26. juni 1896"],
        minContextRefs: 1,
      },
      {
        response:
          "Kort svar: Stamhusbesidderen må sende dokumentene ved salg av Leilændingsgods. " +
          "Kildegrunnlag: forskrift 26. juni 1896 § 1 [CONTEXT 0].",
      }
    );

    expect(result.passed).toBe(true);
    expect(result.checks.hasRequiredTerms.passed).toBe(true);
  });
```

- [ ] **Step 3: Run tests and verify they fail only on citation matching**

Run:

```bash
npx jest server/__tests__/utils/legalAnswerEval.test.js --runInBand
```

Expected:

```text
FAIL server/__tests__/utils/legalAnswerEval.test.js
```

The short follow-up citation test should fail on `hasRequiredCitationPatterns`. The term casing test should already pass unless the normalization has regressed.

- [ ] **Step 4: Implement citation matching helper**

In `server/utils/legalAnswerEval.js`, replace `requiredCitationPassed` with this implementation:

```js
function normalizeCitationName(value = "") {
  return normalizeText(value)
    .replace(/\s+/g, " ")
    .replace(/\s+§.*$/, "")
    .trim();
}

function sectionPatternFromCitation(value = "") {
  const match = normalizeText(value).match(
    /§{1,2}\s*(\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)/
  );
  return match ? match[1] : "";
}

function hasShortFollowUpCitation(response = "", pattern = "") {
  const normalizedResponse = normalizeText(response);
  const normalizedPattern = normalizeText(pattern);
  const section = sectionPatternFromCitation(normalizedPattern);
  const lawName = normalizeCitationName(normalizedPattern);
  if (!section || !lawName) return false;
  if (!normalizedResponse.includes(lawName)) return false;

  const shortCitation = new RegExp(
    `(?:jf\\.\\s*)?§{1,2}\\s*${escapeRegExp(section)}(?:\\s*(?:første|andre|annet|tredje|fjerde|femte|sjette|sjuende|syvende|åttende|niende|tiende)\\s+ledd)?`,
    "i"
  );
  return shortCitation.test(response);
}

function requiredCitationPassed(response = "", pattern = "") {
  if (!pattern) return true;
  const escaped = escapeRegExp(pattern)
    .replace(/\\§/g, "§")
    .replace(/\s+/g, "\\s+");
  return (
    new RegExp(escaped, "i").test(response) ||
    hasShortFollowUpCitation(response, pattern)
  );
}
```

- [ ] **Step 5: Run evaluator tests**

Run:

```bash
npx jest server/__tests__/utils/legalAnswerEval.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/legalAnswerEval.test.js
```

- [ ] **Step 6: Commit**

```bash
git add server/utils/legalAnswerEval.js server/__tests__/utils/legalAnswerEval.test.js
git commit -m "test: loosen legal answer citation evaluator"
```

---

### Task 2: Benchmark Generator Canonical-Section Filter

**Files:**
- Modify: `scripts/build-alpha-source-question-set.cjs`
- Test: `server/__tests__/utils/legalAlphaCli.test.js`

- [ ] **Step 1: Add failing generator test for full-document amending chunks**

Add this test after the existing `source question builder creates questions from legal source text` test in `server/__tests__/utils/legalAlphaCli.test.js`:

```js
  test("source question builder skips exact section questions absent from canonical index", () => {
    const cases = buildQuestionCases(
      [
        {
          corpus: "NL",
          doc_id: "nl-20250606-029",
          documentId: "LOV-2025-06-06-29",
          title: "Lov om endringer i havressurslova",
          shortTitle: "Endringslov til havressurslova",
          url: "https://lovdata.no/dokument/LTI/lov/2025-06-06-29",
          docType: "amending_act",
          section: "full-document",
          text:
            "I lov 6. juni 2008 nr. 37 om havressurslova skal § 46 lyde:\n" +
            "§ 46. Fiskeridirektoratet kan beslaglegge umerket fiskeredskap.\n" +
            "II Loven trer i kraft fra den tid Kongen bestemmer.",
        },
      ],
      {
        limit: 5,
        canonicalSections: new Set(["LOV-2025-06-06-29:full-document"]),
      }
    );

    expect(cases.some((item) => item.id.includes("section_46"))).toBe(false);
    expect(cases.map((item) => item.id)).toEqual(
      expect.arrayContaining([
        "nl_20250606_029_effective_date",
        "nl_20250606_029_amendment_summary",
      ])
    );
  });
```

- [ ] **Step 2: Add passing generator test for real canonical sections**

Add this test in the same block:

```js
  test("source question builder keeps exact section questions present in canonical index", () => {
    const cases = buildQuestionCases(
      [
        {
          corpus: "NL",
          doc_id: "nl-20251222-120",
          documentId: "LOV-2025-12-22-120",
          title: "Lov om endringer i skattebetalingsloven",
          shortTitle: "Endringslov til skattebetalingsloven",
          url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-120",
          docType: "amending_act",
          text:
            "Ny § 9-3 skal lyde:\n" +
            "§ 9-3. Betalingsutsettelse for formuesskatt\n" +
            "Personlig eier av virksomhet kan kreve utsettelse.",
        },
      ],
      {
        limit: 5,
        canonicalSections: new Set(["LOV-2025-12-22-120:9-3"]),
      }
    );

    expect(cases.some((item) => item.id.includes("section_9_3"))).toBe(true);
  });
```

- [ ] **Step 3: Run tests and verify the first new test fails**

Run:

```bash
npx jest server/__tests__/utils/legalAlphaCli.test.js --runInBand
```

Expected:

```text
FAIL server/__tests__/utils/legalAlphaCli.test.js
```

- [ ] **Step 4: Add canonical index loading and section filtering**

In `scripts/build-alpha-source-question-set.cjs`, add default args:

```js
canonicalIndex: path.resolve("../legal_embedding_bundled/canonical_section_index.jsonl"),
```

Add CLI parsing:

```js
else if (arg === "--canonical-index") args.canonicalIndex = path.resolve(argv[++index]);
```

Add helpers below `readJsonl`:

```js
function loadCanonicalSections(filePath) {
  if (!filePath || !fs.existsSync(filePath)) return new Set();
  return new Set(
    readJsonl(filePath)
      .map((row) => `${row.documentId || ""}:${row.section || ""}`)
      .filter((key) => !key.endsWith(":"))
  );
}

function recordDocumentId(record = {}) {
  return record.documentId || record.documentId || String(record.doc_id || "").toUpperCase().replace(/^NL-/, "LOV-");
}

function hasCanonicalSection(record = {}, section = "", canonicalSections = null) {
  if (!canonicalSections || canonicalSections.size === 0) return true;
  return canonicalSections.has(`${recordDocumentId(record)}:${section}`);
}
```

Modify `sectionCases(record)` to accept an options object:

```js
function sectionCases(record, { canonicalSections = null } = {}) {
```

Inside the `while` loop, before `cases.push(...)`, add:

```js
    const section = paragraph.replace(/^§+\s*/, "");
    if (!hasCanonicalSection(record, section, canonicalSections)) continue;
```

Modify `buildQuestionCases` to pass `canonicalSections`:

```js
  const canonicalSections = options.canonicalSections || null;
```

and:

```js
    for (const item of sectionCases(record, { canonicalSections })) addCase(item);
```

Modify `main()`:

```js
  const canonicalSections = loadCanonicalSections(args.canonicalIndex);
  const cases = buildQuestionCases(records, {
    limit: args.limit,
    canonicalSections,
  });
```

Export `loadCanonicalSections` and `hasCanonicalSection`.

- [ ] **Step 5: Run generator tests**

Run:

```bash
npx jest server/__tests__/utils/legalAlphaCli.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/legalAlphaCli.test.js
```

- [ ] **Step 6: Regenerate source benchmark**

Run:

```bash
node scripts/build-alpha-source-question-set.cjs \
  --manifest ../legal_embedding_bundled/_manifest.jsonl \
  --canonical-index ../legal_embedding_bundled/canonical_section_index.jsonl \
  --out scripts/benchmarks/lovora_alpha_source_questions.json \
  --limit 60
```

Expected:

```text
[alpha-source] wrote 60 cases to ...
```

- [ ] **Step 7: Commit**

```bash
git add scripts/build-alpha-source-question-set.cjs server/__tests__/utils/legalAlphaCli.test.js scripts/benchmarks/lovora_alpha_source_questions.json
git commit -m "test: filter invalid source-mined exact section questions"
```

---

### Task 3: Amendment Virtual-Section Anchors

**Files:**
- Create: `server/utils/legalAmendingAnchors.js`
- Test: `server/__tests__/utils/legalAmendingAnchors.test.js`
- Modify: `server/utils/legalRetrievalStore.js`
- Test: `server/__tests__/utils/legalRetrievalStore.test.js`

- [ ] **Step 1: Add unit tests for virtual anchor extraction**

Create `server/__tests__/utils/legalAmendingAnchors.test.js`:

```js
const {
  buildVirtualAmendingRows,
  extractAmendingSectionAnchors,
} = require("../../utils/legalAmendingAnchors");

describe("legalAmendingAnchors", () => {
  test("extracts section anchors from full-document amending text", () => {
    expect(
      extractAmendingSectionAnchors(
        "I lov 6. juni 2008 nr. 37 skal § 46 lyde:\n§ 46. Gjennomføring av kontroll\nFiskeridirektoratet kan beslaglegge redskap."
      )
    ).toEqual(["46"]);
  });

  test("builds virtual rows pointing back to the same embedding chunk", () => {
    const rows = buildVirtualAmendingRows({
      documentId: "LOV-2025-06-06-29",
      lovdataId: "nl-20250606-029",
      jurisdiction: "NO",
      corpus: "NL",
      canonicalTitle: "endringslov til havressurslova",
      title: "Lov om endringer i havressurslova",
      aliases: ["endringslov til havressurslova"],
      versionType: "amending_act",
      segmentType: "bundled_document",
      section: "full-document",
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:section:full-document",
      embeddingChunkIds: ["NO:EMBED:NL:nl-20250606-029:bundle:1"],
      embeddingChunkSources: ["link://amending#bundle"],
      text:
        "I lov 6. juni 2008 nr. 37 skal § 46 lyde:\n" +
        "§ 46. Gjennomføring av kontroll\n" +
        "Fiskeridirektoratet kan beslaglegge redskap.",
    });

    expect(rows).toEqual([
      expect.objectContaining({
        documentId: "LOV-2025-06-06-29",
        section: "46",
        versionType: "amending_act",
        matchReason: "amending_act_section_match",
        canonicalSectionId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
        canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
        embeddingChunkIds: ["NO:EMBED:NL:nl-20250606-029:bundle:1"],
      }),
    ]);
  });
});
```

- [ ] **Step 2: Run the new test and verify missing module failure**

Run:

```bash
npx jest server/__tests__/utils/legalAmendingAnchors.test.js --runInBand
```

Expected:

```text
Cannot find module '../../utils/legalAmendingAnchors'
```

- [ ] **Step 3: Create `legalAmendingAnchors.js`**

Create `server/utils/legalAmendingAnchors.js`:

```js
const AMENDING_VERSION_TYPES = new Set(["amending_act", "amending_regulation"]);

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function isAmendingFullDocument(row = {}) {
  return (
    AMENDING_VERSION_TYPES.has(String(row.versionType || "")) &&
    String(row.section || "") === "full-document"
  );
}

function extractAmendingSectionAnchors(text = "") {
  const anchors = [];
  const pattern =
    /(?:ny\s+)?§{1,2}\s*(\d+[a-zæøå]?(?:-\d+[a-zæøå]?)?)(?:\s+(?:skal\s+lyde|nytt?|endres|oppheves|går\s+ut)|[.:])/gi;
  let match;
  while ((match = pattern.exec(String(text))) !== null) anchors.push(match[1]);
  return unique(anchors);
}

function buildVirtualAmendingRows(row = {}) {
  if (!isAmendingFullDocument(row)) return [];
  const anchors = extractAmendingSectionAnchors(row.text || "");
  return anchors.map((section) => {
    const idPrefix = [
      row.jurisdiction || "NO",
      row.corpus || "",
      row.documentId || "",
    ]
      .filter(Boolean)
      .join(":");
    return {
      ...row,
      section,
      subsection: "",
      subsectionLabel: "",
      segmentType: "virtual_amending_section",
      canonicalSectionId: `${idPrefix}:amending-section:${section}`,
      canonicalSourceId: `${idPrefix}:amending-section:${section}`,
      canonicalSourceIds: [`${idPrefix}:amending-section:${section}`],
      matchReason: "amending_act_section_match",
      isVirtualAmendingSection: true,
    };
  });
}

module.exports = {
  buildVirtualAmendingRows,
  extractAmendingSectionAnchors,
  isAmendingFullDocument,
};
```

- [ ] **Step 4: Run anchor tests**

Run:

```bash
npx jest server/__tests__/utils/legalAmendingAnchors.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/legalAmendingAnchors.test.js
```

- [ ] **Step 5: Add store integration test**

In `server/__tests__/utils/legalRetrievalStore.test.js`, add an amending full-document row to `withArtifacts` after the existing canonical row:

```js
        JSON.stringify({
          canonicalSourceId: "NO:NL:LOV-2025-06-06-29:section:full-document",
          canonicalSectionId: "NO:NL:LOV-2025-06-06-29:section:full-document",
          jurisdiction: "NO",
          corpus: "NL",
          documentId: "LOV-2025-06-06-29",
          lovdataId: "nl-20250606-029",
          canonicalTitle: "endringslov til havressurslova",
          title: "Lov om endringer i havressurslova",
          aliases: ["endringslov til havressurslova"],
          section: "full-document",
          versionType: "amending_act",
          embeddingChunkIds: ["chunk-havressurs-amending"],
          embeddingChunkSources: ["link://havressurs-amending"],
          text:
            "I lov 6. juni 2008 nr. 37 skal § 46 lyde:\n" +
            "§ 46. Fiskeridirektoratet kan beslaglegge umerket redskap.",
        })
```

Then add this test:

```js
  test("loads virtual amendment section rows into document-section lookup", () => {
    withArtifacts((storageDir) => {
      const store = loadLegalRetrievalStore({
        workspaceSlug: "lovora-alpha",
        storageDir,
      });

      const rows = store.canonicalByDocumentSection.get(
        "LOV-2025-06-06-29:46"
      );

      expect(rows).toEqual([
        expect.objectContaining({
          canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
          section: "46",
          segmentType: "virtual_amending_section",
          matchReason: "amending_act_section_match",
        }),
      ]);
    });
  });
```

- [ ] **Step 6: Integrate virtual rows in retrieval store**

In `server/utils/legalRetrievalStore.js`, add:

```js
const { buildVirtualAmendingRows } = require("./legalAmendingAnchors");
```

In `buildStore`, before the canonical row loop, add:

```js
  const allCanonicalRows = canonicalRows.flatMap((row) => [
    row,
    ...buildVirtualAmendingRows({
      ...row,
      text: materializeCanonicalText(row),
    }),
  ]);
```

Then change:

```js
  for (const row of canonicalRows) {
```

to:

```js
  for (const row of allCanonicalRows) {
```

And return `canonicalRows: allCanonicalRows`.

- [ ] **Step 7: Run store and anchor tests**

Run:

```bash
npx jest server/__tests__/utils/legalAmendingAnchors.test.js server/__tests__/utils/legalRetrievalStore.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/legalAmendingAnchors.test.js
PASS server/__tests__/utils/legalRetrievalStore.test.js
```

- [ ] **Step 8: Commit**

```bash
git add server/utils/legalAmendingAnchors.js server/utils/legalRetrievalStore.js server/__tests__/utils/legalAmendingAnchors.test.js server/__tests__/utils/legalRetrievalStore.test.js
git commit -m "feat: add amendment virtual section anchors"
```

---

### Task 4: Citation Parser and Resolver Intent Split

**Files:**
- Modify: `server/utils/legalCitationQuery.js`
- Test: `server/__tests__/utils/legalCitationQuery.test.js`
- Modify: `server/utils/legalReferenceResolver.js`
- Test: `server/__tests__/utils/legalReferenceResolver.test.js`

- [ ] **Step 1: Add parser tests for explicit amendment intent**

In `server/__tests__/utils/legalCitationQuery.test.js`, add:

```js
  test("parses endringslov title references as amendment intent", () => {
    expect(
      parseLegalCitationQuery("Hva sier Endringslov til havressurslova § 46?")
    ).toMatchObject({
      hasLegalReference: true,
      references: [
        {
          section: "46",
          documentHints: ["endringslov til havressurslova"],
          preferredVersionType: "amending",
        },
      ],
    });
  });

  test("keeps normal law references as current-law intent", () => {
    expect(parseLegalCitationQuery("Hva sier havressurslova § 46?")).toMatchObject({
      hasLegalReference: true,
      references: [
        {
          section: "46",
          documentHints: ["havressurslova"],
          preferredVersionType: "current",
        },
      ],
    });
  });
```

- [ ] **Step 2: Run parser tests and verify failure**

Run:

```bash
npx jest server/__tests__/utils/legalCitationQuery.test.js --runInBand
```

Expected:

```text
FAIL server/__tests__/utils/legalCitationQuery.test.js
```

- [ ] **Step 3: Implement amendment-title parsing**

In `server/utils/legalCitationQuery.js`, add:

```js
function preferredVersionTypeForHint(hint = "") {
  return /^endringslov(?:en)?\s+til\b/i.test(normalizeLegalCitationText(hint))
    ? "amending"
    : "current";
}
```

Replace the `documentMatch` regex with:

```js
    const documentMatch = lastMatch(
      /\b((?:endringslov(?:en)?\s+til\s+[a-zæøå][a-zæøå0-9 .,/()-]{1,90})|(?:[a-zæøå][a-zæøå0-9-]*(?:loven|forskriften)))\s*$/g,
      before
    );
```

When creating each reference, add:

```js
      preferredVersionType:
        documentHints.length > 0
          ? preferredVersionTypeForHint(documentHints[0])
          : "current",
```

Also pass this field into `parseBareContinuationReferences` and include it on inherited continuation references.

- [ ] **Step 4: Run parser tests**

Run:

```bash
npx jest server/__tests__/utils/legalCitationQuery.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/legalCitationQuery.test.js
```

- [ ] **Step 5: Add resolver fixture rows and tests**

In `server/__tests__/utils/legalReferenceResolver.test.js`, extend `fixtureStore()` rows with:

```js
    {
      documentId: "LOV-2008-06-06-37",
      canonicalTitle: "havressurslova",
      aliases: ["havressurslova"],
      title: "Havressurslova",
      section: "46",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2008-06-06-37:section:46",
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:46",
      embeddingChunkIds: ["chunk-havressurs-46-current"],
      embeddingChunkSources: ["link://havressurs#46"],
      text: "Gjennomføring av kontroll.",
    },
    {
      documentId: "LOV-2025-06-06-29",
      canonicalTitle: "endringslov til havressurslova",
      aliases: ["endringslov til havressurslova"],
      title: "Endringslov til havressurslova",
      section: "46",
      subsection: "",
      versionType: "amending_act",
      segmentType: "virtual_amending_section",
      matchReason: "amending_act_section_match",
      canonicalSectionId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      embeddingChunkIds: ["chunk-havressurs-amending"],
      embeddingChunkSources: ["link://havressurs-amending"],
      text: "Beslaglegge og destruere umerket fiskeredskap.",
    },
```

Then add:

```js
  test("normal law intent prefers consolidated current law", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier havressurslova § 46?"),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:46",
      retrievalReasons: ["title_alias_match", "exact_section_match"],
    });
  });

  test("amendment law intent prefers virtual amendment section", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier Endringslov til havressurslova § 46?"),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      embeddingChunkId: "chunk-havressurs-amending",
      retrievalReasons: ["title_alias_match", "amending_act_section_match"],
    });
  });
```

- [ ] **Step 6: Run resolver tests and verify amendment intent fails**

Run:

```bash
npx jest server/__tests__/utils/legalReferenceResolver.test.js --runInBand
```

Expected:

```text
FAIL server/__tests__/utils/legalReferenceResolver.test.js
```

- [ ] **Step 7: Implement resolver reason and ranking**

In `server/utils/legalReferenceResolver.js`, update `retrievalReasonForMatch`:

```js
function retrievalReasonForMatch(matchType, row = {}) {
  if (row.matchReason) return row.matchReason;
  if (matchType === "subsection") return "exact_section_subsection_match";
  if (matchType === "neighbor") return "same_doc_neighbor_section";
  return "exact_section_match";
}
```

Update `candidateForRow`:

```js
    retrievalReasonForMatch(matchType, row),
```

Add:

```js
function referencePrefersAmending(reference = {}) {
  return reference.preferredVersionType === "amending";
}

function rowMatchesReferenceIntent(row = {}, reference = {}) {
  if (referencePrefersAmending(reference)) {
    return row.versionType === "amending_act" || row.versionType === "amending_regulation";
  }
  return row.versionType !== "amending_act" && row.versionType !== "amending_regulation";
}
```

In `rowsForReference`, after `matchingRows` is created, add:

```js
  const intentRows = matchingRows.filter((row) =>
    rowMatchesReferenceIntent(row, reference)
  );
  const rows = intentRows.length ? intentRows : matchingRows;
```

Remove the later `const rows = matchingRows;`.

- [ ] **Step 8: Run resolver tests**

Run:

```bash
npx jest server/__tests__/utils/legalCitationQuery.test.js server/__tests__/utils/legalReferenceResolver.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/legalCitationQuery.test.js
PASS server/__tests__/utils/legalReferenceResolver.test.js
```

- [ ] **Step 9: Commit**

```bash
git add server/utils/legalCitationQuery.js server/utils/legalReferenceResolver.js server/__tests__/utils/legalCitationQuery.test.js server/__tests__/utils/legalReferenceResolver.test.js
git commit -m "feat: split current-law and amendment section intent"
```

---

### Task 5: Legal Fallback Production Metric

**Files:**
- Modify: `server/utils/chats/workspaceContextRetriever.js`
- Test: `server/__tests__/utils/workspaceContextRetriever.test.js`

- [ ] **Step 1: Add diagnostics test**

Add this test in `server/__tests__/utils/workspaceContextRetriever.test.js`:

```js
  test("emits legal fallback diagnostics when legal references use only vector fallback", async () => {
    const logSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        contextTexts: [],
        sources: [
          {
            text: "Vector result",
            retrievalReasons: ["vector_fallback"],
          },
        ],
        message: false,
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva sier Endringslov til havressurslova § 46?",
      workspace: {
        slug: "lovora-alpha",
        topN: 1,
        similarityThreshold: 0.2,
        vectorSearchMode: "default",
      },
      LLMConnector: {},
      vectorDb,
      resolveExactSources: async () => [],
    });

    expect(result.diagnostics.legalReferenceDetected).toBe(true);
    expect(result.diagnostics.exactMatchFound).toBe(false);
    expect(result.diagnostics.legalReferenceFallback).toBe(true);
    expect(logSpy).toHaveBeenCalledWith(
      "[legal-retrieval-metric]",
      expect.stringContaining('"legalReferenceFallback":true')
    );
    logSpy.mockRestore();
  });
```

- [ ] **Step 2: Run test and verify failure**

Run:

```bash
npx jest server/__tests__/utils/workspaceContextRetriever.test.js --runInBand
```

Expected:

```text
FAIL server/__tests__/utils/workspaceContextRetriever.test.js
```

- [ ] **Step 3: Add diagnostic fields and structured warning**

In `server/utils/chats/workspaceContextRetriever.js`, inside diagnostics:

```js
  const legalReferenceDetected = Boolean(parsedQuery?.hasLegalReference);
  const exactMatchFound = exactSources.length > 0;
  const legalReferenceFallback =
    legalReferenceDetected &&
    !exactMatchFound &&
    unique(
      searchResults.flatMap((source) =>
        normalizeReasons(source.retrievalReasons)
      )
    ).includes("vector_fallback");
```

Then add these fields to `diagnostics`:

```js
    legalReferenceDetected,
    exactMatchFound,
    legalReferenceFallback,
```

After the debug log block, add:

```js
  if (legalReferenceFallback) {
    console.warn(
      "[legal-retrieval-metric]",
      JSON.stringify({
        workspace: workspaceSlug,
        legalReferenceDetected: true,
        exactMatchFound: false,
        legalReferenceFallback: true,
        retrievalReasons: diagnostics.retrievalReasons,
      })
    );
  }
```

- [ ] **Step 4: Run workspace context tests**

Run:

```bash
npx jest server/__tests__/utils/workspaceContextRetriever.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/workspaceContextRetriever.test.js
```

- [ ] **Step 5: Commit**

```bash
git add server/utils/chats/workspaceContextRetriever.js server/__tests__/utils/workspaceContextRetriever.test.js
git commit -m "chore: log legal citation vector fallback metrics"
```

---

### Task 6: Watch Case and Full Verification

**Files:**
- Modify: `scripts/benchmarks/lovora_alpha_exact_section_watch.json`
- Read: `test-results/alpha-launch-answer-benchmark-80.json`

- [ ] **Step 1: Add an amendment watch case**

Append this object to `scripts/benchmarks/lovora_alpha_exact_section_watch.json`:

```json
{
  "id": "exact_amending_havressurslova_46",
  "query": "Hva sier Endringslov til havressurslova § 46?",
  "tags": ["alpha", "exact-section", "amending-act", "fisheries"],
  "expect": {
    "canonicalSourceId": "NO:NL:LOV-2025-06-06-29:amending-section:46",
    "retrievalReason": "amending_act_section_match",
    "textIncludes": "Fiskeridirektoratet"
  }
}
```

- [ ] **Step 2: Run focused unit tests**

Run:

```bash
npx jest \
  server/__tests__/utils/legalAnswerEval.test.js \
  server/__tests__/utils/legalAlphaCli.test.js \
  server/__tests__/utils/legalAmendingAnchors.test.js \
  server/__tests__/utils/legalRetrievalStore.test.js \
  server/__tests__/utils/legalCitationQuery.test.js \
  server/__tests__/utils/legalReferenceResolver.test.js \
  server/__tests__/utils/workspaceContextRetriever.test.js \
  --runInBand
```

Expected:

```text
Test Suites: 7 passed, 7 total
```

- [ ] **Step 3: Run lint**

Run:

```bash
yarn lint:ci
```

Expected:

```text
Done
```

- [ ] **Step 4: Run local exact retrieval evaluator**

Run:

```bash
node scripts/evaluate-retrieval.cjs \
  --workspace lovora-alpha \
  --benchmark scripts/benchmarks/lovora_alpha_exact_section_watch.json \
  --report-json test-results/alpha-exact-section-watch-local.json \
  --report-md test-results/alpha-exact-section-watch-local.md
```

Expected:

```text
exact_amending_havressurslova_46
matched: true
rank: 1
```

- [ ] **Step 5: Commit verification benchmark**

```bash
git add scripts/benchmarks/lovora_alpha_exact_section_watch.json
git commit -m "test: watch amendment section exact retrieval"
```

---

### Task 7: Production Rollout and 80-Case Rehearsal

**Files:**
- No source files modified.
- Production artifacts created under `test-results/`.

- [ ] **Step 1: Deploy merged branch to production**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora/deploy/hetzner && bash scripts/preflight.sh && bash scripts/rollout.sh'
```

Expected:

```text
Hetzner preflight OK.
```

and `server`, `collector`, `caddy` healthy.

- [ ] **Step 2: Install updated legal retrieval artifacts if canonical sidecar changed**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora && node scripts/install-legal-retrieval-artifacts.cjs \
    --workspace lovora-alpha \
    --source-root /srv/lovora/legal_embedding_bundled'
```

Expected:

```text
[legal-retrieval] installed canonical_section_index.jsonl
[legal-retrieval] installed embedding_manifest.jsonl
```

- [ ] **Step 3: Run production health checks**

Run:

```bash
curl -fsS https://app.lovora.no/api/health
curl -fsS https://app.lovora.no/v1/api/health
curl -fsS https://app.lovora.no/api/setup-complete
```

Expected: all return JSON with ready/success state.

- [ ] **Step 4: Run full 80-case answer eval**

Run on the server:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora && set -a && source deploy/hetzner/anythingllm.env && set +a && \
   node scripts/run-alpha-answer-eval.cjs \
     --api-base https://app.lovora.no/api \
     --workspace lovora-alpha \
     --benchmark test-results/alpha-launch-answer-benchmark-80.json \
     --delay-ms 250 \
     --session-prefix alpha-launch-80-post-anchor \
     --answers-out test-results/alpha-launch-80-post-anchor-answers.json \
     --report-json test-results/alpha-launch-80-post-anchor-report.json \
     --report-md test-results/alpha-launch-80-post-anchor-report.md'
```

Expected:

```text
[alpha-answer] wrote answers to ...
[alpha-answer] wrote JSON report to ...
[alpha-answer] wrote Markdown report to ...
```

- [ ] **Step 5: Run production exact-section watch**

Run on the server:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora && node scripts/evaluate-retrieval.cjs \
     --workspace lovora-alpha \
     --benchmark scripts/benchmarks/lovora_alpha_exact_section_watch.json \
     --report-json test-results/alpha-exact-section-watch-prod.json \
     --report-md test-results/alpha-exact-section-watch-prod.md'
```

Expected:

```text
exact_amending_havressurslova_46 matched rank 1
```

- [ ] **Step 6: Monitor infra after eval**

Run:

```bash
ssh -i ~/.ssh/andreas_hetzner lovora@178.104.225.174 \
  'cd /srv/lovora/lovora && docker stats --no-stream \
     --format "{{.Name}} {{.CPUPerc}} {{.MemUsage}}" \
     lovora-hetzner-server-1 lovora-hetzner-collector-1 && \
   docker compose -f deploy/hetzner/docker-compose.yml logs --since 60m server \
     | grep -Ei "error|oom|killed|502|exception|legal-retrieval-metric" \
     | tail -120 || true'
```

Expected:

```text
No OOM/502/server exception lines.
legal-retrieval-metric lines should be zero or explainable.
```

- [ ] **Step 7: Write final rehearsal report**

Create `test-results/alpha-launch-rehearsal-post-amendment-anchors.md` with:

```markdown
# Alpha Launch Rehearsal After Amendment Anchors

## Summary

- Production commit:
- Answer eval:
- Exact retrieval watch:
- Infra:
- Launch decision:

## Remaining Issues

- 
```

Fill the five summary fields from the concrete command outputs above.

---

## Acceptance Criteria

- Evaluator accepts `Skattebetalingsloven § 9-3 ... jf. § 10-51 fjerde ledd`.
- Required term matching remains case-insensitive.
- Source benchmark generator does not create exact-section cases for full-document amendment chunks unless the canonical section exists.
- `Endringslov til havressurslova § 46` resolves to an amendment virtual section with `amending_act_section_match`.
- `havressurslova § 46` resolves to the consolidated/current law section with `exact_section_match`.
- Legal citation fallback metric is emitted when `legal_reference_detected=true` and `exact_match_found=false`.
- Full focused Jest suite passes.
- `yarn lint:ci` passes.
- Production exact-section watch passes, including the new amendment watch.
- Production 80-case launch rehearsal remains around `90%+` acceptable after manual citation-quality review.

## Self-Review

- Spec coverage: evaluator, generator, amendment anchors, intent split, metric, no re-embedding, and 80-case rerun are covered.
- Placeholder scan: no `TBD`, no vague test instructions, and every code-changing task has concrete code or command snippets.
- Type consistency: `preferredVersionType`, `matchReason`, `amending_act_section_match`, and virtual `canonicalSourceId` naming are used consistently across parser, store, resolver, and tests.

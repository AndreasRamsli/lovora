# Corpus Tooling

This directory holds the repo-local contract and entrypoints for the legal corpus pipeline.

The boundary is intentionally narrow:

- Raw source text and generated Markdown artifacts stay outside git.
- The manifest contract, schema, validators, and thin wrappers stay in-repo.
- The wrappers adapt the existing root-level corpus scripts instead of replacing them.
- By default the wrappers write to the external data root `../legal_embedding_ready` relative to the repo checkout, or to `LOVORA_CORPUS_DATA_ROOT` if set.

## Files

- `manifest.schema.json` defines the versioned NDJSON record shape for legal corpus chunks.
- `manifest_tools.py` loads newline-delimited manifests, validates records, and rewrites legacy records into the `v1` contract.
- `prepare_legal_corpus.py` runs the existing root preparation script, then rewrites `_manifest.jsonl` into the versioned contract with hashes and timestamps.
- `upload_legal_corpus.py` audits the manifest and referenced files before delegating to the existing root upload script.
- `audit_legal_corpus.py` performs a local, non-destructive audit of the manifest and the referenced source/output files.

## Contract

Each manifest line is one JSON object. The `v1` record includes:

- provenance fields: `manifestVersion`, `generatedAt`, `sourceDatasetVersion`
- traceability fields: `corpus`, `upload_folder`, `doc_id`, `sectionIndex`, `documentId`, `url`, `chunkSource`
- content metadata: `title`, `shortTitle`, `department`, `effectiveDate`, `lastChanged`, `chapter`, `subchapter`, `section`
- file integrity fields: `sourcePath`, `sourceSha256`, `outputPath`, `outputSha256`

The schema is intentionally explicit so audits can catch drift early.

## Usage

Prepare:

```bash
python lovora/ops/corpus/prepare_legal_corpus.py --source-dataset-version lovdata-export-2026-04-22
```

The default output root is `../legal_embedding_ready` relative to the repo checkout, or `LOVORA_CORPUS_DATA_ROOT` if set.

Upload:

```bash
python lovora/ops/corpus/upload_legal_corpus.py --manifest ../legal_embedding_ready/_manifest.jsonl
```

Audit:

```bash
python lovora/ops/corpus/audit_legal_corpus.py --manifest ../legal_embedding_ready/_manifest.jsonl
```

The wrappers are designed to be boring on purpose: they make the manifest contract explicit, keep the data layout predictable, and leave the actual corpus generation logic in the existing root scripts.

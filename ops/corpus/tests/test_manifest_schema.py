import json
import os
import tempfile
import sys
import unittest
from contextlib import contextmanager
from pathlib import Path
from unittest.mock import Mock, patch


OPS_CORPUS_DIR = Path(__file__).resolve().parents[1]
if str(OPS_CORPUS_DIR) not in sys.path:
    sys.path.insert(0, str(OPS_CORPUS_DIR))

import audit_legal_corpus  # noqa: E402
import prepare_legal_corpus  # noqa: E402
import upload_legal_corpus  # noqa: E402
from manifest_tools import (  # noqa: E402
    MANIFEST_VERSION,
    ManifestValidationError,
    load_manifest_records,
    load_manifest_schema,
    rewrite_manifest_file,
    validate_manifest_record,
)


class ManifestSchemaTests(unittest.TestCase):
    def test_manifest_schema_defines_v1_traceability_fields(self):
        schema = load_manifest_schema()

        self.assertEqual(schema["properties"]["manifestVersion"]["const"], MANIFEST_VERSION)
        self.assertIn("generatedAt", schema["required"])
        self.assertIn("sourceDatasetVersion", schema["required"])
        self.assertIn("sourceSha256", schema["required"])
        self.assertIn("outputSha256", schema["required"])
        self.assertEqual(schema["properties"]["corpus"]["enum"], ["NL", "SF"])

    def test_validate_manifest_record_accepts_traceable_v1_record(self):
        record = {
            "manifestVersion": MANIFEST_VERSION,
            "generatedAt": "2026-04-22T11:30:00Z",
            "sourceDatasetVersion": "lovdata-export-2026-04-22",
            "corpus": "NL",
            "upload_folder": "lovdata-nl",
            "doc_id": "nl-20251222-130",
            "sectionIndex": 1,
            "title": "Lov om endringer i naturmangfoldloven",
            "shortTitle": "Endringslov til naturmangfoldloven",
            "documentId": "LOV-2025-12-22-130",
            "url": "https://lovdata.no/dokument/NL/LOV-2025-12-22-130",
            "chunkSource": "link://https://lovdata.no/dokument/NL/LOV-2025-12-22-130#section-0001",
            "department": "Klima- og miljødepartementet",
            "effectiveDate": "2026-01-01",
            "lastChanged": "",
            "chapter": "II",
            "subchapter": "",
            "section": "full-document",
            "sourcePath": "/tmp/lovora/data/txt/nl/nl-20251222-130.txt",
            "sourceSha256": "a" * 64,
            "outputPath": "/tmp/lovora/legal_embedding_ready/lovdata-nl/nl-20251222-130-0001-full-document.md",
            "outputSha256": "b" * 64,
        }

        validated = validate_manifest_record(record)

        self.assertEqual(validated["manifestVersion"], MANIFEST_VERSION)
        self.assertEqual(validated["sectionIndex"], 1)
        self.assertEqual(
            validated["chunkSource"],
            "link://https://lovdata.no/dokument/NL/LOV-2025-12-22-130#section-0001",
        )

    def test_validate_manifest_record_rejects_unversioned_record(self):
        record = {
            "corpus": "NL",
            "doc_id": "nl-20251222-130",
            "sectionIndex": 1,
        }

        with self.assertRaises(ManifestValidationError):
            validate_manifest_record(record)

    def test_load_manifest_records_reads_ndjson(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            manifest_path = Path(temp_dir) / "_manifest.jsonl"
            manifest_path.write_text(
                "\n".join(
                    [
                        json.dumps({"corpus": "NL", "doc_id": "one"}),
                        "",
                        json.dumps({"corpus": "SF", "doc_id": "two"}),
                    ]
                ),
                encoding="utf-8",
            )

            records = load_manifest_records(manifest_path)

            self.assertEqual([record["doc_id"] for record in records], ["one", "two"])

    def test_rewrite_manifest_file_adds_versioned_traceability_fields(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            source_path = temp_path / "source.txt"
            source_path.write_text("source text", encoding="utf-8")
            output_path = temp_path / "nl-20251222-130-0001-full-document.md"
            output_path.write_text("output text", encoding="utf-8")
            manifest_path = temp_path / "_manifest.jsonl"
            manifest_path.write_text(
                json.dumps(
                    {
                        "corpus": "NL",
                        "upload_folder": "lovdata-nl",
                        "doc_id": "nl-20251222-130",
                        "title": "Lov om endringer i naturmangfoldloven",
                        "shortTitle": "Endringslov til naturmangfoldloven",
                        "documentId": "LOV-2025-12-22-130",
                        "url": "https://lovdata.no/dokument/NL/LOV-2025-12-22-130",
                        "chunkSource": "link://https://lovdata.no/dokument/NL/LOV-2025-12-22-130#section-0001",
                        "department": "Klima- og miljødepartementet",
                        "effectiveDate": "2026-01-01",
                        "lastChanged": "",
                        "chapter": "II",
                        "subchapter": "",
                        "section": "full-document",
                        "sourcePath": str(source_path),
                        "outputPath": str(output_path),
                    }
                )
                + "\n",
                encoding="utf-8",
            )

            rewritten = rewrite_manifest_file(
                manifest_path,
                source_dataset_version="lovdata-export-2026-04-22",
                generated_at="2026-04-22T11:30:00Z",
            )

            self.assertEqual(rewritten, 1)
            records = load_manifest_records(manifest_path)
            self.assertEqual(records[0]["manifestVersion"], MANIFEST_VERSION)
            self.assertEqual(records[0]["sectionIndex"], 1)
            self.assertTrue(records[0]["sourceSha256"])
            self.assertTrue(records[0]["outputSha256"])

    def test_rewrite_manifest_file_uses_one_generated_at_for_all_records(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            records = []
            for index in (1, 2):
                source_path = temp_path / f"source-{index}.txt"
                output_path = temp_path / f"nl-20251222-130-{index:04d}-full-document.md"
                source_path.write_text(f"source {index}", encoding="utf-8")
                output_path.write_text(f"output {index}", encoding="utf-8")
                records.append(
                    {
                        "corpus": "NL",
                        "upload_folder": "lovdata-nl",
                        "doc_id": f"nl-20251222-130-{index}",
                        "title": "Lov om endringer i naturmangfoldloven",
                        "shortTitle": "Endringslov til naturmangfoldloven",
                        "documentId": "LOV-2025-12-22-130",
                        "url": "https://lovdata.no/dokument/NL/LOV-2025-12-22-130",
                        "chunkSource": "link://https://lovdata.no/dokument/NL/LOV-2025-12-22-130#section-0001",
                        "department": "Klima- og miljødepartementet",
                        "effectiveDate": "2026-01-01",
                        "lastChanged": "",
                        "chapter": "II",
                        "subchapter": "",
                        "section": "full-document",
                        "sourcePath": str(source_path),
                        "outputPath": str(output_path),
                    }
                )

            manifest_path = temp_path / "_manifest.jsonl"
            manifest_path.write_text(
                "\n".join(json.dumps(record) for record in records) + "\n",
                encoding="utf-8",
            )

            rewrite_manifest_file(
                manifest_path,
                source_dataset_version="lovdata-export-2026-04-22",
            )

            rewritten = load_manifest_records(manifest_path)
            self.assertEqual(rewritten[0]["generatedAt"], rewritten[1]["generatedAt"])

    def test_upload_rejects_tampered_manifest_before_delegating(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            source_path = temp_path / "source.txt"
            output_path = temp_path / "nl-20251222-130-0001-full-document.md"
            source_path.write_text("source text", encoding="utf-8")
            output_path.write_text("output text", encoding="utf-8")
            manifest_path = temp_path / "_manifest.jsonl"
            manifest_path.write_text(
                json.dumps(
                    {
                        "manifestVersion": MANIFEST_VERSION,
                        "generatedAt": "2026-04-22T11:30:00Z",
                        "sourceDatasetVersion": "lovdata-export-2026-04-22",
                        "corpus": "NL",
                        "upload_folder": "lovdata-nl",
                        "doc_id": "nl-20251222-130",
                        "sectionIndex": 1,
                        "title": "Lov om endringer i naturmangfoldloven",
                        "shortTitle": "Endringslov til naturmangfoldloven",
                        "documentId": "LOV-2025-12-22-130",
                        "url": "https://lovdata.no/dokument/NL/LOV-2025-12-22-130",
                        "chunkSource": "link://https://lovdata.no/dokument/NL/LOV-2025-12-22-130#section-0001",
                        "department": "Klima- og miljødepartementet",
                        "effectiveDate": "2026-01-01",
                        "lastChanged": "",
                        "chapter": "II",
                        "subchapter": "",
                        "section": "full-document",
                        "sourcePath": str(source_path),
                        "sourceSha256": "0" * 64,
                        "outputPath": str(output_path),
                        "outputSha256": "1" * 64,
                    }
                )
                + "\n",
                encoding="utf-8",
            )

            root_module = Mock()
            root_module.main.return_value = 0
            with patch.object(upload_legal_corpus, "_load_root_module", return_value=root_module):
                exit_code = upload_legal_corpus.main(["--manifest", str(manifest_path)])

            self.assertEqual(exit_code, 1)
            root_module.main.assert_not_called()

    def test_default_output_root_is_outside_checkout(self):
        self.assertEqual(
            prepare_legal_corpus.DEFAULT_OUTPUT_ROOT,
            prepare_legal_corpus.WORKSPACE_ROOT / "legal_embedding_ready",
        )
        self.assertEqual(audit_legal_corpus.DEFAULT_MANIFEST.parent, prepare_legal_corpus.DEFAULT_OUTPUT_ROOT)
        self.assertEqual(upload_legal_corpus.DEFAULT_MANIFEST.parent, prepare_legal_corpus.DEFAULT_OUTPUT_ROOT)

    def test_prepare_wrapper_runs_root_prepare_from_outer_workspace(self):
        observed_cwds = []

        def fake_prepare_corpus(**kwargs):
            observed_cwds.append(Path.cwd())
            output_root = kwargs["output_root"]
            output_root.mkdir(parents=True, exist_ok=True)
            source_path = output_root / "source.txt"
            output_path = output_root / "nl-20251222-130-0001-full-document.md"
            source_path.write_text("source text", encoding="utf-8")
            output_path.write_text("output text", encoding="utf-8")
            (output_root / "_manifest.jsonl").write_text(
                json.dumps(
                    {
                        "corpus": "NL",
                        "upload_folder": "lovdata-nl",
                        "doc_id": "nl-20251222-130",
                        "title": "Lov om endringer i naturmangfoldloven",
                        "shortTitle": "Endringslov til naturmangfoldloven",
                        "documentId": "LOV-2025-12-22-130",
                        "url": "https://lovdata.no/dokument/NL/LOV-2025-12-22-130",
                        "chunkSource": "link://https://lovdata.no/dokument/NL/LOV-2025-12-22-130#section-0001",
                        "department": "Klima- og miljødepartementet",
                        "effectiveDate": "2026-01-01",
                        "lastChanged": "",
                        "chapter": "II",
                        "subchapter": "",
                        "section": "full-document",
                        "sourcePath": str(source_path),
                        "outputPath": str(output_path),
                    }
                )
                + "\n",
                encoding="utf-8",
            )
            return {"documents": 1, "sections": 1}

        fake_root_module = Mock()
        fake_root_module.prepare_corpus.side_effect = fake_prepare_corpus

        with tempfile.TemporaryDirectory() as temp_dir:
            with patch.object(
                prepare_legal_corpus,
                "_load_root_module",
                return_value=fake_root_module,
            ):
                with _temporary_cwd(prepare_legal_corpus.APP_REPO_ROOT):
                    summary = prepare_legal_corpus.prepare_corpus(
                        ["NL"],
                        output_root=Path(temp_dir),
                        clean=True,
                        source_dataset_version="lovdata-export-2026-04-22",
                    )

        self.assertEqual(summary, {"documents": 1, "sections": 1})
        self.assertEqual(observed_cwds, [prepare_legal_corpus.WORKSPACE_ROOT])


@contextmanager
def _temporary_cwd(path: Path):
    previous_cwd = Path.cwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(previous_cwd)


if __name__ == "__main__":
    unittest.main()

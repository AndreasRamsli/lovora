#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
from collections import Counter
from pathlib import Path

try:
    from .manifest_tools import (
        ManifestValidationError,
        load_manifest_records,
        load_manifest_schema,
        sha256_file,
        validate_manifest_record,
    )
except ImportError:  # pragma: no cover - direct script execution
    from manifest_tools import (
        ManifestValidationError,
        load_manifest_records,
        load_manifest_schema,
        sha256_file,
        validate_manifest_record,
    )


APP_REPO_ROOT = Path(__file__).resolve().parents[2]
WORKSPACE_ROOT = APP_REPO_ROOT.parent
DEFAULT_DATA_ROOT = Path(
    os.getenv(
        "LOVORA_CORPUS_DATA_ROOT",
        str(WORKSPACE_ROOT / "legal_embedding_ready"),
    )
).expanduser()
DEFAULT_MANIFEST = DEFAULT_DATA_ROOT / "_manifest.jsonl"


def audit_manifest(manifest_path: Path, schema_path: Path | None = None) -> list[str]:
    schema = load_manifest_schema(schema_path) if schema_path else None
    records = load_manifest_records(manifest_path)
    issues: list[str] = []

    for index, record in enumerate(records, start=1):
        try:
            validated = validate_manifest_record(record, schema=schema)
        except ManifestValidationError as exc:
            issues.append(f"{manifest_path}:{index}: {exc}")
            continue

        source_path = Path(str(validated["sourcePath"]))
        output_path = Path(str(validated["outputPath"]))

        if not source_path.exists():
            issues.append(f"{manifest_path}:{index}: missing source file {source_path}")
        elif sha256_file(source_path) != validated["sourceSha256"]:
            issues.append(f"{manifest_path}:{index}: source hash mismatch for {source_path}")

        if not output_path.exists():
            issues.append(f"{manifest_path}:{index}: missing output file {output_path}")
        elif sha256_file(output_path) != validated["outputSha256"]:
            issues.append(f"{manifest_path}:{index}: output hash mismatch for {output_path}")

    return issues


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--schema", type=Path, default=None)
    args = parser.parse_args(argv)

    records = load_manifest_records(args.manifest)
    issues = audit_manifest(args.manifest, schema_path=args.schema)
    corpus_counts = Counter(str(record.get("corpus", "")) for record in records)

    print("=== legal corpus audit ===")
    print(f"Manifest : {args.manifest}")
    print(f"Records  : {len(records)}")
    print(f"Counts   : {dict(sorted(corpus_counts.items()))}")
    print(f"Issues   : {len(issues)}")

    if issues:
        for issue in issues[:20]:
            print(f"- {issue}")
        return 1

    print("Status   : OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

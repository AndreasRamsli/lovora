#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import os
from contextlib import contextmanager
from pathlib import Path

try:
    from .manifest_tools import MANIFEST_VERSION, rewrite_manifest_file
except ImportError:  # pragma: no cover - direct script execution
    from manifest_tools import MANIFEST_VERSION, rewrite_manifest_file


APP_REPO_ROOT = Path(__file__).resolve().parents[2]
WORKSPACE_ROOT = APP_REPO_ROOT.parent
DEFAULT_OUTPUT_ROOT = Path(
    os.getenv(
        "LOVORA_CORPUS_DATA_ROOT",
        str(WORKSPACE_ROOT / "legal_embedding_ready"),
    )
).expanduser()


def _load_root_module():
    module_path = WORKSPACE_ROOT / "prepare_legal_corpus.py"
    spec = importlib.util.spec_from_file_location(
        "_lovora_root_prepare_legal_corpus",
        module_path,
    )
    if spec is None or spec.loader is None:
        raise SystemExit(f"Unable to load root script: {module_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


@contextmanager
def _workspace_root_cwd():
    previous_cwd = Path.cwd()
    os.chdir(WORKSPACE_ROOT)
    try:
        yield
    finally:
        os.chdir(previous_cwd)


def prepare_corpus(
    corpora: list[str],
    *,
    output_root: Path = DEFAULT_OUTPUT_ROOT,
    clean: bool = True,
    limit: int | None = None,
    doc_ids: list[str] | None = None,
    source_dataset_version: str = "unknown",
) -> dict[str, int]:
    root_prepare = _load_root_module()
    with _workspace_root_cwd():
        summary = root_prepare.prepare_corpus(
            corpora=corpora,
            output_root=output_root,
            clean=clean,
            limit=limit,
            doc_ids=doc_ids,
        )
    rewrite_manifest_file(
        output_root / "_manifest.jsonl",
        source_dataset_version=source_dataset_version,
    )
    return summary


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--corpus", action="append", choices=["NL", "SF"])
    parser.add_argument("--doc-id", action="append", default=None)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--output-root", type=Path, default=DEFAULT_OUTPUT_ROOT)
    parser.add_argument("--keep-existing", action="store_true")
    parser.add_argument(
        "--source-dataset-version",
        default=os.getenv("LOVORA_SOURCE_DATASET_VERSION", "unknown"),
    )
    args = parser.parse_args(argv)

    corpora = args.corpus or ["NL", "SF"]
    summary = prepare_corpus(
        corpora=corpora,
        output_root=args.output_root,
        clean=not args.keep_existing,
        limit=args.limit,
        doc_ids=args.doc_id,
        source_dataset_version=args.source_dataset_version,
    )
    print("=== legal corpus preparation ===")
    print(f"Documents: {summary['documents']}")
    print(f"Sections : {summary['sections']}")
    print(f"Manifest : {args.output_root / '_manifest.jsonl'}")
    print(f"Version  : {MANIFEST_VERSION}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

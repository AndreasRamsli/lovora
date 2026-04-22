#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import os
import sys
from pathlib import Path

try:
    from .audit_legal_corpus import audit_manifest
except ImportError:  # pragma: no cover - direct script execution
    from audit_legal_corpus import audit_manifest


APP_REPO_ROOT = Path(__file__).resolve().parents[2]
WORKSPACE_ROOT = APP_REPO_ROOT.parent
DEFAULT_DATA_ROOT = Path(
    os.getenv(
        "LOVORA_CORPUS_DATA_ROOT",
        str(WORKSPACE_ROOT / "legal_embedding_ready"),
    )
).expanduser()
DEFAULT_MANIFEST = DEFAULT_DATA_ROOT / "_manifest.jsonl"


def _load_root_module():
    module_path = WORKSPACE_ROOT / "upload_legal_corpus.py"
    spec = importlib.util.spec_from_file_location(
        "_lovora_root_upload_legal_corpus",
        module_path,
    )
    if spec is None or spec.loader is None:
        raise SystemExit(f"Unable to load root script: {module_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main(argv: list[str] | None = None) -> int:
    raw_argv = list(sys.argv[1:] if argv is None else argv)
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    args, _ = parser.parse_known_args(raw_argv)

    issues = audit_manifest(args.manifest)
    if issues:
        print("=== legal corpus upload ===")
        print(f"Manifest : {args.manifest}")
        print(f"Issues   : {len(issues)}")
        for issue in issues[:20]:
            print(f"- {issue}")
        return 1

    root_upload = _load_root_module()
    if not any(token == "--manifest" or token.startswith("--manifest=") for token in raw_argv):
        raw_argv = ["--manifest", str(DEFAULT_MANIFEST), *raw_argv]
    return int(root_upload.main(raw_argv))


if __name__ == "__main__":
    raise SystemExit(main())

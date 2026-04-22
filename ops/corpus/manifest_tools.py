from __future__ import annotations

import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Mapping


MANIFEST_VERSION = "lovora.legal-corpus.record/v1"
SCHEMA_PATH = Path(__file__).with_name("manifest.schema.json")


class ManifestValidationError(ValueError):
    pass


def load_manifest_schema(path: Path | None = None) -> dict[str, Any]:
    schema_path = path or SCHEMA_PATH
    try:
        return json.loads(schema_path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ManifestValidationError(f"Manifest schema not found: {schema_path}") from exc
    except json.JSONDecodeError as exc:
        raise ManifestValidationError(f"Invalid manifest schema: {schema_path}") from exc


def load_manifest_records(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        raise FileNotFoundError(path)

    records: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as handle:
        for line_no, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                record = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ManifestValidationError(f"{path}:{line_no}: invalid JSON") from exc
            if not isinstance(record, dict):
                raise ManifestValidationError(f"{path}:{line_no}: manifest record must be an object")
            records.append(record)
    return records


def _is_integer(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool)


def _validate_generated_at(value: Any, field: str) -> None:
    if not isinstance(value, str):
        raise ManifestValidationError(f"{field} must be a string")
    try:
        datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ManifestValidationError(f"{field} must be an ISO-8601 UTC timestamp") from exc


def _validate_property(field: str, value: Any, rule: Mapping[str, Any]) -> None:
    expected_type = rule.get("type")
    if expected_type == "string" and not isinstance(value, str):
        raise ManifestValidationError(f"{field} must be a string")
    if expected_type == "integer" and not _is_integer(value):
        raise ManifestValidationError(f"{field} must be an integer")
    if expected_type == "boolean" and not isinstance(value, bool):
        raise ManifestValidationError(f"{field} must be a boolean")
    if expected_type == "array" and not isinstance(value, list):
        raise ManifestValidationError(f"{field} must be an array")
    if expected_type == "object" and not isinstance(value, dict):
        raise ManifestValidationError(f"{field} must be an object")

    if "const" in rule and value != rule["const"]:
        raise ManifestValidationError(f"{field} must equal {rule['const']!r}")
    if "enum" in rule and value not in rule["enum"]:
        raise ManifestValidationError(f"{field} must be one of {rule['enum']!r}")
    if "minLength" in rule and isinstance(value, str) and len(value) < int(rule["minLength"]):
        raise ManifestValidationError(f"{field} must not be empty")
    if "minimum" in rule and _is_integer(value) and value < int(rule["minimum"]):
        raise ManifestValidationError(f"{field} must be >= {rule['minimum']}")
    if "pattern" in rule and isinstance(value, str) and not re.fullmatch(rule["pattern"], value):
        raise ManifestValidationError(f"{field} has an invalid format")

    if field == "generatedAt":
        _validate_generated_at(value, field)


def validate_manifest_record(
    record: Mapping[str, Any],
    schema: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    if not isinstance(record, Mapping):
        raise ManifestValidationError("Manifest record must be a mapping")

    schema_obj = dict(schema or load_manifest_schema())
    properties = schema_obj.get("properties", {})
    required = schema_obj.get("required", [])

    validated = dict(record)
    missing = [field for field in required if field not in validated]
    if missing:
        raise ManifestValidationError(f"Missing required field(s): {', '.join(missing)}")

    additional_properties = schema_obj.get("additionalProperties", True)
    if additional_properties is False:
        extra_fields = sorted(set(validated) - set(properties))
        if extra_fields:
            raise ManifestValidationError(
                f"Unexpected field(s): {', '.join(extra_fields)}"
            )

    for field, rule in properties.items():
        if field in validated:
            _validate_property(field, validated[field], rule)

    return validated


def validate_manifest_file(
    path: Path,
    schema: Mapping[str, Any] | None = None,
) -> list[dict[str, Any]]:
    records = load_manifest_records(path)
    return [validate_manifest_record(record, schema=schema) for record in records]


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _derive_section_index(record: Mapping[str, Any]) -> int:
    section_index = record.get("sectionIndex")
    if _is_integer(section_index):
        return int(section_index)

    output_path = str(record.get("outputPath") or "")
    match = re.search(r"-(\d{4})-.*\.md$", output_path)
    if match:
        return int(match.group(1))

    raise ManifestValidationError("Unable to derive sectionIndex from record")


def normalize_manifest_record(
    record: Mapping[str, Any],
    *,
    manifest_version: str = MANIFEST_VERSION,
    source_dataset_version: str = "unknown",
    generated_at: str | None = None,
) -> dict[str, Any]:
    normalized = dict(record)
    normalized["manifestVersion"] = manifest_version
    normalized["generatedAt"] = generated_at or datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace(
        "+00:00",
        "Z",
    )
    normalized["sourceDatasetVersion"] = source_dataset_version
    normalized["sectionIndex"] = _derive_section_index(normalized)

    source_path = Path(str(normalized["sourcePath"]))
    output_path = Path(str(normalized["outputPath"]))
    normalized["sourceSha256"] = sha256_file(source_path)
    normalized["outputSha256"] = sha256_file(output_path)
    return validate_manifest_record(normalized)


def rewrite_manifest_file(
    path: Path,
    *,
    manifest_version: str = MANIFEST_VERSION,
    source_dataset_version: str = "unknown",
    generated_at: str | None = None,
) -> int:
    records = load_manifest_records(path)
    rewrite_generated_at = generated_at or datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace(
        "+00:00",
        "Z",
    )
    normalized_records = [
        normalize_manifest_record(
            record,
            manifest_version=manifest_version,
            source_dataset_version=source_dataset_version,
            generated_at=rewrite_generated_at,
        )
        for record in records
    ]

    tmp_path = path.with_name(f"{path.name}.tmp")
    with tmp_path.open("w", encoding="utf-8") as handle:
        for record in normalized_records:
            handle.write(json.dumps(record, ensure_ascii=False) + "\n")
    tmp_path.replace(path)
    return len(normalized_records)

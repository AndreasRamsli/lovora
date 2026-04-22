#!/usr/bin/env bash
set -euo pipefail

error() {
  echo "Error: $*" >&2
}

require_command() {
  local cmd="$1"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    error "missing required command: $cmd"
    exit 1
  fi
}

usage() {
  cat >&2 <<'EOF'
Usage: restore.sh <backup-name-or-path>
EOF
  exit 1
}

cleanup_dir() {
  local path="$1"
  if [[ -n "$path" && -e "$path" ]]; then
    rm -rf "$path"
  fi
}

had_live_env=0
previous_env_preserved=0
rollback_required=0

perform_restore_attempt() {
  local compose_file="$1"
  local data_root="$2"
  local env_file="$3"
  local previous_data_root="$4"
  local previous_env_file="$5"
  local staged_data_root="$6"
  local staged_env_file="$7"
  local smoke_script="$8"

  if [[ -d "$data_root" ]] && ! mv "$data_root" "$previous_data_root"; then
    error "failed to preserve prior data root"
    return 1
  elif [[ -d "$previous_data_root" ]]; then
    rollback_required=1
  fi

  if [[ "$had_live_env" == "1" ]]; then
    if ! install -m 600 "$env_file" "$previous_env_file"; then
      error "failed to preserve prior env file"
      return 1
    fi
    previous_env_preserved=1
  fi

  if ! rm -rf "$data_root"; then
    error "failed to clear live data root before cutover"
    return 1
  fi

  if ! mv "$staged_data_root" "$data_root"; then
    error "failed to move staged restore data into place"
    return 1
  fi
  rollback_required=1

  if ! install -m 600 "$staged_env_file" "$env_file"; then
    error "failed to install restored env file"
    return 1
  fi

  if ! docker compose -f "$compose_file" up -d --build; then
    error "restore bring-up failed"
    return 1
  fi

  if ! bash "$smoke_script"; then
    error "restore smoke checks failed"
    return 1
  fi

  return 0
}

restore_previous_state() {
  local compose_file="$1"
  local data_root="$2"
  local env_file="$3"
  local previous_data_root="$4"
  local previous_env_file="$5"
  local smoke_script="$6"

  docker compose -f "$compose_file" down --remove-orphans || true

  if ! rm -rf "$data_root"; then
    error "failed to clear restored data root during rollback"
    return 1
  fi

  if [[ -d "$previous_data_root" ]] && ! mv "$previous_data_root" "$data_root"; then
    error "failed to restore prior data root during rollback"
    return 1
  fi

  if [[ "$previous_env_preserved" == "1" ]]; then
    if ! install -m 600 "$previous_env_file" "$env_file"; then
      error "failed to restore prior env file during rollback"
      return 1
    fi
  elif [[ "$had_live_env" != "1" ]]; then
    if ! rm -f "$env_file"; then
      error "failed to remove restored env file during rollback"
      return 1
    fi
  fi

  if ! docker compose -f "$compose_file" up -d --build; then
    error "rollback bring-up failed"
    return 1
  fi

  if ! bash "$smoke_script"; then
    error "rollback smoke checks failed"
    return 1
  fi

  return 0
}

resolve_backup_dir() {
  local candidate="$1"
  local backup_root="$2"

  if [[ -d "$candidate" ]]; then
    (cd "$candidate" && pwd)
    return 0
  fi

  if [[ -d "$backup_root/$candidate" ]]; then
    (cd "$backup_root/$candidate" && pwd)
    return 0
  fi

  return 1
}

main() {
  local script_dir hetzner_dir repo_root compose_file env_file smoke_script data_root backup_root backup_dir
  local env_backup storage_backup collector_backup stage_root staged_data_root staged_env_file
  local previous_data_root previous_env_file data_parent

  if [[ $# -ne 1 ]]; then
    usage
  fi

  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  hetzner_dir="$(cd "$script_dir/.." && pwd)"
  repo_root="$(cd "$hetzner_dir/../.." && pwd)"
  compose_file="$hetzner_dir/docker-compose.yml"
  env_file="$hetzner_dir/anythingllm.env"
  smoke_script="$hetzner_dir/scripts/smoke.sh"
  data_root="${LOVORA_DATA_ROOT:-$repo_root/.data/hetzner}"
  backup_root="${LOVORA_BACKUP_ROOT:-/srv/lovora/backups}"
  had_live_env=0
  previous_env_preserved=0
  rollback_required=0

  require_command docker
  require_command tar

  if ! backup_dir="$(resolve_backup_dir "$1" "$backup_root")"; then
    error "missing backup directory: $1"
    exit 1
  fi

  env_backup="$backup_dir/anythingllm.env"
  storage_backup="$backup_dir/server-storage.tar.gz"
  collector_backup="$backup_dir/collector.tar.gz"

  if [[ ! -f "$env_backup" ]]; then
    error "missing backup file: $env_backup"
    exit 1
  fi

  if [[ ! -f "$storage_backup" ]]; then
    error "missing backup file: $storage_backup"
    exit 1
  fi

  if [[ ! -f "$collector_backup" ]]; then
    error "missing backup file: $collector_backup"
    exit 1
  fi

  data_parent="$(dirname "$data_root")"
  install -d -m 755 "$data_parent"

  stage_root="$(mktemp -d "$data_parent/.restore.XXXXXX")"
  staged_data_root="$stage_root/restored-data"
  staged_env_file="$stage_root/anythingllm.env"
  previous_data_root="$stage_root/previous-data"
  previous_env_file="$stage_root/previous.env"

  install -d -m 755 "$staged_data_root"
  tar -xzf "$storage_backup" -C "$staged_data_root"
  tar -xzf "$collector_backup" -C "$staged_data_root"
  install -m 600 "$env_backup" "$staged_env_file"

  docker compose -f "$compose_file" down --remove-orphans

  if [[ -f "$env_file" ]]; then
    had_live_env=1
  fi

  if perform_restore_attempt \
    "$compose_file" \
    "$data_root" \
    "$env_file" \
    "$previous_data_root" \
    "$previous_env_file" \
    "$staged_data_root" \
    "$staged_env_file" \
    "$smoke_script"; then
    cleanup_dir "$previous_data_root"
    cleanup_dir "$stage_root"
    echo "Restored Lovora from $backup_dir"
    return 0
  fi

  if [[ "$rollback_required" != "1" ]]; then
    error "restore failed before cutover; attempting to bring prior stack back"
    if ! docker compose -f "$compose_file" up -d --build; then
      error "prior stack bring-up failed after pre-cutover restore error"
      cleanup_dir "$stage_root"
      exit 1
    fi
    if ! bash "$smoke_script"; then
      error "prior stack smoke checks failed after pre-cutover restore error"
      cleanup_dir "$stage_root"
      exit 1
    fi
    cleanup_dir "$stage_root"
    exit 1
  fi

  error "restore failed after cutover; attempting rollback"
  if ! restore_previous_state \
    "$compose_file" \
    "$data_root" \
    "$env_file" \
    "$previous_data_root" \
    "$previous_env_file" \
    "$smoke_script"; then
    error "rollback did not fully recover the prior live state"
    exit 1
  fi
  cleanup_dir "$stage_root"
  exit 1
}

main "$@"

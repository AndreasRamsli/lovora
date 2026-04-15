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
  local script_dir hetzner_dir repo_root compose_file env_file data_root backup_root backup_dir
  local env_backup storage_backup collector_backup

  if [[ $# -ne 1 ]]; then
    usage
  fi

  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  hetzner_dir="$(cd "$script_dir/.." && pwd)"
  repo_root="$(cd "$hetzner_dir/../.." && pwd)"
  compose_file="$hetzner_dir/docker-compose.yml"
  env_file="$hetzner_dir/anythingllm.env"
  data_root="${LOVORA_DATA_ROOT:-$repo_root/.data/hetzner}"
  backup_root="${LOVORA_BACKUP_ROOT:-/srv/lovora/backups}"

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

  docker compose -f "$compose_file" down --remove-orphans

  rm -rf "$data_root"
  install -d -m 755 "$data_root"

  tar -xzf "$storage_backup" -C "$data_root"
  tar -xzf "$collector_backup" -C "$data_root"
  install -m 600 "$env_backup" "$env_file"

  docker compose -f "$compose_file" up -d --build

  echo "Restored Lovora from $backup_dir"
}

main "$@"

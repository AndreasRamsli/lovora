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

main() {
  local script_dir hetzner_dir repo_root env_file data_root backup_root timestamp backup_dir

  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  hetzner_dir="$(cd "$script_dir/.." && pwd)"
  repo_root="$(cd "$hetzner_dir/../.." && pwd)"
  env_file="$hetzner_dir/anythingllm.env"
  data_root="${LOVORA_DATA_ROOT:-$repo_root/.data/hetzner}"
  backup_root="${LOVORA_BACKUP_ROOT:-/srv/lovora/backups}"
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  backup_dir="$backup_root/lovora-backup-$timestamp"

  require_command tar

  if [[ ! -f "$env_file" ]]; then
    error "missing env file: $env_file"
    exit 1
  fi

  if [[ ! -d "$data_root/server/storage" ]]; then
    error "missing storage directory: $data_root/server/storage"
    exit 1
  fi

  if [[ ! -d "$data_root/collector/hotdir" ]]; then
    error "missing collector hotdir: $data_root/collector/hotdir"
    exit 1
  fi

  if [[ ! -d "$data_root/collector/outputs" ]]; then
    error "missing collector outputs directory: $data_root/collector/outputs"
    exit 1
  fi

  install -d -m 755 "$backup_root"
  install -d -m 755 "$backup_dir"

  cp -a "$env_file" "$backup_dir/anythingllm.env"
  tar -czf "$backup_dir/server-storage.tar.gz" -C "$data_root" server/storage
  tar -czf "$backup_dir/collector.tar.gz" -C "$data_root" collector

  ln -sfn "$backup_dir" "$backup_root/latest"

  echo "Backup created at $backup_dir"
}

main "$@"

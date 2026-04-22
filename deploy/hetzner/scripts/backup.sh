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

compose_file=""
paused_services=()

service_is_running() {
  local compose_file="$1"
  local service_name="$2"
  local container_id container_status

  if ! container_id="$(docker compose -f "$compose_file" ps -q "$service_name" 2>/dev/null)"; then
    return 1
  fi

  if [[ -z "$container_id" ]]; then
    return 1
  fi

  if ! container_status="$(docker inspect -f '{{.State.Running}}' "$container_id" 2>/dev/null)"; then
    return 1
  fi

  [[ "$container_status" == "true" ]]
}

cleanup() {
  if ((${#paused_services[@]} > 0)); then
    docker compose -f "$compose_file" start "${paused_services[@]}"
  fi
}

main() {
  local script_dir hetzner_dir repo_root env_file data_root backup_root timestamp backup_dir

  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  hetzner_dir="$(cd "$script_dir/.." && pwd)"
  repo_root="$(cd "$hetzner_dir/../.." && pwd)"
  compose_file="$hetzner_dir/docker-compose.yml"
  env_file="$hetzner_dir/anythingllm.env"
  data_root="${LOVORA_DATA_ROOT:-$repo_root/.data/hetzner}"
  backup_root="${LOVORA_BACKUP_ROOT:-/srv/lovora/backups}"
  timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
  backup_dir="$backup_root/lovora-backup-$timestamp"

  require_command docker
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

  if service_is_running "$compose_file" server; then
    paused_services+=(server)
  fi

  if service_is_running "$compose_file" collector; then
    paused_services+=(collector)
  fi

  if ((${#paused_services[@]} > 0)); then
    trap cleanup EXIT
    docker compose -f "$compose_file" stop "${paused_services[@]}"
  fi

  cp -a "$env_file" "$backup_dir/anythingllm.env"
  tar -czf "$backup_dir/server-storage.tar.gz" -C "$data_root" server/storage
  tar -czf "$backup_dir/collector.tar.gz" -C "$data_root" collector

  ln -sfn "$backup_dir" "$backup_root/latest"

  echo "Backup created at $backup_dir"
}

main "$@"

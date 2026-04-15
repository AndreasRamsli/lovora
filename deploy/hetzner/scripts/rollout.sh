#!/usr/bin/env bash
set -euo pipefail

error() {
  echo "Error: $*" >&2
}

main() {
  local root_dir hetzner_dir compose_file

  root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
  hetzner_dir="$root_dir/deploy/hetzner"
  compose_file="$hetzner_dir/docker-compose.yml"

  "$hetzner_dir/scripts/preflight.sh"

  docker compose -f "$compose_file" up -d --build
  docker compose -f "$compose_file" ps

  "$hetzner_dir/scripts/smoke.sh"

  echo "Rollout complete."
}

main "$@"

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

load_release_state() {
  local state_file="$1"
  CURRENT_RUNTIME_IMAGE=""

  if [[ -f "$state_file" ]]; then
    # shellcheck disable=SC1090
    source "$state_file"
  fi
}

exported_env_or_default() {
  local name="$1"
  local default_value="$2"
  local value

  value="$(printenv "$name" 2>/dev/null || true)"
  echo "${value:-$default_value}"
}

detect_running_runtime_image() {
  local compose_file="$1"
  local container_id

  container_id="$(docker compose -f "$compose_file" ps -q server 2>/dev/null || true)"
  if [[ -z "$container_id" ]]; then
    return 0
  fi

  docker inspect --format '{{.Config.Image}}' "$container_id" 2>/dev/null || true
}

persist_release_state() {
  local state_file="$1"
  local runtime_image="$2"

  install -d -m 755 "$(dirname "$state_file")"
  cat >"$state_file" <<EOF
CURRENT_RUNTIME_IMAGE=$runtime_image
EOF
}

build_runtime_image() {
  local root_dir="$1"
  local runtime_image="$2"
  local build_uid build_gid

  build_uid="$(exported_env_or_default UID 1000)"
  build_gid="$(exported_env_or_default GID 1000)"

  docker build \
    --build-arg "ARG_UID=$build_uid" \
    --build-arg "ARG_GID=$build_gid" \
    -f "$root_dir/deploy/hetzner/Dockerfile" \
    -t "$runtime_image" \
    "$root_dir"
}

deploy_runtime_image() {
  local compose_file="$1"
  local runtime_image="$2"

  LOVORA_RUNTIME_IMAGE="$runtime_image" \
    docker compose -f "$compose_file" up -d --no-build

  # File bind mounts keep the original inode until the service is recreated.
  # Recreate Caddy so checked-out Caddyfile updates are applied during rollout.
  LOVORA_RUNTIME_IMAGE="$runtime_image" \
    docker compose -f "$compose_file" up -d --no-build --force-recreate --no-deps caddy
}

run_smoke_checks() {
  local smoke_script="$1"
  local runtime_image="$2"

  LOVORA_RUNTIME_IMAGE="$runtime_image" bash "$smoke_script"
}

should_keep_runtime_image() {
  local runtime_image="$1"
  shift

  local kept_image
  for kept_image in "$@"; do
    if [[ -n "$kept_image" && "$runtime_image" == "$kept_image" ]]; then
      return 0
    fi
  done

  return 1
}

prune_old_runtime_images() {
  local active_runtime_image="$1"
  local rollback_runtime_image="${2:-}"
  local runtime_image

  while IFS= read -r runtime_image; do
    if [[ -z "$runtime_image" || "$runtime_image" != lovora-hetzner-runtime:* ]]; then
      continue
    fi

    if should_keep_runtime_image \
      "$runtime_image" \
      "$active_runtime_image" \
      "$rollback_runtime_image"; then
      continue
    fi

    if ! docker image rm "$runtime_image" >/dev/null 2>&1; then
      error "failed to prune old runtime image: $runtime_image"
    fi
  done < <(docker image ls --format '{{.Repository}}:{{.Tag}}' 2>/dev/null || true)
}

main() {
  local root_dir hetzner_dir compose_file smoke_script state_file data_root release_id git_sha
  local candidate_runtime_image current_runtime_image running_runtime_image state_runtime_image

  root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
  hetzner_dir="$root_dir/deploy/hetzner"
  compose_file="$hetzner_dir/docker-compose.yml"
  smoke_script="$hetzner_dir/scripts/smoke.sh"
  data_root="${LOVORA_DATA_ROOT:-$root_dir/.data/hetzner}"
  state_file="$data_root/deploy/release-state.env"

  require_command docker
  require_command git

  "$hetzner_dir/scripts/preflight.sh"

  running_runtime_image="$(detect_running_runtime_image "$compose_file")"
  load_release_state "$state_file"
  state_runtime_image="${CURRENT_RUNTIME_IMAGE:-}"
  current_runtime_image="${running_runtime_image:-$state_runtime_image}"

  git_sha="$(git -C "$root_dir" rev-parse --short=8 HEAD)"
  release_id="git-${git_sha}-$(date -u +%Y%m%d%H%M%S)-$$"
  candidate_runtime_image="lovora-hetzner-runtime:$release_id"

  build_runtime_image "$root_dir" "$candidate_runtime_image"
  deploy_runtime_image "$compose_file" "$candidate_runtime_image"
  docker compose -f "$compose_file" ps

  if run_smoke_checks "$smoke_script" "$candidate_runtime_image"; then
    persist_release_state "$state_file" "$candidate_runtime_image"
    prune_old_runtime_images "$candidate_runtime_image" "$current_runtime_image"
    echo "Rollout complete."
    return 0
  fi

  error "candidate rollout failed; attempting rollback"

  if [[ -n "$current_runtime_image" && "$current_runtime_image" != "$candidate_runtime_image" ]]; then
    deploy_runtime_image "$compose_file" "$current_runtime_image"
    docker compose -f "$compose_file" ps
    if run_smoke_checks "$smoke_script" "$current_runtime_image"; then
      persist_release_state "$state_file" "$current_runtime_image"
      prune_old_runtime_images "$current_runtime_image"
      error "rollback to prior runtime image succeeded"
      exit 1
    fi
    error "rollback smoke checks failed"
    exit 1
  fi

  error "no prior runtime image available for rollback"
  exit 1
}

main "$@"

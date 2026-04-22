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

attempt_checks() {
  local base_url="$1"
  local auth_status
  local curl_args

  curl_args=(
    --connect-timeout 5
    --max-time 15
    --retry 0
  )

  if ! curl -fsS "${curl_args[@]}" "$base_url/" >/dev/null; then
    error "base URL not ready: $base_url/"
    return 1
  fi

  if ! curl -fsS "${curl_args[@]}" "$base_url/api/health" | jq -e '.success == true and .ready == true' >/dev/null; then
    error "health endpoint not ready: $base_url/api/health"
    return 1
  fi

  if ! curl -fsS "${curl_args[@]}" "$base_url/v1/api/health" | jq -e '.success == true and .ready == true' >/dev/null; then
    error "v1 health endpoint not ready: $base_url/v1/api/health"
    return 1
  fi

  if ! curl -fsS "${curl_args[@]}" "$base_url/api/setup-complete" | \
    jq -e '.results.BetterAuthConfigured == true and .results.DefaultWorkspaceReady == true' >/dev/null; then
    error "setup-complete auth readiness mismatch: $base_url/api/setup-complete"
    return 1
  fi

  if ! auth_status="$(
    curl -sS \
      "${curl_args[@]}" \
      -o /dev/null \
      -w '%{http_code}' \
      "$base_url/api/auth/bridge/session"
  )"; then
    error "auth bridge not ready: $base_url/api/auth/bridge/session"
    return 1
  fi

  if [[ "$auth_status" != "401" ]]; then
    error "auth bridge returned unexpected status: $auth_status"
    return 1
  fi

  return 0
}

main() {
  local root_dir hetzner_dir env_file base_url timeout_seconds deadline sleep_seconds attempt remaining

  root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
  hetzner_dir="$root_dir/deploy/hetzner"
  env_file="$hetzner_dir/anythingllm.env"
  timeout_seconds=900
  sleep_seconds=5
  attempt=1

  require_command curl
  require_command jq

  if [[ ! -f "$env_file" ]]; then
    error "missing env file: $env_file"
    exit 1
  fi

  set -a
  # shellcheck disable=SC1090
  source "$env_file"
  set +a

  if [[ -z "${DOMAIN:-}" ]]; then
    error "missing required env var: DOMAIN"
    exit 1
  fi

  base_url="https://$DOMAIN"
  deadline=$((SECONDS + timeout_seconds))

  while true; do
    if attempt_checks "$base_url"; then
      echo "Smoke checks OK."
      return 0
    fi

    if (( SECONDS >= deadline )); then
      error "timed out after ${timeout_seconds}s waiting for the stack to become ready"
      exit 1
    fi

    remaining=$((deadline - SECONDS))
    if (( remaining < sleep_seconds )); then
      sleep_seconds="$remaining"
    fi

    echo "Retrying smoke checks in ${sleep_seconds}s (attempt ${attempt})..." >&2
    sleep "$sleep_seconds"
    attempt=$((attempt + 1))
    if (( sleep_seconds < 30 )); then
      sleep_seconds=$((sleep_seconds * 2))
      if (( sleep_seconds > 30 )); then
        sleep_seconds=30
      fi
    fi
  done

  return 0
}

main "$@"

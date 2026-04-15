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
  local api_key="$2"
  local auth_response workspaces_response
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

  if ! auth_response="$(
    curl -fsS \
      "${curl_args[@]}" \
      -H "Authorization: Bearer $api_key" \
      "$base_url/api/v1/auth"
  )"; then
    error "auth endpoint not ready: $base_url/api/v1/auth"
    return 1
  fi

  if ! printf '%s' "$auth_response" | jq -e '.authenticated == true' >/dev/null; then
    error "auth endpoint returned unexpected payload: $auth_response"
    return 1
  fi

  if ! workspaces_response="$(
    curl -fsS \
      "${curl_args[@]}" \
      -H "Authorization: Bearer $api_key" \
      "$base_url/api/v1/workspaces"
  )"; then
    error "workspaces endpoint not ready: $base_url/api/v1/workspaces"
    return 1
  fi

  if ! printf '%s' "$workspaces_response" | jq -e '.workspaces | type == "array"' >/dev/null; then
    error "workspaces endpoint returned unexpected payload: $workspaces_response"
    return 1
  fi

  return 0
}

main() {
  local root_dir hetzner_dir env_file base_url timeout_seconds deadline sleep_seconds attempt remaining
  local api_key

  root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
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

  if [[ -z "${ANYTHINGLLM_API_KEY:-}" ]]; then
    error "missing required env var: ANYTHINGLLM_API_KEY"
    exit 1
  fi

  base_url="https://$DOMAIN"
  api_key="$ANYTHINGLLM_API_KEY"
  deadline=$((SECONDS + timeout_seconds))

  while true; do
    if attempt_checks "$base_url" "$api_key"; then
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

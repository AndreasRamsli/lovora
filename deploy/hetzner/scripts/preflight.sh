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
  local script_dir hetzner_dir repo_root env_file data_root compose_file

  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  hetzner_dir="$(cd "$script_dir/.." && pwd)"
  repo_root="$(cd "$hetzner_dir/../.." && pwd)"
  env_file="$hetzner_dir/anythingllm.env"
  compose_file="$hetzner_dir/docker-compose.yml"
  data_root="${LOVORA_DATA_ROOT:-$repo_root/.data/hetzner}"

  require_command docker
  require_command curl
  require_command jq
  require_command openssl
  require_command python3

  if [[ ! -f "$env_file" ]]; then
    error "missing env file: $env_file"
    exit 1
  fi

  set -a
  # shellcheck disable=SC1090
  source "$env_file"
  set +a

  local required_vars=(
    DOMAIN
    ACME_EMAIL
    JWT_SECRET
    SIG_KEY
    SIG_SALT
    ANYTHINGLLM_API_KEY
    XAI_LLM_API_KEY
    XAI_LLM_MODEL_PREF
    VOYAGEAI_API_KEY
    EMBEDDING_MODEL_PREF
  )

  local var_name
  for var_name in "${required_vars[@]}"; do
    if [[ -z "${!var_name:-}" ]]; then
      error "missing required env var: $var_name"
      exit 1
    fi
  done

  if [[ "${LLM_PROVIDER:-}" != "xai" ]]; then
    error "unexpected LLM_PROVIDER: ${LLM_PROVIDER:-unset}"
    exit 1
  fi

  if [[ "${EMBEDDING_ENGINE:-}" != "voyageai" ]]; then
    error "unexpected EMBEDDING_ENGINE: ${EMBEDDING_ENGINE:-unset}"
    exit 1
  fi

  if [[ "${XAI_LLM_MODEL_PREF:-}" != "grok-4.20-reasoning" ]]; then
    error "unexpected XAI_LLM_MODEL_PREF: ${XAI_LLM_MODEL_PREF:-unset}"
    exit 1
  fi

  if [[ "${EMBEDDING_MODEL_PREF:-}" != "voyage-law-2" ]]; then
    error "unexpected EMBEDDING_MODEL_PREF: ${EMBEDDING_MODEL_PREF:-unset}"
    exit 1
  fi

  install -d -m 755 "$data_root"
  install -d -m 755 "$data_root/server/storage"
  install -d -m 755 "$data_root/collector/hotdir"
  install -d -m 755 "$data_root/collector/outputs"

  docker compose -f "$compose_file" config >/dev/null
  python3 "$script_dir/check_prisma_migration_state.py" \
    "$data_root/server/storage/anythingllm.db"
  python3 "$script_dir/verify_stripe_webhook.py"

  echo "Hetzner preflight OK."
}

main "$@"

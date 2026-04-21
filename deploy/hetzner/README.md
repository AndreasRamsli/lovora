# Hetzner Production Runbook

This bundle runs Lovora on a Hetzner host with Docker Compose, Caddy TLS termination, direct xAI inference, and Voyage embeddings.

Production defaults:
- LLM provider: `xai`
- LLM model: `grok-4.20-reasoning`
- Embedding engine: `voyageai`
- Embedding model: `voyage-law-2`

The repository layout assumed here is:

- application repo root: `/srv/lovora/lovora`
- Hetzner bundle: `/srv/lovora/lovora/deploy/hetzner`
- persistent data root: `/srv/lovora/lovora/.data/hetzner`
- legal corpus scripts: `/srv/lovora`

## First Production Checklist

Complete these in order before the first public rollout:

1. Provision the Hetzner host and run `sudo bash scripts/bootstrap-host.sh`.
2. Create `anythingllm.env` from [anythingllm.env.example](anythingllm.env.example) and fill in all secrets.
3. Point DNS for `DOMAIN` to the Hetzner server.
4. Run [preflight.sh](scripts/preflight.sh) from the Hetzner bundle directory.
5. Start the stack with [rollout.sh](scripts/rollout.sh).
6. Prepare the first legal corpus on the app host.
7. Upload the first corpus with `upload_legal_corpus.py`.
8. Run [smoke.sh](scripts/smoke.sh) and the post-run audit script.
9. Enable the nightly backup timer.
10. Keep the rollback commands handy before any further change.

## 1. Bootstrap The Host

Provision a clean Ubuntu host on Hetzner, then install the production baseline:

```bash
sudo apt-get update
sudo apt-get install -y git docker.io docker-compose-plugin
```

Clone the repository under `/srv/lovora` and prepare the persistent data root:

```bash
sudo mkdir -p /srv/lovora
sudo chown "$USER":"$USER" /srv/lovora
cd /srv/lovora
git clone <repo-url> lovora
mkdir -p /srv/lovora/lovora/.data/hetzner
cd /srv/lovora/lovora/deploy/hetzner
```

If you want the host bootstrap script to install the defaults for you, run:

```bash
sudo bash scripts/bootstrap-host.sh
```

That script installs Docker and host packages, enables the firewall, and prepares the filesystem layout used by the stack.

## 2. Configure Secrets

Copy the example environment file:

```bash
cp anythingllm.env.example anythingllm.env
```

Fill in the real values before any deploy:

```dotenv
DOMAIN=lovora.example.com
ACME_EMAIL=ops@example.com
JWT_SECRET=<random-secret>
SIG_KEY=<random-secret>
SIG_SALT=<random-secret>
AUTH_TOKEN=<random-secret>
ANYTHINGLLM_API_KEY=<random-secret>
LLM_PROVIDER='xai'
XAI_LLM_API_KEY=<real-xai-api-key>
XAI_LLM_MODEL_PREF='grok-4.20-reasoning'
EMBEDDING_ENGINE='voyageai'
VOYAGEAI_API_KEY=<real-voyage-api-key>
EMBEDDING_MODEL_PREF='voyage-law-2'
FREE_MESSAGE_LIMIT=1
FREE_MESSAGE_WINDOW_HOURS=24
```

Generate secrets locally with a password manager or `openssl`:

```bash
export JWT_SECRET="$(openssl rand -hex 32)"
export SIG_KEY="$(openssl rand -hex 32)"
export SIG_SALT="$(openssl rand -hex 32)"
export AUTH_TOKEN="$(openssl rand -hex 32)"
export ANYTHINGLLM_API_KEY="$(openssl rand -hex 32)"
```

Do not reuse credentials from any previous environment or rollout.

Before running the deploy, preload the environment file:

```bash
set -a
. ./anythingllm.env
set +a
```

If you change the alpha quota on the live host, edit `anythingllm.env` there, update
`FREE_MESSAGE_LIMIT` and `FREE_MESSAGE_WINDOW_HOURS`, and then rerun the rollout:

```bash
cd /srv/lovora/lovora/deploy/hetzner
set -a
. ./anythingllm.env
set +a
bash scripts/rollout.sh
```

The rollout script re-runs preflight, brings the stack back up, and keeps the quota
change active without any separate server-side edit step.

## 3. Point DNS

Create an A record for `DOMAIN` that points to the Hetzner server public IP.

Wait for DNS to resolve before continuing, then confirm the hostname is reachable over HTTPS after Caddy comes up.

## 4. Run Preflight

From `/srv/lovora/lovora/deploy/hetzner`, run:

```bash
bash scripts/preflight.sh
```

Preflight checks the expected commands, required env values, data directories, and the Compose configuration before the first rollout.

## 5. Deploy

Start or update the stack with the canonical rollout script:

```bash
bash scripts/rollout.sh
```

This script runs preflight, brings up the Compose stack, waits for readiness, and then runs the smoke checks.

Useful follow-up checks:

```bash
docker compose -f docker-compose.yml ps
docker compose -f docker-compose.yml logs -f app
docker compose -f docker-compose.yml logs -f caddy
```

## 6. Auth Bootstrap

The production stack expects Better Auth to be configured and a default workspace to exist.
Keep the bootstrap slug aligned with the workspace created during boot/backfill:

```dotenv
DEFAULT_WORKSPACE_SLUG='workspace'
BETTER_AUTH_URL='https://app.lovora.no'
BETTER_AUTH_SECRET='<random-secret>'
BETTER_AUTH_TRUSTED_ORIGINS='https://app.lovora.no,https://lovora.no,https://www.lovora.no'
```

After rollout, confirm the readiness surface instead of relying on health checks alone:

```bash
curl -fsS "https://$DOMAIN/api/setup-complete" \
  | jq '.results | { MultiUserMode, BetterAuthConfigured, DefaultWorkspaceSlug, DefaultWorkspaceReady, LegacyUserCount, BetterAuthUserCount }'
```

If the instance still has a legacy admin without the default workspace membership, reconcile that membership inside the app container. The script only needs the username, and the Hetzner host itself does not install `node`:

```bash
cd /srv/lovora/lovora/deploy/hetzner
docker compose -f docker-compose.yml exec app \
  node /app/server/scripts/reconcile-auth-state.js <legacy-username>
```

The script prints the reconciled legacy user and workspace slug as JSON. Re-run `scripts/smoke.sh` after this step so the readiness gate still passes.

## 7. Prepare The First Legal Corpus

Run the corpus formatter from the outer project root at `/srv/lovora`, not from the nested app repository or the Hetzner bundle directory:

```bash
cd /srv/lovora
python3 prepare_legal_corpus.py
```

By default, this writes the prepared sections into `legal_embedding_ready/` and generates the manifest at `legal_embedding_ready/_manifest.jsonl`.

If you want to stage only one corpus, use the script flags documented by `--help`.

## 8. Upload The First Corpus

Upload the prepared NL and SF sections into the production workspace:

```bash
cd /srv/lovora
python3 upload_legal_corpus.py \
  --base-url "https://$DOMAIN" \
  --api-key "$ANYTHINGLLM_API_KEY" \
  --workspace lovora-alpha
```

For a dry run:

```bash
cd /srv/lovora
python3 upload_legal_corpus.py --dry-run
```

The uploader reads `legal_embedding_ready/_manifest.jsonl` and preserves the source metadata needed for the Lovdata citation icon.

## 9. Smoke And Audit

Run the post-deploy smoke checks:

```bash
cd /srv/lovora/lovora/deploy/hetzner
bash scripts/smoke.sh
```

Then run the legal corpus audit:

```bash
cd /srv/lovora
python3 audit_lra_postrun.py \
  --base-url "https://$DOMAIN" \
  --api-key "$ANYTHINGLLM_API_KEY" \
  --workspace lovora-alpha \
  --folder lovdata-nl
```

Repeat the audit with `--folder lovdata-sf` after the SF upload if you want both corpora checked.

## 10. Nightly Backups

Enable the backup service and timer after the first successful rollout:

```bash
sudo cp /srv/lovora/lovora/deploy/hetzner/systemd/lovora-backup.service /etc/systemd/system/
sudo cp /srv/lovora/lovora/deploy/hetzner/systemd/lovora-backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now lovora-backup.timer
```

To run a backup manually:

```bash
cd /srv/lovora/lovora/deploy/hetzner
bash scripts/backup.sh
```

Backups are written under `/srv/lovora/backups/` and include the production env file plus the storage and collector data.

## 11. Roll Back

If a deploy needs to be undone, stop the stack, restore the latest backup, and bring the stack back up:

```bash
cd /srv/lovora/lovora/deploy/hetzner
docker compose -f docker-compose.yml down
bash scripts/restore.sh latest
```

If you need a clean reset instead of a restore, remove `/srv/lovora/lovora/.data/hetzner`, re-run the corpus prep, and upload again:

```bash
rm -rf /srv/lovora/lovora/.data/hetzner
mkdir -p /srv/lovora/lovora/.data/hetzner
```

## Day-To-Day Operations

- Keep `anythingllm.env` out of source control.
- Re-run `scripts/preflight.sh` before every meaningful rollout.
- Re-run `scripts/smoke.sh` and the audit script after every corpus refresh.
- Check `docker compose -f docker-compose.yml ps` and the container logs when the site misbehaves.

If you need the minimal host bootstrap path, the deploy path, or the corpus upload path again, follow the numbered sections above in order.

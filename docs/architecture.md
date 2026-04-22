# Lovora Architecture

Lovora has one production deployment path: the canonical Hetzner bundle at `/srv/lovora/lovora/deploy/hetzner`.
That bundle owns host bootstrap, Compose deployment, smoke checks, backup, rollback, and restore for the live service.

The production stack is:

- Caddy for TLS termination and reverse proxying
- The app container for the Lovora web app and API
- Storage under `/srv/lovora/lovora/.data/hetzner`
- Backup artifacts under `/srv/lovora/backups`

`ramsli-custom` is legacy-only. It can be used as a historical reference, but it is not part of the production boundary and should not receive new production changes.

Operationally, the boundary is:

- use `deploy/hetzner` for deploys and day-to-day host operations
- use `ops/runbooks` for the canonical deploy, rollback, and restore steps
- keep environment secrets out of git and load them from `anythingllm.env`

The production workflow is intentionally simple: preflight, rollout, smoke test, back up, and restore from backup when needed.

# Rollback Runbook

Use this when a release is bad and you need to separate release rollback from data recovery.

`deploy/hetzner/scripts/backup.sh` does not capture application code or container images. It only backs up `anythingllm.env`, `server/storage`, and `collector` data.
That means a backup restore can recover environment and runtime data, but it cannot roll Lovora back to an older code revision by itself.

1. Stop the stack from `/srv/lovora/lovora/deploy/hetzner`.
2. If you need to recover lost env or runtime data, restore the latest backup with `bash scripts/restore.sh <backup-name-or-latest>`.
3. If the release itself is the problem, redeploy the last known-good code revision or image from the deployment source of truth.
4. Re-run `bash scripts/preflight.sh` and then `bash scripts/rollout.sh` for the chosen release.
5. Re-run `bash scripts/smoke.sh` and verify the live site and API are responsive.

Treat restore as data recovery and redeploy as release rollback. They solve different problems and may both be required.

# Rollback Runbook

Use this when a release is bad and you need to separate release rollback from data recovery.

`deploy/hetzner/scripts/backup.sh` does not capture application code or container images. It only backs up `anythingllm.env`, `server/storage`, and `collector` data.
That means a backup restore can recover environment and runtime data, but it cannot roll Lovora back to an older code revision by itself.

1. Check `${LOVORA_DATA_ROOT:-../../.data/hetzner}/deploy/release-state.env` for the current healthy runtime image reference.
2. If the most recent rollout failed, review the `scripts/rollout.sh` output first. It now attempts to redeploy the prior runtime image automatically on smoke failure.
Automatic retention now keeps only bounded Lovora runtime images: after a successful rollout, the active image and its immediate rollback image are retained; after an automatic rollback, the failed candidate image is pruned. Unrelated Docker images are left alone.
3. If you still need a manual release rollback, redeploy the last known-good code revision from Git and rerun `bash scripts/rollout.sh` from that revision so it builds and records a fresh explicit runtime image.
4. If you also need runtime-data recovery, restore the latest backup with `bash scripts/restore.sh <backup-name-or-latest>`.
5. Re-run `bash scripts/smoke.sh` and verify the live site and API are responsive.

Treat restore as data recovery and redeploy as release rollback. They solve different problems and may both be required.

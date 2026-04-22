# Restore Runbook

Use this when you need to replace the current production env and runtime data with a backup copy.

1. Confirm the target backup exists under `/srv/lovora/backups`.
2. Move into `/srv/lovora/lovora/deploy/hetzner`.
3. Run `bash scripts/restore.sh <backup-name-or-latest>`.
4. Expect the script to stage the backup, cut over to the restored `server/storage`, `collector`, and `anythingllm.env`, then bring the stack up and run `bash scripts/smoke.sh`.
5. If bring-up or smoke verification fails, the script exits non-zero after restoring the prior live env and data and attempting to bring the previous stack back.

This is a replacement workflow, not an in-place merge. Anything currently in the Hetzner data root or live env file is overwritten by the backup contents.

# Deploy Runbook

Use this runbook for the canonical Lovora production deployment at `/srv/lovora/lovora/deploy/hetzner`.

1. SSH to the Hetzner host and enter the bundle directory.
2. Load `anythingllm.env` and confirm the required secrets and domain settings are present.
3. Run `bash scripts/preflight.sh`.
4. Run `bash scripts/rollout.sh`.
5. If rollout succeeds, confirm the stack is healthy with `docker compose -f docker-compose.yml ps`.
6. Inspect `${LOVORA_DATA_ROOT:-../../.data/hetzner}/deploy/release-state.env` and confirm `CURRENT_RUNTIME_IMAGE` matches the expected release image.

Preflight refuses to continue if the persisted SQLite database has an unresolved
Prisma migration in `_prisma_migrations`, or if the production-critical
`workspace_users_user_id_workspace_id_key` index is missing. Fix that before
building a new runtime image; otherwise Prisma may fail after the candidate
container is already deployed.

If `scripts/rollout.sh` exits non-zero after a smoke failure, it will attempt to redeploy the prior recorded runtime image automatically before returning control to the operator.
After a successful rollout, the script prunes older `lovora-hetzner-runtime:*` tags so the host keeps the active release image plus the immediately prior rollback image. It does not prune unrelated Docker images.

If Stripe billing is enabled, verify the webhook endpoint still points at `https://$DOMAIN/api/billing/stripe/webhook` and still includes the required events.

## 2026-04-24 Prisma Repair Note

Production hit Prisma `P3018`/`P3009` during rollout because migration
`20260415153000_default_workspace_membership_init` attempted to create an
already-existing `workspace_users` table. The database was backed up first:

```text
/srv/lovora/lovora/.data/hetzner/server/storage/anythingllm.pre-migration-resolve-20260424121351.db
```

The live database had no duplicate `(user_id, workspace_id)` memberships, so the
missing unique index was created manually and the migration was marked applied
with `prisma migrate resolve --applied`. Do not edit that already-applied
migration casually; changing its file contents can create Prisma checksum drift.

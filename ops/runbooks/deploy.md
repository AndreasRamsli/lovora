# Deploy Runbook

Use this runbook for the canonical Lovora production deployment at `/srv/lovora/lovora/deploy/hetzner`.

1. SSH to the Hetzner host and enter the bundle directory.
2. Load `anythingllm.env` and confirm the required secrets and domain settings are present.
3. Run `bash scripts/preflight.sh`.
4. Run `bash scripts/rollout.sh`.
5. If rollout succeeds, confirm the stack is healthy with `docker compose -f docker-compose.yml ps`.
6. Inspect `${LOVORA_DATA_ROOT:-../../.data/hetzner}/deploy/release-state.env` and confirm `CURRENT_RUNTIME_IMAGE` matches the expected release image.

If `scripts/rollout.sh` exits non-zero after a smoke failure, it will attempt to redeploy the prior recorded runtime image automatically before returning control to the operator.
After a successful rollout, the script prunes older `lovora-hetzner-runtime:*` tags so the host keeps the active release image plus the immediately prior rollback image. It does not prune unrelated Docker images.

If Stripe billing is enabled, verify the webhook endpoint still points at `https://$DOMAIN/api/billing/stripe/webhook` and still includes the required events.

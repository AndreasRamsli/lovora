# Deploy Runbook

Use this runbook for the canonical Lovora production deployment at `/srv/lovora/lovora/deploy/hetzner`.

1. SSH to the Hetzner host and enter the bundle directory.
2. Load `anythingllm.env` and confirm the required secrets and domain settings are present.
3. Run `bash scripts/preflight.sh`.
4. Run `bash scripts/rollout.sh`.
5. Confirm the stack is healthy with `docker compose -f docker-compose.yml ps`.
6. Run `bash scripts/smoke.sh` if you need an explicit post-deploy check outside rollout.

If Stripe billing is enabled, verify the webhook endpoint still points at `https://$DOMAIN/api/billing/stripe/webhook` and still includes the required events.

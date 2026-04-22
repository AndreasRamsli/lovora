# Operations

This directory contains the operator-facing runbooks for the canonical Lovora production deployment.

Use these docs together:

- `deploy.md` for shipping a new release or config change
- `rollback.md` for undoing a bad rollout
- `restore.md` for rebuilding the stack from a backup

All production operations assume the Hetzner bundle at `/srv/lovora/lovora/deploy/hetzner`.
If a procedure mentions `ramsli-custom`, treat it as historical context only.

# Better Auth Infra Auth Runbook

## Required Server Env
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_API_KEY`
- `BETTER_AUTH_TRUSTED_ORIGINS`

## Quick Verification
1. `GET /api/auth/ok` returns `200`.
2. `GET /api/auth/bridge/session` returns `401` without a Better Auth cookie session.
3. Sign in using Better Auth, then `GET /api/auth/bridge/session` returns `200` with `valid: true`.
4. In multi-user mode, `GET /api/system/check-token` returns `200` with cookie session only (no `Authorization` header).

## Notes
- `/api/auth/bridge/exchange` is still mounted for short-term bridge compatibility.
- In production, the server logs a warning when `BETTER_AUTH_API_KEY` is missing.

# Production Hardening Program Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Lovora from a credible private alpha into a repeatable, recoverable, auditable closed-beta service without changing the product promise.

**Architecture:** Keep the existing Hetzner-first deployment model, but make the operational boundaries explicit: one canonical deployment bundle, split `server` and `collector` into separate runtime services, harden billing/auth around deterministic state transitions, and make corpus/eval metadata first-class. Preserve the current app architecture where it already works; add thin, testable seams instead of large rewrites.

**Tech Stack:** Node 18, Express, Prisma, SQLite (closed-beta hardening only), Better Auth, Stripe, LanceDB, Docker Compose, Caddy, Jest, Supertest, Playwright, Python 3 standard library for ops scripts/tests

---

## Scope Note

This scope naturally wants to split into follow-on plans. This document is the concrete master plan for the **beta-hardening baseline** only:

- canonical deployment and runbooks
- split runtime services
- SQLite guardrails for closed beta
- Stripe idempotency and reconciliation
- auth/quota invariants and billing UX
- corpus ownership/versioning
- retrieval evals and answer metadata
- observability, operator review, CI, and governance docs

This plan intentionally does **not** do the full public-launch PostgreSQL cutover, org accounts, SSO, or enterprise controls. Those should be separate follow-up plans after this baseline lands cleanly.

## File Map

**Canonical ops boundary**
- Create: `docs/architecture.md`
- Create: `ops/README.md`
- Create: `ops/runbooks/deploy.md`
- Create: `ops/runbooks/rollback.md`
- Create: `ops/runbooks/restore.md`
- Create: `ramsli-custom/README.md`
- Modify: `deploy/hetzner/README.md`
- Test: `deploy/hetzner/tests/test_canonical_bundle.py`

**Runtime split + DB guardrails**
- Modify: `deploy/hetzner/docker-compose.yml`
- Modify: `deploy/hetzner/supervisord.conf`
- Modify: `deploy/hetzner/scripts/smoke.sh`
- Create: `server/utils/storage/sqliteIntegrity.js`
- Create: `server/scripts/sqlite-integrity-check.js`
- Test: `deploy/hetzner/tests/test_runtime_split.py`
- Test: `server/__tests__/utils/storage/sqliteIntegrity.test.js`

**Billing and auth hardening**
- Modify: `server/prisma/schema.prisma`
- Create: `server/prisma/migrations/20260422103000_stripe_webhook_events/migration.sql`
- Create: `server/models/stripeWebhookEvent.js`
- Create: `server/utils/billing/reconcileBillingState.js`
- Create: `server/utils/billing/accessDecision.js`
- Create: `server/scripts/reconcile-billing-state.js`
- Modify: `server/endpoints/billing.js`
- Modify: `server/models/user.js`
- Modify: `server/endpoints/betterAuthBridge.js`
- Test: `server/__tests__/endpoints/billing.test.js`
- Test: `server/__tests__/utils/billing/reconcileBillingState.test.js`
- Test: `server/__tests__/utils/billing/accessDecision.test.js`

**Billing UX**
- Modify: `frontend/src/models/billing.js`
- Modify: `frontend/src/components/UserMenu/BillingShell.jsx`
- Modify: `frontend/src/components/UserMenu/BillingStatusBanner.jsx`
- Modify: `frontend/src/components/UserMenu/BillingUpgradeButton.jsx`
- Modify: `frontend/src/components/UserMenu/billingPresentation.js`
- Test: `frontend/src/components/UserMenu/billingPresentation.test.js`

**Corpus ownership and versioning**
- Create: `ops/corpus/README.md`
- Create: `ops/corpus/manifest.schema.json`
- Create: `ops/corpus/manifest_tools.py`
- Create: `ops/corpus/prepare_legal_corpus.py`
- Create: `ops/corpus/upload_legal_corpus.py`
- Create: `ops/corpus/audit_legal_corpus.py`
- Create: `ops/corpus/tests/test_manifest_schema.py`
- Create: `server/prisma/migrations/20260422113000_corpus_releases/migration.sql`
- Create: `server/models/corpusRelease.js`
- Modify: `server/prisma/schema.prisma`
- Modify: `server/endpoints/api/admin/index.js`
- Test: `server/__tests__/models/corpusRelease.test.js`

**Retrieval evals and answer metadata**
- Create: `ops/evals/legal/golden-set.jsonl`
- Create: `server/utils/evals/retrievalEvaluator.js`
- Create: `server/scripts/run-retrieval-evals.js`
- Create: `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.js`
- Test: `server/__tests__/utils/evals/retrievalEvaluator.test.js`
- Test: `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.test.js`
- Modify: `server/utils/chats/apiChatHandler.js`
- Modify: `server/utils/agents/aibitat/plugins/chat-history.js`
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/Citation/index.jsx`

**Observability, review, CI, and governance**
- Create: `server/utils/observability/audit.js`
- Test: `server/__tests__/utils/observability/audit.test.js`
- Modify: `server/models/eventLogs.js`
- Modify: `server/endpoints/utils.js`
- Modify: `server/models/conversationFlags.js`
- Modify: `frontend/src/pages/GeneralSettings/Chats/index.jsx`
- Modify: `.github/workflows/run-tests.yaml`
- Create: `docs/production-readiness.md`
- Create: `docs/release-process.md`
- Create: `docs/privacy-policy.md`
- Create: `docs/data-retention.md`
- Create: `docs/incident-response.md`
- Create: `docs/ai-intended-use.md`
- Create: `docs/subprocessors.md`

### Task 1: Canonical Ops Boundary

**Files:**
- Create: `deploy/hetzner/tests/test_canonical_bundle.py`
- Create: `docs/architecture.md`
- Create: `ops/README.md`
- Create: `ops/runbooks/deploy.md`
- Create: `ops/runbooks/rollback.md`
- Create: `ops/runbooks/restore.md`
- Create: `ramsli-custom/README.md`
- Modify: `deploy/hetzner/README.md`

- [ ] **Step 1: Write the failing test**

```python
from pathlib import Path
import unittest


class CanonicalBundleTests(unittest.TestCase):
    def test_hetzner_readme_marks_itself_as_canonical(self):
        readme = Path("deploy/hetzner/README.md").read_text()
        self.assertIn("canonical production deployment", readme)
        self.assertIn("/srv/lovora/lovora/deploy/hetzner", readme)

    def test_legacy_bundle_is_explicitly_marked_legacy(self):
        legacy = Path("ramsli-custom/README.md").read_text()
        self.assertIn("legacy deployment bundle", legacy)
        self.assertIn("Do not use for new production deployments", legacy)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 -m unittest deploy.hetzner.tests.test_canonical_bundle -v
```

Expected: FAIL because `deploy/hetzner/tests/test_canonical_bundle.py` and `ramsli-custom/README.md` do not exist yet.

- [ ] **Step 3: Add the ops boundary docs**

```md
# Architecture

Lovora is a hosted legal/RAG assistant deployed from the nested app repository at `/srv/lovora/lovora`.
The canonical production deployment bundle is `deploy/hetzner/`.
The outer `/srv/lovora` workspace is reserved for large legal corpus inputs and generated corpus artifacts that are not committed to Git.
```

```md
# Ops

Use `deploy/hetzner/` for all production rollouts.
Use `ops/corpus/` for versioned corpus tooling.
Use `ops/runbooks/` for deploy, rollback, and restore procedures.
```

- [ ] **Step 4: Update the canonical and legacy deployment docs**

```md
# Legacy deployment bundle

This directory is a legacy deployment bundle kept only for reference while `deploy/hetzner/` is the canonical production deployment.

Do not use for new production deployments.
Do not update this bundle with new operational logic.
If a compatibility wrapper is still needed, it must call back into `deploy/hetzner/` rather than diverging further.
```

```md
## Canonical deployment path

`deploy/hetzner/` is the canonical production deployment bundle.
`ramsli-custom/` is legacy-only and must not be used for new production rollouts.
```

- [ ] **Step 5: Run the test to verify it passes**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 -m unittest deploy.hetzner.tests.test_canonical_bundle -v
```

Expected: PASS with 2 tests.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add docs/architecture.md ops/README.md ops/runbooks/deploy.md ops/runbooks/rollback.md ops/runbooks/restore.md deploy/hetzner/README.md deploy/hetzner/tests/test_canonical_bundle.py ramsli-custom/README.md
git commit -m "docs: canonicalize production ops boundary"
```

### Task 2: Split Runtime Services And Add SQLite Guardrails

**Files:**
- Create: `deploy/hetzner/tests/test_runtime_split.py`
- Create: `server/utils/storage/sqliteIntegrity.js`
- Create: `server/scripts/sqlite-integrity-check.js`
- Create: `server/__tests__/utils/storage/sqliteIntegrity.test.js`
- Modify: `deploy/hetzner/docker-compose.yml`
- Modify: `deploy/hetzner/supervisord.conf`
- Modify: `deploy/hetzner/scripts/smoke.sh`

- [ ] **Step 1: Write the failing tests**

```python
from pathlib import Path
import unittest


class RuntimeSplitTests(unittest.TestCase):
    def test_compose_has_server_and_collector_services(self):
        compose = Path("deploy/hetzner/docker-compose.yml").read_text()
        self.assertIn("\n  server:\n", compose)
        self.assertIn("\n  collector:\n", compose)
        self.assertNotIn("\n  app:\n", compose)

    def test_supervisord_no_longer_runs_collector(self):
        config = Path("deploy/hetzner/supervisord.conf").read_text()
        self.assertIn("[program:anythingllm]", config)
        self.assertNotIn("[program:collector]", config)


if __name__ == "__main__":
    unittest.main()
```

```js
const { isHealthySqlitePath } = require("../../../utils/storage/sqliteIntegrity");

describe("isHealthySqlitePath", () => {
  test("returns ok=false when the file does not exist", async () => {
    const result = await isHealthySqlitePath("/tmp/does-not-exist.db");
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("missing_file");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
npx jest server/__tests__/utils/storage/sqliteIntegrity.test.js --runInBand
```

Expected: FAIL because the compose stack still exposes `app`, supervisord still runs collector, and the SQLite helper does not exist.

- [ ] **Step 3: Split the compose stack into `server` and `collector`**

```yaml
services:
  server:
    build:
      context: ../..
      dockerfile: deploy/hetzner/Dockerfile
    env_file:
      - ./anythingllm.env
    command: ["/bin/bash", "-lc", "cd /app/server && export CHECKPOINT_DISABLE=1 && yarn start"]
    expose:
      - "3001"

  collector:
    build:
      context: ../..
      dockerfile: deploy/hetzner/Dockerfile
    env_file:
      - ./anythingllm.env
    command: ["/bin/bash", "-lc", "cd /app/collector && node index.js"]
    expose:
      - "8888"

  caddy:
    depends_on:
      server:
        condition: service_healthy
```

```ini
[program:anythingllm]
command=/bin/bash -c "cd /app/server && export CHECKPOINT_DISABLE=1 && exec yarn start"
autostart=true
autorestart=true
user=anythingllm
stderr_logfile=/var/log/supervisor/anythingllm.err.log
stdout_logfile=/var/log/supervisor/anythingllm.out.log
environment=HOME="/home/anythingllm",USER="anythingllm"
```

- [ ] **Step 4: Add the SQLite integrity helper and script**

```js
const fs = require("fs/promises");

async function isHealthySqlitePath(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    return { ok: false, reason: "missing_file" };
  }

  const header = Buffer.alloc(16);
  const handle = await fs.open(filePath, "r");
  try {
    await handle.read(header, 0, 16, 0);
  } finally {
    await handle.close();
  }

  const expected = "SQLite format 3\u0000";
  return header.toString("utf8") === expected
    ? { ok: true, reason: "ok" }
    : { ok: false, reason: "invalid_header" };
}

module.exports = { isHealthySqlitePath };
```

```js
#!/usr/bin/env node
const path = require("path");
const { isHealthySqlitePath } = require("../utils/storage/sqliteIntegrity");

async function main() {
  const target = process.argv[2] || path.resolve(__dirname, "../storage/anythingllm.db");
  const result = await isHealthySqlitePath(target);
  if (!result.ok) {
    console.error(JSON.stringify(result));
    process.exit(1);
  }
  console.log(JSON.stringify(result));
}

main();
```

- [ ] **Step 5: Update smoke coverage and rerun tests**

```bash
cd /Users/andreas/fun/lovora/lovora
python3 -m unittest deploy.hetzner.tests.test_runtime_split -v
npx jest server/__tests__/utils/storage/sqliteIntegrity.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add deploy/hetzner/docker-compose.yml deploy/hetzner/supervisord.conf deploy/hetzner/scripts/smoke.sh deploy/hetzner/tests/test_runtime_split.py server/utils/storage/sqliteIntegrity.js server/scripts/sqlite-integrity-check.js server/__tests__/utils/storage/sqliteIntegrity.test.js
git commit -m "ops: split server and collector runtime"
```

### Task 3: Add Stripe Webhook Idempotency And Reconciliation

**Files:**
- Create: `server/prisma/migrations/20260422103000_stripe_webhook_events/migration.sql`
- Modify: `server/prisma/schema.prisma`
- Create: `server/models/stripeWebhookEvent.js`
- Create: `server/utils/billing/reconcileBillingState.js`
- Create: `server/scripts/reconcile-billing-state.js`
- Modify: `server/endpoints/billing.js`
- Modify: `server/__tests__/endpoints/billing.test.js`
- Create: `server/__tests__/utils/billing/reconcileBillingState.test.js`

- [ ] **Step 1: Write the failing tests**

```js
test("ignores duplicate Stripe webhook events", async () => {
  stripe.webhooks.constructEvent.mockReturnValue({
    id: "evt_duplicate",
    type: "customer.subscription.updated",
    data: { object: { id: "sub_123", customer: "cus_123", status: "active", metadata: { userId: "7" } } },
  });

  StripeWebhookEvent.markProcessing.mockResolvedValueOnce({ duplicate: false });
  StripeWebhookEvent.markProcessing.mockResolvedValueOnce({ duplicate: true });

  await request(app).post("/billing/stripe/webhook").set("stripe-signature", "sig").send("{}");
  await request(app).post("/billing/stripe/webhook").set("stripe-signature", "sig").send("{}");

  expect(User._update).toHaveBeenCalledTimes(1);
});
```

```js
test("reconciliation picks Stripe subscription state over stale local state", async () => {
  const result = await reconcileBillingState({
    user: { id: 7, stripeCustomerId: "cus_123", billingStatus: "active", billingPlan: "monthly" },
    stripeSubscription: { id: "sub_123", status: "canceled", metadata: { planKey: "monthly" } },
  });

  expect(result.billingStatus).toBe("inactive");
  expect(result.billingPlan).toBe("free");
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/endpoints/billing.test.js server/__tests__/utils/billing/reconcileBillingState.test.js --runInBand
```

Expected: FAIL because `StripeWebhookEvent` and `reconcileBillingState` do not exist.

- [ ] **Step 3: Add the Prisma model and migration**

```prisma
model stripe_webhook_events {
  id            Int      @id @default(autoincrement())
  stripeEventId String   @unique
  eventType     String
  status        String   @default("processing")
  payload       String?
  processedAt   DateTime?
  createdAt     DateTime @default(now())

  @@index([status])
}
```

```sql
CREATE TABLE "stripe_webhook_events" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "stripeEventId" TEXT NOT NULL,
  "eventType" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'processing',
  "payload" TEXT,
  "processedAt" DATETIME
);

CREATE UNIQUE INDEX "stripe_webhook_events_stripeEventId_key" ON "stripe_webhook_events"("stripeEventId");
CREATE INDEX "stripe_webhook_events_status_idx" ON "stripe_webhook_events"("status");
```

- [ ] **Step 4: Implement the idempotent event ledger and reconciliation logic**

```js
const prisma = require("../utils/prisma");

const StripeWebhookEvent = {
  async markProcessing(event) {
    try {
      const row = await prisma.stripe_webhook_events.create({
        data: {
          stripeEventId: String(event.id),
          eventType: String(event.type),
          payload: JSON.stringify(event),
        },
      });
      return { duplicate: false, row };
    } catch (error) {
      if (error?.code === "P2002") return { duplicate: true, row: null };
      throw error;
    }
  },

  async markProcessed(eventId) {
    return prisma.stripe_webhook_events.update({
      where: { stripeEventId: String(eventId) },
      data: { status: "processed", processedAt: new Date() },
    });
  },
};

module.exports = { StripeWebhookEvent };
```

```js
function reconcileBillingState({ user, stripeSubscription }) {
  if (!stripeSubscription || stripeSubscription.status === "canceled") {
    return {
      billingStatus: "inactive",
      billingPlan: "free",
      stripeSubscriptionId: null,
    };
  }

  return {
    billingStatus: stripeSubscription.status === "active" ? "active" : "inactive",
    billingPlan: stripeSubscription.metadata?.planKey || user.billingPlan || "free",
    stripeSubscriptionId: stripeSubscription.id || null,
  };
}

module.exports = { reconcileBillingState };
```

- [ ] **Step 5: Wire the webhook and add the operator reconciliation command**

```js
const processing = await StripeWebhookEvent.markProcessing(event);
if (processing.duplicate) {
  return response.status(200).json({ received: true, duplicate: true });
}

try {
  // existing switch(event.type) logic
  await StripeWebhookEvent.markProcessed(event.id);
  response.status(200).json({ received: true });
} catch (error) {
  response.status(500).json({ error: error.message });
}
```

```js
#!/usr/bin/env node
const { User } = require("../models/user");
const { getStripeClient } = require("../utils/billing/stripeClient");
const { reconcileBillingState } = require("../utils/billing/reconcileBillingState");

async function main() {
  const stripe = getStripeClient();
  const users = await User.where({ stripeCustomerId: { not: null } });
  for (const user of users) {
    const subscriptions = user.stripeSubscriptionId
      ? await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
      : null;
    const updates = reconcileBillingState({ user, stripeSubscription: subscriptions });
    await User._update(user.id, updates);
    console.log(JSON.stringify({ userId: user.id, updates }));
  }
}

main();
```

- [ ] **Step 6: Run the tests to verify they pass**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/endpoints/billing.test.js server/__tests__/utils/billing/reconcileBillingState.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/prisma/schema.prisma server/prisma/migrations/20260422103000_stripe_webhook_events/migration.sql server/models/stripeWebhookEvent.js server/utils/billing/reconcileBillingState.js server/scripts/reconcile-billing-state.js server/endpoints/billing.js server/__tests__/endpoints/billing.test.js server/__tests__/utils/billing/reconcileBillingState.test.js
git commit -m "feat: harden stripe webhook processing"
```

### Task 4: Extract Deterministic Access Decisions And Finish Billing UX

**Files:**
- Create: `server/utils/billing/accessDecision.js`
- Create: `server/__tests__/utils/billing/accessDecision.test.js`
- Modify: `server/models/user.js`
- Modify: `server/endpoints/billing.js`
- Modify: `server/endpoints/betterAuthBridge.js`
- Modify: `frontend/src/models/billing.js`
- Modify: `frontend/src/components/UserMenu/BillingShell.jsx`
- Modify: `frontend/src/components/UserMenu/BillingStatusBanner.jsx`
- Modify: `frontend/src/components/UserMenu/BillingUpgradeButton.jsx`
- Modify: `frontend/src/components/UserMenu/billingPresentation.js`
- Modify: `frontend/src/components/UserMenu/billingPresentation.test.js`

- [ ] **Step 1: Write the failing tests**

```js
const { buildAccessDecision } = require("../../../utils/billing/accessDecision");

describe("buildAccessDecision", () => {
  test("allows admins without quota", () => {
    expect(buildAccessDecision({ role: "admin" }, { used: 999, limit: 1 }).reason).toBe("admin_bypass");
  });

  test("denies free users once quota is exhausted", () => {
    const result = buildAccessDecision(
      { role: "default", billingStatus: "inactive", billingCurrentPeriodEnd: null },
      { used: 3, limit: 3, windowHours: 24, nextResetAt: "2099-01-01T00:00:00.000Z" }
    );
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("quota_reached");
  });
});
```

```js
test("presents canceled subscriptions as active-until-period-end", () => {
  const state = presentBillingState({
    billing: { plan: "monthly", status: "inactive", currentPeriodEnd: "2099-05-20T16:45:23.000Z" },
    chatAccess: { allowed: true, reason: "paid_access", quota: null },
  });

  expect(state.badge).toBe("Canceled, still active");
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/billing/accessDecision.test.js frontend/src/components/UserMenu/billingPresentation.test.js --runInBand
```

Expected: FAIL because `buildAccessDecision` and the new presentation case do not exist.

- [ ] **Step 3: Implement the pure access decision helper and reuse it from `User.getChatAccessState`**

```js
function buildAccessDecision(user, quota) {
  if (!user) return { allowed: false, reason: "no_user", quota: null };
  if (user.role === "admin") return { allowed: true, reason: "admin_bypass", quota: null };

  const paidUntil = user.billingCurrentPeriodEnd ? new Date(user.billingCurrentPeriodEnd).getTime() : 0;
  if (user.billingStatus === "active" && paidUntil > Date.now()) {
    return { allowed: true, reason: "paid_access", quota: null };
  }

  if (quota.used < quota.limit) return { allowed: true, reason: "within_quota", quota };
  return { allowed: false, reason: "quota_reached", quota };
}

module.exports = { buildAccessDecision };
```

- [ ] **Step 4: Add the billing portal endpoint and UI state handling**

```js
app.post("/billing/portal-session", [validatedRequest, flexUserRoleValid([ROLES.all])], async (request, response) => {
  const user = response.locals.user ?? (await userFromSession(request, response));
  if (!user?.stripeCustomerId) return response.status(400).json({ error: "No Stripe customer found." });

  const stripe = getStripeClient();
  const baseUrl = getCheckoutBaseUrl(request, reqBody(request));
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${baseUrl}/settings/system/billing`,
  });

  response.status(200).json({ url: session.url });
});
```

```js
export async function createBillingPortalSession() {
  const response = await fetch(`${API_BASE}/billing/portal-session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  return response.json();
}
```

```js
if (billing.status === "inactive" && billing.currentPeriodEnd && chatAccess.reason === "paid_access") {
  return { badge: "Canceled, still active", cta: "Manage billing" };
}
```

- [ ] **Step 5: Run server tests, frontend tests, and a build**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/billing/accessDecision.test.js server/__tests__/endpoints/billing.test.js frontend/src/components/UserMenu/billingPresentation.test.js --runInBand
cd frontend && yarn build
```

Expected: PASS, then Vite build completes successfully.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/utils/billing/accessDecision.js server/__tests__/utils/billing/accessDecision.test.js server/models/user.js server/endpoints/billing.js server/endpoints/betterAuthBridge.js frontend/src/models/billing.js frontend/src/components/UserMenu/BillingShell.jsx frontend/src/components/UserMenu/BillingStatusBanner.jsx frontend/src/components/UserMenu/BillingUpgradeButton.jsx frontend/src/components/UserMenu/billingPresentation.js frontend/src/components/UserMenu/billingPresentation.test.js
git commit -m "feat: make billing access decisions explicit"
```

### Task 5: Internalize Corpus Tooling And Version Corpus Releases

**Files:**
- Create: `ops/corpus/manifest.schema.json`
- Create: `ops/corpus/manifest_tools.py`
- Create: `ops/corpus/prepare_legal_corpus.py`
- Create: `ops/corpus/upload_legal_corpus.py`
- Create: `ops/corpus/audit_legal_corpus.py`
- Create: `ops/corpus/README.md`
- Create: `ops/corpus/tests/test_manifest_schema.py`
- Modify: `server/prisma/schema.prisma`
- Create: `server/prisma/migrations/20260422113000_corpus_releases/migration.sql`
- Create: `server/models/corpusRelease.js`
- Create: `server/__tests__/models/corpusRelease.test.js`
- Modify: `server/endpoints/api/admin/index.js`

- [ ] **Step 1: Write the failing tests**

```python
import unittest
from ops.corpus.manifest_tools import validate_manifest_record


class ManifestSchemaTests(unittest.TestCase):
    def test_manifest_requires_release_and_chunking_fields(self):
        record = {
            "corpus_id": "lovora-law",
            "corpus_version": "2026-04-22",
            "document_count": 10,
            "section_count": 100,
            "embedding_model": "voyage-law-2",
            "chunking": {"strategy": "legal-paragraph", "max_chars": 2200},
        }
        self.assertTrue(validate_manifest_record(record))


if __name__ == "__main__":
    unittest.main()
```

```js
test("stores and returns the latest corpus release for a workspace", async () => {
  const release = await CorpusRelease.record({
    workspaceSlug: "lovora-alpha",
    corpusId: "lovora-law",
    corpusVersion: "2026-04-22",
    manifestChecksum: "abc123",
  });

  expect(release.corpusVersion).toBe("2026-04-22");
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 -m unittest ops.corpus.tests.test_manifest_schema -v
npx jest server/__tests__/models/corpusRelease.test.js --runInBand
```

Expected: FAIL because the manifest validator and `CorpusRelease` model do not exist.

- [ ] **Step 3: Create the manifest schema and helper**

```python
REQUIRED_KEYS = {
    "corpus_id",
    "corpus_version",
    "document_count",
    "section_count",
    "embedding_model",
    "chunking",
}


def validate_manifest_record(record):
    missing = REQUIRED_KEYS.difference(record.keys())
    if missing:
        raise ValueError(f"Missing manifest keys: {sorted(missing)}")
    if not isinstance(record["chunking"], dict):
        raise ValueError("chunking must be an object")
    return True
```

```json
{
  "required": [
    "corpus_id",
    "corpus_version",
    "source_dataset_version",
    "document_count",
    "section_count",
    "embedding_model",
    "chunking",
    "manifest_checksum",
    "uploaded_at"
  ]
}
```

- [ ] **Step 4: Add the corpus release table and admin read surface**

```prisma
model corpus_releases {
  id                   Int      @id @default(autoincrement())
  workspaceSlug        String
  corpusId             String
  corpusVersion        String
  manifestChecksum     String
  documentCount        Int?
  sectionCount         Int?
  embeddingModel       String?
  createdAt            DateTime @default(now())

  @@index([workspaceSlug, createdAt])
}
```

```js
const prisma = require("../utils/prisma");

const CorpusRelease = {
  record(data) {
    return prisma.corpus_releases.create({ data });
  },

  latestForWorkspace(workspaceSlug) {
    return prisma.corpus_releases.findFirst({
      where: { workspaceSlug },
      orderBy: { createdAt: "desc" },
    });
  },
};

module.exports = { CorpusRelease };
```

- [ ] **Step 5: Move the corpus entry points into `ops/corpus` and rerun the tests**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 -m unittest ops.corpus.tests.test_manifest_schema -v
npx jest server/__tests__/models/corpusRelease.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add ops/corpus/README.md ops/corpus/manifest.schema.json ops/corpus/manifest_tools.py ops/corpus/prepare_legal_corpus.py ops/corpus/upload_legal_corpus.py ops/corpus/audit_legal_corpus.py ops/corpus/tests/test_manifest_schema.py server/prisma/schema.prisma server/prisma/migrations/20260422113000_corpus_releases/migration.sql server/models/corpusRelease.js server/__tests__/models/corpusRelease.test.js server/endpoints/api/admin/index.js
git commit -m "feat: version legal corpus releases"
```

### Task 6: Add Retrieval Evals And Source Metadata

**Files:**
- Create: `ops/evals/legal/golden-set.jsonl`
- Create: `server/utils/evals/retrievalEvaluator.js`
- Create: `server/scripts/run-retrieval-evals.js`
- Create: `server/__tests__/utils/evals/retrievalEvaluator.test.js`
- Create: `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.js`
- Create: `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.test.js`
- Modify: `server/utils/chats/apiChatHandler.js`
- Modify: `server/utils/agents/aibitat/plugins/chat-history.js`
- Modify: `frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/Citation/index.jsx`

- [ ] **Step 1: Write the failing tests**

```js
const { evaluateRetrieval } = require("../../../utils/evals/retrievalEvaluator");

test("marks retrieval as passing when expected sources are in top-k", () => {
  const result = evaluateRetrieval({
    expectedSources: ["lovdata://NL-2000-01-01"],
    retrievedSources: ["lovdata://NL-2000-01-01", "lovdata://HR-2024-1"],
    topK: 2,
  });

  expect(result.pass).toBe(true);
});
```

```js
import { presentCitationMetadata } from "./citationMetadata";

test("shows corpus version and retrieval timestamp when present", () => {
  const result = presentCitationMetadata({
    corpusVersion: "2026-04-22",
    retrievedAt: "2026-04-22T10:00:00.000Z",
    jurisdiction: "NO",
  });

  expect(result.footer).toContain("2026-04-22");
  expect(result.footer).toContain("NO");
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/evals/retrievalEvaluator.test.js frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.test.js --runInBand
```

Expected: FAIL because the evaluator and citation metadata helper do not exist.

- [ ] **Step 3: Implement the evaluator and seed the golden set**

```js
function evaluateRetrieval({ expectedSources = [], retrievedSources = [], topK = 5 }) {
  const top = retrievedSources.slice(0, topK);
  const hits = expectedSources.filter((source) => top.includes(source));
  return {
    pass: hits.length === expectedSources.length,
    hits,
    missed: expectedSources.filter((source) => !top.includes(source)),
    topK,
  };
}

module.exports = { evaluateRetrieval };
```

```json
{"id":"legal-q-001","question":"Når kan NAV kreve tilbakebetaling?","expected_sources":["lovdata://NL-1997-02-28-19"],"jurisdiction":"NO","must_refuse":false}
{"id":"legal-q-002","question":"Hva er gjeldende rett i Sverige for dette?","expected_sources":[],"jurisdiction":"NO","must_refuse":true}
```

- [ ] **Step 4: Persist answer metadata and render it in citations**

```js
response: {
  text: response,
  sources: citations,
  type: "chat",
  attachments,
  metrics,
  retrieval: {
    corpusVersion: invocation?.corpusVersion || null,
    retrievedAt: new Date().toISOString(),
    jurisdiction: invocation?.jurisdiction || "NO",
  },
}
```

```js
export function presentCitationMetadata({ corpusVersion, retrievedAt, jurisdiction }) {
  return {
    footer: [jurisdiction, corpusVersion, retrievedAt].filter(Boolean).join(" • "),
  };
}
```

- [ ] **Step 5: Run the tests and the eval script**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/evals/retrievalEvaluator.test.js frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.test.js --runInBand
node server/scripts/run-retrieval-evals.js ops/evals/legal/golden-set.jsonl
```

Expected: PASS, then a JSON summary with pass/fail counts.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add ops/evals/legal/golden-set.jsonl server/utils/evals/retrievalEvaluator.js server/scripts/run-retrieval-evals.js server/__tests__/utils/evals/retrievalEvaluator.test.js server/utils/chats/apiChatHandler.js server/utils/agents/aibitat/plugins/chat-history.js frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.js frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/citationMetadata.test.js frontend/src/components/WorkspaceChat/ChatContainer/ChatHistory/Citation/index.jsx
git commit -m "feat: add legal retrieval evaluation baseline"
```

### Task 7: Expand Observability And Operator Review

**Files:**
- Create: `server/utils/observability/audit.js`
- Create: `server/__tests__/utils/observability/audit.test.js`
- Modify: `server/models/eventLogs.js`
- Modify: `server/endpoints/billing.js`
- Modify: `server/endpoints/betterAuthBridge.js`
- Modify: `server/models/documents.js`
- Modify: `server/models/conversationFlags.js`
- Modify: `server/endpoints/utils.js`
- Modify: `frontend/src/pages/GeneralSettings/Chats/index.jsx`

- [ ] **Step 1: Write the failing test**

```js
const { audit } = require("../../../utils/observability/audit");
const { EventLogs } = require("../../../models/eventLogs");

jest.mock("../../../models/eventLogs", () => ({
  EventLogs: { logEvent: jest.fn() },
}));

test("writes a structured audit event with actor and context", async () => {
  await audit("billing_checkout_created", { actorId: 7, workspaceId: 22, metadata: { planKey: "monthly" } });
  expect(EventLogs.logEvent).toHaveBeenCalledWith(
    "billing_checkout_created",
    expect.objectContaining({ workspaceId: 22, planKey: "monthly" }),
    7
  );
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/observability/audit.test.js --runInBand
```

Expected: FAIL because the audit helper does not exist.

- [ ] **Step 3: Implement the structured audit helper and wire high-value events**

```js
const { EventLogs } = require("../../models/eventLogs");

async function audit(event, { actorId = null, metadata = {} } = {}) {
  return EventLogs.logEvent(
    event,
    {
      ...metadata,
      emittedAt: new Date().toISOString(),
    },
    actorId
  );
}

module.exports = { audit };
```

```js
await audit("billing_checkout_created", {
  actorId: user.id,
  metadata: { planKey: checkoutPlan.key, stripeCustomerId },
});
```

```js
await audit("auth_bridge_exchange_completed", {
  actorId: legacyUser.id,
  metadata: { authProvider: legacyUser.authProvider },
});
```

- [ ] **Step 4: Improve the operator review surface**

```js
return chats.map((chat) => ({
  id: chat.id,
  chatId: chat.id,
  provider,
  model,
  riskLevel: flag?.riskLevel || "safe",
  flagStatus: flag?.status || null,
  reviewedAt: flag?.reviewedAt || null,
  reviewNote: flag?.reviewNote || "",
  attachmentCount,
}));
```

```jsx
<th>Reviewed</th>
<th>Review note</th>
<th>Provider / model</th>
```

- [ ] **Step 5: Run the tests and lint the touched surfaces**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
npx jest server/__tests__/utils/observability/audit.test.js server/__tests__/models/conversationFlags.test.js --runInBand
yarn lint:ci
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/utils/observability/audit.js server/__tests__/utils/observability/audit.test.js server/models/eventLogs.js server/endpoints/billing.js server/endpoints/betterAuthBridge.js server/models/documents.js server/models/conversationFlags.js server/endpoints/utils.js frontend/src/pages/GeneralSettings/Chats/index.jsx
git commit -m "feat: add structured audit events for beta ops"
```

### Task 8: Add CI Gates, Release Docs, And Governance Docs

**Files:**
- Modify: `.github/workflows/run-tests.yaml`
- Create: `docs/production-readiness.md`
- Create: `docs/release-process.md`
- Create: `docs/privacy-policy.md`
- Create: `docs/data-retention.md`
- Create: `docs/incident-response.md`
- Create: `docs/ai-intended-use.md`
- Create: `docs/subprocessors.md`

- [ ] **Step 1: Write the failing verification script**

```python
from pathlib import Path
import unittest


class GovernanceDocsTests(unittest.TestCase):
    def test_required_docs_exist(self):
        required = [
            "docs/production-readiness.md",
            "docs/release-process.md",
            "docs/privacy-policy.md",
            "docs/data-retention.md",
            "docs/incident-response.md",
            "docs/ai-intended-use.md",
            "docs/subprocessors.md",
        ]
        missing = [path for path in required if not Path(path).exists()]
        self.assertEqual(missing, [])


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the verification script to confirm it fails**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 - <<'PY'
from pathlib import Path
required = [
    "docs/production-readiness.md",
    "docs/release-process.md",
    "docs/privacy-policy.md",
    "docs/data-retention.md",
    "docs/incident-response.md",
    "docs/ai-intended-use.md",
    "docs/subprocessors.md",
]
missing = [path for path in required if not Path(path).exists()]
assert not missing, missing
PY
```

Expected: FAIL with the missing file list.

- [ ] **Step 3: Extend CI to run the hardening gates**

```yaml
- name: Run lint
  run: yarn lint:ci

- name: Run unit tests
  run: yarn test:unit

- name: Run integration tests
  run: yarn test:integration

- name: Build frontend
  run: cd frontend && yarn build

- name: Validate corpus tooling
  run: python3 -m unittest ops.corpus.tests.test_manifest_schema -v

- name: Validate deploy scripts
  run: python3 -m unittest deploy.hetzner.tests.test_verify_stripe_webhook -v
```

- [ ] **Step 4: Add the release and governance docs**

```md
# Release Process

1. Merge only green commits into `main`.
2. Run `yarn lint:ci`, `yarn test:unit`, `yarn test:integration`, `cd frontend && yarn build`.
3. Run `bash deploy/hetzner/scripts/preflight.sh`.
4. Run `bash deploy/hetzner/scripts/rollout.sh`.
5. Run `bash deploy/hetzner/scripts/smoke.sh`.
6. Record Git SHA, migration IDs, and rollback target in the release log.
```

```md
# AI Intended Use

Lovora is a source-grounded Norwegian legal research and explanation assistant.
Lovora is not an autonomous legal adviser.
Lovora must refuse or clearly caveat unsupported, out-of-corpus, or high-ambiguity requests in query mode.
```

- [ ] **Step 5: Run the verification script, then the CI workflow locally**

Run:

```bash
cd /Users/andreas/fun/lovora/lovora
python3 - <<'PY'
from pathlib import Path
required = [
    "docs/production-readiness.md",
    "docs/release-process.md",
    "docs/privacy-policy.md",
    "docs/data-retention.md",
    "docs/incident-response.md",
    "docs/ai-intended-use.md",
    "docs/subprocessors.md",
]
missing = [path for path in required if not Path(path).exists()]
assert not missing, missing
print("docs ok")
PY
yarn lint:ci
```

Expected: `docs ok`, then a clean lint run.

- [ ] **Step 6: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add .github/workflows/run-tests.yaml docs/production-readiness.md docs/release-process.md docs/privacy-policy.md docs/data-retention.md docs/incident-response.md docs/ai-intended-use.md docs/subprocessors.md
git commit -m "docs: add beta release and governance gates"
```

## Self-Review

**Spec coverage**
- Covered: canonical deploy path, repo boundary, backup/restore/runbooks, split runtime services, SQLite guardrails, billing idempotency, reconciliation, deterministic entitlement logic, billing UX, corpus versioning, retrieval evals, answer metadata, observability, moderation review, CI gates, privacy/governance docs.
- Intentionally deferred: full PostgreSQL cutover, queue-backed ingestion for all upload paths, public incident/status page, enterprise controls, org accounts, SSO.

**Placeholder scan**
- No `TODO`, `TBD`, or "similar to Task N" placeholders remain.
- Every task has exact file paths, runnable commands, and code snippets.

**Type consistency**
- Billing access logic uses `buildAccessDecision`.
- Stripe event ledger uses `stripe_webhook_events` and `StripeWebhookEvent`.
- Corpus version model uses `corpus_releases` and `CorpusRelease`.


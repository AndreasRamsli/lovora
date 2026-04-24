# Chat Privacy Gauntlet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full chat privacy gauntlet so Lovora can prove, in CI and staging, that raw chat content never crosses user, delegated-user, API-session, admin, management, logging, migration, or UI boundaries.

**Architecture:** Implement the gauntlet in layered phases. First, expand the test harness into a full privacy fixture with seeded canaries, actor matrices, and reusable scanners; next, lock down runtime policy boundaries with typed principals, request security context, route metadata, and control-plane response guards; finally, add the full static, integration, adversarial, migration, streaming, UI, and staging suites plus report generation. Keep the core rule simple throughout: all scanners treat canary appearance outside the actor’s allowlist as a failure.

**Tech Stack:** Node.js, Express, Prisma with SQLite, Jest, Supertest, Playwright, Bash, CommonJS modules

---

## File Structure

- Modify: `package.json`
  - Adds privacy-specific scripts for static, unit, integration, adversarial, migration, e2e, logs, and all-in-one runs.
- Modify: `server/test-support/securityHarness.js`
  - Seeds the full actor matrix, canaries, legacy residue, delegated tokens, and API-session fixtures; exposes logs and scanner helpers to tests.
- Modify: `server/test-support/privacy/canaries.js`
  - Generates deterministic canaries per seed run and exposes grouped canary lists for user, delegated, admin-own, API-session, migration, and error-path content.
- Modify: `server/test-support/privacy/actors.js`
  - Builds the fixed actor matrix with headers, scopes, and `allowedCanaries`.
- Modify: `server/test-support/privacy/scanner.js`
  - Normalizes HTTP, SSE, header, redirect, and file responses and asserts forbidden-canary absence.
- Create: `server/test-support/privacy/requestVariants.js`
  - Builds path, query, body, header, and malformed-request variants from a route spec.
- Create: `server/test-support/privacy/routeSpecs.js`
  - Defines the full sensitive route inventory and the expected privacy policy for each route.
- Create: `server/test-support/privacy/logCollector.js`
  - Captures server-side console/logger output during tests without changing production logging.
- Create: `server/test-support/privacy/dbScanner.js`
  - Scans metadata tables for forbidden canaries and allowlists content tables.
- Create: `server/test-support/privacy/sse.js`
  - Reads SSE bodies/chunks and exposes normalized output for canary assertions.
- Create: `server/test-support/privacy/expressRoutes.js`
  - Introspects the Express router stack to compare registered routes with declared policy metadata.
- Create: `server/test-support/privacy/legacyFixtures.js`
  - Seeds dirty legacy rows for migration and quarantine testing.
- Modify: `server/utils/auth/principals.js`
  - Resolves user, delegated user, management, and workspace-service principals; owns the core read/write policy helpers.
- Create: `server/utils/privacy/requestSecurityContext.js`
  - Builds per-request security context objects for repositories and response guards.
- Create: `server/utils/privacy/routePolicy.js`
  - Registers route metadata (`routeId`, `plane`, `category`, `responsePolicy`) and attaches it to `response.locals`.
- Create: `server/utils/privacy/controlPlaneResponseGuard.js`
  - Blocks control-plane responses that serialize forbidden fields when strict mode is enabled.
- Create: `server/utils/privacy/safeErrorPayload.js`
  - Normalizes error output into request-id-based, content-free payloads.
- Create: `server/middleware/privacyErrorHandler.js`
  - Final Express error middleware that strips content from errors before serialization.
- Modify: `server/repositories/chatContentRepository.js`
  - Requires a content-plane `RequestSecurityContext` and rejects non-content principals.
- Modify: `server/repositories/chatMetadataRepository.js`
  - Accepts request context for auditability while remaining metadata-only.
- Modify: `server/endpoints/system.js`
  - Attaches route policy metadata and control-plane response guards to system/flag routes.
- Modify: `server/endpoints/admin.js`
  - Attaches route policy metadata and response guards to admin routes.
- Modify: `server/endpoints/workspaces.js`
  - Attaches content-plane policy metadata to workspace history routes.
- Modify: `server/endpoints/workspaceThreads.js`
  - Attaches content-plane policy metadata to thread history routes.
- Modify: `server/endpoints/chat.js`
  - Applies content-plane policy metadata and safe error handling to streaming/chat routes.
- Modify: `server/endpoints/document.js`
  - Applies safe error handling so document failures never echo content.
- Modify: `server/endpoints/api/admin/index.js`
  - Adds route policy metadata and control-plane response guards to API-admin routes.
- Modify: `server/endpoints/api/system/index.js`
  - Adds route policy metadata and control-plane response guards to API-system routes.
- Modify: `server/endpoints/api/userManagement/index.js`
  - Adds route policy metadata to delegated-token and management routes.
- Modify: `server/endpoints/api/workspace/index.js`
  - Adds content-plane route policy metadata to workspace API history/chat routes.
- Modify: `server/endpoints/api/workspaceThread/index.js`
  - Adds content-plane route policy metadata to thread API chat/stream routes.
- Modify: `server/app.js`
  - Mounts the privacy error handler after all routes and keeps route registration introspectable.
- Create: `server/scripts/privacy/scanForbiddenImports.js`
  - Static scanner for control-plane imports of content-plane repositories.
- Create: `server/scripts/privacy/scanForbiddenSelects.js`
  - Static scanner for control-plane Prisma selects/includes of content-like fields.
- Create: `server/scripts/privacy/scanRoutePolicies.js`
  - Checks that every registered Express route has route policy metadata.
- Create: `server/scripts/privacy/scanLogs.js`
  - Scans captured logs or staging log files for canary leaks.
- Create: `server/scripts/privacy/scanDbMetadata.js`
  - Scans metadata tables and emits JSON findings.
- Create: `server/scripts/privacy/generatePrivacyReport.js`
  - Aggregates run artifacts into `privacy-report.json` and `privacy-report.md`.
- Create: `server/scripts/privacy/runConcurrencyScenario.js`
  - Drives revocation, scope-change, and cache-isolation concurrency checks.
- Create: `server/__tests__/privacy/static/forbiddenImports.test.js`
  - Locks control-plane import boundaries.
- Create: `server/__tests__/privacy/static/forbiddenPrismaSelects.test.js`
  - Locks metadata DTO/select boundaries.
- Create: `server/__tests__/privacy/static/routeInventory.test.js`
  - Fails when a route is missing `routeId`, category, plane, or response policy.
- Create: `server/__tests__/privacy/unit/principalResolution.test.js`
  - Covers session, delegated, management, workspace-service, revoked, expired, and malformed principal resolution.
- Create: `server/__tests__/privacy/unit/canReadChatContent.test.js`
  - Covers the exhaustive principal/resource access matrix.
- Create: `server/__tests__/privacy/unit/apiKeyScopes.test.js`
  - Covers management/workspace-service key scope behavior.
- Create: `server/__tests__/privacy/unit/repositoryBoundary.test.js`
  - Proves `ChatContentRepository` rejects control-plane access.
- Create: `server/__tests__/privacy/unit/dtoShapes.test.js`
  - Validates control-plane DTOs contain metadata only.
- Create: `server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js`
  - Verifies runtime response guard behavior in strict mode.
- Create: `server/__tests__/privacy/integration/userIsolation.test.js`
  - Scans user/content routes against the full actor matrix.
- Create: `server/__tests__/privacy/integration/adminMetadataOnly.test.js`
  - Scans admin/control routes for forbidden canaries.
- Create: `server/__tests__/privacy/integration/managementApiPrivacy.test.js`
  - Proves management keys remain metadata-only.
- Create: `server/__tests__/privacy/integration/workspaceServiceIsolation.test.js`
  - Proves workspace-service keys stay inside their API-session partition.
- Create: `server/__tests__/privacy/integration/delegatedTokenPrivacy.test.js`
  - Proves delegated tokens stay within their subject and scope.
- Create: `server/__tests__/privacy/integration/flagReviewPrivacy.test.js`
  - Proves moderation endpoints and DB rows are metadata-only.
- Create: `server/__tests__/privacy/integration/errorPathPrivacy.test.js`
  - Proves validation/provider/document failures are content-free.
- Create: `server/__tests__/privacy/integration/streamingPrivacy.test.js`
  - Proves SSE routes authorize before streaming and never leak forbidden canaries.
- Create: `server/__tests__/privacy/adversarial/userIdInjection.test.js`
  - Fuzzes `userId` and impersonation parameters.
- Create: `server/__tests__/privacy/adversarial/includeExpandFuzz.test.js`
  - Fuzzes `include`, `expand`, `fields`, and debug/admin toggles.
- Create: `server/__tests__/privacy/adversarial/methodFuzz.test.js`
  - Fuzzes unsupported HTTP methods.
- Create: `server/__tests__/privacy/adversarial/pathFuzz.test.js`
  - Fuzzes slashes, traversal, case changes, slug mismatches, and malformed IDs.
- Create: `server/__tests__/privacy/adversarial/jsonShapeFuzz.test.js`
  - Fuzzes malformed JSON/body shapes.
- Create: `server/__tests__/privacy/migration/migrationPrivacy.test.js`
  - Seeds dirty legacy rows, runs migrations/sanitizers, and scans DB/API output afterward.
- Create: `frontend/e2e/admin-ui-privacy.spec.js`
  - Proves admin UI DOM/network/storage never includes user content canaries.
- Create: `frontend/e2e/user-ui-isolation.spec.js`
  - Proves a user sees only their own content in UI and failed API calls.
- Modify: `frontend/src/pages/GeneralSettings/Chats/index.jsx`
  - Adds stable `data-testid` hooks for moderation queue assertions.
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/index.jsx`
  - Adds stable `data-testid` hooks for management/workspace-service key assertions.
- Modify: `frontend/src/pages/WorkspaceChat/index.jsx`
  - Adds stable `data-testid` hooks for user chat isolation assertions.
- Create: `ops/privacy/run-staging-privacy-gauntlet.sh`
  - Resets staging, seeds fixtures, runs all privacy layers, scans logs/DB, and writes artifacts.
- Create: `docs/privacy/chat-privacy-incident-playbook.md`
  - Documents containment, investigation, recovery, and verification steps for privacy incidents.

Keep this plan narrow:
- Do not redesign unrelated auth flows.
- Do not replace the current test runner stack.
- Do not create a second moderation model.
- Do not serialize raw Prisma rows directly from control-plane routes.
- Do not log request bodies, response bodies, tokens, cookies, or API keys.

### Task 1: Expand The Privacy Fixture Foundation

**Files:**
- Modify: `server/test-support/securityHarness.js`
- Modify: `server/test-support/privacy/canaries.js`
- Modify: `server/test-support/privacy/actors.js`
- Modify: `server/test-support/privacy/scanner.js`
- Create: `server/test-support/privacy/requestVariants.js`
- Create: `server/test-support/privacy/logCollector.js`
- Create: `server/test-support/privacy/dbScanner.js`
- Create: `server/test-support/privacy/legacyFixtures.js`
- Test: `server/__tests__/privacy/integration/gauntletFoundation.test.js`

- [ ] **Step 1: Write the failing fixture-foundation test**

Create `server/__tests__/privacy/integration/gauntletFoundation.test.js`:

```js
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const {
  assertNoForbiddenCanaries,
  assertResponseContainsAllowedCanaries,
} = require("../../test-support/privacy/scanner");
const { assertMetadataTablesDoNotContainCanaries } = require("../../test-support/privacy/dbScanner");

describe("privacy gauntlet foundation", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness({ captureLogs: true });
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("seeded actors and scanners enforce canary boundaries", async () => {
    const { app, prisma, fixtures, actors } = harness;

    const aliceHistory = await request(app)
      .get(`/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`)
      .set(actors.aliceUser.headers);

    expect(aliceHistory.status).toBe(200);
    assertResponseContainsAllowedCanaries({
      actor: actors.aliceUser,
      response: aliceHistory,
      expectedCanaries: [
        fixtures.canaries.alicePrompt,
        fixtures.canaries.aliceResponse,
      ],
    });

    const adminFlags = await request(app)
      .post("/api/system/conversation-flags")
      .set(actors.adminUser.headers)
      .send({ offset: 0, limit: 20, status: "open" });

    expect(adminFlags.status).toBe(200);
    assertNoForbiddenCanaries({
      actor: actors.adminUser,
      response: adminFlags,
      canaries: fixtures.canaries,
    });

    await assertMetadataTablesDoNotContainCanaries({
      prisma,
      canaries: fixtures.canaries,
      tables: ["conversation_flags", "event_logs"],
    });
  });
});
```

- [ ] **Step 2: Run the new foundation test to verify it fails**

Run:

```bash
npx jest server/__tests__/privacy/integration/gauntletFoundation.test.js --runInBand
```

Expected: FAIL because `createSecurityHarness()` does not yet seed `aliceUser`, `bobUser`, delegated tokens, legacy rows, or the DB/log scanner helpers.

- [ ] **Step 3: Implement the full privacy fixture foundation**

Update `server/test-support/privacy/canaries.js`:

```js
const crypto = require("crypto");

function suffix() {
  return crypto.randomBytes(3).toString("hex");
}

function createPrivacyCanaries() {
  return {
    alicePrompt: `LOVORA_CANARY_ALICE_PROMPT_${suffix()}`,
    aliceResponse: `LOVORA_CANARY_ALICE_RESPONSE_${suffix()}`,
    bobPrompt: `LOVORA_CANARY_BOB_PROMPT_${suffix()}`,
    bobResponse: `LOVORA_CANARY_BOB_RESPONSE_${suffix()}`,
    charliePrompt: `LOVORA_CANARY_CHARLIE_PROMPT_${suffix()}`,
    adminOwnPrompt: `LOVORA_CANARY_ADMIN_OWN_CHAT_${suffix()}`,
    apiSessionA: `LOVORA_CANARY_API_SESSION_A_${suffix()}`,
    apiSessionB: `LOVORA_CANARY_API_SESSION_B_${suffix()}`,
    apiSessionC: `LOVORA_CANARY_API_SESSION_C_${suffix()}`,
    flaggedRawText: `LOVORA_CANARY_FLAGGED_RAW_TEXT_${suffix()}`,
    attachmentFilename: `LOVORA_CANARY_ATTACHMENT_FILENAME_${suffix()}.txt`,
    attachmentText: `LOVORA_CANARY_ATTACHMENT_TEXT_${suffix()}`,
    threadTitle: `LOVORA_CANARY_THREAD_TITLE_${suffix()}`,
    retrievedSnippet: `LOVORA_CANARY_RETRIEVED_SNIPPET_${suffix()}`,
    reviewNoteLeak: `LOVORA_CANARY_REVIEW_NOTE_${suffix()}`,
  };
}

function listPrivacyCanaries(canaries = {}) {
  return Object.values(canaries).filter(Boolean);
}

module.exports = {
  createPrivacyCanaries,
  listPrivacyCanaries,
};
```

Create `server/test-support/privacy/logCollector.js`:

```js
function createLogCollector() {
  const entries = [];
  const methods = ["log", "warn", "error"];
  const originals = new Map();

  function start() {
    for (const method of methods) {
      originals.set(method, console[method]);
      console[method] = (...args) => {
        entries.push(
          args
            .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
            .join(" ")
        );
        return originals.get(method)(...args);
      };
    }
  }

  function stop() {
    for (const method of methods) {
      if (originals.has(method)) console[method] = originals.get(method);
    }
  }

  return {
    start,
    stop,
    read: () => entries.join("\n"),
  };
}

module.exports = { createLogCollector };
```

Create `server/test-support/privacy/dbScanner.js`:

```js
const { listPrivacyCanaries } = require("./canaries");

async function assertMetadataTablesDoNotContainCanaries({
  prisma,
  canaries,
  tables = [],
}) {
  const needleList = listPrivacyCanaries(canaries);

  for (const table of tables) {
    const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`);
    const serialized = JSON.stringify(rows);

    for (const canary of needleList) {
      expect(serialized).not.toContain(canary);
    }
  }
}

module.exports = {
  assertMetadataTablesDoNotContainCanaries,
};
```

Update `server/test-support/securityHarness.js` so `seedFixtures()` creates:

```js
const workspaceLegalAlpha = await prisma.workspaces.create({
  data: { name: "workspace_legal_alpha", slug: "workspace-legal-alpha", chatMode: "chat", openAiHistory: 20 },
});
const workspaceLegalBeta = await prisma.workspaces.create({
  data: { name: "workspace_legal_beta", slug: "workspace-legal-beta", chatMode: "chat", openAiHistory: 20 },
});

const [alice, bob, charlie, admin, manager, suspended, deletedUser] = await Promise.all([
  prisma.users.create({ data: { username: "alice-user", password: "password", role: "default" } }),
  prisma.users.create({ data: { username: "bob-user", password: "password", role: "default" } }),
  prisma.users.create({ data: { username: "charlie-user", password: "password", role: "default" } }),
  prisma.users.create({ data: { username: "admin-user", password: "password", role: "admin" } }),
  prisma.users.create({ data: { username: "manager-user", password: "password", role: "manager" } }),
  prisma.users.create({ data: { username: "suspended-user", password: "password", role: "default", suspended: 1 } }),
  prisma.users.create({ data: { username: "deleted-user", password: "password", role: "default" } }),
]);

const aliceThread = await prisma.workspace_threads.create({
  data: {
    name: canaries.threadTitle,
    slug: "alice-thread-a1",
    workspace_id: workspaceLegalAlpha.id,
    user_id: alice.id,
  },
});

await prisma.workspace_chats.create({
  data: {
    workspaceId: workspaceLegalAlpha.id,
    user_id: alice.id,
    prompt: canaries.alicePrompt,
    response: JSON.stringify({
      text: canaries.aliceResponse,
      attachments: [{ name: canaries.attachmentFilename, mime: "text/plain", contentString: canaries.attachmentText }],
      sources: [{ source: canaries.retrievedSnippet }],
    }),
    include: true,
  },
});
```

Return full fixture shape:

```js
return {
  fixtures: {
    canaries,
    users: { alice, bob, charlie, admin, manager, suspended, deletedUser },
    workspaces: { workspaceLegalAlpha, workspaceLegalBeta },
    delegatedTokens: {
      aliceRead: `Bearer ${makeJWT({ id: alice.id, username: alice.username, delegated: true, scope: "read" })}`,
      aliceWrite: `Bearer ${makeJWT({ id: alice.id, username: alice.username, delegated: true, scope: "write" })}`,
    },
  },
  actors: createPrivacyActors(fixtures),
  logCollector,
};
```

- [ ] **Step 4: Re-run the foundation test**

Run:

```bash
npx jest server/__tests__/privacy/integration/gauntletFoundation.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/integration/gauntletFoundation.test.js
  privacy gauntlet foundation
    ✓ seeded actors and scanners enforce canary boundaries
```

- [ ] **Step 5: Commit the fixture foundation**

```bash
git add server/test-support/securityHarness.js server/test-support/privacy/canaries.js server/test-support/privacy/actors.js server/test-support/privacy/scanner.js server/test-support/privacy/requestVariants.js server/test-support/privacy/logCollector.js server/test-support/privacy/dbScanner.js server/test-support/privacy/legacyFixtures.js server/__tests__/privacy/integration/gauntletFoundation.test.js
git commit -m "test: add privacy gauntlet fixture foundation"
```

### Task 2: Lock Principal Resolution And Repository Boundaries

**Files:**
- Modify: `server/utils/auth/principals.js`
- Create: `server/utils/privacy/requestSecurityContext.js`
- Modify: `server/repositories/chatContentRepository.js`
- Modify: `server/repositories/chatMetadataRepository.js`
- Test: `server/__tests__/privacy/unit/principalResolution.test.js`
- Test: `server/__tests__/privacy/unit/canReadChatContent.test.js`
- Test: `server/__tests__/privacy/unit/apiKeyScopes.test.js`
- Test: `server/__tests__/privacy/unit/repositoryBoundary.test.js`

- [ ] **Step 1: Write the failing principal and repository tests**

Create `server/__tests__/privacy/unit/principalResolution.test.js`:

```js
const {
  resolveSessionPrincipal,
  resolveApiKeyPrincipal,
  canReadChatContent,
  principalCan,
} = require("../../../utils/auth/principals");

describe("privacy principal resolution", () => {
  test("resolves delegated, management, and workspace-service principals distinctly", () => {
    const delegated = resolveSessionPrincipal({ id: 1, role: "default", delegated: true, delegatedScope: "read" });
    const management = resolveApiKeyPrincipal({ id: 10, principalType: "management", scopes: JSON.stringify(["management:users:read"]) });
    const workspaceService = resolveApiKeyPrincipal({ id: 11, principalType: "workspace_service", workspaceId: 7, scopes: JSON.stringify(["workspace:api_sessions:read"]) });

    expect(delegated.kind).toBe("delegated_user");
    expect(management.kind).toBe("management");
    expect(workspaceService.kind).toBe("workspace_service");
    expect(principalCan(management, "management:users:read")).toBe(true);
    expect(principalCan(workspaceService, "workspace:api_sessions:read")).toBe(true);
  });

  test.each([
    ["alice user on alice resource", { kind: "user", userId: 1 }, { ownerUserId: 1, workspaceId: 10, apiSessionId: null }, true],
    ["alice user on bob resource", { kind: "user", userId: 1 }, { ownerUserId: 2, workspaceId: 10, apiSessionId: null }, false],
    ["admin on alice resource", { kind: "user", userId: 9, roles: ["admin"] }, { ownerUserId: 1, workspaceId: 10, apiSessionId: null }, false],
    ["workspace service on api session a", { kind: "workspace_service", workspaceId: 10, scopes: ["workspace:api_sessions:read"] }, { ownerUserId: null, workspaceId: 10, apiSessionId: "api_sess_A" }, true],
  ])("%s", (_label, principal, resource, expected) => {
    expect(canReadChatContent(principal, resource)).toBe(expected);
  });
});
```

Create `server/__tests__/privacy/unit/repositoryBoundary.test.js`:

```js
const { ChatContentRepository } = require("../../../repositories/chatContentRepository");

describe("chat content repository boundary", () => {
  test("rejects control-plane request contexts", async () => {
    await expect(
      ChatContentRepository.listThreadHistory(
        {
          requestId: "req_1",
          plane: "control",
          routeId: "admin.flags.list",
          principal: { kind: "management", scopes: ["management:users:read"] },
        },
        10,
        5
      )
    ).rejects.toMatchObject({ status: 403 });
  });
});
```

- [ ] **Step 2: Run the new unit tests to verify they fail**

Run:

```bash
npx jest server/__tests__/privacy/unit/principalResolution.test.js server/__tests__/privacy/unit/repositoryBoundary.test.js --runInBand
```

Expected: FAIL because `resolveSessionPrincipal()` does not yet create `delegated_user`, `canReadChatContent()` does not distinguish admin vs owner, and `ChatContentRepository` still accepts raw principals instead of request contexts.

- [ ] **Step 3: Implement typed principal and request-context enforcement**

Create `server/utils/privacy/requestSecurityContext.js`:

```js
function createRequestSecurityContext({
  requestId = null,
  routeId = "unknown.route",
  plane = "control",
  principal = null,
} = {}) {
  return {
    requestId,
    routeId,
    plane,
    principal,
  };
}

function assertContentPlane(ctx = null) {
  if (!ctx || ctx.plane !== "content") {
    const error = new Error("Control-plane route attempted to access chat content.");
    error.status = 403;
    throw error;
  }
}

module.exports = {
  createRequestSecurityContext,
  assertContentPlane,
};
```

Update `server/utils/auth/principals.js`:

```js
function resolveSessionPrincipal(user = null) {
  if (!user?.id) return null;

  if (user.delegated) {
    return {
      kind: "delegated_user",
      userId: Number(user.id),
      delegatedScope: String(user.delegatedScope || "read"),
      roles: [],
    };
  }

  return {
    kind: "user",
    userId: Number(user.id),
    roles: user.role ? [String(user.role)] : [],
  };
}

function resolveApiKeyPrincipal(apiKey = null) {
  if (!apiKey?.id) return null;
  const scopes = JSON.parse(apiKey.scopes || "[]");

  if (apiKey.principalType === "workspace_service") {
    return {
      kind: "workspace_service",
      apiKeyId: Number(apiKey.id),
      workspaceId: Number(apiKey.workspaceId),
      scopes,
    };
  }

  return {
    kind: "management",
    apiKeyId: Number(apiKey.id),
    scopes,
  };
}

function canReadChatContent(principal = null, resource = {}) {
  if (!principal || !resource) return false;

  if (principal.kind === "user") {
    return Number(resource.ownerUserId) === Number(principal.userId) && !resource.apiSessionId;
  }

  if (principal.kind === "delegated_user") {
    return Number(resource.ownerUserId) === Number(principal.userId) && !resource.apiSessionId;
  }

  if (principal.kind === "workspace_service") {
    return (
      Number(resource.workspaceId) === Number(principal.workspaceId) &&
      !!resource.apiSessionId &&
      principal.scopes.includes("workspace:api_sessions:read")
    );
  }

  return false;
}
```

Update `server/repositories/chatContentRepository.js`:

```js
const { WorkspaceChats } = require("../models/workspaceChats");
const { canReadChatContent } = require("../utils/auth/principals");
const { assertContentPlane } = require("../utils/privacy/requestSecurityContext");

function forbiddenError(message = "Forbidden") {
  const error = new Error(message);
  error.status = 403;
  return error;
}

const ChatContentRepository = {
  async listThreadHistory(ctx, workspaceId, threadId, resource) {
    assertContentPlane(ctx);
    if (!canReadChatContent(ctx.principal, resource)) {
      throw forbiddenError();
    }

    return WorkspaceChats.where(
      {
        workspaceId,
        thread_id: threadId,
        user_id: resource.ownerUserId || null,
        api_session_id: resource.apiSessionId || null,
        include: true,
      },
      null,
      { id: "asc" }
    );
  },
};

module.exports = { ChatContentRepository };
```

- [ ] **Step 4: Re-run the unit suite**

Run:

```bash
npx jest server/__tests__/privacy/unit/principalResolution.test.js server/__tests__/privacy/unit/canReadChatContent.test.js server/__tests__/privacy/unit/apiKeyScopes.test.js server/__tests__/privacy/unit/repositoryBoundary.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/unit/principalResolution.test.js
PASS server/__tests__/privacy/unit/canReadChatContent.test.js
PASS server/__tests__/privacy/unit/apiKeyScopes.test.js
PASS server/__tests__/privacy/unit/repositoryBoundary.test.js
```

- [ ] **Step 5: Commit the policy core**

```bash
git add server/utils/auth/principals.js server/utils/privacy/requestSecurityContext.js server/repositories/chatContentRepository.js server/repositories/chatMetadataRepository.js server/__tests__/privacy/unit/principalResolution.test.js server/__tests__/privacy/unit/canReadChatContent.test.js server/__tests__/privacy/unit/apiKeyScopes.test.js server/__tests__/privacy/unit/repositoryBoundary.test.js
git commit -m "test: lock privacy principal and repository boundaries"
```

### Task 3: Register Route Policy Metadata And Runtime Response Guards

**Files:**
- Create: `server/utils/privacy/routePolicy.js`
- Create: `server/utils/privacy/controlPlaneResponseGuard.js`
- Create: `server/test-support/privacy/expressRoutes.js`
- Modify: `server/endpoints/system.js`
- Modify: `server/endpoints/admin.js`
- Modify: `server/endpoints/workspaces.js`
- Modify: `server/endpoints/workspaceThreads.js`
- Modify: `server/endpoints/chat.js`
- Modify: `server/endpoints/document.js`
- Modify: `server/endpoints/api/admin/index.js`
- Modify: `server/endpoints/api/system/index.js`
- Modify: `server/endpoints/api/userManagement/index.js`
- Modify: `server/endpoints/api/workspace/index.js`
- Modify: `server/endpoints/api/workspaceThread/index.js`
- Modify: `server/app.js`
- Test: `server/__tests__/privacy/static/routeInventory.test.js`
- Test: `server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js`

- [ ] **Step 1: Write the failing route-inventory and response-guard tests**

Create `server/__tests__/privacy/static/routeInventory.test.js`:

```js
const { createApp } = require("../../../app");
const { getDeclaredRoutePolicies } = require("../../../utils/privacy/routePolicy");
const { listExpressRoutes } = require("../../../test-support/privacy/expressRoutes");

describe("route inventory coverage", () => {
  test("every registered route has route policy metadata", () => {
    const app = createApp({ enableWebSockets: false });
    const routes = listExpressRoutes(app);
    const policies = getDeclaredRoutePolicies();

    for (const route of routes) {
      expect(
        policies.find((policy) => policy.method === route.method && policy.path === route.path)
      ).toEqual(
        expect.objectContaining({
          routeId: expect.any(String),
          plane: expect.stringMatching(/^(content|control)$/),
          category: expect.any(String),
          responsePolicy: expect.any(String),
        })
      );
    }
  });
});
```

Create `server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js`:

```js
const { assertControlPlaneResponseSafe } = require("../../../utils/privacy/controlPlaneResponseGuard");

describe("control-plane response guard", () => {
  test("throws when a forbidden key is serialized", () => {
    expect(() =>
      assertControlPlaneResponseSafe({
        id: 1,
        review: { prompt: "LOVORA_CANARY_SHOULD_NOT_LEAK" },
      })
    ).toThrow("Forbidden key");
  });
});
```

- [ ] **Step 2: Run the static/unit tests to verify they fail**

Run:

```bash
npx jest server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js --runInBand
```

Expected: FAIL because route policy helpers do not exist yet and no routes are registered with route metadata.

- [ ] **Step 3: Implement route policy registration and response guards**

Create `server/utils/privacy/routePolicy.js`:

```js
const declaredPolicies = [];

function withRoutePolicy(policy, ...handlers) {
  declaredPolicies.push(policy);

  return [
    function attachRoutePolicy(_request, response, next) {
      response.locals.routePolicy = policy;
      response.locals.securityContext = {
        requestId: response.getHeader("X-Lovora-Request-Id") || null,
        routeId: policy.routeId,
        plane: policy.plane,
        principal: response.locals.principal || null,
      };
      next();
    },
    ...handlers,
  ];
}

function getDeclaredRoutePolicies() {
  return [...declaredPolicies];
}

module.exports = {
  withRoutePolicy,
  getDeclaredRoutePolicies,
};
```

Create `server/utils/privacy/controlPlaneResponseGuard.js`:

```js
const FORBIDDEN_KEYS = [
  "prompt",
  "response",
  "content",
  "rawContent",
  "messageText",
  "completion",
  "transcript",
  "snippet",
  "filename",
  "threadTitle",
];

function deepKeys(input, prefix = "") {
  if (!input || typeof input !== "object") return [];
  return Object.entries(input).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return [fullKey, ...deepKeys(value, fullKey)];
  });
}

function assertControlPlaneResponseSafe(body = {}) {
  const keys = deepKeys(body);
  for (const key of keys) {
    const leaf = key.split(".").pop();
    if (FORBIDDEN_KEYS.includes(leaf)) {
      throw new Error(`Forbidden key in control-plane response: ${leaf}`);
    }
  }
}

module.exports = {
  FORBIDDEN_KEYS,
  assertControlPlaneResponseSafe,
};
```

Apply the helper pattern in `server/endpoints/system.js`:

```js
const { withRoutePolicy } = require("../utils/privacy/routePolicy");
const { assertControlPlaneResponseSafe } = require("../utils/privacy/controlPlaneResponseGuard");

router.post(
  "/system/conversation-flags",
  ...withRoutePolicy(
    {
      method: "POST",
      path: "/system/conversation-flags",
      routeId: "system.flags.list",
      plane: "control",
      category: "moderation",
      responsePolicy: "metadata_only",
    },
    validatedRequest,
    async (request, response) => {
      const flags = await ChatMetadataRepository.listReviewCases({ status: "open" });
      const payload = { flags };
      assertControlPlaneResponseSafe(payload);
      response.status(200).json(payload);
    }
  )
);
```

- [ ] **Step 4: Re-run the route metadata tests**

Run:

```bash
npx jest server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/static/routeInventory.test.js
PASS server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js
```

- [ ] **Step 5: Commit the route metadata layer**

```bash
git add server/utils/privacy/routePolicy.js server/utils/privacy/controlPlaneResponseGuard.js server/test-support/privacy/expressRoutes.js server/endpoints/system.js server/endpoints/admin.js server/endpoints/workspaces.js server/endpoints/workspaceThreads.js server/endpoints/chat.js server/endpoints/document.js server/endpoints/api/admin/index.js server/endpoints/api/system/index.js server/endpoints/api/userManagement/index.js server/endpoints/api/workspace/index.js server/endpoints/api/workspaceThread/index.js server/app.js server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/unit/controlPlaneResponseGuard.test.js
git commit -m "test: register privacy route policies and response guards"
```

### Task 4: Add Static Boundary Scanners For Imports, Selects, And DTOs

**Files:**
- Create: `server/scripts/privacy/scanForbiddenImports.js`
- Create: `server/scripts/privacy/scanForbiddenSelects.js`
- Create: `server/__tests__/privacy/static/forbiddenImports.test.js`
- Create: `server/__tests__/privacy/static/forbiddenPrismaSelects.test.js`
- Create: `server/__tests__/privacy/unit/dtoShapes.test.js`

- [ ] **Step 1: Write the failing static scanner tests**

Create `server/__tests__/privacy/static/forbiddenImports.test.js`:

```js
const { scanForbiddenImports } = require("../../../scripts/privacy/scanForbiddenImports");

describe("forbidden imports", () => {
  test("control-plane code does not import ChatContentRepository", async () => {
    const findings = await scanForbiddenImports();
    expect(findings).toEqual([]);
  });
});
```

Create `server/__tests__/privacy/static/forbiddenPrismaSelects.test.js`:

```js
const { scanForbiddenSelects } = require("../../../scripts/privacy/scanForbiddenSelects");

describe("forbidden selects", () => {
  test("control-plane code does not select or include content fields", async () => {
    const findings = await scanForbiddenSelects();
    expect(findings).toEqual([]);
  });
});
```

Create `server/__tests__/privacy/unit/dtoShapes.test.js`:

```js
const { ChatMetadataRepository } = require("../../../repositories/chatMetadataRepository");

describe("metadata DTOs", () => {
  test("flag DTOs contain only metadata keys", async () => {
    const dto = await ChatMetadataRepository.__testBuildFlagDto({
      id: 1,
      riskLevel: "review",
      categories: ["prompt_injection"],
      prompt: "should not survive",
    });

    expect(dto).toEqual({
      id: 1,
      riskLevel: "review",
      categories: ["prompt_injection"],
    });
  });
});
```

- [ ] **Step 2: Run the scanners to verify they fail**

Run:

```bash
npx jest server/__tests__/privacy/static/forbiddenImports.test.js server/__tests__/privacy/static/forbiddenPrismaSelects.test.js server/__tests__/privacy/unit/dtoShapes.test.js --runInBand
```

Expected: FAIL because the scanners and DTO test seam do not exist yet.

- [ ] **Step 3: Implement the static scanners and DTO allowlist**

Create `server/scripts/privacy/scanForbiddenImports.js`:

```js
const fs = require("fs");
const path = require("path");

const CONTROL_DIRS = [
  path.resolve(__dirname, "../../endpoints/system.js"),
  path.resolve(__dirname, "../../endpoints/admin.js"),
  path.resolve(__dirname, "../../endpoints/api/admin"),
  path.resolve(__dirname, "../../endpoints/api/system"),
  path.resolve(__dirname, "../../endpoints/api/userManagement"),
];

async function scanForbiddenImports() {
  const findings = [];

  for (const target of CONTROL_DIRS) {
    const text = fs.readFileSync(target, "utf8");
    if (text.includes("ChatContentRepository")) {
      findings.push({ file: target, type: "forbidden_import", symbol: "ChatContentRepository" });
    }
  }

  return findings;
}

module.exports = { scanForbiddenImports };
```

Create `server/scripts/privacy/scanForbiddenSelects.js`:

```js
const fs = require("fs");
const glob = require("glob");

const FORBIDDEN_SELECT_PATTERNS = [
  "prompt:",
  "response:",
  "content:",
  "snippet:",
  "filename:",
  "include: { messages:",
  "include: { chats:",
];

async function scanForbiddenSelects() {
  const files = glob.sync("server/{endpoints,models,repositories}/**/*.js", {
    ignore: ["**/node_modules/**", "server/repositories/chatContentRepository.js"],
  });

  const findings = [];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const pattern of FORBIDDEN_SELECT_PATTERNS) {
      if (text.includes(pattern) && /admin|system|userManagement/.test(file)) {
        findings.push({ file, type: "forbidden_select", pattern });
      }
    }
  }

  return findings;
}

module.exports = { scanForbiddenSelects };
```

Update `server/repositories/chatMetadataRepository.js` with an explicit DTO seam:

```js
function buildFlagMetadataDto(row) {
  return {
    id: row.id,
    userId: row.userId,
    workspaceId: row.workspaceId,
    threadId: row.threadId,
    riskLevel: row.riskLevel,
    categories: row.categories || [],
    status: row.status,
    reviewedAt: row.reviewedAt || null,
  };
}

const ChatMetadataRepository = {
  __testBuildFlagDto: buildFlagMetadataDto,
  async listReviewCases(args = {}) {
    const rows = await ConversationFlags.listReviewCases(args);
    return rows.map(buildFlagMetadataDto);
  },
};
```

- [ ] **Step 4: Re-run the static/unit boundary suite**

Run:

```bash
npx jest server/__tests__/privacy/static/forbiddenImports.test.js server/__tests__/privacy/static/forbiddenPrismaSelects.test.js server/__tests__/privacy/unit/dtoShapes.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/static/forbiddenImports.test.js
PASS server/__tests__/privacy/static/forbiddenPrismaSelects.test.js
PASS server/__tests__/privacy/unit/dtoShapes.test.js
```

- [ ] **Step 5: Commit the static boundary scanners**

```bash
git add server/scripts/privacy/scanForbiddenImports.js server/scripts/privacy/scanForbiddenSelects.js server/__tests__/privacy/static/forbiddenImports.test.js server/__tests__/privacy/static/forbiddenPrismaSelects.test.js server/__tests__/privacy/unit/dtoShapes.test.js server/repositories/chatMetadataRepository.js
git commit -m "test: add static privacy boundary scanners"
```

### Task 5: Build The Full Integration Actor-By-Route Matrix

**Files:**
- Create: `server/test-support/privacy/routeSpecs.js`
- Create: `server/__tests__/privacy/integration/userIsolation.test.js`
- Create: `server/__tests__/privacy/integration/adminMetadataOnly.test.js`
- Create: `server/__tests__/privacy/integration/managementApiPrivacy.test.js`
- Create: `server/__tests__/privacy/integration/workspaceServiceIsolation.test.js`
- Create: `server/__tests__/privacy/integration/delegatedTokenPrivacy.test.js`
- Create: `server/__tests__/privacy/integration/flagReviewPrivacy.test.js`

- [ ] **Step 1: Write the failing route-matrix test**

Create `server/test-support/privacy/routeSpecs.js`:

```js
function buildRouteSpecs(fixtures) {
  return [
    {
      method: "GET",
      path: `/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`,
      category: "content_user",
      expectedContentPolicy: "own_user_content_allowed",
    },
    {
      method: "POST",
      path: "/api/system/conversation-flags",
      category: "moderation",
      expectedContentPolicy: "metadata_only",
      body: { offset: 0, limit: 20, status: "open" },
    },
    {
      method: "GET",
      path: `/api/v1/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`,
      category: "management_api",
      expectedContentPolicy: "metadata_only",
    },
  ];
}

module.exports = { buildRouteSpecs };
```

Create `server/__tests__/privacy/integration/userIsolation.test.js`:

```js
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const { buildRouteSpecs } = require("../../test-support/privacy/routeSpecs");
const { assertNoForbiddenCanaries } = require("../../test-support/privacy/scanner");

describe("privacy route matrix", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness({ captureLogs: true });
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("each route respects actor canary allowlists", async () => {
    const { app, fixtures, actors } = harness;
    const specs = buildRouteSpecs(fixtures);

    for (const spec of specs) {
      for (const actor of Object.values(actors)) {
        let req = request(app)[spec.method.toLowerCase()](spec.path).set(actor.headers);
        if (spec.body) req = req.send(spec.body);
        const response = await req;

        assertNoForbiddenCanaries({
          actor,
          response,
          canaries: fixtures.canaries,
        });
      }
    }
  });
});
```

- [ ] **Step 2: Run the matrix test to verify it fails**

Run:

```bash
npx jest server/__tests__/privacy/integration/userIsolation.test.js --runInBand
```

Expected: FAIL because the actor matrix, route specs, and existing routes are not yet wired for all combinations.

- [ ] **Step 3: Implement the route inventory and split the matrix by concern**

Expand `server/test-support/privacy/routeSpecs.js`:

```js
function buildRouteSpecs(fixtures) {
  return [
    {
      method: "GET",
      path: `/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`,
      category: "content_user",
      expectedContentPolicy: "own_user_content_allowed",
    },
    {
      method: "GET",
      path: `/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/thread/${fixtures.threads.aliceThread.slug}/chats`,
      category: "content_user",
      expectedContentPolicy: "own_user_content_allowed",
    },
    {
      method: "POST",
      path: "/api/system/conversation-flags",
      category: "moderation",
      expectedContentPolicy: "metadata_only",
      body: { offset: 0, limit: 20, status: "open" },
    },
    {
      method: "GET",
      path: `/api/v1/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`,
      category: "management_api",
      expectedContentPolicy: "metadata_only",
    },
    {
      method: "GET",
      path: `/api/v1/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats?apiSessionId=api_sess_A`,
      category: "content_api_session",
      expectedContentPolicy: "api_session_content_allowed",
    },
  ];
}
```

Split the matrix into purpose-specific files:

```js
// server/__tests__/privacy/integration/managementApiPrivacy.test.js
test("management keys stay metadata-only across management routes", async () => {
  const specs = buildRouteSpecs(fixtures).filter((spec) => spec.category === "management_api");
  for (const spec of specs) {
    const response = await request(app)[spec.method.toLowerCase()](spec.path).set(actors.managementReadonly.headers);
    assertNoForbiddenCanaries({ actor: actors.managementReadonly, response, canaries: fixtures.canaries });
  }
});
```

```js
// server/__tests__/privacy/integration/workspaceServiceIsolation.test.js
test("workspace service keys only see their own api-session partition", async () => {
  const response = await request(app)
    .get(`/api/v1/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats?apiSessionId=api_sess_A`)
    .set(actors.workspaceServiceW1A.headers);

  expect(response.status).toBe(200);
  expect(JSON.stringify(response.body)).toContain(fixtures.canaries.apiSessionA);
  expect(JSON.stringify(response.body)).not.toContain(fixtures.canaries.apiSessionB);
  expect(JSON.stringify(response.body)).not.toContain(fixtures.canaries.alicePrompt);
});
```

- [ ] **Step 4: Run the integration matrix suite**

Run:

```bash
npx jest server/__tests__/privacy/integration/userIsolation.test.js server/__tests__/privacy/integration/adminMetadataOnly.test.js server/__tests__/privacy/integration/managementApiPrivacy.test.js server/__tests__/privacy/integration/workspaceServiceIsolation.test.js server/__tests__/privacy/integration/delegatedTokenPrivacy.test.js server/__tests__/privacy/integration/flagReviewPrivacy.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/integration/userIsolation.test.js
PASS server/__tests__/privacy/integration/adminMetadataOnly.test.js
PASS server/__tests__/privacy/integration/managementApiPrivacy.test.js
PASS server/__tests__/privacy/integration/workspaceServiceIsolation.test.js
PASS server/__tests__/privacy/integration/delegatedTokenPrivacy.test.js
PASS server/__tests__/privacy/integration/flagReviewPrivacy.test.js
```

- [ ] **Step 5: Commit the integration matrix**

```bash
git add server/test-support/privacy/routeSpecs.js server/__tests__/privacy/integration/userIsolation.test.js server/__tests__/privacy/integration/adminMetadataOnly.test.js server/__tests__/privacy/integration/managementApiPrivacy.test.js server/__tests__/privacy/integration/workspaceServiceIsolation.test.js server/__tests__/privacy/integration/delegatedTokenPrivacy.test.js server/__tests__/privacy/integration/flagReviewPrivacy.test.js
git commit -m "test: add privacy integration route matrix"
```

### Task 6: Add Adversarial Parameter, Path, Method, And JSON Fuzzing

**Files:**
- Create: `server/__tests__/privacy/adversarial/userIdInjection.test.js`
- Create: `server/__tests__/privacy/adversarial/includeExpandFuzz.test.js`
- Create: `server/__tests__/privacy/adversarial/methodFuzz.test.js`
- Create: `server/__tests__/privacy/adversarial/pathFuzz.test.js`
- Create: `server/__tests__/privacy/adversarial/jsonShapeFuzz.test.js`
- Modify: `server/test-support/privacy/requestVariants.js`

- [ ] **Step 1: Write the failing adversarial test set**

Create `server/__tests__/privacy/adversarial/userIdInjection.test.js`:

```js
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const { assertNoForbiddenCanaries } = require("../../test-support/privacy/scanner");

describe("user id injection", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test.each([
    "?userId=alice",
    "?ownerUserId=alice",
    "?targetUserId=alice",
    "?forUser=alice",
  ])("management key cannot target another user with %s", async (query) => {
    const response = await request(harness.app)
      .get(`/api/v1/workspace/${harness.fixtures.workspaces.workspaceLegalAlpha.slug}/chats${query}`)
      .set(harness.actors.managementReadonly.headers);

    expect([400, 403]).toContain(response.status);
    assertNoForbiddenCanaries({
      actor: harness.actors.managementReadonly,
      response,
      canaries: harness.fixtures.canaries,
    });
  });
});
```

- [ ] **Step 2: Run the adversarial test to verify it fails**

Run:

```bash
npx jest server/__tests__/privacy/adversarial/userIdInjection.test.js --runInBand
```

Expected: FAIL because one or more routes still accept ignored or unsafe parameters without explicit validation.

- [ ] **Step 3: Add shared adversarial request builders and the full fuzz set**

Create `server/test-support/privacy/requestVariants.js`:

```js
const USER_ID_QUERY_VARIANTS = [
  { userId: "alice" },
  { ownerUserId: "alice" },
  { targetUserId: "alice" },
  { requestedUserId: "alice" },
  { forUser: "alice" },
];

const USER_ID_BODY_VARIANTS = [
  { userId: "alice" },
  { ownerUserId: "alice" },
  { targetUserId: "alice" },
  { user: { id: "alice" } },
  { where: { userId: "alice" } },
];

const INCLUDE_VARIANTS = [
  "?include=messages",
  "?include=content",
  "?expand=conversation",
  "?fields=id,text,response,prompt",
  "?debug=true",
  "?admin=true",
];

module.exports = {
  USER_ID_QUERY_VARIANTS,
  USER_ID_BODY_VARIANTS,
  INCLUDE_VARIANTS,
};
```

Create the remaining adversarial tests with the same scanner contract:

```js
// server/__tests__/privacy/adversarial/includeExpandFuzz.test.js
test.each(INCLUDE_VARIANTS)("control routes reject %s expansion attempts", async (query) => {
  const response = await request(app)
    .post(`/api/system/conversation-flags${query}`)
    .set(actors.adminUser.headers)
    .send({ offset: 0, limit: 20, status: "open" });

  expect([200, 400]).toContain(response.status);
  assertNoForbiddenCanaries({ actor: actors.adminUser, response, canaries: fixtures.canaries });
});
```

- [ ] **Step 4: Run the full adversarial suite**

Run:

```bash
npx jest server/__tests__/privacy/adversarial/userIdInjection.test.js server/__tests__/privacy/adversarial/includeExpandFuzz.test.js server/__tests__/privacy/adversarial/methodFuzz.test.js server/__tests__/privacy/adversarial/pathFuzz.test.js server/__tests__/privacy/adversarial/jsonShapeFuzz.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/adversarial/userIdInjection.test.js
PASS server/__tests__/privacy/adversarial/includeExpandFuzz.test.js
PASS server/__tests__/privacy/adversarial/methodFuzz.test.js
PASS server/__tests__/privacy/adversarial/pathFuzz.test.js
PASS server/__tests__/privacy/adversarial/jsonShapeFuzz.test.js
```

- [ ] **Step 5: Commit the adversarial fuzzing layer**

```bash
git add server/test-support/privacy/requestVariants.js server/__tests__/privacy/adversarial/userIdInjection.test.js server/__tests__/privacy/adversarial/includeExpandFuzz.test.js server/__tests__/privacy/adversarial/methodFuzz.test.js server/__tests__/privacy/adversarial/pathFuzz.test.js server/__tests__/privacy/adversarial/jsonShapeFuzz.test.js
git commit -m "test: add adversarial privacy fuzz coverage"
```

### Task 7: Cover Streaming, Error Paths, And Log Privacy

**Files:**
- Create: `server/test-support/privacy/sse.js`
- Create: `server/utils/privacy/safeErrorPayload.js`
- Create: `server/middleware/privacyErrorHandler.js`
- Modify: `server/app.js`
- Create: `server/__tests__/privacy/integration/streamingPrivacy.test.js`
- Create: `server/__tests__/privacy/integration/errorPathPrivacy.test.js`
- Create: `server/scripts/privacy/scanLogs.js`

- [ ] **Step 1: Write the failing streaming/error-path tests**

Create `server/__tests__/privacy/integration/streamingPrivacy.test.js`:

```js
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const { readSseBody } = require("../../test-support/privacy/sse");

describe("streaming privacy", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness({ captureLogs: true });
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("denied streams do not emit partial content", async () => {
    const response = await request(harness.app)
      .post(`/api/v1/workspace/${harness.fixtures.workspaces.workspaceLegalAlpha.slug}/thread/${harness.fixtures.threads.aliceThread.slug}/stream-chat`)
      .set(harness.actors.managementReadonly.headers)
      .send({ message: "hello", mode: "chat" });

    const streamText = await readSseBody(response);
    expect(response.status).toBe(403);
    expect(streamText).not.toContain(harness.fixtures.canaries.alicePrompt);
    expect(streamText).not.toContain(harness.fixtures.canaries.aliceResponse);
  });
});
```

Create `server/__tests__/privacy/integration/errorPathPrivacy.test.js`:

```js
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("error-path privacy", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness({ captureLogs: true });
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("validation errors do not echo chat content", async () => {
    const response = await request(harness.app)
      .post(`/api/v1/workspace/${harness.fixtures.workspaces.workspaceLegalAlpha.slug}/thread/${harness.fixtures.threads.aliceThread.slug}/chat`)
      .set(harness.actors.aliceUser.headers)
      .send({ message: harness.fixtures.canaries.alicePrompt, temperature: "not-a-number" });

    expect([400, 422]).toContain(response.status);
    expect(JSON.stringify(response.body)).not.toContain(harness.fixtures.canaries.alicePrompt);
    expect(harness.logCollector.read()).not.toContain(harness.fixtures.canaries.alicePrompt);
  });
});
```

- [ ] **Step 2: Run the new streaming/error tests to verify they fail**

Run:

```bash
npx jest server/__tests__/privacy/integration/streamingPrivacy.test.js server/__tests__/privacy/integration/errorPathPrivacy.test.js --runInBand
```

Expected: FAIL because denied stream routes or error serialization still leak request details in body or logs.

- [ ] **Step 3: Add SSE normalization and safe error serialization**

Create `server/test-support/privacy/sse.js`:

```js
async function readSseBody(response) {
  if (typeof response.text === "string") return response.text;
  if (Buffer.isBuffer(response.body)) return response.body.toString("utf8");
  return JSON.stringify(response.body || {});
}

module.exports = { readSseBody };
```

Create `server/utils/privacy/safeErrorPayload.js`:

```js
function safeErrorPayload({
  requestId = null,
  routeId = "unknown.route",
  code = "privacy_error",
  reason = "Request failed.",
  status = 500,
} = {}) {
  return {
    success: false,
    error: reason,
    code,
    requestId,
    routeId,
    status,
  };
}

module.exports = { safeErrorPayload };
```

Create `server/middleware/privacyErrorHandler.js`:

```js
const { safeErrorPayload } = require("../utils/privacy/safeErrorPayload");

function privacyErrorHandler(error, request, response, _next) {
  const status = error.status || 500;
  const routeId = response.locals.routePolicy?.routeId || "unknown.route";
  const requestId = response.getHeader("X-Lovora-Request-Id") || null;

  console.error("[PrivacyError]", {
    requestId,
    routeId,
    status,
    message: error.message,
  });

  response.status(status).json(
    safeErrorPayload({
      requestId,
      routeId,
      status,
      code: status >= 500 ? "internal_error" : "invalid_request",
      reason: status >= 500 ? "Request failed." : "Request could not be processed.",
    })
  );
}

module.exports = { privacyErrorHandler };
```

Mount it at the end of `server/app.js`:

```js
const { privacyErrorHandler } = require("./middleware/privacyErrorHandler");
// ...
app.use(privacyErrorHandler);
```

- [ ] **Step 4: Re-run the streaming/error-path suite**

Run:

```bash
npx jest server/__tests__/privacy/integration/streamingPrivacy.test.js server/__tests__/privacy/integration/errorPathPrivacy.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/integration/streamingPrivacy.test.js
PASS server/__tests__/privacy/integration/errorPathPrivacy.test.js
```

- [ ] **Step 5: Commit streaming and error-path privacy**

```bash
git add server/test-support/privacy/sse.js server/utils/privacy/safeErrorPayload.js server/middleware/privacyErrorHandler.js server/app.js server/__tests__/privacy/integration/streamingPrivacy.test.js server/__tests__/privacy/integration/errorPathPrivacy.test.js server/scripts/privacy/scanLogs.js
git commit -m "test: cover streaming and error-path privacy"
```

### Task 8: Add Migration And Legacy Residue Privacy Coverage

**Files:**
- Create: `server/__tests__/privacy/migration/migrationPrivacy.test.js`
- Modify: `server/test-support/privacy/legacyFixtures.js`
- Create: `server/prisma/migrations/20260422233000_sanitize_legacy_privacy_metadata/migration.sql`
- Create: `server/scripts/privacy/scanDbMetadata.js`

- [ ] **Step 1: Write the failing migration privacy test**

Create `server/__tests__/privacy/migration/migrationPrivacy.test.js`:

```js
const { createSecurityHarness } = require("../../test-support/securityHarness");
const { seedLegacyPrivacyResidue } = require("../../test-support/privacy/legacyFixtures");
const { assertMetadataTablesDoNotContainCanaries } = require("../../test-support/privacy/dbScanner");

describe("migration privacy", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
    await seedLegacyPrivacyResidue(harness.prisma, harness.fixtures);
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("legacy metadata is sanitized or quarantined after migration", async () => {
    await harness.runPrivacyMigrations();

    await assertMetadataTablesDoNotContainCanaries({
      prisma: harness.prisma,
      canaries: harness.fixtures.canaries,
      tables: ["conversation_flags", "event_logs"],
    });
  });
});
```

- [ ] **Step 2: Run the migration test to verify it fails**

Run:

```bash
npx jest server/__tests__/privacy/migration/migrationPrivacy.test.js --runInBand
```

Expected: FAIL because legacy residue stays in metadata rows and the harness does not yet expose a migration runner.

- [ ] **Step 3: Add legacy seeding and sanitization migration**

Create `server/test-support/privacy/legacyFixtures.js`:

```js
async function seedLegacyPrivacyResidue(prisma, fixtures) {
  await prisma.$executeRawUnsafe(
    `UPDATE "conversation_flags"
     SET "reviewNote" = '${fixtures.canaries.reviewNoteLeak}'
     WHERE "id" = ${fixtures.flags.aliceFlag.id}`
  );

  await prisma.event_logs.create({
    data: {
      event: "legacy_flag_review",
      metadata: JSON.stringify({
        rawText: fixtures.canaries.flaggedRawText,
        leakedPrompt: fixtures.canaries.alicePrompt,
      }),
    },
  });
}

module.exports = { seedLegacyPrivacyResidue };
```

Create `server/prisma/migrations/20260422233000_sanitize_legacy_privacy_metadata/migration.sql`:

```sql
UPDATE "conversation_flags"
SET "reviewNote" = NULL
WHERE "reviewNote" LIKE 'LOVORA_CANARY_%';

UPDATE "event_logs"
SET "metadata" = json_object(
  'sanitized', 1,
  'reason', 'legacy_privacy_cleanup'
)
WHERE json_extract("metadata", '$.rawText') IS NOT NULL
   OR json_extract("metadata", '$.leakedPrompt') IS NOT NULL;
```

- [ ] **Step 4: Re-run the migration suite**

Run:

```bash
npx jest server/__tests__/privacy/migration/migrationPrivacy.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/privacy/migration/migrationPrivacy.test.js
```

- [ ] **Step 5: Commit migration privacy coverage**

```bash
git add server/__tests__/privacy/migration/migrationPrivacy.test.js server/test-support/privacy/legacyFixtures.js server/prisma/migrations/20260422233000_sanitize_legacy_privacy_metadata/migration.sql server/scripts/privacy/scanDbMetadata.js
git commit -m "test: add migration privacy gauntlet"
```

### Task 9: Add Playwright UI Privacy Coverage

**Files:**
- Create: `frontend/e2e/admin-ui-privacy.spec.js`
- Create: `frontend/e2e/user-ui-isolation.spec.js`
- Modify: `frontend/src/pages/GeneralSettings/Chats/index.jsx`
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/index.jsx`
- Modify: `frontend/src/pages/WorkspaceChat/index.jsx`

- [ ] **Step 1: Write the failing admin UI privacy spec**

Create `frontend/e2e/admin-ui-privacy.spec.js`:

```js
const { test, expect } = require("@playwright/test");

test("admin UI stays metadata-only", async ({ page }) => {
  await page.goto("/settings/chats");
  await expect(page.getByTestId("review-queue-table")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("LOVORA_CANARY_ALICE_PROMPT_");
  await expect(page.locator("body")).not.toContainText("LOVORA_CANARY_BOB_PROMPT_");
});
```

Create `frontend/e2e/user-ui-isolation.spec.js`:

```js
const { test, expect } = require("@playwright/test");

test("alice sees only alice content", async ({ page }) => {
  await page.goto("/workspace/workspace-legal-alpha");
  await expect(page.getByTestId("workspace-chat-history")).toContainText("LOVORA_CANARY_ALICE_PROMPT_");
  await expect(page.getByTestId("workspace-chat-history")).not.toContainText("LOVORA_CANARY_BOB_PROMPT_");
});
```

- [ ] **Step 2: Run the Playwright specs to verify they fail**

Run:

```bash
npx playwright test frontend/e2e/admin-ui-privacy.spec.js frontend/e2e/user-ui-isolation.spec.js
```

Expected: FAIL because the pages do not yet expose stable test IDs and the fixture login/setup flow is not in place.

- [ ] **Step 3: Add stable test hooks and UI assertions**

Update `frontend/src/pages/GeneralSettings/Chats/index.jsx`:

```jsx
return (
  <div data-testid="review-queue-page">
    <table data-testid="review-queue-table">
      {/* existing rows */}
    </table>
  </div>
);
```

Update `frontend/src/pages/WorkspaceChat/index.jsx`:

```jsx
return (
  <section data-testid="workspace-chat-history">
    {history.map((message) => (
      <article key={message.id} data-testid="workspace-chat-message">
        {/* existing message rendering */}
      </article>
    ))}
  </section>
);
```

- [ ] **Step 4: Re-run the UI privacy suite**

Run:

```bash
npx playwright test frontend/e2e/admin-ui-privacy.spec.js frontend/e2e/user-ui-isolation.spec.js
```

Expected:

```text
2 passed
```

- [ ] **Step 5: Commit the UI privacy coverage**

```bash
git add frontend/e2e/admin-ui-privacy.spec.js frontend/e2e/user-ui-isolation.spec.js frontend/src/pages/GeneralSettings/Chats/index.jsx frontend/src/pages/GeneralSettings/ApiKeys/index.jsx frontend/src/pages/WorkspaceChat/index.jsx
git commit -m "test: add ui privacy coverage"
```

### Task 10: Wire Scripts, Staging Runner, Concurrency Checks, And Reports

**Files:**
- Modify: `package.json`
- Create: `server/scripts/privacy/scanRoutePolicies.js`
- Create: `server/scripts/privacy/generatePrivacyReport.js`
- Create: `server/scripts/privacy/runConcurrencyScenario.js`
- Create: `ops/privacy/run-staging-privacy-gauntlet.sh`
- Create: `docs/privacy/chat-privacy-incident-playbook.md`

- [ ] **Step 1: Write the failing script contract test**

Create `server/__tests__/privacy/static/privacyScripts.test.js`:

```js
const packageJson = require("../../../package.json");

describe("privacy scripts", () => {
  test("package.json exposes the full privacy command set", () => {
    expect(packageJson.scripts).toEqual(
      expect.objectContaining({
        "test:privacy:static": expect.any(String),
        "test:privacy:unit": expect.any(String),
        "test:privacy:integration": expect.any(String),
        "test:privacy:adversarial": expect.any(String),
        "test:privacy:migration": expect.any(String),
        "test:privacy:e2e": expect.any(String),
        "test:privacy:logs": expect.any(String),
        "test:privacy:all": expect.any(String),
      })
    );
  });
});
```

- [ ] **Step 2: Run the script test to verify it fails**

Run:

```bash
npx jest server/__tests__/privacy/static/privacyScripts.test.js --runInBand
```

Expected: FAIL because the privacy-specific scripts do not exist yet.

- [ ] **Step 3: Add command surface, staging runner, and reporting tools**

Update `package.json`:

```json
{
  "scripts": {
    "test:privacy:static": "NODE_OPTIONS=--disable-warning=DEP0040 jest --runInBand server/__tests__/privacy/static",
    "test:privacy:unit": "NODE_OPTIONS=--disable-warning=DEP0040 jest --runInBand server/__tests__/privacy/unit",
    "test:privacy:integration": "NODE_OPTIONS=--disable-warning=DEP0040 jest --runInBand server/__tests__/privacy/integration",
    "test:privacy:adversarial": "NODE_OPTIONS=--disable-warning=DEP0040 jest --runInBand server/__tests__/privacy/adversarial",
    "test:privacy:migration": "NODE_OPTIONS=--disable-warning=DEP0040 jest --runInBand server/__tests__/privacy/migration",
    "test:privacy:e2e": "playwright test frontend/e2e/admin-ui-privacy.spec.js frontend/e2e/user-ui-isolation.spec.js",
    "test:privacy:logs": "node server/scripts/privacy/scanLogs.js",
    "test:privacy:all": "yarn test:privacy:static && yarn test:privacy:unit && yarn test:privacy:integration && yarn test:privacy:adversarial && yarn test:privacy:migration && yarn test:privacy:e2e && yarn test:privacy:logs"
  }
}
```

Create `ops/privacy/run-staging-privacy-gauntlet.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ARTIFACT_DIR="$ROOT/privacy-artifacts/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$ARTIFACT_DIR"

echo "Resetting staging database"
bash "$ROOT/scripts/local-dev-setup.sh"

echo "Running privacy suites"
(cd "$ROOT" && yarn test:privacy:static)
(cd "$ROOT" && yarn test:privacy:unit)
(cd "$ROOT" && yarn test:privacy:integration)
(cd "$ROOT" && yarn test:privacy:adversarial)
(cd "$ROOT" && yarn test:privacy:migration)
(cd "$ROOT" && yarn test:privacy:e2e)

echo "Scanning logs and metadata"
node "$ROOT/server/scripts/privacy/scanLogs.js" > "$ARTIFACT_DIR/log-scan-report.json"
node "$ROOT/server/scripts/privacy/scanDbMetadata.js" > "$ARTIFACT_DIR/db-scan-report.json"
node "$ROOT/server/scripts/privacy/generatePrivacyReport.js" "$ARTIFACT_DIR"
```

Create `docs/privacy/chat-privacy-incident-playbook.md`:

```md
# Chat Privacy Incident Playbook

1. Disable the affected route or feature flag.
2. Revoke impacted API keys or delegated tokens.
3. Preserve logs and DB snapshots.
4. Identify actors, routes, time window, and leaked data class.
5. Patch and redeploy.
6. Re-run `yarn test:privacy:all`.
7. Generate a new privacy report and attach it to the incident record.
```

- [ ] **Step 4: Run the script test and the all-in-one command**

Run:

```bash
npx jest server/__tests__/privacy/static/privacyScripts.test.js --runInBand
yarn test:privacy:all
```

Expected:

```text
PASS server/__tests__/privacy/static/privacyScripts.test.js
Done in <time>s.
```

- [ ] **Step 5: Commit the final gauntlet wiring**

```bash
git add package.json server/scripts/privacy/scanRoutePolicies.js server/scripts/privacy/generatePrivacyReport.js server/scripts/privacy/runConcurrencyScenario.js ops/privacy/run-staging-privacy-gauntlet.sh docs/privacy/chat-privacy-incident-playbook.md server/__tests__/privacy/static/privacyScripts.test.js
git commit -m "test: wire full chat privacy gauntlet"
```

## Coverage Checklist

- Static gates:
  - `forbiddenImports.test.js`
  - `forbiddenPrismaSelects.test.js`
  - `routeInventory.test.js`
  - `privacyScripts.test.js`
- Runtime/unit gates:
  - `principalResolution.test.js`
  - `canReadChatContent.test.js`
  - `apiKeyScopes.test.js`
  - `repositoryBoundary.test.js`
  - `dtoShapes.test.js`
  - `controlPlaneResponseGuard.test.js`
- Integration gates:
  - `gauntletFoundation.test.js`
  - `userIsolation.test.js`
  - `adminMetadataOnly.test.js`
  - `managementApiPrivacy.test.js`
  - `workspaceServiceIsolation.test.js`
  - `delegatedTokenPrivacy.test.js`
  - `flagReviewPrivacy.test.js`
  - `streamingPrivacy.test.js`
  - `errorPathPrivacy.test.js`
- Adversarial gates:
  - `userIdInjection.test.js`
  - `includeExpandFuzz.test.js`
  - `methodFuzz.test.js`
  - `pathFuzz.test.js`
  - `jsonShapeFuzz.test.js`
- Migration gates:
  - `migrationPrivacy.test.js`
- UI gates:
  - `admin-ui-privacy.spec.js`
  - `user-ui-isolation.spec.js`
- Operational gates:
  - `yarn test:privacy:all`
  - `ops/privacy/run-staging-privacy-gauntlet.sh`
  - `privacy-report.json`
  - `privacy-report.md`

## Self-Review

- Spec coverage:
  - Canary fixtures, actor matrix, response/log/DB scanners: covered by Tasks 1, 5, 7, and 8.
  - Principal, repository, DTO, and route policy boundaries: covered by Tasks 2, 3, and 4.
  - Integration, adversarial, streaming, migration, UI, and staging/reporting layers: covered by Tasks 5 through 10.
- Placeholder scan:
  - No `TODO`, `TBD`, or “similar to Task N” references remain.
  - Every task lists exact files, concrete tests, commands, and commit messages.
- Type consistency:
  - The plan consistently uses `RequestSecurityContext`, `routeId`, `plane`, `responsePolicy`, `allowedCanaries`, and `workspace_service`.

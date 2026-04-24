# Repo-Wide API Authorization Invariant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `validApiKey` authentication-only across the repo and enforce that every `/api/v1` route declares explicit authorization policy and, where needed, explicit resource-bound content authorization.

**Architecture:** Keep the current `withRoutePolicy(...)` mechanism as the single entry point for `/api/v1` routes, but remove the ability to hide whole route families behind exemptions. Migrate every remaining exempt `/api/v1` family onto explicit route policies, add resource-aware middleware for content and workspace-bound operations, and add static/integration tests that fail if any future `/api/v1` route is registered with bare `validApiKey`.

**Tech Stack:** Express, Jest, Supertest, Prisma/SQLite, existing privacy helpers in `server/utils/privacy`, existing API-key principal model in `server/utils/auth/principals.js`

---

## File Structure

- `server/utils/privacy/routePolicy.js`
  Purpose: The one blessed path for declaring `/api/v1` route policy metadata and auto-inserting `requireApiCapability` after `validApiKey`.
- `server/utils/middleware/requireApiCapability.js`
  Purpose: Enforce route-level capability policy from `response.locals.routePolicy`.
- `server/test-support/privacy/routeInventory.js`
  Purpose: Central inventory of managed routes, temporary exemptions, and final strict invariant checks.
- `server/__tests__/privacy/static/routeInventory.test.js`
  Purpose: Fail if a managed `/api/v1` route is missing policy metadata.
- `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`
  Purpose: Fail if an `/api/v1` endpoint file registers a route with `validApiKey` outside `withRoutePolicy(...)`.
- `server/endpoints/api/auth/index.js`
  Purpose: Authentication probe route; after this work it should be policy-wrapped instead of directly using `validApiKey`.
- `server/endpoints/api/system/index.js`
  Purpose: `/api/v1/system/*` control-plane routes; all must be policy-wrapped and non-exempt.
- `server/endpoints/api/document/index.js`
  Purpose: `/api/v1/document*` and `/api/v1/documents*` developer document-management routes; all must be policy-wrapped and default to management-only in this pass.
- `server/endpoints/api/openai/index.js`
  Purpose: OpenAI-compatible API family; metadata routes become policy-wrapped control-plane routes, content routes become workspace-service content routes with workspace binding.
- `server/endpoints/api/embed/index.js`
  Purpose: Embed config/history API family; all must be policy-wrapped and management-only in this pass.
- `server/endpoints/api/middleware/authorize.js`
  Purpose: Resource loaders and resource-bound authorization middleware for workspace-bound routes.
- `server/utils/auth/apiContentAuthorization.js`
  Purpose: Shared, reusable resource-level auth decisions for workspace service keys and content routes.
- `server/utils/chats/apiChatHandler.js`
  Purpose: Second-line content authorization for raw workspace/thread chat routes.
- `server/utils/chats/openaiCompatible.js`
  Purpose: Second-line content authorization for OpenAI-compatible content routes.
- `server/__tests__/integration/apiSystemAuthz.test.js`
  Purpose: Integration tests for `/api/v1/system` route authorization.
- `server/__tests__/integration/apiDocumentAuthz.test.js`
  Purpose: Integration tests for `/api/v1/document*` and `/api/v1/documents*` authorization.
- `server/__tests__/integration/apiOpenAIAuthz.test.js`
  Purpose: Integration tests for `/api/v1/openai/*` authorization and workspace binding.
- `server/__tests__/integration/apiEmbedAuthz.test.js`
  Purpose: Integration tests for `/api/v1/embed*` authorization.
- `server/__tests__/integration/apiConversationSecurity.test.js`
  Purpose: Existing privacy regression suite; extend it where the invariant overlaps existing workspace/thread content rules.
- `server/endpoints/api/index.js`
  Purpose: Top-level developer API registry comment should reflect the stricter invariant after migration.

## Route Policy Matrix

This plan uses the current scope vocabulary unless a route is content-plane:

| Route family | Policy in this pass |
| --- | --- |
| `GET /api/v1/auth` | Any authenticated API principal via explicit policy: `management: []`, `workspace_service: []` |
| `/api/v1/system/*` | Management only, using existing `management:metadata:read` / `management:metadata:write` |
| `/api/v1/document*` and `/api/v1/documents*` | Management only, defaulting to `management:metadata:read` / `management:metadata:write` |
| `GET /api/v1/openai/models` | Management only, `management:metadata:read` |
| `GET /api/v1/openai/vector_stores` | Management only, `management:metadata:read` |
| `POST /api/v1/openai/embeddings` | Management only, `management:metadata:write` |
| `POST /api/v1/openai/chat/completions` | Workspace-service only, `workspace:api_sessions:write`, with workspace binding resolved from `model` |
| `/api/v1/embed*` | Management only, using existing `management:metadata:read` / `management:metadata:write` |

This is intentionally strict. Do **not** add new generic “superuser” or wildcard scopes in this pass.

### Task 1: Freeze the Current Debt and Add the Wrapper Invariant

**Files:**
- Modify: `server/utils/privacy/routePolicy.js`
- Modify: `server/test-support/privacy/routeInventory.js`
- Modify: `server/endpoints/api/index.js`
- Create: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`
- Test: `server/__tests__/privacy/static/routeInventory.test.js`
- Test: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`

- [ ] **Step 1: Write the failing static test that freezes today’s exempt `/api/v1` debt**

```js
/* eslint-env jest */
const path = require("path");
const fs = require("fs");

const EXPECTED_UNMIGRATED_V1_FILES = [
  "server/endpoints/api/auth/index.js",
  "server/endpoints/api/document/index.js",
  "server/endpoints/api/embed/index.js",
  "server/endpoints/api/openai/index.js",
];

function apiEndpointFiles(rootDir) {
  const files = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) files.push(...apiEndpointFiles(fullPath));
    if (entry.isFile() && entry.name === "index.js") files.push(fullPath);
  }
  return files;
}

describe("api v1 route wrapper invariant", () => {
  test("only the known unmigrated files may still declare bare /v1 routes", () => {
    const apiRoot = path.resolve(__dirname, "../../../endpoints/api");
    const files = apiEndpointFiles(apiRoot);

    const offenders = files
      .filter((file) => file.includes("/server/endpoints/api/"))
      .filter((file) => {
        const source = fs.readFileSync(file, "utf8");
        return /app\.(get|post|put|patch|delete)\(\s*"\/v1/.test(source) &&
          !source.includes("withRoutePolicy(");
      })
      .map((file) => path.relative(path.resolve(__dirname, "../../../.."), file))
      .sort();

    expect(offenders).toEqual(EXPECTED_UNMIGRATED_V1_FILES);
  });
});
```

- [ ] **Step 2: Run the static tests to verify they fail for the current legacy families**

Run: `npx jest server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js --runInBand`

Expected: FAIL because the new invariant test reports the current unmigrated `/api/v1` files and `routeInventory` still allows broad family exemptions.

- [ ] **Step 3: Implement the debt-freezing guardrail without changing runtime behavior yet**

```js
// server/test-support/privacy/routeInventory.js
const TEMPORARY_V1_EXEMPT_PREFIXES = [
  "/api/v1/auth",
  "/api/v1/document",
  "/api/v1/documents",
  "/api/v1/openai",
  "/api/v1/embed",
];

function isTemporaryV1Exemption(route = {}) {
  const path = String(route.path || "");
  return TEMPORARY_V1_EXEMPT_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}

module.exports = {
  routeKey,
  requiresPrivacyPolicy,
  isPolicyExempt,
  isTemporaryV1Exemption,
  TEMPORARY_V1_EXEMPT_PREFIXES: [...TEMPORARY_V1_EXEMPT_PREFIXES],
};
```

```js
// server/endpoints/api/index.js
// All /api/v1 routes must be declared with withRoutePolicy(...).
// validApiKey authenticates only; authorization must come from route policy.
```

- [ ] **Step 4: Make `withRoutePolicy(...)` the only supported `/api/v1` route wrapper shape**

```js
// server/utils/privacy/routePolicy.js
function withRoutePolicy(policy, ...handlers) {
  const declaredPolicy = declarePolicy(policy);
  const flattened = flattenHandlers(handlers);

  if (!flattened.includes(validApiKey)) {
    throw new Error(
      `Route policy ${declaredPolicy.routeId} must include validApiKey in its handler chain.`
    );
  }

  const policyAwareHandlers = flattened.flatMap((handler) => {
    if (handler === validApiKey) {
      return [handler, requireApiCapability];
    }
    return handler ? [handler] : [];
  });

  return [
    function attachRoutePolicy(request, response, next) {
      response.locals.routePolicy = declaredPolicy;
      response.locals.createRouteSecurityContext = () =>
        createRequestSecurityContext({
          requestId: request.header("X-Request-Id") || null,
          routeId: declaredPolicy.routeId,
          plane: declaredPolicy.plane,
          principal: response.locals.principal || null,
        });
      installControlPlaneResponseGuard(response, declaredPolicy);
      next();
    },
    ...policyAwareHandlers,
  ];
}
```

- [ ] **Step 5: Run the static tests and commit the guardrail**

Run: `npx jest server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js --runInBand`

Expected: PASS with the current temporary allowlist of unmigrated `/api/v1` endpoint files.

```bash
git add server/utils/privacy/routePolicy.js \
  server/test-support/privacy/routeInventory.js \
  server/endpoints/api/index.js \
  server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js
git commit -m "test: freeze current /api/v1 authz debt"
```

### Task 2: Migrate `/api/v1/auth` and Finish `/api/v1/system`

**Files:**
- Modify: `server/endpoints/api/auth/index.js`
- Modify: `server/endpoints/api/system/index.js`
- Modify: `server/test-support/privacy/routeInventory.js`
- Create: `server/__tests__/integration/apiSystemAuthz.test.js`
- Test: `server/__tests__/integration/apiSystemAuthz.test.js`
- Test: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`

- [ ] **Step 1: Write the failing integration tests for auth and system route authorization**

```js
/* eslint-env jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("api system authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    await harness.cleanup();
  });

  test("GET /api/v1/auth allows both management and workspace-service keys through explicit policy", async () => {
    const { app, fixtures } = harness;
    const [management, workspaceService] = await Promise.all([
      request(app).get("/api/v1/auth").set("Authorization", fixtures.auth.managementApiKey),
      request(app).get("/api/v1/auth").set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    expect(management.status).toBe(200);
    expect(workspaceService.status).toBe(200);
  });

  test("GET /api/v1/system/vector-count rejects workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const response = await request(app)
      .get("/api/v1/system/vector-count")
      .set("Authorization", fixtures.auth.workspaceServiceApiKey);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: "API key cannot access this route." });
  });
});
```

- [ ] **Step 2: Run the new system tests to verify they fail**

Run: `npx jest server/__tests__/integration/apiSystemAuthz.test.js --runInBand`

Expected: FAIL because `/api/v1/auth` is not policy-wrapped yet and `/api/v1/system/vector-count` is still exempt.

- [ ] **Step 3: Wrap `/api/v1/auth` and `/api/v1/system/vector-count` with explicit route policy**

```js
// server/endpoints/api/auth/index.js
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");

app.get(
  "/v1/auth",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/auth",
      routeId: "api.auth.verify",
      plane: "control",
      category: "authentication",
      responsePolicy: "metadata_only",
      principalAccess: {
        management: [],
        workspace_service: [],
      },
    },
    [validApiKey],
    (_request, response) => {
      response.status(200).json({ authenticated: true });
    }
  )
);
```

```js
// server/endpoints/api/system/index.js
app.get(
  "/v1/system/vector-count",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/system/vector-count",
      routeId: "api.system.vector-count",
      plane: "control",
      category: "system_settings",
      responsePolicy: "metadata_only",
      principalAccess: {
        management: ["management:metadata:read"],
      },
    },
    [validApiKey],
    async (_request, response) => {
      const VectorDb = getVectorDbClass();
      const vectorCount = await VectorDb.totalVectors();
      response.status(200).json({ vectorCount });
    }
  )
);
```

- [ ] **Step 4: Remove the finished `/api/v1` exemptions for auth and system**

```js
// server/test-support/privacy/routeInventory.js
const TEMPORARY_V1_EXEMPT_PREFIXES = [
  "/api/v1/document",
  "/api/v1/documents",
  "/api/v1/openai",
  "/api/v1/embed",
];

const ROUTE_POLICY_EXEMPTIONS = new Set([
  // Keep only non-/api/v1 exceptions here.
  "GET /api/system/check-token",
  "GET /api/system/refresh-user",
  // ...
]);
```

- [ ] **Step 5: Run tests and commit**

Run: `npx jest server/__tests__/integration/apiSystemAuthz.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js server/__tests__/privacy/static/routeInventory.test.js --runInBand`

Expected: PASS, and the static allowlist no longer includes `auth/index.js`.

```bash
git add server/endpoints/api/auth/index.js \
  server/endpoints/api/system/index.js \
  server/test-support/privacy/routeInventory.js \
  server/__tests__/integration/apiSystemAuthz.test.js
git commit -m "feat: policy-wrap auth and system api routes"
```

### Task 3: Migrate `/api/v1/document*` and `/api/v1/documents*` to Explicit Management Policy

**Files:**
- Modify: `server/endpoints/api/document/index.js`
- Modify: `server/test-support/privacy/routeInventory.js`
- Create: `server/__tests__/integration/apiDocumentAuthz.test.js`
- Test: `server/__tests__/integration/apiDocumentAuthz.test.js`
- Test: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`

- [ ] **Step 1: Write the failing document authorization tests**

```js
/* eslint-env jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("api document authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    await harness.cleanup();
  });

  test("workspace-service keys cannot list or mutate documents through generic /api/v1/document routes", async () => {
    const { app, fixtures } = harness;
    const [listResponse, schemaResponse, createFolderResponse] = await Promise.all([
      request(app).get("/api/v1/documents").set("Authorization", fixtures.auth.workspaceServiceApiKey),
      request(app).get("/api/v1/document/metadata-schema").set("Authorization", fixtures.auth.workspaceServiceApiKey),
      request(app)
        .post("/api/v1/document/create-folder")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({ name: "svc-folder" }),
    ]);

    expect(listResponse.status).toBe(403);
    expect(schemaResponse.status).toBe(403);
    expect(createFolderResponse.status).toBe(403);
  });

  test("management keys can still read metadata and mutate document storage through explicit policy", async () => {
    const { app, fixtures } = harness;
    const response = await request(app)
      .get("/api/v1/document/metadata-schema")
      .set("Authorization", fixtures.auth.managementApiKey);

    expect(response.status).toBe(200);
    expect(response.body.schema.title).toBe("string");
  });
});
```

- [ ] **Step 2: Run the document tests to verify they fail**

Run: `npx jest server/__tests__/integration/apiDocumentAuthz.test.js --runInBand`

Expected: FAIL because the document routes are still registered directly with `validApiKey`.

- [ ] **Step 3: Add route-policy helpers at the top of `document/index.js` and wrap every `/api/v1/document*` route**

```js
// server/endpoints/api/document/index.js
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");

const managementDocumentReadAccess = {
  management: ["management:metadata:read"],
};

const managementDocumentWriteAccess = {
  management: ["management:metadata:write"],
};
```

```js
app.get(
  "/v1/documents",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/documents",
      routeId: "api.documents.list",
      plane: "control",
      category: "documents",
      responsePolicy: "metadata_only",
      principalAccess: managementDocumentReadAccess,
    },
    [validApiKey],
    async (_request, response) => {
      const localFiles = await viewLocalFiles();
      response.status(200).json({ localFiles });
    }
  )
);
```

```js
app.post(
  "/v1/document/create-folder",
  ...withRoutePolicy(
    {
      method: "POST",
      path: "/api/v1/document/create-folder",
      routeId: "api.documents.folder.create",
      plane: "control",
      category: "documents",
      responsePolicy: "metadata_only",
      principalAccess: managementDocumentWriteAccess,
    },
    [validApiKey],
    async (request, response) => {
      const { name } = reqBody(request);
      const storagePath = path.join(documentsPath, normalizePath(name));
      // existing implementation
    }
  )
);
```

- [ ] **Step 4: Remove the document family exemptions**

```js
// server/test-support/privacy/routeInventory.js
const TEMPORARY_V1_EXEMPT_PREFIXES = [
  "/api/v1/openai",
  "/api/v1/embed",
];
```

- [ ] **Step 5: Run tests and commit**

Run: `npx jest server/__tests__/integration/apiDocumentAuthz.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js server/__tests__/privacy/static/routeInventory.test.js --runInBand`

Expected: PASS, and the wrapper invariant no longer lists `document/index.js`.

```bash
git add server/endpoints/api/document/index.js \
  server/test-support/privacy/routeInventory.js \
  server/__tests__/integration/apiDocumentAuthz.test.js
git commit -m "feat: policy-wrap document api routes"
```

### Task 4: Migrate OpenAI-Compatible Routes and Add Handler-Level Authz

**Files:**
- Modify: `server/endpoints/api/openai/index.js`
- Modify: `server/endpoints/api/middleware/authorize.js`
- Modify: `server/utils/chats/openaiCompatible.js`
- Modify: `server/utils/auth/apiContentAuthorization.js`
- Modify: `server/test-support/privacy/routeInventory.js`
- Create: `server/__tests__/integration/apiOpenAIAuthz.test.js`
- Test: `server/__tests__/integration/apiOpenAIAuthz.test.js`
- Test: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`

- [ ] **Step 1: Write the failing OpenAI-compatible authorization tests**

```js
/* eslint-env jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("api openai authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    await harness.cleanup();
  });

  test("management keys cannot call openai chat completions", async () => {
    const { app, fixtures } = harness;
    const response = await request(app)
      .post("/api/v1/openai/chat/completions")
      .set("Authorization", fixtures.auth.managementApiKey)
      .send({
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      });

    expect(response.status).toBe(403);
  });

  test("workspace-service keys can call chat completions only for their bound workspace model", async () => {
    const { app, fixtures } = harness;
    const allowed = await request(app)
      .post("/api/v1/openai/chat/completions")
      .set("Authorization", fixtures.auth.workspaceServiceApiKey)
      .send({
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      });

    const denied = await request(app)
      .post("/api/v1/openai/chat/completions")
      .set("Authorization", fixtures.auth.workspaceServiceApiKey)
      .send({
        model: fixtures.workspaces.unassignedWorkspace.slug,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      });

    expect(allowed.status).not.toBe(403);
    expect(denied.status).toBe(403);
  });
});
```

- [ ] **Step 2: Run the OpenAI-compatible tests to verify they fail**

Run: `npx jest server/__tests__/integration/apiOpenAIAuthz.test.js --runInBand`

Expected: FAIL because `openai/index.js` is still directly using `validApiKey`.

- [ ] **Step 3: Add policy wrappers and workspace loader middleware in `openai/index.js`**

```js
// server/endpoints/api/openai/index.js
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");
const {
  loadTargetWorkspaceFromModel,
  requireWorkspaceServiceAccess,
} = require("../middleware/authorize");

app.get(
  "/v1/openai/models",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/openai/models",
      routeId: "api.openai.models",
      plane: "control",
      category: "openai_compat",
      responsePolicy: "metadata_only",
      principalAccess: {
        management: ["management:metadata:read"],
      },
    },
    [validApiKey],
    async (_request, response) => {
      const workspaces = await Workspace.where();
      response.status(200).json({ object: "list", data: workspaces });
    }
  )
);
```

```js
app.post(
  "/v1/openai/chat/completions",
  ...withRoutePolicy(
    {
      method: "POST",
      path: "/api/v1/openai/chat/completions",
      routeId: "api.openai.chat-completions",
      plane: "content",
      category: "openai_compat",
      responsePolicy: "raw_chat_content",
      principalAccess: {
        workspace_service: ["workspace:api_sessions:write"],
      },
    },
    [
      validApiKey,
      loadTargetWorkspaceFromModel,
      requireWorkspaceServiceAccess("workspace:api_sessions:write"),
    ],
    async (request, response) => {
      const workspace = response.locals.targetWorkspace;
      // existing message extraction, then call OpenAICompatibleChat.*
    }
  )
);
```

- [ ] **Step 4: Add second-line authorization inside `openaiCompatible.js`**

```js
// server/utils/chats/openaiCompatible.js
const {
  assertWorkspaceServiceAccess,
} = require("../auth/apiContentAuthorization");

async function chatSync({
  principal = null,
  workspace,
  systemPrompt = null,
  history = [],
  prompt,
  attachments = [],
  temperature = null,
}) {
  if (principal) {
    assertWorkspaceServiceAccess(principal, workspace, "workspace:api_sessions:write");
  }

  // existing implementation
}

async function streamChat({
  principal = null,
  workspace,
  systemPrompt = null,
  history = [],
  prompt,
  attachments = [],
  temperature = null,
  response,
}) {
  if (principal) {
    assertWorkspaceServiceAccess(principal, workspace, "workspace:api_sessions:write");
  }

  // existing implementation
}
```

- [ ] **Step 5: Remove the OpenAI family exemption, run tests, and commit**

Run: `npx jest server/__tests__/integration/apiOpenAIAuthz.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js server/__tests__/privacy/static/routeInventory.test.js --runInBand`

Expected: PASS, and the temporary `/api/v1/openai` exemption is gone.

```bash
git add server/endpoints/api/openai/index.js \
  server/endpoints/api/middleware/authorize.js \
  server/utils/chats/openaiCompatible.js \
  server/utils/auth/apiContentAuthorization.js \
  server/test-support/privacy/routeInventory.js \
  server/__tests__/integration/apiOpenAIAuthz.test.js
git commit -m "feat: enforce authz on openai compatible api routes"
```

### Task 5: Migrate `/api/v1/embed*` to Explicit Management Policy

**Files:**
- Modify: `server/endpoints/api/embed/index.js`
- Modify: `server/test-support/privacy/routeInventory.js`
- Create: `server/__tests__/integration/apiEmbedAuthz.test.js`
- Test: `server/__tests__/integration/apiEmbedAuthz.test.js`
- Test: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`

- [ ] **Step 1: Write the failing embed authorization tests**

```js
/* eslint-env jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("api embed authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    await harness.cleanup();
  });

  test("workspace-service keys cannot enumerate embed configs or embed chat metadata", async () => {
    const { app, fixtures } = harness;
    const [listResponse, chatsResponse] = await Promise.all([
      request(app).get("/api/v1/embed").set("Authorization", fixtures.auth.workspaceServiceApiKey),
      request(app)
        .get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    expect(listResponse.status).toBe(403);
    expect(chatsResponse.status).toBe(403);
  });

  test("management keys can still read embed metadata", async () => {
    const { app, fixtures } = harness;
    const response = await request(app)
      .get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`)
      .set("Authorization", fixtures.auth.managementApiKey);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.chats)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the embed tests to verify they fail**

Run: `npx jest server/__tests__/integration/apiEmbedAuthz.test.js --runInBand`

Expected: FAIL because the embed routes are still directly using `validApiKey`.

- [ ] **Step 3: Wrap every embed route with explicit management-only policy**

```js
// server/endpoints/api/embed/index.js
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");

const managementEmbedReadAccess = {
  management: ["management:metadata:read"],
};

const managementEmbedWriteAccess = {
  management: ["management:metadata:write"],
};
```

```js
app.get(
  "/v1/embed",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/embed",
      routeId: "api.embed.list",
      plane: "control",
      category: "embed",
      responsePolicy: "metadata_only",
      principalAccess: managementEmbedReadAccess,
    },
    [validApiKey],
    async (_request, response) => {
      const embeds = await EmbedConfig.whereWithWorkspace();
      response.status(200).json({ embeds });
    }
  )
);
```

```js
app.post(
  "/v1/embed/new",
  ...withRoutePolicy(
    {
      method: "POST",
      path: "/api/v1/embed/new",
      routeId: "api.embed.create",
      plane: "control",
      category: "embed",
      responsePolicy: "metadata_only",
      principalAccess: managementEmbedWriteAccess,
    },
    [validApiKey],
    async (request, response) => {
      const data = reqBody(request);
      // existing create implementation
    }
  )
);
```

- [ ] **Step 4: Remove the final family exemption and run tests**

```js
// server/test-support/privacy/routeInventory.js
const TEMPORARY_V1_EXEMPT_PREFIXES = [];
```

Run: `npx jest server/__tests__/integration/apiEmbedAuthz.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js server/__tests__/privacy/static/routeInventory.test.js --runInBand`

Expected: PASS, and the temporary exemption array is now empty.

- [ ] **Step 5: Commit**

```bash
git add server/endpoints/api/embed/index.js \
  server/test-support/privacy/routeInventory.js \
  server/__tests__/integration/apiEmbedAuthz.test.js
git commit -m "feat: policy-wrap embed api routes"
```

### Task 6: Make the Strict Invariant Non-Optional

**Files:**
- Modify: `server/test-support/privacy/routeInventory.js`
- Modify: `server/__tests__/privacy/static/routeInventory.test.js`
- Modify: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`
- Create: `server/__tests__/integration/apiV1CanarySweep.test.js`
- Modify: `server/endpoints/api/index.js`
- Test: `server/__tests__/privacy/static/routeInventory.test.js`
- Test: `server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js`
- Test: `server/__tests__/integration/apiV1CanarySweep.test.js`

- [ ] **Step 1: Tighten the route inventory test from “known debt only” to “zero `/api/v1` debt”**

```js
// server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js
describe("api v1 route wrapper invariant", () => {
  test("no /api/v1 endpoint file may declare a bare route anymore", () => {
    const offenders = findBareV1RouteFiles();
    expect(offenders).toEqual([]);
  });
});
```

```js
// server/__tests__/privacy/static/routeInventory.test.js
test("managed /api/v1 routes have no remaining exemptions", () => {
  const {
    TEMPORARY_V1_EXEMPT_PREFIXES,
  } = require("../../../test-support/privacy/routeInventory");

  expect(TEMPORARY_V1_EXEMPT_PREFIXES).toEqual([]);
});
```

- [ ] **Step 2: Write the failing canary sweep for the migrated `/api/v1` surfaces**

```js
/* eslint-env jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("api v1 canary sweep", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    await harness.cleanup();
  });

  test("management and workspace-service metadata routes do not leak prompt canaries", async () => {
    const { app, fixtures } = harness;
    const responses = await Promise.all([
      request(app).get("/api/v1/system").set("Authorization", fixtures.auth.managementApiKey),
      request(app).get("/api/v1/documents").set("Authorization", fixtures.auth.managementApiKey),
      request(app).get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`).set("Authorization", fixtures.auth.managementApiKey),
    ]);

    const serialized = JSON.stringify(responses.map((response) => response.body));
    expect(serialized).not.toContain(fixtures.canaries.alicePrompt);
    expect(serialized).not.toContain(fixtures.canaries.apiSessionPrompt);
  });
});
```

- [ ] **Step 3: Run the strict static tests and canary sweep to verify they fail before the final cleanups**

Run: `npx jest server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js server/__tests__/integration/apiV1CanarySweep.test.js --runInBand`

Expected: FAIL until the remaining exemption scaffolding is fully removed and the new canary sweep is wired to the migrated routes.

- [ ] **Step 4: Remove the temporary exemption code entirely and update the API registry comment**

```js
// server/test-support/privacy/routeInventory.js
function isPolicyExempt(route = {}) {
  return ROUTE_POLICY_EXEMPTIONS.has(routeKey(route));
}

module.exports = {
  routeKey,
  requiresPrivacyPolicy,
  isPolicyExempt,
  ROUTE_POLICY_EXEMPTIONS: [...ROUTE_POLICY_EXEMPTIONS],
};
```

```js
// server/endpoints/api/index.js
// All /api/v1 routes must be documented, declared with withRoutePolicy(...),
// and use validApiKey only as authentication.
```

- [ ] **Step 5: Run the final strict suite and commit**

Run: `npx jest server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js server/__tests__/integration/apiV1CanarySweep.test.js server/__tests__/integration/apiSystemAuthz.test.js server/__tests__/integration/apiDocumentAuthz.test.js server/__tests__/integration/apiOpenAIAuthz.test.js server/__tests__/integration/apiEmbedAuthz.test.js --runInBand`

Expected: PASS with zero `/api/v1` family exemptions and no bare `/api/v1` route declarations.

```bash
git add server/test-support/privacy/routeInventory.js \
  server/__tests__/privacy/static/routeInventory.test.js \
  server/__tests__/privacy/static/apiV1RouteWrapperInvariant.test.js \
  server/__tests__/integration/apiV1CanarySweep.test.js \
  server/endpoints/api/index.js
git commit -m "test: enforce strict repo-wide api authz invariant"
```

## Self-Review

- Spec coverage:
  - Route-level authorization on every `/api/v1` surface: covered in Tasks 2-5.
  - Durable invariant that `validApiKey` alone is insufficient: covered in Tasks 1 and 6.
  - Resource-aware content authorization for compatibility/content routes: covered in Task 4.
  - Canary and regression hardening: covered in Task 6.
- Placeholder scan:
  - No `TODO`, `TBD`, or “similar to above” references remain.
  - Every code-changing step includes a concrete code snippet.
- Type consistency:
  - Plan consistently uses `withRoutePolicy(...)`, `validApiKey`, `requireApiCapability`, `management:metadata:read`, `management:metadata:write`, and `workspace:api_sessions:write`.
  - Middleware names are consistent: `loadTargetWorkspaceFromModel`, `requireWorkspaceServiceAccess`.


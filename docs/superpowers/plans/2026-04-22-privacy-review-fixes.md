# Privacy Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the new privacy route metadata into enforced API-key authorization, hard-disable API-key user impersonation, and replace the subset-only route inventory test with real route drift control.

**Architecture:** Keep `validApiKey` responsible only for principal resolution, then enforce route-level API capabilities from `withRoutePolicy` so policy metadata and runtime authorization cannot drift apart. Normalize the workspace-service scope vocabulary to the `workspace:api_sessions:*` names already used by the privacy tests, and make the route inventory test operate on namespace-driven route coverage instead of a hand-maintained Task 3 list.

**Tech Stack:** Node.js, Express, Jest, Supertest, existing privacy test helpers in `server/test-support/privacy`, route policy middleware in `server/utils/privacy`.

---

## Scope Check

This plan covers the three actionable review findings from the privacy pass:

1. API key scopes are resolved but never enforced on API routes.
2. `GET /api/v1/users/:id/issue-auth-token` still lets API keys mint user login tokens.
3. `server/__tests__/privacy/static/routeInventory.test.js` only validates a hard-coded subset of privacy routes.

Do **not** bundle the unrelated API-key workspace-management UI/server work into this fix. That work already has its own plan in `docs/superpowers/plans/2026-04-22-api-key-content-gate-and-review-capability.md` and should stay separate from this privacy authorization patch.

## File Structure

- Create: `server/utils/middleware/requireApiCapability.js`
  Responsibility: fail closed when an API-key-authenticated request does not satisfy the current route policy’s principal kind and scope requirements.

- Create: `server/__tests__/privacy/unit/requireApiCapability.test.js`
  Responsibility: unit-test route-policy capability enforcement independently of the endpoint files.

- Create: `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`
  Responsibility: prove the dangerous routes now deny the wrong key class and allow the right one.

- Create: `server/test-support/privacy/routeInventory.js`
  Responsibility: centralize which route namespaces require privacy policy metadata and which routes are explicitly exempt.

- Modify: `server/utils/privacy/routePolicy.js`
  Responsibility: normalize `principalAccess`, attach capability enforcement, and keep declared route policy metadata introspectable by tests.

- Modify: `server/utils/auth/principals.js`
  Responsibility: normalize workspace-service scope vocabulary and keep `principalCan` aligned with the new route enforcement.

- Modify: `server/models/apiKeys.js`
  Responsibility: emit the correct default scope names for workspace-service keys.

- Modify: `server/utils/middleware/validApiKey.js`
  Responsibility: continue resolving and storing principals without becoming the place where per-route authorization logic lives.

- Modify: `server/endpoints/api/system/index.js`
- Modify: `server/endpoints/api/admin/index.js`
- Modify: `server/endpoints/api/userManagement/index.js`
- Modify: `server/endpoints/api/workspace/index.js`
- Modify: `server/endpoints/api/workspaceThread/index.js`
  Responsibility: declare `principalAccess` on every API-key route touched by the privacy refactor and return explicit deny responses where required.

- Modify: `server/__tests__/utils/auth/principals.apiKeys.test.js`
- Modify: `server/__tests__/privacy/unit/apiKeyScopes.test.js`
  Responsibility: lock the scope vocabulary and default scope behavior before wiring route enforcement.

- Modify: `server/__tests__/privacy/static/routeInventory.test.js`
  Responsibility: assert coverage for every privacy-managed route, not only the original Task 3 sample set.

### Task 1: Normalize API-Key Scope Vocabulary

**Files:**
- Modify: `server/models/apiKeys.js`
- Modify: `server/utils/auth/principals.js`
- Modify: `server/__tests__/utils/auth/principals.apiKeys.test.js`
- Modify: `server/__tests__/privacy/unit/apiKeyScopes.test.js`

- [ ] **Step 1: Write the failing tests**

Update `server/__tests__/utils/auth/principals.apiKeys.test.js` so workspace-service defaults use `workspace:api_sessions:read` and `workspace:api_sessions:write` instead of `workspace:chat:*`.

```js
test("workspace service key resolves to api-session scopes by default", () => {
  const principal = resolveApiKeyPrincipal({
    id: 27,
    createdBy: 8,
    principalType: "workspace_service",
    workspaceId: "41",
    scopes: null,
  });

  expect(principal).toEqual({
    kind: "workspace_service",
    apiKeyId: 27,
    createdByUserId: 8,
    workspaceId: 41,
    scopes: ["workspace:api_sessions:read", "workspace:api_sessions:write"],
  });
  expect(principalCan(principal, "workspace:api_sessions:read")).toBe(true);
  expect(principalCan(principal, "workspace:chat:read")).toBe(false);
});
```

Update `server/__tests__/privacy/unit/apiKeyScopes.test.js` so the workspace-service scope assertions match the same vocabulary.

```js
test("workspace service keys are content-capable only through api-session scopes", () => {
  const principal = resolveApiKeyPrincipal({
    id: 7,
    createdBy: 4,
    principalType: "workspace_service",
    workspaceId: "15",
    scopes: JSON.stringify(["workspace:api_sessions:read"]),
  });

  expect(principalCan(principal, "workspace:api_sessions:read")).toBe(true);
  expect(principalCan(principal, "workspace:api_sessions:write")).toBe(false);
  expect(principalCan(principal, "management:metadata:read")).toBe(false);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
npx jest --runInBand server/__tests__/utils/auth/principals.apiKeys.test.js server/__tests__/privacy/unit/apiKeyScopes.test.js
```

Expected: FAIL because the current defaults still resolve `workspace:chat:read` / `workspace:chat:write`.

- [ ] **Step 3: Write the minimal implementation**

In `server/models/apiKeys.js`, change the workspace-service defaults:

```js
const DEFAULT_SCOPES = {
  management: [
    "management:metadata:read",
    "management:moderation:write",
    "management:users:read",
  ],
  workspace_service: [
    "workspace:api_sessions:read",
    "workspace:api_sessions:write",
  ],
};
```

In `server/utils/auth/principals.js`, make the workspace-service principal resolver use the same names:

```js
return {
  kind: "workspace_service",
  apiKeyId,
  createdByUserId,
  workspaceId,
  scopes: parseScopes(apiKey.scopes, [
    "workspace:api_sessions:read",
    "workspace:api_sessions:write",
  ]),
};
```

Leave `canReadChatContent()` unchanged in this task. The point of this step is to make the scope names internally consistent before route enforcement starts depending on them.

- [ ] **Step 4: Run the tests to verify they pass**

Run:

```bash
npx jest --runInBand server/__tests__/utils/auth/principals.apiKeys.test.js server/__tests__/privacy/unit/apiKeyScopes.test.js server/__tests__/privacy/unit/canReadChatContent.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add server/models/apiKeys.js server/utils/auth/principals.js server/__tests__/utils/auth/principals.apiKeys.test.js server/__tests__/privacy/unit/apiKeyScopes.test.js
git commit -m "fix: normalize api key scope vocabulary"
```

### Task 2: Enforce Route-Level API Capabilities and Disable API-Key Impersonation

**Files:**
- Create: `server/utils/middleware/requireApiCapability.js`
- Create: `server/__tests__/privacy/unit/requireApiCapability.test.js`
- Create: `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`
- Modify: `server/utils/privacy/routePolicy.js`
- Modify: `server/utils/middleware/validApiKey.js`
- Modify: `server/endpoints/api/system/index.js`
- Modify: `server/endpoints/api/admin/index.js`
- Modify: `server/endpoints/api/userManagement/index.js`
- Modify: `server/endpoints/api/workspace/index.js`
- Modify: `server/endpoints/api/workspaceThread/index.js`

- [ ] **Step 1: Write the failing unit and integration tests**

Create `server/__tests__/privacy/unit/requireApiCapability.test.js`:

```js
/* eslint-env jest */

const { requireApiCapability } = require("../../../utils/middleware/requireApiCapability");

function createResponse(routePolicy, principal, apiKey = { id: 1 }) {
  return {
    locals: { routePolicy, principal, apiKey },
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

describe("requireApiCapability", () => {
  test("allows matching management principals", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        principalAccess: {
          management: ["management:metadata:read"],
        },
      },
      {
        kind: "management",
        scopes: ["management:metadata:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(response.status).not.toHaveBeenCalled();
  });

  test("denies workspace-service keys on management routes", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        principalAccess: {
          management: ["management:metadata:read"],
        },
      },
      {
        kind: "workspace_service",
        scopes: ["workspace:api_sessions:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      error: "API key cannot access this route.",
    });
  });

  test("denies principals missing a required capability", () => {
    const next = jest.fn();
    const response = createResponse(
      {
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      {
        kind: "workspace_service",
        scopes: ["workspace:api_sessions:read"],
      }
    );

    requireApiCapability({}, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(403);
  });
});
```

Create `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`:

```js
/* eslint-env jest */

const request = require("supertest");

jest.mock("../../../models/apiKeys", () => ({
  ApiKey: {
    get: jest.fn(),
  },
}));

jest.mock("../../../models/systemSettings", () => ({
  SystemSettings: {
    isMultiUserMode: jest.fn().mockResolvedValue(true),
  },
}));

const { ApiKey } = require("../../../models/apiKeys");
const { createApp } = require("../../../app");

describe("API key capability enforcement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("workspace-service keys cannot read system settings", async () => {
    ApiKey.get.mockResolvedValue({
      id: 9,
      secret: "svc-key",
      createdBy: 1,
      principalType: "workspace_service",
      workspaceId: 12,
      scopes: JSON.stringify(["workspace:api_sessions:read"]),
    });

    const app = createApp({ enableWebSockets: false });
    const response = await request(app)
      .get("/api/v1/system")
      .set("Authorization", "Bearer svc-key");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "API key cannot access this route.",
    });
  });

  test("management keys cannot issue user auth tokens", async () => {
    ApiKey.get.mockResolvedValue({
      id: 3,
      secret: "mgmt-key",
      createdBy: 1,
      principalType: "management",
      scopes: JSON.stringify(["management:users:read"]),
    });

    const app = createApp({ enableWebSockets: false });
    const response = await request(app)
      .get("/api/v1/users/12/issue-auth-token")
      .set("Authorization", "Bearer mgmt-key");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "API keys cannot issue user auth tokens.",
    });
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```bash
npx jest --runInBand server/__tests__/privacy/unit/requireApiCapability.test.js server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js
```

Expected: FAIL because `requireApiCapability.js` does not exist and the routes still allow any resolved API key through.

- [ ] **Step 3: Write the minimal implementation**

Create `server/utils/middleware/requireApiCapability.js`:

```js
const { principalCan } = require("../auth/principals");

function deny(response, message = "API key cannot access this route.") {
  return response.status(403).json({ error: message });
}

function requireApiCapability(request, response, next) {
  const routePolicy = response?.locals?.routePolicy || null;
  const apiKey = response?.locals?.apiKey || null;
  const principal = response?.locals?.principal || null;

  if (!apiKey || !routePolicy?.principalAccess) {
    next();
    return;
  }

  const requiredCapabilities = routePolicy.principalAccess[principal?.kind] || null;
  if (!requiredCapabilities) {
    deny(response);
    return;
  }

  const missingCapability = requiredCapabilities.find(
    (capability) => !principalCan(principal, capability)
  );

  if (missingCapability) {
    deny(response);
    return;
  }

  next();
}

module.exports = {
  requireApiCapability,
};
```

Update `server/utils/privacy/routePolicy.js` so policies can declare `principalAccess` and the middleware runs automatically:

```js
const { requireApiCapability } = require("../middleware/requireApiCapability");

function normalizePrincipalAccess(principalAccess = null) {
  if (principalAccess === null || principalAccess === undefined) return null;
  if (typeof principalAccess !== "object" || Array.isArray(principalAccess)) {
    throw new Error("Invalid route policy principal access declaration.");
  }

  return Object.freeze(
    Object.fromEntries(
      Object.entries(principalAccess).map(([kind, capabilities]) => [
        String(kind),
        Object.freeze((capabilities || []).map(String)),
      ])
    )
  );
}

function normalizePolicy(policy = {}) {
  const normalized = {
    method: String(policy.method || "").toUpperCase(),
    path: String(policy.path || ""),
    routeId: String(policy.routeId || ""),
    plane: String(policy.plane || ""),
    category: String(policy.category || ""),
    responsePolicy: String(policy.responsePolicy || ""),
    principalAccess: normalizePrincipalAccess(policy.principalAccess),
  };

  if (
    !normalized.method ||
    !normalized.path ||
    !normalized.routeId ||
    !["control", "content"].includes(normalized.plane) ||
    !normalized.category ||
    !normalized.responsePolicy
  ) {
    throw new Error("Invalid route policy declaration.");
  }

  return Object.freeze(normalized);
}

function withRoutePolicy(policy, ...handlers) {
  const declaredPolicy = declarePolicy(policy);

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
      requireApiCapability(request, response, next);
    },
    ...flattenHandlers(handlers),
  ];
}
```

Update the API-key endpoints so each route declares the capabilities it actually needs.

In `server/endpoints/api/system/index.js`:

```js
app.get(
  "/v1/system",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/system",
      routeId: "api.system.settings.read",
      plane: "control",
      category: "system_settings",
      responsePolicy: "metadata_only",
      principalAccess: {
        management: ["management:metadata:read"],
      },
    },
    [validApiKey],
    async (_, response) => {
      const settings = await SystemSettings.currentSettings();
      response.status(200).json({ settings });
    }
  )
);
```

In `server/endpoints/api/admin/index.js`:

```js
principalAccess: {
  management: ["management:metadata:read", "management:moderation:write"],
},
```

Use that `principalAccess` block on both `/v1/admin/workspace-chats` and `/v1/admin/conversation-flags`.

In `server/endpoints/api/workspace/index.js`:

```js
principalAccess: {
  workspace_service: ["workspace:api_sessions:read"],
},
```

Use that on `GET /v1/workspace/:slug/chats`.

```js
principalAccess: {
  workspace_service: ["workspace:api_sessions:write"],
},
```

Use that on `POST /v1/workspace/:slug/chat` and `POST /v1/workspace/:slug/stream-chat`.

In `server/endpoints/api/workspaceThread/index.js`, apply the same `workspace_service` requirements:

```js
principalAccess: {
  workspace_service: ["workspace:api_sessions:read"],
},
```

for `GET /v1/workspace/:slug/thread/:threadSlug/chats`, and:

```js
principalAccess: {
  workspace_service: ["workspace:api_sessions:write"],
},
```

for the thread chat and stream routes.

In `server/endpoints/api/userManagement/index.js`, keep `/v1/users` readable only by management keys:

```js
principalAccess: {
  management: ["management:users:read"],
},
```

Then fail closed on `GET /v1/users/:id/issue-auth-token`:

```js
app.get(
  "/v1/users/:id/issue-auth-token",
  ...withRoutePolicy(
    {
      method: "GET",
      path: "/api/v1/users/:id/issue-auth-token",
      routeId: "api.users.issue-auth-token",
      plane: "control",
      category: "user_management",
      responsePolicy: "deny_credential_issuance",
      principalAccess: {},
    },
    [validApiKey, simpleSSOEnabled],
    async (_request, response) => {
      response.status(403).json({
        error: "API keys cannot issue user auth tokens.",
      });
    }
  )
);
```

Do **not** move authorization logic into `validApiKey.js`. That middleware should stay limited to principal resolution:

```js
response.locals.apiKey = apiKey;
response.locals.principal = principal;
next();
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:

```bash
npx jest --runInBand server/__tests__/privacy/unit/requireApiCapability.test.js server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js server/__tests__/privacy/unit/apiKeyScopes.test.js server/__tests__/utils/auth/principals.apiKeys.test.js
```

Expected: PASS.

Then run the nearby route suites to catch wiring regressions:

```bash
npx jest --runInBand server/__tests__/integration/apiConversationSecurity.test.js server/__tests__/integration/conversationSecurityRoutes.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add server/utils/middleware/requireApiCapability.js server/utils/privacy/routePolicy.js server/utils/middleware/validApiKey.js server/endpoints/api/system/index.js server/endpoints/api/admin/index.js server/endpoints/api/userManagement/index.js server/endpoints/api/workspace/index.js server/endpoints/api/workspaceThread/index.js server/__tests__/privacy/unit/requireApiCapability.test.js server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js
git commit -m "fix: enforce api key capabilities by route"
```

### Task 3: Replace Subset-Only Route Inventory Coverage

**Files:**
- Create: `server/test-support/privacy/routeInventory.js`
- Modify: `server/__tests__/privacy/static/routeInventory.test.js`
- Modify: `server/endpoints/api/system/index.js`
- Modify: `server/endpoints/api/admin/index.js`
- Modify: `server/endpoints/api/userManagement/index.js`
- Modify: `server/endpoints/api/workspace/index.js`
- Modify: `server/endpoints/api/workspaceThread/index.js`
- Modify: `server/endpoints/system.js`
- Modify: `server/endpoints/admin.js`
- Modify: `server/endpoints/workspaces.js`
- Modify: `server/endpoints/workspaceThreads.js`
- Modify: `server/endpoints/chat.js`
- Modify: `server/endpoints/document.js`

- [ ] **Step 1: Write the failing route inventory test**

Create `server/test-support/privacy/routeInventory.js`:

```js
function routeKey(route = {}) {
  return `${route.method} ${route.path}`;
}

const PRIVACY_ROUTE_PREFIXES = [
  "/api/admin",
  "/api/system",
  "/api/workspace",
  "/api/document",
  "/api/v1",
];

const ROUTE_POLICY_EXEMPTIONS = new Set([
  "GET /api/v1/system/env-dump",
  "GET /api/v1/system/vector-count",
  "POST /api/v1/system/update-env",
]);

function requiresPrivacyPolicy(route = {}) {
  return PRIVACY_ROUTE_PREFIXES.some((prefix) => route.path.startsWith(prefix));
}

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

Replace `server/__tests__/privacy/static/routeInventory.test.js` with:

```js
/* eslint-env jest */

const path = require("path");

describe("route inventory coverage", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.STORAGE_DIR =
      process.env.STORAGE_DIR ||
      path.resolve(__dirname, "../../../storage");
  });

  test("every privacy-managed route has explicit route policy metadata or an explicit exemption", () => {
    const { createApp } = require("../../../app");
    const { getDeclaredRoutePolicies } = require("../../../utils/privacy/routePolicy");
    const { listExpressRoutes } = require("../../../test-support/privacy/expressRoutes");
    const {
      routeKey,
      requiresPrivacyPolicy,
      isPolicyExempt,
    } = require("../../../test-support/privacy/routeInventory");

    const app = createApp({ enableWebSockets: false });
    const routes = listExpressRoutes(app);
    const policies = getDeclaredRoutePolicies();
    const policyMap = new Map(policies.map((policy) => [routeKey(policy), policy]));

    const managedRoutes = routes.filter(requiresPrivacyPolicy);
    const uncoveredRoutes = managedRoutes.filter(
      (route) => !policyMap.has(routeKey(route)) && !isPolicyExempt(route)
    );

    expect(uncoveredRoutes).toEqual([]);

    for (const policy of policies) {
      expect(
        managedRoutes.some((route) => routeKey(route) === routeKey(policy))
      ).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx jest --runInBand server/__tests__/privacy/static/routeInventory.test.js
```

Expected: FAIL with a list of currently uncovered `/api/v1/*` and other privacy-managed routes that still lack `withRoutePolicy(...)`.

- [ ] **Step 3: Add the missing policy metadata until the test passes**

For each uncovered route in the failure output, either add `withRoutePolicy(...)` or add a one-line exemption in `server/test-support/privacy/routeInventory.js` with a concrete reason rooted in route behavior.

Use this exact pattern when adding policy metadata:

```js
app.post(
  "/v1/admin/conversation-flags",
  ...withRoutePolicy(
    {
      method: "POST",
      path: "/api/v1/admin/conversation-flags",
      routeId: "api.admin.conversation-flags",
      plane: "control",
      category: "moderation",
      responsePolicy: "metadata_only",
      principalAccess: {
        management: ["management:metadata:read", "management:moderation:write"],
      },
    },
    [validApiKey],
    async (request, response) => {
      // existing handler body unchanged
    }
  )
);
```

Use this exact pattern when a route must remain exempt because it is not yet part of the privacy-managed surface:

```js
const ROUTE_POLICY_EXEMPTIONS = new Set([
  "GET /api/v1/system/env-dump",
  "GET /api/v1/system/vector-count",
  "POST /api/v1/system/update-env",
]);
```

Do **not** reintroduce a hand-maintained “Task 3” list. The test must inspect the live Express route table and compare it to the declared policies.

- [ ] **Step 4: Run the tests to verify they pass**

Run:

```bash
npx jest --runInBand server/__tests__/privacy/static/routeInventory.test.js server/__tests__/privacy/unit/requireApiCapability.test.js server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js
```

Expected: PASS.

Then run the privacy foundation test to make sure the new route metadata still coexists with the canary scanner:

```bash
npx jest --runInBand server/__tests__/privacy/integration/gauntletFoundation.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add server/test-support/privacy/routeInventory.js server/__tests__/privacy/static/routeInventory.test.js server/endpoints/api/system/index.js server/endpoints/api/admin/index.js server/endpoints/api/userManagement/index.js server/endpoints/api/workspace/index.js server/endpoints/api/workspaceThread/index.js server/endpoints/system.js server/endpoints/admin.js server/endpoints/workspaces.js server/endpoints/workspaceThreads.js server/endpoints/chat.js server/endpoints/document.js
git commit -m "test: enforce privacy route inventory coverage"
```

## Self-Review

### Spec Coverage

- Review finding 1, “API key scopes are never enforced on API routes”: covered by Task 2.
- Review finding 2, “API keys can still mint arbitrary user auth tokens”: covered by Task 2.
- Review finding 3, “route inventory test only covers a hard-coded subset”: covered by Task 3.
- Scope normalization required to make Task 2 reliable: covered by Task 1.

### Placeholder Scan

- No `TODO`, `TBD`, or “similar to Task N” references remain.
- Every implementation step includes concrete code or exact commands.
- Every test step includes an exact Jest command and expected result.

### Type Consistency

- Workspace-service scopes are consistently named `workspace:api_sessions:read` and `workspace:api_sessions:write` across Tasks 1 and 2.
- Route policy capability declarations use the same scope names as `resolveApiKeyPrincipal()` and `principalCan()`.
- The route inventory helper uses the same `routeKey()` shape as `routePolicy.js`.

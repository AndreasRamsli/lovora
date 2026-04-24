# API Key Impersonation Hard Denial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/api/v1/users/:id/issue-auth-token` permanently deny API keys so no API key can mint a login token for any user.

**Architecture:** Reuse the existing `/api/v1` route-policy stack instead of inventing a special case. The route should stay mounted for compatibility, but it must become an explicit `deny_credential_issuance` endpoint that rejects every API principal before any token issuance code can run. Back that with one unit test for the middleware deny message, one mocked integration test for the route, and one full-stack regression test that proves no temporary auth token row is created.

**Tech Stack:** Express, Jest, Supertest, Prisma/SQLite, existing privacy helpers in `server/utils/privacy`, API-key auth middleware in `server/utils/middleware`

---

## File Structure

- `server/utils/middleware/requireApiCapability.js`
  Purpose: Return the correct hard-denial message for `deny_credential_issuance` route policies.
- `server/endpoints/api/userManagement/index.js`
  Purpose: Keep `/api/v1/users` readable to scoped management keys, but convert `/api/v1/users/:id/issue-auth-token` into a permanent API-key denial route.
- `server/__tests__/privacy/unit/requireApiCapability.test.js`
  Purpose: Prove the middleware returns the impersonation-specific denial response.
- `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`
  Purpose: Prove mocked API keys cannot issue auth tokens and that `TemporaryAuthToken.issue(...)` is never invoked.
- `server/__tests__/integration/apiConversationSecurity.test.js`
  Purpose: Prove the live app denies the route and does not create a `temporary_auth_tokens` row.

### Task 1: Add the Middleware-Level Failing Test for Credential Issuance Denial

**Files:**
- Modify: `server/__tests__/privacy/unit/requireApiCapability.test.js`
- Modify: `server/utils/middleware/requireApiCapability.js`
- Test: `server/__tests__/privacy/unit/requireApiCapability.test.js`

- [ ] **Step 1: Add the failing unit test for `deny_credential_issuance` routes**

```js
test("returns the credential-issuance denial message for blocked api key routes", () => {
  const next = jest.fn();
  const response = createResponse(
    {
      responsePolicy: "deny_credential_issuance",
      principalAccess: {},
    },
    {
      kind: "management",
      scopes: ["management:users:read"],
    }
  );

  requireApiCapability({}, response, next);

  expect(next).not.toHaveBeenCalled();
  expect(response.status).toHaveBeenCalledWith(403);
  expect(response.json).toHaveBeenCalledWith({
    error: "API keys cannot issue user auth tokens.",
  });
});
```

- [ ] **Step 2: Run the unit test to verify it fails**

Run: `npx jest server/__tests__/privacy/unit/requireApiCapability.test.js --runInBand`

Expected: FAIL because the middleware still returns the generic `"API key cannot access this route."` response for a `deny_credential_issuance` policy.

- [ ] **Step 3: Implement the specific denial message in the middleware**

```js
// server/utils/middleware/requireApiCapability.js
const { principalCan } = require("../auth/principals");

function deny(response, message = "API key cannot access this route.") {
  return response.status(403).json({ error: message });
}

function capabilityDenyMessage(routePolicy = {}) {
  if (routePolicy?.responsePolicy === "deny_credential_issuance") {
    return "API keys cannot issue user auth tokens.";
  }

  return "API key cannot access this route.";
}

function requireApiCapability(_request, response, next) {
  const routePolicy = response?.locals?.routePolicy || null;
  const apiKey = response?.locals?.apiKey || null;
  const principal = response?.locals?.principal || null;

  if (!apiKey || !routePolicy?.principalAccess) {
    next();
    return;
  }

  const requiredCapabilities = routePolicy.principalAccess[principal?.kind] || null;
  if (!requiredCapabilities) {
    deny(response, capabilityDenyMessage(routePolicy));
    return;
  }

  const missingCapability = requiredCapabilities.find(
    (capability) => !principalCan(principal, capability)
  );

  if (missingCapability) {
    deny(response, capabilityDenyMessage(routePolicy));
    return;
  }

  next();
}

module.exports = {
  requireApiCapability,
};
```

- [ ] **Step 4: Run the unit test to verify it passes**

Run: `npx jest server/__tests__/privacy/unit/requireApiCapability.test.js --runInBand`

Expected: PASS

- [ ] **Step 5: Commit the middleware hard-denial behavior**

```bash
git add server/utils/middleware/requireApiCapability.js \
  server/__tests__/privacy/unit/requireApiCapability.test.js
git commit -m "test: harden api key credential issuance denial message"
```

### Task 2: Add the Mocked Route Regression and Convert the Endpoint to a Hard Denial

**Files:**
- Modify: `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`
- Modify: `server/endpoints/api/userManagement/index.js`
- Test: `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`

- [ ] **Step 1: Add the failing mocked integration test**

Add this test near the existing API-key user-management assertions:

```js
test("management keys cannot issue user auth tokens", async () => {
  process.env.SIMPLE_SSO_ENABLED = "true";
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
  expect(
    require("../../../models/temporaryAuthToken").TemporaryAuthToken.issue
  ).not.toHaveBeenCalled();
});
```

- [ ] **Step 2: Run the mocked integration test to verify it fails**

Run: `npx jest server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js --runInBand`

Expected: FAIL because the route still allows the request through or still reaches token issuance code.

- [ ] **Step 3: Replace the impersonation route with an explicit policy-based hard denial**

Keep `GET /api/v1/users` unchanged. Replace only the impersonation route with this exact block:

```js
// server/endpoints/api/userManagement/index.js
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
      /*
      #swagger.tags = ['User Management']
      #swagger.description = 'Issue a temporary auth token for a user'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'The ID of the user to issue a temporary auth token for',
        required: true,
        type: 'string'
      }
      #swagger.responses[403] = {
        schema: {
          "$ref": "#/definitions/InvalidAPIKey"
        }
      }
      */
      response.status(403).json({
        error: "API keys cannot issue user auth tokens.",
      });
    }
  )
);
```

If the file still imports `TemporaryAuthToken`, remove that import entirely. The API route must not call `TemporaryAuthToken.issue(...)` anymore.

- [ ] **Step 4: Run the mocked integration test to verify it passes**

Run: `npx jest server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js --runInBand`

Expected: PASS

- [ ] **Step 5: Commit the route hard denial**

```bash
git add server/endpoints/api/userManagement/index.js \
  server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js
git commit -m "fix: hard-deny api key auth token issuance"
```

### Task 3: Add the Full-Stack Regression That No Temporary Auth Token Row Is Created

**Files:**
- Modify: `server/__tests__/integration/apiConversationSecurity.test.js`
- Test: `server/__tests__/integration/apiConversationSecurity.test.js`

- [ ] **Step 1: Add the failing full-stack regression**

Add this test near the existing API-key security contract tests:

```js
test("API keys cannot mint delegated user login tokens", async () => {
  process.env.SIMPLE_SSO_ENABLED = "true";
  try {
    const beforeCount = await prisma.temporary_auth_tokens.count({
      where: { userId: fixtures.users.member.id },
    });

    const response = await request(app)
      .get(`/api/v1/users/${fixtures.users.member.id}/issue-auth-token`)
      .set("Authorization", fixtures.auth.apiKey);

    const afterCount = await prisma.temporary_auth_tokens.count({
      where: { userId: fixtures.users.member.id },
    });

    expect(response.status).toBe(403);
    expect(response.text || JSON.stringify(response.body)).toContain(
      "cannot issue user auth tokens"
    );
    expect(afterCount).toBe(beforeCount);
  } finally {
    delete process.env.SIMPLE_SSO_ENABLED;
  }
});
```

- [ ] **Step 2: Run the full-stack regression to verify it fails**

Run: `npx jest server/__tests__/integration/apiConversationSecurity.test.js --runInBand`

Expected: FAIL because the live app still issues a token or inserts into `temporary_auth_tokens`.

- [ ] **Step 3: If the test still fails, re-open `server/endpoints/api/userManagement/index.js` and remove any remaining token issuance path**

The final route implementation must still match this shape exactly:

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

- [ ] **Step 4: Run the full-stack regression to verify it passes**

Run: `npx jest server/__tests__/integration/apiConversationSecurity.test.js --runInBand`

Expected: PASS

- [ ] **Step 5: Commit the live-route regression**

```bash
git add server/__tests__/integration/apiConversationSecurity.test.js
git commit -m "test: lock down api key impersonation route"
```

### Task 4: Run the Focused Verification Suite

**Files:**
- Test: `server/__tests__/privacy/unit/requireApiCapability.test.js`
- Test: `server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js`
- Test: `server/__tests__/integration/apiConversationSecurity.test.js`

- [ ] **Step 1: Run the focused suite**

Run: `npx jest server/__tests__/privacy/unit/requireApiCapability.test.js server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js server/__tests__/integration/apiConversationSecurity.test.js --runInBand`

Expected: PASS

- [ ] **Step 2: Commit the final verification checkpoint**

```bash
git add server/__tests__/privacy/unit/requireApiCapability.test.js \
  server/__tests__/privacy/integration/apiKeyCapabilityEnforcement.test.js \
  server/__tests__/integration/apiConversationSecurity.test.js \
  server/endpoints/api/userManagement/index.js \
  server/utils/middleware/requireApiCapability.js
git commit -m "test: verify api keys cannot impersonate users"
```

## Self-Review

- Spec coverage:
  - API keys must never mint user login tokens: covered in Tasks 2 and 3.
  - Denial must happen through the route-policy stack, not a hidden side path: covered in Tasks 1 and 2.
  - Regression coverage at both mocked and live-app levels: covered in Tasks 2, 3, and 4.
- Placeholder scan:
  - No `TODO`, `TBD`, or “similar to above” instructions remain.
  - Every code-changing step includes exact code.
- Type consistency:
  - The plan consistently uses `withRoutePolicy(...)`, `validApiKey`, `simpleSSOEnabled`, `deny_credential_issuance`, and `TemporaryAuthToken.issue`.
  - The denial message is consistent everywhere: `"API keys cannot issue user auth tokens."`

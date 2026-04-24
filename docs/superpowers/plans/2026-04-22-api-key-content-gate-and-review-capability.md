# API Key Content Gate And Review Capability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent management API keys from reaching raw API-session chat content and make the flagged-review queue render only actions that the backend review policy actually allows.

**Architecture:** This fix has two linked tracks. First, API keys become typed principals so raw `/api/v1/workspace/:slug/chat` and `/stream-chat` routes can require a workspace-bound `workspace_service` principal while management keys stay in the metadata/control plane. Second, the moderation queue stops inferring reviewability from `status === "open"` and instead consumes a backend-owned `reviewAvailable` capability derived from the same review policy that guards `/system/conversation-flags/:id/review`, while review itself remains metadata-only for both user and API-session flags.

**Tech Stack:** Node.js, Express, Prisma with SQLite, Jest, Supertest, React, Vite

---

## File Structure

- Modify: `server/prisma/schema.prisma`
  - Adds typed API-key fields (`name`, `principalType`, `workspaceId`, `scopes`) without changing existing chat tables.
- Create: `server/prisma/migrations/20260422193000_api_key_principals/migration.sql`
  - Applies the SQLite column additions and backfills legacy keys to `management`.
- Modify: `server/models/apiKeys.js`
  - Owns API-key persistence, validation, creation defaults, and hydrated list output for admin/system screens.
- Modify: `server/utils/auth/principals.js`
  - Resolves `management` versus `workspace_service` principals and defines the content-plane guard helpers.
- Modify: `server/utils/middleware/validApiKey.js`
  - Loads the typed key record and exposes the resolved principal on `response.locals`.
- Modify: `server/endpoints/admin.js`
  - Accepts typed key creation payloads and returns typed key metadata in multi-user mode.
- Modify: `server/endpoints/system.js`
  - Accepts typed key creation payloads and returns typed key metadata in single-user mode.
- Modify: `server/endpoints/api/workspace/index.js`
  - Enforces that raw API-session chat routes require a workspace-bound service principal.
- Modify: `server/models/conversationFlags.js`
  - Expands metadata DTOs with `reviewAvailable` and removes the `userId !== null` restriction from metadata-only review.
- Modify: `server/repositories/chatMetadataRepository.js`
  - Passes the acting reviewer principal through to the moderation metadata builders.
- Modify: `server/test-support/securityHarness.js`
  - Seeds both a legacy/management key and a workspace-service key for integration coverage.
- Modify: `server/__tests__/integration/apiConversationSecurity.test.js`
  - Locks down management-key denial and workspace-service access to raw API chat routes.
- Modify: `server/__tests__/integration/conversationSecurityRoutes.test.js`
  - Locks down metadata-only review behavior for API-session flags and queue capability fields.
- Modify: `server/__tests__/models/conversationFlags.test.js`
  - Covers `reviewAvailable` DTO behavior and the updated metadata-review permission logic.
- Modify: `frontend/src/models/admin.js`
  - Sends typed API-key creation payloads and fetches workspaces for the modal in multi-user mode.
- Modify: `frontend/src/models/system.js`
  - Sends typed API-key creation payloads, fetches workspaces for the modal in single-user mode, and consumes `reviewAvailable`.
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/index.jsx`
  - Displays API-key type and workspace binding columns.
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/NewApiKeyModal/index.jsx`
  - Captures `principalType`, `workspaceId`, and optional display name.
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/ApiKeyRow/index.jsx`
  - Renders the typed API-key summary safely.
- Create: `frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.js`
  - Small pure helper for payload building and label formatting so the UI changes stay testable.
- Create: `frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js`
  - Unit coverage for the API-key modal serialization rules.
- Modify: `frontend/src/pages/GeneralSettings/Chats/index.jsx`
  - Uses `reviewAvailable` and a presentational helper instead of hard-coding `status === "open"`.
- Create: `frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.js`
  - Pure helper for the review-button state and copy.
- Create: `frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js`
  - Unit coverage for queue presentation logic.

Keep this plan narrow:
- Do not redesign the whole auth stack.
- Do not introduce per-session key families in this pass.
- Do not reintroduce raw content to moderation views.
- Do not add admin-only bypasses for chat content.

### Task 1: Lock In Typed API-Key Principal Semantics

**Files:**
- Create: `server/__tests__/utils/auth/principals.apiKeys.test.js`
- Modify: `server/utils/auth/principals.js`

- [ ] **Step 1: Write the failing principal-resolution test**

Create `server/__tests__/utils/auth/principals.apiKeys.test.js`:

```js
const {
  resolveApiKeyPrincipal,
  principalCan,
  isWorkspaceServicePrincipal,
} = require("../../../utils/auth/principals");

describe("api key principal resolution", () => {
  test("resolves a management key into a metadata-only principal", () => {
    const principal = resolveApiKeyPrincipal({
      id: 10,
      createdBy: 9,
      principalType: "management",
      workspaceId: null,
      scopes: JSON.stringify([
        "management:metadata:read",
        "management:moderation:write",
      ]),
    });

    expect(principal).toEqual({
      kind: "management",
      apiKeyId: 10,
      createdByUserId: 9,
      workspaceId: null,
      scopes: ["management:metadata:read", "management:moderation:write"],
    });
    expect(principalCan(principal, "management:metadata:read")).toBe(true);
    expect(isWorkspaceServicePrincipal(principal)).toBe(false);
  });

  test("resolves a workspace service key into a content-capable principal", () => {
    const principal = resolveApiKeyPrincipal({
      id: 22,
      createdBy: 3,
      principalType: "workspace_service",
      workspaceId: 41,
      scopes: JSON.stringify([
        "workspace:chat:read",
        "workspace:chat:write",
      ]),
    });

    expect(principal).toEqual({
      kind: "workspace_service",
      apiKeyId: 22,
      createdByUserId: 3,
      workspaceId: 41,
      scopes: ["workspace:chat:read", "workspace:chat:write"],
    });
    expect(principalCan(principal, "workspace:chat:write")).toBe(true);
    expect(isWorkspaceServicePrincipal(principal, 41)).toBe(true);
    expect(isWorkspaceServicePrincipal(principal, 99)).toBe(false);
  });
});
```

- [ ] **Step 2: Run the new test to verify it fails**

Run:

```bash
npx jest server/__tests__/utils/auth/principals.apiKeys.test.js --runInBand
```

Expected: FAIL because `resolveApiKeyPrincipal()` currently always returns `kind: "management"` and `isWorkspaceServicePrincipal()` does not exist yet.

- [ ] **Step 3: Implement typed API-key principal helpers**

Update `server/utils/auth/principals.js`:

```js
const { safeJsonParse } = require("../http");

function parseScopes(value = null, fallback = []) {
  if (Array.isArray(value)) return value.map(String);
  return safeJsonParse(value, fallback).map(String);
}

function resolveApiKeyPrincipal(apiKey = null) {
  if (!apiKey?.id) return null;

  const principalType = String(apiKey.principalType || "management");
  const workspaceId = apiKey.workspaceId ? Number(apiKey.workspaceId) : null;
  const createdByUserId = apiKey.createdBy ? Number(apiKey.createdBy) : null;

  if (principalType === "workspace_service") {
    return {
      kind: "workspace_service",
      apiKeyId: Number(apiKey.id),
      createdByUserId,
      workspaceId,
      scopes: parseScopes(apiKey.scopes, [
        "workspace:chat:read",
        "workspace:chat:write",
      ]),
    };
  }

  return {
    kind: "management",
    apiKeyId: Number(apiKey.id),
    createdByUserId,
    workspaceId: null,
    scopes: parseScopes(apiKey.scopes, [
      "management:metadata:read",
      "management:moderation:write",
      "management:users:read",
    ]),
  };
}

function principalCan(principal = null, capability = "") {
  if (!principal || !capability) return false;
  return Array.isArray(principal.scopes) && principal.scopes.includes(capability);
}

function isWorkspaceServicePrincipal(principal = null, workspaceId = null) {
  if (principal?.kind !== "workspace_service") return false;
  if (workspaceId === null) return true;
  return Number(principal.workspaceId) === Number(workspaceId);
}

module.exports = {
  resolveSessionPrincipal,
  resolveApiKeyPrincipal,
  principalCan,
  hasOversightRole,
  isContentPrincipal,
  canReadChatContent,
  canReviewFlagMetadata,
  isWorkspaceServicePrincipal,
};
```

- [ ] **Step 4: Re-run the principal test**

Run:

```bash
npx jest server/__tests__/utils/auth/principals.apiKeys.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/utils/auth/principals.apiKeys.test.js
  api key principal resolution
    ✓ resolves a management key into a metadata-only principal
    ✓ resolves a workspace service key into a content-capable principal
```

- [ ] **Step 5: Commit the principal helper contract**

```bash
git add server/__tests__/utils/auth/principals.apiKeys.test.js server/utils/auth/principals.js
git commit -m "test: define typed api key principals"
```

### Task 2: Add Typed API-Key Storage And Backend Creation/List Endpoints

**Files:**
- Modify: `server/prisma/schema.prisma`
- Create: `server/prisma/migrations/20260422193000_api_key_principals/migration.sql`
- Modify: `server/models/apiKeys.js`
- Modify: `server/utils/middleware/validApiKey.js`
- Modify: `server/endpoints/admin.js`
- Modify: `server/endpoints/system.js`

- [ ] **Step 1: Write the failing backend contract test**

Append this test to `server/__tests__/integration/apiConversationSecurity.test.js`:

```js
test("api key management endpoints create and list typed keys", async () => {
  const createResponse = await request(app)
    .post("/admin/generate-api-key")
    .set("Authorization", fixtures.auth.admin)
    .send({
      name: "Workspace Service Key",
      principalType: "workspace_service",
      workspaceId: fixtures.workspaces.assignedWorkspace.id,
    });

  expect(createResponse.status).toBe(200);
  expect(createResponse.body.apiKey).toMatchObject({
    name: "Workspace Service Key",
    principalType: "workspace_service",
    workspaceId: fixtures.workspaces.assignedWorkspace.id,
  });

  const listResponse = await request(app)
    .get("/admin/api-keys")
    .set("Authorization", fixtures.auth.admin);

  expect(listResponse.status).toBe(200);
  expect(listResponse.body.apiKeys).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: "Workspace Service Key",
        principalType: "workspace_service",
        workspaceId: fixtures.workspaces.assignedWorkspace.id,
        workspace: expect.objectContaining({
          id: fixtures.workspaces.assignedWorkspace.id,
          slug: fixtures.workspaces.assignedWorkspace.slug,
        }),
      }),
    ])
  );
});
```

- [ ] **Step 2: Run the contract test to verify it fails**

Run:

```bash
npx jest server/__tests__/integration/apiConversationSecurity.test.js --runInBand
```

Expected: FAIL because `api_keys` rows do not yet store `principalType`, `workspaceId`, or `name`, and `/admin/generate-api-key` currently ignores the request body.

- [ ] **Step 3: Add the Prisma fields and migration**

Update `server/prisma/schema.prisma`:

```prisma
model api_keys {
  id            Int      @id @default(autoincrement())
  secret        String?  @unique
  name          String?
  principalType String   @default("management")
  workspaceId   Int?
  scopes        String?
  createdBy     Int?
  createdAt     DateTime @default(now())
  lastUpdatedAt DateTime @default(now())
}
```

Create `server/prisma/migrations/20260422193000_api_key_principals/migration.sql`:

```sql
ALTER TABLE "api_keys" ADD COLUMN "name" TEXT;
ALTER TABLE "api_keys" ADD COLUMN "principalType" TEXT NOT NULL DEFAULT 'management';
ALTER TABLE "api_keys" ADD COLUMN "workspaceId" INTEGER;
ALTER TABLE "api_keys" ADD COLUMN "scopes" TEXT;

UPDATE "api_keys"
SET
  "principalType" = 'management',
  "scopes" = '["management:metadata:read","management:moderation:write","management:users:read"]'
WHERE "principalType" IS NULL OR "principalType" = '';

CREATE INDEX "api_keys_principalType_idx" ON "api_keys"("principalType");
CREATE INDEX "api_keys_workspaceId_idx" ON "api_keys"("workspaceId");
```

- [ ] **Step 4: Implement typed key persistence and creation endpoints**

Update `server/models/apiKeys.js`:

```js
const prisma = require("../utils/prisma");
const { safeJsonParse } = require("../utils/http");
const { Workspace } = require("./workspace");

function defaultScopesFor(principalType = "management") {
  if (principalType === "workspace_service") {
    return ["workspace:chat:read", "workspace:chat:write"];
  }

  return [
    "management:metadata:read",
    "management:moderation:write",
    "management:users:read",
  ];
}

async function hydrateWorkspace(workspaceId = null) {
  if (!workspaceId) return null;
  const workspace = await Workspace.get({ id: Number(workspaceId) });
  if (!workspace) return null;
  return {
    id: workspace.id,
    name: workspace.name,
    slug: workspace.slug,
  };
}

const ApiKey = {
  tablename: "api_keys",
  writable: ["name", "principalType", "workspaceId", "scopes"],

  create: async function (createdByUserId = null, attributes = {}) {
    const principalType = String(attributes.principalType || "management");
    const workspaceId =
      principalType === "workspace_service" && attributes.workspaceId
        ? Number(attributes.workspaceId)
        : null;
    const scopes = defaultScopesFor(principalType);

    const apiKey = await prisma.api_keys.create({
      data: {
        secret: this.makeSecret(),
        name: attributes.name ? String(attributes.name).trim() : null,
        principalType,
        workspaceId,
        scopes: JSON.stringify(scopes),
        createdBy: createdByUserId,
      },
    });

    return {
      apiKey: {
        ...apiKey,
        scopes,
        workspace: await hydrateWorkspace(workspaceId),
      },
      error: null,
    };
  },

  whereWithUser: async function (clause = {}, limit) {
    const { User } = require("./user");
    const apiKeys = await this.where(clause, limit);

    for (const apiKey of apiKeys) {
      apiKey.scopes = safeJsonParse(apiKey.scopes, []);
      apiKey.workspace = await hydrateWorkspace(apiKey.workspaceId);
      if (!apiKey.createdBy) continue;
      const user = await User.get({ id: apiKey.createdBy });
      if (!user) continue;
      apiKey.createdBy = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
    }

    return apiKeys;
  },
};
```

Update the create/list endpoints in `server/endpoints/admin.js` and `server/endpoints/system.js`:

```js
app.get("/admin/api-key-workspaces", [validatedRequest], async (_request, response) => {
  const workspaces = await Workspace.where({}, null, null);
  return response.status(200).json({
    workspaces: workspaces.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
    })),
  });
});

app.post("/admin/generate-api-key", [validatedRequest], async (request, response) => {
  const user = await userFromSession(request, response);
  const { name = "", principalType = "management", workspaceId = null } = reqBody(request);
  const { apiKey, error } = await ApiKey.create(user.id, {
    name,
    principalType,
    workspaceId,
  });
  return response.status(200).json({ apiKey, error });
});

app.get("/admin/api-keys", [validatedRequest], async (_request, response) => {
  const apiKeys = await ApiKey.whereWithUser({});
  return response.status(200).json({ apiKeys, error: null });
});
```

Mirror the same contract in `system.js`, but keep the existing single-user `401` guard:

```js
app.get("/system/api-key-workspaces", [validatedRequest], async (_request, response) => {
  if (response.locals.multiUserMode) {
    return response.sendStatus(401).end();
  }

  const workspaces = await Workspace.where({}, null, null);
  return response.status(200).json({
    workspaces: workspaces.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      slug: workspace.slug,
    })),
  });
});

app.post("/system/generate-api-key", [validatedRequest], async (request, response) => {
  if (response.locals.multiUserMode) {
    return response.sendStatus(401).end();
  }

  const { name = "", principalType = "management", workspaceId = null } = reqBody(request);
  const { apiKey, error } = await ApiKey.create(response?.locals?.user?.id, {
    name,
    principalType,
    workspaceId,
  });

  return response.status(200).json({ apiKey, error });
});
```

Update `server/utils/middleware/validApiKey.js` only to continue loading the full typed record:

```js
response.locals.apiKey = apiKey;
response.locals.principal = resolveApiKeyPrincipal(apiKey);
```

- [ ] **Step 5: Re-run the backend contract test**

Run:

```bash
npx jest server/__tests__/integration/apiConversationSecurity.test.js --runInBand
```

Expected: PASS for `api key management endpoints create and list typed keys`, while the existing management-key chat tests still pass or remain unchanged.

- [ ] **Step 6: Commit the backend typed-key support**

```bash
git add server/prisma/schema.prisma server/prisma/migrations/20260422193000_api_key_principals/migration.sql server/models/apiKeys.js server/utils/middleware/validApiKey.js server/endpoints/admin.js server/endpoints/system.js server/__tests__/integration/apiConversationSecurity.test.js
git commit -m "feat: add typed api key storage"
```

### Task 3: Add API-Key UI Support For Workspace Service Keys

**Files:**
- Create: `frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.js`
- Create: `frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js`
- Modify: `frontend/src/models/admin.js`
- Modify: `frontend/src/models/system.js`
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/index.jsx`
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/NewApiKeyModal/index.jsx`
- Modify: `frontend/src/pages/GeneralSettings/ApiKeys/ApiKeyRow/index.jsx`

- [ ] **Step 1: Write the failing frontend helper test**

Create `frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js`:

```js
import { describe, expect, test } from "@jest/globals";
import {
  buildCreateApiKeyPayload,
  describeApiKeyBinding,
} from "./apiKeyFormState.js";

describe("apiKeyFormState", () => {
  test("serializes workspace service keys with a numeric workspaceId", () => {
    expect(
      buildCreateApiKeyPayload({
        name: "Case Intake",
        principalType: "workspace_service",
        workspaceId: "7",
      })
    ).toEqual({
      name: "Case Intake",
      principalType: "workspace_service",
      workspaceId: 7,
    });
  });

  test("serializes management keys without a workspace binding", () => {
    expect(
      buildCreateApiKeyPayload({
        name: "Ops",
        principalType: "management",
        workspaceId: "9",
      })
    ).toEqual({
      name: "Ops",
      principalType: "management",
      workspaceId: null,
    });
  });

  test("formats the binding label for the table row", () => {
    expect(
      describeApiKeyBinding({
        principalType: "workspace_service",
        workspace: { name: "Assigned Workspace" },
      })
    ).toBe("Workspace service · Assigned Workspace");
  });
});
```

- [ ] **Step 2: Run the frontend helper test to verify it fails**

Run:

```bash
NODE_OPTIONS="--disable-warning=DEP0040 --experimental-vm-modules" npx jest frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js --runInBand
```

Expected: FAIL because `apiKeyFormState.js` does not exist yet.

- [ ] **Step 3: Implement the helper and wire the API-key screens**

Create `frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.js`:

```js
export function buildCreateApiKeyPayload(form = {}) {
  const principalType = form.principalType === "workspace_service"
    ? "workspace_service"
    : "management";

  return {
    name: String(form.name || "").trim(),
    principalType,
    workspaceId:
      principalType === "workspace_service" && form.workspaceId
        ? Number(form.workspaceId)
        : null,
  };
}

export function describeApiKeyBinding(apiKey = {}) {
  if (apiKey.principalType === "workspace_service") {
    return `Workspace service · ${apiKey.workspace?.name || "Unbound workspace"}`;
  }

  return "Management · Metadata only";
}
```

Update `frontend/src/models/admin.js` and `frontend/src/models/system.js`:

```js
getApiKeyWorkspaces: async function () {
  return fetch(`${API_BASE}/admin/api-key-workspaces`, {
    method: "GET",
    headers: baseHeaders(),
  })
    .then((res) => res.json())
    .then((res) => res?.workspaces || [])
    .catch(() => []);
},

generateApiKey: async function (payload = {}) {
  return fetch(`${API_BASE}/admin/generate-api-key`, {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => res.json());
},
```

Use the same frontend method names in `frontend/src/models/system.js`, but point them at the single-user endpoints:

```js
getApiKeyWorkspaces: async function () {
  return fetch(`${API_BASE}/system/api-key-workspaces`, {
    method: "GET",
    headers: baseHeaders(),
  })
    .then((res) => res.json())
    .then((res) => res?.workspaces || [])
    .catch(() => []);
},

generateApiKey: async function (payload = {}) {
  return fetch(`${API_BASE}/system/generate-api-key`, {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify(payload),
  }).then((res) => res.json());
},
```

Update `frontend/src/pages/GeneralSettings/ApiKeys/NewApiKeyModal/index.jsx`:

```jsx
const [formState, setFormState] = useState({
  name: "",
  principalType: "management",
  workspaceId: "",
});
const [workspaces, setWorkspaces] = useState([]);

useEffect(() => {
  const user = userFromStorage();
  const Model = !!user ? Admin : System;
  Model.getApiKeyWorkspaces().then(setWorkspaces);
}, []);

const { apiKey: newApiKey, error } = await Model.generateApiKey(
  buildCreateApiKeyPayload(formState)
);
```

Render these inputs inside the modal:

```jsx
<input
  value={formState.name}
  onChange={(event) =>
    setFormState((current) => ({ ...current, name: event.target.value }))
  }
/>

<select
  value={formState.principalType}
  onChange={(event) =>
    setFormState((current) => ({
      ...current,
      principalType: event.target.value,
      workspaceId:
        event.target.value === "workspace_service" ? current.workspaceId : "",
    }))
  }
>
  <option value="management">Management</option>
  <option value="workspace_service">Workspace service</option>
</select>

{formState.principalType === "workspace_service" ? (
  <select
    value={formState.workspaceId}
    onChange={(event) =>
      setFormState((current) => ({
        ...current,
        workspaceId: event.target.value,
      }))
    }
  >
    <option value="">Select workspace</option>
    {workspaces.map((workspace) => (
      <option key={workspace.id} value={workspace.id}>
        {workspace.name}
      </option>
    ))}
  </select>
) : null}
```

Update `frontend/src/pages/GeneralSettings/ApiKeys/index.jsx` and `ApiKeyRow/index.jsx` to add a `Type / Binding` column:

```jsx
<th scope="col" className="px-6 py-3">
  Type / Binding
</th>
```

```jsx
<td className="px-6 text-left">{describeApiKeyBinding(apiKey)}</td>
```

- [ ] **Step 4: Re-run the frontend helper test**

Run:

```bash
NODE_OPTIONS="--disable-warning=DEP0040 --experimental-vm-modules" npx jest frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js --runInBand
```

Expected:

```text
PASS frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js
  apiKeyFormState
    ✓ serializes workspace service keys with a numeric workspaceId
    ✓ serializes management keys without a workspace binding
    ✓ formats the binding label for the table row
```

- [ ] **Step 5: Commit the API-key UI support**

```bash
git add frontend/src/models/admin.js frontend/src/models/system.js frontend/src/pages/GeneralSettings/ApiKeys/index.jsx frontend/src/pages/GeneralSettings/ApiKeys/NewApiKeyModal/index.jsx frontend/src/pages/GeneralSettings/ApiKeys/ApiKeyRow/index.jsx frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.js frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js
git commit -m "feat: support workspace service api keys in settings"
```

### Task 4: Restrict Raw API Chat Routes To Workspace Service Keys

**Files:**
- Modify: `server/test-support/securityHarness.js`
- Modify: `server/endpoints/api/workspace/index.js`
- Modify: `server/__tests__/integration/apiConversationSecurity.test.js`

- [ ] **Step 1: Write the failing route-guard test**

Replace the raw API chat coverage in `server/__tests__/integration/apiConversationSecurity.test.js` with this targeted pair:

```js
test("management keys cannot call raw workspace chat routes", async () => {
  const [chatResponse, streamResponse] = await Promise.all([
    request(app)
      .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chat`)
      .set("Authorization", fixtures.auth.managementApiKey)
      .send({
        message: "summarize this case",
        mode: "chat",
        sessionId: "mgmt-session-1",
      }),
    request(app)
      .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/stream-chat`)
      .set("Authorization", fixtures.auth.managementApiKey)
      .send({
        message: "summarize this case",
        mode: "chat",
        sessionId: "mgmt-session-1",
      }),
  ]);

  for (const response of [chatResponse, streamResponse]) {
    expect(response.status).toBe(403);
    expect(response.text || JSON.stringify(response.body)).toContain(
      "workspace service api key"
    );
  }
});

test("workspace service keys can call raw workspace chat routes only for their bound workspace", async () => {
  const allowed = await request(app)
    .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chat`)
    .set("Authorization", fixtures.auth.workspaceServiceApiKey)
    .send({
      message: "summarize this case",
      mode: "chat",
      sessionId: "service-session-1",
    });

  const denied = await request(app)
    .post(`/api/v1/workspace/${fixtures.workspaces.unassignedWorkspace.slug}/chat`)
    .set("Authorization", fixtures.auth.workspaceServiceApiKey)
    .send({
      message: "summarize this case",
      mode: "chat",
      sessionId: "service-session-1",
    });

  expect(allowed.status).toBe(200);
  expect(allowed.body).toHaveProperty("textResponse");
  expect(denied.status).toBe(403);
});
```

- [ ] **Step 2: Seed both key classes in the security harness and verify the test fails**

Update the key fixture section in `server/test-support/securityHarness.js`:

```js
  const [managementApiKey, workspaceServiceApiKey] = await Promise.all([
    prisma.api_keys.create({
      data: {
        secret: "management-api-key",
        createdBy: apiKeyOwner.id,
        principalType: "management",
        scopes: JSON.stringify([
          "management:metadata:read",
          "management:moderation:write",
          "management:users:read",
        ]),
      },
    }),
    prisma.api_keys.create({
      data: {
        secret: "workspace-service-key",
        createdBy: apiKeyOwner.id,
        principalType: "workspace_service",
        workspaceId: assignedWorkspace.id,
        scopes: JSON.stringify([
          "workspace:chat:read",
          "workspace:chat:write",
        ]),
      },
    }),
  ]);
```

Expose them in the returned fixtures:

```js
auth: {
  managementApiKey: "Bearer management-api-key",
  workspaceServiceApiKey: "Bearer workspace-service-key",
  admin: `Bearer ${makeJWT({ id: admin.id, username: admin.username })}`,
},
```

Run:

```bash
npx jest server/__tests__/integration/apiConversationSecurity.test.js --runInBand
```

Expected: FAIL because the raw chat routes still accept the management key.

- [ ] **Step 3: Add the workspace-service guard to the raw chat routes**

At the top of `server/endpoints/api/workspace/index.js`, import the helper:

```js
const {
  isWorkspaceServicePrincipal,
} = require("../../../utils/auth/principals");
```

Add this local guard:

```js
function requireWorkspaceServicePrincipal(response, principal, workspace) {
  if (!isWorkspaceServicePrincipal(principal, workspace.id)) {
    response.status(403).json({
      error: "This route requires a workspace service api key bound to the target workspace.",
    });
    return false;
  }

  if (!principal.scopes.includes("workspace:chat:write")) {
    response.status(403).json({
      error: "This api key is missing workspace chat scope.",
    });
    return false;
  }

  return true;
}
```

Use it in both `/v1/workspace/:slug/chat` and `/v1/workspace/:slug/stream-chat` right after the workspace lookup:

```js
const principal = response.locals.principal;
if (!requireWorkspaceServicePrincipal(response, principal, workspace)) {
  return;
}
```

- [ ] **Step 4: Re-run the integration test**

Run:

```bash
npx jest server/__tests__/integration/apiConversationSecurity.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/integration/apiConversationSecurity.test.js
  api conversation security contracts
    ✓ management keys cannot call raw workspace chat routes
    ✓ workspace service keys can call raw workspace chat routes only for their bound workspace
```

- [ ] **Step 5: Commit the content-plane route lock**

```bash
git add server/test-support/securityHarness.js server/endpoints/api/workspace/index.js server/__tests__/integration/apiConversationSecurity.test.js
git commit -m "fix: require workspace service keys for raw api chat"
```

### Task 5: Make Moderation Review Capability Server-Driven And Metadata-Only

**Files:**
- Modify: `server/models/conversationFlags.js`
- Modify: `server/repositories/chatMetadataRepository.js`
- Modify: `server/utils/auth/principals.js`
- Modify: `server/endpoints/system.js`
- Modify: `server/__tests__/models/conversationFlags.test.js`
- Modify: `server/__tests__/integration/conversationSecurityRoutes.test.js`

- [ ] **Step 1: Write the failing moderation capability tests**

Append this DTO test to `server/__tests__/models/conversationFlags.test.js`:

```js
test("listReviewCases marks api-session flags as reviewable metadata cases", async () => {
  const cases = await ConversationFlags.listReviewCases({
    actor: { id: fixtures.users.admin.id, role: "admin" },
    status: "open",
    limit: 20,
    offset: 0,
  });

  const apiSessionCase = cases.find(
    (reviewCase) => reviewCase.sourceType === "api_session"
  );

  expect(apiSessionCase).toBeTruthy();
  expect(apiSessionCase.reviewAvailable).toBe(true);
});
```

Append this route test to `server/__tests__/integration/conversationSecurityRoutes.test.js`:

```js
test("api-session flags stay reviewable through the metadata-only review endpoint", async () => {
  const queueResponse = await request(app)
    .post("/system/conversation-flags")
    .set("Authorization", fixtures.auth.admin)
    .send({ status: "open", offset: 0, limit: 20 });

  const apiSessionCase = queueResponse.body.flags.find(
    (flag) => flag.sourceType === "api_session"
  );

  expect(apiSessionCase.reviewAvailable).toBe(true);

  const reviewResponse = await request(app)
    .get(`/system/conversation-flags/${apiSessionCase.id}/review`)
    .set("Authorization", fixtures.auth.admin);

  expect(reviewResponse.status).toBe(200);
  expect(JSON.stringify(reviewResponse.body.review)).not.toContain("prompt");
  expect(JSON.stringify(reviewResponse.body.review)).not.toContain("response");
});
```

- [ ] **Step 2: Run the moderation tests to verify they fail**

Run:

```bash
npx jest server/__tests__/models/conversationFlags.test.js server/__tests__/integration/conversationSecurityRoutes.test.js --runInBand
```

Expected: FAIL because `canReviewFlagMetadata()` currently returns `false` when `flag.userId === null`, so API-session flags do not expose `reviewAvailable` and `/review` returns `404`.

- [ ] **Step 3: Implement the server-driven capability contract**

Update `server/utils/auth/principals.js`:

```js
function canReviewFlagMetadata(principal = null, flag = null) {
  if (!flag || flag.status !== "open") return false;
  return hasOversightRole(principal);
}
```

Update `server/models/conversationFlags.js`:

```js
function reviewActorToPrincipal(actor = null) {
  if (!actor?.id) return null;
  return {
    kind: "user",
    userId: Number(actor.id),
    roles: actor.role ? [String(actor.role)] : [],
  };
}

listReviewCases: async function ({
  actor = null,
  status = "open",
  limit = 20,
  offset = 0,
  orderBy = { id: "desc" },
} = {}) {
  const principal = reviewActorToPrincipal(actor);
  const whereClause = status === "all" ? {} : { status };
  const results = await this.where(whereClause, limit, orderBy, offset, {
    user: true,
    workspace: true,
    thread: true,
    reviewer: true,
    chat: true,
  });

  return results.map((flag) => {
    const dto = {
      id: flag.id,
      sourceType: normalizedSourceType(flag.sourceType),
      chatId: flag.chatId,
      flaggedChatId: flag.chatId,
      userId: flag.userId,
      workspaceId: flag.workspaceId,
      threadId: flag.threadId,
      riskLevel: flag.riskLevel,
      categories: parseArray(flag.categories),
      matchedRules: parseArray(flag.matchedRules).map((rule) => normalizeRule(rule)),
      status: flag.status,
      resolution: flag.resolution,
      reviewedAt: flag.reviewedAt,
      reviewNote: flag.reviewNote,
      createdAt: flag.createdAt,
      reviewAvailable: false,
      user: flag.user
        ? {
            id: flag.user.id,
            username: flag.user.username,
            suspended: Boolean(flag.user.suspended),
          }
        : null,
      workspace: flag.workspace
        ? {
            id: flag.workspace.id,
            name: flag.workspace.name,
            slug: flag.workspace.slug,
          }
        : null,
      thread: flag.thread ? { id: flag.thread.id } : null,
      reviewedBy: flag.reviewer
        ? { id: flag.reviewer.id, username: flag.reviewer.username }
        : null,
    };

    dto.reviewAvailable = canReviewFlagMetadata(principal, dto);
    return dto;
  });
},
```

Update `server/repositories/chatMetadataRepository.js`:

```js
async listReviewCases({
  actor = null,
  status = "open",
  limit = 20,
  offset = 0,
  orderBy = { id: "desc" },
} = {}) {
  return await ConversationFlags.listReviewCases({
    actor,
    status,
    limit,
    offset,
    orderBy,
  });
}
```

Update the `/system/conversation-flags` route in `server/endpoints/system.js`:

```js
const actor = await userFromSession(request, response);
const flags = await ChatMetadataRepository.listReviewCases({
  actor,
  status,
  limit,
  offset: offset * limit,
});
```

Leave `/system/conversation-flags/:id/review` metadata-only, but allow API-session flags through the same policy helper:

```js
if (!review || !ConversationFlags.canViewFlaggedConversation(actor, review.flag)) {
  return response
    .status(404)
    .json({ success: false, review: null, error: "Flag review not found." });
}
```

With the new `canReviewFlagMetadata()` helper, API-session flags stay reviewable without exposing raw content.

- [ ] **Step 4: Re-run the moderation tests**

Run:

```bash
npx jest server/__tests__/models/conversationFlags.test.js server/__tests__/integration/conversationSecurityRoutes.test.js --runInBand
```

Expected:

```text
PASS server/__tests__/models/conversationFlags.test.js
PASS server/__tests__/integration/conversationSecurityRoutes.test.js
```

- [ ] **Step 5: Commit the moderation capability backend**

```bash
git add server/models/conversationFlags.js server/repositories/chatMetadataRepository.js server/utils/auth/principals.js server/endpoints/system.js server/__tests__/models/conversationFlags.test.js server/__tests__/integration/conversationSecurityRoutes.test.js
git commit -m "fix: make moderation review capability explicit"
```

### Task 6: Make The Review Queue Follow Backend Capability

**Files:**
- Create: `frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.js`
- Create: `frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js`
- Modify: `frontend/src/pages/GeneralSettings/Chats/index.jsx`
- Modify: `frontend/src/models/system.js`

- [ ] **Step 1: Write the failing review-queue presentation test**

Create `frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js`:

```js
import { describe, expect, test } from "@jest/globals";
import {
  canOpenFlagReview,
  reviewButtonLabel,
} from "./reviewQueuePresentation.js";

describe("reviewQueuePresentation", () => {
  test("shows the review action only when the backend marks the flag reviewable", () => {
    expect(canOpenFlagReview({ status: "open", reviewAvailable: true })).toBe(true);
    expect(canOpenFlagReview({ status: "open", reviewAvailable: false })).toBe(false);
    expect(canOpenFlagReview({ status: "dismissed", reviewAvailable: true })).toBe(false);
  });

  test("uses metadata wording for api-session review", () => {
    expect(reviewButtonLabel({ sourceType: "api_session" })).toBe(
      "Open metadata review"
    );
    expect(reviewButtonLabel({ sourceType: "workspace_chat" })).toBe(
      "Open flagged conversation"
    );
  });
});
```

- [ ] **Step 2: Run the review-queue presentation test to verify it fails**

Run:

```bash
NODE_OPTIONS="--disable-warning=DEP0040 --experimental-vm-modules" npx jest frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js --runInBand
```

Expected: FAIL because `reviewQueuePresentation.js` does not exist yet and the page still hard-codes the button on every open flag.

- [ ] **Step 3: Implement the helper and wire the queue**

Create `frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.js`:

```js
export function canOpenFlagReview(flag = null) {
  return Boolean(flag?.status === "open" && flag?.reviewAvailable);
}

export function reviewButtonLabel(flag = null) {
  return flag?.sourceType === "api_session"
    ? "Open metadata review"
    : "Open flagged conversation";
}
```

Update the `FlagTable` action block in `frontend/src/pages/GeneralSettings/Chats/index.jsx`:

```jsx
import {
  canOpenFlagReview,
  reviewButtonLabel,
} from "./reviewQueuePresentation";
```

```jsx
{canOpenFlagReview(flag) ? (
  <button
    onClick={() => onOpenReview(flag.id)}
    className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-theme-text-secondary"
  >
    {reviewButtonLabel(flag)}
  </button>
) : null}
```

Update the section description so it no longer claims the review queue can open raw thread access:

```jsx
description="These cases are deterministic moderation summaries. Review opens a metadata-only case view when the backend marks the case reviewable."
```

`frontend/src/models/system.js` does not need a shape transform; just keep returning `reviewAvailable` from `/system/conversation-flags` unchanged.

- [ ] **Step 4: Re-run the review-queue presentation test**

Run:

```bash
NODE_OPTIONS="--disable-warning=DEP0040 --experimental-vm-modules" npx jest frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js --runInBand
```

Expected:

```text
PASS frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js
  reviewQueuePresentation
    ✓ shows the review action only when the backend marks the flag reviewable
    ✓ uses metadata wording for api-session review
```

- [ ] **Step 5: Run the focused backend + frontend verification set**

Run:

```bash
NODE_OPTIONS="--disable-warning=DEP0040 --experimental-vm-modules" npx jest frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js --runInBand
npx jest server/__tests__/utils/auth/principals.apiKeys.test.js server/__tests__/integration/apiConversationSecurity.test.js server/__tests__/models/conversationFlags.test.js server/__tests__/integration/conversationSecurityRoutes.test.js --runInBand
```

Expected:

```text
PASS frontend/src/pages/GeneralSettings/ApiKeys/apiKeyFormState.test.js
PASS frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js
PASS server/__tests__/utils/auth/principals.apiKeys.test.js
PASS server/__tests__/integration/apiConversationSecurity.test.js
PASS server/__tests__/models/conversationFlags.test.js
PASS server/__tests__/integration/conversationSecurityRoutes.test.js
```

- [ ] **Step 6: Commit the queue behavior fix**

```bash
git add frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.js frontend/src/pages/GeneralSettings/Chats/reviewQueuePresentation.test.js frontend/src/pages/GeneralSettings/Chats/index.jsx frontend/src/models/system.js
git commit -m "fix: align review queue actions with backend capability"
```

## Self-Review

- Spec coverage: The plan covers both reported findings directly. Finding 1 is addressed by introducing typed API keys, adding creation/listing support, seeding both key classes in tests, and then restricting raw API chat routes to workspace-bound service keys. Finding 2 is addressed by moving reviewability into a backend capability field, allowing metadata-only review for API-session flags, and making the frontend render the button only when `reviewAvailable` is true.
- Placeholder scan: The plan includes exact file paths, code snippets, commands, and expected outcomes. There are no `TODO`, `TBD`, or “write tests for the above” placeholders.
- Type consistency: The plan uses the same names end-to-end: `principalType`, `workspaceId`, `workspace_service`, `reviewAvailable`, `isWorkspaceServicePrincipal`, `buildCreateApiKeyPayload`, `canOpenFlagReview`, and `reviewButtonLabel`. Backend DTOs and frontend consumers use the same field names.

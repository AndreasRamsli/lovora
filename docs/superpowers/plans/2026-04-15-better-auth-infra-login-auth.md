# Better Auth Infra Login/Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Better Auth + Better Auth Infra the primary multi-user login/auth path (cookie-session based), while keeping short-term compatibility for existing JWT bridge clients.

**Architecture:** Introduce one shared server-side resolver that can authenticate requests from Better Auth session cookies first, then optionally fall back to legacy JWT. Use that resolver in `validatedRequest` and `userFromSession` so all protected endpoints behave consistently. On frontend, remove hard dependence on local JWT presence and rely on cookie session checks + refreshed user profile.

**Tech Stack:** Express (CJS), Better Auth (`better-auth`, `@better-auth/prisma-adapter`), Better Auth Infra (`@better-auth/infra`, `@better-auth/infra/client`), Prisma/SQLite, React/Vite, Jest, Playwright.

---

## File Structure

**Create**
- `server/utils/auth/requestUserFromRequest.js` - shared auth resolver (cookie session first, JWT fallback second).
- `server/__tests__/utils/auth/requestUserFromRequest.test.js` - unit tests for resolver behavior.
- `server/__tests__/utils/middleware/validatedRequest.betterAuth.test.js` - middleware tests for multi-user cookie auth.
- `server/__tests__/endpoints/betterAuthBridge.test.js` - endpoint tests for `/auth/bridge/session`.
- `frontend/e2e/auth-cookie-session.spec.js` - regression test for cookie-only multi-user auth.
- `docs/auth/better-auth-infra-auth.md` - operator setup + verification runbook.

**Modify**
- `server/utils/middleware/validatedRequest.js` - use shared resolver in multi-user mode.
- `server/utils/http/index.js` - switch `userFromSession()` to shared resolver.
- `server/endpoints/betterAuthBridge.js` - add `/auth/bridge/session` and keep `/auth/bridge/exchange`.
- `server/auth/better-auth.mjs` - keep `dash()` mounted; add explicit production warning when infra key missing.
- `server/.env.example` - document `BETTER_AUTH_API_KEY`.
- `frontend/src/utils/request.js` - omit `Authorization` header when token absent.
- `frontend/src/utils/session.js` - cookie-aware session validation + Better Auth signout in logout flow.
- `frontend/src/models/system.js` - include credentials on auth-check endpoints.
- `frontend/src/models/authBridge.js` - add `session()` reader endpoint.
- `frontend/src/components/PrivateRoute/index.jsx` - remove hard requirement for local JWT in multi-user mode.
- `frontend/src/AuthContext.jsx` - refresh user from backend session even when JWT is absent.
- `frontend/src/components/Modals/Password/MultiUserAuth.jsx` - remove legacy `requestToken` fallback in multi-user login/signup path.
- `frontend/src/lib/betterAuthClient.js` - keep `dashClient()` plugin mounted.

---

### Task 1: Add Shared Request Auth Resolver (Server, TDD)

**Files:**
- Create: `server/utils/auth/requestUserFromRequest.js`
- Create: `server/__tests__/utils/auth/requestUserFromRequest.test.js`

- [ ] **Step 1: Write the failing resolver tests**

```js
/* eslint-env jest */
jest.mock("../../../utils/auth/betterAuthSession", () => ({
  getBetterAuthSessionFromRequest: jest.fn(),
  mapBetterAuthSessionToLegacyUser: jest.fn(),
}));

jest.mock("../../../models/user", () => ({
  User: {
    get: jest.fn(),
  },
}));

const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("../../../utils/auth/betterAuthSession");
const { User } = require("../../../models/user");

describe("resolveRequestUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.JWT_SECRET;
  });

  test("returns mapped user from Better Auth session when cookie session is present", async () => {
    const { resolveRequestUser } = require("../../../utils/auth/requestUserFromRequest");
    getBetterAuthSessionFromRequest.mockResolvedValue({
      user: { id: "ba_1", email: "agent@example.com" },
    });
    mapBetterAuthSessionToLegacyUser.mockResolvedValue({
      id: 10,
      username: "agent@example.com",
      role: "default",
    });

    const request = { headers: {} };
    const response = { locals: {} };
    const user = await resolveRequestUser(request, response);
    expect(user).toMatchObject({ id: 10, username: "agent@example.com" });
  });

  test("falls back to JWT when Better Auth session is absent", async () => {
    const { resolveRequestUser } = require("../../../utils/auth/requestUserFromRequest");
    const jwt = require("jsonwebtoken");
    process.env.JWT_SECRET = "resolver-test-secret";
    const token = jwt.sign({ id: 42, username: "legacy@example.com" }, process.env.JWT_SECRET);
    getBetterAuthSessionFromRequest.mockResolvedValue(null);
    User.get.mockResolvedValue({ id: 42, username: "legacy@example.com", role: "default" });

    const request = { headers: { authorization: `Bearer ${token}` } };
    const response = { locals: {} };
    const user = await resolveRequestUser(request, response);
    expect(user).toMatchObject({ id: 42, username: "legacy@example.com" });
  });

  test("returns null when no session and no valid token", async () => {
    const { resolveRequestUser } = require("../../../utils/auth/requestUserFromRequest");
    getBetterAuthSessionFromRequest.mockResolvedValue(null);
    const request = { headers: {} };
    const response = { locals: {} };
    const user = await resolveRequestUser(request, response);
    expect(user).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/auth/requestUserFromRequest.test.js --runInBand
```

Expected: FAIL with module-not-found for `server/utils/auth/requestUserFromRequest.js`.

- [ ] **Step 3: Write minimal resolver implementation**

```js
// server/utils/auth/requestUserFromRequest.js
const JWT = require("jsonwebtoken");
const { User } = require("../../models/user");
const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("./betterAuthSession");

function tokenFromAuthHeader(request) {
  const auth = request?.header?.("Authorization") ?? request?.headers?.authorization;
  if (!auth || typeof auth !== "string") return null;
  const [, token] = auth.split(" ");
  return token || null;
}

function decodeJwtToken(token) {
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    return JWT.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

async function resolveRequestUser(request, response = null) {
  if (response?.locals?.user) return response.locals.user;

  const session = await getBetterAuthSessionFromRequest(request).catch(() => null);
  if (session?.user) {
    const mapped = await mapBetterAuthSessionToLegacyUser(session);
    if (mapped) return mapped;
  }

  const token = tokenFromAuthHeader(request);
  const decoded = decodeJwtToken(token);
  if (!decoded?.id) return null;
  const jwtUser = await User.get({ id: decoded.id });
  return jwtUser || null;
}

module.exports = {
  resolveRequestUser,
};
```

- [ ] **Step 4: Run test to verify it passes**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/auth/requestUserFromRequest.test.js --runInBand
```

Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/utils/auth/requestUserFromRequest.js server/__tests__/utils/auth/requestUserFromRequest.test.js
git commit -m "feat(auth): add shared request user resolver for better-auth and jwt"
```

---

### Task 2: Rewire Middleware + `userFromSession` To Shared Resolver (TDD)

**Files:**
- Create: `server/__tests__/utils/middleware/validatedRequest.betterAuth.test.js`
- Modify: `server/utils/middleware/validatedRequest.js`
- Modify: `server/utils/http/index.js`

- [ ] **Step 1: Write failing middleware tests**

```js
/* eslint-env jest */
jest.mock("../../../models/systemSettings", () => ({
  SystemSettings: {
    isMultiUserMode: jest.fn(),
  },
}));

jest.mock("../../../utils/auth/requestUserFromRequest", () => ({
  resolveRequestUser: jest.fn(),
}));

const { SystemSettings } = require("../../../models/systemSettings");
const { resolveRequestUser } = require("../../../utils/auth/requestUserFromRequest");
const { validatedRequest } = require("../../../utils/middleware/validatedRequest");

describe("validatedRequest (better-auth multi-user)", () => {
  test("accepts cookie-authenticated multi-user request and sets response.locals.user", async () => {
    SystemSettings.isMultiUserMode.mockResolvedValue(true);
    resolveRequestUser.mockResolvedValue({ id: 7, username: "cookie@example.com", suspended: 0 });

    const request = { headers: {} };
    const response = { locals: {}, status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await validatedRequest(request, response, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(response.locals.user).toMatchObject({ id: 7 });
  });

  test("rejects multi-user request when no authenticated user can be resolved", async () => {
    SystemSettings.isMultiUserMode.mockResolvedValue(true);
    resolveRequestUser.mockResolvedValue(null);

    const request = { headers: {} };
    const response = { locals: {}, status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await validatedRequest(request, response, next);
    expect(next).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(401);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/middleware/validatedRequest.betterAuth.test.js --runInBand
```

Expected: FAIL because `validatedRequest` still requires JWT token in multi-user mode.

- [ ] **Step 3: Implement middleware + HTTP resolver integration**

```js
// server/utils/middleware/validatedRequest.js (replace validateMultiUserRequest)
const { resolveRequestUser } = require("../auth/requestUserFromRequest");

async function validateMultiUserRequest(request, response, next) {
  const user = await resolveRequestUser(request, response);
  if (!user) {
    response.status(401).json({
      error: "Invalid auth token.",
    });
    return;
  }

  if (user.suspended) {
    response.status(401).json({
      error: "User is suspended from system",
    });
    return;
  }

  response.locals.user = user;
  next();
}
```

```js
// server/utils/http/index.js (replace userFromSession)
const { resolveRequestUser } = require("../auth/requestUserFromRequest");

async function userFromSession(request, response = null) {
  return await resolveRequestUser(request, response);
}
```

- [ ] **Step 4: Run tests to verify pass**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/middleware/validatedRequest.betterAuth.test.js --runInBand
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/auth/requestUserFromRequest.test.js --runInBand
```

Expected: PASS (all tests green).

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/utils/middleware/validatedRequest.js server/utils/http/index.js server/__tests__/utils/middleware/validatedRequest.betterAuth.test.js
git commit -m "feat(auth): validate multi-user requests via better-auth cookie sessions"
```

---

### Task 3: Add Session Bootstrap Endpoint (`/auth/bridge/session`) (TDD)

**Files:**
- Create: `server/__tests__/endpoints/betterAuthBridge.test.js`
- Modify: `server/endpoints/betterAuthBridge.js`

- [ ] **Step 1: Write failing endpoint test**

```js
/* eslint-env jest */
const request = require("supertest");
const express = require("express");

jest.mock("../../utils/auth/betterAuthSession", () => ({
  getBetterAuthSessionFromRequest: jest.fn(),
  mapBetterAuthSessionToLegacyUser: jest.fn(),
}));

jest.mock("../../models/user", () => ({
  User: {
    filterFields: jest.fn((user) => ({ id: user.id, username: user.username })),
  },
}));

const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("../../utils/auth/betterAuthSession");
const { betterAuthBridgeEndpoints } = require("../../endpoints/betterAuthBridge");

describe("betterAuthBridgeEndpoints", () => {
  test("returns session-backed user via /auth/bridge/session", async () => {
    const app = express();
    app.use(express.json());
    betterAuthBridgeEndpoints(app);

    getBetterAuthSessionFromRequest.mockResolvedValue({
      user: { id: "ba_10", email: "session@example.com" },
    });
    mapBetterAuthSessionToLegacyUser.mockResolvedValue({
      id: 10,
      username: "session@example.com",
      role: "default",
    });

    const res = await request(app).get("/auth/bridge/session");
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
    expect(res.body.user.username).toBe("session@example.com");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/endpoints/betterAuthBridge.test.js --runInBand
```

Expected: FAIL with 404 for `/auth/bridge/session`.

- [ ] **Step 3: Add session bootstrap route**

```js
// server/endpoints/betterAuthBridge.js (add helper + route)
async function resolveLegacyUserFromBetterAuthRequest(request) {
  const session = await getBetterAuthSessionFromRequest(request);
  if (!session?.user) return null;
  return await mapBetterAuthSessionToLegacyUser(session);
}

function betterAuthBridgeEndpoints(app) {
  if (!app) return;

  app.get("/auth/bridge/session", async (request, response) => {
    try {
      const legacyUser = await resolveLegacyUserFromBetterAuthRequest(request);
      if (!legacyUser) {
        return response.status(401).json({
          valid: false,
          user: null,
          message: "No Better Auth session found.",
        });
      }

      return response.status(200).json({
        valid: true,
        user: User.filterFields(legacyUser),
        message: null,
      });
    } catch (error) {
      return response.status(500).json({
        valid: false,
        user: null,
        message: error.message,
      });
    }
  });

  // keep /auth/bridge/exchange for temporary compatibility
}
```

- [ ] **Step 4: Re-run endpoint tests**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/endpoints/betterAuthBridge.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/endpoints/betterAuthBridge.js server/__tests__/endpoints/betterAuthBridge.test.js
git commit -m "feat(auth): add better-auth session bootstrap endpoint"
```

---

### Task 4: Frontend Cookie-Session Cutover (TDD with Playwright)

**Files:**
- Create: `frontend/e2e/auth-cookie-session.spec.js`
- Modify: `frontend/src/utils/request.js`
- Modify: `frontend/src/utils/session.js`
- Modify: `frontend/src/models/system.js`
- Modify: `frontend/src/models/authBridge.js`
- Modify: `frontend/src/components/PrivateRoute/index.jsx`
- Modify: `frontend/src/AuthContext.jsx`
- Modify: `frontend/src/components/Modals/Password/MultiUserAuth.jsx`

- [ ] **Step 1: Add failing Playwright regression**

```js
// frontend/e2e/auth-cookie-session.spec.js
import { expect, test } from "@playwright/test";

test("cookie-only better auth session works without local auth token", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "anythingllm_user",
      JSON.stringify({ id: 2, username: "cookie-user", role: "default" })
    );
    localStorage.removeItem("anythingllm_authToken");
    localStorage.setItem("anythingllm_authTimestamp", String(Date.now()));
  });

  await page.route("**/api/onboarding", async (route) => {
    await route.fulfill({ json: { onboardingComplete: true } });
  });

  await page.route("**/api/setup-complete", async (route) => {
    await route.fulfill({
      json: {
        results: {
          MultiUserMode: true,
          RequiresAuth: false,
        },
      },
    });
  });

  await page.route("**/api/system/check-token", async (route) => {
    await route.fulfill({ status: 200, body: "" });
  });

  await page.route("**/api/system/refresh-user", async (route) => {
    await route.fulfill({
      json: {
        success: true,
        user: { id: 2, username: "cookie-user", role: "default" },
        message: null,
      },
    });
  });

  await page.goto("/");
  await expect(page).not.toHaveURL(/\/login/);
});
```

- [ ] **Step 2: Run Playwright test and confirm failure**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
yarn test:e2e --grep "cookie-only better auth session"
```

Expected: FAIL because `PrivateRoute` currently requires `anythingllm_authToken` in multi-user mode.

- [ ] **Step 3: Implement cookie-session frontend changes**

```js
// frontend/src/utils/request.js (replace baseHeaders)
export function baseHeaders(providedToken = null) {
  const token = providedToken || window.localStorage.getItem(AUTH_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
}
```

```js
// frontend/src/models/system.js (auth check endpoints)
checkAuth: async function (currentToken = null) {
  const valid = await fetch(`${API_BASE}/system/check-token`, {
    credentials: "include",
    headers: baseHeaders(currentToken),
  })
    .then((res) => res.ok)
    .catch(() => false);
  window.localStorage.setItem(AUTH_TIMESTAMP, Number(new Date()));
  return valid;
},

refreshUser: () => {
  return fetch(`${API_BASE}/system/refresh-user`, {
    credentials: "include",
    headers: baseHeaders(),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Could not refresh user.");
      return res.json();
    })
    .catch((e) => ({ success: false, user: null, message: e.message }));
},
```

```js
// frontend/src/models/authBridge.js (add session())
const AuthBridge = {
  exchange: async () => {
    return fetch(`${API_BASE}/auth/bridge/exchange`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((error) => ({ valid: false, user: null, token: null, message: error.message }));
  },
  session: async () => {
    return fetch(`${API_BASE}/auth/bridge/session`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((error) => ({ valid: false, user: null, message: error.message }));
  },
};
```

```jsx
// frontend/src/components/PrivateRoute/index.jsx (multi-user branch in useIsAuthenticated)
const localUser = localStorage.getItem(AUTH_USER);
if (!localUser) {
  setIsAuthed(false);
  return;
}

const isValid = await validateSessionTokenForUser();
if (!isValid) {
  localStorage.removeItem(AUTH_USER);
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_TIMESTAMP);
  setIsAuthed(false);
  return;
}

setIsAuthed(true);
```

```jsx
// frontend/src/components/Modals/Password/MultiUserAuth.jsx (inside handleLogin)
if (view === "signup") {
  const { error: signUpError } = await betterAuthClient.signUp.email({
    name: email,
    email,
    password,
  });
  if (signUpError) throw new Error(signUpError.message);
  const session = await AuthBridge.session();
  if (!session?.valid || !session?.user) throw new Error(session?.message || "Sign up failed.");
  window.localStorage.setItem(AUTH_USER, JSON.stringify(session.user));
  window.localStorage.removeItem(AUTH_TOKEN);
  window.location = paths.home();
  return;
}

const { error: signInError } = await betterAuthClient.signIn.email({
  email,
  password,
});
if (signInError) throw new Error(signInError.message);
const session = await AuthBridge.session();
if (!session?.valid || !session?.user) throw new Error(session?.message || "Sign in failed.");
window.localStorage.setItem(AUTH_USER, JSON.stringify(session.user));
window.localStorage.removeItem(AUTH_TOKEN);
window.location = paths.home();
return;
```

- [ ] **Step 4: Run e2e + lint checks**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora
yarn test:e2e --grep "cookie-only better auth session"
cd /Users/andreas/fun/lovora/lovora/frontend
yarn lint:check
```

Expected: Playwright PASS for new test; frontend lint PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add frontend/e2e/auth-cookie-session.spec.js frontend/src/utils/request.js frontend/src/utils/session.js frontend/src/models/system.js frontend/src/models/authBridge.js frontend/src/components/PrivateRoute/index.jsx frontend/src/AuthContext.jsx frontend/src/components/Modals/Password/MultiUserAuth.jsx
git commit -m "feat(auth): switch frontend multi-user auth to better-auth cookie sessions"
```

---

### Task 5: Infra Env + Operational Verification + Docs

**Files:**
- Modify: `server/auth/better-auth.mjs`
- Modify: `server/.env.example`
- Create: `docs/auth/better-auth-infra-auth.md`

- [ ] **Step 1: Add production warning for missing infra API key**

```js
// server/auth/better-auth.mjs
if (process.env.NODE_ENV === "production" && !betterAuthApiKey) {
  console.warn(
    "[better-auth] BETTER_AUTH_API_KEY is not set; Better Auth Infrastructure dashboard features are disabled."
  );
}
```

- [ ] **Step 2: Document required environment values**

```dotenv
# server/.env.example
BETTER_AUTH_SECRET="replace-with-random-min-32-char-secret"
BETTER_AUTH_URL="http://localhost:3001"
BETTER_AUTH_API_KEY="ba_your_infra_api_key"
BETTER_AUTH_TRUSTED_ORIGINS="http://localhost:3000,http://127.0.0.1:3000"
```

- [ ] **Step 3: Add runbook doc**

```md
# Better Auth Infra Auth Runbook

## Required server env
- BETTER_AUTH_SECRET
- BETTER_AUTH_URL
- BETTER_AUTH_API_KEY
- BETTER_AUTH_TRUSTED_ORIGINS

## Verify plugin + auth routes
1. GET /api/auth/ok returns 200
2. GET /api/auth/bridge/session returns 401 without cookie
3. Sign in via Better Auth, then GET /api/auth/bridge/session returns valid=true
4. GET /api/system/check-token returns 200 with cookie session only (no Authorization header)
```

- [ ] **Step 4: Execute verification commands**

Run:
```bash
cd /Users/andreas/fun/lovora/lovora/server
npx prisma validate

cd /Users/andreas/fun/lovora/lovora
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/auth/requestUserFromRequest.test.js --runInBand
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/utils/middleware/validatedRequest.betterAuth.test.js --runInBand
NODE_OPTIONS=--disable-warning=DEP0040 npx jest server/__tests__/endpoints/betterAuthBridge.test.js --runInBand
```

Expected: all commands PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/andreas/fun/lovora/lovora
git add server/auth/better-auth.mjs server/.env.example docs/auth/better-auth-infra-auth.md
git commit -m "docs(auth): add better-auth infra setup and verification runbook"
```

---

## Self-Review

**Spec coverage check**
- Better Auth Infra plugin management: covered in Task 5 (`BETTER_AUTH_API_KEY`, runtime warning, runbook).
- Login/auth management by Better Auth: covered in Tasks 1-4 (server resolver + middleware + frontend cookie session cutover).
- Backward compatibility during transition: covered in Task 3 (keep `/auth/bridge/exchange` while adding `/auth/bridge/session`).

**Placeholder scan**
- No `TODO`, `TBD`, or “implement later” placeholders.
- Every code-changing step includes explicit code blocks.
- Every verification step includes exact commands and expected outcomes.

**Type/interface consistency check**
- Shared server contract uses `{ valid, user, message }` for `/auth/bridge/session`.
- Frontend `AuthBridge.session()` matches this contract.
- Middleware/user resolution uses one shared function (`resolveRequestUser`) to avoid diverging auth logic.

Plan complete and saved to `docs/superpowers/plans/2026-04-15-better-auth-infra-login-auth.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?

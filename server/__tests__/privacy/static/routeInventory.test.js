/* eslint-env jest */

const path = require("path");

function loadPolicyMap() {
  const { createApp } = require("../../../app");
  const {
    getDeclaredRoutePolicies,
  } = require("../../../utils/privacy/routePolicy");
  const {
    routeKey,
  } = require("../../../test-support/privacy/routeInventory");

  createApp({ enableWebSockets: false });
  return new Map(
    getDeclaredRoutePolicies().map((policy) => [routeKey(policy), policy])
  );
}

describe("route inventory coverage", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.STORAGE_DIR =
      process.env.STORAGE_DIR ||
      path.resolve(__dirname, "../../../storage");
  });

  test("every privacy-managed route has explicit route policy metadata or an explicit exemption", () => {
    const { createApp } = require("../../../app");
    const {
      getDeclaredRoutePolicies,
    } = require("../../../utils/privacy/routePolicy");
    const {
      listExpressRoutes,
    } = require("../../../test-support/privacy/expressRoutes");
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

  test("managed non-exempt /api/v1 routes require principal access declarations", () => {
    const { createApp } = require("../../../app");
    const {
      getDeclaredRoutePolicies,
    } = require("../../../utils/privacy/routePolicy");
    const {
      listExpressRoutes,
    } = require("../../../test-support/privacy/expressRoutes");
    const {
      routeKey,
      isPolicyExempt,
    } = require("../../../test-support/privacy/routeInventory");

    const app = createApp({ enableWebSockets: false });
    const routes = listExpressRoutes(app);
    const policies = getDeclaredRoutePolicies();
    const policyMap = new Map(policies.map((policy) => [routeKey(policy), policy]));

    const managedV1Routes = routes.filter(
      (route) => route.path.startsWith("/api/v1") && !isPolicyExempt(route)
    );
    const routesMissingPrincipalAccess = managedV1Routes
      .map((route) => policyMap.get(routeKey(route)))
      .filter((policy) => policy && !policy.principalAccess)
      .map((policy) => routeKey(policy));

    expect(routesMissingPrincipalAccess).toEqual([]);
  });

  test("no /api/v1 route-policy exemptions remain", () => {
    const { createApp } = require("../../../app");
    const {
      ROUTE_POLICY_EXEMPTIONS,
      routeKey,
      isPolicyExempt,
    } = require("../../../test-support/privacy/routeInventory");
    const {
      listExpressRoutes,
    } = require("../../../test-support/privacy/expressRoutes");

    const exemptedRegistryEntries = ROUTE_POLICY_EXEMPTIONS.filter((entry) =>
      entry.includes(" /api/v1")
    );

    const app = createApp({ enableWebSockets: false });
    const routes = listExpressRoutes(app);
    const actualExemptedV1Routes = routes
      .filter((route) => route.path.startsWith("/api/v1") && isPolicyExempt(route))
      .map(routeKey)
      .sort();

    expect(exemptedRegistryEntries).toEqual([]);
    expect(actualExemptedV1Routes).toEqual([]);
  });

  test("conflicting duplicate route-policy declarations fail loudly", () => {
    const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");
    const {
      validApiKey,
    } = require("../../../utils/middleware/validApiKey");

    const basePolicy = {
      method: "GET",
      path: "/api/v1/privacy/test",
      routeId: "privacy.test.one",
      plane: "control",
      category: "privacy",
      responsePolicy: "allow",
      principalAccess: {
        management: [],
      },
    };

    expect(() => {
      withRoutePolicy(basePolicy, validApiKey);
      withRoutePolicy(
        {
          ...basePolicy,
          routeId: "privacy.test.two",
        },
        validApiKey
      );
    }).toThrow("Conflicting route policy declaration for GET /api/v1/privacy/test.");
  });

  test("Task 2 migrated routes declare the intended principal access", () => {
    const policyMap = loadPolicyMap();

    expect(policyMap.get("GET /api/v1/auth")?.principalAccess).toEqual({
      management: [],
      workspace_service: [],
    });
    expect(policyMap.get("GET /api/v1/system")?.principalAccess).toEqual({
      management: ["management:metadata:read"],
    });
    expect(policyMap.get("GET /api/v1/system/vector-count")?.principalAccess).toEqual({
      management: ["management:metadata:read"],
    });
    expect(policyMap.get("GET /api/v1/system/env-dump")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
    expect(policyMap.get("POST /api/v1/system/update-env")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("DELETE /api/v1/system/remove-documents")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
    expect(policyMap.get("GET /api/v1/system/export-chats")?.principalAccess).toEqual({
      management: ["management:metadata:read", "management:moderation:write"],
    });
  });

  test("Task 3 migrated document routes declare the intended principal access", () => {
    const policyMap = loadPolicyMap();

    expect(policyMap.get("POST /api/v1/document/upload")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("POST /api/v1/document/upload/:folderName")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("POST /api/v1/document/upload-link")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
    expect(policyMap.get("POST /api/v1/document/raw-text")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
    expect(policyMap.get("GET /api/v1/documents")?.principalAccess).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("GET /api/v1/documents/folder/:folderName")?.principalAccess
    ).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("GET /api/v1/document/accepted-file-types")?.principalAccess
    ).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("GET /api/v1/document/metadata-schema")?.principalAccess
    ).toEqual({
      management: ["management:metadata:read"],
    });
    expect(policyMap.get("GET /api/v1/document/:docName")?.principalAccess).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("POST /api/v1/document/create-folder")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("DELETE /api/v1/document/remove-folder")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
    expect(policyMap.get("POST /api/v1/document/move-files")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
  });

  test("Task 3 migrated document routes remain on the control plane", () => {
    const policyMap = loadPolicyMap();
    const task3Routes = [
      "POST /api/v1/document/upload",
      "POST /api/v1/document/upload/:folderName",
      "POST /api/v1/document/upload-link",
      "POST /api/v1/document/raw-text",
      "GET /api/v1/documents",
      "GET /api/v1/documents/folder/:folderName",
      "GET /api/v1/document/accepted-file-types",
      "GET /api/v1/document/metadata-schema",
      "GET /api/v1/document/:docName",
      "POST /api/v1/document/create-folder",
      "DELETE /api/v1/document/remove-folder",
      "POST /api/v1/document/move-files",
    ];

    for (const route of task3Routes) {
      expect(policyMap.get(route)?.plane).toBe("control");
    }
  });

  test("Task 4 migrated OpenAI-compatible routes declare the intended principal access", () => {
    const policyMap = loadPolicyMap();

    expect(policyMap.get("GET /api/v1/openai/models")?.principalAccess).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("GET /api/v1/openai/vector_stores")?.principalAccess
    ).toEqual({
      management: ["management:metadata:read"],
    });
    expect(policyMap.get("POST /api/v1/openai/embeddings")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("POST /api/v1/openai/chat/completions")?.principalAccess
    ).toEqual({
      workspace_service: ["workspace:api_sessions:write"],
    });
  });

  test("Task 4 migrated OpenAI-compatible routes declare the intended plane", () => {
    const policyMap = loadPolicyMap();

    expect(policyMap.get("GET /api/v1/openai/models")?.plane).toBe("control");
    expect(policyMap.get("GET /api/v1/openai/vector_stores")?.plane).toBe(
      "control"
    );
    expect(policyMap.get("POST /api/v1/openai/embeddings")?.plane).toBe(
      "control"
    );
    expect(policyMap.get("POST /api/v1/openai/chat/completions")?.plane).toBe(
      "content"
    );
  });

  test("Task 5 migrated embed routes declare the intended principal access", () => {
    const policyMap = loadPolicyMap();

    expect(policyMap.get("GET /api/v1/embed")?.principalAccess).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("GET /api/v1/embed/:embedUuid/chats")?.principalAccess
    ).toEqual({
      management: ["management:metadata:read"],
    });
    expect(
      policyMap.get("GET /api/v1/embed/:embedUuid/chats/:sessionUuid")
        ?.principalAccess
    ).toEqual({
      management: ["management:metadata:read"],
    });
    expect(policyMap.get("POST /api/v1/embed/new")?.principalAccess).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("POST /api/v1/embed/:embedUuid")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
    expect(
      policyMap.get("DELETE /api/v1/embed/:embedUuid")?.principalAccess
    ).toEqual({
      management: ["management:metadata:write"],
    });
  });

  test("Task 5 migrated embed routes remain on the control plane", () => {
    const policyMap = loadPolicyMap();
    const task5Routes = [
      "GET /api/v1/embed",
      "GET /api/v1/embed/:embedUuid/chats",
      "GET /api/v1/embed/:embedUuid/chats/:sessionUuid",
      "POST /api/v1/embed/new",
      "POST /api/v1/embed/:embedUuid",
      "DELETE /api/v1/embed/:embedUuid",
    ];

    for (const route of task5Routes) {
      expect(policyMap.get(route)?.plane).toBe("control");
    }
  });
});

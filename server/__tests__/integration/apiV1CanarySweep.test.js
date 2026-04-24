/* eslint-env jest */

const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const {
  assertNoForbiddenCanaries,
} = require("../../test-support/privacy/scanner");

jest.setTimeout(30000);

const HARNESS_UNSAFE_ROUTE_IDS = new Set([
  "api.admin.corpus-releases.list",
  "api.admin.corpus-releases.latest",
]);

const POST_ROUTE_EXERCISES = {
  "api.document.raw-text": {
    buildRequest({ app, fixtures, path, canary }) {
      return request(app)
        .post(path)
        .set("Authorization", fixtures.auth.managementApiKey)
        .send({
          textContent: "management control-plane canary exercise",
          metadata: {
            title: "Control-plane Canary",
          },
          canary,
        });
    },
    setup(canary) {
      const { CollectorApi } = require("../../utils/collectorApi");
      const onlineSpy = jest
        .spyOn(CollectorApi.prototype, "online")
        .mockResolvedValue(true);
      const processRawTextSpy = jest
        .spyOn(CollectorApi.prototype, "processRawText")
        .mockResolvedValue({
          success: true,
          reason: null,
          documents: [
            {
              id: "canary-doc-raw-text",
              url: "file://control-plane-canary.txt",
              title: "control-plane-canary.txt",
              docAuthor: "integration-test",
              description: "post route canary exercise",
              docSource: "integration-test",
              chunkSource: "control-plane-canary.txt",
              published: "2026-04-23T12:00:00.000Z",
              wordCount: 4,
              pageContent: canary,
              token_count_estimate: 4,
              location: "custom-documents/raw-control-plane-canary.json",
            },
          ],
        });

      return () => {
        processRawTextSpy.mockRestore();
        onlineSpy.mockRestore();
      };
    },
  },
};

function managementControlPlanePolicies(methods = ["GET"]) {
  const {
    getDeclaredRoutePolicies,
  } = require("../../utils/privacy/routePolicy");

  return getDeclaredRoutePolicies()
    .filter(
      (policy) =>
        methods.includes(policy.method) &&
        policy.path.startsWith("/api/v1") &&
        policy.plane === "control" &&
        policy.principalAccess &&
        Object.prototype.hasOwnProperty.call(policy.principalAccess, "management")
    )
    .sort((left, right) => left.path.localeCompare(right.path));
}

function pathParamResolvers(fixtures) {
  const primaryWorkspace =
    fixtures.workspaces.assignedWorkspace ||
    fixtures.workspaces.workspaceLegalAlpha;

  return {
    slug: () => primaryWorkspace.slug,
    workspaceSlug: () => primaryWorkspace.slug,
    workspaceId: () => String(primaryWorkspace.id),
    embedUuid: () => fixtures.embed.embedConfig.uuid,
    sessionUuid: () => "embed-session-1",
    id: () => String(fixtures.users.alice.id),
    folderName: () => "missing-folder",
    docName: () => "missing-document.json",
  };
}

function resolvePolicyPath(pathTemplate, fixtures) {
  const resolvers = pathParamResolvers(fixtures);
  const unresolvedParams = [];
  const path = pathTemplate.replace(/:([A-Za-z0-9_]+)/g, (_, paramName) => {
    const resolveParam = resolvers[paramName];
    if (!resolveParam) {
      unresolvedParams.push(paramName);
      return `:${paramName}`;
    }

    return resolveParam();
  });

  return {
    path,
    unresolvedParams,
  };
}

describe("api v1 canary sweep", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("GET /api/v1 management control-plane routes do not leak canaries", async () => {
    const { app, fixtures } = harness;
    const managementSurface = { allowedCanaries: new Set() };
    const discoveredPolicies = managementControlPlanePolicies();
    const skippedRoutes = [];
    const sweptRoutes = [];

    expect(discoveredPolicies.length).toBeGreaterThan(0);

    for (const policy of discoveredPolicies) {
      if (HARNESS_UNSAFE_ROUTE_IDS.has(policy.routeId)) {
        skippedRoutes.push({
          routeId: policy.routeId,
          path: policy.path,
          reason: "requires corpus release fixtures/schema not seeded by createSecurityHarness",
        });
        continue;
      }

      const { path, unresolvedParams } = resolvePolicyPath(policy.path, fixtures);
      if (unresolvedParams.length > 0) {
        skippedRoutes.push({
          routeId: policy.routeId,
          path: policy.path,
          unresolvedParams,
        });
        continue;
      }

      const response = await request(app)
        .get(path)
        .set("Authorization", fixtures.auth.managementApiKey);

      expect(response.status).toBeLessThan(500);
      if (response.status === 403) {
        expect(response.body).not.toEqual({
          error: "API key cannot access this route.",
        });
      }

      assertNoForbiddenCanaries({
        actor: managementSurface,
        response,
        canaries: fixtures.canaries,
      });

      sweptRoutes.push({
        routeId: policy.routeId,
        path,
        status: response.status,
      });
    }

    expect(skippedRoutes).toEqual([
      {
        routeId: "api.admin.corpus-releases.list",
        path: "/api/v1/admin/corpus-releases",
        reason:
          "requires corpus release fixtures/schema not seeded by createSecurityHarness",
      },
      {
        routeId: "api.admin.corpus-releases.latest",
        path: "/api/v1/admin/corpus-releases/:workspaceSlug/latest",
        reason:
          "requires corpus release fixtures/schema not seeded by createSecurityHarness",
      },
    ]);
    expect(sweptRoutes).toHaveLength(
      discoveredPolicies.length - HARNESS_UNSAFE_ROUTE_IDS.size
    );
  });

  test("exercised POST /api/v1 management control-plane routes do not leak canaries", async () => {
    const { app, fixtures } = harness;
    const discoveredPolicies = managementControlPlanePolicies(["POST"]).filter(
      (policy) => Object.prototype.hasOwnProperty.call(POST_ROUTE_EXERCISES, policy.routeId)
    );
    const sweptRoutes = [];

    expect(discoveredPolicies.length).toBeGreaterThan(0);

    for (const policy of discoveredPolicies) {
      const exercise = POST_ROUTE_EXERCISES[policy.routeId];
      const { path, unresolvedParams } = resolvePolicyPath(policy.path, fixtures);
      expect(unresolvedParams).toEqual([]);

      const canary = `LOVORA_POST_CONTROL_CANARY_${policy.routeId.replace(/[^A-Za-z0-9]/g, "_")}`;
      const teardown = exercise.setup ? exercise.setup(canary) : null;

      try {
        const response = await exercise.buildRequest({
          app,
          fixtures,
          path,
          canary,
        });

        expect(response.status).toBeLessThan(500);
        expect(JSON.stringify(response.body)).not.toContain(canary);
        sweptRoutes.push({
          routeId: policy.routeId,
          path,
          status: response.status,
        });
      } finally {
        teardown?.();
      }
    }

    expect(sweptRoutes).toHaveLength(discoveredPolicies.length);
  });
});

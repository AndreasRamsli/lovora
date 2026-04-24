/* eslint-env jest */

const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

jest.setTimeout(30000);

function expectRouteAccess(response, expectedStatus, expectedBody) {
  expect(response.status).toBe(expectedStatus);
  expect(response.body).toEqual(expectedBody);
}

describe("api system authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("GET /api/v1/auth allows both management and workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const [managementResponse, workspaceServiceResponse] = await Promise.all([
      request(app)
        .get("/api/v1/auth")
        .set("Authorization", fixtures.auth.managementApiKey),
      request(app)
        .get("/api/v1/auth")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    expect(managementResponse.status).toBe(200);
    expect(managementResponse.body).toEqual({ authenticated: true });
    expect(workspaceServiceResponse.status).toBe(200);
    expect(workspaceServiceResponse.body).toEqual({ authenticated: true });
  });

  test("GET /api/v1/system/vector-count rejects workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const response = await request(app)
      .get("/api/v1/system/vector-count")
      .set("Authorization", fixtures.auth.workspaceServiceApiKey);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "API key cannot access this route.",
    });
  });

  test("GET /api/v1/system still allows management and rejects workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const [managementResponse, workspaceServiceResponse] = await Promise.all([
      request(app)
        .get("/api/v1/system")
        .set("Authorization", fixtures.auth.managementApiKey),
      request(app)
        .get("/api/v1/system")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    expect(managementResponse.status).toBe(200);
    expect(managementResponse.body).toEqual(
      expect.objectContaining({
        settings: expect.any(Object),
      })
    );
    expect(workspaceServiceResponse.status).toBe(403);
    expect(workspaceServiceResponse.body).toEqual({
      error: "API key cannot access this route.",
    });
  });

  test("GET /api/v1/system/env-dump allows management and rejects workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const [managementResponse, workspaceServiceResponse] = await Promise.all([
      request(app)
        .get("/api/v1/system/env-dump")
        .set("Authorization", fixtures.auth.managementApiKey),
      request(app)
        .get("/api/v1/system/env-dump")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    expect(managementResponse.status).toBe(200);
    expectRouteAccess(workspaceServiceResponse, 403, {
      error: "API key cannot access this route.",
    });
  });

  test("POST /api/v1/system/update-env allows management and rejects workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const payload = { AnythingLLMTitle: "Task 2 authz test" };
    const [managementResponse, workspaceServiceResponse] = await Promise.all([
      request(app)
        .post("/api/v1/system/update-env")
        .set("Authorization", fixtures.auth.managementApiKey)
        .send(payload),
      request(app)
        .post("/api/v1/system/update-env")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send(payload),
    ]);

    expect(managementResponse.status).toBe(200);
    expect(managementResponse.body).toEqual(
      expect.objectContaining({
        newValues: expect.any(Object),
      })
    );
    expectRouteAccess(workspaceServiceResponse, 403, {
      error: "API key cannot access this route.",
    });
  });

  test("GET /api/v1/system/export-chats distinguishes management from workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const [managementResponse, workspaceServiceResponse] = await Promise.all([
      request(app)
        .get("/api/v1/system/export-chats")
        .set("Authorization", fixtures.auth.managementApiKey),
      request(app)
        .get("/api/v1/system/export-chats")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    expectRouteAccess(managementResponse, 403, {
      success: false,
      error: "Raw chat export is disabled.",
    });
    expectRouteAccess(workspaceServiceResponse, 403, {
      error: "API key cannot access this route.",
    });
  });

  test("DELETE /api/v1/system/remove-documents allows management and rejects workspace-service keys", async () => {
    const { app, fixtures } = harness;
    const payload = { names: [] };
    const [managementResponse, workspaceServiceResponse] = await Promise.all([
      request(app)
        .delete("/api/v1/system/remove-documents")
        .set("Authorization", fixtures.auth.managementApiKey)
        .send(payload),
      request(app)
        .delete("/api/v1/system/remove-documents")
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send(payload),
    ]);

    expectRouteAccess(managementResponse, 200, {
      success: true,
      message: "Documents removed successfully",
    });
    expectRouteAccess(workspaceServiceResponse, 403, {
      error: "API key cannot access this route.",
    });
  });
});

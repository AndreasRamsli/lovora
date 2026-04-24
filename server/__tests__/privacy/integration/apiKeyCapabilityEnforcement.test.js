/* eslint-env jest */

const path = require("path");
const request = require("supertest");

jest.mock("../../../models/apiKeys", () => ({
  ApiKey: {
    get: jest.fn(),
  },
}));

jest.mock("../../../models/systemSettings", () => ({
  SystemSettings: {
    isMultiUserMode: jest.fn().mockResolvedValue(true),
    currentSettings: jest.fn().mockResolvedValue({}),
    updateSettings: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock("../../../models/user", () => ({
  User: {
    get: jest.fn().mockResolvedValue({
      id: 12,
      username: "member",
      role: "default",
    }),
    create: jest.fn().mockResolvedValue({
      user: {
        id: 3,
        username: "created-user",
        role: "default",
      },
      error: null,
    }),
    where: jest.fn().mockResolvedValue([
      {
        id: 1,
        username: "admin-user",
        role: "admin",
        password: "secret",
      },
      {
        id: 2,
        username: "member-user",
        role: "default",
        password: "secret",
      },
    ]),
  },
}));

jest.mock("../../../models/workspace", () => ({
  Workspace: {
    get: jest.fn().mockResolvedValue({
      id: 12,
      name: "Test Workspace",
      slug: "test-workspace",
    }),
    new: jest.fn().mockResolvedValue({
      workspace: {
        id: 18,
        name: "Created Workspace",
        slug: "created-workspace",
      },
      message: "Workspace created",
    }),
    update: jest.fn().mockResolvedValue({
      workspace: {
        id: 12,
        name: "Renamed Workspace",
        slug: "test-workspace",
      },
      message: null,
    }),
  },
}));

jest.mock("../../../models/telemetry", () => ({
  Telemetry: {
    sendTelemetry: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock("../../../models/eventLogs", () => ({
  EventLogs: {
    logEvent: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock("../../../utils/helpers/updateENV", () => ({
  dumpENV: jest.fn(),
  updateENV: jest.fn().mockResolvedValue({
    newValues: { VectorDB: "lancedb" },
    error: null,
  }),
}));

jest.mock("../../../models/temporaryAuthToken", () => ({
  TemporaryAuthToken: {
    issue: jest.fn().mockResolvedValue({
      token: "temp-token",
      error: null,
    }),
  },
}));

const { ApiKey } = require("../../../models/apiKeys");
const { SystemSettings } = require("../../../models/systemSettings");
const { User } = require("../../../models/user");
const { Workspace } = require("../../../models/workspace");
const { updateENV } = require("../../../utils/helpers/updateENV");
process.env.STORAGE_DIR =
  process.env.STORAGE_DIR || path.resolve(__dirname, "../../../../storage");
const { createApp } = require("../../../app");

describe("API key capability enforcement", () => {
  const originalSimpleSSOEnabled = process.env.SIMPLE_SSO_ENABLED;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.SIMPLE_SSO_ENABLED;
  });

  afterAll(() => {
    if (originalSimpleSSOEnabled === undefined) {
      delete process.env.SIMPLE_SSO_ENABLED;
      return;
    }
    process.env.SIMPLE_SSO_ENABLED = originalSimpleSSOEnabled;
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

  test("workspace-service keys cannot list admin users", async () => {
    ApiKey.get.mockResolvedValue({
      id: 10,
      secret: "svc-admin-key",
      createdBy: 1,
      principalType: "workspace_service",
      workspaceId: 12,
      scopes: JSON.stringify(["workspace:api_sessions:read"]),
    });

    const app = createApp({ enableWebSockets: false });
    const response = await request(app)
      .get("/api/v1/admin/users")
      .set("Authorization", "Bearer svc-admin-key");

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      error: "API key cannot access this route.",
    });
  });

  test("metadata-read management keys cannot access user-management or mutate control-plane resources", async () => {
    ApiKey.get.mockResolvedValue({
      id: 11,
      secret: "mgmt-metadata-read-key",
      createdBy: 1,
      principalType: "management",
      scopes: JSON.stringify(["management:metadata:read"]),
    });

    const app = createApp({ enableWebSockets: false });
    const [
      adminUsersResponse,
      adminCreateResponse,
      adminPreferencesResponse,
      workspaceCreateResponse,
      workspaceUpdateResponse,
      systemResponse,
    ] = await Promise.all([
      request(app)
        .get("/api/v1/admin/users")
        .set("Authorization", "Bearer mgmt-metadata-read-key"),
      request(app)
        .post("/api/v1/admin/users/new")
        .set("Authorization", "Bearer mgmt-metadata-read-key")
        .send({ username: "created-user", password: "hunter2", role: "default" }),
      request(app)
        .post("/api/v1/admin/preferences")
        .set("Authorization", "Bearer mgmt-metadata-read-key")
        .send({ support_email: "support@example.com" }),
      request(app)
        .post("/api/v1/workspace/new")
        .set("Authorization", "Bearer mgmt-metadata-read-key")
        .send({ name: "Created Workspace" }),
      request(app)
        .post("/api/v1/workspace/test-workspace/update")
        .set("Authorization", "Bearer mgmt-metadata-read-key")
        .send({ name: "Renamed Workspace" }),
      request(app)
        .post("/api/v1/system/update-env")
        .set("Authorization", "Bearer mgmt-metadata-read-key")
        .send({ VectorDB: "lancedb" }),
    ]);

    for (const response of [
      adminUsersResponse,
      adminCreateResponse,
      adminPreferencesResponse,
      workspaceCreateResponse,
      workspaceUpdateResponse,
      systemResponse,
    ]) {
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        error: "API key cannot access this route.",
      });
    }

    expect(User.create).not.toHaveBeenCalled();
    expect(SystemSettings.updateSettings).not.toHaveBeenCalled();
    expect(Workspace.new).not.toHaveBeenCalled();
    expect(Workspace.update).not.toHaveBeenCalled();
    expect(updateENV).not.toHaveBeenCalled();
  });

  test("metadata-write management keys can mutate admin, workspace, and system resources", async () => {
    ApiKey.get.mockResolvedValue({
      id: 12,
      secret: "mgmt-metadata-write-key",
      createdBy: 1,
      principalType: "management",
      scopes: JSON.stringify(["management:metadata:write"]),
    });

    const app = createApp({ enableWebSockets: false });
    const [adminResponse, workspaceResponse, systemResponse] = await Promise.all([
      request(app)
        .post("/api/v1/admin/preferences")
        .set("Authorization", "Bearer mgmt-metadata-write-key")
        .send({ support_email: "support@example.com" }),
      request(app)
        .post("/api/v1/workspace/test-workspace/update")
        .set("Authorization", "Bearer mgmt-metadata-write-key")
        .send({ name: "Renamed Workspace" }),
      request(app)
        .post("/api/v1/system/update-env")
        .set("Authorization", "Bearer mgmt-metadata-write-key")
        .send({ VectorDB: "lancedb" }),
    ]);

    expect(adminResponse.status).toBe(200);
    expect(adminResponse.body).toEqual({
      success: true,
      error: null,
    });
    expect(SystemSettings.updateSettings).toHaveBeenCalledWith({
      support_email: "support@example.com",
    });

    expect(workspaceResponse.status).toBe(200);
    expect(workspaceResponse.body).toEqual({
      workspace: {
        id: 12,
        name: "Renamed Workspace",
        slug: "test-workspace",
      },
      message: null,
    });
    expect(Workspace.update).toHaveBeenCalledWith(12, {
      name: "Renamed Workspace",
    });

    expect(systemResponse.status).toBe(200);
    expect(systemResponse.body).toEqual({
      newValues: { VectorDB: "lancedb" },
      error: null,
    });
    expect(updateENV).toHaveBeenCalledWith({ VectorDB: "lancedb" });
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
    expect(
      require("../../../models/temporaryAuthToken").TemporaryAuthToken.issue
    ).not.toHaveBeenCalled();
  });

  test("management keys can list users on authorized routes", async () => {
    ApiKey.get.mockResolvedValue({
      id: 4,
      secret: "mgmt-users-key",
      createdBy: 1,
      principalType: "management",
      scopes: JSON.stringify(["management:users:read"]),
    });

    const app = createApp({ enableWebSockets: false });
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", "Bearer mgmt-users-key");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      users: [
        {
          id: 1,
          username: "admin-user",
          role: "admin",
        },
        {
          id: 2,
          username: "member-user",
          role: "default",
        },
      ],
    });
  });

  test("management user-read keys can list admin users but not create them", async () => {
    ApiKey.get.mockResolvedValue({
      id: 13,
      secret: "mgmt-admin-users-key",
      createdBy: 1,
      principalType: "management",
      scopes: JSON.stringify(["management:users:read"]),
    });

    const app = createApp({ enableWebSockets: false });
    const [listResponse, createResponse] = await Promise.all([
      request(app)
        .get("/api/v1/admin/users")
        .set("Authorization", "Bearer mgmt-admin-users-key"),
      request(app)
        .post("/api/v1/admin/users/new")
        .set("Authorization", "Bearer mgmt-admin-users-key")
        .send({ username: "created-user", password: "hunter2", role: "default" }),
    ]);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body).toEqual({
      users: [
        {
          id: 1,
          username: "admin-user",
          role: "admin",
          password: "secret",
        },
        {
          id: 2,
          username: "member-user",
          role: "default",
          password: "secret",
        },
      ],
    });

    expect(createResponse.status).toBe(403);
    expect(createResponse.body).toEqual({
      error: "API key cannot access this route.",
    });
    expect(User.create).not.toHaveBeenCalled();
  });
});

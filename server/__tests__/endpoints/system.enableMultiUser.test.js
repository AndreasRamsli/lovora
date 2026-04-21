/* eslint-env jest */
const express = require("express");
const request = require("supertest");

jest.mock("../../utils/files", () => ({
  viewLocalFiles: jest.fn(),
  normalizePath: jest.fn((value) => value),
  isWithin: jest.fn(() => true),
}));

jest.mock("../../utils/files/purgeDocument", () => ({
  purgeDocument: jest.fn(),
  purgeFolder: jest.fn(),
}));

jest.mock("../../utils/helpers", () => ({
  getVectorDbClass: jest.fn(),
}));

jest.mock("../../utils/helpers/updateENV", () => ({
  updateENV: jest.fn().mockResolvedValue({ error: null }),
  dumpENV: jest.fn(),
}));

jest.mock("../../utils/http", () => ({
  reqBody: jest.fn((request) => request.body || {}),
  makeJWT: jest.fn(),
  userFromSession: jest.fn(),
  multiUserMode: jest.fn(() => false),
  queryParams: jest.fn(),
}));

jest.mock("../../utils/files/multer", () => ({
  handleAssetUpload: jest.fn(),
  handlePfpUpload: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "uuid-123"),
}));

jest.mock("../../utils/middleware/validatedRequest", () => ({
  validatedRequest: (request, response, next) => {
    response.locals.multiUserMode = false;
    next();
  },
}));

jest.mock("../../models/user", () => ({
  User: {
    create: jest.fn(),
    delete: jest.fn(),
    _get: jest.fn(),
    filterFields: jest.fn((user) => user),
  },
}));

jest.mock("../../models/systemSettings", () => ({
  SystemSettings: {
    _updateSettings: jest.fn(),
    isMultiUserMode: jest.fn(),
    isOnboardingComplete: jest.fn(),
  },
}));

jest.mock("../../models/browserExtensionApiKey", () => ({
  BrowserExtensionApiKey: {
    migrateApiKeysToMultiUser: jest.fn(),
    restoreSharedKeysToSingleUser: jest.fn(),
  },
}));

jest.mock("../../models/telemetry", () => ({
  Telemetry: {
    sendTelemetry: jest.fn(),
  },
}));

jest.mock("../../models/eventLogs", () => ({
  EventLogs: {
    logEvent: jest.fn(),
  },
}));

jest.mock("../../utils/auth/defaultWorkspaceMembership", () => ({
  ensureDefaultWorkspaceMembership: jest.fn(),
}));

jest.mock("../../utils/middleware/multiUserProtected", () => ({
  flexUserRoleValid: jest.fn(() => (request, response, next) => next()),
  ROLES: { admin: "admin" },
  isMultiUserSetup: jest.fn(),
}));

jest.mock("../../utils/files/logo", () => ({
  getDefaultFilename: jest.fn(),
  determineLogoFilepath: jest.fn(),
  fetchLogo: jest.fn(),
  validFilename: jest.fn(),
  removeCustomLogo: jest.fn(),
  LOGO_FILENAME: "logo.png",
  isDefaultFilename: jest.fn(),
}));

jest.mock("../../utils/files/pfp", () => ({
  fetchPfp: jest.fn(),
  determinePfpFilepath: jest.fn(),
  getPfpBasePath: jest.fn(),
}));

jest.mock("../../utils/helpers/customModels", () => ({
  getCustomModels: jest.fn(),
}));

jest.mock("../../models/workspaceChats", () => ({
  WorkspaceChats: {},
}));

jest.mock("../../models/conversationFlags", () => ({
  ConversationFlags: {},
}));

jest.mock("../../utils/collectorApi", () => ({
  CollectorApi: {},
}));

jest.mock("../../utils/PasswordRecovery", () => ({
  recoverAccount: jest.fn(),
  resetPassword: jest.fn(),
  generateRecoveryCodes: jest.fn(),
}));

jest.mock("../../models/slashCommandsPresets", () => ({
  SlashCommandPresets: {},
}));

jest.mock("../../utils/EncryptionManager", () => ({
  EncryptionManager: jest.fn(),
}));

jest.mock("../../utils/middleware/simpleSSOEnabled", () => ({
  simpleSSOEnabled: jest.fn(),
  simpleSSOLoginDisabled: jest.fn(() => false),
}));

jest.mock("../../models/temporaryAuthToken", () => ({
  TemporaryAuthToken: {},
}));

jest.mock("../../models/systemPromptVariables", () => ({
  SystemPromptVariables: {},
}));

jest.mock("../../utils/chats", () => ({
  VALID_COMMANDS: [],
}));

jest.mock("../../utils/moderation/schemaReadiness", () => ({
  guardModerationSchema: jest.fn(async () => ({ ok: true })),
  handleModerationSchemaRouteError: jest.fn(),
  sendReadinessResponse: jest.fn(),
}));

const { systemEndpoints } = require("../../endpoints/system");
const { User } = require("../../models/user");
const { SystemSettings } = require("../../models/systemSettings");
const {
  ensureDefaultWorkspaceMembership,
} = require("../../utils/auth/defaultWorkspaceMembership");
const { updateENV } = require("../../utils/helpers/updateENV");
const {
  BrowserExtensionApiKey,
} = require("../../models/browserExtensionApiKey");
const { Telemetry } = require("../../models/telemetry");
const { EventLogs } = require("../../models/eventLogs");

describe("POST /system/enable-multi-user", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    User.delete.mockResolvedValue(true);
    BrowserExtensionApiKey.migrateApiKeysToMultiUser.mockResolvedValue(true);
    BrowserExtensionApiKey.restoreSharedKeysToSingleUser.mockResolvedValue(
      true
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  test("rolls back when browser-extension key migration fails", async () => {
    const app = express();
    app.use(express.json());
    systemEndpoints(app);

    User.create.mockResolvedValue({
      user: { id: 1, username: "andram", role: "admin" },
      error: null,
    });
    User._get.mockResolvedValue({
      id: 1,
      username: "andram",
      role: "admin",
      authProvider: "legacy",
    });
    ensureDefaultWorkspaceMembership.mockResolvedValue({
      id: 7,
      slug: "workspace",
    });
    BrowserExtensionApiKey.migrateApiKeysToMultiUser.mockResolvedValue(false);

    const res = await request(app)
      .post("/system/enable-multi-user")
      .send({
        username: "migration-failure-admin",
        password: "EpWcgCvyo1_01vWw@ws5sbll",
      });

    expect(res.status).toBe(500);
    expect(BrowserExtensionApiKey.migrateApiKeysToMultiUser).toHaveBeenCalledWith(
      1
    );
    expect(updateENV).not.toHaveBeenCalled();
    expect(Telemetry.sendTelemetry).not.toHaveBeenCalled();
    expect(EventLogs.logEvent).not.toHaveBeenCalled();
    expect(User.delete).toHaveBeenCalledWith({ id: 1 });
    expect(SystemSettings._updateSettings).toHaveBeenCalledWith({
      multi_user_mode: false,
    });
  });

  test("surfaces rollback failure when bootstrap-admin deletion fails", async () => {
    const app = express();
    app.use(express.json());
    systemEndpoints(app);

    User.create.mockResolvedValue({
      user: { id: 73, username: "delete-failure-admin", role: "admin" },
      error: null,
    });
    User._get.mockResolvedValue({
      id: 73,
      username: "delete-failure-admin",
      role: "admin",
      authProvider: "legacy",
    });
    User.delete.mockResolvedValue(false);
    ensureDefaultWorkspaceMembership.mockRejectedValue(
      new Error("membership failed")
    );

    const res = await request(app)
      .post("/system/enable-multi-user")
      .send({
        username: "delete-failure-admin",
        password: "EpWcgCvyo1_01vWw@ws5sbll",
      });

    expect(res.status).toBe(500);
    expect(User.delete).toHaveBeenCalledWith({ id: 73 });
    expect(res.body).toMatchObject({
      success: false,
      error: "Failed to delete bootstrap admin during rollback.",
    });
    expect(SystemSettings._updateSettings).not.toHaveBeenCalledWith({
      multi_user_mode: false,
    });
  });

  test("creates a legacy admin and assigns the default workspace", async () => {
    const app = express();
    app.use(express.json());
    systemEndpoints(app);

    User.create.mockResolvedValue({
      user: { id: 1, username: "andram", role: "admin" },
      error: null,
    });
    User._get.mockResolvedValue({
      id: 1,
      username: "andram",
      role: "admin",
      authProvider: "legacy",
    });
    ensureDefaultWorkspaceMembership.mockResolvedValue({
      id: 7,
      slug: "workspace",
    });

    const res = await request(app)
      .post("/system/enable-multi-user")
      .send({ username: "andram", password: "EpWcgCvyo1_01vWw@ws5sbll" });

    expect(res.status).toBe(200);
    expect(User.create).toHaveBeenCalledWith({
      username: "andram",
      password: "EpWcgCvyo1_01vWw@ws5sbll",
      role: "admin",
    });
    expect(User._get).toHaveBeenCalledWith({ id: 1 });
    expect(ensureDefaultWorkspaceMembership).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        username: "andram",
        authProvider: "legacy",
      })
    );
    expect(SystemSettings._updateSettings).toHaveBeenCalledWith({
      multi_user_mode: true,
    });
    expect(BrowserExtensionApiKey.migrateApiKeysToMultiUser).toHaveBeenCalledWith(
      1
    );
    expect(updateENV).toHaveBeenCalledWith(
      {
        JWTSecret: "uuid-123",
      },
      true
    );
    expect(Telemetry.sendTelemetry).toHaveBeenCalledWith(
      "enabled_multi_user_mode",
      {
        multiUserMode: true,
      }
    );
    expect(EventLogs.logEvent).toHaveBeenCalledWith(
      "multi_user_mode_enabled",
      {},
      1
    );
    expect(res.body).toMatchObject({
      success: true,
      error: null,
    });
  });

  test("rolls back only the just-created bootstrap identities on failure", async () => {
    const app = express();
    app.use(express.json());
    systemEndpoints(app);

    User.create.mockResolvedValue({
      user: { id: 41, username: "bootstrap-admin", role: "admin" },
      error: null,
    });
    User._get.mockResolvedValue({
      id: 41,
      username: "bootstrap-admin",
      role: "admin",
      authProvider: "legacy",
    });
    ensureDefaultWorkspaceMembership.mockRejectedValue(
      new Error("membership failed")
    );

    const res = await request(app)
      .post("/system/enable-multi-user")
      .send({
        username: "bootstrap-admin",
        password: "EpWcgCvyo1_01vWw@ws5sbll",
      });

    expect(res.status).toBe(500);
    expect(User.delete).toHaveBeenCalledWith({ id: 41 });
    expect(User.delete).not.toHaveBeenCalledWith({});
    expect(SystemSettings._updateSettings).toHaveBeenCalledWith({
      multi_user_mode: false,
    });
  });

  test("restores shared browser-extension keys before deleting the bootstrap admin when failure happens after migration", async () => {
    const app = express();
    app.use(express.json());
    systemEndpoints(app);

    User.create.mockResolvedValue({
      user: { id: 57, username: "post-migration-admin", role: "admin" },
      error: null,
    });
    User._get.mockResolvedValue({
      id: 57,
      username: "post-migration-admin",
      role: "admin",
      authProvider: "legacy",
    });
    ensureDefaultWorkspaceMembership.mockResolvedValue({
      id: 7,
      slug: "workspace",
    });
    BrowserExtensionApiKey.migrateApiKeysToMultiUser.mockResolvedValue(true);
    BrowserExtensionApiKey.restoreSharedKeysToSingleUser.mockResolvedValue(
      true
    );
    updateENV.mockRejectedValueOnce(new Error("env update failed"));

    const res = await request(app)
      .post("/system/enable-multi-user")
      .send({
        username: "post-migration-admin",
        password: "EpWcgCvyo1_01vWw@ws5sbll",
      });

    expect(res.status).toBe(500);
    expect(BrowserExtensionApiKey.migrateApiKeysToMultiUser).toHaveBeenCalledWith(
      57
    );
    expect(BrowserExtensionApiKey.restoreSharedKeysToSingleUser).toHaveBeenCalledWith(
      57
    );
    expect(
      BrowserExtensionApiKey.restoreSharedKeysToSingleUser.mock.invocationCallOrder[0]
    ).toBeLessThan(User.delete.mock.invocationCallOrder[0]);
    expect(User.delete).toHaveBeenCalledWith({ id: 57 });
  });

  test("aborts bootstrap-admin deletion when restoring shared browser-extension keys fails", async () => {
    const app = express();
    app.use(express.json());
    systemEndpoints(app);

    User.create.mockResolvedValue({
      user: { id: 61, username: "rollback-admin", role: "admin" },
      error: null,
    });
    User._get.mockResolvedValue({
      id: 61,
      username: "rollback-admin",
      role: "admin",
      authProvider: "legacy",
    });
    ensureDefaultWorkspaceMembership.mockResolvedValue({
      id: 7,
      slug: "workspace",
    });
    BrowserExtensionApiKey.migrateApiKeysToMultiUser.mockResolvedValue(true);
    BrowserExtensionApiKey.restoreSharedKeysToSingleUser.mockResolvedValue(
      false
    );
    updateENV.mockRejectedValueOnce(new Error("env update failed"));

    const res = await request(app)
      .post("/system/enable-multi-user")
      .send({
        username: "rollback-admin",
        password: "EpWcgCvyo1_01vWw@ws5sbll",
      });

    expect(res.status).toBe(500);
    expect(BrowserExtensionApiKey.restoreSharedKeysToSingleUser).toHaveBeenCalledWith(
      61
    );
    expect(User.delete).not.toHaveBeenCalled();
    expect(res.body).toMatchObject({
      success: false,
      error: "Failed to restore shared browser-extension keys during rollback.",
    });
    expect(SystemSettings._updateSettings).not.toHaveBeenCalledWith({
      multi_user_mode: false,
    });
  });
});

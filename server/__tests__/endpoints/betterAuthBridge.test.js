/* eslint-env jest */
const request = require("supertest");
const express = require("express");

jest.mock("../../utils/auth/betterAuthSession", () => ({
  getBetterAuthSessionFromRequest: jest.fn(),
  mapBetterAuthSessionToLegacyUser: jest.fn(),
}));

jest.mock("../../utils/auth/defaultWorkspaceMembership", () => ({
  ensureDefaultWorkspaceMembership: jest.fn(),
}));

jest.mock("../../utils/auth/legacyBetterAuthLogin", () => ({
  signInLegacyUserWithBetterAuth: jest.fn(),
}));

jest.mock("../../models/user", () => ({
  User: {
    filterFields: jest.fn((user) => ({ id: user.id, username: user.username })),
  },
}));

jest.mock("../../utils/http", () => ({
  makeJWT: jest.fn(() => "jwt-token"),
}));

const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("../../utils/auth/betterAuthSession");
const {
  ensureDefaultWorkspaceMembership,
} = require("../../utils/auth/defaultWorkspaceMembership");
const {
  signInLegacyUserWithBetterAuth,
} = require("../../utils/auth/legacyBetterAuthLogin");
const { makeJWT } = require("../../utils/http");
const { betterAuthBridgeEndpoints } = require("../../endpoints/betterAuthBridge");

describe("betterAuthBridgeEndpoints", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

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
    ensureDefaultWorkspaceMembership.mockResolvedValue({
      id: 7,
      slug: "default-workspace",
    });

    const res = await request(app).get("/auth/bridge/session");
    expect(res.status).toBe(200);
    expect(ensureDefaultWorkspaceMembership).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 10,
        username: "session@example.com",
      })
    );
    expect(res.body).toMatchObject({
      valid: true,
      user: {
        id: 10,
        username: "session@example.com",
      },
    });
  });

  test("returns legacy jwt payload via /auth/bridge/exchange", async () => {
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
    ensureDefaultWorkspaceMembership.mockResolvedValue({
      id: 7,
      slug: "default-workspace",
    });

    const res = await request(app).post("/auth/bridge/exchange");
    expect(res.status).toBe(200);
    expect(ensureDefaultWorkspaceMembership).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 10,
        username: "session@example.com",
      })
    );
    expect(makeJWT).toHaveBeenCalledTimes(1);
    expect(res.body).toMatchObject({
      valid: true,
      token: "jwt-token",
      user: {
        id: 10,
        username: "session@example.com",
      },
    });
  });

  test("returns 500 when workspace assignment fails", async () => {
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
    ensureDefaultWorkspaceMembership.mockRejectedValue(
      new Error("Default workspace not found for slug: default-workspace")
    );

    const res = await request(app).get("/auth/bridge/session");

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({
      valid: false,
      message: "Default workspace not found for slug: default-workspace",
    });
  });

  test("proxies legacy username login through the bridge endpoint", async () => {
    const app = express();
    app.use(express.json());
    betterAuthBridgeEndpoints(app);

    signInLegacyUserWithBetterAuth.mockResolvedValue({
      status: 200,
      contentType: "application/json; charset=utf-8",
      setCookies: ["better-auth.session=abc123; Path=/; HttpOnly"],
      body: {
        redirect: false,
        token: "better-auth-token",
      },
    });

    const res = await request(app)
      .post("/auth/bridge/legacy-login")
      .send({ username: "admin-user", password: "password" });

    expect(signInLegacyUserWithBetterAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        body: {
          username: "admin-user",
          password: "password",
        },
      })
    );
    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("better-auth.session=")])
    );
    expect(res.body).toMatchObject({
      token: "better-auth-token",
    });
  });
});

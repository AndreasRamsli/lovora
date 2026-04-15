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

jest.mock("../../utils/http", () => ({
  makeJWT: jest.fn(() => "jwt-token"),
}));

const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("../../utils/auth/betterAuthSession");
const { makeJWT } = require("../../utils/http");
const { betterAuthBridgeEndpoints } = require("../../endpoints/betterAuthBridge");

describe("betterAuthBridgeEndpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
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

    const res = await request(app).get("/auth/bridge/session");
    expect(res.status).toBe(200);
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

    const res = await request(app).post("/auth/bridge/exchange");
    expect(res.status).toBe(200);
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
});

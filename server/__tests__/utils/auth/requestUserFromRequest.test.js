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
const {
  resolveRequestUser,
} = require("../../../utils/auth/requestUserFromRequest");

describe("resolveRequestUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.JWT_SECRET;
  });

  test("returns mapped user from Better Auth session when cookie session is present", async () => {
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
    process.env.JWT_SECRET = "resolver-test-secret";
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { id: 42, username: "legacy@example.com" },
      process.env.JWT_SECRET
    );
    getBetterAuthSessionFromRequest.mockResolvedValue(null);
    User.get.mockResolvedValue({
      id: 42,
      username: "legacy@example.com",
      role: "default",
    });

    const request = { headers: { authorization: `Bearer ${token}` } };
    const response = { locals: {} };
    const user = await resolveRequestUser(request, response);
    expect(user).toMatchObject({ id: 42, username: "legacy@example.com" });
  });

  test("returns null when no session and no valid token", async () => {
    getBetterAuthSessionFromRequest.mockResolvedValue(null);
    const request = { headers: {} };
    const response = { locals: {} };
    const user = await resolveRequestUser(request, response);
    expect(user).toBeNull();
  });
});

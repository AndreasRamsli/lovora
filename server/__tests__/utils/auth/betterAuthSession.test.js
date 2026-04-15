/* eslint-env jest */
const { User } = require("../../../models/user");
const {
  mapBetterAuthSessionToLegacyUser,
} = require("../../../utils/auth/betterAuthSession");

describe("User Better Auth mapping helpers", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("normalizes auth provider default", () => {
    const value = User.normalizeAuthProvider(undefined);
    expect(value).toBe("legacy");
  });

  test("accepts better-auth provider", () => {
    const value = User.normalizeAuthProvider("better-auth");
    expect(value).toBe("better-auth");
  });

  test("falls back to legacy for unsupported providers", () => {
    const value = User.normalizeAuthProvider("google-oauth");
    expect(value).toBe("legacy");
  });

  test("creates legacy user with betterAuthUserId when missing", async () => {
    jest.spyOn(User, "_get")
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 99,
        username: "newuser@example.com",
        betterAuthUserId: "ba_123",
        authProvider: "better-auth",
      });
    jest.spyOn(User, "create").mockResolvedValue({
      user: { id: 99, username: "newuser@example.com" },
      error: null,
    });
    jest.spyOn(User, "_update").mockResolvedValue({
      user: { id: 99 },
      message: null,
    });

    const result = await mapBetterAuthSessionToLegacyUser({
      user: {
        id: "ba_123",
        email: "newuser@example.com",
        name: "New User",
      },
    });

    expect(result).toMatchObject({
      id: 99,
      betterAuthUserId: "ba_123",
      authProvider: "better-auth",
    });
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "newuser@example.com",
        role: "default",
      })
    );
  });
});

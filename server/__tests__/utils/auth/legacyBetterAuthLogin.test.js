/* eslint-env jest */
jest.mock("../../../utils/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock("../../../models/user", () => ({
  User: {
    _update: jest.fn(),
  },
}));

jest.mock("../../../utils/auth/betterAuthRuntime", () => ({
  getBetterAuthRuntime: jest.fn(),
}));

const prisma = require("../../../utils/prisma");
const { User } = require("../../../models/user");
const {
  getBetterAuthRuntime,
} = require("../../../utils/auth/betterAuthRuntime");
const {
  ensureBetterAuthUserForLegacyUser,
  getSyntheticEmailForLegacyUser,
} = require("../../../utils/auth/legacyBetterAuthLogin");

describe("legacyBetterAuthLogin", () => {
  let context;

  beforeEach(() => {
    context = {
      password: {
        hash: jest.fn().mockResolvedValue("hashed-password"),
      },
      internalAdapter: {
        createUser: jest.fn(),
        findAccounts: jest.fn().mockResolvedValue([]),
        linkAccount: jest.fn(),
        updatePassword: jest.fn(),
      },
    };

    getBetterAuthRuntime.mockResolvedValue({
      auth: {
        $context: Promise.resolve(context),
      },
    });
    User._update.mockResolvedValue({
      user: { id: 7 },
      message: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("creates a synthetic better-auth identity for legacy username accounts", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    context.internalAdapter.createUser.mockResolvedValue({
      id: "ba_123",
      email: "legacy-user-7@lovora.local",
    });

    const result = await ensureBetterAuthUserForLegacyUser(
      {
        id: 7,
        username: "admin-user",
        betterAuthUserId: null,
        authProvider: "legacy",
      },
      "super-secret"
    );

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "legacy-user-7@lovora.local" },
    });
    expect(context.password.hash).toHaveBeenCalledWith("super-secret");
    expect(context.internalAdapter.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "legacy-user-7@lovora.local",
        name: "admin-user",
        emailVerified: true,
      })
    );
    expect(context.internalAdapter.linkAccount).toHaveBeenCalledWith({
      userId: "ba_123",
      providerId: "credential",
      accountId: "ba_123",
      password: "hashed-password",
    });
    expect(User._update).toHaveBeenCalledWith(7, {
      betterAuthUserId: "ba_123",
      authProvider: "better-auth",
    });
    expect(result).toMatchObject({
      email: "legacy-user-7@lovora.local",
      betterAuthUser: {
        id: "ba_123",
      },
    });
  });

  test("updates the credential password for an existing linked better-auth user", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "ba_existing",
      email: "admin@example.com",
    });
    context.internalAdapter.findAccounts.mockResolvedValue([
      {
        providerId: "credential",
        password: "old-hash",
      },
    ]);

    const result = await ensureBetterAuthUserForLegacyUser(
      {
        id: 11,
        username: "admin@example.com",
        betterAuthUserId: "ba_existing",
        authProvider: "better-auth",
      },
      "new-password"
    );

    expect(context.internalAdapter.createUser).not.toHaveBeenCalled();
    expect(context.internalAdapter.linkAccount).not.toHaveBeenCalled();
    expect(context.internalAdapter.updatePassword).toHaveBeenCalledWith(
      "ba_existing",
      "hashed-password"
    );
    expect(User._update).not.toHaveBeenCalled();
    expect(result.email).toBe("admin@example.com");
  });

  test("derives stable synthetic email aliases for non-email usernames", () => {
    expect(
      getSyntheticEmailForLegacyUser({ id: 42, username: "admin-user" })
    ).toBe("legacy-user-42@lovora.local");
    expect(
      getSyntheticEmailForLegacyUser({ id: 42, username: "admin@example.com" })
    ).toBe("admin@example.com");
  });
});

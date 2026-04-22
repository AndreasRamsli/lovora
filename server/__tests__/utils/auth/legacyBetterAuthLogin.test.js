/* eslint-env jest */
jest.mock("../../../utils/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock("../../../models/user", () => ({
  User: {
    _update: jest.fn(),
    _get: jest.fn(),
  },
}));

jest.mock("../../../utils/auth/betterAuthRuntime", () => ({
  getBetterAuthRuntime: jest.fn(),
}));

jest.mock("../../../models/eventLogs", () => ({
  EventLogs: {
    logEvent: jest.fn(),
  },
}));

jest.mock("../../../models/telemetry", () => ({
  Telemetry: {
    sendTelemetry: jest.fn(),
  },
}));

const prisma = require("../../../utils/prisma");
const { User } = require("../../../models/user");
const { EventLogs } = require("../../../models/eventLogs");
const { Telemetry } = require("../../../models/telemetry");
const {
  getBetterAuthRuntime,
} = require("../../../utils/auth/betterAuthRuntime");
const {
  ensureBetterAuthUserForLegacyUser,
  getSyntheticEmailForLegacyUser,
  signInLegacyUserWithBetterAuth,
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
    User._get.mockResolvedValue(null);
    EventLogs.logEvent.mockResolvedValue({ eventLog: {}, message: null });
    Telemetry.sendTelemetry.mockResolvedValue(undefined);
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

  test("logs failed login outcomes and success telemetry for legacy bridge logins", async () => {
    const passwordHash = require("bcryptjs").hashSync("super-secret", 10);
    User._get.mockResolvedValue({
      id: 99,
      username: "admin-user",
      password: passwordHash,
      suspended: 0,
      authProvider: "legacy",
      betterAuthUserId: null,
    });
    context.internalAdapter.createUser.mockResolvedValue({
      id: "ba_999",
      email: "legacy-user-99@lovora.local",
    });
    context.internalAdapter.findAccounts.mockResolvedValue([]);
    getBetterAuthRuntime.mockResolvedValue({
      auth: {
        $context: Promise.resolve(context),
        api: {
          signInEmail: jest.fn().mockResolvedValue({
            status: 200,
            headers: {
              get: jest.fn().mockReturnValue("application/json; charset=utf-8"),
              getSetCookie: jest.fn().mockReturnValue([
                "better-auth.session=abc123; Path=/; HttpOnly",
              ]),
            },
            text: jest.fn().mockResolvedValue(JSON.stringify({ ok: true })),
          }),
        },
      },
    });
    User._get.mockResolvedValueOnce(null);

    await signInLegacyUserWithBetterAuth({
      body: { username: "missing-user", password: "whatever" },
      headers: {},
      ip: "127.0.0.1",
    });
    expect(EventLogs.logEvent).toHaveBeenCalledWith(
      "failed_login_invalid_username",
      { ip: "127.0.0.1", username: "missing-user" },
      undefined
    );

    EventLogs.logEvent.mockClear();
    User._get.mockResolvedValue({
      id: 99,
      username: "admin-user",
      password: passwordHash,
      suspended: 0,
      authProvider: "legacy",
      betterAuthUserId: null,
    });
    await signInLegacyUserWithBetterAuth({
      body: { username: "admin-user", password: "wrong-password" },
      headers: {},
      ip: "127.0.0.1",
    });
    expect(EventLogs.logEvent).toHaveBeenCalledWith(
      "failed_login_invalid_password",
      { ip: "127.0.0.1", username: "admin-user" },
      99
    );

    EventLogs.logEvent.mockClear();
    User._get.mockResolvedValue({
      id: 99,
      username: "admin-user",
      password: passwordHash,
      suspended: 1,
      authProvider: "legacy",
      betterAuthUserId: null,
    });
    await signInLegacyUserWithBetterAuth({
      body: { username: "admin-user", password: "super-secret" },
      headers: {},
      ip: "127.0.0.1",
    });
    expect(EventLogs.logEvent).toHaveBeenCalledWith(
      "failed_login_account_suspended",
      { ip: "127.0.0.1", username: "admin-user" },
      99
    );

    EventLogs.logEvent.mockClear();
    Telemetry.sendTelemetry.mockClear();
    User._get.mockResolvedValue({
      id: 99,
      username: "admin-user",
      password: passwordHash,
      suspended: 0,
      authProvider: "legacy",
      betterAuthUserId: null,
    });
    const response = await signInLegacyUserWithBetterAuth({
      body: { username: "admin-user", password: "super-secret" },
      headers: {},
      ip: "127.0.0.1",
    });
    expect(Telemetry.sendTelemetry).toHaveBeenCalledWith(
      "login_event",
      { multiUserMode: false },
      99
    );
    expect(EventLogs.logEvent).toHaveBeenCalledWith(
      "login_event",
      { ip: "127.0.0.1", username: "admin-user" },
      99
    );
    expect(response.status).toBe(200);
  });
});

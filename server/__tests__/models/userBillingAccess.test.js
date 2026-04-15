/* eslint-env jest */
const mockCount = jest.fn();
const mockWhere = jest.fn();

jest.mock("../../models/workspaceChats", () => ({
  WorkspaceChats: {
    count: (...args) => mockCount(...args),
    where: (...args) => mockWhere(...args),
  },
}));

const { User } = require("../../models/user");

describe("User.getChatAccessState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.FREE_MESSAGE_LIMIT = "5";
    process.env.FREE_MESSAGE_WINDOW_HOURS = "6";
  });

  afterAll(() => {
    delete process.env.FREE_MESSAGE_LIMIT;
    delete process.env.FREE_MESSAGE_WINDOW_HOURS;
  });

  test("allows admin users without quota checks", async () => {
    const state = await User.getChatAccessState({ id: 1, role: "admin" });

    expect(state).toMatchObject({
      allowed: true,
      reason: "admin_bypass",
      quota: null,
    });
    expect(mockCount).not.toHaveBeenCalled();
    expect(mockWhere).not.toHaveBeenCalled();
  });

  test("allows users with active paid billing period", async () => {
    const state = await User.getChatAccessState({
      id: 2,
      role: "default",
      billingStatus: "active",
      billingCurrentPeriodEnd: new Date(Date.now() + 60 * 60 * 1000),
    });

    expect(state).toMatchObject({
      allowed: true,
      reason: "paid_access",
      quota: null,
    });
    expect(mockCount).not.toHaveBeenCalled();
    expect(mockWhere).not.toHaveBeenCalled();
  });

  test("denies users after reaching free quota window", async () => {
    mockCount.mockResolvedValue(5);
    mockWhere.mockResolvedValue([
      {
        createdAt: new Date("2026-04-14T10:00:00.000Z"),
      },
    ]);

    const state = await User.getChatAccessState({
      id: 3,
      role: "default",
      dailyMessageLimit: null,
      billingStatus: "inactive",
      billingCurrentPeriodEnd: null,
    });

    expect(state.allowed).toBe(false);
    expect(state.reason).toBe("quota_reached");
    expect(state.quota).toMatchObject({
      limit: 5,
      windowHours: 6,
      used: 5,
      remaining: 0,
    });
    expect(state.quota.nextResetAt).toBeTruthy();
    expect(mockWhere).toHaveBeenCalledTimes(1);
  });
});

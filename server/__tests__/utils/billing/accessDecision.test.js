/* eslint-env jest */
const {
  hasActivePaidAccess,
  resolveAccessDecision,
} = require("../../../utils/billing/accessDecision");

describe("billing access decision", () => {
  test("treats only future active billing periods as paid access", () => {
    const now = new Date("2026-04-22T10:00:00.000Z");

    expect(
      hasActivePaidAccess(
        {
          billingStatus: "active",
          billingCurrentPeriodEnd: "2026-04-22T10:30:00.000Z",
        },
        { now }
      )
    ).toBe(true);

    expect(
      hasActivePaidAccess(
        {
          billingStatus: "active",
          billingCurrentPeriodEnd: "2026-04-22T09:59:59.000Z",
        },
        { now }
      )
    ).toBe(false);
  });

  test("gives admins access before billing and quota checks", () => {
    expect(
      resolveAccessDecision({
        user: {
          id: 1,
          role: "admin",
          billingStatus: "inactive",
          dailyMessageLimit: 1,
        },
        used: 999,
        defaultLimit: 5,
        windowHours: 6,
        now: new Date("2026-04-22T10:00:00.000Z"),
      })
    ).toEqual({
      allowed: true,
      reason: "admin_bypass",
      quota: null,
    });
  });

  test("gives active paid users access before quota exhaustion", () => {
    expect(
      resolveAccessDecision({
        user: {
          id: 2,
          role: "default",
          billingStatus: "active",
          billingCurrentPeriodEnd: "2026-04-22T12:00:00.000Z",
          dailyMessageLimit: 1,
        },
        used: 99,
        defaultLimit: 5,
        windowHours: 6,
        now: new Date("2026-04-22T10:00:00.000Z"),
      })
    ).toEqual({
      allowed: true,
      reason: "paid_access",
      quota: null,
    });
  });

  test("uses the free quota path when paid access is inactive", () => {
    expect(
      resolveAccessDecision({
        user: {
          id: 3,
          role: "default",
          billingStatus: "inactive",
          dailyMessageLimit: 2,
        },
        used: 1,
        defaultLimit: 5,
        windowHours: 6,
        now: new Date("2026-04-22T10:00:00.000Z"),
      })
    ).toEqual({
      allowed: true,
      reason: "within_quota",
      quota: {
        limit: 2,
        windowHours: 6,
        used: 1,
        remaining: 1,
        nextResetAt: null,
      },
    });
  });

  test("blocks when the free quota is exhausted and exposes the next reset time", () => {
    expect(
      resolveAccessDecision({
        user: {
          id: 4,
          role: "default",
          billingStatus: "inactive",
          dailyMessageLimit: null,
        },
        used: 5,
        defaultLimit: 5,
        windowHours: 6,
        oldestInWindowCreatedAt: "2026-04-22T08:30:00.000Z",
        now: new Date("2026-04-22T10:00:00.000Z"),
      })
    ).toEqual({
      allowed: false,
      reason: "quota_reached",
      quota: {
        limit: 5,
        windowHours: 6,
        used: 5,
        remaining: 0,
        nextResetAt: "2026-04-22T14:30:00.000Z",
      },
    });
  });
});

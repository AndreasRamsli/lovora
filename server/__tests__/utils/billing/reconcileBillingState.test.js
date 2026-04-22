/* eslint-env jest */
jest.mock("../../../models/user", () => ({
  User: {
    _get: jest.fn(),
    _update: jest.fn(),
  },
}));

const { PLAN_KEYS } = require("../../../utils/billing/plans");
const {
  reconcileBillingState,
} = require("../../../utils/billing/reconcileBillingState");
const { User } = require("../../../models/user");
const {
  main,
} = require("../../../scripts/reconcile-billing-state");

describe("billing reconciliation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("maps an active Stripe subscription into local billing fields", () => {
    const result = reconcileBillingState({
      user: {
        id: 7,
        billingPlan: "free",
        billingStatus: "inactive",
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        billingCurrentPeriodEnd: null,
      },
      stripeCustomer: { id: "cus_123" },
      stripeSubscription: {
        id: "sub_123",
        status: "active",
        metadata: {
          planKey: PLAN_KEYS.monthlySubscriptionAnnual,
        },
        items: {
          data: [{ current_period_end: 1779295523 }],
        },
      },
      now: new Date("2026-04-22T10:00:00.000Z"),
    });

    expect(result.changed).toBe(true);
    expect(result.updates).toEqual({
      stripeCustomerId: "cus_123",
      stripeSubscriptionId: "sub_123",
      billingPlan: PLAN_KEYS.monthlySubscriptionAnnual,
      billingStatus: "active",
      billingCurrentPeriodEnd: new Date("2026-05-20T16:45:23.000Z"),
    });
    expect(result.reason).toBe("subscription_active");
  });

  test("preserves an active month pass when no Stripe subscription is present", () => {
    const result = reconcileBillingState({
      user: {
        id: 8,
        billingPlan: PLAN_KEYS.monthPass,
        billingStatus: "active",
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        billingCurrentPeriodEnd: "2026-04-25T10:00:00.000Z",
      },
      stripeCustomer: { id: "cus_month_pass" },
      stripeSubscription: null,
      now: new Date("2026-04-22T10:00:00.000Z"),
    });

    expect(result.changed).toBe(true);
    expect(result.updates).toEqual({
      stripeCustomerId: "cus_month_pass",
    });
    expect(result.nextState).toMatchObject({
      billingPlan: PLAN_KEYS.monthPass,
      billingStatus: "active",
      stripeCustomerId: "cus_month_pass",
      stripeSubscriptionId: null,
      billingCurrentPeriodEnd: new Date("2026-04-25T10:00:00.000Z"),
    });
    expect(result.reason).toBe("month_pass_active");
  });

  test("resets the user to free when the subscription is canceled", () => {
    const result = reconcileBillingState({
      user: {
        id: 9,
        billingPlan: PLAN_KEYS.monthlySubscription,
        billingStatus: "active",
        stripeCustomerId: "cus_777",
        stripeSubscriptionId: "sub_777",
        billingCurrentPeriodEnd: "2026-05-20T16:45:23.000Z",
      },
      stripeCustomer: { id: "cus_777" },
      stripeSubscription: {
        id: "sub_777",
        status: "canceled",
        metadata: {
          planKey: PLAN_KEYS.monthlySubscription,
        },
      },
      now: new Date("2026-04-22T10:00:00.000Z"),
    });

    expect(result.changed).toBe(true);
    expect(result.updates).toEqual({
      stripeSubscriptionId: null,
      billingPlan: "free",
      billingStatus: "inactive",
      billingCurrentPeriodEnd: null,
    });
    expect(result.nextState).toMatchObject({
      stripeCustomerId: "cus_777",
      stripeSubscriptionId: null,
      billingPlan: "free",
      billingStatus: "inactive",
      billingCurrentPeriodEnd: null,
    });
    expect(result.reason).toBe("subscription_inactive");
  });

  test("requires explicit subscription input before applying reconciliation changes", async () => {
    User._get.mockResolvedValue({
      id: 12,
      username: "anna",
      billingPlan: PLAN_KEYS.monthlySubscription,
      billingStatus: "active",
      stripeCustomerId: "cus_123",
      stripeSubscriptionId: "sub_123",
      billingCurrentPeriodEnd: "2026-05-20T16:45:23.000Z",
    });

    await expect(main(["--user", "anna", "--apply"])).rejects.toThrow(
      "--apply requires explicit --subscription input"
    );
    expect(User._update).not.toHaveBeenCalled();
  });
});

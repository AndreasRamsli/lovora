/* eslint-env jest */
const {
  PLAN_KEYS,
  isStudentExamWindowOpen,
  listResolvedCheckoutPlans,
  resolveCheckoutPlan,
} = require("../../../utils/billing/plans");

describe("billing plan resolution", () => {
  beforeEach(() => {
    process.env.STRIPE_PRICE_PERSONAL_ENTRY_MONTHLY = "price_entry_monthly";
    process.env.STRIPE_PRICE_PERSONAL_ENTRY_ANNUAL = "price_entry_annual";
    process.env.STRIPE_PRICE_MONTH_PASS = "price_month_pass";
    process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION = "price_monthly_sub";
    process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION_ANNUAL =
      "price_monthly_sub_annual";
    process.env.STRIPE_PRICE_STUDENT_EXAM_MONTHLY = "price_exam_sub";
    process.env.STUDENT_EXAM_PERIOD_START = "2026-05-01T00:00:00.000Z";
    process.env.STUDENT_EXAM_PERIOD_END = "2026-06-30T23:59:59.000Z";
  });

  afterAll(() => {
    delete process.env.STRIPE_PRICE_PERSONAL_ENTRY_MONTHLY;
    delete process.env.STRIPE_PRICE_PERSONAL_ENTRY_ANNUAL;
    delete process.env.STRIPE_PRICE_MONTH_PASS;
    delete process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION;
    delete process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION_ANNUAL;
    delete process.env.STRIPE_PRICE_STUDENT_EXAM_MONTHLY;
    delete process.env.STUDENT_EXAM_PERIOD_START;
    delete process.env.STUDENT_EXAM_PERIOD_END;
  });

  test("resolves personal entry monthly as subscription", () => {
    const plan = resolveCheckoutPlan(
      PLAN_KEYS.personalEntryMonthly,
      new Date("2026-04-14T12:00:00.000Z")
    );

    expect(plan).toMatchObject({
      key: PLAN_KEYS.personalEntryMonthly,
      mode: "subscription",
      priceId: "price_entry_monthly",
      available: true,
      reason: null,
    });
  });

  test("resolves personal entry annual with the annual Stripe env var", () => {
    const plan = resolveCheckoutPlan(
      PLAN_KEYS.personalEntryAnnual,
      new Date("2026-04-14T12:00:00.000Z")
    );

    expect(plan).toMatchObject({
      key: PLAN_KEYS.personalEntryAnnual,
      mode: "subscription",
      priceId: "price_entry_annual",
      available: true,
      reason: null,
    });
  });

  test("resolves month pass as one-time payment", () => {
    const plan = resolveCheckoutPlan(
      PLAN_KEYS.monthPass,
      new Date("2026-04-14T12:00:00.000Z")
    );

    expect(plan).toMatchObject({
      key: PLAN_KEYS.monthPass,
      mode: "payment",
      priceId: "price_month_pass",
      available: true,
      reason: null,
    });
  });

  test("resolves monthly subscription annual with the annual Stripe env var", () => {
    const plan = resolveCheckoutPlan(
      PLAN_KEYS.monthlySubscriptionAnnual,
      new Date("2026-04-14T12:00:00.000Z")
    );

    expect(plan).toMatchObject({
      key: PLAN_KEYS.monthlySubscriptionAnnual,
      mode: "subscription",
      priceId: "price_monthly_sub_annual",
      available: true,
      reason: null,
    });
  });

  test("student exam plan is unavailable outside exam window", () => {
    const plan = resolveCheckoutPlan(
      PLAN_KEYS.studentExam,
      new Date("2026-04-14T12:00:00.000Z")
    );

    expect(plan.available).toBe(false);
    expect(plan.reason).toBe("exam_period_closed");
  });

  test("student exam plan is available inside exam window", () => {
    expect(isStudentExamWindowOpen(new Date("2026-05-20T12:00:00.000Z"))).toBe(
      true
    );
  });

  test("lists personal entry in the resolved checkout catalog", () => {
    const plans = listResolvedCheckoutPlans(
      new Date("2026-05-20T12:00:00.000Z")
    );

    expect(plans.map((plan) => plan.key)).toEqual(
      expect.arrayContaining([
        PLAN_KEYS.personalEntryMonthly,
        PLAN_KEYS.personalEntryAnnual,
        PLAN_KEYS.monthPass,
        PLAN_KEYS.monthlySubscription,
        PLAN_KEYS.monthlySubscriptionAnnual,
        PLAN_KEYS.studentExam,
      ])
    );
  });

  test("includes the annual plan keys in the plan resolver contract", () => {
    expect(PLAN_KEYS.personalEntryAnnual).toBe("personal_entry_annual");
    expect(PLAN_KEYS.monthlySubscriptionAnnual).toBe(
      "monthly_subscription_annual"
    );
  });
});

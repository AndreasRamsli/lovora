/* eslint-env jest */
process.env.STORAGE_DIR = process.env.STORAGE_DIR || "/tmp";

const { resolveSubscriptionPeriodEnd } = require("../../endpoints/billing");

describe("billing subscription period resolution", () => {
  test("uses item-level period end when Stripe omits the top-level field", () => {
    const resolved = resolveSubscriptionPeriodEnd({
      current_period_end: null,
      items: {
        data: [{ current_period_end: 1779295523 }],
      },
    });

    expect(resolved).toBeInstanceOf(Date);
    expect(resolved?.toISOString()).toBe("2026-05-20T16:45:23.000Z");
  });
});

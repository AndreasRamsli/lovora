/* eslint-env jest */
const express = require("express");
const request = require("supertest");
process.env.STORAGE_DIR = process.env.STORAGE_DIR || "/tmp";

jest.mock("../../utils/middleware/validatedRequest", () => ({
  validatedRequest: (_request, _response, next) => next(),
}));

jest.mock("../../utils/middleware/multiUserProtected", () => ({
  ROLES: { all: "all" },
  flexUserRoleValid: () => (_request, _response, next) => next(),
}));

jest.mock("../../utils/http", () => ({
  reqBody: (request) => request.body,
  userFromSession: jest.fn(),
}));

jest.mock("../../models/user", () => ({
  User: {
    _update: jest.fn(),
    getChatAccessState: jest.fn(async () => ({ canChat: true })),
  },
}));

jest.mock("../../utils/billing/stripeClient", () => ({
  getStripeClient: jest.fn(),
}));

const { User } = require("../../models/user");
const { getStripeClient } = require("../../utils/billing/stripeClient");
const { billingEndpoints, getCheckoutRedirectUrls, resolveSubscriptionPeriodEnd } = require("../../endpoints/billing");

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

describe("billing checkout redirects", () => {
  beforeEach(() => {
    process.env.BILLING_APP_BASE_URL = "https://app.lovora.no";
    process.env.STRIPE_PRICE_PERSONAL_ENTRY_MONTHLY = "price_entry_monthly";
    process.env.STRIPE_PRICE_PERSONAL_ENTRY_ANNUAL = "price_entry_annual";
    process.env.STRIPE_PRICE_MONTH_PASS = "price_month_pass";
    process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION = "price_monthly_sub";
    process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION_ANNUAL =
      "price_monthly_sub_annual";
    process.env.STRIPE_PRICE_STUDENT_EXAM_MONTHLY = "price_exam_sub";

    getStripeClient.mockReturnValue({
      customers: {
        create: jest.fn(async () => ({ id: "cus_123" })),
      },
      checkout: {
        sessions: {
          create: jest.fn(async () => ({ id: "cs_123", url: "https://stripe.test/session" })),
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.BILLING_APP_BASE_URL;
    delete process.env.STRIPE_PRICE_PERSONAL_ENTRY_MONTHLY;
    delete process.env.STRIPE_PRICE_PERSONAL_ENTRY_ANNUAL;
    delete process.env.STRIPE_PRICE_MONTH_PASS;
    delete process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION;
    delete process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION_ANNUAL;
    delete process.env.STRIPE_PRICE_STUDENT_EXAM_MONTHLY;
  });

  test("normalizes external redirect targets back to the allowlisted base", () => {
    expect(
      getCheckoutRedirectUrls(
        { origin: "https://app.lovora.no" },
        {
          workspaceSlug: "arbeidsrett",
          successUrl: "https://evil.example/redirect",
          cancelUrl: "https://evil.example/cancel",
        }
      )
    ).toEqual({
      successUrl: "https://app.lovora.no/workspace/arbeidsrett?billing=success",
      cancelUrl: "https://app.lovora.no/workspace/arbeidsrett?billing=cancel",
    });
  });

  test("uses safe same-origin redirect targets in checkout sessions", async () => {
    const app = express();
    app.use(express.json());
    app.use((request, response, next) => {
      response.locals.user = { id: 7, username: "anna", billingPlan: "free" };
      next();
    });
    billingEndpoints(app);

    const response = await request(app)
      .post("/billing/checkout-session")
      .set("Origin", "https://app.lovora.no")
      .send({
        planKey: "personal_entry_annual",
        workspaceSlug: "arbeidsrett",
        successUrl: "https://evil.example/return",
        cancelUrl: "https://evil.example/cancel",
      });

    expect(response.status).toBe(200);
    const stripeClient = getStripeClient.mock.results[0].value;
    expect(stripeClient.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url:
          "https://app.lovora.no/workspace/arbeidsrett?billing=success",
        cancel_url:
          "https://app.lovora.no/workspace/arbeidsrett?billing=cancel",
        metadata: expect.objectContaining({
          planKey: "personal_entry_annual",
          userId: "7",
        }),
      })
    );
    expect(User._update).toHaveBeenCalledWith(7, {
      stripeCustomerId: "cus_123",
    });
  });
});

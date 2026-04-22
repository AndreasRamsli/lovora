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
    _get: jest.fn(),
    _update: jest.fn(),
    getChatAccessState: jest.fn(async () => ({ canChat: true })),
  },
}));

jest.mock("../../models/stripeWebhookEvent", () => ({
  StripeWebhookEvent: {
    claim: jest.fn(),
    markProcessed: jest.fn(),
    markFailed: jest.fn(),
  },
}));

jest.mock("../../utils/billing/stripeClient", () => ({
  getStripeClient: jest.fn(),
}));

const { User } = require("../../models/user");
const { StripeWebhookEvent } = require("../../models/stripeWebhookEvent");
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

  test("derives the checkout base URL from the Origin header when the env base is unset", async () => {
    delete process.env.BILLING_APP_BASE_URL;

    const app = express();
    app.use(express.json());
    app.use((request, response, next) => {
      response.locals.user = { id: 8, username: "anna", billingPlan: "free" };
      next();
    });
    billingEndpoints(app);

    const response = await request(app)
      .post("/billing/checkout-session")
      .set("Origin", "https://app.lovora.no")
      .send({
        planKey: "monthly_subscription_annual",
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
      })
    );
  });

  test("fails checkout session creation if the local Stripe customer mapping cannot be saved", async () => {
    User._update.mockResolvedValueOnce({
      user: null,
      message: "failed to persist customer mapping",
    });

    const app = express();
    app.use(express.json());
    app.use((request, response, next) => {
      response.locals.user = { id: 10, username: "anna", billingPlan: "free" };
      next();
    });
    billingEndpoints(app);

    const response = await request(app)
      .post("/billing/checkout-session")
      .set("Origin", "https://app.lovora.no")
      .send({
        planKey: "personal_entry_annual",
        workspaceSlug: "arbeidsrett",
      });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      error: "failed to persist customer mapping",
    });
    const stripeClient = getStripeClient.mock.results[0].value;
    expect(stripeClient.customers.create).toHaveBeenCalledTimes(1);
    expect(stripeClient.checkout.sessions.create).not.toHaveBeenCalled();
  });

  test("rejects body-provided origins when no trusted checkout base is available", async () => {
    delete process.env.BILLING_APP_BASE_URL;

    const app = express();
    app.use(express.json());
    app.use((request, response, next) => {
      response.locals.user = { id: 9, username: "anna", billingPlan: "free" };
      next();
    });
    billingEndpoints(app);

    const response = await request(app).post("/billing/checkout-session").send({
      planKey: "personal_entry_annual",
      workspaceSlug: "arbeidsrett",
      origin: "https://evil.example",
      successUrl: "https://evil.example/return",
      cancelUrl: "https://evil.example/cancel",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error:
        "A same-origin successUrl and cancelUrl are required (or configure BILLING_APP_BASE_URL / request.origin).",
    });
    expect(getStripeClient).not.toHaveBeenCalled();
  });
});

describe("billing Stripe webhooks", () => {
  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });

  function buildWebhookApp() {
    const app = express();
    app.use(
      express.json({
        verify: (request, _response, buffer) => {
          request.rawBody = buffer;
        },
      })
    );
    billingEndpoints(app);
    return app;
  }

  test("processes a Stripe webhook event only once when duplicates arrive", async () => {
    const event = {
      id: "evt_123",
      type: "checkout.session.completed",
      livemode: false,
      data: {
        object: {
          mode: "payment",
          customer: "cus_123",
          metadata: {
            userId: "42",
            planKey: "month_pass",
          },
        },
      },
    };

    User._get.mockResolvedValue({
      id: 42,
      username: "anna",
      billingPlan: "free",
      billingStatus: "inactive",
    });
    StripeWebhookEvent.claim
      .mockResolvedValueOnce({
        claimed: true,
        event: { id: 1, stripeEventId: "evt_123", status: "processing" },
      })
      .mockResolvedValueOnce({
        claimed: false,
        event: { id: 1, stripeEventId: "evt_123", status: "processed" },
      });
    getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: jest.fn(() => event),
      },
    });

    const app = buildWebhookApp();

    const firstResponse = await request(app)
      .post("/billing/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .send({ ok: true });
    const duplicateResponse = await request(app)
      .post("/billing/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .send({ ok: true });

    expect(firstResponse.status).toBe(200);
    expect(duplicateResponse.status).toBe(200);
    expect(StripeWebhookEvent.claim).toHaveBeenCalledTimes(2);
    expect(User._update).toHaveBeenCalledTimes(1);
    expect(User._update).toHaveBeenCalledWith(
      42,
      expect.objectContaining({
        stripeCustomerId: "cus_123",
        billingPlan: "month_pass",
        billingStatus: "active",
      })
    );
    expect(StripeWebhookEvent.markProcessed).toHaveBeenCalledTimes(1);
    expect(StripeWebhookEvent.markProcessed).toHaveBeenCalledWith(1);
    expect(StripeWebhookEvent.markFailed).not.toHaveBeenCalled();
  });

  test("marks a claimed Stripe webhook event as failed when processing throws", async () => {
    const event = {
      id: "evt_456",
      type: "checkout.session.completed",
      livemode: false,
      data: {
        object: {
          mode: "payment",
          customer: "cus_999",
          metadata: {
            userId: "7",
            planKey: "month_pass",
          },
        },
      },
    };

    User._get.mockResolvedValue({
      id: 7,
      username: "anna",
      billingPlan: "free",
      billingStatus: "inactive",
    });
    User._update.mockRejectedValueOnce(new Error("db write failed"));
    StripeWebhookEvent.claim.mockResolvedValue({
      claimed: true,
      event: { id: 9, stripeEventId: "evt_456", status: "processing" },
    });
    getStripeClient.mockReturnValue({
      webhooks: {
        constructEvent: jest.fn(() => event),
      },
    });

    const app = buildWebhookApp();

    const response = await request(app)
      .post("/billing/stripe/webhook")
      .set("stripe-signature", "sig_test")
      .send({ ok: true });

    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({ error: "db write failed" });
    expect(StripeWebhookEvent.markProcessed).not.toHaveBeenCalled();
    expect(StripeWebhookEvent.markFailed).toHaveBeenCalledTimes(1);
    expect(StripeWebhookEvent.markFailed).toHaveBeenCalledWith(
      9,
      expect.any(Error)
    );
  });
});

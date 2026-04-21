const { reqBody, userFromSession } = require("../utils/http");
const { User } = require("../models/user");
const { validatedRequest } = require("../utils/middleware/validatedRequest");
const {
  ROLES,
  flexUserRoleValid,
} = require("../utils/middleware/multiUserProtected");
const { getStripeClient } = require("../utils/billing/stripeClient");
const {
  PLAN_KEYS,
  listResolvedCheckoutPlans,
  resolveCheckoutPlan,
} = require("../utils/billing/plans");

const MONTH_PASS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function hasValidAbsoluteUrl(url = "") {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function getCheckoutRedirectUrls(requestBody = {}) {
  const workspaceSlug = String(requestBody.workspaceSlug || "").trim();
  const appBaseUrl =
    requestBody.origin ||
    requestBody.appBaseUrl ||
    process.env.BILLING_APP_BASE_URL ||
    null;
  const defaultPath = workspaceSlug
    ? `/workspace/${workspaceSlug}`
    : "/settings/system/billing";

  const successUrl =
    requestBody.successUrl ||
    process.env.STRIPE_CHECKOUT_SUCCESS_URL ||
    (appBaseUrl ? `${appBaseUrl}${defaultPath}?billing=success` : null);
  const cancelUrl =
    requestBody.cancelUrl ||
    process.env.STRIPE_CHECKOUT_CANCEL_URL ||
    (appBaseUrl ? `${appBaseUrl}${defaultPath}?billing=cancel` : null);
  return { successUrl, cancelUrl };
}

function normalizeSubscriptionStatus(status = "inactive") {
  if (status === "active") return "active";
  if (!status) return "inactive";
  if (["canceled", "incomplete_expired", "unpaid"].includes(status)) {
    return "inactive";
  }
  return status;
}

function periodEndFromUnixTimestamp(unixTimestamp = null) {
  if (typeof unixTimestamp !== "number" || Number.isNaN(unixTimestamp)) {
    return null;
  }
  return new Date(unixTimestamp * 1000);
}

function resolveSubscriptionPeriodEnd(subscription = {}) {
  const topLevelPeriodEnd = periodEndFromUnixTimestamp(
    subscription.current_period_end
  );
  if (topLevelPeriodEnd) return topLevelPeriodEnd;

  const itemPeriodEnds = Array.isArray(subscription?.items?.data)
    ? subscription.items.data
        .map((item) => periodEndFromUnixTimestamp(item?.current_period_end))
        .filter(Boolean)
        .sort((left, right) => right.getTime() - left.getTime())
    : [];

  return itemPeriodEnds[0] ?? null;
}

async function findWebhookUser({
  metadata = {},
  stripeCustomerId = null,
  stripeSubscriptionId = null,
}) {
  const metadataUserId = Number(metadata?.userId);
  if (Number.isInteger(metadataUserId) && metadataUserId > 0) {
    const userFromId = await User._get({ id: metadataUserId });
    if (userFromId) return userFromId;
  }

  if (stripeSubscriptionId) {
    const userFromSubscription = await User._get({
      stripeSubscriptionId: String(stripeSubscriptionId),
    });
    if (userFromSubscription) return userFromSubscription;
  }

  if (stripeCustomerId) {
    const userFromCustomer = await User._get({
      stripeCustomerId: String(stripeCustomerId),
    });
    if (userFromCustomer) return userFromCustomer;
  }

  return null;
}

async function handleCheckoutSessionCompleted(session = {}) {
  const customerId = session.customer ? String(session.customer) : null;
  const metadata = session.metadata || {};
  const planKey = String(metadata.planKey || "");

  const user = await findWebhookUser({
    metadata,
    stripeCustomerId: customerId,
    stripeSubscriptionId: session.subscription
      ? String(session.subscription)
      : null,
  });
  if (!user) return;

  const updates = {};
  if (customerId) updates.stripeCustomerId = customerId;

  if (session.mode === "payment" && planKey === PLAN_KEYS.monthPass) {
    updates.billingPlan = PLAN_KEYS.monthPass;
    updates.billingStatus = "active";
    updates.billingCurrentPeriodEnd = new Date(
      Date.now() + MONTH_PASS_DURATION_MS
    );
    await User._update(user.id, updates);
    return;
  }

  if (session.mode === "subscription") {
    updates.billingPlan = planKey || PLAN_KEYS.monthlySubscription;
    updates.stripeSubscriptionId = session.subscription
      ? String(session.subscription)
      : null;
    await User._update(user.id, updates);
  }
}

async function handleStripeSubscriptionEvent(subscription = {}) {
  const metadata = subscription.metadata || {};
  const customerId = subscription.customer
    ? String(subscription.customer)
    : null;
  const subscriptionId = subscription.id ? String(subscription.id) : null;
  const user = await findWebhookUser({
    metadata,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
  });
  if (!user) return;

  const normalizedStatus = normalizeSubscriptionStatus(subscription.status);
  const updates = {
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    billingStatus: normalizedStatus,
    billingPlan:
      subscription.metadata?.planKey ||
      user.billingPlan ||
      PLAN_KEYS.monthlySubscription,
    billingCurrentPeriodEnd: resolveSubscriptionPeriodEnd(subscription),
  };

  if (subscription.status === "canceled") {
    updates.billingStatus = "inactive";
    updates.billingPlan = "free";
    updates.stripeSubscriptionId = null;
  }

  await User._update(user.id, updates);
}

function billingEndpoints(app) {
  if (!app) return;

  app.get(
    "/billing/status",
    [validatedRequest, flexUserRoleValid([ROLES.all])],
    async (request, response) => {
      try {
        const user =
          response.locals.user ?? (await userFromSession(request, response));
        if (!user) {
          response.status(401).json({ error: "Unauthorized" });
          return;
        }

        const chatAccess = await User.getChatAccessState(user);
        response.status(200).json({
          billing: {
            plan: user.billingPlan || "free",
            status: user.billingStatus || "inactive",
            currentPeriodEnd: user.billingCurrentPeriodEnd || null,
            stripeCustomerId: user.stripeCustomerId || null,
            stripeSubscriptionId: user.stripeSubscriptionId || null,
          },
          chatAccess,
          plans: listResolvedCheckoutPlans(new Date()),
        });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
      }
    }
  );

  app.post(
    "/billing/checkout-session",
    [validatedRequest, flexUserRoleValid([ROLES.all])],
    async (request, response) => {
      try {
        const user =
          response.locals.user ?? (await userFromSession(request, response));
        if (!user) {
          response.status(401).json({ error: "Unauthorized" });
          return;
        }

        const body = reqBody(request);
        const planKey = String(body.planKey || "");
        const checkoutPlan = resolveCheckoutPlan(planKey, new Date());

        if (!checkoutPlan.available) {
          response.status(400).json({
            error: "Plan is unavailable.",
            plan: checkoutPlan,
          });
          return;
        }

        const { successUrl, cancelUrl } = getCheckoutRedirectUrls({
          ...body,
          origin: request.headers.origin || null,
        });
        if (
          !hasValidAbsoluteUrl(successUrl) ||
          !hasValidAbsoluteUrl(cancelUrl)
        ) {
          response.status(400).json({
            error:
              "A valid successUrl and cancelUrl are required (or configure STRIPE_CHECKOUT_SUCCESS_URL / STRIPE_CHECKOUT_CANCEL_URL).",
          });
          return;
        }

        const stripe = getStripeClient();
        let stripeCustomerId = user.stripeCustomerId || null;

        if (!stripeCustomerId) {
          const customer = await stripe.customers.create({
            metadata: {
              userId: String(user.id),
              username: String(user.username || ""),
            },
          });
          stripeCustomerId = customer.id;
          await User._update(user.id, { stripeCustomerId });
        }

        const metadata = {
          userId: String(user.id),
          planKey: checkoutPlan.key,
        };

        const session = await stripe.checkout.sessions.create({
          mode: checkoutPlan.mode,
          customer: stripeCustomerId,
          line_items: [{ price: checkoutPlan.priceId, quantity: 1 }],
          success_url: successUrl,
          cancel_url: cancelUrl,
          metadata,
          client_reference_id: String(user.id),
          ...(checkoutPlan.mode === "subscription"
            ? { subscription_data: { metadata } }
            : { payment_intent_data: { metadata } }),
        });

        response.status(200).json({
          sessionId: session.id,
          url: session.url,
        });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: error.message });
      }
    }
  );

  app.post("/billing/stripe/webhook", async (request, response) => {
    const signature = request.headers["stripe-signature"];
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      response.status(400).json({ error: "Stripe webhook is not configured." });
      return;
    }

    if (!request.rawBody) {
      response.status(400).json({ error: "Missing raw request body." });
      return;
    }

    let event = null;
    try {
      const stripe = getStripeClient();
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: `Webhook Error: ${error.message}` });
      return;
    }

    try {
      switch (event.type) {
        case "checkout.session.completed":
          await handleCheckoutSessionCompleted(event.data.object);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          await handleStripeSubscriptionEvent(event.data.object);
          break;
        default:
          break;
      }
      response.status(200).json({ received: true });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error.message });
    }
  });
}

module.exports = { billingEndpoints, resolveSubscriptionPeriodEnd };

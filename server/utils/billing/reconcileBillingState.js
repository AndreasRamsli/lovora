const { PLAN_KEYS } = require("./plans");

function asDate(value = null) {
  if (!value) return null;
  const parsedValue = new Date(value);
  if (Number.isNaN(parsedValue.getTime())) return null;
  return parsedValue;
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

  const itemLevelPeriodEnds = Array.isArray(subscription?.items?.data)
    ? subscription.items.data
        .map((item) => periodEndFromUnixTimestamp(item?.current_period_end))
        .filter(Boolean)
        .sort((left, right) => right.getTime() - left.getTime())
    : [];

  return itemLevelPeriodEnds[0] ?? null;
}

function normalizeSubscriptionStatus(status = "inactive") {
  if (status === "active") return "active";
  if (!status) return "inactive";
  if (["canceled", "incomplete_expired", "unpaid"].includes(status)) {
    return "inactive";
  }
  return status;
}

function hasActiveMonthPass(user = null, now = new Date()) {
  const billingCurrentPeriodEnd = asDate(user?.billingCurrentPeriodEnd);
  return (
    user?.billingPlan === PLAN_KEYS.monthPass &&
    user?.billingStatus === "active" &&
    billingCurrentPeriodEnd &&
    billingCurrentPeriodEnd.getTime() > now.getTime()
  );
}

function isSameValue(left, right) {
  if (left instanceof Date || right instanceof Date) {
    const leftTime = asDate(left)?.getTime() ?? null;
    const rightTime = asDate(right)?.getTime() ?? null;
    return leftTime === rightTime;
  }

  return left === right;
}

function reconcileBillingState({
  user = {},
  stripeCustomer = null,
  stripeSubscription = null,
  now = new Date(),
} = {}) {
  const safeNow = asDate(now) || new Date();
  const currentState = {
    stripeCustomerId: user?.stripeCustomerId
      ? String(user.stripeCustomerId)
      : null,
    stripeSubscriptionId: user?.stripeSubscriptionId
      ? String(user.stripeSubscriptionId)
      : null,
    billingPlan: user?.billingPlan || "free",
    billingStatus: user?.billingStatus || "inactive",
    billingCurrentPeriodEnd: asDate(user?.billingCurrentPeriodEnd),
  };
  const stripeCustomerId = stripeCustomer?.id
    ? String(stripeCustomer.id)
    : currentState.stripeCustomerId;
  const stripeSubscriptionId = stripeSubscription?.id
    ? String(stripeSubscription.id)
    : null;

  let nextState = {
    ...currentState,
    stripeCustomerId,
  };
  let reason = "no_active_entitlement";

  if (stripeSubscriptionId) {
    const billingStatus = normalizeSubscriptionStatus(stripeSubscription.status);
    const billingPlan =
      stripeSubscription?.metadata?.planKey ||
      (currentState.billingPlan && currentState.billingPlan !== "free"
        ? currentState.billingPlan
        : PLAN_KEYS.monthlySubscription);
    const billingCurrentPeriodEnd =
      resolveSubscriptionPeriodEnd(stripeSubscription);

    if (billingStatus === "inactive") {
      if (hasActiveMonthPass(user, safeNow)) {
        nextState = {
          ...nextState,
          stripeSubscriptionId: null,
          billingPlan: PLAN_KEYS.monthPass,
          billingStatus: "active",
          billingCurrentPeriodEnd: asDate(user.billingCurrentPeriodEnd),
        };
        reason = "month_pass_active";
      } else {
        nextState = {
          ...nextState,
          stripeSubscriptionId: null,
          billingPlan: "free",
          billingStatus: "inactive",
          billingCurrentPeriodEnd: null,
        };
        reason = "subscription_inactive";
      }
    } else {
      nextState = {
        ...nextState,
        stripeSubscriptionId,
        billingPlan,
        billingStatus,
        billingCurrentPeriodEnd,
      };
      reason =
        billingStatus === "active"
          ? "subscription_active"
          : "subscription_recorded";
    }
  } else if (hasActiveMonthPass(user, safeNow)) {
    nextState = {
      ...nextState,
      stripeSubscriptionId: null,
      billingPlan: PLAN_KEYS.monthPass,
      billingStatus: "active",
      billingCurrentPeriodEnd: asDate(user.billingCurrentPeriodEnd),
    };
    reason = "month_pass_active";
  } else {
    nextState = {
      ...nextState,
      stripeSubscriptionId: null,
      billingPlan: "free",
      billingStatus: "inactive",
      billingCurrentPeriodEnd: null,
    };
  }

  const updates = {};
  for (const [key, value] of Object.entries(nextState)) {
    if (!isSameValue(currentState[key], value)) {
      updates[key] = value;
    }
  }

  return {
    changed: Object.keys(updates).length > 0,
    reason,
    currentState,
    nextState,
    updates,
  };
}

module.exports = {
  normalizeSubscriptionStatus,
  resolveSubscriptionPeriodEnd,
  reconcileBillingState,
};

function normalizeRole(role = "default") {
  return String(role || "default").trim().toLowerCase();
}

function asDate(value = null) {
  if (!value) return null;
  const parsedValue = new Date(value);
  if (Number.isNaN(parsedValue.getTime())) return null;
  return parsedValue;
}

function hasAdminBypass(user = null) {
  if (!user) return false;
  return normalizeRole(user.role) === "admin";
}

function hasActivePaidAccess(user = null, { now = new Date() } = {}) {
  if (!user) return false;
  if (user.billingStatus !== "active") return false;
  const billingCurrentPeriodEnd = asDate(user.billingCurrentPeriodEnd);
  if (!billingCurrentPeriodEnd) return false;
  return billingCurrentPeriodEnd.getTime() > now.getTime();
}

function resolveEffectiveQuotaLimit(user = null, defaultLimit = 5) {
  const parsedDefaultLimit = Number(defaultLimit);
  const safeDefaultLimit =
    Number.isNaN(parsedDefaultLimit) || parsedDefaultLimit < 1
      ? 5
      : Math.floor(parsedDefaultLimit);
  const parsedCustomLimit =
    user?.dailyMessageLimit === null
      ? safeDefaultLimit
      : Number(user?.dailyMessageLimit);

  if (Number.isNaN(parsedCustomLimit) || parsedCustomLimit < 1) {
    return safeDefaultLimit;
  }

  return Math.floor(parsedCustomLimit);
}

function resolveAccessDecision({
  user = null,
  used = 0,
  defaultLimit = 5,
  windowHours = 6,
  oldestInWindowCreatedAt = null,
  now = new Date(),
} = {}) {
  if (!user) {
    return {
      allowed: false,
      reason: "no_user",
      quota: null,
    };
  }

  if (hasAdminBypass(user)) {
    return {
      allowed: true,
      reason: "admin_bypass",
      quota: null,
    };
  }

  if (hasActivePaidAccess(user, { now })) {
    return {
      allowed: true,
      reason: "paid_access",
      quota: null,
    };
  }

  const limit = resolveEffectiveQuotaLimit(user, defaultLimit);
  const safeWindowHours = Math.max(Number(windowHours) || 6, 1);
  const safeUsed = Math.max(Number(used) || 0, 0);
  const remaining = Math.max(limit - safeUsed, 0);
  const baseQuota = {
    limit,
    windowHours: safeWindowHours,
    used: safeUsed,
    remaining,
    nextResetAt: null,
  };

  if (safeUsed < limit) {
    return {
      allowed: true,
      reason: "within_quota",
      quota: baseQuota,
    };
  }

  const oldestCreatedAt = asDate(oldestInWindowCreatedAt);
  const nextResetAt = oldestCreatedAt
    ? new Date(
        oldestCreatedAt.getTime() + safeWindowHours * 60 * 60 * 1000
      ).toISOString()
    : null;

  return {
    allowed: false,
    reason: "quota_reached",
    quota: {
      ...baseQuota,
      nextResetAt,
    },
  };
}

module.exports = {
  hasAdminBypass,
  hasActivePaidAccess,
  resolveAccessDecision,
};

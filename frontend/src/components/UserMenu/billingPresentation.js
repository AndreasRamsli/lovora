const PLAN_LABELS = {
  free: "Free",
  personal_entry_monthly: "Entry",
  personal_entry_annual: "Entry",
  month_pass: "Month Pass",
  monthly_subscription: "Professional",
  monthly_subscription_annual: "Professional",
  student_exam_monthly: "Student",
};

function formatFallbackPlanLabel(planKey = "") {
  const normalizedPlanKey = String(planKey || "").trim();

  if (!normalizedPlanKey) {
    return "Free";
  }

  return normalizedPlanKey
    .replace(/[_-]+/g, " ")
    .split(/\s+/)
    .map(
      (segment) =>
        segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
    )
    .join(" ");
}

export function formatBillingPlanLabel(planKey = "free") {
  const normalizedPlanKey = String(planKey || "free");
  return PLAN_LABELS[normalizedPlanKey] ?? formatFallbackPlanLabel(normalizedPlanKey);
}

export function deriveBillingPresentation(payload = null) {
  const billing = payload?.billing ?? {};
  const periodEnd = billing?.currentPeriodEnd
    ? new Date(billing.currentPeriodEnd)
    : null;
  const hasValidPeriod =
    periodEnd instanceof Date &&
    !Number.isNaN(periodEnd.getTime()) &&
    periodEnd.getTime() > Date.now();
  const isPaidActive = billing?.status === "active" && hasValidPeriod;
  const planLabel = isPaidActive
    ? formatBillingPlanLabel(billing?.plan)
    : "Free";

  return {
    billing,
    isPaidActive,
    isFree: !isPaidActive,
    planLabel,
    periodEnd,
  };
}

export function getBillingBannerContent(billingStatus = null) {
  if (!billingStatus) return null;

  if (billingStatus.isPaidActive) {
    return {
      eyebrow: "Membership active",
      title: billingStatus.planLabel,
      detail: "Your paid access is active now.",
      badgeLabel: "Active",
      actionLabel: null,
    };
  }

  return {
    eyebrow: "Free plan",
    title: billingStatus.planLabel,
    detail: "Unlock higher limits and premium access.",
    badgeLabel: null,
    actionLabel: "Upgrade",
  };
}

export function shouldShowUpgradeButton({
  loginMode = null,
  role = null,
  billingStatus = null,
  isBillingLoading = true,
} = {}) {
  return (
    !isBillingLoading &&
    loginMode === "multi" &&
    role === "default" &&
    Boolean(billingStatus?.isFree)
  );
}

export function buildBillingCheckoutUrls({
  workspaceSlug = null,
  currentHref = "",
} = {}) {
  if (workspaceSlug) {
    return {
      successUrl: null,
      cancelUrl: null,
    };
  }

  try {
    const currentUrl = new URL(currentHref);
    const successUrl = new URL(currentUrl.toString());
    const cancelUrl = new URL(currentUrl.toString());

    successUrl.searchParams.set("billing", "success");
    cancelUrl.searchParams.set("billing", "cancel");

    return {
      successUrl: successUrl.toString(),
      cancelUrl: cancelUrl.toString(),
    };
  } catch {
    return {
      successUrl: null,
      cancelUrl: null,
    };
  }
}

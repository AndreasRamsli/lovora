import fs from "node:fs";
import path from "node:path";
import { describe, expect, jest, test } from "@jest/globals";
import {
  buildBillingCheckoutUrls,
  deriveBillingPresentation,
  formatBillingPlanLabel,
  getBillingBannerContent,
  shouldShowUpgradeButton,
} from "./billingPresentation.js";

const userMenuRoot = path.dirname(new URL(import.meta.url).pathname);

describe("billingPresentation", () => {
  test("shows the upgrade CTA only for free default-role multi-user users", () => {
    const freeState = {
      isFree: true,
      isPaidActive: false,
      planLabel: "Free",
    };

    expect(
      shouldShowUpgradeButton({
        loginMode: "multi",
        role: "default",
        billingStatus: freeState,
        isBillingLoading: false,
      })
    ).toBe(true);

    expect(
      shouldShowUpgradeButton({
        loginMode: "multi",
        role: "admin",
        billingStatus: freeState,
        isBillingLoading: false,
      })
    ).toBe(false);

    expect(
      shouldShowUpgradeButton({
        loginMode: "single",
        role: "default",
        billingStatus: freeState,
        isBillingLoading: false,
      })
    ).toBe(false);

    expect(
      shouldShowUpgradeButton({
        loginMode: "multi",
        role: "manager",
        billingStatus: freeState,
        isBillingLoading: false,
      })
    ).toBe(false);
  });

  test("uses explicit success and cancel URLs when no workspace slug is present", () => {
    const urls = buildBillingCheckoutUrls({
      workspaceSlug: null,
      currentHref: "https://app.lovora.no/settings/security",
    });

    expect(urls).toEqual({
      successUrl: "https://app.lovora.no/settings/security?billing=success",
      cancelUrl: "https://app.lovora.no/settings/security?billing=cancel",
    });
  });

  test("omits explicit URLs for workspace pages that already have a valid slug", () => {
    const urls = buildBillingCheckoutUrls({
      workspaceSlug: "arbeidsrett",
      currentHref: "https://app.lovora.no/workspace/arbeidsrett",
    });

    expect(urls).toEqual({
      successUrl: null,
      cancelUrl: null,
    });
  });

  test("maps raw billing plan keys into customer-facing labels", () => {
    expect(formatBillingPlanLabel("free")).toBe("Free");
    expect(formatBillingPlanLabel("month_pass")).toBe("Month Pass");
    expect(formatBillingPlanLabel("monthly_subscription")).toBe("Professional");
    expect(formatBillingPlanLabel("student_exam_monthly")).toBe("Student");
  });

  test("marks active paid access only when status is active and the period is in the future", () => {
    const state = deriveBillingPresentation({
      billing: {
        plan: "monthly_subscription",
        status: "active",
        currentPeriodEnd: "2099-05-20T16:45:23.000Z",
      },
    });

    expect(state.isPaidActive).toBe(true);
    expect(state.isFree).toBe(false);
    expect(state.planLabel).toBe("Professional");
  });

  test("treats missing or expired periods as free access", () => {
    const state = deriveBillingPresentation({
      billing: {
        plan: "monthly_subscription",
        status: "active",
        currentPeriodEnd: null,
      },
    });

    expect(state.isPaidActive).toBe(false);
    expect(state.isFree).toBe(true);
    expect(state.planLabel).toBe("Free");
  });

  test("keeps active unknown plans from falling back to free", () => {
    const state = deriveBillingPresentation({
      billing: {
        plan: "future_paid_tier",
        status: "active",
        currentPeriodEnd: "2099-05-20T16:45:23.000Z",
      },
    });

    expect(state.isPaidActive).toBe(true);
    expect(state.planLabel).not.toBe("Free");
    expect(state.planLabel).toBe("Future Paid Tier");
  });

  test("returns active banner copy for paid users", () => {
    const state = deriveBillingPresentation({
      billing: {
        plan: "monthly_subscription",
        status: "active",
        currentPeriodEnd: "2099-05-20T16:45:23.000Z",
      },
    });

    expect(getBillingBannerContent(state)).toMatchObject({
      eyebrow: "Membership active",
      title: "Professional",
      detail: "Your paid access is active now.",
      actionLabel: null,
    });
  });

  test("returns upgrade-oriented banner copy for free users", () => {
    const state = deriveBillingPresentation({
      billing: {
        plan: "free",
        status: "inactive",
        currentPeriodEnd: null,
      },
    });

    expect(getBillingBannerContent(state)).toMatchObject({
      eyebrow: "Free plan",
      title: "Free",
      detail: "Unlock higher limits and premium access.",
      actionLabel: "Upgrade",
    });
  });

  test("Billing.createCheckoutSession serializes explicit checkout URLs", async () => {
    await jest.unstable_mockModule("../../utils/constants.js", () => ({
      API_BASE: "https://api.example",
    }));
    await jest.unstable_mockModule("../../utils/request.js", () => ({
      baseHeaders: () => ({ "content-type": "application/json" }),
    }));

    const Billing = (await import("../../models/billing.js")).default;
    const originalFetch = globalThis.fetch;
    const fetchMock = jest.fn(async () => ({
      ok: true,
      json: async () => ({ url: "https://checkout.example/session" }),
    }));
    globalThis.fetch = fetchMock;

    try {
      await Billing.createCheckoutSession({
        planKey: "monthly_subscription",
        workspaceSlug: "arbeidsrett",
        successUrl: "https://app.lovora.no/settings/security?billing=success",
        cancelUrl: "https://app.lovora.no/settings/security?billing=cancel",
      });

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [, requestInit] = fetchMock.mock.calls[0];

      expect(JSON.parse(requestInit.body)).toEqual({
        planKey: "monthly_subscription",
        workspaceSlug: "arbeidsrett",
        successUrl: "https://app.lovora.no/settings/security?billing=success",
        cancelUrl: "https://app.lovora.no/settings/security?billing=cancel",
      });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  test("BillingShell passes checkout URLs from checkoutContext into PricingGate", () => {
    const source = fs.readFileSync(
      path.join(userMenuRoot, "BillingShell.jsx"),
      "utf8"
    );
    const pricingGateStart = source.indexOf("<PricingGate");
    const pricingGateEnd = source.indexOf("/>", pricingGateStart);
    const pricingGateProps = source.slice(pricingGateStart, pricingGateEnd);

    expect(pricingGateProps).toContain(
      "successUrl={contextValue.checkoutContext.successUrl}"
    );
    expect(pricingGateProps).toContain(
      "cancelUrl={contextValue.checkoutContext.cancelUrl}"
    );
  });

  test("PricingGate forwards success and cancel URLs into Billing.createCheckoutSession", () => {
    const source = fs.readFileSync(
      path.join(
        userMenuRoot,
        "..",
        "WorkspaceChat",
        "ChatContainer",
        "PricingGate",
        "index.jsx"
      ),
      "utf8"
    );
    const checkoutCallStart = source.indexOf("Billing.createCheckoutSession({");
    const checkoutCallEnd = source.indexOf("});", checkoutCallStart);
    const checkoutCall = source.slice(checkoutCallStart, checkoutCallEnd);

    expect(checkoutCall).toContain("successUrl");
    expect(checkoutCall).toContain("cancelUrl");
  });

  test("billing shell skips status refresh when login mode is not multi", () => {
    const source = fs.readFileSync(
      path.join(userMenuRoot, "BillingShell.jsx"),
      "utf8"
    );
    const refreshStart = source.indexOf(
      "const refreshBillingStatus = useCallback"
    );
    const refreshEnd = source.indexOf("useEffect(() => {", refreshStart);
    const refreshBody = source.slice(refreshStart, refreshEnd);

    expect(refreshBody).toContain('loginMode !== "multi"');
    expect(refreshBody).toContain("setStatus(null)");
    expect(refreshBody).toContain("setIsBillingLoading(false)");
    expect(refreshBody).toContain("return null");
  });

  test("user button gates both upgrade entry points with shouldShowUpgradeButton", () => {
    const source = fs.readFileSync(
      path.join(userMenuRoot, "UserButton", "index.jsx"),
      "utf8"
    );

    expect(source).toContain("shouldShowUpgradeButton");
    expect(source).toContain("const canUpgrade = shouldShowUpgradeButton({");
    expect(source).toContain("role: user?.role ?? null");
    expect(source).toContain("loginMode: mode");
    expect(source).toContain("visible={canUpgrade}");
    expect(source).toContain("billingStatus?.isPaidActive || canUpgrade");
    expect(source).toContain("onUpgrade={");
    expect(source).toContain("canUpgrade");
    expect(source).toContain(": null");
  });
});

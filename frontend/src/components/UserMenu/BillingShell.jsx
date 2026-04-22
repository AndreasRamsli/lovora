import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import Billing from "@/models/billing";
import PricingGate from "@/components/WorkspaceChat/ChatContainer/PricingGate";
import { cn } from "@/lib/utils";
import useLoginMode from "@/hooks/useLoginMode";
import { useTheme } from "@/hooks/useTheme";
import { getPricingTheme } from "@/components/WorkspaceChat/ChatContainer/PricingGate/pricingTheme";
import {
  buildBillingCheckoutUrls,
  deriveBillingPresentation,
} from "./billingPresentation";

const BillingShellContext = createContext({
  billingStatus: null,
  isBillingLoading: true,
  openPricingGate: () => {},
  closePricingGate: () => {},
  refreshBillingStatus: async () => null,
});

export function BillingShell({ children }) {
  const { slug: workspaceSlug = null } = useParams();
  const location = useLocation();
  const loginMode = useLoginMode();
  const { resolvedTheme } = useTheme();
  const pricingTheme = getPricingTheme(
    resolvedTheme === "light" ? "light" : "dark"
  );
  const [status, setStatus] = useState(null);
  const [isBillingLoading, setIsBillingLoading] = useState(true);
  const [showPricingGate, setShowPricingGate] = useState(false);
  const checkoutContext = useMemo(
    () =>
      buildBillingCheckoutUrls({
        workspaceSlug,
        currentHref: `${window.location.origin}${location.pathname}${location.search}${location.hash}`,
      }),
    [workspaceSlug, location.pathname, location.search, location.hash]
  );

  const refreshBillingStatus = useCallback(async () => {
    if (loginMode !== "multi") {
      setStatus(null);
      setIsBillingLoading(false);
      return null;
    }

    setIsBillingLoading(true);
    const result = await Billing.status();
    setStatus(result?.error ? null : result);
    setIsBillingLoading(false);
    return result;
  }, [loginMode]);

  useEffect(() => {
    if (loginMode !== "multi") {
      setStatus(null);
      setIsBillingLoading(false);
      return;
    }

    refreshBillingStatus();
  }, [loginMode, refreshBillingStatus]);

  const contextValue = useMemo(
    () => ({
      billingStatus: status ? deriveBillingPresentation(status) : null,
      isBillingLoading,
      checkoutContext,
      openPricingGate: () => setShowPricingGate(true),
      closePricingGate: () => setShowPricingGate(false),
      refreshBillingStatus,
    }),
    [status, isBillingLoading, checkoutContext, refreshBillingStatus]
  );

  return (
    <BillingShellContext.Provider value={contextValue}>
      {children}
      {showPricingGate && (
        <div
          className={cn(
            "fixed inset-0 z-[70] flex items-start justify-center p-5 backdrop-blur-sm md:p-6",
            pricingTheme.overlay
          )}
          onClick={contextValue.closePricingGate}
        >
          <PricingGate
            workspaceSlug={workspaceSlug}
            successUrl={contextValue.checkoutContext.successUrl}
            cancelUrl={contextValue.checkoutContext.cancelUrl}
            centered
            onClose={contextValue.closePricingGate}
          />
        </div>
      )}
    </BillingShellContext.Provider>
  );
}

export function useBillingShell() {
  return useContext(BillingShellContext);
}

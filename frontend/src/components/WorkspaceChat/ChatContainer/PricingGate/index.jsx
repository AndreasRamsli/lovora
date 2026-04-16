import { useState } from "react";
import { ArrowUpRight, Check, Sparkles, X } from "lucide-react";
import Billing from "@/models/billing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import paths from "../../../../utils/paths.js";
import {
  PRICING_LADDER,
  STUDENT_CALLOUT,
  TEAM_CONTACT_HREF,
  getPrimaryAction,
} from "./pricingCatalog";

function resolveActionHref(action) {
  if (action?.href === TEAM_CONTACT_HREF) {
    return paths.mailToMintplex();
  }

  return action?.href;
}

function PricingCard({
  tier,
  isAnnual,
  onAnnualChange,
  isLoading,
  onCheckout,
}) {
  const action = getPrimaryAction(tier);
  const showAnnualPrice =
    tier.slug === "serious-individual" && isAnnual && tier.annualPriceLabel;
  const displayPrice = showAnnualPrice
    ? tier.annualPriceLabel
    : tier.priceLabel;
  const actionHref = action.kind === "link" ? resolveActionHref(action) : null;

  return (
    <Card
      className={cn(
        "relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[1.75rem] border px-5 pb-5 pt-5 [font-family:Inter,ui-sans-serif,system-ui,sans-serif] xl:min-h-[29rem]",
        "shadow-[0_24px_90px_-55px_rgba(59,130,246,0.6)]",
        tier.highlighted
          ? "border-[#2e4e7a] bg-[linear-gradient(180deg,#051120_0%,#0c2340_100%)]"
          : "border-[#21314d] bg-[linear-gradient(180deg,#06090f_0%,#0a1018_100%)]"
      )}
    >
      {tier.highlighted && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(56,189,248,0.18),transparent_40%)]" />
      )}

      <div className="relative z-10 flex min-h-[4.5rem] items-start justify-between gap-4">
        <div>
          {tier.badge && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-200">
              <Sparkles className="h-3.5 w-3.5" />
              {tier.badge}
            </div>
          )}
          <h2 className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white">
            {tier.name}
          </h2>
          <p className="mt-2 max-w-[28rem] text-[0.95rem] leading-6 text-[#9cacc4]">
            {tier.subtitle}
          </p>
        </div>

        {tier.slug === "serious-individual" ? (
          <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#94a3b8]">
              Annual
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={onAnnualChange}
              className="h-7 w-12 border-0 bg-[#334155] [&>span]:bg-[#d7e4f7] [&>span]:shadow-none data-[state=checked]:bg-[#0ea5e9] data-[state=unchecked]:bg-[#334155]"
            />
          </div>
        ) : (
          <div className="text-right text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#64748b]">
            {tier.slug === "professional-team" ? "Sales-led" : "Self-serve"}
          </div>
        )}
      </div>

      <Separator
        className={cn("my-5 bg-white/10", tier.highlighted && "bg-[#26486c]")}
      />

      <div className="relative z-10">
        <div className="text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-[#f8fbff]">
          {displayPrice}
        </div>
        {tier.secondaryOffer && (
          <button
            type="button"
            className="mt-3 inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-100 transition-colors hover:bg-sky-400/20"
            onClick={() => onCheckout(tier.secondaryOffer.planKey)}
            disabled={isLoading}
          >
            Month Pass: {tier.secondaryOffer.label}
          </button>
        )}
        {tier.note && (
          <p className="mt-3 text-sm leading-6 text-[#90a0b7]">{tier.note}</p>
        )}
      </div>

      <Separator
        className={cn("my-5 bg-white/10", tier.highlighted && "bg-[#26486c]")}
      />

      <ul className="relative z-10 space-y-3 text-[0.94rem] leading-6 text-[#d9e4f2]">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                tier.highlighted
                  ? "border-sky-300/30 bg-sky-300/10 text-sky-100"
                  : "border-white/10 bg-white/5 text-white"
              )}
            >
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto pt-6">
        {action.kind === "checkout" ? (
          <Button
            className={cn(
              "h-[3.2rem] w-full rounded-full text-[0.98rem] font-semibold shadow-none",
              tier.highlighted
                ? "bg-[#0ea5e9] text-white hover:bg-[#0284c7]"
                : "bg-[#1f2a37] text-[#eef6ff] hover:bg-[#2a3646]"
            )}
            disabled={isLoading}
            onClick={() => onCheckout(action.planKey)}
          >
            {isLoading ? "Redirecting..." : action.label}
          </Button>
        ) : (
          <Button
            asChild
            className="h-[3.2rem] w-full rounded-full bg-[#1f2a37] text-[0.98rem] font-semibold text-[#eef6ff] shadow-none hover:bg-[#2a3646]"
          >
            <a href={actionHref} className="gap-2">
              {action.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function PricingGate({
  workspaceSlug,
  onClose,
  centered = false,
}) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [submittingPlan, setSubmittingPlan] = useState(null);
  const [error, setError] = useState("");

  async function handleCheckout(planKey) {
    setError("");
    setSubmittingPlan(planKey);
    const result = await Billing.createCheckoutSession({
      planKey,
      workspaceSlug,
    });
    setSubmittingPlan(null);

    if (result?.url) {
      window.location.assign(result.url);
      return;
    }

    setError(
      result?.error ||
        result?.message ||
        "Unable to start checkout right now. Please try again."
    );
  }

  return (
    <div
      className={cn(
        "w-full",
        centered
          ? "mt-4 max-w-[1660px]"
          : "mx-auto flex h-full max-h-full max-w-[1660px] items-stretch"
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="relative flex h-full w-full flex-col [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
        {typeof onClose === "function" && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 z-20 h-10 w-10 rounded-full border border-white/12 bg-black/30 text-white/80 hover:bg-white/10 hover:text-white"
            onClick={onClose}
            aria-label="Close pricing options"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <div
          className={cn(
            "grid h-full min-h-0 grid-cols-1 items-stretch gap-4 pt-1 xl:grid-cols-3",
            onClose && "pr-14"
          )}
        >
          {PRICING_LADDER.map((tier) => (
            <PricingCard
              key={tier.slug}
              tier={tier}
              isAnnual={isAnnual}
              onAnnualChange={setIsAnnual}
              isLoading={
                submittingPlan === tier.planKey ||
                submittingPlan === tier.secondaryOffer?.planKey
              }
              onCheckout={handleCheckout}
            />
          ))}
        </div>

        <Card className="mt-4 flex flex-col gap-4 rounded-[1.5rem] border border-[#21314d] bg-[linear-gradient(180deg,#07111f_0%,#0a1321_100%)] px-5 py-5 [font-family:Inter,ui-sans-serif,system-ui,sans-serif] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-sky-200">
              {STUDENT_CALLOUT.title}
            </p>
            <h3 className="mt-2 text-[1.45rem] font-semibold text-white">
              {STUDENT_CALLOUT.priceLabel}
            </h3>
            <p className="mt-2 max-w-[44rem] text-sm leading-6 text-[#97a7be]">
              {STUDENT_CALLOUT.supportingText}
            </p>
          </div>

          <Button
            className="h-[3rem] rounded-full bg-[#0f172a] px-6 text-[0.95rem] font-semibold text-[#eef6ff] shadow-none hover:bg-[#162033]"
            disabled={submittingPlan === STUDENT_CALLOUT.planKey}
            onClick={() => handleCheckout(STUDENT_CALLOUT.planKey)}
          >
            {submittingPlan === STUDENT_CALLOUT.planKey
              ? "Redirecting..."
              : STUDENT_CALLOUT.ctaLabel}
          </Button>
        </Card>

        {error && (
          <p
            className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

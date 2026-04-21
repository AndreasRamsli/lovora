import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Clock3,
  FileText,
  Files,
  GraduationCap,
  Infinity as InfinityIcon,
  Layers3,
  MessageSquare,
  Pencil,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  Upload,
  Users,
  X,
} from "lucide-react";
import Billing from "@/models/billing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import paths from "../../../../utils/paths.js";
import {
  PRICING_LADDER,
  STUDENT_CALLOUT,
  TEAM_CONTACT_HREF,
  getDisplayPriceLabel,
  getPrimaryAction,
} from "./pricingCatalog";
import { getPricingTheme, PRICING_LAYOUT_CLASSES } from "./pricingTheme";
import {
  PricingButton,
  PricingDivider,
  PricingSwitch,
} from "./pricingPrimitives";

const ICON_MAP = {
  "bar-chart-3": BarChart3,
  "badge-check": BadgeCheck,
  "book-open": BookOpen,
  briefcase: Briefcase,
  "clock-3": Clock3,
  "file-text": FileText,
  files: Files,
  "graduation-cap": GraduationCap,
  infinity: InfinityIcon,
  "layers-3": Layers3,
  "message-square": MessageSquare,
  pencil: Pencil,
  scale: Scale,
  search: Search,
  settings: Settings,
  "shield-check": ShieldCheck,
  upload: Upload,
  users: Users,
};

function resolveActionHref(action) {
  if (action?.href === TEAM_CONTACT_HREF) {
    return paths.mailToMintplex();
  }

  return action?.href;
}

function FeatureItem({ item, theme, featured = false }) {
  const Icon = ICON_MAP[item.icon] || FileText;

  return (
    <li className="flex items-center gap-3">
      <Icon
        className={cn(
          "h-[0.95rem] w-[0.95rem] shrink-0",
          featured ? theme.featuredIcon : theme.neutralIcon
        )}
      />
      <span className={cn("text-[0.9rem] leading-5", theme.bodyText)}>
        {item.text}
      </span>
    </li>
  );
}

function PricingCard({
  tier,
  theme,
  themeName,
  isAnnual,
  onAnnualChange,
  isLoading,
  onCheckout,
}) {
  const showAnnualPrice = Boolean(isAnnual && tier.supportsAnnualBilling);
  const action = getPrimaryAction(tier, showAnnualPrice);
  const displayPrice = getDisplayPriceLabel(tier, showAnnualPrice);
  const actionHref = action.kind === "link" ? resolveActionHref(action) : null;
  const isFeatured = tier.surfaceTone === "featured";

  return (
    <Card
      className={cn(
        PRICING_LAYOUT_CLASSES.card,
        isFeatured ? theme.featuredCard : theme.neutralCard
      )}
    >
      {isFeatured && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(113,170,255,0.18),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(74,144,255,0.12)_100%)]" />
        </>
      )}

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="max-w-[12rem]">
          <h2
            className={cn(
              "text-[1.64rem] font-semibold leading-[0.97] tracking-[-0.045em]",
              theme.title
            )}
          >
            {tier.name}
          </h2>
          <p
            className={cn("mt-1 text-[0.82rem] leading-[1.3]", theme.mutedText)}
          >
            {tier.subtitle}
          </p>
        </div>

        {tier.supportsAnnualBilling ? (
          <div className="flex shrink-0 items-center gap-2 px-0 py-1">
            <span
              className={cn(
                "text-[0.64rem] font-semibold uppercase tracking-[0.18em]",
                theme.mutedText
              )}
            >
              {tier.utilityLabel}
            </span>
            <PricingSwitch
              themeName={themeName}
              tone={isFeatured ? "featured" : "neutral"}
              checked={showAnnualPrice}
              onCheckedChange={onAnnualChange}
            />
          </div>
        ) : (
          <div
            className={cn(
              "pt-1 text-right text-[0.64rem] font-semibold uppercase tracking-[0.18em]",
              theme.mutedText
            )}
          >
            {tier.utilityLabel}
          </div>
        )}
      </div>

      <PricingDivider themeName={themeName} />

      <div className="relative z-10 flex flex-col justify-center">
        <div
          className={cn(
            "text-[1.72rem] font-semibold leading-none tracking-[-0.045em]",
            theme.title
          )}
        >
          {displayPrice}
        </div>
        {tier.note && (
          <p
            className={cn("mt-1 text-[0.8rem] leading-[1.3]", theme.mutedText)}
          >
            {tier.note}
          </p>
        )}
      </div>

      <PricingDivider themeName={themeName} />

      <ul className="relative z-10 flex flex-col gap-2 py-3">
        {tier.features.map((item) => (
          <FeatureItem
            key={`${tier.slug}-${item.text}`}
            item={item}
            theme={theme}
            featured={isFeatured}
          />
        ))}
      </ul>

      <div className="relative z-10 pt-2.5">
        {action.kind === "checkout" ? (
          <PricingButton
            themeName={themeName}
            tone={isFeatured ? "featured" : "neutral"}
            className="w-full"
            disabled={isLoading}
            onClick={() => onCheckout(action.planKey)}
          >
            {isLoading ? "Redirecting..." : action.label}
          </PricingButton>
        ) : (
          <PricingButton
            themeName={themeName}
            tone="neutral"
            asChild
            className="w-full"
          >
            <a href={actionHref} className="gap-2">
              {action.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </PricingButton>
        )}
      </div>
    </Card>
  );
}

function BottomCallout({ callout, theme, themeName, isLoading, onCheckout }) {
  const actionHref = resolveActionHref(callout.action);

  return (
    <Card className={cn(PRICING_LAYOUT_CLASSES.callout, theme.calloutCard)}>
      <div>
        <p
          className={cn(
            "text-[0.76rem] font-semibold uppercase tracking-[0.2em]",
            theme.mutedText
          )}
        >
          {callout.title}
        </p>
        <h3
          className={cn(
            "mt-1.5 text-[1.18rem] font-semibold tracking-[-0.03em]",
            theme.title
          )}
        >
          {callout.priceLabel}
        </h3>
        <p className={cn("mt-1 text-[0.84rem] leading-5", theme.mutedText)}>
          {callout.subtitle}
        </p>
      </div>

      <div className="grid gap-4">
        <PricingDivider themeName={themeName} />
        <p className={cn("text-[0.88rem] leading-5", theme.mutedText)}>
          {callout.supportingText}
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {callout.features.map((item) => (
            <FeatureItem
              key={`callout-${item.text}`}
              item={item}
              theme={theme}
            />
          ))}
        </ul>
      </div>

      {callout.action.kind === "checkout" ? (
        <PricingButton
          themeName={themeName}
          tone="neutral"
          className="px-5 text-[0.9rem]"
          disabled={isLoading}
          onClick={() => onCheckout(callout.action.planKey)}
        >
          {isLoading ? "Redirecting..." : callout.ctaLabel}
        </PricingButton>
      ) : (
        <PricingButton
          themeName={themeName}
          tone="neutral"
          asChild
          className="px-5 text-[0.9rem]"
        >
          <a href={actionHref} className="gap-2">
            {callout.ctaLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </PricingButton>
      )}
    </Card>
  );
}

export default function PricingGate({
  workspaceSlug,
  successUrl = null,
  cancelUrl = null,
  onClose,
  centered = false,
}) {
  const { resolvedTheme } = useTheme();
  const themeName = resolvedTheme === "light" ? "light" : "dark";
  const theme = getPricingTheme(themeName);
  const [isAnnual, setIsAnnual] = useState(false);
  const [submittingPlan, setSubmittingPlan] = useState(null);
  const [error, setError] = useState("");

  async function handleCheckout(planKey) {
    setError("");
    setSubmittingPlan(planKey);
    const result = await Billing.createCheckoutSession({
      planKey,
      workspaceSlug,
      successUrl,
      cancelUrl,
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
          ? PRICING_LAYOUT_CLASSES.rootCentered
          : PRICING_LAYOUT_CLASSES.rootDefault
      )}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="relative flex h-full w-full flex-col [font-family:Inter,ui-sans-serif,system-ui,sans-serif]">
        {typeof onClose === "function" && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-0 top-0 z-20 h-10 w-10 rounded-full",
              theme.closeButton
            )}
            onClick={onClose}
            aria-label="Close pricing options"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <div className={cn(PRICING_LAYOUT_CLASSES.grid, onClose && "pr-14")}>
          {PRICING_LADDER.map((tier) => (
            <PricingCard
              key={tier.slug}
              tier={tier}
              theme={theme}
              themeName={themeName}
              isAnnual={isAnnual}
              onAnnualChange={setIsAnnual}
              isLoading={
                submittingPlan ===
                getPrimaryAction(tier, isAnnual && tier.supportsAnnualBilling)
                  ?.planKey
              }
              onCheckout={handleCheckout}
            />
          ))}
        </div>

        <div className={cn(onClose && "pr-14")}>
          <BottomCallout
            callout={STUDENT_CALLOUT}
            theme={theme}
            themeName={themeName}
            isLoading={submittingPlan === STUDENT_CALLOUT.action.planKey}
            onCheckout={handleCheckout}
          />
        </div>

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

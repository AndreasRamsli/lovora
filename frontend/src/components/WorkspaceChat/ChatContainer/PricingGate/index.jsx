import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CircleCheckBig,
  GraduationCap,
  Loader2,
  Repeat,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import Billing from "@/models/billing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PRICING_TIERS = [
  {
    key: "month_pass",
    name: "Month Pass",
    label: "Flexible",
    description: "Full access for 1 month without recurring billing.",
    price: "$19",
    priceSuffix: "one-time payment",
    ctaLabel: "Buy 1 Month",
    note: "Great if you only need access for a short intensive run.",
    features: [
      {
        icon: CalendarDays,
        text: "Full access for 30 days",
      },
      {
        icon: CircleCheckBig,
        text: "No recurring billing",
      },
      {
        icon: Sparkles,
        text: "Fast activation after checkout",
      },
      {
        icon: ShieldCheck,
        text: "Secure Stripe Checkout",
      },
      {
        icon: ArrowUpRight,
        text: "Renew only when you need it",
      },
    ],
  },
  {
    key: "monthly_subscription",
    name: "Monthly Subscription",
    label: "Most Popular",
    description: "Recurring monthly access for active daily use.",
    price: "$15",
    priceSuffix: "per month",
    ctaLabel: "Start Subscription",
    featured: true,
    note: "Best value if Lovora is part of your everyday workflow.",
    features: [
      {
        icon: Repeat,
        text: "Continuous access while subscribed",
      },
      {
        icon: Zap,
        text: "Built for active daily use",
      },
      {
        icon: CircleCheckBig,
        text: "No need to repurchase each month",
      },
      {
        icon: ShieldCheck,
        text: "Secure Stripe subscription checkout",
      },
      {
        icon: Sparkles,
        text: "Smoothest option for long-term usage",
      },
    ],
  },
  {
    key: "student_exam_monthly",
    name: "Student Exam",
    label: "Students",
    description: "Discounted monthly plan for students during exams.",
    price: "50% off",
    priceSuffix: "during exam period",
    ctaLabel: "Get Student Plan",
    note: "Available when the configured exam period is open on the billing backend.",
    features: [
      {
        icon: GraduationCap,
        text: "Student-friendly discounted pricing",
      },
      {
        icon: Repeat,
        text: "Monthly access during exam season",
      },
      {
        icon: CircleCheckBig,
        text: "Same checkout flow as the main plans",
      },
      {
        icon: ShieldCheck,
        text: "Secure Stripe subscription checkout",
      },
      {
        icon: CalendarDays,
        text: "Availability depends on the exam period window",
      },
    ],
  },
];

function FeatureRow({ icon: Icon, text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/8 bg-white/5 text-[#95a9cb]">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="leading-6">{text}</span>
    </li>
  );
}

function PricingCard({ tier, isLoading, onCheckout }) {
  const isFeatured = Boolean(tier.featured);

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-7 md:p-8",
        isFeatured
          ? "border-[#2d4f86] bg-[#091221] shadow-[0_0_48px_-20px_rgba(64,147,255,0.45)]"
          : "border-white/8 bg-[#060b16]"
      )}
    >
      {isFeatured && (
        <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-[82%] -translate-x-1/2 rounded-full bg-[#2d8cff]/18 blur-[72px]" />
      )}

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className={cn(
            "rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em]",
            isFeatured
              ? "border-[#2d8cff]/40 bg-[#0d203a] text-[#9fd0ff]"
              : "border-white/10 bg-white/5 text-[#98a4b8]"
          )}
        >
          {tier.label}
        </div>
      </div>

      <h2 className="relative z-10 mt-5 text-[1.9rem] font-medium tracking-tight text-white">
        {tier.name}
      </h2>

      <p className="relative z-10 mt-3 text-sm leading-6 text-[#9aa6bd]">
        {tier.description}
      </p>

      <div className="relative z-10 mt-7">
        <span className="text-4xl font-medium tracking-tight text-white">
          {tier.price}
        </span>
        <span className="ml-2 text-sm text-[#73819b]">{tier.priceSuffix}</span>
      </div>

      <Separator
        className={cn(
          "relative z-10 my-8",
          isFeatured ? "bg-[#173154]" : "bg-white/8"
        )}
      />

      <ul className="relative z-10 flex-1 space-y-4 text-sm text-[#d5dbea]">
        {tier.features.map((feature) => (
          <FeatureRow
            key={feature.text}
            icon={feature.icon}
            text={feature.text}
          />
        ))}
      </ul>

      <div className="relative z-10 mt-8 border-t border-white/8 pt-6">
        <Button
          className={cn(
            "h-12 w-full rounded-full text-sm font-medium transition-all",
            isFeatured
              ? "bg-[#0088ff] text-white hover:bg-[#0077e6]"
              : "bg-white/8 text-white hover:bg-white/14"
          )}
          onClick={onCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            tier.ctaLabel
          )}
        </Button>
        <p className="mt-4 text-center text-xs leading-6 text-[#73819b]">
          {tier.note}
        </p>
      </div>
    </Card>
  );
}

export default function PricingGate({
  workspaceSlug,
  onClose,
  centered = false,
}) {
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
          ? "mt-5 max-w-[1080px]"
          : "border-t border-theme-sidebar-border px-4 pb-4 pt-5 md:px-6 md:pb-6"
      )}
    >
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/8 bg-[#050814] p-5 shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)] md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,140,255,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#93a7c9]">
              Pricing
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">
              Continue with the plan that fits how you use Lovora
            </h2>
            <p className="mt-3 max-w-[42rem] text-sm leading-6 text-[#9aa6bd]">
              You have used your free messages for this period. Choose a plan to
              continue right away with secure Stripe checkout.
            </p>
          </div>
          {typeof onClose === "function" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border border-white/8 bg-white/5 text-white hover:bg-white/10"
              onClick={onClose}
              aria-label="Close pricing options"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="relative z-10 mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <PricingCard
              key={tier.key}
              tier={tier}
              isLoading={submittingPlan === tier.key}
              onCheckout={() => handleCheckout(tier.key)}
            />
          ))}
        </div>

        {error && (
          <p
            className="relative z-10 mt-5 rounded-2xl border border-red-400/20 bg-red-500/8 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

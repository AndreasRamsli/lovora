import { useState } from "react";
import {
  CalendarDays,
  CircleCheckBig,
  GraduationCap,
  Loader2,
  Repeat,
  X,
} from "lucide-react";
import Billing from "@/models/billing";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PRICING_TIERS = [
  {
    key: "month_pass",
    title: "Month Pass",
    icon: CalendarDays,
    price: "$19",
    cadence: "one-time",
    description: "Full access for 1 month without recurring billing.",
    ctaLabel: "Buy 1 Month",
    featured: false,
  },
  {
    key: "monthly_subscription",
    title: "Monthly Subscription",
    icon: Repeat,
    price: "$15",
    cadence: "per month",
    description: "Recurring monthly access for active daily use.",
    ctaLabel: "Start Subscription",
    featured: true,
  },
  {
    key: "student_exam_monthly",
    title: "Student Exam",
    icon: GraduationCap,
    price: "50% off",
    cadence: "exam period",
    description: "Discounted monthly plan for students during exams.",
    ctaLabel: "Get Student Plan",
    featured: false,
  },
];

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
          ? "max-w-[750px] mt-3"
          : "p-4 md:p-6 border-t border-theme-sidebar-border"
      )}
    >
      <div className="rounded-xl border border-slate-800 bg-zinc-950/90 p-4 md:p-6 light:border-slate-200 light:bg-slate-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white light:text-slate-900">
              Free message limit reached
            </h2>
            <p className="mt-1 text-sm text-slate-300 light:text-slate-600">
              You have used your free messages for this period. Pick a plan to
              continue now.
            </p>
          </div>
          {typeof onClose === "function" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
              aria-label="Close pricing options"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        <div className="grid gap-4 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => {
            const Icon = tier.icon;
            const isLoading = submittingPlan === tier.key;
            return (
              <Card
                key={tier.key}
                className={cn(
                  "h-full flex flex-col",
                  tier.featured && "border-slate-100 light:border-slate-900"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{tier.title}</CardTitle>
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-semibold text-white light:text-slate-900">
                    {tier.price}
                  </p>
                  <p className="text-sm text-slate-400 light:text-slate-500">
                    {tier.cadence}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-300 light:text-slate-600">
                    <CircleCheckBig className="h-3.5 w-3.5" />
                    Stripe Checkout
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    onClick={() => handleCheckout(tier.key)}
                    disabled={Boolean(submittingPlan)}
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
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {error && (
          <p
            className="mt-4 text-sm text-red-300 light:text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getBillingBannerContent } from "./billingPresentation";

export default function BillingStatusBanner({
  billingStatus = null,
  onUpgrade = null,
}) {
  const content = getBillingBannerContent(billingStatus);
  if (!content) return null;

  const isPaid = billingStatus?.isPaidActive;

  return (
    <Card
      className={cn(
        "overflow-hidden border shadow-[0_18px_45px_-28px_rgba(15,23,42,0.65)]",
        isPaid
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-white/10 bg-white/5 light:border-slate-200 light:bg-slate-50"
      )}
    >
      <CardContent className="p-4">
        <p
          className={cn(
            "text-[0.72rem] font-semibold uppercase tracking-[0.24em]",
            isPaid ? "text-emerald-200" : "text-slate-300 light:text-slate-500"
          )}
        >
          {content.eyebrow}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white light:text-slate-900">
              {content.title}
            </p>
            <p className="mt-1 text-xs text-slate-300 light:text-slate-600">
              {content.detail}
            </p>
          </div>
          {content.badgeLabel ? (
            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-100">
              {content.badgeLabel}
            </span>
          ) : (
            <Button
              type="button"
              size="sm"
              className="rounded-full px-4"
              onClick={onUpgrade}
            >
              {content.actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

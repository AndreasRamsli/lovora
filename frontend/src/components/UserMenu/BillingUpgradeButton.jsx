import { Sparkles } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function BillingUpgradeButton({ visible = false, onClick }) {
  if (!visible) return null;

  return (
    <Button
      type="button"
      onClick={onClick}
      className="h-9 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 px-4 text-[0.78rem] font-semibold text-slate-950 shadow-[0_16px_40px_-22px_rgba(56,189,248,0.85)] hover:brightness-105 light:border-cyan-500/20"
    >
      <Sparkles className="mr-1.5 h-4 w-4" weight="fill" />
      Upgrade
    </Button>
  );
}

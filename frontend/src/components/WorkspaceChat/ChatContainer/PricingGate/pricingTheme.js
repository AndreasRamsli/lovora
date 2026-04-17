export const PRICING_LAYOUT_CLASSES = {
  rootCentered: "mt-3 w-full max-w-[1240px]",
  rootDefault: "mx-auto w-full max-w-[1240px]",
  grid: "grid min-h-0 grid-cols-1 items-start gap-4 pt-1 xl:grid-cols-3",
  card: "relative grid h-[25rem] self-start grid-rows-[minmax(4rem,auto)_1px_minmax(3.5rem,auto)_1px_minmax(0,1fr)_auto] overflow-hidden rounded-[1.75rem] border px-4 pb-4 pt-4 [font-family:Inter,ui-sans-serif,system-ui,sans-serif]",
  callout:
    "mt-5 grid gap-4 rounded-[1.75rem] border px-4 py-4 [font-family:Inter,ui-sans-serif,system-ui,sans-serif] md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_auto] md:items-center",
};

export const PRICING_SWITCH_CLASS =
  "h-[1.5rem] w-11 border-0 [&>span]:h-[1.15rem] [&>span]:w-[1.15rem] [&>span]:translate-x-[2px] [&>span]:bg-white [&>span]:shadow-none data-[state=checked]:[&>span]:translate-x-[20px]";

const DARK_THEME = {
  themeName: "dark",
  overlay: "bg-[#040918]/82",
  closeButton:
    "border border-white/12 bg-black/30 text-white/80 hover:bg-white/10 hover:text-white",
  neutralCard:
    "border-[#c7ced8]/28 bg-[linear-gradient(180deg,#0f1115_0%,#151921_100%)] shadow-[0_30px_70px_-60px_rgba(15,23,42,0.95)]",
  featuredCard:
    "border-[#2f4f84] bg-[linear-gradient(180deg,#091224_0%,#102549_58%,#17386f_100%)] shadow-[0_30px_80px_-60px_rgba(56,118,212,0.9)]",
  calloutCard:
    "border-[#c7ced8]/28 bg-[linear-gradient(180deg,#141922_0%,#1b2230_100%)]",
  title: "text-[#f5f7fb]",
  mutedText: "text-[#99a3b3]",
  bodyText: "text-[#d5dbe4]",
  featuredIcon: "text-[#d7e7ff]",
  neutralIcon: "text-[#99a3b3]",
  divider: "dark",
  neutralButton: "neutral",
  featuredButton: "featured",
  featuredToggle: "featured",
  neutralToggle: "neutral",
};

const LIGHT_THEME = {
  themeName: "light",
  overlay: "bg-[rgba(7,16,55,0.14)]",
  closeButton:
    "border border-[rgba(7,16,55,0.1)] bg-white/80 text-[rgba(7,16,55,0.72)] hover:bg-white hover:text-[#071037]",
  neutralCard:
    "border-[rgba(7,16,55,0.1)] bg-[linear-gradient(180deg,#ffffff_0%,#f4efe1_100%)] shadow-[0_30px_70px_-60px_rgba(7,16,55,0.28)]",
  featuredCard:
    "border-[rgba(82,123,191,0.32)] bg-[linear-gradient(180deg,#eef5ff_0%,#dfeaff_52%,#cfe1ff_100%)] shadow-[0_30px_80px_-60px_rgba(87,138,225,0.45)]",
  calloutCard:
    "border-[rgba(7,16,55,0.1)] bg-[linear-gradient(180deg,#ffffff_0%,#f4efe1_100%)]",
  title: "text-[#071037]",
  mutedText: "text-[rgba(7,16,55,0.55)]",
  bodyText: "text-[rgba(7,16,55,0.82)]",
  featuredIcon: "text-[#1f4e95]",
  neutralIcon: "text-[rgba(7,16,55,0.48)]",
  divider: "light",
  neutralButton: "neutral",
  featuredButton: "featured",
  featuredToggle: "featured",
  neutralToggle: "neutral",
};

export function getPricingTheme(resolvedTheme = "dark") {
  return resolvedTheme === "light" ? LIGHT_THEME : DARK_THEME;
}

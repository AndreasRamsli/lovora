/* global module, require */
const React = require("react");

const PRICING_SWITCH_BASE_CLASS =
  "h-[1.5rem] w-11 border-0 [&>span]:h-[1.15rem] [&>span]:w-[1.15rem] [&>span]:translate-x-[2px] [&>span]:bg-white [&>span]:shadow-none data-[state=checked]:[&>span]:translate-x-[20px]";

const PRICING_BUTTON_BASE_CLASS =
  "rounded-full text-[0.88rem] font-semibold shadow-none";

const PRICING_DIVIDER_BASE_CLASS = "relative z-10 h-px";

const PRICING_BUTTON_VARIANTS = {
  dark: {
    neutral: "bg-[#d8dfe8]/18 text-[#f6f8fb] hover:bg-[#d8dfe8]/28",
    featured: "bg-[#7bb2ff] text-[#08111f] hover:bg-[#6aa9ff]",
  },
  light: {
    neutral:
      "bg-[rgba(7,16,55,0.06)] text-[#071037] hover:bg-[rgba(7,16,55,0.12)]",
    featured: "bg-[#7bb2ff] text-[#08111f] hover:bg-[#6aa9ff]",
  },
};

const PRICING_SWITCH_VARIANTS = {
  dark: {
    neutral:
      "bg-[#d8dfe8]/18 data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-[#d8dfe8]/12",
    featured:
      "bg-[#7bb2ff]/18 data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-white/[0.12]",
  },
  light: {
    neutral:
      "bg-[rgba(7,16,55,0.06)] data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-[rgba(7,16,55,0.06)]",
    featured:
      "bg-[#7bb2ff]/20 data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-[rgba(7,16,55,0.1)]",
  },
};

const PRICING_DIVIDER_CLASS = {
  dark: "bg-[#c7ced8]/12",
  light: "bg-[rgba(7,16,55,0.1)]",
};

function resolveButtonVariant(themeName, tone) {
  return (
    PRICING_BUTTON_VARIANTS[themeName]?.[tone] ??
    PRICING_BUTTON_VARIANTS.dark.neutral
  );
}

function resolveSwitchVariant(themeName, tone) {
  return (
    PRICING_SWITCH_VARIANTS[themeName]?.[tone] ??
    PRICING_SWITCH_VARIANTS.dark.neutral
  );
}

function resolveDividerVariant(themeName) {
  return PRICING_DIVIDER_CLASS[themeName] ?? PRICING_DIVIDER_CLASS.dark;
}

function getUiDependencies() {
  const { Button } = require("@/components/ui/button");
  const { Separator } = require("@/components/ui/separator");
  const { Switch } = require("@/components/ui/switch");
  const { cn } = require("@/lib/utils");

  return { Button, Separator, Switch, cn };
}

function PricingButton({
  themeName = "dark",
  tone = "neutral",
  className,
  ...props
}) {
  const { Button, cn } = getUiDependencies();

  return React.createElement(Button, {
    className: cn(
      PRICING_BUTTON_BASE_CLASS,
      resolveButtonVariant(themeName, tone),
      className
    ),
    ...props,
  });
}

function PricingSwitch({
  themeName = "dark",
  tone = "neutral",
  className,
  ...props
}) {
  const { Switch, cn } = getUiDependencies();

  return React.createElement(Switch, {
    className: cn(
      PRICING_SWITCH_BASE_CLASS,
      resolveSwitchVariant(themeName, tone),
      className
    ),
    ...props,
  });
}

function PricingDivider({ themeName = "dark", className, ...props }) {
  const { Separator, cn } = getUiDependencies();

  return React.createElement(Separator, {
    className: cn(
      PRICING_DIVIDER_BASE_CLASS,
      resolveDividerVariant(themeName),
      className
    ),
    ...props,
  });
}

module.exports = {
  PRICING_BUTTON_VARIANTS,
  PRICING_SWITCH_VARIANTS,
  PRICING_DIVIDER_CLASS,
  PricingButton,
  PricingSwitch,
  PricingDivider,
};

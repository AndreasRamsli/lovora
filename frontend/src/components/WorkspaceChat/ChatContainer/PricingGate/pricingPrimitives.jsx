import * as React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const PRICING_BUTTON_BASE_CLASS =
  "h-9 rounded-full text-[0.88rem] font-semibold shadow-none";

const PRICING_SWITCH_BASE_CLASS =
  "h-[1.5rem] w-11 border-0 [&>span]:h-[1.15rem] [&>span]:w-[1.15rem] [&>span]:translate-x-[2px] [&>span]:bg-white [&>span]:shadow-none data-[state=checked]:[&>span]:translate-x-[20px]";

const PRICING_DIVIDER_BASE_CLASS = "relative z-10 h-px";

export const PRICING_BUTTON_VARIANTS = {
  dark: {
    neutral: "bg-[#d8dfe8]/[.18] text-[#f6f8fb] hover:bg-[#d8dfe8]/[.28]",
    featured: "bg-[#7bb2ff] text-[#08111f] hover:bg-[#6aa9ff]",
  },
  light: {
    neutral:
      "bg-[rgba(7,16,55,0.06)] text-[#071037] hover:bg-[rgba(7,16,55,0.12)]",
    featured: "bg-[#7bb2ff] text-[#08111f] hover:bg-[#6aa9ff]",
  },
};

export const PRICING_SWITCH_VARIANTS = {
  dark: {
    neutral:
      "bg-[#d8dfe8]/[.18] data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-[#d8dfe8]/[.12]",
    featured:
      "bg-[#7bb2ff]/[.18] data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-white/[0.12]",
  },
  light: {
    neutral:
      "bg-[rgba(7,16,55,0.06)] data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-[rgba(7,16,55,0.06)]",
    featured:
      "bg-[#7bb2ff]/20 data-[state=checked]:bg-[#7bb2ff] data-[state=unchecked]:bg-[rgba(7,16,55,0.1)]",
  },
};

export const PRICING_DIVIDER_CLASS = {
  dark: "bg-[#c7ced8]/[.12]",
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

export const PricingButton = ({
  themeName = "dark",
  tone = "neutral",
  className,
  ...props
}) =>
  React.createElement(Button, {
    variant: "unstyled",
    size: "unstyled",
    className: cn(
      PRICING_BUTTON_BASE_CLASS,
      resolveButtonVariant(themeName, tone),
      className
    ),
    ...props,
  });

export const PricingSwitch = ({
  themeName = "dark",
  tone = "neutral",
  className,
  ...props
}) =>
  React.createElement(Switch, {
    unstyled: true,
    className: cn(
      PRICING_SWITCH_BASE_CLASS,
      resolveSwitchVariant(themeName, tone),
      className
    ),
    ...props,
  });

export const PricingDivider = ({ themeName = "dark", className, ...props }) =>
  React.createElement(Separator, {
    unstyled: true,
    className: cn(
      PRICING_DIVIDER_BASE_CLASS,
      resolveDividerVariant(themeName),
      className
    ),
    ...props,
  });

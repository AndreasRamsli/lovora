import { describe, expect, test } from "@jest/globals";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const {
  PRICING_BUTTON_VARIANTS,
  PRICING_DIVIDER_CLASS,
  PRICING_SWITCH_VARIANTS,
  PricingButton,
  PricingDivider,
  PricingSwitch,
} = require("./pricingPrimitives.jsx");

describe("Lovora pricing primitives contract", () => {
  test("exports the pricing wrapper primitives with component-like surfaces", () => {
    expect(PricingButton).toBeDefined();
    expect(PricingSwitch).toBeDefined();
    expect(PricingDivider).toBeDefined();
    expect(typeof PricingButton).toBe("function");
    expect(typeof PricingSwitch).toBe("function");
    expect(typeof PricingDivider).toBe("function");
  });

  test("locks the primitive button tokens for neutral and featured variants", () => {
    expect(PRICING_BUTTON_VARIANTS.dark.neutral).toContain("bg-[#d8dfe8]/18");
    expect(PRICING_BUTTON_VARIANTS.dark.neutral).not.toContain("!bg");
    expect(PRICING_BUTTON_VARIANTS.dark.featured).toContain("bg-[#7bb2ff]");
  });

  test("locks the primitive switch tokens for both themes", () => {
    expect(PRICING_SWITCH_VARIANTS.dark.neutral).toContain(
      "data-[state=checked]:bg-[#7bb2ff]"
    );
    expect(PRICING_SWITCH_VARIANTS.dark.featured).toContain("bg-[#7bb2ff]/18");
  });

  test("locks the primitive divider tokens for both themes", () => {
    expect(PRICING_DIVIDER_CLASS.dark).toContain("bg-[#c7ced8]/12");
    expect(PRICING_DIVIDER_CLASS.light).toContain("bg-[rgba(7,16,55,0.1)]");
  });
});

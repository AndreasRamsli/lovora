import { describe, expect, test } from "@jest/globals";
import {
  PRICING_BUTTON_VARIANTS,
  PRICING_DIVIDER_CLASS,
  PRICING_SWITCH_VARIANTS,
} from "./pricingPrimitives.jsx";

describe("Lovora pricing primitives contract", () => {
  test("locks the primitive tokens for pricing neutral and featured variants", () => {
    expect(PRICING_BUTTON_VARIANTS.dark.neutral).toContain("bg-[#d8dfe8]/18");
    expect(PRICING_BUTTON_VARIANTS.dark.neutral).not.toContain("!bg");
    expect(PRICING_BUTTON_VARIANTS.dark.featured).toContain("bg-[#7bb2ff]");
  });

  test("locks the primitive switch and divider tokens for both themes", () => {
    expect(PRICING_SWITCH_VARIANTS.dark.neutral).toContain(
      "data-[state=checked]:bg-[#7bb2ff]"
    );
    expect(PRICING_SWITCH_VARIANTS.dark.featured).toContain("bg-[#7bb2ff]/18");
    expect(PRICING_DIVIDER_CLASS.dark).toContain("bg-[#c7ced8]/12");
    expect(PRICING_DIVIDER_CLASS.light).toContain("bg-[rgba(7,16,55,0.1)]");
  });
});

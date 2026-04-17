import { describe, expect, test } from "@jest/globals";
import {
  PRICING_LAYOUT_CLASSES,
  PRICING_SWITCH_CLASS,
  getPricingTheme,
} from "./pricingTheme.js";

describe("Lovora pricing theme contract", () => {
  test("keeps pricing layout fixed-height without full-height stretching", () => {
    expect(PRICING_LAYOUT_CLASSES.rootDefault).not.toContain("h-full");
    expect(PRICING_LAYOUT_CLASSES.grid).toContain("items-start");
    expect(PRICING_LAYOUT_CLASSES.card).toContain("h-[25rem]");
  });

  test("keeps semantic neutral tokens free of caller-level emergency overrides", () => {
    const darkTheme = getPricingTheme("dark");
    const lightTheme = getPricingTheme("light");

    expect(darkTheme.neutralButton).not.toContain("!bg");
    expect(lightTheme.neutralButton).not.toContain("!bg");
    expect(darkTheme.neutralToggle).toContain("bg-[#d8dfe8]/18");
    expect(darkTheme.divider).toContain("bg-[#c7ced8]/12");
  });

  test("keeps the pricing toggle geometry roomy enough", () => {
    expect(PRICING_SWITCH_CLASS).toContain("h-[1.5rem]");
    expect(PRICING_SWITCH_CLASS).toContain("w-11");
    expect(PRICING_SWITCH_CLASS).toContain(
      "data-[state=checked]:[&>span]:translate-x-[20px]"
    );
  });
});

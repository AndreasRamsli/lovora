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

  test("keeps semantic primitive handles free of caller-level class tokens", () => {
    const darkTheme = getPricingTheme("dark");
    const lightTheme = getPricingTheme("light");

    expect(darkTheme.themeName).toBe("dark");
    expect(lightTheme.themeName).toBe("light");
    expect(darkTheme.neutralButton).toBe("neutral");
    expect(darkTheme.featuredButton).toBe("featured");
    expect(lightTheme.neutralToggle).toBe("neutral");
    expect(lightTheme.featuredToggle).toBe("featured");
    expect(darkTheme.divider).toBe("dark");
    expect(lightTheme.divider).toBe("light");
  });

  test("keeps the pricing toggle geometry roomy enough", () => {
    expect(PRICING_SWITCH_CLASS).toContain("h-[1.5rem]");
    expect(PRICING_SWITCH_CLASS).toContain("w-11");
    expect(PRICING_SWITCH_CLASS).toContain(
      "data-[state=checked]:[&>span]:translate-x-[20px]"
    );
  });
});

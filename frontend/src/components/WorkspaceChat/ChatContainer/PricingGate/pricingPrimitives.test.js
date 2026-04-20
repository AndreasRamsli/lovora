import { describe, expect, test } from "@jest/globals";
import { readFileSync } from "fs";

const source = readFileSync(
  new URL("./pricingPrimitives.jsx", import.meta.url),
  "utf8"
);

describe("Lovora pricing primitives contract", () => {
  test("keeps the pricing primitives module on standard ESM imports and exports", () => {
    expect(source).toContain('import * as React from "react"');
    expect(source).toContain('import { Button } from "@/components/ui/button"');
    expect(source).toContain(
      'import { Separator } from "@/components/ui/separator"'
    );
    expect(source).toContain('import { Switch } from "@/components/ui/switch"');
    expect(source).toContain('import { cn } from "@/lib/utils"');
    expect(source).toContain("export const PRICING_BUTTON_VARIANTS");
    expect(source).toContain("export const PricingButton");
    expect(source).not.toContain("module.exports");
    expect(source).not.toContain("getUiDependencies");
  });

  test("exports the pricing wrapper primitives with component-like surfaces", () => {
    expect(source).toContain("export const PricingButton");
    expect(source).toContain("export const PricingSwitch");
    expect(source).toContain("export const PricingDivider");
  });

  test("locks the primitive button tokens for neutral and featured variants", () => {
    expect(source).toContain("export const PRICING_BUTTON_VARIANTS");
    expect(source).toContain("bg-[#d8dfe8]/[.18]");
    expect(source).not.toContain("!bg");
    expect(source).toContain("bg-[#7bb2ff]");
  });

  test("locks the primitive switch tokens for both themes", () => {
    expect(source).toContain("export const PRICING_SWITCH_VARIANTS");
    expect(source).toContain("data-[state=checked]:bg-[#7bb2ff]");
    expect(source).toContain("bg-[#7bb2ff]/[.18]");
  });

  test("locks the primitive divider tokens for both themes", () => {
    expect(source).toContain("export const PRICING_DIVIDER_CLASS");
    expect(source).toContain("bg-[#c7ced8]/[.12]");
    expect(source).toContain("bg-[rgba(7,16,55,0.1)]");
  });

  test("opts shared primitives out of their default color variants", () => {
    expect(source).toContain('variant: "unstyled"');
    expect(source).toContain('size: "unstyled"');
    expect(source).toContain("unstyled: true");
    expect(source).not.toMatch(/bg-\[#[^\]]+\]\/(?:12|18|28)\b/);
  });
});

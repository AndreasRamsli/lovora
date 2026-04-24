import { describe, expect, test } from "@jest/globals";
import fs from "node:fs";
import { createRequire } from "node:module";
import {
  PRICING_LADDER,
  STUDENT_CALLOUT,
  TEAM_CONTACT_HREF,
  getDisplayPriceLabel,
  getLocalizedPricingCatalog,
  getPrimaryAction,
} from "./pricingCatalog.js";

const require = createRequire(import.meta.url);
const { PLAN_KEYS } = require("../../../../../../server/utils/billing/plans");

describe("Lovora pricing catalog", () => {
  test("defines compact visual roles for soft and featured cards", () => {
    expect(
      PRICING_LADDER.map(({ slug, surfaceTone, supportsAnnualBilling }) => ({
        slug,
        surfaceTone,
        supportsAnnualBilling,
      }))
    ).toEqual([
      {
        slug: "personal-entry",
        surfaceTone: "soft",
        supportsAnnualBilling: true,
      },
      {
        slug: "serious-individual",
        surfaceTone: "featured",
        supportsAnnualBilling: true,
      },
      {
        slug: "student-plan",
        surfaceTone: "soft",
        supportsAnnualBilling: false,
      },
    ]);
  });

  test("uses personal, pro, and student in the top row and moves team into the bottom bar", () => {
    expect(PRICING_LADDER.map(({ slug }) => slug)).toEqual([
      "personal-entry",
      "serious-individual",
      "student-plan",
    ]);

    expect(
      PRICING_LADDER.map(({ subtitle }) => subtitle.split(/\s+/).length)
    ).toEqual([3, 3, 3]);

    const entry = PRICING_LADDER.find((tier) => tier.slug === "personal-entry");
    expect(entry.secondaryOffer).toBeUndefined();

    expect(STUDENT_CALLOUT).toMatchObject({
      title: "Professional / Team",
      ctaLabel: "Contact sales",
    });
  });

  test("shows the new standard recurring prices", () => {
    const entry = PRICING_LADDER.find((tier) => tier.slug === "personal-entry");
    const serious = PRICING_LADDER.find(
      (tier) => tier.slug === "serious-individual"
    );
    const student = PRICING_LADDER.find((tier) => tier.slug === "student-plan");

    expect(entry.priceLabel).toBe("249 kr / month");
    expect(serious.priceLabel).toBe("499 kr / month");
    expect(student.priceLabel).toBe("From 149 kr / month");
  });

  test("switches recurring cards to 15 percent annual pricing and annual plan keys", () => {
    const entry = PRICING_LADDER.find((tier) => tier.slug === "personal-entry");
    const serious = PRICING_LADDER.find(
      (tier) => tier.slug === "serious-individual"
    );

    expect(getDisplayPriceLabel(entry, true)).toBe("2,540 kr / year");
    expect(getDisplayPriceLabel(serious, true)).toBe("5,090 kr / year");
    expect(getPrimaryAction(entry, true)).toMatchObject({
      kind: "checkout",
      planKey: "personal_entry_annual",
    });
    expect(getPrimaryAction(serious, true)).toMatchObject({
      kind: "checkout",
      planKey: "monthly_subscription_annual",
    });
  });

  test("keeps annual frontend plan keys aligned with the backend resolver", () => {
    const annualPlanKeys = PRICING_LADDER.filter(
      (tier) => tier.supportsAnnualBilling
    )
      .map((tier) => getPrimaryAction(tier, true)?.planKey)
      .filter(Boolean);

    expect(annualPlanKeys).toEqual([
      PLAN_KEYS.personalEntryAnnual,
      PLAN_KEYS.monthlySubscriptionAnnual,
    ]);
  });

  test("removes the month pass badge from Personal Entry", () => {
    const entry = PRICING_LADDER.find((tier) => tier.slug === "personal-entry");

    expect(entry.secondaryOffer).toBeUndefined();
  });

  test("uses the bottom bar for team contact", () => {
    expect(STUDENT_CALLOUT).toMatchObject({
      title: "Professional / Team",
      priceLabel: "999 kr / month",
      ctaLabel: "Contact sales",
    });
  });

  test("keeps Serious Individual highlighted and routes the bottom bar to sales", () => {
    const serious = PRICING_LADDER.find(
      (tier) => tier.slug === "serious-individual"
    );

    expect(serious.surfaceTone).toBe("featured");
    expect(serious.badge).toBeUndefined();
    expect(STUDENT_CALLOUT.action).toEqual({
      kind: "link",
      href: TEAM_CONTACT_HREF,
      label: "Contact sales",
    });
  });

  test("localizes the pricing ladder and team callout for Norwegian", () => {
    const { pricingLadder, studentCallout } = getLocalizedPricingCatalog("nb");

    expect(pricingLadder.map(({ name }) => name)).toEqual([
      "Personlig start",
      "Seriøs privatperson",
      "Studentplan",
    ]);
    expect(pricingLadder[0]).toMatchObject({
      subtitle: "Lett juridisk hjelp",
      priceLabel: "249 kr / måned",
      utilityLabel: "Årlig",
      note: "For første gjennomgang",
    });
    expect(pricingLadder[0].features.map(({ text }) => text)).toContain(
      "Still juridiske spørsmål"
    );
    expect(pricingLadder[1].primaryAction.label).toBe(
      "Start med Seriøs privatperson"
    );
    expect(studentCallout).toMatchObject({
      title: "Profesjonell / Team",
      priceLabel: "999 kr / måned",
      ctaLabel: "Kontakt salg",
    });
  });

  test("falls back to English pricing content for non-Norwegian languages", () => {
    const { pricingLadder, studentCallout } = getLocalizedPricingCatalog("en");

    expect(pricingLadder[0].name).toBe("Personal Entry");
    expect(pricingLadder[0].priceLabel).toBe("249 kr / month");
    expect(studentCallout.ctaLabel).toBe("Contact sales");
  });
});

describe("Pricing gate component structure", () => {
  test("uses feature-scoped pricing primitives instead of raw Button and Switch overrides", () => {
    const source = fs.readFileSync(
      new URL("./index.jsx", import.meta.url),
      "utf8"
    );

    expect(source).toMatch(
      /import\s+\{\s*PricingButton,\s*PricingDivider,\s*PricingSwitch,?\s*\}\s+from\s+"\.\/pricingPrimitives"/
    );
    expect(source).not.toContain("theme.neutralButton");
    expect(source).not.toContain("theme.featuredToggle");
  });
});

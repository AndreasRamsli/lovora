import { describe, expect, test } from "@jest/globals";
import {
  PRICING_LADDER,
  STUDENT_CALLOUT,
  TEAM_CONTACT_HREF,
  formatPriceKr,
  getPrimaryAction,
} from "./pricingCatalog.js";

describe("Lovora pricing catalog", () => {
  test("formats card prices with trailing kr", () => {
    expect(formatPriceKr("149")).toBe("149 kr");
    expect(formatPriceKr("5,390")).toBe("5,390 kr");
    expect(formatPriceKr("249")).toBe("249 kr");
  });

  test("keeps the month pass inside Personal Entry", () => {
    const entry = PRICING_LADDER.find((tier) => tier.slug === "personal-entry");

    expect(entry.secondaryOffer).toMatchObject({
      label: "249 kr / 30 days",
      planKey: "month_pass",
      kind: "checkout",
    });
  });

  test("moves student pricing into a separate callout", () => {
    expect(STUDENT_CALLOUT).toMatchObject({
      title: "Student plan",
      priceLabel: "From 149 kr / month",
      planKey: "student_exam_monthly",
    });
  });

  test("keeps Serious Individual highlighted and Team sales led", () => {
    const serious = PRICING_LADDER.find(
      (tier) => tier.slug === "serious-individual"
    );
    const team = PRICING_LADDER.find(
      (tier) => tier.slug === "professional-team"
    );

    expect(serious.highlighted).toBe(true);
    expect(getPrimaryAction(team)).toEqual({
      kind: "link",
      href: TEAM_CONTACT_HREF,
      label: "Contact sales",
    });
  });
});

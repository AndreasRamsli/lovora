export const TEAM_CONTACT_HREF = "mailto:team@mintplexlabs.com";

export function formatPriceKr(value) {
  return `${value} kr`;
}

export const PRICING_LADDER = [
  {
    slug: "personal-entry",
    name: "Personal Entry",
    subtitle: "For students, private individuals, and light legal work",
    priceLabel: "149 kr / month",
    highlighted: false,
    planKey: "personal_entry_monthly",
    primaryAction: {
      kind: "checkout",
      label: "Start with Entry",
      planKey: "personal_entry_monthly",
    },
    secondaryOffer: {
      label: "249 kr / 30 days",
      planKey: "month_pass",
      kind: "checkout",
    },
    note: "Student plan available with verification",
    features: [
      "Ask Lovora legal questions in Norwegian",
      "Search across your uploaded legal material",
      "300 queries / month",
      "50 document uploads / month",
      "Save time on first-pass legal research",
    ],
  },
  {
    slug: "serious-individual",
    name: "Serious Individual",
    subtitle: "For solo lawyers and professionals who rely on Lovora weekly",
    priceLabel: "599 kr / month",
    annualPriceLabel: "5,390 kr / year",
    highlighted: true,
    planKey: "monthly_subscription",
    badge: "Most popular",
    primaryAction: {
      kind: "checkout",
      label: "Start with Serious Individual",
      planKey: "monthly_subscription",
    },
    features: [
      "Everything in Entry",
      "Unlimited queries",
      "500 document uploads / month",
      "Priority support",
      "Export and reusable outputs",
      "Faster workflow for real case preparation",
    ],
  },
  {
    slug: "professional-team",
    name: "Professional / Team",
    subtitle: "For small firms and legal teams",
    priceLabel: "999 kr / month",
    highlighted: false,
    primaryAction: {
      kind: "link",
      label: "Contact sales",
      href: TEAM_CONTACT_HREF,
    },
    note: "+399 kr per extra user • 899 kr / user / month for 3+ users",
    features: [
      "Everything in Serious Individual",
      "Shared team workspace",
      "Shared legal knowledge library",
      "Admin and seat management",
      "Usage visibility for team leads",
      "SSO (coming soon)",
      "Usage analytics (coming soon)",
    ],
  },
];

export const STUDENT_CALLOUT = {
  title: "Student plan",
  priceLabel: "From 149 kr / month",
  supportingText:
    "Requires student verification and follows exam-window availability.",
  ctaLabel: "Student access",
  planKey: "student_exam_monthly",
};

export function getPrimaryAction(tier) {
  return tier.primaryAction;
}

export const TEAM_CONTACT_HREF = "mailto:team@mintplexlabs.com";

export const PRICING_LADDER = [
  {
    slug: "personal-entry",
    name: "Personal Entry",
    subtitle: "Light legal help",
    priceLabel: "249 kr / month",
    annualPriceLabel: "2,540 kr / year",
    surfaceTone: "soft",
    supportsAnnualBilling: true,
    utilityLabel: "Annual",
    primaryAction: {
      kind: "checkout",
      label: "Start with Entry",
      planKey: "personal_entry_monthly",
    },
    annualAction: {
      kind: "checkout",
      label: "Start with Entry",
      planKey: "personal_entry_annual",
    },
    note: "For first-pass research",
    features: [
      { text: "Ask legal questions", icon: "scale" },
      { text: "Search uploaded material", icon: "search" },
      { text: "300 monthly queries", icon: "message-square" },
      { text: "50 document uploads", icon: "file-text" },
      { text: "Fast answer drafts", icon: "clock-3" },
    ],
  },
  {
    slug: "serious-individual",
    name: "Serious Individual",
    subtitle: "Weekly professional work",
    priceLabel: "499 kr / month",
    annualPriceLabel: "5,090 kr / year",
    surfaceTone: "featured",
    supportsAnnualBilling: true,
    utilityLabel: "Annual",
    primaryAction: {
      kind: "checkout",
      label: "Start with Serious Individual",
      planKey: "monthly_subscription",
    },
    annualAction: {
      kind: "checkout",
      label: "Start with Serious Individual",
      planKey: "monthly_subscription_annual",
    },
    note: "For repeat legal work",
    features: [
      { text: "Everything in Entry", icon: "layers-3" },
      { text: "Unlimited queries", icon: "infinity" },
      { text: "500 uploads monthly", icon: "upload" },
      { text: "Priority support", icon: "shield-check" },
      { text: "Export reusable outputs", icon: "files" },
      { text: "Faster case prep", icon: "briefcase" },
    ],
  },
  {
    slug: "student-plan",
    name: "Student Plan",
    subtitle: "Exam season access",
    priceLabel: "From 149 kr / month",
    surfaceTone: "soft",
    supportsAnnualBilling: false,
    utilityLabel: "Verified access",
    primaryAction: {
      kind: "checkout",
      label: "Student access",
      planKey: "student_exam_monthly",
    },
    note: "Requires student verification",
    features: [
      { text: "Exam-window pricing", icon: "graduation-cap" },
      { text: "Verification required", icon: "badge-check" },
      { text: "Guided legal study", icon: "book-open" },
      { text: "Reference-ready notes", icon: "pencil" },
      { text: "Norwegian answers", icon: "message-square" },
    ],
  },
];

export const STUDENT_CALLOUT = {
  title: "Professional / Team",
  subtitle: "Shared team workflows",
  priceLabel: "999 kr / month",
  supportingText: "+399 kr per extra user • 899 kr / user / month for 3+ users",
  ctaLabel: "Contact sales",
  action: {
    kind: "link",
    label: "Contact sales",
    href: TEAM_CONTACT_HREF,
  },
  features: [
    { text: "Shared workspace", icon: "users" },
    { text: "Knowledge library", icon: "book-open" },
    { text: "Seat management", icon: "settings" },
    { text: "Usage visibility", icon: "bar-chart-3" },
  ],
};

export function getDisplayPriceLabel(tier, isAnnual = false) {
  if (!tier) return "";
  if (isAnnual && tier.annualPriceLabel) return tier.annualPriceLabel;
  return tier.priceLabel || "";
}

export function getPrimaryAction(tier, isAnnual = false) {
  if (!tier) return null;
  if (isAnnual && tier.annualAction) return tier.annualAction;
  return tier.primaryAction;
}

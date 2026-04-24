export const TEAM_CONTACT_HREF = "mailto:team@mintplexlabs.com";

const EN_PRICING_LADDER = [
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

const EN_STUDENT_CALLOUT = {
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

const NB_PRICING_LADDER = [
  {
    slug: "personal-entry",
    name: "Personlig start",
    subtitle: "Lett juridisk hjelp",
    priceLabel: "249 kr / måned",
    annualPriceLabel: "2,540 kr / år",
    surfaceTone: "soft",
    supportsAnnualBilling: true,
    utilityLabel: "Årlig",
    primaryAction: {
      kind: "checkout",
      label: "Start med Personlig start",
      planKey: "personal_entry_monthly",
    },
    annualAction: {
      kind: "checkout",
      label: "Start med Personlig start",
      planKey: "personal_entry_annual",
    },
    note: "For første gjennomgang",
    features: [
      { text: "Still juridiske spørsmål", icon: "scale" },
      { text: "Søk i opplastet materiale", icon: "search" },
      { text: "300 spørsmål per måned", icon: "message-square" },
      { text: "50 dokumentopplastinger", icon: "file-text" },
      { text: "Raske svarutkast", icon: "clock-3" },
    ],
  },
  {
    slug: "serious-individual",
    name: "Seriøs privatperson",
    subtitle: "Ukentlig profesjonelt arbeid",
    priceLabel: "499 kr / måned",
    annualPriceLabel: "5,090 kr / år",
    surfaceTone: "featured",
    supportsAnnualBilling: true,
    utilityLabel: "Årlig",
    primaryAction: {
      kind: "checkout",
      label: "Start med Seriøs privatperson",
      planKey: "monthly_subscription",
    },
    annualAction: {
      kind: "checkout",
      label: "Start med Seriøs privatperson",
      planKey: "monthly_subscription_annual",
    },
    note: "For gjentakende juridisk arbeid",
    features: [
      { text: "Alt i Personlig start", icon: "layers-3" },
      { text: "Ubegrensede spørsmål", icon: "infinity" },
      { text: "500 opplastinger per måned", icon: "upload" },
      { text: "Prioritert støtte", icon: "shield-check" },
      { text: "Eksporter gjenbrukbare svar", icon: "files" },
      { text: "Raskere saksforberedelse", icon: "briefcase" },
    ],
  },
  {
    slug: "student-plan",
    name: "Studentplan",
    subtitle: "Tilgang i eksamensperioden",
    priceLabel: "Fra 149 kr / måned",
    surfaceTone: "soft",
    supportsAnnualBilling: false,
    utilityLabel: "Verifisert tilgang",
    primaryAction: {
      kind: "checkout",
      label: "Studenttilgang",
      planKey: "student_exam_monthly",
    },
    note: "Krever studentverifisering",
    features: [
      { text: "Pris for eksamensperioden", icon: "graduation-cap" },
      { text: "Verifisering kreves", icon: "badge-check" },
      { text: "Veiledet juridisk studium", icon: "book-open" },
      { text: "Referanseklare notater", icon: "pencil" },
      { text: "Svar på norsk", icon: "message-square" },
    ],
  },
];

const NB_STUDENT_CALLOUT = {
  title: "Profesjonell / Team",
  subtitle: "Delte teamarbeidsflyter",
  priceLabel: "999 kr / måned",
  supportingText:
    "+399 kr per ekstra bruker • 899 kr / bruker / måned for 3+ brukere",
  ctaLabel: "Kontakt salg",
  action: {
    kind: "link",
    label: "Kontakt salg",
    href: TEAM_CONTACT_HREF,
  },
  features: [
    { text: "Delt arbeidsområde", icon: "users" },
    { text: "Kunnskapsbibliotek", icon: "book-open" },
    { text: "Brukeradministrasjon", icon: "settings" },
    { text: "Innsikt i bruk", icon: "bar-chart-3" },
  ],
};

const EN_UI_COPY = {
  annualBilling: "annual billing",
  closePricingOptions: "Close pricing options",
  redirecting: "Redirecting...",
  checkoutError: "Unable to start checkout right now. Please try again.",
};

const NB_UI_COPY = {
  annualBilling: "årlig fakturering",
  closePricingOptions: "Lukk prisvalg",
  redirecting: "Omdirigerer...",
  checkoutError: "Kan ikke starte betaling akkurat nå. Prøv igjen.",
};

function isNorwegianLanguage(language = "") {
  const normalized = String(language || "").toLowerCase();
  return (
    normalized === "nb" ||
    normalized.startsWith("nb-") ||
    normalized === "no" ||
    normalized.startsWith("no-")
  );
}

function clonePricingLadder(ladder) {
  return ladder.map((tier) => ({
    ...tier,
    primaryAction: { ...tier.primaryAction },
    annualAction: tier.annualAction ? { ...tier.annualAction } : undefined,
    features: tier.features.map((feature) => ({ ...feature })),
  }));
}

function cloneCallout(callout) {
  return {
    ...callout,
    action: { ...callout.action },
    features: callout.features.map((feature) => ({ ...feature })),
  };
}

export const PRICING_LADDER = EN_PRICING_LADDER;
export const STUDENT_CALLOUT = EN_STUDENT_CALLOUT;

export function getLocalizedPricingCatalog(language = "en") {
  const useNorwegian = isNorwegianLanguage(language);

  return {
    pricingLadder: clonePricingLadder(
      useNorwegian ? NB_PRICING_LADDER : EN_PRICING_LADDER
    ),
    studentCallout: cloneCallout(
      useNorwegian ? NB_STUDENT_CALLOUT : EN_STUDENT_CALLOUT
    ),
    uiCopy: useNorwegian ? NB_UI_COPY : EN_UI_COPY,
  };
}

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

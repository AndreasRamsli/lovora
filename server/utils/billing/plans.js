const PLAN_KEYS = {
  monthPass: "month_pass",
  monthlySubscription: "monthly_subscription",
  studentExam: "student_exam_monthly",
};

function parseIsoDate(value = null) {
  if (!value) return null;
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return null;
  return parsedDate;
}

function isStudentExamWindowOpen(referenceDate = new Date()) {
  const examStart = parseIsoDate(process.env.STUDENT_EXAM_PERIOD_START);
  const examEnd = parseIsoDate(process.env.STUDENT_EXAM_PERIOD_END);
  if (!examStart || !examEnd) return true;
  if (examEnd < examStart) return false;
  return referenceDate >= examStart && referenceDate <= examEnd;
}

function getPlanCatalog() {
  return {
    [PLAN_KEYS.monthPass]: {
      key: PLAN_KEYS.monthPass,
      billingPlan: PLAN_KEYS.monthPass,
      mode: "payment",
      priceId: process.env.STRIPE_PRICE_MONTH_PASS ?? "",
    },
    [PLAN_KEYS.monthlySubscription]: {
      key: PLAN_KEYS.monthlySubscription,
      billingPlan: PLAN_KEYS.monthlySubscription,
      mode: "subscription",
      priceId: process.env.STRIPE_PRICE_MONTHLY_SUBSCRIPTION ?? "",
    },
    [PLAN_KEYS.studentExam]: {
      key: PLAN_KEYS.studentExam,
      billingPlan: PLAN_KEYS.studentExam,
      mode: "subscription",
      priceId: process.env.STRIPE_PRICE_STUDENT_EXAM_MONTHLY ?? "",
    },
  };
}

function resolveCheckoutPlan(planKey = "", referenceDate = new Date()) {
  const catalog = getPlanCatalog();
  const selectedPlan = catalog[planKey];

  if (!selectedPlan) {
    return {
      key: String(planKey),
      available: false,
      reason: "invalid_plan",
    };
  }

  if (
    selectedPlan.key === PLAN_KEYS.studentExam &&
    !isStudentExamWindowOpen(referenceDate)
  ) {
    return {
      ...selectedPlan,
      available: false,
      reason: "exam_period_closed",
    };
  }

  if (!selectedPlan.priceId) {
    return {
      ...selectedPlan,
      available: false,
      reason: "missing_price_configuration",
    };
  }

  return {
    ...selectedPlan,
    available: true,
    reason: null,
  };
}

function listResolvedCheckoutPlans(referenceDate = new Date()) {
  return Object.values(PLAN_KEYS).map((key) =>
    resolveCheckoutPlan(key, referenceDate)
  );
}

module.exports = {
  PLAN_KEYS,
  parseIsoDate,
  isStudentExamWindowOpen,
  getPlanCatalog,
  resolveCheckoutPlan,
  listResolvedCheckoutPlans,
};

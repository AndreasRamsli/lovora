export function canOpenFlagReview(flag = {}) {
  return flag?.status === "open" && Boolean(flag?.reviewAvailable);
}

export function reviewButtonLabel() {
  return "Open metadata review";
}

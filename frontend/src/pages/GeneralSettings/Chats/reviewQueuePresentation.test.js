import { describe, expect, test } from "@jest/globals";
import {
  canOpenFlagReview,
  reviewButtonLabel,
} from "./reviewQueuePresentation.js";

describe("reviewQueuePresentation", () => {
  test("review action only opens when the backend marks the flag reviewAvailable", () => {
    expect(
      canOpenFlagReview({
        status: "open",
        reviewAvailable: true,
      })
    ).toBe(true);

    expect(
      canOpenFlagReview({
        status: "open",
        reviewAvailable: false,
      })
    ).toBe(false);

    expect(
      canOpenFlagReview({
        status: "resolved",
        reviewAvailable: true,
      })
    ).toBe(false);
  });

  test("uses metadata wording for api-session review buttons", () => {
    expect(
      reviewButtonLabel({
        sourceType: "api_session",
      })
    ).toBe("Open metadata review");

    expect(
      reviewButtonLabel({
        sourceType: "workspace_thread",
      })
    ).toBe("Open metadata review");
  });
});

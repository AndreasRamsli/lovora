/* global localStorage */
import { expect, test } from "@playwright/test";

test("cookie-only better auth session works without local auth token", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "anythingllm_user",
      JSON.stringify({ id: 2, username: "cookie-user", role: "default" })
    );
    localStorage.removeItem("anythingllm_authToken");
    localStorage.setItem("anythingllm_authTimestamp", String(Date.now()));
  });

  await page.route("**/api/onboarding", async (route) => {
    await route.fulfill({ json: { onboardingComplete: true } });
  });

  await page.route("**/api/setup-complete", async (route) => {
    await route.fulfill({
      json: {
        results: {
          MultiUserMode: true,
          RequiresAuth: false,
        },
      },
    });
  });

  await page.route("**/api/system/check-token", async (route) => {
    await route.fulfill({ status: 200, body: "" });
  });

  await page.route("**/api/system/refresh-user", async (route) => {
    await route.fulfill({
      json: {
        success: true,
        user: { id: 2, username: "cookie-user", role: "default" },
        message: null,
      },
    });
  });

  await page.goto("/");
  await expect(page).not.toHaveURL(/\/login/);
});

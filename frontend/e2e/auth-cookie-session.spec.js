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

  await page.route("**/api/workspaces", async (route) => {
    await route.fulfill({
      json: {
        workspaces: [
          {
            id: 1,
            name: "Workspace",
            slug: "workspace",
          },
        ],
      },
    });
  });

  await page.route("**/api/system/custom-footer-icons", async (route) => {
    await route.fulfill({ json: { customFooterIcons: [] } });
  });

  await page.route("**/api/system/support-email", async (route) => {
    await route.fulfill({ json: { email: null } });
  });

  await page.route("**/api/system/logo?**", async (route) => {
    await route.fulfill({ status: 204, body: "" });
  });

  await page.route("**/api/system/pfp/2", async (route) => {
    await route.fulfill({ status: 204, body: "" });
  });

  await page.route("**/api/workspace/workspace/threads", async (route) => {
    await route.fulfill({ json: { threads: [] } });
  });

  await page.route(
    "**/api/workspace/workspace/suggested-messages",
    async (route) => {
      await route.fulfill({ json: { suggestedMessages: [] } });
    }
  );

  await page.route("**/api/workspace/workspace/pfp", async (route) => {
    await route.fulfill({ status: 204, body: "" });
  });

  await page.route("**/api/workspace/workspace/parsed-files**", async (route) => {
    await route.fulfill({
      json: {
        files: [],
        contextWindow: 128000,
        currentContextTokenCount: 0,
      },
    });
  });

  await page.goto("/");
  await expect(page).not.toHaveURL(/\/login/);
  await expect(
    page.locator(
      'xpath=//div[contains(@class,"absolute") and contains(@class,"z-40")]/button'
    )
  ).toBeVisible();
});

import { expect, test } from "@playwright/test";

const SSR_URL = "/rendering-strategies/ssr";
const SSR_TITLE_PATTERN = /SSR/;
const SSR_CARD_TITLE = "Server-Side Rendering (SSR)";
const DIGIT_PATTERN = /\d/;

test("SSR page shows heading and non-empty server time", async ({ page }) => {
  await page.goto(SSR_URL);

  await expect(page).toHaveTitle(SSR_TITLE_PATTERN);
  await expect(page.getByText(SSR_CARD_TITLE)).toBeVisible();

  const timeElement = page.getByRole("status").locator("time");
  await expect(timeElement).toBeVisible();
  await expect(timeElement).not.toHaveText("");
  await expect(timeElement).toHaveText(DIGIT_PATTERN);
});

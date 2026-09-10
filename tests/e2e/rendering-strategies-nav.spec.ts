import { expect, test } from "@playwright/test";

const SSG_URL = "/rendering-strategies/ssg";
const HOME_URL = "/";
const BACK_LINK_NAME = "Back to home";
const HOME_HEADING = "To get started, edit the page.tsx file.";

test("rendering-strategies back link returns to home", async ({ page }) => {
  await page.goto(SSG_URL);

  await page.getByRole("link", { name: BACK_LINK_NAME }).click();

  await expect(page).toHaveURL(HOME_URL);
  await expect(page.getByRole("heading", { name: HOME_HEADING })).toBeVisible();
});

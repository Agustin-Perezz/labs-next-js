import { expect, test } from "@playwright/test";

const SSG_URL = "/rendering-strategies/ssg";
const SSG_TITLE_PATTERN = /SSG/;
const SSG_CARD_TITLE = "Static Site Generation (SSG)";
const WHEN_TO_USE_HEADING = "When to use it";
const BACK_LINK_NAME = "Back to home";

test("SSG page shows heading, when-to-use section, and back link", async ({
  page,
}) => {
  await page.goto(SSG_URL);

  await expect(page).toHaveTitle(SSG_TITLE_PATTERN);
  await expect(page.getByText(SSG_CARD_TITLE)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: WHEN_TO_USE_HEADING }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: BACK_LINK_NAME })).toBeVisible();
});

test("SSG back link navigates to home", async ({ page }) => {
  await page.goto(SSG_URL);

  await page.getByRole("link", { name: BACK_LINK_NAME }).click();

  await expect(page).toHaveURL("/");
});

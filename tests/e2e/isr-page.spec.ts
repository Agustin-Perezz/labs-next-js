import { expect, test } from "@playwright/test";

const ISR_URL = "/rendering-strategies/isr/1";
const HOW_IT_WORKS_HEADING = "How this example works";
const BACK_LINK_NAME = "Back to home";

test("ISR page shows the how-it-works explanation and back link", async ({
  page,
}) => {
  await page.goto(ISR_URL);

  await expect(
    page.getByRole("heading", { name: HOW_IT_WORKS_HEADING }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: BACK_LINK_NAME })).toBeVisible();
});

test("ISR back link navigates to home", async ({ page }) => {
  await page.goto(ISR_URL);

  await page.getByRole("link", { name: BACK_LINK_NAME }).click();

  await expect(page).toHaveURL("/");
});

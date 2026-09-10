import { expect, test } from "@playwright/test";

const CSR_URL = "/rendering-strategies/csr";
const CSR_TITLE_PATTERN = /CSR/;
const CSR_HEADING = "Client-Side Rendering (CSR)";
const QUOTE_HEADING = "GitHub Zen";
const LOADING_TEXT_PATTERN = /Fetching a fresh GitHub aphorism/;
const SETTLE_TIMEOUT_MS = 15_000;

test("CSR page shows heading and status region", async ({ page }) => {
  await page.goto(CSR_URL);

  await expect(page).toHaveTitle(CSR_TITLE_PATTERN);
  await expect(page.getByRole("heading", { name: CSR_HEADING })).toBeVisible();
  await expect(page.getByRole("status")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: QUOTE_HEADING }),
  ).toBeVisible();
});

test("CSR status region settles into success or error state", async ({
  page,
}) => {
  await page.goto(CSR_URL);

  const statusRegion = page.getByRole("status");

  await expect(statusRegion.getByText(LOADING_TEXT_PATTERN)).toBeHidden({
    timeout: SETTLE_TIMEOUT_MS,
  });

  const blockquote = statusRegion.locator("blockquote");
  const errorAlert = statusRegion.getByRole("alert");

  await expect
    .soft(blockquote.or(errorAlert))
    .toBeVisible({ timeout: SETTLE_TIMEOUT_MS });
});

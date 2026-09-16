import { expect, test } from "@playwright/test";

const PPR_URL = "/rendering-strategies/ppr";
const PPR_TITLE_PATTERN = /PPR/;
const SHELL_TITLE = "Static shell — prerendered at build time";
const HOW_IT_WORKS_HEADING = "How this example works";
const FALLBACK_LABEL = "Loading dynamic content…";
const STREAMED_LABEL = "Streamed at request time";
const BACK_LINK_NAME = "Back to home";
const STREAMED_RENDER_TIMEOUT_MS = 15_000;

test("PPR page shows shell, explanation, and back link", async ({ page }) => {
  await page.goto(PPR_URL);

  await expect(page).toHaveTitle(PPR_TITLE_PATTERN);
  await expect(page.getByText(SHELL_TITLE)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: HOW_IT_WORKS_HEADING }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: BACK_LINK_NAME })).toBeVisible();
});

test("PPR page streams dynamic content into the static shell", async ({
  page,
}) => {
  // waitUntil: 'commit' returns as soon as the response starts streaming,
  // before the dynamic boundary resolves — the only way to observe the
  // Suspense fallback.
  await page.goto(PPR_URL, { waitUntil: "commit" });

  // The static shell with the Suspense fallback paints first; the dynamic
  // clock streams in later and replaces it.
  await expect(page.getByText(FALLBACK_LABEL)).toBeVisible();
  await expect(page.getByText(STREAMED_LABEL)).toBeVisible({
    timeout: STREAMED_RENDER_TIMEOUT_MS,
  });
  await expect(page.getByText(FALLBACK_LABEL)).toBeHidden();
});

test("PPR back link navigates to home", async ({ page }) => {
  await page.goto(PPR_URL);

  await page.getByRole("link", { name: BACK_LINK_NAME }).click();

  await expect(page).toHaveURL("/");
});

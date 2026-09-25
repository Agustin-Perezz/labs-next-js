import { expect, test } from "@playwright/test";

const PAGE_URL = "/optimistics-updates";
const PAGE_HEADING = "Optimistic Updates";
const INITIAL_TODO_TEXT = "Learn Next.js";
// Unique per run: the server action keeps todos in module memory, so a fixed
// text would match items left over from previous runs while the dev server
// is reused.
const NEW_TODO_TEXT = `Test optimistic updates ${Date.now()}`;
const FAILING_TODO_TEXT = `Test failure handling ${Date.now()} [fail]`;
const PENDING_BADGE = "Saving…";
const ERROR_ALERT_PATTERN = /Could not save/;
const SETTLE_TIMEOUT_MS = 15_000;

test("new todo appears optimistically, then persists once the server confirms", async ({
  page,
}) => {
  await page.goto(PAGE_URL);

  await expect(page.getByRole("heading", { name: PAGE_HEADING })).toBeVisible();
  await expect(page.getByText(INITIAL_TODO_TEXT)).toBeVisible();

  await page.getByRole("textbox", { name: "New todo" }).fill(NEW_TODO_TEXT);
  await page.getByRole("button", { name: "Add" }).click();

  // Optimistic state: item and pending badge show up before the server responds.
  await expect(page.getByText(NEW_TODO_TEXT)).toBeVisible();
  await expect(page.getByText(PENDING_BADGE)).toBeVisible();

  // Server confirms: the badge disappears and the todo stays.
  await expect(page.getByText(PENDING_BADGE)).toBeHidden({
    timeout: SETTLE_TIMEOUT_MS,
  });
  await expect(page.getByText(NEW_TODO_TEXT)).toBeVisible();
});

test("failed update discards the optimistic item and shows an error", async ({
  page,
}) => {
  await page.goto(PAGE_URL);

  await page.getByRole("textbox", { name: "New todo" }).fill(FAILING_TODO_TEXT);
  await page.getByRole("button", { name: "Add" }).click();

  // Optimistic state shows up first, even though the server will fail.
  await expect(page.getByText(FAILING_TODO_TEXT)).toBeVisible();
  await expect(page.getByText(PENDING_BADGE)).toBeVisible();

  // Server fails: the error message appears and the ghost item is discarded.
  // Match by text, not role: Next.js adds its own empty role="alert" route
  // announcer, which would make a role locator ambiguous.
  const errorMessage = page.locator("p[role='alert']");
  await expect(errorMessage).toBeVisible({ timeout: SETTLE_TIMEOUT_MS });
  await expect(errorMessage).toContainText(ERROR_ALERT_PATTERN);
  // Scope to the list: the error message quotes the todo text, so an unscoped
  // getByText would match the error paragraph instead of the ghost item.
  const ghostItem = page.getByRole("list").getByText(FAILING_TODO_TEXT);
  await expect(ghostItem).toBeHidden({ timeout: SETTLE_TIMEOUT_MS });
});

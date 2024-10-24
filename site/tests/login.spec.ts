import { test, expect } from "@playwright/test";

test("can log in", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Username:").selectOption("team");
  await page.getByRole("button", { name: /Log in/i }).click();

  await expect(page.locator("h1")).toHaveText("The Missing Diamond");

  // Puzzle stubs are not shown outside of dev mode, but the tests run in prod mode,
  //await expect(page.getByText("Stub puzzle for slot mdp01")).toBeVisible();
});

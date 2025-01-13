import { test, expect } from "@playwright/test";

test("can log in", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("login-username-input").fill("team");
  await page.getByTestId("login-password-input").fill("password");
  await page.getByTestId("login-button").click();

  await expect(
    page.locator('main a[href="/rounds/missing_diamond"]:has(img[alt*=map])'),
  ).toBeAttached();

  // Puzzle stubs are not shown outside of dev mode, but the tests run in prod mode,
  //await expect(page.getByText("Stub puzzle for slot mdp01")).toBeVisible();
});

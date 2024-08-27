import { test, expect } from "@playwright/test";

test("can log in", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Username:").fill("team");
  await page.getByLabel("Password:").fill("password");
  await page.getByRole("button", { name: /Log in/i }).click();

  await expect(page.locator("h1")).toHaveText("Shadow Diamond investigation");

  // Puzzle stubs are not shown outside of dev mode, but the tests run in prod mode,
  //await expect(page.getByText("Stub puzzle for slot sdp01")).toBeVisible();
});

import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  //get the signin button

  await page.getByRole("link", {name: "Sign In"}).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("qwerty");

  await page.getByRole("button", {name: "LogIn"}).click();

  await expect(page.getByText("Sign In Successful")).toBeVisible();
  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name: "Sign Out"})).toBeVisible();

});

test("should allow user to register", async({page}) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 10000}@test.com`
  await page.goto(UI_URL)

  await page.getByRole("link", {name: "Sign In"}).click();
  await page.getByRole("link", {name: "Create an account"}).click();

  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("Dev")
  await page.locator("[name=lastName]").fill("qwe")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("qwerty")
  await page.locator("[name=confirmPassword]").fill("qwerty")

  await page.getByRole("button", {name: "Sign Up"}).click();

  await expect(page.getByText("Registration is done")).toBeVisible();
  await expect(page.getByRole("link",{name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name: "Sign Out"})).toBeVisible();

});


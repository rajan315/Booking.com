import {test, expect} from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173/"


test.beforeEach(async({page}) => {
    await page.goto(UI_URL);

    //get the signin button
  
    await page.getByRole("link", {name: "Sign In"}).click();
  
    await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
  
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("qwerty");
  
    await page.getByRole("button", {name: "LogIn"}).click();
  
    await expect(page.getByText("Sign In Successful")).toBeVisible(); 
});

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Description");
    await page.locator('[name="pricePerNight"]').fill("123");

    await page.selectOption('select[name="starRating"]', "3");

    await page.click('label:has-text("Budget")'); // Assuming 'Budget' is a label associated with a radio button
    await page.check('label:has-text("Free WiFi")'); // Assuming 'Free WiFi' is a label associated with a checkbox
    await page.check('label:has-text("Parking")'); // Assuming 'Parking' is a label associated with a checkbox

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("2");

    // Adjust the file upload syntax based on your framework (example shown below)
    const fileInput = await page.locator('input[name="imageFiles"]');
    await fileInput.setInputFiles([
        path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
    ]);

    await page.getByRole('button', {name:"Save"}).click()
    await expect(page.getByText("Hotel Saved!")).toBeVisible() 
})

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);
  
    await expect(page.getByText("Dublin Getaways")).toBeVisible();
    await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
    await expect(page.getByText("Dublin, Ireland")).toBeVisible();
    await expect(page.getByText("All Inclusive")).toBeVisible();
    await expect(page.getByText("£119 per night")).toBeVisible();
    await expect(page.getByText("2 adults, 3 children")).toBeVisible();
    await expect(page.getByText("2 Star Rating")).toBeVisible();
  
    await expect(
      page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  });
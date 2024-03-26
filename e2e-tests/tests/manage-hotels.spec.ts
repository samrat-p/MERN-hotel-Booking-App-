import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";
import path from "path"

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow to user to add hotels", async ({page}) => {
    await page.goto(`${UI_URL}add-hotel`);

    await expect (page.getByRole("heading",{name: "Add Hotel"})).toBeVisible();
    await page.locator("[name=name]").fill("Mitra Executive lounge");
    await page.locator("[name=city]").fill("Kolkata");
    await page.locator("[name=country]").fill("India");
    await page.locator("[name=description]").fill("E2E Testing");
    await page.locator("[name= pricePerNight]").fill("4500");
    await page.selectOption("[name=starRating]", "4");
    await page.getByText("Luxury").click();
    await page.getByLabel("Parking").check();
    await page.getByLabel("Spa").check();
    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname, "files", "hotel1.jpg"),
        path.join(__dirname, "files", "hotel2.jpg"),
    ]);

    await page.getByRole("button", {name:"Save"}).click()
    await expect(page.getByText("Hotel Saved")).toBeVisible()

})
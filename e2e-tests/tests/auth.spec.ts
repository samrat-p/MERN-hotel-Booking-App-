import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL); //gets the frontend page
  //** remember all of test are automated and done by sequencially, so the order of the code should never be changes */

  await page.getByRole("link", { name: "Sign In" }).click(); //click the sign in link
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible(); //in the button sign in should be visible
  await page.locator("[name=email]").fill("test@gmail.com"); //locate the email and fills the email tag with corresponding email
  await page.locator("[name=password]").fill("123456"); // locate the password and fills with the corresponding password
  await page.getByRole("button", { name: "Login" }).click(); // click the login button
  await expect(page.getByText("Sign in Successful!")).toBeVisible(); // in the toast sign in successful message should be visible
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible(); // check the links named my bookings
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible(); // checks the link named my hotels
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible(); // checks the button and named on the button is sign out
});

test("should allow the user to register", async ({ page }) => {
    await page.goto(UI_URL);
    const testEmail = `test_devin_${Math.floor(Math.random() * 9000) +10000}@devinai.com` //create random emails 
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("link", { name: "Create an account here" }).click();
    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();
    await page.locator("[name=firstName]").fill("testuser");
    await page.locator("[name=lastName]").fill("devin");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("7777777");
    await page.locator("[name=confirmpassword]").fill("7777777");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Registration Sucess!")).toBeVisible();
    await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible(); 
});

import { test, expect } from "@playwright/test";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});
 
test ("should show hotels search result", async({page})=> {
    await page.goto(UI_URL)
    
    await page.getByPlaceholder("Where are you going mate!").fill("uk")
    await page.getByRole("button", {name:"Search"}).click()
    await expect(page.getByText("Hotels found in uk")).toBeVisible()
    await expect(page.getByText("British Grand Prix")).toBeVisible()
    
})

test("should show hotel detalis", async({page}) => {
  await page.goto(UI_URL)
  await page.getByPlaceholder("Where are you going mate!").fill("uk")
  await page.getByRole("button", {name: "Search"}).click()
  await expect(page.getByText("British Grand Prix")).toBeVisible()
  await page.getByRole("button",{name:"View More"}).click()
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button",{name:"Book now"})).toBeVisible()
})

test("should book hotel", async ({page}) => {
  await page.goto(UI_URL)
  await page.getByPlaceholder("Where are you going mate!").fill("uk")

  const date = new Date()
    date.setDate(date.getDate()+3)
    const formattedDate = date.toISOString().split("T")[0]
  await page.getByPlaceholder("Check-out Date").fill(formattedDate)
  
  await page.getByRole("button", {name: "Search"}).click()
  await page.getByText("British Grand Prix").click()
  await page.getByRole("button",{name:"Book now"}).click();

  await expect(page.getByText("Total Cost: $500.00"))
  //await expect(page).toHaveURL(/detail/);
  //await expect(page.getByRole("button",{name:"Book now"})).toBeVisible();

})
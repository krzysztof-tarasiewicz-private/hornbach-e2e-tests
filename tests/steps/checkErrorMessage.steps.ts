import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "./world";
import { expect } from "@playwright/test";

Given("User is on the view of the applications", async () => {
  await expect(page.locator("h3 > a")).toHaveText("List of applications");
  await page.click("h3 > a");

});
When("User opens an existing application", async () => {
  await page.click("//a[contains(@href, '100000001')]");
});

When("Removes data from \"Company Name\" input", async () => {
  await page.fill("#company_companyName", "");
});
Then("Error message on the form is visible", async () => {
  await expect(page.locator(`//*[contains(text(),"errors")]`)).toBeVisible();
  await page.waitForTimeout(5000);
});

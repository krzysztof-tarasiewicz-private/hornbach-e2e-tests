import {When, Then} from "@cucumber/cucumber";
import {page} from "./world";
import {expect} from "@playwright/test";

When("User removes data from \"Company Name\" input", async () => {
    await page.fill("#company_companyName", "");
});
Then("Error message on the form is visible", async () => {
    await expect(page.locator(`//*[contains(text(),"errors")]`)).toBeVisible();
});

import {When, Then} from "@cucumber/cucumber";
import {page} from "./world";
import {expect} from "@playwright/test";

When("User unchecked \"different billing address\" checkbox", async () => {
    await (page.locator("//*[@id=\"isAdditionalBillingAddress\"]")).click();
});
Then("\"Billing address\" section is hidden", async () => {
    await expect(page.locator("//*[@id=\"additionalBillingAddress_name-label\"]")).not.toBeVisible();
    await expect(page.locator("//*[@id=\"isAdditionalBillingAddress\"]")).not.toBeChecked();
});
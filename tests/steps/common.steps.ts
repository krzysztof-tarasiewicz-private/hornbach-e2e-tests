import {Given, When} from "@cucumber/cucumber";
import {page} from "./world";
import {expect} from "@playwright/test";

Given("User is on the view of the applications", async () => {
    await expect(page.locator("h3 > a")).toHaveText("List of applications");
    await page.click("h3 > a");
});
When("User opens an existing application", async () => {
    await page.click("//a[contains(@href, '100000001')]");
});
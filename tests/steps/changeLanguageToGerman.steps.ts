import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "./world";
import { expect } from "@playwright/test";


Given("Opens an application", async () => {
  await expect(page.locator("h3 > a")).toHaveText("List of applications");
});

When("Changes language of the application", async () => {
  await page.click("h3 > a");
  await page.click("#language-chooser");
  await page.click("//*[@data-value=\"de\"]");
});

Then("Language of the form is in German", async () => {
  await expect(page.locator("//*[contains(text(),\"neue Anwendungen hinzufügen\")]")).toBeVisible();
});

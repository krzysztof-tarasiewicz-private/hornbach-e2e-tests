import {Given, When, Then} from "@cucumber/cucumber";
import { page } from "./world";
import {expect} from "@playwright/test"


Given('I am on Hornbach site', async () => {
  await expect(page.locator('//h1')).toHaveText('Online Antragserfassung ProfiCard');
  // Write code here that turns the phrase above into concrete actions
});

When('I click Main Card link', async () => {
  await page.locator(`//*[contains(@href, 'application/main')]`).click();
});

Then('I see Main Card Profi Card form', async () => {
  await expect(page.locator('//*[contains(text(),"Firmierung")]')).toBeVisible();
});

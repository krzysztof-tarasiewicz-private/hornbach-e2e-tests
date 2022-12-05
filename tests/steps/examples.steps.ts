import {Given, When, Then} from "@cucumber/cucumber";
import { page } from "./world";
import {expect} from "@playwright/test"


  Given('the user is on the demo website', async function () {
    //await expect(page.locator('.status')).toHaveText('Submitted');
    await expect(page.locator('[id=login-button]')).toHaveText('Login');
    
  });

  When('she enters her account information', async function () {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('[id=login-button]').click();
  });

  Then('she is logged in on the product page', async function () {
    await expect (page.locator('[id=add-to-cart-sauce-labs-onesie]')).toBeVisible();
  });
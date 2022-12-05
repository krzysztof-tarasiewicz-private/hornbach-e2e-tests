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

  Then('she is logged in on the {string}', async function (pageType) {
    if(pageType === "product page"){
      verifyProductPage();
    }
  });

  async function verifyProductPage() {
    let itemTitelElement = page.locator('[id=item_2_title_link]');
    await expect (itemTitelElement).toHaveValue('Sauce Labs Onesie');
    //await expect (page.locator('.inventory_item'))
    let result = await page.$$('.inventory_item');
    let inventoryItems = await page.locator('.inventory_item');
    await expect (await inventoryItems.count() === 6);
    await expect (page.locator('[id=add-to-cart-sauce-labs-onesie]')).toBeVisible();
  };
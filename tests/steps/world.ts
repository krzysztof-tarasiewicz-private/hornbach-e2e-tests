import {After, AfterAll, Before, BeforeAll, setDefaultTimeout} from '@cucumber/cucumber';
import {Browser, BrowserContext, chromium, Page} from 'playwright';
import {expect} from "@playwright/test";

let page: Page;
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(50000);

BeforeAll(async () => {
    try {
        global.browser = await chromium.launch({headless: false, slowMo: 200});
    }
    catch (error) {
        console.log(`chrome navigation to demo site failed due to ${error}`);
        throw new Error(`chrome navigation to demo site failed due to ${error}`);
    }
});

Before(async () => {
    try {
        context = await global.browser.newContext();
        page = await context.newPage();
        await page.goto("https://frontend.hornbach-develop.loyaltyharbor.dev")
        console.log(`captured site title as ${await page.title()}`);
    }
    catch (error) {
        console.log(`chrome navigation to demo site failed due to ${error}`);
        throw new Error(`chrome navigation to demo site failed due to ${error}`);
    }

    // // Given step
    // await expect(page.locator("h3 > a")).toHaveText("List of applications");
    // await page.click("h3 > a");
    // // When step
    // await page.click("//a[contains(@href, '100000001')]");

    return page;
    
});

After (async() => {
    await page.close();
    await context.close();
});


AfterAll (async () => {
    await global.browser.close();
});

export { page, browser};
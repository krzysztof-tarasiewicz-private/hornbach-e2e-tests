import {Given, When, Then} from "@cucumber/cucumber";
import { page } from "./world";
import {expect} from "@playwright/test"


When('Fill the Hauptkartenantrag form', async () => {

  await page.fill('//*[@id="company-name"]', 'Test');
  
  const companyName = await page.selectOption('//*[@id="company-legalForm"]', '61');
  
  const companyForm = await page.locator('//*[@id="company-branchCategory"]');
  await companyForm.click();
  await page.waitForTimeout(1000);
  await companyForm.selectOption({ label: 'Industrie'});
  
  
  const companyIndustry = await page.selectOption('//*[@id="company-branchOfIndustry"]', '090011');

  expect(companyName).toContain('61');
  expect(companyForm).toContainText(['Industrie']);
  expect(companyIndustry).toContain('090011');

  await page.fill('//*[@id="company-address-streetName"]', 'Main test street');
  await page.fill('//*[@id="company-address-houseAndBuildingNumber"]', '112233');
  await page.fill('//*[@id="company-address-contactInformation-email"]', 'kkkguglvdcrucvuybs@tmmcv.net')

  //Hauptkarteninhaber part of the form
  await page.click('//*[@data-target="#collapse-mainCardHolder"]');
  await expect(page.locator('//*[@id="mainCardHolder-salutation-label"]')).toBeVisible();

  const mainCardHolderSalutation = await page.selectOption('//*[@id="mainCardHolder-salutation"]', '1');
  const mainCardHolderTitle = await page.selectOption('//*[@id="mainCardHolder-title"]', '53');

  await page.fill('//*[@id="mainCardHolder-firstName"]', 'Automated');
  await page.fill('//*[@id="mainCardHolder-lastName"]', 'Test');
  await page.fill('//*[@id="mainCardHolder-dateOfBirth"]', '12.12.2000');
  await page.fill('//*[@id="mainCardHolder-placeOfBirth"]', 'TesterStadt');
  
  const citizenShip = await page.selectOption('//*[@id="mainCardHolder-citizenShip"]', '616');
  
  await page.fill('//*[@id="mainCardHolder-address-streetName"]', 'Test Strasse');
  await page.fill('//*[@id="mainCardHolder-address-houseAndBuildingNumber"]', '11111111');
  await page.fill('//*[@id="mainCardHolder-address-zipCode"]', '7777777775');
  await page.fill('//*[@id="mainCardHolder-address-city"]', 'TesterStadt');

  const countryCode = await page.selectOption('//*[@id="mainCardHolder-address-countryCode"]', '616');

  expect(mainCardHolderSalutation).toContain('1');
  expect(mainCardHolderTitle).toContain('53');
  expect(citizenShip).toContain('616');
  expect(countryCode).toContain('616');

  //Bankverbindung part of the form

  await page.click('//*[@id="collapse-paymentData-icon"]');
  await expect(page.locator('//*[@id="paymentData-paymentMeans-label"]')).toBeVisible();

  const paymentProcedure = await page.selectOption('//*[@id="paymentData-paymentMeans"]', '1');

  await page.locator('//*[@id="paymentData-bankAccount-iban"]').fill('DE26500105178817896277');
  await page.mouse.click(100, 100);

  const bankName = await page.locator('//*[@id="paymentData-bankAccount-bankName"]');
  const bankBic = await page.locator('//*[@id="paymentData-bankAccount-bic"]');
  const bankCity = await page.locator('//*[@id="paymentData-bankAccount-bankCity"]');

  await page.fill('//*[@id="paymentData-creditLimit-number"]', '1000');

  const homeStore = await page.selectOption('//*[@id="marketingDetails-homeStore"]', '524');

  expect(paymentProcedure).toContain('1');
  expect(bankName).not.toBeEmpty();
  expect(bankBic).not.toBeEmpty();
  expect(bankCity).not.toBeEmpty();
  expect(homeStore).toContain('524');

  //Legitimation part of the form

  await page.click('//*[@id="collapse-legitimationData-icon"]');
  await expect(page.locator('//*[@id="legitimation-identityCardNumber-label"]')).toBeVisible();

  await page.fill('//*[@id="legitimation-identityCardNumber"]', 'Test ID 5963840712');
  await page.fill('//*[@id="legitimation-issuingAuthority"]', 'QA Engineer');
  await page.fill('//*[@id="legitimation-issueDate"]', '12-12-2022');
  await page.fill('//*[@id="legitimation-signatures-nameOfFirstSignature"]', 'QA Engineer Sign');
  await page.fill('//*[@id="legitimation-signatures-nameOfSecondSignature"]', 'QA Engineer Sign 2');

  //Prufen und Senden part of the form

  await page.click('//*[@id="collapse-verifyAndSubmit-icon"]');
  await expect(page.locator('//*[contains(text(),"HORNBACH-Baumarkt AG")]')).toBeVisible();
  await page.waitForTimeout(5000);
  await page.click('//*[@id="termsAndConditions"]');
  await page.waitForTimeout(5000);

});

Then('I go go the next part of the form - Hauptkarteninhaber', async () => {
//inprogress

});
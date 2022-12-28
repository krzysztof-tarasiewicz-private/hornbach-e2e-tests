import {When, Then} from "@cucumber/cucumber";
import {page} from "./world";
import {expect} from "@playwright/test";

When("User completes empty fields in the form", async () => {
    //Dropdowns & inputs of the form
    const salutationDropdownMainCard = page.locator("//*[@id=\":rk:\"]"),
        titleDropdownMainCard = page.locator("//*[@id=\":rm:\"]"),
        dateOfBirthMainCard = page.locator("//*[@id=\":rq:\"]"),
        cardholderEmail = page.locator("//*[@id=\"mainCardHolder_email\"]"),
        salutationDropdownCompanyName = page.locator("//*[@id=\":ru:\"]"),
        titleDropDownCompanyOwner = page.locator("//*[@id=\":r10:\"]"),
        dateOfBirthCompanyOwner = page.locator("//*[@id=\":r14:\"]"),
        placeOfBirthCompanyOwner = page.locator("//*[@id=\"companyOwner_placeOfBirth\"]"),
        nationalityCompanyOwner = page.locator("//*[@name=\"companyOwner.nationality\"]"),
        countryCompanyOwner = page.locator("//*[@name=\"companyOwner.address.country\"]");

    //Main cardholder part
    await salutationDropdownMainCard.click();
    await page.getByRole('option', {name: "Herr"}).click();
    await titleDropdownMainCard.click();
    await page.getByRole("option", {name: "Dipl.-Volksw."}).click();
    await page.fill("//*[@id=\"mainCardHolder_firstName\"]", "Main Card");
    await page.fill("//*[@id=\"mainCardHolder_lastName\"]", "Tester");
    await dateOfBirthMainCard.fill("20.12.2002");
    await cardholderEmail.fill("testmail@testmail.com");
    await page.fill("//*[@id=\"mainCardHolder_cellPhoneNumber\"]", "06408 38 30 65");
    await page.fill("//*[@id=\"mainCardHolder_phoneNumber\"]", "089 91 83 48");

    //Company owner part
    await salutationDropdownCompanyName.click();
    await page.getByRole('option', {name: "Herr"}).click();
    await titleDropDownCompanyOwner.click();
    await page.getByRole("option", {name: "Dr.-Ing."}).click();
    await page.fill("//*[@id=\"companyOwner_firstName\"]", "Company Test First Name");
    await page.fill("//*[@id=\"companyOwner_lastName\"]", "Company Test Last Name");
    await dateOfBirthCompanyOwner.fill("20.12.2002");
    await placeOfBirthCompanyOwner.fill("Tester City");
    await nationalityCompanyOwner.click();
    await page.getByRole("option", {name: "deutsch"}).click();
    await page.fill("//*[@id=\"companyOwner_address_address\"]", "Additional Test address");
    await page.fill("//*[@id=\"companyOwner_address_street\"]", "Company Test Street");
    await page.fill("//*[@id=\"companyOwner_address_houseNumber\"]", "Test12");
    await page.fill("//*[@id=\"companyOwner_address_zipCode\"]", "99406");
    await page.fill("//*[@id=\"companyOwner_address_city\"]", "Wiemar Test");
    await countryCompanyOwner.click();
    await page.getByRole("option", {name: "Deutschland"}).click();
    await page.fill("//*[@id=\"companyOwner_email\"]", "testmailCompanyOwner@testmail.com");
    await page.fill("//*[@id=\"companyOwner_cellPhoneNumber\"]", "036453 81 71");

    //BV/Availability limit part
    await page.fill("//*[@id=\"availabilityLimit_iban-label\"]", "DE07500105174295811812");
    await page.waitForTimeout(4000);

    //Expected results
    await expect(salutationDropdownMainCard).toHaveValue("Herr");
    await expect(titleDropdownMainCard).toHaveValue("Dipl.-Volksw.");
    await expect(dateOfBirthMainCard).toHaveValue("20.12.2002");
    await expect(cardholderEmail).toHaveValue("testmail@testmail.com");
    await expect(dateOfBirthCompanyOwner).toHaveValue("20.12.2002");
    await expect(placeOfBirthCompanyOwner).toHaveValue("Tester City");
    await expect(nationalityCompanyOwner).toHaveValue("deutsch");
    await expect(countryCompanyOwner).toHaveValue("Deutschland");
});

Then("Error message on the form disappears and Legitimized button is active", async () => {
    //Check if LEGITIMIZED button is active
    await expect(page.locator("//button[contains(text(),\"Legitimized\")]")).toBeEnabled();
    //Check if Error message disappears
    await expect(page.locator(`//*[contains(text(),"errors")]`)).not.toBeVisible();
});

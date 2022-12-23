import {When, Then} from "@cucumber/cucumber";
import {page} from "./world";
import {expect} from "@playwright/test";

When("User completes empty fields in the form", async () => {
    //Dropdowns & inputs of the form
    const salutationDropdown = page.locator("//*[@id=\":ri:\"]")
    const titleDropdown = page.locator("//*[@id=\":rk:\"]")
    const dateOfBirth = page.locator("//*[@id=\":rm:\"]")
    const cardholderEmail = page.locator("//*[@id=\"mainCardHolder_email\"]")

    //Main cardholder part
    await salutationDropdown.click();
    await page.getByRole('option', {name: "Herr"}).click();
    await titleDropdown.click();
    await page.getByRole("option", {name: "Dipl.-Volksw."}).click();
    await dateOfBirth.fill("20.12.2002");
    await page.fill("//*[@id=\"mainCardHolder_firstName\"]", "Main Card");
    await page.fill("//*[@id=\"mainCardHolder_lastName\"]", "Tester");
    await cardholderEmail.fill("testmail@testmail.com");
    await page.fill("//*[@id=\"mainCardHolder_cellPhoneNumber\"]", "06408 38 30 65");
    await page.fill("//*[@id=\"mainCardHolder_phoneNumber\"]", "089 91 83 48");

    //Expected results
    await expect(salutationDropdown).toHaveValue("Herr");
    await expect(titleDropdown).toHaveValue("Dipl.-Volksw.");
    await expect(dateOfBirth).toHaveValue("20.12.2002");
    await expect(cardholderEmail).toHaveValue("testmail@testmail.com");
});

Then("Error message on the form disappears and Legitimized button is active", async () => {
    //Check if LEGITIMIZED button is active
    await expect(page.locator("//button[contains(text(),\"Legitimized\")]")).toBeEnabled();
    //Check if Error message disappears
    await expect(page.locator(`//*[contains(text(),"errors")]`)).not.toBeVisible();
});

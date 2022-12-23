Feature: Finishing incomplete of the application

Feature Description : Hornbach user wants to complete unfinished application

  Background: User in on the Application view and opens an existing application
    Given User is on the view of the applications
    When User opens an existing application

  Scenario: Check if error message appears
    When User removes data from "Company Name" input
    Then Error message on the form is visible

  Scenario: Check if Hornbach user can send application to the CREFO
    When User completes empty fields in the form
    Then Error message on the form disappears and Legitimized button is active

  Scenario: Billing address checkbox is unchecked
    When User unchecked "different billing address" checkbox
    Then "Billing address" section is hidden

  Scenario: Verification that the customer is of the age of majority
    When User provides date of birth of the Customer
    Then User verifies if customer is adult
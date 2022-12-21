Feature: First Feature

Feature Description : Run first tests


  Scenario: User changes a language of the application to German
    Given Opens an application
    When Changes language of the application
    Then Language of the form is in German

  Scenario: Check if error message appears
    Given User is on the view of the applications
    When User opens an existing application
    When Removes data from "Company Name" input
    Then Error message on the form is visible

#  Scenario: Check if error message appears
#    Given User is on the view of the applications
#    When User opens an existing application
#    When Removes data from "Company Name" input
#    Then Error message on the form is visible
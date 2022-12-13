Feature: First Feature

Feature Description : Run first tests


Scenario: Make a first test
    Given I am on Hornbach site
    When I click Main Card link
    Then I see Main Card Profi Card form

Scenario: Completion of the Hauptkartenantrag form
    Given I am on Hornbach site
    When I click Main Card link
    When Fill the Hauptkartenantrag form
    Then I go go the next part of the form - Hauptkarteninhaber
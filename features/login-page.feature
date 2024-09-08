Feature: Login Page Demoblaze

  Scenario: As a user, I want to be able to login on the application Demoblaze
    Given open web url "https://www.demoblaze.com/"
    When User input username "aswar"
    And User input password "123456A"
    And Click button login
    Then verify the login user

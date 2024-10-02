
Feature: Verify Eccomerce Website

   @Login
   Scenario: placing an order
      Given Login to Website
      When Enter creadintial as email "mayurimkatwe@gmail.com" and password as "Test@1998"
      Then all card should be visible

Feature: Verify invalid login scenario

    Scenario Outline: Check For invalid multiple data
        Given Login to application with invalid "<userName>" and "<password>"
        Then Error should be shown on page

        Examples:
            | userName          | passWord  |
            | mayuri@gmail.com  | maya@123  |
            | vaibhav@gmail.com | vaibh@123 |

    Scenario Outline: Check For invalid multiple data
        Given Login to application with invalid "<userName>" and "<password>"
        Then Error should be shown on page

        Examples:
            | userName          | passWord  |
            | jaya@gmail.com  | maya@123  |
            | bhave@gmail.com | vaibh@123 |
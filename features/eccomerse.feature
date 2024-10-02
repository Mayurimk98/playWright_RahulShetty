Feature: Eccomerce validation
@Foo
    Scenario: Verify order journey
        Given login to website
        When Navigate card page and add item to card 
        Then Item should prsent in checkout page
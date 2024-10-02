const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

Given('Login to application with invalid {string} and {string}', async function (userName, passWord) {
    await this.page.goto('https://rahulshettyacademy.com/client')
    await this.page.locator('#userEmail').fill(userName)
    await this.page.locator('#userPassword').fill(passWord)
    await this.page.locator('#login').click()
})

Then('Error should be shown on page', async function () {
    let errorMsg = await this.page.locator('#toast-container .toast-message')
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toHaveText(' Incorrect email or password. ')
})






const { When, Then, Given } = require('@cucumber/cucumber')
const { test, expect, playwright } = require('@playwright/test')

Given('Login to Website', async function () {
    // const browser = await chromium.launch()
    // const context = await browser.newContext()
    // page = await context.newPage()
    await this.page.goto('https://rahulshettyacademy.com/client')
})

When('Enter creadintial as email {string} and password as {string}', async function (username, pass) {
    let userName = this.page.locator('#userEmail')
    let password = this.page.locator('#userPassword')
    let loginBtn = this.page.locator('#login')
    await userName.fill(username)
    await password.fill(pass)
    await loginBtn.click()
    await this.page.waitForLoadState('networkidle')
})

Then('all card should be visible', async function () {
    let title = await this.page.locator('[class="card-body"] b').allTextContents()
    await expect(title.length).toBe(3)
})
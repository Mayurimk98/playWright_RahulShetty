const { test, expect } = require('@playwright/test')

test('First Test case', async function ({ browser }) {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://www.webdriveruniversity.com/')
    console.log(await page.title())
    await expect(page).toHaveTitle("WebDriverUniversity.com")
})

test('Second Test case', async function ({ page }) {
    // const context = await browser.newContext()
    // const page = await context.newPage()
    await page.goto('https://google.com')
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
})
const { test, expect } = require('@playwright/test')

test('Verify confirm alert in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // await page.on('dialog', dialog => dialog.accept())
    // await page.locator('#confirmbtn').click()

    // await page.on('dialog', dialog => dialog.dismiss())
    // await page.locator('#confirmbtn').click()

    await page.on('dialog', dialog => dialog.accept())
    await page.locator('#alertbtn').click()

})

test('MouseHover in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#mousehover').hover()
    await expect(page.locator('.mouse-hover-content')).toBeVisible()
})
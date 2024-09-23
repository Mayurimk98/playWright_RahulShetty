const { test, expect } = require('@playwright/test')

test('Verify dropdown in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    //Static dropdown
    await page.locator('select[class="form-control"]').selectOption('consult')
})

test('Verify radioButton in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('[class="customradio"]').first().click()
    await expect(page.locator('[class="customradio"]').first()).toBeChecked()
    expect(await page.locator('[class="customradio"]').first().isChecked()).toBeTruthy()
})

test('Verify checkBox in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#terms').first().check()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').first().uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
})

test('attribute assertion', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await expect(page.locator('[href*="documents-request"]')).toHaveAttribute('class', 'blinkingText')
})
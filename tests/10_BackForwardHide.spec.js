const { test, expect } = require('@playwright/test')

test('Verify some back and forward methods in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goto('https://www.google.com/')
    await page.goBack()
    await page.goForward()
})

test('Verify validation for hide element playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()
    await page.locator('#show-textbox').click()
    await expect(page.locator('#displayed-text')).toBeVisible()
})
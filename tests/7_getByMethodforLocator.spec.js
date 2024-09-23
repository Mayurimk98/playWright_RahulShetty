const { test, expect } = require('@playwright/test')

test('Verify getBy methods to find locator in playwright', async function ({ page }) {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')
    await page.getByLabel('Gender').selectOption('Female')
    await page.getByLabel('Employed').click()
    await page.getByLabel('Check me out if you Love IceCreams!').check()
    await page.getByPlaceholder('Password').fill('123')
    await page.getByRole('button', { name: "Submit" }).click()
    await expect(page.getByText(' The Form has been submitted successfully!.')).toBeVisible()
    await page.getByRole('link', { name: "Shop" }).click()
    await page.locator('app-card').filter({ hasText: "Nokia Edge" }).getByRole('button').click()
    await expect(page.locator('[class="nav-link btn btn-primary"]')).toContainText('1')
})
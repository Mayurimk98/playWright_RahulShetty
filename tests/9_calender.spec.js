const { test, expect } = require('@playwright/test')

test('Verify calender functionality in playwright', async function ({ page }) {

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')

    const date = "5"
    const month = "2"
    const year = "2025"
    await page.locator('[class="react-date-picker__inputGroup"]').click()
    await page.locator('.react-calendar__navigation__label__labelText').click()
    await page.locator('.react-calendar__navigation__label__labelText').click()
    await page.getByText(year).click()
    await page.locator('abbr').nth(month - 1).click()
    await page.locator('[class="react-calendar__month-view__days"] button').filter({ hasText: date }).first().click()

    const inputText = page.locator('[class="react-date-picker__inputGroup"] input')
    let countA = await inputText.count()
    let arr = [null, month, date, year]
    for (let i = 1; i < countA; i++) {
        let a = await inputText.nth(i).getAttribute('value')
        await expect(a).toEqual(arr[i])
    }

})
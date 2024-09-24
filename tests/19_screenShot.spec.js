const { test ,expect} = require('@playwright/test')

test('Get the screenshot of page', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()
    await page.locator('#show-textbox').click()
    await page.screenshot({path:'screenShot1.jpg'})
    await page.locator('#displayed-text').screenshot({path:'screenShot2.png'})
    await expect(page.locator('#displayed-text')).toBeVisible()

})
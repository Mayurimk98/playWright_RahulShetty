const { test,expect } = require('@playwright/test')

test('Verify Iframe in playwright', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    let iFrame = await page.frameLocator('#courses-iframe')
    await iFrame.locator('li a[href="lifetime-access"]:visible').click()
    const textI = await iFrame.locator('.content-side h2').textContent()
    await expect(textI.split(' ')[1]).toEqual('13,522')
})
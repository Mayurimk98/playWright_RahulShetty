const { test } = require('@playwright/test')
test('Verify wait action in playwright', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client')
    let userName = page.locator('#userEmail')
    let password = page.locator('#userPassword')
    let loginBtn = page.locator('#login')

    await userName.fill('mayurimkatwe@gmail.com')
    await password.fill('Test@1998')
    await loginBtn.click()

    //Method 1
    ////await page.waitForLoadState('networkidle')

    //Method 2
    ////await page.locator('[class="card-body"] b').first().waitFor()

    let title = await page.locator('[class="card-body"] b').allTextContents()
    console.log(title)

})
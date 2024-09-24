const { test,expect } = require('@playwright/test')

test('Intercept request for security testing with the help of playwright', async ({ page }) => {

    //login and navigate to card page
    await page.goto('https://rahulshettyacademy.com/client')
    const userName = page.getByPlaceholder('email@example.com')
    const passWord = page.getByPlaceholder('enter your passsword')
    const signUpBtn = page.getByRole('button', { name: 'Login' })

    await userName.fill("mayurimkatwe@gmail.com")
    await passWord.fill('Test@1998')
    await signUpBtn.click()
    await page.waitForLoadState('networkidle')
    await page.locator('div[class="card-body"]').first().waitFor()
    await page.locator('button[routerlink="/dashboard/myorders"]').click()




    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=66f521998e2afd8076e2' })
    )
    await page.locator('button:has-text("View")').first().click()
    await expect(page.locator("p").last()).toHaveText('You are not authorize to view this order')

})
const { test, expect } = require('@playwright/test')

test('E2e test case for rahul shetty', async function ({ page }) {
    await page.goto('https://rahulshettyacademy.com/client')
    const userName = page.getByPlaceholder('email@example.com')
    const passWord = page.getByPlaceholder('enter your passsword')
    const signUpBtn = page.getByRole('button', { name: 'Login' })

    await userName.fill("mayurimkatwe@gmail.com")
    await passWord.fill('Test@1998')
    await signUpBtn.click()
    await page.waitForLoadState('networkidle')
    await page.locator('div[class="card-body"]').first().waitFor()

    await page.locator('div[class="card-body"]').filter({ hasText: "ADIDAS ORIGINAL" }).getByRole('button', { name: " Add To Cart" }).click()
    await page.getByRole('listitem').getByRole('button', { name: "Cart" }).click()
    await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible()
    await page.getByText('Checkout').click()
    await expect(page.getByText('mayurimkatwe@gmail.com')).toHaveText('mayurimkatwe@gmail.com')
    await page.getByPlaceholder('Select Country').pressSequentially('ind')
    await page.getByRole('button', { name: "India" }).nth(1).click()
    await page.getByText('Place Order ').click()
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible()
})
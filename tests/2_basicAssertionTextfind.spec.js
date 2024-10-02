const { test, expect } = require('@playwright/test')

test('TestCase 1 for valid login', async ({ page }) => {

    let dashboardEle = await page.locator('h6[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]')
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.locator('input[name="username"]').fill('Admin')
    await page.locator('input[name="password"]').fill('admin123')
    await page.locator('button[type="submit"]').click()
    await expect(dashboardEle).toBeVisible()
    await expect(dashboardEle).toHaveText('Dashboard')
    await expect(page).toHaveTitle('OrangeHRM')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    await expect(page.locator('[alt="client brand banner"]')).toBeVisible()
})

test('TestCase 2 for invalid login', async ({ page }) => {

    let errorMsg = await page.locator('[class="oxd-text oxd-text--p oxd-alert-content-text"]')
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.locator('input[name="username"]').fill('maya')
    await page.locator('input[name="password"]').fill('mayuri')
    await page.locator('button[type="submit"]').click()
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toHaveText('Invalid credentials')
})

test('TestCase 3 for invalid login textContent and assertion', async ({ page }) => {

    let errorMsg = await page.locator('[class="oxd-text oxd-text--p oxd-alert-content-text"]')
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.locator('input[name="username"]').fill('maya')
    await page.locator('input[name="password"]').fill('mayuri')
    await page.locator('button[type="submit"]').click()
    await expect(errorMsg).toBeVisible()
    console.log(await page.locator('[class="oxd-text oxd-text--p oxd-alert-content-text"]').textContent())
    await expect(errorMsg).toContainText('Invalid')
})

test('@slow See multiple ele handling by using first(),last(),nth() method', async function ({ page }) {
    await page.goto('https://www.toolsqa.com/')
    let eleText = await page.locator('div[class="category__name"]').first().textContent()
    console.log(eleText)
    let eleText1 = await page.locator('div[class="category__name"]').nth(1).textContent()
    console.log(eleText1)
    let eleText2 = await page.locator('div[class="category__name"]').last().textContent()
    console.log(eleText2)
})

test('List of element handling method allTextContents()', async function ({ page }) {
    await page.goto('https://www.toolsqa.com/')
    // let eleText = await page.locator('div[class="category__name"]').first().textContent()
    //     console.log(eleText)
    let eleText1 = await page.locator('div[class="category__name"]').allTextContents()
    console.log(eleText1)
})


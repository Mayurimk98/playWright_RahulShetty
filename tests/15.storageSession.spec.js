const { test, expect } = require('@playwright/test')

let newWebBrowser
test.beforeAll(async function ({ browser }) {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('mayurimkatwe@gmail.com')
    await page.locator('#userPassword').fill('Test@1998')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    await context.storageState({ path: 'state.json' })
    newWebBrowser = await browser.newContext({ storageState: 'state.json' })
})

test('save session staorage and inject into new browser contex', async function () {
    const page = await newWebBrowser.newPage()
    const itemInfo = await page.locator('div[class="card-body"]')
    const productName = "ADIDAS ORIGINAL"
    await page.goto('https://rahulshettyacademy.com/client')
    const allTitle = await page.locator('div[class="card-body"] b').allTextContents()
    console.log(allTitle)
    const countNo = await itemInfo.count()

    for (let i = 0; i < countNo; ++i) {
        if (await itemInfo.nth(i).locator('b').textContent() === productName) {
            await itemInfo.nth(i).locator('text=  Add To Cart').click()
            break
        }
    }
    await page.locator('[routerlink="/dashboard/cart"]').click()
    await page.locator('div li').first().waitFor()
    const bool = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible()
    await expect(bool).toBeTruthy()
    await page.locator('[class="btn btn-primary"]').last().click()
    await page.locator('input[placeholder="Select Country"]').pressSequentially('ind')

    const ddOption = page.locator('[class="ta-results list-group ng-star-inserted"]')
    await ddOption.waitFor()


    const ddBtn = page.locator('[class="ta-results list-group ng-star-inserted"] button')
    const countDD = await ddBtn.count()
    console.log(countDD)

    for (let i = 0; i < countDD; i++) {
        if (await ddBtn.nth(i).textContent() === ' India') {
            await ddBtn.nth(i).click()
            break;

        }
    }
    await page.locator('input[class="input txt"]').first().fill('123')
    await page.locator('input[class="input txt"]').last().fill('Mayuri')
    expect(await page.locator('[class="user__name mt-5"] label')).toHaveText('mayurimkatwe@gmail.com')

    await page.locator('[class="btnn action__submit ng-star-inserted"]').click()

    await page.waitForLoadState('networkidle')

    await expect(page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order. ')

    const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent()
    console.log(orderID)

    await page.locator('button[routerlink="/dashboard/myorders"]').click()
    await page.locator('tbody').waitFor()
    const tableRow = page.locator('table tbody tr')
    for (let i = 0; i < await tableRow.count(); i++) {
        const tableOrderID = await tableRow.nth(i).locator('th').textContent()
        console.log(tableOrderID)
        if (orderID.includes(tableOrderID)) {
            await tableRow.nth(i).locator('.btn-primary').click()
        }
    }

    await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')

})


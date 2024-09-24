const { test } = require('@playwright/test')
test('Verify Network abort call in playwright', async ({ browser }) => {

    // await page.route('**/*.{jpg,png,jpeg}',
    //     route => {
    //         route.abort()
    //     }
    // )
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.route('**/*.css',
        route => {
            route.abort()
        }
    )
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('learning')
    await page.locator('[class="radiotextsty"]').first().click()
    await page.locator('.form-control').last().selectOption('teach')
    await page.locator('#terms').check()
    await page.locator('#signInBtn').click()
    await page.waitForLoadState('networkidle')

})
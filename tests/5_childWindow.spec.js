const { test } = require('@playwright/test')

test('Handle child tab by using playwright', async function ({ browser }) {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    let documentLink = page.locator('[href*="documents-request"]')

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])

    let textB = await newPage.locator('.red').textContent()
    console.log(textB)
    let newText = textB.split('@')[1].split(" ")[0]
    await page.locator('#username').fill(newText)
    page.pause()



})
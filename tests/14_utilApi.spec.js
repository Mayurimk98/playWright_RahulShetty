const { test, expect, request } = require('@playwright/test')
const { apiUtils } = require('../utils/apiUtils')
const loginData = { userEmail: "mayurimkatwe@gmail.com", userPassword: "Test@1998" }
const orderData = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let responseObj

test.beforeAll(async () => {

    const apiContext = await request.newContext()
    const apiUtil = new apiUtils(apiContext, loginData)
    responseObj = await apiUtil.createOrder(orderData)

})

test('Api testing', async ({ page }) => {
    console.log(responseObj)
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, responseObj.token)

    await page.goto('https://rahulshettyacademy.com/client')
    await expect(page.url()).toEqual('https://rahulshettyacademy.com/client/dashboard/dash')

    await page.locator('button[routerlink="/dashboard/myorders"]').click()
    await page.locator('tbody').waitFor()
    const tableRow = page.locator('table tbody tr')
    for (let i = 0; i < await tableRow.count(); i++) {
        const tableOrderID = await tableRow.nth(i).locator('th').textContent()
        console.log(tableOrderID)
        if (responseObj.orderID.includes(tableOrderID)) {
            await tableRow.nth(i).locator('.btn-primary').click()
        }
    }
    await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')
})

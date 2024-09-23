const { test, expect, request } = require('@playwright/test')
const loginData = { userEmail: "mayurimkatwe@gmail.com", userPassword: "Test@1998" }
const orderData = { orders: [{ country: "Cuba", productOrderedId: "6581ca399fd99c85e8ee7f45" }] }
let tokenI
let orderID
test.beforeAll(async function () {
    const apiContext = await request.newContext()
    const apiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginData })
    expect(apiResponse.ok()).toBeTruthy()
    const apiJSONRes = await apiResponse.json()
    tokenI = apiJSONRes.token

    const apiCreateOrderRes = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderData,
            headers: {
                "Authorization": tokenI,
                "Content-Type": "application/json"
            }
        }
    )
    const createOrderresJson = await apiCreateOrderRes.json()
    orderID = createOrderresJson.orders[0]
    console.log(orderID)

})

test('Api testing', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, tokenI)

    await page.goto('https://rahulshettyacademy.com/client')
    await expect(page.url()).toEqual('https://rahulshettyacademy.com/client/dashboard/dash')

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

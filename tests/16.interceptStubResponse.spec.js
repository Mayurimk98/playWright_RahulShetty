const { test, request, expect } = require('@playwright/test')

let fakeDataBody = { data: [], message: "No Orders" }
const loginData = { userEmail: "mayurimkatwe@gmail.com", userPassword: "Test@1998" }
let tokenI
test.beforeAll(async function () {
    const apiContext = await request.newContext()
    const apiResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginData })
    expect(apiResponse.ok()).toBeTruthy()
    const apiJSONRes = await apiResponse.json()
    tokenI = apiJSONRes.token

})

test('Intercept in Playwright ', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, tokenI)

    await page.goto('https://rahulshettyacademy.com/client')
    await expect(page.url()).toEqual('https://rahulshettyacademy.com/client/dashboard/dash')
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66ec4942ae2afd4c0b7b5a47",
        async route => {
            const responseA = await page.request.fetch(route.request())
            let body = JSON.stringify(fakeDataBody)
            route.fulfill(
                {
                    responseA,
                    body
                }
            )

        }
    )

    await page.locator('button[routerlink="/dashboard/myorders"]').click()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/user/get-cart-count/66ec4942ae2afd4c0b7b5a47')
    const noOrderText = await page.locator('.mt-4').textContent()
    console.log(noOrderText)

})
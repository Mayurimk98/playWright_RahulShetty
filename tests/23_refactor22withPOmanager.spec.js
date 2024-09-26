const { test, expect } = require('@playwright/test')
const { POManager } = require('../POM/POManager')

test('E2E test case for playwright with rahul shetty website', async function ({ page }) {

    const pageObjManager = new POManager(page)
    const loginInfoPage = pageObjManager.getLoginPage()
    const dashBoardInfoPage = pageObjManager.getDashBoardInfoPage()
    const myCardInfoPage = pageObjManager.getMyCardInfoPage()
    const orderConfirmPage = pageObjManager.getOrderConfirmPage()
    const orderDetailsPage = pageObjManager.getOrderDetailsPage()

    const email='mayurimkatwe@gmail.com';
    const passWord='Test@1998'
    const productName = "ADIDAS ORIGINAL"


    await loginInfoPage.visitWebsite()

    await loginInfoPage.loginToWebSite(email, passWord)

    await dashBoardInfoPage.searchForItemAndAddToCart(productName)

    await dashBoardInfoPage.cardButtonClick()

    const bool = await myCardInfoPage.checkItemPresentandCheckout()
    await expect(bool).toBeTruthy()

    await orderConfirmPage.dropDownSelect()

    await orderConfirmPage.personalDetails()
    expect(await page.locator('[class="user__name mt-5"] label')).toHaveText(email)

    await orderConfirmPage.clickPlaceOrderCheckThankUPG()
    await expect(page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order. ')

    const orderID = await orderConfirmPage.getOrderId()
    console.log(orderID)

    await orderDetailsPage.orderDetail(orderID)
    await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')
})
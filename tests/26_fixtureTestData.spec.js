const { test, expect } = require('@playwright/test')
const { POManager } = require('../POM/POManager')
const {test1} = require('../utils/fixtureTestData')


test1('E2E test case for playwright with rahul shetty website', async function ({ page ,testDataForOrder}) {

    const pageObjManager = new POManager(page)
    const loginInfoPage = pageObjManager.getLoginPage()
    const dashBoardInfoPage = pageObjManager.getDashBoardInfoPage()
    const myCardInfoPage = pageObjManager.getMyCardInfoPage()
    const orderConfirmPage = pageObjManager.getOrderConfirmPage()
    const orderDetailsPage = pageObjManager.getOrderDetailsPage()


    await loginInfoPage.visitWebsite()

    await loginInfoPage.loginToWebSite(testDataForOrder.email, testDataForOrder.passWord)

    await dashBoardInfoPage.searchForItemAndAddToCart(testDataForOrder.productName)

    await dashBoardInfoPage.cardButtonClick()

    const bool = await myCardInfoPage.checkItemPresentandCheckout(testDataForOrder.productName)
    await expect(bool).toBeTruthy()

    await orderConfirmPage.dropDownSelect()

    await orderConfirmPage.personalDetails()
    expect(await page.locator('[class="user__name mt-5"] label')).toHaveText(testDataForOrder.email)

    await orderConfirmPage.clickPlaceOrderCheckThankUPG()
    await expect(page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order. ')

    const orderID = await orderConfirmPage.getOrderId()
    console.log(orderID)

    await orderDetailsPage.orderDetail(orderID)
    await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')
})
const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../POM/loginPage')
const { DashBoradPage } = require('../POM/dashBordPage')
const { MyCartPage } = require('../POM/myCartPage')
const { OrderConfirmPage } = require('../POM/orderConfirmation')
const {OrderDetails}=require('../POM/orderDetails')

test('E2E test case for playwright with rahul shetty website', async function ({ page }) {
    const loginInfoPage = new LoginPage(page)
    const dashBoardInfoPage = new DashBoradPage(page)
    const myCardInfoPage = new MyCartPage(page)
    const orderConfirmPage = new OrderConfirmPage(page)
    const orderDetailsPage=new OrderDetails(page)

    await loginInfoPage.visitWebsite()

    await loginInfoPage.loginToWebSite('mayurimkatwe@gmail.com', 'Test@1998')

    await dashBoardInfoPage.searchForItemAndAddToCart()

    await dashBoardInfoPage.cardButtonClick()

    const bool = await myCardInfoPage.checkItemPresentandCheckout()
    await expect(bool).toBeTruthy()

    await orderConfirmPage.dropDownSelect()

    await orderConfirmPage.personalDetails()
    expect(await page.locator('[class="user__name mt-5"] label')).toHaveText('mayurimkatwe@gmail.com')

    await orderConfirmPage.clickPlaceOrderCheckThankUPG()
    await expect(page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order. ')

    const orderID = await orderConfirmPage.getOrderId()
    console.log(orderID)

    await orderDetailsPage.orderDetail(orderID)
    await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')
})
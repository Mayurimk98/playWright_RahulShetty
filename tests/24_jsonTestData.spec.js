const { test, expect } = require('@playwright/test')
const { POManager } = require('../POM/POManager')
//json=> string =>JS Object
const jsonDataSet = JSON.parse(JSON.stringify(require('../utils/testData_1.json')))

test('E2E test case for playwright with rahul shetty website', async function ({ page }) {

    const pageObjManager = new POManager(page)
    const loginInfoPage = pageObjManager.getLoginPage()
    const dashBoardInfoPage = pageObjManager.getDashBoardInfoPage()
    const myCardInfoPage = pageObjManager.getMyCardInfoPage()
    const orderConfirmPage = pageObjManager.getOrderConfirmPage()
    const orderDetailsPage = pageObjManager.getOrderDetailsPage()

    await loginInfoPage.visitWebsite()

    await loginInfoPage.loginToWebSite(jsonDataSet.email, jsonDataSet.passWord)

    await dashBoardInfoPage.searchForItemAndAddToCart(jsonDataSet.productName)

    await dashBoardInfoPage.cardButtonClick()

    const bool = await myCardInfoPage.checkItemPresentandCheckout()
    await expect(bool).toBeTruthy()

    await orderConfirmPage.dropDownSelect()

    await orderConfirmPage.personalDetails()
    await orderConfirmPage.verifyText('[class="user__name mt-5"] label',jsonDataSet.email)
    //expect(await page.locator('[class="user__name mt-5"] label')).toHaveText(email)

    await orderConfirmPage.clickPlaceOrderCheckThankUPG()
    await orderConfirmPage.verifyText('[class="hero-primary"]',' Thankyou for the order. ')
    //await expect(page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order. ')

    const orderID = await orderConfirmPage.getOrderId()
    console.log(orderID)

    await orderDetailsPage.orderDetail(orderID)
    await orderConfirmPage.verifyText('.email-preheader .tagline','Thank you for Shopping With Us')
   // await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')
})
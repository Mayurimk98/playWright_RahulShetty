const { test, expect } = require('@playwright/test')
const { POManager } = require('../POM/POManager')
const multiJsonData = JSON.parse(JSON.stringify(require('../utils/testDataParameterize.json')))

for(const data of multiJsonData){
    test(`E2E test case for buy product ${data.productName}`, async function ({ page }) {

        const pageObjManager = new POManager(page)
        const loginInfoPage = pageObjManager.getLoginPage()
        const dashBoardInfoPage = pageObjManager.getDashBoardInfoPage()
        const myCardInfoPage = pageObjManager.getMyCardInfoPage()
        const orderConfirmPage = pageObjManager.getOrderConfirmPage()
        const orderDetailsPage = pageObjManager.getOrderDetailsPage()

        await loginInfoPage.visitWebsite()
    
        await loginInfoPage.loginToWebSite(data.email, data.passWord)
    
        await dashBoardInfoPage.searchForItemAndAddToCart(data.productName)
    
        await dashBoardInfoPage.cardButtonClick()
    
        const bool = await myCardInfoPage.checkItemPresentandCheckout(data.productName)
        await expect(bool).toBeTruthy()
    
        await orderConfirmPage.dropDownSelect()
    
        await orderConfirmPage.personalDetails()
        expect(await page.locator('[class="user__name mt-5"] label')).toHaveText(data.email)
    
        await orderConfirmPage.clickPlaceOrderCheckThankUPG()
        await expect(page.locator('[class="hero-primary"]')).toHaveText(' Thankyou for the order. ')
    
        const orderID = await orderConfirmPage.getOrderId()
        console.log(orderID)
    
        await orderDetailsPage.orderDetail(orderID)
        await expect(page.locator('.email-preheader .tagline')).toHaveText('Thank you for Shopping With Us')
    })
}

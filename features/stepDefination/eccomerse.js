const { Given, When, Then } = require('@cucumber/cucumber')
const { chromium } = require('playwright')
const { POManager } = require('../../POM/POManager')
const { test, expect } = require('@playwright/test')
const email = 'mayurimkatwe@gmail.com';
const passWord = 'Test@1998'
const productName = "ADIDAS ORIGINAL"

Given('login to website', { timeout: 10000 }, async function () {
    this.pageObjManager = new POManager(this.page)
    const loginInfoPage = await this.pageObjManager.getLoginPage()
    await loginInfoPage.visitWebsite()
    await loginInfoPage.loginToWebSite(email, passWord)
})

When('Navigate card page and add item to card', async function () {
    const dashBoardInfoPage = await this.pageObjManager.getDashBoardInfoPage()
    await dashBoardInfoPage.searchForItemAndAddToCart(productName)
    await dashBoardInfoPage.cardButtonClick()
})

Then('Item should prsent in checkout page', async function () {
    const myCardInfoPage = this.pageObjManager.getMyCardInfoPage()
    const bool = await myCardInfoPage.checkItemPresentandCheckout(productName)
    await expect(bool).toBeTruthy()
})
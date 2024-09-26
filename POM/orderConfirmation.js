const { expect } = require('@playwright/test')
class OrderConfirmPage {
    constructor(page) {
        this.page = page
        this.countrySelectIB = page.locator('input[placeholder="Select Country"]')
        this.ddOption = page.locator('[class="ta-results list-group ng-star-inserted"]')
        this.ddBtn = page.locator('[class="ta-results list-group ng-star-inserted"] button')
        this.inputTxt = page.locator('input[class="input txt"]')
        this.placeOrderBtn = page.locator('[class="btnn action__submit ng-star-inserted"]')
        this.orderID = page.locator('.em-spacer-1 .ng-star-inserted')

    }

    async dropDownSelect() {
        await this.countrySelectIB.pressSequentially('ind')
        await this.ddOption.waitFor()
        const countDD = await this.ddBtn.count()
        console.log(countDD)

        for (let i = 0; i < countDD; i++) {
            if (await this.ddBtn.nth(i).textContent() === ' India') {
                await this.ddBtn.nth(i).click()
                break;
            }
        }

    }

    async personalDetails() {
        await this.inputTxt.first().fill('123')
        await this.inputTxt.last().fill('Mayuri')
    }

    async clickPlaceOrderCheckThankUPG() {
        await this.placeOrderBtn.click()
        await this.page.waitForLoadState('networkidle')
    }

    async getOrderId() {
        const orderID = await this.orderID.textContent()
        console.log(orderID)
        return orderID
    }

    async verifyText(locator,text){
        await expect(this.page.locator(locator)).toHaveText(text)
    }
}

module.exports = { OrderConfirmPage }
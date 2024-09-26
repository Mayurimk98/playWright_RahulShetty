class MyCartPage {
    constructor(page) {
        this.page = page
        this.checkOutBtn = page.locator('[class="btn btn-primary"]')

    }

    async checkItemPresentandCheckout(productName) {
        const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible()
        await this.checkOutBtn.last().click()
        return bool
    }
}

module.exports = { MyCartPage }
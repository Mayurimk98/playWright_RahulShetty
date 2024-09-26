class DashBoradPage {

    constructor(page) {
        this.page = page
        this.itemInfo = page.locator('div[class="card-body"]')
        this.cardBtn = page.locator('[routerlink="/dashboard/cart"]')
    }


    async searchForItemAndAddToCart(productName) {
        const allTitle = await this.page.locator('div[class="card-body"] b').allTextContents()
        console.log(allTitle)
        const countNo = await this.itemInfo.count()
        for (let i = 0; i < countNo; ++i) {
            if (await this.itemInfo.nth(i).locator('b').textContent() === productName) {
                await this.itemInfo.nth(i).locator('text=  Add To Cart').click()
                break
            }
        }
    }

    async cardButtonClick() {
        await this.cardBtn.click()
        await this.page.locator('div li').first().waitFor()

    }
}

module.exports = { DashBoradPage }
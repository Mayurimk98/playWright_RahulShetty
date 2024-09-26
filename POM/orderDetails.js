class OrderDetails {
    constructor(page) {
        this.page = page
        this.orderBtn = page.locator('button[routerlink="/dashboard/myorders"]')
        this.tableBody = page.locator('tbody')
        this.tableRow = page.locator('table tbody tr')
    }

    async orderDetail(orderID) {
        await this.orderBtn.click()
        await this.tableBody.waitFor()
        for (let i = 0; i < await this.tableRow.count(); i++) {
            const tableOrderID = await this.tableRow.nth(i).locator('th').textContent()
            console.log(tableOrderID)
            if (orderID.includes(tableOrderID)) {
                await this.tableRow.nth(i).locator('.btn-primary').click()
            }
        }
    }

}
module.exports = { OrderDetails }
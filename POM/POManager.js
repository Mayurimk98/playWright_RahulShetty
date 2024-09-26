const { LoginPage } = require('./loginPage')
const { DashBoradPage } = require('./dashBordPage')
const { MyCartPage } = require('./myCartPage')
const { OrderConfirmPage } = require('./orderConfirmation')
const { OrderDetails } = require('./orderDetails')
class POManager {

    constructor(page) {
        this.page = page
        this.loginInfoPage = new LoginPage(this.page)
        this.dashBoardInfoPage = new DashBoradPage(this.page)
        this.myCardInfoPage = new MyCartPage(this.page)
        this.orderConfirmPage = new OrderConfirmPage(this.page)
        this.orderDetailsPage = new OrderDetails(this.page)
    }
    getLoginPage() {
        return this.loginInfoPage
    }

    getDashBoardInfoPage() {
        return this.dashBoardInfoPage
    }

    getMyCardInfoPage() {
        return this.myCardInfoPage
    }

    getOrderConfirmPage() {
        return this.orderConfirmPage
    }

    getOrderDetailsPage() {
        return this.orderDetailsPage
    }
}

module.exports = { POManager }
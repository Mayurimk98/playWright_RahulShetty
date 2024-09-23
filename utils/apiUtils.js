class apiUtils {

    constructor(apiContext, loginData) {
        this.apiContext = apiContext
        this.loginData = loginData

    }

    async getToken() {

        const apiResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginData
            }
        )
        const apiJSONRes = await apiResponse.json()
        return apiJSONRes.token
        
    }

    async createOrder(orderData) {
        let response = {}
        response.token = await this.getToken()
        const apiCreateOrderRes = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderData,
                headers: {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                }
            }
        )
        const createOrderresJson = await apiCreateOrderRes.json()
        const orderID = createOrderresJson.orders[0]
        response.orderID = orderID
        //console.log(response)
        return response;
    }
}

module.exports = { apiUtils }
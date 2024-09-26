const { test: base } = require('@playwright/test')

const test1 = base.extend({
    testDataForOrder: {
        email: "mayurimkatwe@gmail.com",
        passWord: "Test@1998",
        productName: "ADIDAS ORIGINAL"
    }
})

module.exports = { test1 }
class LoginPage {

    constructor(page) {
        this.page = page
        this.userName = page.locator('#userEmail')
        this.passWord = page.locator('#userPassword')
        this.loginBtn = page.locator('#login')
    }

    async visitWebsite() {
        await this.page.goto('https://rahulshettyacademy.com/client')
    }

    async loginToWebSite(emailId, passWord) {
        await this.userName.fill(emailId)
        await this.passWord.fill(passWord)
        await this.loginBtn.click()
        await this.page.waitForLoadState('networkidle')
    }
}
module.exports = { LoginPage }
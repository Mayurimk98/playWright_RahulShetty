const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright')
const { test, expect } = require('@playwright/test')
const { POManager } = require('../../POM/POManager')

Before(async function () {
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    this.page = await context.newPage()
})

After(async function () {
    console.log('I will execute after each scenario')
})

BeforeStep(async () => {
    console.log('I will execute befor each step')
})

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        console.log('test')
        await this.page.screenshot({ path: 'test.png' })

    }
})
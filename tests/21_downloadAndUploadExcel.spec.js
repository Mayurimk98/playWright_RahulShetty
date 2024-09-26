const excel = require('exceljs')
const { test, expect } = require('@playwright/test')

async function readWriteExcelFile(searchVal, replaceVal, newValObj, filePath) {

    const workBook1 = new excel.Workbook()
    await workBook1.xlsx.readFile(filePath)
    const workSheet1 = workBook1.getWorksheet('Sheet1')
    let obj = await getRowCol(workSheet1, searchVal)
    let cellValue = workSheet1.getCell(obj.row1, obj.col1 + newValObj.col)
    cellValue.value = replaceVal
    await workBook1.xlsx.writeFile(filePath)
}

async function getRowCol(workSheet1, searchVal) {
    let obj = { row1: -1, col1: -1 }
    workSheet1.eachRow((row, rowNo) => {
        row.eachCell((cell, cellNo) => {
            //console.log(cell.value)
            if (cell.value == searchVal) {
                obj.row1 = rowNo
                obj.col1 = cellNo

            }
        })
    })
    return obj
}

//Change price as 999 where fruit is mango


test('Download and upload the excel file in playwright', async ({ page }) => {
    let searchVal = "Mango"
    let replaceVal = "23415"
    await page.goto('https://rahulshettyacademy.com/upload-download-test')
    let promiseResolve = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download' }).click()
    await promiseResolve
    await page.waitForTimeout(5000)
    //await page.pause()
    await readWriteExcelFile(searchVal, replaceVal, { row: -1, col: 2 }, 'C:/Users/Mayuri/Downloads/download.xlsx')
    await page.locator('#fileinput').click()
    await page.locator('#fileinput').setInputFiles('C:/Users/Mayuri/Downloads/download.xlsx')
    const cellLocator = await page.getByRole('row').filter({ hasText: searchVal })
    const text1 = await cellLocator.locator('#cell-4-undefined').textContent()
    console.log(text1)
})
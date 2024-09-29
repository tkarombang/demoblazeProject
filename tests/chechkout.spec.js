const { test, expect } = require('@playwright/test')

test.beforeEach(async ({page})=> {
    await page.goto('https://demoblaze.com')
})

test('PENGGUNA BERHASIL MELAKUKAN PEMBELIAN SATU ITEM', async ({page}) => {
    await page.getByRole('link', { name: "Samsung galaxy s6"}).click()
    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: "Add to cart"}).click()
    await page.locator('//*[@id="navbarExample"]/ul/li[4]/a').click()
    await page.waitForTimeout(1000)
    await page.getByRole('button', {name: "Place Order"}).click()
    await page.locator('#orderModalLabel').waitFor()


    //FILL PLACE ORDER
    await page.locator('#name').fill('aswar')
    await page.locator('#country').fill('Indonesia')
    await page.locator('#city').fill('Makassar')
    await page.locator('#card').fill('009988123')
    await page.locator('#month').fill('September')
    await page.locator('#year').fill('2024')
    await page.getByRole('button', { name: "Purchase"}).click()

    //KONFIRMASI PESANAN
    await page.waitForTimeout(5000)
    // CETAK TEXT DI CONSOLES
    const text = await page.textContent('body > div.sweet-alert.showSweetAlert.visible > h2')
    const txtDetail = await page.textContent('body > div.sweet-alert.showSweetAlert.visible > p')
    console.log(text)
    console.log(txtDetail)
    
    // ASSERTION
    const locatortext = page.locator('body > div.sweet-alert.showSweetAlert.visible > h2')
    const locatorTxtDetail = page.locator('body > div.sweet-alert.showSweetAlert.visible > p')
    await expect(locatortext).toHaveText('Thank you for your purchase!')
    await expect(locatorTxtDetail).toHaveText(txtDetail)
    
    
    
    // await expect(page.getByText('Thank you for your purchase!')).toBeVisible()

})
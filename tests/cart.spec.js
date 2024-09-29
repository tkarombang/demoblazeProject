const { test, expect } = require('@playwright/test')
let popUpAlert = ''
test.beforeEach(async ({page}) => {
    await page.goto('https://demoblaze.com')
    page.on('dialog', async (dialog) => {
        console.log('MENCOBA MENANGANI POPUP MESSAGE....!')
        popUpAlert = dialog.message()
        dialog.accept()
    })
    await page.getByRole('link', { name: "Nokia lumia 1520" }).click()
    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: "Add to cart" }).click()
    await page.waitForTimeout(1000)
})

test('PENGGUNA DAPAT MENAMBAHKAN PRODUK KEDALAM KERANJANG', async({page}) => {
    expect(popUpAlert).toBe('Product added');
    console.log(popUpAlert)
    await page.waitForTimeout(1000)
    await page.locator('//*[@id="navbarExample"]/ul/li[4]/a').click()
    await page.waitForTimeout(1000)
    const totalPrice = await page.textContent('//*[@id="totalp"]')
    await page.waitForTimeout(3000)
    console.log('PRICE: ' + totalPrice)
})

test('PENGGUNA DAPAT MENGHAPUS PRODUK DI CART', async ({page}) => {
    await page.locator('//*[@id="navbarExample"]/ul/li[4]/a').click()
    await page.waitForTimeout(1000)
    await page.getByRole('link', { name: 'Delete' }).click()
})
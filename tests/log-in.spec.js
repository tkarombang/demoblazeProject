const { test, expect } = require('@playwright/test')
let popUpAlert = ''

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com')
    await page.locator('#login2').click()
    await page.getByLabel('Log in').waitFor()
    page.on('dialog', async (dialog) => {
        console.log('MENCOBA MENANGANI PESAN ERROR....!')
        popUpAlert = dialog.message()
        dialog.accept()
    })
})

test('USER BERHASIL LOGIN', async ({ page }) => {
    await page.locator('#loginusername').fill('aswar')
    await page.locator('#loginpassword').fill('12345')
    await page.getByRole('button', { name: 'Log in' }).click()
    // await page.getByLabel('Log in').click()
})

test('TAMPIL POPUP USER DOES NOT EXIST', async ({ page }) => {
    await page.locator('#loginusername').fill('IR SOEKARNO')
    await page.locator('#loginpassword').fill('IR SOEKARNO')
    await page.getByRole('button', { name: 'Log in' }).click()
    await page.waitForTimeout(2000)
    expect(popUpAlert).toBe('User does not exist.')
    console.log(popUpAlert)
})

test('TAMPIL POPUP WRONG PASSWORD', async ({page})=> {
    await page.locator('#loginusername').fill('aswar')
    await page.locator('#loginpassword').fill('12')
    await page.getByRole('button', { name: 'Log in' }).click()
    await page.waitForTimeout(2000)
    expect(popUpAlert).toBe('Wrong password.')
    console.log(popUpAlert)
})
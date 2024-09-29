const { test, expect } = require('@playwright/test')
let alertMessage = ''

test.beforeEach(async ({page})=> {
    await page.goto('https://demoblaze.com')
})

//PAB-8
test('PENGGUNA DAPAT MENDDAFTARKAN AKUN BARU', async ({page}) => {
    await page.locator('#signin2').click()
    await page.locator('#signInModal > div > div > div.modal-body').waitFor()
    await page.getByLabel('Username:').fill('thtAkhdian')
    await page.getByLabel('Password:').fill('thtAkhdian')
    // JANGAN LUPA MENGHAPUS NTH 1 DAN GANTI { NAME: ....}
    await page.getByRole('button', { name: 'Close' }).nth(1).click()
})

test('PENGGUNA TIDAK DAPAT MENDAFTARKAN AKUN YANG SUDAH TERDAFTAR', async ({page}) => {
    page.on('dialog', async (dialog) => {
        console.log('MENCOBA MENANGANI ALERT---')
        alertMessage = dialog.message()
        await dialog.accept() 
    })
    
    await page.locator('#signin2').click()
    await page.locator('#signInModal > div > div > div.modal-body').waitFor()
    await page.getByLabel('Username:').fill('aswar')
    await page.getByLabel('Password:').fill('12345')
    await page.getByRole('button', { name: 'Sign up' }).click()
    await page.waitForTimeout(2000)
   expect(alertMessage).toBe('This user already exist.')
    console.log(alertMessage)
})
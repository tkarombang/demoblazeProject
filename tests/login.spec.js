const {test} = require('@playwright/test')
let alertMessage = ''
test.beforeEach(async ({page}) => {
    await page.goto('https://demoblaze.com/')
})

test('As a user, I want to be able to login on the application demoblaze', async ({page}) => {
    console.log('Login gagal, mencoba menangani alert...')
    page.on('dialog', async (dialog) => {
        // console.log('PESAN DIALOG: ' + dialog.message())
        alertMessage = dialog.message()
        await dialog.accept();
    })
        await page.locator('//*[@id="login2"]').click()
        await page.locator('#loginusername').fill('aswar')
        await page.locator('#loginpassword').fill('12345')
        await page.locator('//*[@id="logInModal"]/div/div/div[3]/button[2]').click()
        await page.waitForTimeout(2000)
        if(alertMessage === 'Wrong password.'){
            for(let i = 1; i <= 3; i++){
                await page.locator('#loginpassword').clear()
                await page.waitForTimeout(2000)
                await page.locator('#loginpassword').fill('12345')
                await page.locator('//*[@id="logInModal"]/div/div/div[3]/button[2]').click()
                console.log("AKUN GAGAL SEBANYAK " + i + " KALI")
            }
        }else if(alertMessage === 'User does not exist.'){
            console.log('PESAN POPUP: ' + alertMessage)
        }else{
            console.log('BERHASIL LOGIN')
        }
})
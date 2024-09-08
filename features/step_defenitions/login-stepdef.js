const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber")
const { chromium } = require("@playwright/test")

setDefaultTimeout(60 * 10000)
let alertMessage = ''
let browser, page
Before(async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    page.on('dialog', async (dialog) => {
        console.log('MENCOBA MENANGANI ALERT...  ')
        alertMessage = dialog.message()
        await dialog.accept();
    })
})
After(async function() {
    await browser.close()
})


Given(/^open web url "([^"]*)"$/, async (url) => {
    await page.goto(url)
    await page.locator('//*[@id="login2"]').click()
});

When(/^User input username "([^"]*)"$/, async (user) => {
    await page.locator('#loginusername').fill(user)
});

When(/^User input password "([^"]*)"$/, async (password) => {
    await page.locator('#loginpassword').fill(password)
});

When(/^Click button login$/, async () => {
    await page.locator('//*[@id="logInModal"]/div/div/div[3]/button[2]').click()
});

Then(/^verify the login user$/, async () => {
    await page.waitForTimeout(2000)
    if(alertMessage === 'Wrong password.'){
        for(let i = 1; i <= 3; i++){
            await page.locator('#loginpassword').clear()
            await page.waitForTimeout(2000)
            await page.locator('#loginpassword').fill('123456A')
            await page.locator('//*[@id="logInModal"]/div/div/div[3]/button[2]').click()
            console.log("AKUN GAGAL SEBANYAK " + i + " KALI")
        }
    }else if(alertMessage === 'User does not exist.'){
        console.log('PESAN POPUP: ' + alertMessage)
    }else{
        console.log('BERHASIL LOGIN')
        await page.waitForTimeout(2000)
        await page.waitForSelector('#nameofuser')
        const textUser = await page.locator('#nameofuser').textContent();
        console.log(textUser);
    }
});


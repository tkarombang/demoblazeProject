const { test } = require("@playwright/test")

test.beforeEach(async ({page}) => {
    await page.goto('https://demoblaze.com/')
})

//PAB-4
test('As a user, I want to be able to view Homepage', async ({page}) => {
    await page.locator('//*[@id="navbarExample"]/ul/li[1]/a').click()
    await page.evaluate(() => {
        window.scrollBy(0, 400)
    })
    await page.pause(2000)
})

//PAB-5
test('As user, I want to be able to view product baseon category', async ({page}) => {
    const textItem = await page.locator('//*[@id="itemc"]').allTextContents();
    for(const i of textItem){
        if(i === 'Laptops'){
            console.log(i)
            await page.getByRole('link', { name: i}).click()
        }
    }
   
})

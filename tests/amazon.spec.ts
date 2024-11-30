import { test, expect } from '@playwright/test';

test('product has correct title' , async ({ page }) => {
    await page.goto('https://www.amazon.com/Enjoi-Rasta-Panda-Skateboard-Deck/dp/B07R3GNBZ6/ref=sr_1_4?crid=RJ5HFV9E2QKA&dib=eyJ2IjoiMSJ9.DhWGtwchpml_AsphYaW-nYaQf4BDC7Xnn1offZVR7ceRdujZLcawYUDpgaT5mWG_2YTw__EXNQ-3F0q71tD0aFGdb7HBS3j10YhkOF--Xo9OvVVy21ly8N-Shw8niJe_-xQeKketkoLt_yfTkn0zxUNROy5FRGWj6Bi7zBVSDgAQVb33RZmcifkt-MV4EW2KaInsYq87365EPq52v7OLwVNEG1uFkqvgKDOP_1b1LpdLZJeQYWfohp6zeYAGdUI9fPRhJvEB0-5wuz25GuyvDCg0BmudT7ZwRZfA_xe4En0.zjdRWFeO6bk7rhZIQn3D32Xtds-VcVXmxEHkMdjotBE&dib_tag=se&keywords=enjoi%2Bskateboard&qid=1733001881&sprefix=enjoi%2Bskateboard%2Caps%2C148&sr=8-4&th=1&psc=1');
    const skateboardTitle = await page.getByTestId('titleSection')
    await expect(skateboardTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')
   
})

test('searching a product by text', async ({page}) => {
    await page.goto('https://www.amazon.com/')
    await page.getByTestId('twotabsearchtextbox').fill('enjoi skateboard deck')
    await page.getByTestId('nav-search-submit-button').click()
 
    
})

test('finding the ASIN of the product and searching using it', async ({page}) => {
    //nav to amazon homepage
    await page.goto('https://www.amazon.com/')
    //find searchbox and fill it
    const searchBox = page.getByTestId('twotabsearchtextbox')
    await searchBox.fill('enjoi skateboard deck')
    //assert searchbox is filled
    expect(await searchBox.inputValue()).toBe('enjoi skateboard deck');
   //click search button
    await page.getByTestId('nav-search-submit-button').click()
    //assert expected search result and click on it
    await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()
    //assert title
    const skateboardTitle = page.getByTestId('titleSection')
    await expect(skateboardTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')
    //find the ASIN
    const asin = await page.locator('#averageCustomerReviews').getAttribute('data-asin')
    expect(asin).toBeTruthy()
    //Search Using the ASIN
    await page.goto('https://www.amazon.com/')
   
    await searchBox.fill(asin!)
    await page.getByTestId('nav-search-submit-button').click()
    await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()
    await expect(skateboardTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')
    



});
  
  

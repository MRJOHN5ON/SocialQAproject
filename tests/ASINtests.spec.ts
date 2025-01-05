import { test, expect } from '@playwright/test';
import { searchForProductClick, searchForProductEnter } from './helper.ts';

test.describe('Product Searches', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com/')
    });

// test only works if the product has customer reviews
test('search for product by ASIN retrieved from customer reviews', async ({ page }) => {

    //search for product
    await searchForProductEnter(page, 'Powell Peralta Geegah Ripper Skate Deck')

    //assert expected search result and click on it
    await page.getByRole('link', { name: 'Geegah Ripper Skate Deck' }).first().click()

    //assert title
    const productTitle = page.getByTestId('titleSection')
    await expect(productTitle).toHaveText('        Powell Peralta Geegah Ripper Skate Deck       ')

    //find the ASIN
    const ASINCustomerReviews = await page.locator('#averageCustomerReviews').getAttribute('data-asin')
    expect(ASINCustomerReviews).toBeTruthy()

    //Search Using the ASIN
    await page.goto('https://www.amazon.com/')
    await searchForProductEnter(page, ASINCustomerReviews!)

    //assert expected product in the search result
    await page.getByRole('link', { name: 'Geegah Ripper Skate Deck' }).first().click()
    await expect(productTitle).toHaveText('        Powell Peralta Geegah Ripper Skate Deck       ')

});

//Universally applicable test for all products
test('can find product using ASIN', async ({ page }) => {

    // search for product and click on it then assert the title
    await searchForProductEnter(page, 'Geegah Ripper Skate Deck')
    await page.getByRole('link', { name: 'Geegah Ripper Skate Deck' }).first().click()
    const productTitle = page.getByTestId('titleSection')
    await expect(productTitle).toHaveText('        Powell Peralta Geegah Ripper Skate Deck       ')

    // find the ASIN and search using it
    const asin = page.getByTestId("productDetails_detailBullets_sections1").getByText("ASIN").locator("xpath=following-sibling::*");
    const asinText = await asin.textContent() as string;
    await searchForProductClick(page, asinText);

    // assert expected product in the search result
    const productSearchResult = page.getByText('        Powell Peralta Geegah Ripper Skate Deck       ', { exact: true });
    await expect(productSearchResult).toBeVisible();
});
});
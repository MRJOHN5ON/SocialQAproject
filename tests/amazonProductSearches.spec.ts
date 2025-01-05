import { test, expect } from '@playwright/test';
import { searchForProductClick, searchForProductEnter } from './helper.ts';


test.describe('Product Searches', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com/')
    });

    test('search a product by text and submit using enter button', async ({ page }) => {

        // search for product
        await searchForProductEnter(page, 'Powell Peralta Geegah Ripper Skate Deck')

        // click on product found in search results
        await page.getByRole('link', { name: 'Geegah Ripper Skate Deck' }).first().click()

        // verify product title
        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Powell Peralta Geegah Ripper Skate Deck       ')
    });

    test('search for product by text and submit using search button', async ({ page }) => {

        // search for product
        await searchForProductClick(page, 'Powell Peralta Geegah Ripper Skate Deck')

        // click on product found in search results
        await page.getByRole('link', { name: 'Geegah Ripper Skate Deck' }).first().click()

        // verify product title
        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Powell Peralta Geegah Ripper Skate Deck       ')
    });
});

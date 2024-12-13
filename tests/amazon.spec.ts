import { test, expect } from '@playwright/test';
import { searchForProductClick, searchForProductEnter } from './helper.ts';


test.describe('Product Searches', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com/')
    });

    test('searching a product by text and submit using enter button', async ({ page }) => {

        // search for product
        await searchForProductEnter(page, 'enjoi skateboard deck')

        // click on product found in search results
        await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()

        // verify product title
        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')
    });

    test('searching for product by text and submit by clicking search button', async ({ page }) => {

        // search for product
        await searchForProductClick(page, 'enjoi skateboard deck')

        // click on product found in search results
        await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()

        // verify product title
        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')

    });
    // test only works if the product has customer reviews
    test('finding the ASIN of the product with customer reviews and searching using it', async ({ page }) => {

        //search for product
        await searchForProductEnter(page, 'enjoi skateboard deck')

        //assert expected search result and click on it
        await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()

        //assert title
        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')

        //find the ASIN
        const ASINCustomerReviews = await page.locator('#averageCustomerReviews').getAttribute('data-asin')
        expect(ASINCustomerReviews).toBeTruthy()

        //Search Using the ASIN
        await page.goto('https://www.amazon.com/')
        await searchForProductEnter(page, ASINCustomerReviews!)

        //assert expected product in the search result
        await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()
        await expect(productTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')

    });
    //Universally applicable test for all products
    test('can find product using ASIN', async ({ page }) => {

        // search for product and click on it then assert the title
        await searchForProductEnter(page, 'enjoi skateboard deck')
        await page.getByRole('link', { name: 'Rasta Panda R7 Skateboard Deck' }).first().click()
        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')

        // find the ASIN and search using it
        const asin = page.getByTestId("productDetails_detailBullets_sections1").getByText("ASIN").locator("xpath=following-sibling::*");
        const asinText = await asin.textContent() as string;
        await searchForProductClick(page, asinText);

        // assert expected product in the search result
        const productSearchResult = page.getByText('        Enjoi Rasta Panda R7 Skateboard Deck       ', { exact: true });
        await expect(productSearchResult).toBeVisible();
    });


});

//test suite for adding to cart
test.describe('Adding to Cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.amazon.com/Enjoi-Rasta-Panda-Skateboard-Deck/dp/B07R3GNBZ6/ref=sr_1_4?crid=RJ5HFV9E2QKA&dib=eyJ2IjoiMSJ9.DhWGtwchpml_AsphYaW-nYaQf4BDC7Xnn1offZVR7ceRdujZLcawYUDpgaT5mWG_2YTw__EXNQ-3F0q71tD0aFGdb7HBS3j10YhkOF--Xo9OvVVy21ly8N-Shw8niJe_-xQeKketkoLt_yfTkn0zxUNROy5FRGWj6Bi7zBVSDgAQVb33RZmcifkt-MV4EW2KaInsYq87365EPq52v7OLwVNEG1uFkqvgKDOP_1b1LpdLZJeQYWfohp6zeYAGdUI9fPRhJvEB0-5wuz25GuyvDCg0BmudT7ZwRZfA_xe4En0.zjdRWFeO6bk7rhZIQn3D32Xtds-VcVXmxEHkMdjotBE&dib_tag=se&keywords=enjoi%2Bskateboard&qid=1733001881&sprefix=enjoi%2Bskateboard%2Caps%2C148&sr=8-4&th=1&psc=1')
    });

    //asserting the product title
    test('product page should have correct title', async ({ page }) => {

        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Enjoi Rasta Panda R7 Skateboard Deck       ')

    });

    //adding product to cart
    test('can add product to cart and deny warranty', async ({ page }) => {
        //clicking add to cart button
        const addToCart = page.getByTestId("add-to-cart-button")
        await addToCart.click()

        //if the warranty panel is visible, click the button to say no thanks to the warranty
        const warrantyPanel = page.getByTestId('attach-desktop-sideSheet')
        const warrantyPanelVisible = await warrantyPanel.isVisible()

        if (warrantyPanelVisible) {
            const noThanksButton = page.getByTestId('attachSiNoCoverage-announce')
            await expect(noThanksButton).toBeVisible()

            await noThanksButton.click({ force: true })

        }
        else {
            //assert the success message 
            const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS')
            await expect(successMessage).toBeVisible()
        }


        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText("1");

        //View your cart 
        const goToCartbutton = page.getByRole('link', { name: 'Go to Cart' })
        await expect(goToCartbutton).toBeVisible()
        await goToCartbutton.click()

        //Verify item subtotal
        const itemQuantity = page.getByTestId("sc-subtotal-label-activecart");
        const itemQuantityText = await itemQuantity.textContent();
        expect(itemQuantityText).toContain("Subtotal (1 item)");

        //Proceed to checkout
        const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();
        await expect(page).toHaveURL(/signin/);


    });

    test('can add product to cart and add 2 year warranty', async ({ page }) => {

        //clicking add to cart button
        const addToCart = page.getByTestId("add-to-cart-button")
        await addToCart.click()

        //if the warranty panel is visible, click the button to say yes to the warranty
        const warrantyPanel = page.getByTestId('attach-desktop-sideSheet')
        const warrantyPanelVisible = await warrantyPanel.isVisible()

        if (warrantyPanelVisible) {
            //assert the checkbox is visible and click it
            const twoYearWarrantyCheckbox = page.locator('[data-a-input-name="0"]').getByRole('checkbox', { name: 'Select warranty option' });
            await expect(twoYearWarrantyCheckbox).toBeVisible()
            await twoYearWarrantyCheckbox.click({ force: true })
            await expect(twoYearWarrantyCheckbox).toBeChecked()

            //click the add protection button to add the warranty
            const addProtectionButton = page.getByTestId('attachSiAddCoverage')
            await expect(addProtectionButton).toBeVisible()
            await addProtectionButton.click({ force: true })
        }

        //If not visible then just assert the success message 

        else {
            const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
            await expect(successMessage).toBeVisible();
        }

        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText("2");

        //View your cart 
        const goToCartbutton = page.getByTestId("sw-gtc");
        await expect(goToCartbutton).toBeVisible()
        await goToCartbutton.click()

        //Verify each item's quantity
        const firstItemQuantity = page.locator('.sc-non-editable-quantity').nth(0)
        await expect(firstItemQuantity).toHaveText('Qty: 1');
        const secondItemQuantity = page.locator('.sc-non-editable-quantity').nth(1)
        await expect(secondItemQuantity).toHaveText('Qty: 1');

        //Proceed to checkout
        const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();
        await expect(page).toHaveURL(/signin/);

    });

    test('can add product to cart and add complete protection warranty', async ({ page }) => {

        //clicking add to cart button
        const addToCart = page.getByTestId("add-to-cart-button")
        await addToCart.click()

        //if the warranty panel is visible, click the button to say yes to the warranty 
        const warrantyPanel = page.getByTestId('attach-desktop-sideSheet')
        const warrantyPanelVisible = await warrantyPanel.isVisible()

        if (warrantyPanelVisible) {
            //assert the checkbox is visible and click it
            const completeProtectionCheckbox = page.locator('[data-a-input-name="1"]').getByRole('checkbox', { name: 'Select warranty option' });
            await expect(completeProtectionCheckbox).toBeVisible()
            await completeProtectionCheckbox.click({ force: true })
            await expect(completeProtectionCheckbox).toBeChecked()

            //click the add protection button to add the warranty
            const addProtectionButton = page.getByTestId('attachSiAddCoverage')
            await expect(addProtectionButton).toBeVisible()
            await addProtectionButton.click({ force: true })

            //If not visible then just assert the success message
        }

        else {
            const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
            await expect(successMessage).toBeVisible();
        }

        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText("2");

        //View your cart 
        const goToCartbutton = page.getByRole('link', { name: 'Go to Cart' })
        await expect(goToCartbutton).toBeVisible()
        await goToCartbutton.click()

        //Verify each item's quantity
        const firstItemQuantity = page.locator('.sc-non-editable-quantity').nth(0)
        await expect(firstItemQuantity).toHaveText('Qty: 1');
        const secondItemQuantity = page.locator('.sc-non-editable-quantity').nth(1)
        await expect(secondItemQuantity).toHaveText('Qty: 1');

        //Proceed to checkout
        const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();
        await expect(page).toHaveURL(/signin/);
    });

});
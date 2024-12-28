import { test, expect } from '@playwright/test';

//test suite for adding to cart
test.describe('Adding to Cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://a.co/d/7bznbR3')
    });

    //asserting the product title
    test('product page should have correct title', async ({ page }) => {

        const productTitle = page.getByTestId('titleSection')
        await expect(productTitle).toHaveText('        Powell Peralta Geegah Ripper Skate Deck       ')

    });

    //adding product to cart
    test('adds product to cart and verifies cart count and item quantities without warranty', async ({ page }) => {
        
        //clicking add to cart button
        const addToCart = page.getByTestId("add-to-cart-button")
        await addToCart.click()

        // Wait for the "No thanks" button to be visible on the warranty panel
        const noThanksButton = page.getByTestId('attachSiNoCoverage-announce');
        
        if (await noThanksButton.isVisible()) {
            await noThanksButton.click({ force: true });
        } else {
            //assert the success message 
            const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
            await expect(successMessage).toBeVisible();
        }

        
        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText("1");

        //View your cart 
        const goToCartbutton = page.getByTestId("sw-gtc")
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

    test('adds product to cart, applies 2-year warranty, and verifies cart count and item quantities', async ({ page }) => {

        //clicking add to cart button
        const addToCart = page.getByTestId("add-to-cart-button")
        await addToCart.click()

        // Wait for the "Select warranty option" checkbox to be visible on the warranty panel
        const twoYearWarrantyCheckbox = page.locator('input[type="checkbox"][name="0"]');
        
        if (await twoYearWarrantyCheckbox.isVisible()) {
            await twoYearWarrantyCheckbox.click({ force: true });
            await expect(twoYearWarrantyCheckbox).toBeChecked();

            //click the add protection button to add the warranty
            const addProtectionButton = page.getByTestId('attachSiAddCoverage');
            await expect(addProtectionButton).toBeVisible();
            await addProtectionButton.click({ force: true });
        } else {
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

    test('adds product to cart with complete protection warranty and verifies cart count and item quantities', async ({ page }) => {

        //clicking add to cart button
        const addToCart = page.getByTestId("add-to-cart-button")
        await addToCart.click()

        
        const completeProtectionCheckbox = page.getByTestId('attach-warranty-multi-device-container').locator('input[type="checkbox"]');

        if (await completeProtectionCheckbox.isVisible()) {
            await completeProtectionCheckbox.click({ force: true });
            await expect(completeProtectionCheckbox).toBeChecked();

            //click the add protection button to add the warranty
            const addProtectionButton = page.getByTestId('attachSiAddCoverage');
            await expect(addProtectionButton).toBeVisible();
            await addProtectionButton.click({ force: true });
        } else {
            const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
            await expect(successMessage).toBeVisible();
        }

        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText("2");

        //View your cart 
        const goToCartbutton = page.getByTestId("sw-gtc")
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
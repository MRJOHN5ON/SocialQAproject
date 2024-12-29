import { test, expect } from '@playwright/test';
import { config } from './config';
import { addProductToCart } from './helper';

//test suite for adding to cart

test.describe('Adding products to cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(config.productUrl);
        await addProductToCart(page);
    });

    //adding product to cart
    test(`adds product to cart and verifies cart count and item quantities without warranty`, async ({ page }) => {
        // Add locator handler for warranty panel
        const noThanksButton = page.getByTestId('attachSiNoCoverage-announce');
        await noThanksButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });

        if (await noThanksButton.isVisible()) {
            await noThanksButton.click({ force: true });
        }

        //assert the success message 
        const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
        await expect(successMessage).toBeVisible();

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

    test(`adds product from to cart, applies 2-year warranty, and verifies cart count and item quantities`, async ({ page }) => {

        // Wait for the "Select warranty option" checkbox to be visible on the warranty panel
        const twoYearWarrantyCheckbox = page.locator('input[type="checkbox"][name="0"]');
        await twoYearWarrantyCheckbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });

        let expectedCount: string;
        let expectedItemQuantity: string;

        // checks if the warranty panel is triggered
        if (await twoYearWarrantyCheckbox.isVisible()) {
            await twoYearWarrantyCheckbox.click({ force: true });
            await expect(twoYearWarrantyCheckbox).toBeChecked();
            //assigns correct count and item quantity for later assertions
            expectedCount = "2";
            expectedItemQuantity = "Subtotal (2 items):";

            //click the add protection button to add the warranty
            const addProtectionButton = page.getByTestId('attachSiAddCoverage');
            await expect(addProtectionButton).toBeVisible();
            await addProtectionButton.click({ force: true });
        } else {
            expectedCount = "1";
            expectedItemQuantity = "Subtotal (1 item):"
        }
        //verify success message
        const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
        await expect(successMessage).toBeVisible();

        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText(expectedCount);

        //View your cart 
        const goToCartbutton = page.getByTestId("sw-gtc");
        await expect(goToCartbutton).toBeVisible()
        await goToCartbutton.click()

        //Verify the item quantity subtotal
        const itemQuantity = page.getByTestId("sc-subtotal-label-activecart");
        const itemQuantityText = (await itemQuantity.textContent())?.trim() || '';
        expect(itemQuantityText).toBe(expectedItemQuantity);

        //Proceed to checkout
        const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();
        await expect(page).toHaveURL(/signin/);
    });

    test(`adds product from to cart with complete protection warranty and verifies cart count and item quantities`, async ({ page }) => {

        const completeProtectionCheckbox = page.getByTestId('attach-warranty-multi-device-container').locator('input[type="checkbox"]');
        await completeProtectionCheckbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });

        let expectedCount: string;
        let expectedItemQuantity: string;

        if (await completeProtectionCheckbox.isVisible()) {
            await completeProtectionCheckbox.click({ force: true });
            await expect(completeProtectionCheckbox).toBeChecked();

            //click the add protection button to add the warranty
            const addProtectionButton = page.getByTestId('attachSiAddCoverage');
            await expect(addProtectionButton).toBeVisible();
            await addProtectionButton.click({ force: true });
            expectedCount = "2";
            expectedItemQuantity = "Subtotal (2 items):";
        }
        const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
        await expect(successMessage).toBeVisible();
        expectedCount = "1";
        expectedItemQuantity = "Subtotal (1 item):";


        // Verify cart count
        const cartItemCount = page.getByTestId("nav-cart-count");
        await expect(cartItemCount).toHaveText(expectedCount);

        //View your cart 
        const goToCartbutton = page.getByTestId("sw-gtc")
        await expect(goToCartbutton).toBeVisible()
        await goToCartbutton.click()

        //Verify each item's quantity
        const itemQuantity = page.getByTestId("sc-subtotal-label-activecart");
        const itemQuantityText = (await itemQuantity.textContent())?.trim() || '';
        expect(itemQuantityText).toBe(expectedItemQuantity);

        //Proceed to checkout
        const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();
        await expect(page).toHaveURL(/signin/);
    });
});

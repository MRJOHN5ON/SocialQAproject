import { test, expect } from '@playwright/test';
import { config } from './config';
import { addProductToCart } from './helper';


    test(`adds product to cart, denies warranty and verifies cart count and item quantities`, async ({ page }) => {
        await page.goto(config.productWithDenyWarrantyURL);
        await addProductToCart(page);
        const noThanksButton = page.getByTestId('attachSiNoCoverage-announce');
        await noThanksButton.isVisible();
        await noThanksButton.click({ force: true });
        
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
        const itemSubtotal = page.getByTestId("sc-subtotal-label-activecart");
        const itemSubtotalText = await itemSubtotal.textContent();
        expect(itemSubtotalText).toContain("Subtotal (1 item)");

        //Proceed to checkout
        const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
        await expect(proceedToCheckoutButton).toBeVisible();
        await proceedToCheckoutButton.click();
        await expect(page).toHaveURL(/signin/);
    });

import { test, expect } from '@playwright/test';
import { addProductToCart } from './helper';
import { config } from './config'


test(`adds product from to cart, applies 2-year warranty, and verifies cart count and item quantities`, async ({ page }) => {

    await page.goto(config.productWith2yearWarrantyURL);
    await addProductToCart(page);

    // Wait for the "Select warranty option" checkbox to be visible on the warranty panel
    const twoYearWarrantyCheckbox = page.locator('input[type="checkbox"][name="0"]');
    let expectedCartCount: string;
    let expectedItemSubtotal: string;

    // checks if the warranty panel is triggered
    await twoYearWarrantyCheckbox.isVisible()
    await twoYearWarrantyCheckbox.click({ force: true });
    await expect(twoYearWarrantyCheckbox).toBeChecked();
    //assigns expected count and item quantity for later assertions
    expectedCartCount = "2";
    expectedItemSubtotal = "Subtotal (2 items):";

    //click the add protection button to add the warranty
    const addProtectionButton = page.getByTestId('attachSiAddCoverage');
    await expect(addProtectionButton).toBeVisible();
    await addProtectionButton.click({ force: true });

    //verify success message
    const successMessage = page.getByTestId('NATC_SMART_WAGON_CONF_MSG_SUCCESS');
    await expect(successMessage).toBeVisible();

    // Verify cart count
    const cartItemCount = page.getByTestId("nav-cart-count");
    await expect(cartItemCount).toHaveText(expectedCartCount);

    //View your cart 
    const goToCartbutton = page.getByTestId("sw-gtc");
    await expect(goToCartbutton).toBeVisible()
    await goToCartbutton.click()

    //Verify the item quantity subtotal
    const itemSubtotal = page.getByTestId("sc-subtotal-label-activecart");
    const itemSubtotalText = (await itemSubtotal.textContent())?.trim() || '';
    expect(itemSubtotalText).toBe(expectedItemSubtotal);

    //Proceed to checkout
    const proceedToCheckoutButton = page.getByTestId('desktop-ptc-button-celWidget');
    await expect(proceedToCheckoutButton).toBeVisible();
    await proceedToCheckoutButton.click();
    await expect(page).toHaveURL(/signin/);
});
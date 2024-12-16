
import { Page, BrowserContext, Locator } from "@playwright/test";

export async function searchForProductEnter(page: Page, searchQuery: string) {
    const searchBox = page.getByTestId("twotabsearchtextbox");
    await searchBox.fill(searchQuery);
    await searchBox.press("Enter");
}

export async function searchForProductClick(page: Page, searchQuery: string) {
    const searchBox = page.getByTestId("twotabsearchtextbox");
    await searchBox.fill(searchQuery);
    await page.getByTestId('nav-search-submit-button').click()

}

export async function copyWithButton(
    page: Page,
    context: BrowserContext,
    copyButton: Locator,
    
) {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await copyButton.click();
    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    return clipboardContent;
    
    
}
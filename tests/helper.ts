
import { Page } from "@playwright/test";

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

import { Page } from "@playwright/test";

export async function searchForProduct(page: Page, searchQuery: string) {
    const searchBar = page.getByTestId("twotabsearchtextbox");
    await searchBar.fill(searchQuery);
    await searchBar.press("Enter");
}

import { test, expect } from '@playwright/test';

test('contains no limits header' , async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const nolimitsHeader = page.locator('.row').locator('.col.col--6').filter({hasText:"No trade-offs • No limits"})

  await expect(nolimitsHeader).toContainText("No trade-offs • No limits")



})


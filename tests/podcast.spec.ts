import { test, expect } from '@playwright/test';

test('Choose any podcast. Verify the shareable link matches the text copied from the Copy Link button' , async ({ page }) => {

    await page.goto('https://music.amazon.com/')
    page.waitForLoadState('domcontentloaded')
    // click on podcasts
    await page.getByRole('link', { name: 'Podcasts' }).click();
    await expect(page).toHaveURL('https://music.amazon.com/podcasts')

    // click on the first podcast shown
    await page.locator('music-vertical-item').first().click();
    await expect(page).toHaveURL(/https:\/\/music\.amazon\.com\/podcasts\/.+/)

    //click the share button
    const shareButton = page.getByTestId('detailHeaderButton2')
    await shareButton.click();

    const linkField = await page.locator('._3QpxCCZ2ZUyhnlmpwSU7as ').inputValue()
    await expect(linkField).toContain('https://music.amazon.com/podcasts/')

    //press the copy link button
    const copyLinkButton = page.locator('music-button').filter({ hasText: 'Copy link' }).getByRole('button')
    await copyLinkButton.click();
    
    //wait for the link to be copied??
    await page.waitForTimeout(1200);

    //verify the link copied is the same as the link in the field
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());

    // found this method @ https://playwrightsolutions.com/how-do-i-access-the-browser-clipboard-with-playwright/

    //debugging?
    console.log(clipboardText)

    await expect(clipboardText).toEqual(linkField)



});
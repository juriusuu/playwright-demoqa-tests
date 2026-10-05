import { test, expect } from '@playwright/test';
import { LinksPage } from '../../pages/elements/linksPage';

test.describe('Links Functionality', () => {
  let linksPage: LinksPage;

  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    await linksPage.navigate();
  });

  test('should handle new tab links and API response links', async () => {
    // 1. Verify "Home" link opens a new tab
    const newTab1 = await linksPage.clickLinkOpeningNewTab(linksPage.homeLink);
    await newTab1.waitForLoadState();
    await expect(newTab1).toHaveURL('https://demoqa.com');
    await newTab1.close();
    await linksPage.page.bringToFront(); // Focus back to main page

    // 2. Verify dynamic "Home" link (#dynamicLink) opens a new tab
    const newTab2 = await linksPage.clickLinkOpeningNewTab(linksPage.dynamicHomeLink);
    await newTab2.waitForLoadState();
    await expect(newTab2).toHaveURL('https://demoqa.com');
    await newTab2.close();
    await linksPage.page.bringToFront(); // Focus back to main page

    // 3. Verify API call status links update the response element
    await linksPage.createdLink.click();
    await expect(linksPage.linkResponse).toContainText('201');

    await linksPage.noContentLink.click();
    await expect(linksPage.linkResponse).toContainText('204');

    await linksPage.movedLink.click();
    await expect(linksPage.linkResponse).toContainText('301');

    await linksPage.badRequestLink.click();
    await expect(linksPage.linkResponse).toContainText('400');

    await linksPage.unauthorizedLink.click();
    await expect(linksPage.linkResponse).toContainText('401');

    await linksPage.forbiddenLink.click();
    await expect(linksPage.linkResponse).toContainText('403');

    await linksPage.notFoundLink.click();
    await expect(linksPage.linkResponse).toContainText('404');
  });
});
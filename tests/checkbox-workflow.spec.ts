import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../pages/elements/CheckBoxPage';
import { checkBoxTestData } from '../data/CheckBoxPageData';

test.describe('Elements Suite: Check_Box', () => {
  let checkBoxPage: CheckBoxPage;

  test.beforeEach(async ({ page }) => {
    // Set desktop screen size to prevent responsive CSS from hiding tree components
    await page.setViewportSize({ width: 1280, height: 720 });

    checkBoxPage = new CheckBoxPage(page);

    // Load page and wait for DOM tree initialization
    await page.goto(checkBoxTestData.url, { waitUntil: 'domcontentloaded' });
  });

  test('Expand checkbox tree', async () => {
  // Expanding whole list
  await checkBoxPage.expandAll();

  // Check individual directory items
  await checkBoxPage.checkDownloads();
  await checkBoxPage.checkOfficeItems();
  await checkBoxPage.checkWorkspace();
  await checkBoxPage.checkDesktop();

  // Assert selected items output ignoring array order
  const selectedItems = await checkBoxPage.getSelectedItems();
  expect(selectedItems.sort()).toEqual([...checkBoxTestData.expectedSelectedItems].sort());
});
});
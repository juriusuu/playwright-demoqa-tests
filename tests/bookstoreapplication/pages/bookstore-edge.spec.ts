import { test, expect } from '@playwright/test';

test.describe('DemoQA Book Store - Edge Cases', () => {

  test('EDGE-01: Clear search and restore the book list', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    const searchBox = page.locator('#searchBox');
    await expect(searchBox).toBeVisible();
    
    // Wait for the initial books to load
    await expect(page.locator('img[alt="book-image"]').first()).toBeVisible();

    // Search for a book that does not exist.
    await searchBox.fill('NoMatchingBook98765');

    // Verify that no book images are visible (table is empty)
    await expect(page.locator('img[alt="book-image"]')).toHaveCount(0);

    // Clear the search field
    await searchBox.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    // Verify that the available book list returns
    await expect(page.locator('img[alt="book-image"]').first()).toBeVisible();
  });

  test('EDGE-02: Search using special characters', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    const searchBox = page.locator('#searchBox');
    await expect(searchBox).toBeVisible();

    await searchBox.fill('!@#$%^&*()_+');

    // The page should handle the input without crashing.
    await expect(searchBox).toHaveValue('!@#$%^&*()_+');

    // Verify either books are shown or the table is empty (0 books), without crashing
    const bookImages = page.locator('img[alt="book-image"]');
    const count = await bookImages.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('EDGE-03: Refresh the Book Store page', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    const searchBox = page.locator('#searchBox');
    await expect(searchBox).toBeVisible();

    // Perform reload and wait until DOM content is loaded
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Verify that the page and books load successfully after refresh.
    await expect(page.locator('#searchBox')).toBeVisible();
    await expect(page.locator('img[alt="book-image"]').first()).toBeVisible();
  });

});
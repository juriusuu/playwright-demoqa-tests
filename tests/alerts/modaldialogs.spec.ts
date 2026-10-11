import { test, expect } from '@playwright/test';

test('verify open modal dialogs on demoqa', async ({ page }) => {
  await page.goto('https://demoqa.com/modal-dialogs');

  // 1. Open and verify Small Modal
  await page.locator('#showSmallModal').click();
  const smallModal = page.locator('.modal-content');
  
  await expect(smallModal.locator('.modal-title')).toHaveText('Small Modal');
  await expect(smallModal.locator('.modal-body')).toHaveText('This is a small modal. It has very less content');
  
  // Close using either the bottom button or the top 'x' button
  await page.locator('#closeSmallModal').click();
  await expect(smallModal).toBeHidden();

  // 2. Open and verify Large Modal
  await page.locator('#showLargeModal').click();
  const largeModal = page.locator('.modal-content');
  
  await expect(largeModal.locator('.modal-title')).toHaveText('Large Modal');
  await expect(largeModal.locator('.modal-body')).toContainText('Lorem Ipsum is simply dummy text');
  
  // Close large modal
  await page.locator('#closeLargeModal').click();
  await expect(largeModal).toBeHidden();
});
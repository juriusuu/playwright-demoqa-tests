import { test, expect } from '@playwright/test';

test('tabs interaction test', async ({ page }) => {
  await page.goto('https://demoqa.com/tabs');
  
  // Click available tabs
  await page.getByRole('tab', { name: 'Origin' }).click();
  await page.getByRole('tab', { name: 'Use' }).click();
  
  // Assert that the 'More' tab is disabled
  const moreTab = page.getByRole('tab', { name: 'More' });
  await expect(moreTab).toBeDisabled();

  // Switch back to 'What'
  await page.getByRole('tab', { name: 'What' }).click();
});
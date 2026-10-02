import { test, expect } from '@playwright/test';

test('Navigate to Valid Link and Heroku 500 Page', async ({ page }) => {
  // 1. Open DemoQA Broken Links page
  await page.goto('https://demoqa.com/broken');

  // 2. Click Valid Link and verify it lands on demoqa.com
  await page.getByRole('link', { name: 'Click Here for Valid Link' }).click();
  await expect(page).toHaveURL('https://demoqa.com/');

  // 3. Return back to Broken Links page
  await page.goto('https://demoqa.com/broken');

  // 4. Click Broken Link and navigate directly to the Heroku 500 page
  await page.getByRole('link', { name: 'Click Here for Broken Link' }).click();

  // 5. Verify the URL matches the destination
  await expect(page).toHaveURL('http://the-internet.herokuapp.com/status_codes/500');

  // 6. Verify the page content rendered (as shown in your second screenshot)
  await expect(page.getByRole('heading', { name: 'Status Codes' })).toBeVisible();
  await expect(page.getByText('This page returned a 500 status code.')).toBeVisible();
});
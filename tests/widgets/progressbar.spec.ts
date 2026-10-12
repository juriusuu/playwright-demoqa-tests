import { test, expect } from '@playwright/test';

test('progress bar interaction test', async ({ page }) => {
  await page.goto('https://demoqa.com/progress-bar');

  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Stop' }).click();
  await page.getByRole('button', { name: 'Start' }).click();

  // Click Reset and wait for it to complete
  const resetButton = page.getByRole('button', { name: 'Reset' });
  await resetButton.click({ timeout: 15000 });

  // Verify the button text changes back to 'Start', confirming a full reset
  await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();

  // Now verify the progress bar attribute with an increased timeout
  const progressBar = page.locator('.progress-bar');
  await expect(progressBar).toHaveAttribute('aria-valuenow', '0', { timeout: 10000 });
});
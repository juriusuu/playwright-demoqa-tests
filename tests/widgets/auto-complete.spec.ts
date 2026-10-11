import { test, expect } from '@playwright/test';

test('interact with auto-complete inputs on DemoQA', async ({ page }) => {
  await page.goto('https://demoqa.com/auto-complete');

  // 1. Handle Single Color input
  const singleInput = page.locator('#autoCompleteSingleInput');
  await singleInput.fill('green');
  await page.getByRole('option', { name: 'Green' }).click();

  // 2. Handle Multiple Color input
  const multiInput = page.locator('#autoCompleteMultipleInput');

  // Add Magenta
  await multiInput.fill('a');
  await page.getByRole('option', { name: 'Magenta' }).click();

  // Add Green
  await multiInput.fill('gr');
  await page.getByRole('option', { name: 'Green' }).click();

  // Add other items using text and Enter
  await multiInput.fill('indi');
  await multiInput.press('Enter');

  await multiInput.fill('h');
  await multiInput.press('Enter');

  await multiInput.fill('blu');
  await multiInput.press('Enter');
});
import { test, expect } from '@playwright/test';

test('test alerts', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');

  // 1. Standard Alert
  page.once('dialog', async dialog => {
    console.log(`Alert 1 message: ${dialog.message()}`);
    await dialog.dismiss();
  });
  await page.locator('#alertButton').click();

  // 2. Timer Alert (5 second delay)
  // Create a promise to wait for the delayed dialog before moving forward
  const timerDialogPromise = page.waitForEvent('dialog');
  await page.locator('#timerAlertButton').click();
  const timerDialog = await timerDialogPromise;
  console.log(`Alert 2 message: ${timerDialog.message()}`);
  await timerDialog.dismiss();

  // 3. Confirm Box Alert
  page.once('dialog', async dialog => {
    console.log(`Alert 3 message: ${dialog.message()}`);
    await dialog.dismiss();
  });
  await page.locator('#confirmButton').click();

  // 4. Prompt Box Alert
  page.once('dialog', async dialog => {
    console.log(`Alert 4 message: ${dialog.message()}`);
    await dialog.accept('Test Input'); // or dialog.dismiss()
  });
  await page.locator('#promtButton').click();
});
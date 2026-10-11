import { test, expect } from '@playwright/test';

test('interact with accordions on DemoQA', async ({ page }) => {
  // Navigate to the accordion page
  await page.goto('https://demoqa.com/accordian');

  // Interact with the accordion sections
  await page.getByRole('button', { name: 'What is Lorem Ipsum?' }).click();
  await page.getByRole('button', { name: 'Where does it come from?' }).click();
  await page.getByRole('button', { name: 'Why do we use it?' }).click();
});
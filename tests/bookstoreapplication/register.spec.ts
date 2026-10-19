import { test, expect } from '@playwright/test';

test('fill out registration form on DemoQA', async ({ page }) => {
  // Navigate to the register page
  await page.goto('https://demoqa.com/register');

  // Fill in personal details
  await page.getByRole('textbox', { name: 'First Name' }).fill('Fernando');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Poe');
  await page.getByRole('textbox', { name: 'UserName' }).fill('fernando');
  await page.getByRole('textbox', { name: 'Password' }).fill('Fernandopoe@123');

  // Submit the form
  await page.getByRole('button', { name: 'Register' }).click();

  // Optional: Add an assertion here to verify expected behavior (e.g., handling CAPTCHA or validation errors)
});
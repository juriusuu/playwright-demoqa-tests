import { test, expect } from '@playwright/test';

test('login on DemoQA', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://demoqa.com/login');

  // Fill in login credentials
  await page.getByRole('textbox', { name: 'UserName' }).fill('fernando');
  await page.getByRole('textbox', { name: 'Password' }).fill('Fernandopoe@123');

  // Submit the login form
  await page.getByRole('button', { name: 'Login' }).click();

  // Optional: Add assertions here to verify successful login (e.g., checking URL or user profile element)
});
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByRole('link', { name: 'Text Box' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Mr. Tester');
  await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('mrtester@gmail.com');
  await page.getByRole('textbox', { name: 'name@example.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('Indonesia St. Fernando Poe');
  await page.getByRole('textbox', { name: 'Current Address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Current Address' }).click();
  await page.getByRole('textbox', { name: 'Current Address' }).press('ControlOrMeta+c');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('Indonesia St. Fernando Poe');
  await page.getByRole('button', { name: 'Submit' }).click();
});
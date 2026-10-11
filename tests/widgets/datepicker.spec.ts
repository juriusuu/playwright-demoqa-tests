import { test, expect } from '@playwright/test';

test('interact with date picker on DemoQA', async ({ page }) => {
  await page.goto('https://demoqa.com/date-picker');

  // 1. Select Date (April 11, 1995) using the picker dropdowns
  const dateInput = page.locator('#datePickerMonthYearInput');
  await dateInput.click();
  await page.getByRole('combobox').first().selectOption('3'); // April (0-indexed)
  await page.getByRole('combobox').nth(1).selectOption('1995');
  await page.getByRole('gridcell', { name: 'Choose Tuesday, April 11th,' }).click();

  // 2. Set Date and Time using direct fill (eliminating redundant intermediate clicks)
  const dateTimeInput = page.locator('#dateAndTimePickerInput');
  await dateTimeInput.fill('October 3, 2029 5:23 PM');
  await dateTimeInput.press('Enter');
});
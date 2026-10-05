import { test, expect } from '@playwright/test';

test('verify dynamic properties behavior', async ({ page }) => {
  await page.goto('https://demoqa.com/dynamic-properties');

  const enableBtn = page.getByRole('button', { name: 'Will enable 5 seconds' });
  const colorChangeBtn = page.getByRole('button', { name: 'Color Change' });
  const visibleBtn = page.getByRole('button', { name: 'Visible After 5 Seconds' });

  // 1. Verify initial states (before 5 seconds)
  await expect(enableBtn).toBeDisabled();
  await expect(visibleBtn).not.toBeVisible();

  // 2. Assert dynamic changes after 5 seconds (Playwright auto-waits up to default timeout)
  // Check button becomes enabled
  await expect(enableBtn).toBeEnabled({ timeout: 10000 });

  // Check button text color changes to red (rgb(220, 53, 69) in CSS)
  await expect(colorChangeBtn).toHaveCSS('color', 'rgb(220, 53, 69)', { timeout: 10000 });

  // Check button becomes visible
  await expect(visibleBtn).toBeVisible({ timeout: 10000 });

  // Optional: Click them now that they are in their dynamic states
  await enableBtn.click();
  await visibleBtn.click();
});
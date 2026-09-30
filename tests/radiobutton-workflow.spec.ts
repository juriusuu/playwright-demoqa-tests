import { test, expect } from '@playwright/test';

test.describe('Radio Button Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/radio-button');
  });

  test('should select radio buttons and verify output', async ({ page }) => {
    // 1. Select "Yes" using force check OR label click
    const yesRadio = page.getByRole('radio', { name: 'Yes' });
    const yesLabel = page.getByText('Yes', { exact: true });

    await yesLabel.click();
    await expect(yesRadio).toBeChecked();
    await expect(page.locator('.text-success')).toHaveText('Yes');

    // 2. Select "Impressive"
    const impressiveRadio = page.getByRole('radio', { name: 'Impressive' });
    const impressiveLabel = page.getByText('Impressive', { exact: true });

    await impressiveLabel.click();
    await expect(impressiveRadio).toBeChecked();
    await expect(page.locator('.text-success')).toHaveText('Impressive');

    // 3. Verify "No" radio is disabled
    const noRadio = page.getByRole('radio', { name: 'No' });
    await expect(noRadio).toBeDisabled();
  });
});
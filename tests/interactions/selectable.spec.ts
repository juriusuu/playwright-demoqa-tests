import { test, expect } from '@playwright/test';

test('Selectable grid and list items test', async ({ page }) => {
  await page.goto('https://demoqa.com/selectable');

  // --- Grid View Selection ---
  await page.getByRole('tab', { name: 'Grid' }).click();

  const gridItems = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  
  const gridTabpanel = page.getByRole('tabpanel', { name: 'Grid' });
  for (const itemText of gridItems) {
    const item = gridTabpanel.getByText(itemText, { exact: true });
    await item.click();
    // Verify that clicking adds the 'active' class to show it's selected
    await expect(item).toHaveClass(/active/);
  }

  // --- List View Selection ---
  await page.getByRole('tab', { name: 'List' }).click();

  const listItems = [
    'Cras justo odio',
    'Dapibus ac facilisis in',
    'Morbi leo risus',
    'Porta ac consectetur ac'
  ];

  const listTabpanel = page.getByRole('tabpanel', { name: 'List' });
  for (const itemText of listItems) {
    const item = listTabpanel.getByText(itemText, { exact: true });
    await item.click();
    // Verify that the list item becomes active/selected
    await expect(item).toHaveClass(/active/);
  }
});
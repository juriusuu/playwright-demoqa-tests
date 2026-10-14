import { test, expect } from '@playwright/test';

test('Sortable grid and list interaction test', async ({ page }) => {
  // 1. Navigate to the Sortable page
  await page.goto('https://demoqa.com/sortable');

  // --- Grid View Test ---
  // Switch to the Grid tab
  const gridTab = page.getByRole('tab', { name: 'Grid' });
  await gridTab.click();
  await expect(gridTab).toHaveAttribute('aria-selected', 'true');

  // Example: Drag item 'One' onto item 'Four' in the grid view
  const gridItemOne = page.getByRole('tabpanel', { name: 'Grid' }).getByText('One', { exact: true });
  const gridItemFour = page.getByRole('tabpanel', { name: 'Grid' }).getByText('Four', { exact: true });
  
  await gridItemOne.dragTo(gridItemFour);

  // --- List View Test ---
  // Switch to the List tab
  const listTab = page.getByRole('tab', { name: 'List' });
  await listTab.click();
  await expect(listTab).toHaveAttribute('aria-selected', 'true');

  // Example: Drag item 'One' down to item 'Three' in the list view
  const listItemOne = page.getByRole('tabpanel', { name: 'List' }).getByText('One', { exact: true });
  const listItemThree = page.getByRole('tabpanel', { name: 'List' }).getByText('Three', { exact: true });

  await listItemOne.dragTo(listItemThree);
});
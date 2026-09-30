import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pages/elements/ButtonsPage';

test.describe('Buttons Functionality', () => {
  let buttonsPage: ButtonsPage;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    await buttonsPage.navigate();
  });

  test('should handle double click, right click, and dynamic click actions', async () => {
    // 1. Double Click Action
    await buttonsPage.performDoubleClick();
    await expect(buttonsPage.doubleClickMessage).toHaveText('You have done a double click');

    // 2. Right Click Action
    await buttonsPage.performRightClick();
    await expect(buttonsPage.rightClickMessage).toHaveText('You have done a right click');

    // 3. Dynamic Click Action
    await buttonsPage.performDynamicClick();
    await expect(buttonsPage.dynamicClickMessage).toHaveText('You have done a dynamic click');
  });
});
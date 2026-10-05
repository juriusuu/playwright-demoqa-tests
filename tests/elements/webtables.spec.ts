import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../../pages/elements/WebTablesPage';

test.describe('Web Tables Functionality', () => {
  let webTablesPage: WebTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.navigate();
  });

  test('should successfully add, edit, delete, and search records', async () => {
    // 1. Add a new user record
    await webTablesPage.addRecord({
      firstName: 'Fernando',
      lastName: 'Rielo',
      email: 'fernando@gmail.com',
      age: '25',
      salary: '25000',
      department: 'Information Technology',
    });

    // 2. Perform edit/delete actions on existing row (Record ID 4)
    await webTablesPage.editRecord(4);
    await webTablesPage.salaryInput.fill('26000');
    await webTablesPage.submitButton.click();

    await webTablesPage.deleteRecord(4);

    // 3. Search for the deleted record
    await webTablesPage.clearSearch();
    await webTablesPage.searchTable('Fernando');

    // 4. Assert that the record is no longer in the table
    await expect(webTablesPage.page.getByRole('gridcell', { name: 'Fernando' })).not.toBeVisible();
  });
});
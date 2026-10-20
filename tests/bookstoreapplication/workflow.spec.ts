// import { test, expect } from '@playwright/test';

// test('DemoQA UI workflow: add books one by one', async ({ page }) => {
//   // Global dialog handler for alert popups (like "Book added to your collection.")
//   page.on('dialog', async dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     await dialog.accept();
//   });

//   // 1. Navigate and Login via UI
//   await page.goto('https://demoqa.com/login');
//   await page.getByRole('textbox', { name: 'UserName' }).fill('fernando');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Fernandopoe@1234');
//   await page.getByRole('button', { name: 'Login' }).click();
  
//   // Verify login success
//   await expect(page.locator('#userName-value')).toHaveText('fernando', { timeout: 10000 });

//   // 2. Go to Profile first and clear all existing books to ensure a clean slate
//   await page.goto('https://demoqa.com/profile');
  
//   // Keep clicking "Delete All Books" if books exist until the table is empty
//   const deleteAllButton = page.getByRole('button', { name: 'Delete All Books' });
//   if (await deleteAllButton.isVisible()) {
//     await deleteAllButton.click();
//     await page.getByRole('button', { name: 'OK', exact: true }).click();
//     // Handle the secondary "All Books deleted." alert modal if it pops up
//     await page.waitForTimeout(1000);
//   }

//   // 3. Go to Book Store to add books one by one
//   await page.getByRole('button', { name: 'Go To Book Store' }).click();

//   // --- BOOK 1: Git Pocket Guide ---
//   await page.getByRole('link', { name: 'Git Pocket Guide' }).click();
//   await page.getByRole('button', { name: 'Add To Your Collection' }).click();
//   // Return to book store
//   await page.goBack();
//   await page.waitForLoadState('networkidle');

//   // --- BOOK 2: Learning JavaScript Design Patterns ---
//   await page.getByRole('link', { name: 'Learning JavaScript Design Patterns' }).click();
//   await page.getByRole('button', { name: 'Add To Your Collection' }).click();
//   await page.goBack();
//   await page.waitForLoadState('networkidle');

//   // --- BOOK 3: Speaking JavaScript ---
//   await page.getByRole('link', { name: 'Speaking JavaScript' }).click();
//   await page.getByRole('button', { name: 'Add To Your Collection' }).click();

//   // 4. Navigate back to Profile Page to verify and delete books one by one
//   await page.getByRole('link', { name: 'Profile' }).click();
//   await expect(page).toHaveURL('https://demoqa.com/profile');
  
//   // Wait for the delete action buttons to render on the table rows
//   const deleteButtons = page.locator('span[id^="delete-record-"]');
//   await expect(deleteButtons.first()).toBeVisible({ timeout: 10000 });

//   // Delete the 3 added books one by one from the UI profile table
//   const count = await deleteButtons.count();
//   for (let i = 0; i < count; i++) {
//     await deleteButtons.first().click();
//     await page.getByRole('button', { name: 'OK', exact: true }).click();
//     await page.waitForTimeout(500); // Allow table rows to update
//   }

//   // 5. Logout
//   await page.getByRole('button', { name: 'Logout' }).click();
//   await expect(page).toHaveURL('https://demoqa.com/login');
// });

import { test, expect } from '@playwright/test';

test('DemoQA UI workflow: add books one by one', async ({ page }) => {
  // Global dialog handler for alert popups
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

  // 1. Navigate and Login via UI
  await page.goto('https://demoqa.com/login');
  await page.getByRole('textbox', { name: 'UserName' }).fill('fernando');
  await page.getByRole('textbox', { name: 'Password' }).fill('Fernandopoe@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verify login success
  await expect(page.locator('#userName-value')).toHaveText('fernando', { timeout: 10000 });

  // 2. Go to Profile first and clear any existing books safely one by one (avoids the bugged Delete All modal)
  await page.goto('https://demoqa.com/profile');
  await page.waitForTimeout(1000);

  let initialDeleteButtons = page.locator('span[id^="delete-record-"]');
  while (await initialDeleteButtons.count() > 0) {
    await initialDeleteButtons.first().click();
    
    // Target the modal OK button specifically with force/exact match
    const okButton = page.getByRole('button', { name: 'OK', exact: true });
    await okButton.click();
    
    // Wait for the table row to clear out
    await page.waitForTimeout(1000);
    initialDeleteButtons = page.locator('span[id^="delete-record-"]');
  }

  // 3. Go to Book Store to add books one by one
  await page.getByRole('button', { name: 'Go To Book Store' }).click();

  // --- BOOK 1: Git Pocket Guide ---
  await page.getByRole('link', { name: 'Git Pocket Guide' }).click();
  await page.getByRole('button', { name: 'Add To Your Collection' }).click();
  await page.getByRole('button', { name: 'Back To Book Store' }).click();

  // --- BOOK 2: Learning JavaScript Design Patterns ---
  await page.getByRole('link', { name: 'Learning JavaScript Design Patterns' }).click();
  await page.getByRole('button', { name: 'Add To Your Collection' }).click();
  await page.getByRole('button', { name: 'Back To Book Store' }).click();

  // --- BOOK 3: Speaking JavaScript ---
  await page.getByRole('link', { name: 'Speaking JavaScript' }).click();
  await page.getByRole('button', { name: 'Add To Your Collection' }).click();

  // 4. Navigate back to Profile Page to verify and delete books one by one
  await page.getByRole('link', { name: 'Profile' }).click();
  await expect(page).toHaveURL('https://demoqa.com/profile');
  
  // Wait for the delete action buttons to render on the table rows
  const deleteButtons = page.locator('span[id^="delete-record-"]');
  await expect(deleteButtons.first()).toBeVisible({ timeout: 10000 });

  // Delete the 3 added books one by one from the UI profile table
  const count = await deleteButtons.count();
  for (let i = 0; i < count; i++) {
    await deleteButtons.first().click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    await page.waitForTimeout(1000);
  }

  // 5. Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://demoqa.com/login');
});
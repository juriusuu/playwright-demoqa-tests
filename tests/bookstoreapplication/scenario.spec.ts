import { test, expect } from '@playwright/test';

test('DemoQA stable workflow via API & UI', async ({ page, request }) => {
  // Automatically accept all browser alert dialogs
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
  const userNameLabel = page.locator('#userName-value');
  await expect(userNameLabel).toHaveText('fernando', { timeout: 10000 });

  // 2. Extract Token and User ID correctly from localStorage
  const userDataString = await page.evaluate(() => localStorage.getItem('user'));
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const token = userData?.token;
  const userId = userData?.userId;

  console.log('EXTRACTED TOKEN:', token);
  console.log('EXTRACTED USER ID:', userId);

  // 3. Clear existing user collection via API first to prevent duplicate errors
  await request.delete(`https://demoqa.com/BookStore/v1/Books?UserId=${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // 4. Fetch the book list via API to get valid ISBNs dynamically
  const booksResponse = await request.get('https://demoqa.com/BookStore/v1/Books');
  const booksData = await booksResponse.json();
  
  // Select 3 target books
  const targetIsbns = booksData.books
    .filter((b: any) => 
      b.title === 'Git Pocket Guide' || 
      b.title === 'Learning JavaScript Design Patterns' || 
      b.title === 'Speaking JavaScript'
    )
    .map((b: any) => ({ isbn: b.isbn }));

  // 5. Add books directly via API request
  const addResponse = await request.post('https://demoqa.com/BookStore/v1/Books', {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      userId: userId,
      collectionOfIsbns: targetIsbns
    }
  });
  
  expect(addResponse.status()).toBe(201);

  // 6. Navigate to Profile Page and wait until network requests complete
  await page.goto('https://demoqa.com/profile', { waitUntil: 'networkidle' });
  await page.waitForSelector('.rt-tbody', { timeout: 10000 });

  // Verify that target books are actually visible in the UI table rows
  await expect(page.locator('.rt-tbody')).toContainText('Git Pocket Guide');

  // 7. Delete Books One by One from Profile UI
  const deleteButtons = page.locator('span[id^="delete-record-"]');

  for (let i = 0; i < 3; i++) {
    // Click the first delete button available
    await deleteButtons.first().click();
    // Confirm deletion in modal
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    await page.waitForTimeout(1000); // Allow table re-render
  }

  // 8. Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://demoqa.com/login');
});
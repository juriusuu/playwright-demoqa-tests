import { test, expect } from '@playwright/test';

test('DemoQA stable workflow purely via API & UI navigation', async ({ page, request }) => {
  // Automatically accept all browser alert dialogs
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });

  const username = 'fernando';
  const password = 'Fernandopoe@1234';

  // 1. Authenticate via API directly to get token and userId
  const loginResponse = await request.post('https://demoqa.com/Account/v1/Login', {
    data: {
      userName: username,
      password: password
    }
  });

  expect(loginResponse.status()).toBe(200);
  const loginData = await loginResponse.json();
  const token = loginData.token;
  const userId = loginData.userId;

  // 2. Clear existing books in collection via API to start clean
  try {
    await request.delete('https://demoqa.com/BookStore/v1/Books', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: { 'UserId': userId },
      timeout: 10000
    });
  } catch (e) {
    console.warn('Pre-clearing skipped', e);
  }

  // 3. Fetch book list and get target ISBNs
  const booksResponse = await request.get('https://demoqa.com/BookStore/v1/Books');
  const booksData = await booksResponse.json();

  const targetIsbns = booksData.books
    .filter((b: any) => 
      b.title === 'Git Pocket Guide' || 
      b.title === 'Learning JavaScript Design Patterns' || 
      b.title === 'Speaking JavaScript'
    )
    .map((b: any) => ({ isbn: b.isbn }));

  // 4. Add books via API request
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

  // 5. To make the UI show the books when we visit /profile, 
  // set the storage item via Playwright context script *before* navigation
  await page.context().addInitScript(({ token, userId, username }) => {
    window.localStorage.setItem('user', JSON.stringify({
      userId,
      username,
      password: '',
      token,
      expires: new Date(Date.now() + 86400000).toISOString()
    }));
  }, { token, userId, username });

  // 6. Navigate directly to Profile Page
  await page.goto('https://demoqa.com/profile');
  await page.waitForSelector('.rt-row', { timeout: 10000 });

  // 7. Delete Books One by One from Profile UI
  const deleteButtons = page.locator('span[id^="delete-record-"]');

  for (let i = 0; i < targetIsbns.length; i++) {
    await deleteButtons.first().click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    await page.waitForTimeout(1000);
  }

  // 8. Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('https://demoqa.com/login');
});
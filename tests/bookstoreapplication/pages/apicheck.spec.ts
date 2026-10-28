// import { test, expect } from '@playwright/test';

// test.describe('DemoQA Bookstore - API Tests', () => {
//   const baseURL = 'https://demoqa.com';

//   test('End-to-End API Flow: Get books, create user, generate token, and add book', async ({ request }) => {
//     // 1. Public API: GET all books without authentication
//     const booksRes = await request.get(`${baseURL}/BookStore/v1/Books`);
//     expect(booksRes.status()).toBe(200);
    
//     const booksData = await booksRes.json();
//     expect(booksData.books.length).toBeGreaterThan(0);
//     const firstIsbn = booksData.books[0].isbn;

//     // Generate unique credentials for this run
//     const randomSuffix = Math.floor(100000 + Math.random() * 900000);
//     const username = `playwright_user_${randomSuffix}`;
//     const password = `Password@${randomSuffix}`;

//     // 2. Create User
//     const createUserRes = await request.post(`${baseURL}/Account/v1/User`, {
//       data: {
//         userName: username,
//         password: password,
//       },
//     });
//     expect(createUserRes.status()).toBe(201);
//     const createUserData = await createUserRes.json();
//     const userId = createUserData.userID;

//     // 3. Generate Auth Token
//     const generateTokenRes = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
//       data: {
//         userName: username,
//         password: password,
//       },
//     });
//     expect(generateTokenRes.status()).toBe(200);
//     const tokenData = await generateTokenRes.json();
//     expect(tokenData.status).toBe('Success');
//     const token = tokenData.token;

//     // 4. Authorized API: Add a book to user reading list
//     const addBookRes = await request.post(`${baseURL}/BookStore/v1/Books`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       data: {
//         userId: userId,
//         collectionOfIsbns: [
//           { isbn: firstIsbn }
//         ],
//       },
//     });

//     expect(addBookRes.status()).toBe(201);
//   });
// });


// import { test, expect } from '@playwright/test';

// test.describe('DemoQA Bookstore - Hybrid API + UI Test', () => {
//   const baseURL = 'https://demoqa.com';

//   test('Create data via API, then verify in the UI', async ({ page, request }) => {
//     // 1. Fetch available books via API
//     const booksRes = await request.get(`${baseURL}/BookStore/v1/Books`);
//     expect(booksRes.status()).toBe(200);
//     const booksData = await booksRes.json();
//     const firstIsbn = booksData.books[0].isbn;
//     const firstBookTitle = booksData.books[0].title;

//     // Generate unique credentials
//     const randomSuffix = Math.floor(100000 + Math.random() * 900000);
//     const username = `playwright_user_${randomSuffix}`;
//     const password = `Password@${randomSuffix}`;

//     // 2. Create User via API
//     const createUserRes = await request.post(`${baseURL}/Account/v1/User`, {
//       data: { userName: username, password: password },
//     });
//     expect(createUserRes.status()).toBe(201);
//     const createUserData = await createUserRes.json();
//     const userId = createUserData.userID;

//     // 3. Generate Auth Token via API
//     const generateTokenRes = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
//       data: { userName: username, password: password },
//     });
//     expect(generateTokenRes.status()).toBe(200);
//     const tokenData = await generateTokenRes.json();
//     const token = tokenData.token;

//     // 4. Add Book to User profile via API
//     const addBookRes = await request.post(`${baseURL}/BookStore/v1/Books`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       data: {
//         userId: userId,
//         collectionOfIsbns: [{ isbn: firstIsbn }],
//       },
//     });
//     expect(addBookRes.status()).toBe(201);

//     // 5. NOW OPEN THE BROWSER UI to verify user session / login state
//     await page.goto(`${baseURL}/login`);

//     // Log into the UI using the credentials we created via API
//     await page.fill('#userName', username);
//     await page.fill('#password', password);
//     await page.click('#login');

//     // Verify that we are successfully logged in and redirected to the profile page
//     await expect(page.locator('#userName-value')).toHaveText(username);
    
//     // Verify that the book we added via API is displayed in the user's profile table
//     await expect(page.locator(`text=${firstBookTitle}`)).toBeVisible();
//   });
// });


import { test, expect } from '@playwright/test';

test.describe('DemoQA Bookstore - Extended API Flow', () => {
  const baseURL = 'https://demoqa.com';

  test('End-to-End API Flow: Add book, delete book, and clean up user', async ({ request }) => {
    // 1. Get available books
    const booksRes = await request.get(`${baseURL}/BookStore/v1/Books`);
    expect(booksRes.status()).toBe(200);
    const booksData = await booksRes.json();
    const firstIsbn = booksData.books[0].isbn;

    // Generate unique credentials
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const username = `playwright_user_${randomSuffix}`;
    const password = `Password@${randomSuffix}`;

    // 2. Create User
    const createUserRes = await request.post(`${baseURL}/Account/v1/User`, {
      data: { userName: username, password: password },
    });
    expect(createUserRes.status()).toBe(201);
    const userId = (await createUserRes.json()).userID;

    // 3. Generate Auth Token
    const generateTokenRes = await request.post(`${baseURL}/Account/v1/GenerateToken`, {
      data: { userName: username, password: password },
    });
    expect(generateTokenRes.status()).toBe(200);
    const token = (await generateTokenRes.json()).token;

    // 4. Add Book to User reading list
    const addBookRes = await request.post(`${baseURL}/BookStore/v1/Books`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId: userId,
        collectionOfIsbns: [{ isbn: firstIsbn }],
      },
    });
    expect(addBookRes.status()).toBe(201);

    // 5. DELETE THE BOOK from the user's reading list
    // DemoQA uses a DELETE request with a JSON body containing isbn and userId
    const deleteBookRes = await request.delete(`${baseURL}/BookStore/v1/Book`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        isbn: firstIsbn,
        userId: userId,
      },
    });
    // DemoQA returns 204 No Content upon successful deletion
    expect(deleteBookRes.status()).toBe(204);

    // 6. CLEAN UP / DELETE USER (Simulates complete teardown / logging out permanently)
    const deleteUserRes = await request.delete(`${baseURL}/Account/v1/User/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    expect(deleteUserRes.status()).toBe(204);
  });
});
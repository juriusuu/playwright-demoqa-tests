
import { test, expect } from '@playwright/test';

test.describe('DemoQA Book Store - Negative Tests', () => {

  test('NEG-01: Login with invalid credentials', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    await page.getByRole('textbox', { name: 'UserName' })
      .fill('invalid_user_123');

    await page.getByRole('textbox', { name: 'Password' })
      .fill('WrongPassword123!');

    await page.getByRole('button', { name: 'Login' }).click();

    // The user should remain on the login page.
    await expect(page).toHaveURL(/\/login$/);

    // Verify the application's invalid-login message.
    await expect(page.locator('#name'))
      .toContainText('Invalid username or password!');
  });

  
    test('NEG-02: Search for a nonexistent book', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    const searchBox = page.locator('#searchBox');
    await searchBox.fill('ThisBookDoesNotExist12345');

    // Verify that the search does not return any book links.
    const bookLinks = page.locator('.rt-tbody a');

    await expect(bookLinks).toHaveCount(0);
    });

     // NEG-03: Submit login with empty credentials
  test('NEG-03: Reject empty login credentials', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that login did not succeed.
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('#userName-value')).toHaveCount(0);
  });

  // NEG-04: Access profile without logging in
  test('NEG-04: Prevent unauthenticated profile access', async ({ page }) => {
    await page.goto('https://demoqa.com/profile');

    // An unauthenticated user should not see a logged-in username.
    await expect(page.locator('#userName-value')).toHaveCount(0);
  });

  
  // NEG-05: Search using an extremely long query
  test('NEG-05: Handle a long book search query', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    const searchBox = page.locator('#searchBox');
    const longQuery = 'x'.repeat(500);

    await expect(searchBox).toBeVisible();
    await searchBox.fill(longQuery);

    await expect(searchBox).toHaveValue(longQuery);
    await expect(page).toHaveURL(/\/books/);
  });

  // NEG-06: Search using special characters
  test('NEG-06: Handle special characters in search', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    const searchBox = page.locator('#searchBox');
    const specialQuery = '!@#$%^&*()_+';

    await expect(searchBox).toBeVisible();
    await searchBox.fill(specialQuery);

    await expect(searchBox).toHaveValue(specialQuery);
    await expect(page).toHaveURL(/\/books/);
  });

  // NEG-07: Attempt login with username only
  test('NEG-07: Reject username without password', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    await page.getByRole('textbox', { name: 'UserName' })
      .fill('fernando');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('#userName-value')).toHaveCount(0);
  });

  // NEG-08: Attempt login with password only
  test('NEG-08: Reject password without username', async ({ page }) => {
    await page.goto('https://demoqa.com/login');

    await page.getByRole('textbox', { name: 'Password' })
      .fill('WrongPassword123!');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('#userName-value')).toHaveCount(0);
  });



});

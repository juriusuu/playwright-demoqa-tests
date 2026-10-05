import { test, expect } from '@playwright/test';

test.use({
  // Use a real browser User-Agent so Cloudflare treats Playwright like a normal browser
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
});

test('submit practice form successfully', async ({ page }) => {
  // 1. Block heavy ad networks and tracking scripts
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (
      url.includes('googlesyndication') ||
      url.includes('doubleclick') ||
      url.includes('adservice') ||
      url.includes('google-analytics') ||
      url.includes('fontawesome')
    ) {
      return route.abort();
    }
    return route.continue();
  });

  // 2. Navigate with domcontentloaded
  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });

  // 3. Fill Personal Information
  await page.getByPlaceholder('First Name').fill('Tactical');
  await page.getByPlaceholder('Last Name').fill('Tester');
  await page.getByPlaceholder('name@example.com').fill('tacticaltester@gmail.com');

  // 4. Select Gender
  await page.getByRole('radio', { name: 'Male', exact: true }).check({ force: true });

  // 5. Mobile Number
  await page.getByPlaceholder('Mobile Number').fill('1234554321');

  // 6. Date of Birth
  await page.locator('#dateOfBirthInput').click();
  await page.locator('.react-datepicker__year-select').selectOption('2009');
  await page.locator('.react-datepicker__month-select').selectOption('9');
  await page.locator('.react-datepicker__day--014:not(.react-datepicker__day--outside-month)').click();

  // 7. Subjects
  await page.locator('#subjectsInput').fill('Computer Science');
  await page.getByText('Computer Science', { exact: true }).click();

  // 8. Hobbies
  await page.getByRole('checkbox', { name: 'Sports' }).check({ force: true });
  await page.getByRole('checkbox', { name: 'Reading' }).check({ force: true });
  await page.getByRole('checkbox', { name: 'Music' }).check({ force: true });

  // 9. File Upload (In-memory file creation)
  await page.locator('#uploadPicture').setInputFiles({
    name: 'pok.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Sample file content'),
  });

  // 10. Address
  await page.getByPlaceholder('Current Address').fill('Jaboo street');

  // 11. Select State & City
  await page.locator('#react-select-3-input').fill('Uttar Pradesh');
  await page.locator('#react-select-3-input').press('Enter');

  await page.locator('#react-select-4-input').fill('Lucknow');
  await page.locator('#react-select-4-input').press('Enter');

  // 12. Submit Form
  await page.getByRole('button', { name: 'Submit' }).click();

  // 13. Assertions
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Thanks for submitting the form');

  // 14. Close Modal
  await page.getByRole('button', { name: 'Close' }).click({ force: true });
  await expect(modal).toBeVisible();
});
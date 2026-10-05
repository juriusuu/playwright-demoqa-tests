import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Verify File Download and Upload', async ({ page }) => {
  await page.goto('https://demoqa.com/upload-download');

  // 1. Download File
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#downloadButton').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('sampleFile.jpeg');

  // 2. Dynamically create pok.txt before uploading
  const filePath = path.join(__dirname, 'pok.txt');
  fs.writeFileSync(filePath, 'Hello Playwright World!');

  // 3. Upload File
  await page.locator('#uploadFile').setInputFiles(filePath);

  // 4. Verify Upload path output text
  await expect(page.locator('#uploadedFilePath')).toContainText('pok.txt');

  // Clean up created file (optional)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
});
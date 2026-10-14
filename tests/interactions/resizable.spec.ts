import { test, expect } from '@playwright/test';

test('Resize both DemoQA resizable boxes', async ({ page }) => {
  await page.goto('https://demoqa.com/resizable');

  // --- 1. Resize Box 1 (Restricted Box) ---
  const box1 = page.locator('#resizableBoxWithRestriction');
  const handle1 = page.locator('.react-resizable-handle').first();
  const initialBox1 = await box1.boundingBox();

  if (initialBox1) {
    await handle1.hover();
    await page.mouse.down();
    await page.mouse.move(initialBox1.x + initialBox1.width + 100, initialBox1.y + initialBox1.height + 50);
    await page.mouse.up();
  }

  // --- 2. Resize Box 2 (Unrestricted Box) ---
  const box2 = page.locator('#resizable');
  const handle2 = page.locator('#resizable > .react-resizable-handle');
  const initialBox2 = await box2.boundingBox();

  if (initialBox2) {
    await handle2.hover();
    await page.mouse.down();
    await page.mouse.move(initialBox2.x + initialBox2.width + 150, initialBox2.y + initialBox2.height + 80);
    await page.mouse.up();
  }
});
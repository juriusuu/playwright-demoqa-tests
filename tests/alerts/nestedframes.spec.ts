import { test, expect } from '@playwright/test';

test('verify nested frames on demoqa', async ({ page }) => {
  await page.goto('https://demoqa.com/nestedframes');

  // 1. Target the Parent Frame
  const parentFrame = page.frameLocator('#frame1');
  const parentBody = parentFrame.locator('body');
  
  // Verify text directly inside the parent frame
  await expect(parentBody).toContainText('Parent frame');

  // 2. Target the Child Frame (nested inside Parent Frame)
  const childFrame = parentFrame.frameLocator('iframe');
  const childBody = childFrame.locator('body');

  // Verify text inside the nested child frame
  await expect(childBody).toHaveText('Child Iframe');
});
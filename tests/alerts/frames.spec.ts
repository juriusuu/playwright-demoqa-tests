import { test, expect } from '@playwright/test';

test('verify frames on demoqa', async ({ page }) => {
  await page.goto('https://demoqa.com/frames');

  // 1. Target the Large Frame (frame1)
  const frame1 = page.frameLocator('#frame1');
  const frame1Heading = frame1.locator('#sampleHeading');
  
  // Verify heading text inside frame 1
  await expect(frame1Heading).toHaveText('This is a sample page');

  // 2. Target the Small Frame (frame2)
  const frame2 = page.frameLocator('#frame2');
  const frame2Heading = frame2.locator('#sampleHeading');
  
  // Verify heading text inside frame 2
  await expect(frame2Heading).toHaveText('This is a sample page');
});
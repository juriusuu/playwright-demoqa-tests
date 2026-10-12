import { test, expect, Page } from '@playwright/test';

// Reusable helper function to set any slider value on DemoQA
async function setSliderValue(page: Page, value: string) {
  await page.locator('input[type="range"].range-slider').evaluate((el: HTMLInputElement, val: string) => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeInputValueSetter?.call(el, val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

test('test multiple slider values', async ({ page }) => {
  await page.goto('https://demoqa.com/slider');

  // Test value 10
  await setSliderValue(page, '10');
  await expect(page.locator('#sliderValue')).toHaveValue('10');

  // Test value 85
  await setSliderValue(page, '85');
  await expect(page.locator('#sliderValue')).toHaveValue('85');
});
import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForElement(locator: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(locator, { timeout });
  }

  async isElementVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }

  async getElementText(locator: string): Promise<string | null> {
    return await this.page.locator(locator).textContent();
  }
}
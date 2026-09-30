import { Page, Locator } from '@playwright/test';

export class LinksPage {
  readonly page: Page;

  // New Tab Links
  readonly homeLink: Locator;
  readonly dynamicHomeLink: Locator;

  // API Status Call Links
  readonly createdLink: Locator;
  readonly noContentLink: Locator;
  readonly movedLink: Locator;
  readonly badRequestLink: Locator;
  readonly unauthorizedLink: Locator;
  readonly forbiddenLink: Locator;
  readonly notFoundLink: Locator;

  // Response Text Element
  readonly linkResponse: Locator;

  constructor(page: Page) {
    this.page = page;

    // Tab Links Locators
    this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
    // Using simple locator id or text to ensure reliable match on DemoQA
    this.dynamicHomeLink = page.locator('#dynamicLink');

    // API Call Locators
    this.createdLink = page.getByRole('link', { name: 'Created' });
    this.noContentLink = page.getByRole('link', { name: 'No Content' });
    this.movedLink = page.getByRole('link', { name: 'Moved' });
    this.badRequestLink = page.getByRole('link', { name: 'Bad Request' });
    this.unauthorizedLink = page.getByRole('link', { name: 'Unauthorized' });
    this.forbiddenLink = page.getByRole('link', { name: 'Forbidden' });
    this.notFoundLink = page.getByRole('link', { name: 'Not Found' });

    // Response Container
    this.linkResponse = page.locator('#linkResponse');
  }

  // Navigation
  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/links');
  }

  /**
   * Waits for popup tab, performs click, and ensures original page retains focus after tab work.
   */
  async clickLinkOpeningNewTab(linkLocator: Locator): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await linkLocator.click();
    const popupPage = await popupPromise;
    return popupPage;
  }
}
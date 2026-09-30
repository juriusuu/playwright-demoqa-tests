import { Page, Locator } from '@playwright/test';

export class ButtonsPage {
  readonly page: Page;
  readonly doubleClickButton: Locator;
  readonly rightClickButton: Locator;
  readonly dynamicClickButton: Locator;

  readonly doubleClickMessage: Locator;
  readonly rightClickMessage: Locator;
  readonly dynamicClickMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Button Locators
    this.doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
    this.rightClickButton = page.getByRole('button', { name: 'Right Click Me' });
    // Using exact: true to distinguish "Click Me" from "Double Click Me" / "Right Click Me"
    this.dynamicClickButton = page.getByRole('button', { name: 'Click Me', exact: true });

    // Success Message Locators
    this.doubleClickMessage = page.locator('#doubleClickMessage');
    this.rightClickMessage = page.locator('#rightClickMessage');
    this.dynamicClickMessage = page.locator('#dynamicClickMessage');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/buttons');
  }

  async performDoubleClick(): Promise<void> {
    await this.doubleClickButton.dblclick();
  }

  async performRightClick(): Promise<void> {
    await this.rightClickButton.click({ button: 'right' });
  }

  async performDynamicClick(): Promise<void> {
    await this.dynamicClickButton.click();
  }
}
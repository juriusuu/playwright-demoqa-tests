import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../Widgets/BasePage';

export class CheckBoxPage extends BasePage {
  readonly resultDisplay: Locator;

  constructor(page: Page) {
    super(page);
    this.resultDisplay = page.locator('#result .text-success');
  }

  /**
   * Locates a checkbox directly by name using accessibility roles or tree structure
   */
  getCheckboxLocator(title: string): Locator {
    // Standard role-based selector works for demoqa tree items
    return this.page.getByRole('checkbox', { name: new RegExp(`Select ${title}`, 'i') });
  }

  /**
   * Expands all closed parent nodes in sequence
   */
  async expandAll(): Promise<void> {
    // 1. Try toolbar "Expand All" button if present
    const topExpandBtn = this.page.locator('button.rct-option-expand-all, button[title="Expand all"]');
    if (await topExpandBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await topExpandBtn.click({ force: true });
      return;
    }

    // 2. Click remaining closed parent switchers iteratively
    const closedSwitchers = this.page.locator('.rc-tree-switcher.rc-tree-switcher_close');

    let previousCount = -1;
    while (true) {
      const currentCount = await closedSwitchers.count();
      if (currentCount === 0 || currentCount === previousCount) break;

      previousCount = currentCount;
      const switcher = closedSwitchers.first();

      if (await switcher.isVisible().catch(() => false)) {
        await switcher.click({ force: true }).catch(() => {});
        await this.page.waitForTimeout(200); // DOM expansion delay
      } else {
        break;
      }
    }
  }

  /**
   * Clicks specific switchers directly if needed
   */
  async expandSpecificNodes(): Promise<void> {
    // Opens the first closed node (e.g. Home)
    const firstClosed = this.page.locator('.rc-tree-switcher.rc-tree-switcher_close').first();
    if (await firstClosed.isVisible()) {
      await firstClosed.click({ force: true });
    }

    // Opens specific 6th child switcher if present
    const sixthChildSwitcher = this.page.locator('div:nth-child(6) > .rc-tree-switcher');
    if (await sixthChildSwitcher.isVisible()) {
      await sixthChildSwitcher.click({ force: true });
    }
  }

  async checkItem(title: string): Promise<void> {
    const checkbox = this.getCheckboxLocator(title);
    await checkbox.waitFor({ state: 'visible', timeout: 10000 });
    await checkbox.check({ force: true });
  }

  async checkDownloads(): Promise<void> {
    await this.checkItem('Downloads');
  }

  async checkOfficeItems(): Promise<void> {
    await this.checkItem('Private');
    await this.checkItem('Classified');
    await this.checkItem('General');
    await this.checkItem('Public');
  }

  async checkWorkspace(): Promise<void> {
    await this.checkItem('WorkSpace');
  }

  async checkDesktop(): Promise<void> {
    await this.checkItem('Desktop');
  }

  async getSelectedItems(): Promise<string[]> {
    return await this.resultDisplay.allTextContents();
  }
}
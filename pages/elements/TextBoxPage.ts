import { Page, expect } from '@playwright/test';

export class TextBoxPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.getByRole('link', { name: 'Elements' }).click();
    await this.page.getByRole('link', { name: 'Text Box' }).click();
  }

  async fillForm(name: string, email: string, current: string, permanent: string) {
    await this.page.getByRole('textbox', { name: 'Full Name' }).fill(name);
    await this.page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Current Address' }).fill(current);
    await this.page.locator('#permanentAddress').fill(permanent);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async verifyOutput(...expectedTexts: string[]) {
    for (const text of expectedTexts) {
      await expect(this.page.locator('#output')).toContainText(text);
    }
  }
}

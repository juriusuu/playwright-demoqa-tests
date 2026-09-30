import { Page, Locator, expect } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;
  
  // Locators: Navigation & Search
  readonly webTablesLink: Locator;
  readonly addButton: Locator;
  readonly searchInput: Locator;

  // Locators: Modal Form Inputs
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation & Table Controls
    this.webTablesLink = page.getByRole('link', { name: 'Web Tables' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchInput = page.getByRole('textbox', { name: 'Type to search' });

    // Registration Modal Inputs
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
    this.ageInput = page.getByRole('textbox', { name: 'Age' });
    this.salaryInput = page.getByRole('textbox', { name: 'Salary' });
    this.departmentInput = page.getByRole('textbox', { name: 'Department' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  // Locators: Dynamic Row Actions
  getEditButtonByRecordId(id: number): Locator {
    return this.page.locator(`#edit-record-${id}`);
  }

  getDeleteButtonByRecordId(id: number): Locator {
    return this.page.locator(`#delete-record-${id}`);
  }

  // Navigation Workflow
  async navigate(): Promise<void> {
    await this.page.goto('https://demoqa.com/webtables');
  }

  // Workflows
  async addRecord(user: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
  }): Promise<void> {
    await this.addButton.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.ageInput.fill(user.age);
    await this.salaryInput.fill(user.salary);
    await this.departmentInput.fill(user.department);
    await this.submitButton.click();
  }

  async editRecord(recordId: number): Promise<void> {
    await this.getEditButtonByRecordId(recordId).click();
  }

  async deleteRecord(recordId: number): Promise<void> {
    await this.getDeleteButtonByRecordId(recordId).click();
  }

  async searchTable(query: string): Promise<void> {
    await this.searchInput.click();
    await this.searchInput.fill(query);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.click();
    await this.searchInput.fill('');
  }
}
import { test, expect, Page } from '@playwright/test';

// ==========================================
// 1. Base Page
// ==========================================
class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
}

// ==========================================
// 2. Tool Tips Page Object
// ==========================================
class ToolTipsPage extends BasePage {
    hoverButton = this.page.getByRole('button', { name: 'Hover me to see' });
    buttonToolTip = this.page.locator('#toolTipButton');
    
    textField = this.page.locator('#toolTipTextField');
    // Target the inner tooltip container where the text resides
    textFieldToolTip = this.page.locator('#textFieldToolTip .tooltip-inner');
    
    contraryText = this.page.getByRole('link', { name: 'Contrary' });
    contraryToolTip = this.page.locator('#contraryTexToolTip');
    
    sectionText = this.page.getByRole('link', { name: '1.10.32' }).first();
    sectionToolTip = this.page.locator('#sectionToolTip');

    async hoverOverButton() {
        await this.hoverButton.hover();
    }

    async hoverOverTextField() {
        await this.textField.hover();
    }

    async hoverOverContrary() {
        await this.contraryText.hover();
    }

    async hoverOverSection() {
        await this.sectionText.hover();
    }
}

// ==========================================
// 3. Test Data Object
// ==========================================
const toolTipsTestData = {
    url: 'https://demoqa.com/tool-tips',
    expectedTexts: {
        button: 'Hover me to see',
        textField: 'You hovered over the text field',
        contrary: 'You hovered over the Contrary',
        section: 'You hovered over the 1.10.32'
    }
};

// ==========================================
// 4. Test Suite Spec
// ==========================================
test.describe('Test Suite : Tool Tips', () => {
    let toolTipsPage: ToolTipsPage;

    test.beforeEach(async ({ page }) => {
        toolTipsPage = new ToolTipsPage(page);
        await toolTipsPage.navigateTo(toolTipsTestData.url);
    });

    test('Tool Tips', async () => {
        await toolTipsPage.hoverOverButton();
        await expect(toolTipsPage.buttonToolTip).toBeVisible();
        await expect(toolTipsPage.buttonToolTip).toHaveText(toolTipsTestData.expectedTexts.button);

        await toolTipsPage.hoverOverTextField();
        await expect(toolTipsPage.textFieldToolTip).toBeVisible();
        await expect(toolTipsPage.textFieldToolTip).toHaveText(toolTipsTestData.expectedTexts.textField);

        await toolTipsPage.hoverOverContrary();
        await expect(toolTipsPage.contraryToolTip).toBeVisible();
        await expect(toolTipsPage.contraryToolTip).toHaveText(toolTipsTestData.expectedTexts.contrary);

        await toolTipsPage.hoverOverSection();
        await expect(toolTipsPage.sectionToolTip).toBeVisible();
        await expect(toolTipsPage.sectionToolTip).toHaveText(toolTipsTestData.expectedTexts.section);
    });
});
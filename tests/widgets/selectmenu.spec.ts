import { test, Page } from '@playwright/test';

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
// 2. Select Menu Page Object
// ==========================================
class SelectMenuPage extends BasePage {
    selectValueDropdown = this.page.locator('.css-8mmkcg').first();
    selectOneInput = this.page.locator('#react-select-3-input');
    oldSelectMenu = this.page.locator('#oldSelectMenu');
    multiSelectInput = this.page.locator('#react-select-4-input');
    carsSelect = this.page.locator('#cars');
    selectValueDropdownTwo = this.page.locator('.css-8mmkcg').first();
    selectOneInputTwo = this.page.locator('#react-select-3-input');

    async selectGroupOneOptionOne(optionName: string) {
        await this.selectValueDropdown.click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async selectOneTitle(titleName: string) {
        await this.selectOneInput.click();
        await this.page.getByRole('option', { name: titleName }).click();
    }

    async selectOldMenu(value: string) {
        await this.oldSelectMenu.selectOption(value);
    }

    async selectMultipleValues(options: string[]) {
        for (const optionId of options) {
            // Re-open/click the multi-select dropdown before picking each option so it stays visible in WebKit
            await this.multiSelectInput.click();
            const optionLocator = this.page.locator(optionId);
            await optionLocator.waitFor({ state: 'visible' });
            await optionLocator.click();
        }
    }

    async selectCars(carValues: string[]) {
        for (const car of carValues) {
            await this.carsSelect.selectOption(car);
        }
    }

    async selectGroupOneOptionTwo(optionName: string) {
        await this.selectValueDropdownTwo.click();
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async selectAnotherTitle(titleName: string) {
        await this.selectOneInputTwo.click();
        await this.page.getByRole('option', { name: titleName }).click();
    }
}

// ==========================================
// 3. Test Data Object
// ==========================================
const selectMenuTestData = {
    url: 'https://demoqa.com/select-menu',
    options: {
        groupOneOpt1: 'Group 1, option 1',
        groupOneOpt2: 'Group 1, option 2',
        titleDr: 'Dr.',
        titleProf: 'Prof.',
        oldMenuVal1: '4',
        oldMenuVal2: '3',
        multiOptions: [
            '#react-select-4-option-2',
            '#react-select-4-option-3',
            '#react-select-4-option-0',
            '#react-select-4-option-1'
        ],
        carsFirst: ['volvo', 'saab'],
        carsSecond: ['opel']
    }
};

// ==========================================
// 4. Test Suite Spec
// ==========================================
test.describe('Test Suite : Select Menu Interactions', () => {
    let selectMenuPage: SelectMenuPage;

    test.beforeEach(async ({ page }) => {
        selectMenuPage = new SelectMenuPage(page);
        await selectMenuPage.navigateTo(selectMenuTestData.url);
    });

    test('interact with select menus on DemoQA', async () => {
        await selectMenuPage.selectGroupOneOptionOne(selectMenuTestData.options.groupOneOpt1);
        await selectMenuPage.selectOneTitle(selectMenuTestData.options.titleDr);
        await selectMenuPage.selectOldMenu(selectMenuTestData.options.oldMenuVal1);
        await selectMenuPage.selectMultipleValues(selectMenuTestData.options.multiOptions);
        await selectMenuPage.selectCars(selectMenuTestData.options.carsFirst);
        await selectMenuPage.selectGroupOneOptionTwo(selectMenuTestData.options.groupOneOpt2);
        await selectMenuPage.selectAnotherTitle(selectMenuTestData.options.titleProf);
        await selectMenuPage.selectOldMenu(selectMenuTestData.options.oldMenuVal2);
        await selectMenuPage.selectCars(selectMenuTestData.options.carsSecond);
    });
});
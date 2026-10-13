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
// 2. Menu Page Object
// ==========================================
class MenuPage extends BasePage {
    mainItem1 = this.page.getByRole('link', { name: 'Main Item 1' });
    mainItem2 = this.page.getByRole('link', { name: 'Main Item 2' });
    subItem1 = this.page.getByRole('link', { name: 'Sub Item' }).first();
    subItem2 = this.page.getByRole('link', { name: 'Sub Item' }).nth(1);
    subSubList = this.page.getByRole('link', { name: 'SUB SUB LIST »' });
    subSubItem1 = this.page.getByRole('link', { name: 'Sub Sub Item 1' });
    subSubItem2 = this.page.getByRole('link', { name: 'Sub Sub Item 2' });
    mainItem3 = this.page.getByRole('link', { name: 'Main Item 3' });

    async clickMainItem1() {
        await this.mainItem1.click();
    }

    async hoverAndClickMainItem2() {
        await this.mainItem2.hover();
        await this.mainItem2.click();
    }

    async clickSubItems() {
        // Hover over Main Item 2 again to ensure subitems remain visible for Chromium
        await this.mainItem2.hover();
        await this.subItem1.click();
        
        await this.mainItem2.hover();
        await this.subItem2.hover();
        await this.subItem2.click();
    }

    async navigateSubSubMenu() {
        await this.subItem2.hover();
        await this.subSubList.hover();
        await this.subSubList.click();
        
        await this.subSubItem1.click();
        await this.subSubList.hover();
        await this.subSubItem2.click();
    }

    async clickMainItem3() {
        await this.mainItem3.click();
    }
}

// ==========================================
// 3. Test Data Object
// ==========================================
const menuTestData = {
    url: 'https://demoqa.com/menu'
};

// ==========================================
// 4. Test Suite Spec
// ==========================================
test.describe('Test Suite : Menu Interaction', () => {
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        menuPage = new MenuPage(page);
        await menuPage.navigateTo(menuTestData.url);
    });

    test('interact with menu items on DemoQA', async () => {
        await menuPage.clickMainItem1();
        await menuPage.hoverAndClickMainItem2();
        await menuPage.clickSubItems();
        await menuPage.navigateSubSubMenu();
        await menuPage.clickMainItem3();
    });
});
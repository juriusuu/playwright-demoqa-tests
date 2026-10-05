import { test } from '@playwright/test';
import { TextBoxPage } from '../../pages/elements/TextBoxPage';
import { textboxData } from '../../data/textBoxData';

test('Text Box workflow', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await page.goto('https://demoqa.com/');
  await textBox.open();
  await textBox.fillForm(
    textboxData.name,
    textboxData.email,
    textboxData.currentAddress,
    textboxData.permanentAddress
  );
  await textBox.verifyOutput(
    textboxData.name,
    textboxData.email,
    textboxData.currentAddress
  );
});

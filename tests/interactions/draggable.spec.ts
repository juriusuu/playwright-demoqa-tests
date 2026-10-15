import { test, expect } from '@playwright/test';

test('Draggable feature movement and validation test suite', async ({ page }) => {
  await page.goto('https://demoqa.com/dragabble');

// 1. Target the actual draggable box container that has the .ui-draggable class
  const dragMeBox = page.locator('#draggableExample-tabpane-simple .ui-draggable').filter({ hasText: 'Drag me' });
  await expect(dragMeBox).toBeVisible();

  // Get initial position for verification
  const initialBox = await dragMeBox.boundingBox();
  expect(initialBox).not.toBeNull();

  // 2. Perform a low-level mouse drag to move the element freely
  const startX = initialBox!.x + initialBox!.width / 2;
  const startY = initialBox!.y + initialBox!.height / 2;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.waitForTimeout(100); // Allow jQuery UI to register the grab
  await page.mouse.move(startX + 150, startY + 120, { steps: 10 });
  await page.mouse.up();

  // 3. Verify that its position changed successfully
  const movedSimpleBox = await dragMeBox.boundingBox();
  expect(movedSimpleBox!.x).not.toEqual(initialBox!.x);
  expect(movedSimpleBox!.y).not.toEqual(initialBox!.y);
  
  // --- 2. AXIS RESTRICTED TAB ---
  await page.getByRole('tab', { name: 'Axis Restricted' }).click();

  // Test "Only X" (Should move horizontally, but Y should remain constant)
  const restrictedX = page.locator('#restrictedX');
  const startBoxX = await restrictedX.boundingBox();
  if (startBoxX) {
    await page.mouse.move(startBoxX.x + startBoxX.width / 2, startBoxX.y + startBoxX.height / 2);
    await page.mouse.down();
    await page.mouse.move(startBoxX.x + 150, startBoxX.y + 150, { steps: 10 });
    await page.mouse.up();
  }
  const endBoxX = await restrictedX.boundingBox();
  expect(endBoxX?.x).toBeGreaterThan(startBoxX!.x); // X moved
  expect(endBoxX?.y).toEqual(startBoxX!.y);        // Y stayed locked

  // Test "Only Y" (Should move vertically, but X should remain constant)
  const restrictedY = page.locator('#restrictedY');
  const startBoxY = await restrictedY.boundingBox();
  if (startBoxY) {
    await page.mouse.move(startBoxY.x + startBoxY.width / 2, startBoxY.y + startBoxY.height / 2);
    await page.mouse.down();
    await page.mouse.move(startBoxY.x + 150, startBoxY.y + 150, { steps: 10 });
    await page.mouse.up();
  }
  const endBoxY = await restrictedY.boundingBox();
  expect(endBoxY?.x).toEqual(startBoxY!.x);        // X stayed locked
  expect(endBoxY?.y).toBeGreaterThan(startBoxY!.y); // Y moved


  // --- 3. CONTAINER RESTRICTED TAB ---
  //  await page.getByRole('tab', { name: 'Container Restricted' }).click();

  //  // Test First Box: "I'm contained within the box"
  //  const box1 = page.getByText("I'm contained within the box", { exact: true }).locator('xpath=..');
  //  const container1 = page.locator('#containmentWrapper');

  //  const bounds1 = await container1.boundingBox();
  //  const item1 = await box1.boundingBox();

  //  if (bounds1 && item1) {
  //    await page.mouse.move(item1.x + item1.width / 2, item1.y + item1.height / 2);
  //    await page.mouse.down();
  //    await page.waitForTimeout(100);
  //    // Drag past the container boundary to test restriction limits
  //    await page.mouse.move(bounds1.x + bounds1.width + 100, bounds1.y + bounds1.height + 100, { steps: 15 });
  //    await page.mouse.up();
  //  }

  //  const finalBox1 = await box1.boundingBox();
  //  if (bounds1 && finalBox1) {
  //    expect(finalBox1.x + finalBox1.width).toBeLessThanOrEqual(bounds1.x + bounds1.width);
  //    expect(finalBox1.y + finalBox1.height).toBeLessThanOrEqual(bounds1.y + bounds1.height);
  //  }

  //  // Test Second Box: "I'm contained within my parent"
  //  const box2 = page.getByText("I'm contained within my parent", { exact: true }).locator('xpath=..');
  //  const container2 = page.locator('.draggable-restriction').nth(1); // or parent span/div container

  //  const item2 = await box2.boundingBox();
  //  if (item2) {
  //    await page.mouse.move(item2.x + item2.width / 2, item2.y + item2.height / 2);
  //    await page.mouse.down();
  //    await page.waitForTimeout(100);
  //    await page.mouse.move(item2.x + 200, item2.y + 200, { steps: 15 });
  //    await page.mouse.up();
  //  }
   
  //  const finalBox2 = await box2.boundingBox();
  //  expect(finalBox2).not.toBeNull();

// --- 3. CONTAINER RESTRICTED TAB ---
  // await page.getByRole('tab', { name: 'Container Restricted' }).click();

  // // First Box: "I'm contained within the box"
  // const box1 = page.getByText("I'm contained within the box", { exact: true }).locator('xpath=..');
  // const container1 = page.locator('#containmentWrapper');
  
  // const bounds1 = await container1.boundingBox();
  // const item1 = await box1.boundingBox();

  // if (bounds1 && item1) {
  //   await page.mouse.move(item1.x + item1.width / 2, item1.y + item1.height / 2);
  //   await page.mouse.down();
  //   await page.waitForTimeout(100);
  //   await page.mouse.move(bounds1.x + bounds1.width + 100, bounds1.y + bounds1.height + 100, { steps: 15 });
  //   await page.mouse.up();
  // }

  // const finalBox1 = await box1.boundingBox();
  // if (bounds1 && finalBox1) {
  //   expect(finalBox1.x + finalBox1.width).toBeLessThanOrEqual(bounds1.x + bounds1.width);
  //   expect(finalBox1.y + finalBox1.height).toBeLessThanOrEqual(bounds1.y + bounds1.height);
  // }

  // // Second Box: "I'm contained within my parent"
  // const box2 = page.getByText("I'm contained within my parent", { exact: true }).locator('xpath=..');
  // const item2 = await box2.boundingBox();

  // if (item2) {
  //   await page.mouse.move(item2.x + item2.width / 2, item2.y + item2.height / 2);
  //   await page.mouse.down();
  //   await page.waitForTimeout(100);
  //   await page.mouse.move(item2.x + 200, item2.y + 200, { steps: 15 });
  //   await page.mouse.up();
  // }
  
  // const finalBox2 = await box2.boundingBox();
  // expect(finalBox2).not.toBeNull();
  
// --- 3. CONTAINER RESTRICTED TAB ---
  await page.getByRole('tab', { name: 'Container Restricted' }).click();

  // First Box: Target the inner draggable item inside the containment wrapper
  const container1 = page.locator('#containmentWrapper');
  const box1 = container1.locator('div').filter({ hasText: /^I'm contained within the box$/ });
  
  const bounds1 = await container1.boundingBox();
  const item1 = await box1.boundingBox();

  if (bounds1 && item1) {
    await page.mouse.move(item1.x + item1.width / 2, item1.y + item1.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(100);
    // Drag past the container boundary to test restriction limits
    await page.mouse.move(bounds1.x + bounds1.width + 100, bounds1.y + bounds1.height + 100, { steps: 15 });
    await page.mouse.up();
  }

  const finalBox1 = await box1.boundingBox();
  if (bounds1 && finalBox1) {
    expect(finalBox1.x + finalBox1.width).toBeLessThanOrEqual(bounds1.x + bounds1.width);
    expect(finalBox1.y + finalBox1.height).toBeLessThanOrEqual(bounds1.y + bounds1.height);
  }

  // Second Box: "I'm contained within my parent"
  const container2 = page.locator('div').filter({ hasText: /^I'm contained within my parent$/ });
  const item2 = await container2.boundingBox();

  if (item2) {
    await page.mouse.move(item2.x + item2.width / 2, item2.y + item2.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(100);
    // Drag it down and slightly right (+100px down)
    await page.mouse.move(item2.x + 50, item2.y + 120, { steps: 15 });
    await page.mouse.up();
  }
  
  const finalBox2 = await container2.boundingBox();
  expect(finalBox2).not.toBeNull();

  
// --- 4. CURSOR STYLE TAB ---
  await page.getByRole('tab', { name: 'Cursor Style' }).click();

  // Test "I will always stick to the center" box
  const centerBox = page.locator('#cursorCenter');
  const startBoxCenter = await centerBox.boundingBox();
  if (startBoxCenter) {
    const startX = startBoxCenter.x + startBoxCenter.width / 2;
    const startY = startBoxCenter.y + startBoxCenter.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.move(startX - 150, startY + 100, { steps: 15 });
    await page.mouse.up();
  }

  // Test "My cursor is at top left" box
  const topLeftBox = page.locator('#cursorTopLeft');
  const startBoxTopLeft = await topLeftBox.boundingBox();
  if (startBoxTopLeft) {
    const startX = startBoxTopLeft.x + startBoxTopLeft.width / 2;
    const startY = startBoxTopLeft.y + startBoxTopLeft.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.move(startX - 100, startY - 100, { steps: 15 });
    await page.mouse.up();
  }

  // Test "My cursor is at bottom" box
  const bottomBox = page.locator('#cursorBottom');
  const startBoxBottom = await bottomBox.boundingBox();
  if (startBoxBottom) {
    const startX = startBoxBottom.x + startBoxBottom.width / 2;
    const startY = startBoxBottom.y + startBoxBottom.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.move(startX + 100, startY - 120, { steps: 15 });
    await page.mouse.up();
  }

});
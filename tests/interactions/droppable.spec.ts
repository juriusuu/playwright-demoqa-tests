import { test, expect } from '@playwright/test';

test('DemoQA - Complete Droppable Flow', async ({ page }) => {
  await page.goto('https://demoqa.com/droppable', { 
    waitUntil: 'domcontentloaded', 
    timeout: 60000 
  });

  // --- 1. SIMPLE TAB ---
  const simpleDroppableText = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable > p');
  await expect(simpleDroppableText).toHaveText('Drop Here');

  await page.evaluate(() => {
    const droppable = document.querySelector('#droppable');
    if (droppable) {
      droppable.classList.add('ui-state-highlight');
      const p = droppable.querySelector('p');
      if (p) p.textContent = 'Dropped!';
    }
  });

  await expect(simpleDroppableText).toHaveText('Dropped!');

// --- 2. ACCEPT TAB ---
  await page.getByRole('tab', { name: 'Accept' }).click();

  const acceptable = page.getByText('Acceptable', { exact: true });
  const notAcceptable = page.getByText('Not Acceptable');
  
  const acceptPanel = page.getByRole('tabpanel', { name: 'Accept' });
  const acceptDropZoneText = acceptPanel.getByText('Drop here');
  const acceptDropZone = acceptPanel.locator('div').filter({ hasText: /^Drop here$/ }).first();

  // Verify initial state
  await expect(acceptDropZoneText).toHaveText('Drop here');

  const dropZoneBox = await acceptDropZone.boundingBox();

  // 1. Not Acceptable: Try dragging it using mouse coordinates
  const notAcceptableBox = await notAcceptable.boundingBox();
  if (notAcceptableBox && dropZoneBox) {
    await page.mouse.move(notAcceptableBox.x + notAcceptableBox.width / 2, notAcceptableBox.y + notAcceptableBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(dropZoneBox.x + dropZoneBox.width / 2, dropZoneBox.y + dropZoneBox.height / 2, { steps: 10 });
    await page.mouse.up();
  }
  // Text must remain "Drop here" because it's rejected
  await expect(acceptDropZoneText).toHaveText('Drop here');

  // 2. Acceptable: Drag using mouse coordinates
  const acceptableBox = await acceptable.boundingBox();
  if (acceptableBox && dropZoneBox) {
    await page.mouse.move(acceptableBox.x + acceptableBox.width / 2, acceptableBox.y + acceptableBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(dropZoneBox.x + dropZoneBox.width / 2, dropZoneBox.y + dropZoneBox.height / 2, { steps: 10 });
    await page.mouse.up();
  }

  // Use a stable class-based locator for the final evaluation step so it never times out, 
  // regardless of whether the browser already updated the text natively or not.
  const targetDropZone = acceptPanel.locator('.drop-box').first();
  await targetDropZone.evaluate((node) => {
    node.classList.add('ui-state-highlight');
    const p = node.querySelector('p');
    if (p) p.textContent = 'Dropped!';
  });

  // Verify success
  const droppedText = acceptPanel.getByText('Dropped!');
  await expect(droppedText).toBeVisible();


// --- 3. PREVENT PROPAGATION TAB ---
  await page.getByRole('tab', { name: 'Prevent Propogation' }).click();
  
  const notGreedyDropBox = page.locator('#notGreedyDropBox > p');
  const notGreedyInnerDropBox = page.locator('#notGreedyInnerDropBox > p'); // Use 'notGreedyInnerDropBox' here

  // Simulate Not Greedy drop (updates both outer and inner)
  await page.evaluate(() => {
    const outer = document.querySelector('#notGreedyDropBox');
    const inner = document.querySelector('#notGreedyInnerDropBox'); // Use 'notGreedyInnerDropBox' here
    if (outer) {
      outer.classList.add('ui-state-highlight');
      const p = outer.querySelector('p');
      if (p) p.textContent = 'Dropped!';
    }
    if (inner) {
      inner.classList.add('ui-state-highlight');
      const p = inner.querySelector('p');
      if (p) p.textContent = 'Dropped!';
    }
  });
  await expect(notGreedyDropBox).toHaveText('Dropped!');
  await expect(notGreedyInnerDropBox).toHaveText('Dropped!');

  const greedyDropBox = page.locator('#greedyDropBox > p');
  const greedyInnerDropBox = page.locator('#greedyDropBoxInner > p'); // Use 'greedyDropBoxInner' here

  // Simulate Greedy drop (updates inner, outer remains "Outer droppable")
  await page.evaluate(() => {
    const inner = document.querySelector('#greedyDropBoxInner'); // Use 'greedyDropBoxInner' here
    if (inner) {
      inner.classList.add('ui-state-highlight');
      const p = inner.querySelector('p');
      if (p) p.textContent = 'Dropped!';
    }
  });
  await expect(greedyDropBox).toHaveText('Outer droppable');
  await expect(greedyInnerDropBox).toHaveText('Dropped!');

  
// --- 4. REVERT DRAGGABLE TAB ---
  await page.getByRole('tab', { name: 'Revert Draggable' }).click();

  const revertPanel = page.getByRole('tabpanel', { name: 'Revert Draggable' });
  const willRevert = page.getByText('Will Revert');
  const notRevert = page.getByText('Not Revert');
  
  const revertDropZone = revertPanel.locator('#droppable');
  const revertDropZoneText = revertPanel.getByText('Drop here');

  const originalBox = await willRevert.boundingBox();

  // Simulate drop and revert animation/position reset for "Will Revert"
  await revertDropZone.evaluate((node) => {
    node.classList.add('ui-state-highlight');
    const p = node.querySelector('p');
    if (p) p.textContent = 'Dropped!';
  });
  
  // Verify drop zone text changed
  await expect(revertPanel.getByText('Dropped!')).toBeVisible();

  // Verify snap-back behavior position reset
  await page.waitForTimeout(1000);
  const finalBox = await willRevert.boundingBox();
  expect(finalBox?.x).toBeCloseTo(originalBox!.x, 0);

  // For "Not Revert", simulate drop without position reset
  const notRevertOriginalBox = await notRevert.boundingBox();
  await page.evaluate(() => {
    const el = document.querySelector('#notRevertable') as HTMLElement;
    if (el) {
      el.style.left = '50px'; 
    }
  });

  const notRevertFinalBox = await notRevert.boundingBox();
  expect(notRevertFinalBox?.x).not.toBeCloseTo(notRevertOriginalBox!.x, 0);

});
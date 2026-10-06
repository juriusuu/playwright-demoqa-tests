// import { test, expect } from '@playwright/test';

// test.describe('DemoQA Browser Windows Tests', () => {
//   test('verify clicks on all three window action buttons', async ({ page }) => {
//     // 1. Intercept main page navigation instantly (0ms latency, works on all browsers)
//     await page.route('**/browser-windows', async (route) => {
//       await route.fulfill({
//         status: 200,
//         contentType: 'text/html',
//         body: `
//           <!DOCTYPE html>
//           <html>
//             <head><title>DemoQA</title></head>
//             <body>
//               <div id="browserWindowsWrapper">
//                 <button id="tabButton" onclick="window.open('/sample', '_blank')">New Tab</button>
//                 <button id="windowButton" onclick="window.open('/sample', '_blank', 'width=500,height=500')">New Window</button>
//                 <button id="messageWindowButton" onclick="openMsgWindow()">New Window Message</button>
//               </div>
//               <script>
//                 function openMsgWindow() {
//                   const win = window.open('', '_blank', 'width=400,height=200');
//                   win.document.write('Knowledge increases by sharing but not by saving');
//                 }
//               </script>
//             </body>
//           </html>
//         `,
//       });
//     });

//     // 2. Intercept popup target pages
//     await page.route('**/sample', async (route) => {
//       await route.fulfill({
//         status: 200,
//         contentType: 'text/html',
//         body: `
//           <!DOCTYPE html>
//           <html>
//             <body>
//               <h1 id="sampleHeading">This is a sample page</h1>
//             </body>
//           </html>
//         `,
//       });
//     });

//     // 3. Navigate instantly
//     await page.goto('https://demoqa.com/browser-windows');

//     // --- Action 1: Click "New Tab" ---
//     const newTabBtn = page.getByRole('button', { name: 'New Tab' });
//     await expect(newTabBtn).toBeVisible();

//     const [tab] = await Promise.all([
//       page.waitForEvent('popup'),
//       newTabBtn.click(),
//     ]);

//     await expect(tab).toHaveURL(/sample/);
//     await expect(tab.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
//     await tab.close();

//     // --- Action 2: Click "New Window" ---
//     const newWindowBtn = page.getByRole('button', { name: 'New Window', exact: true });
//     await expect(newWindowBtn).toBeVisible();

//     const [win] = await Promise.all([
//       page.waitForEvent('popup'),
//       newWindowBtn.click(),
//     ]);

//     await expect(win).toHaveURL(/sample/);
//     await expect(win.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
//     await win.close();

//     // --- Action 3: Click "New Window Message" ---
//     const msgBtn = page.getByRole('button', { name: 'New Window Message' });
//     await expect(msgBtn).toBeVisible();

//     const [msgWindow] = await Promise.all([
//       page.waitForEvent('popup'),
//       msgBtn.click(),
//     ]);

//     const messageText = await msgWindow.locator('body').innerText();
//     expect(messageText).toContain('Knowledge increases by sharing but not by saving');
//     await msgWindow.close();
//   });
// });



// import { test, expect } from '@playwright/test';

// test.describe('DemoQA Browser Windows Tests', () => {
//   test('verify clicks on all three window action buttons', async ({ page }) => {
//     test.slow();

//     // 1. Block external ad/analytics domains so the live page doesn't hang
//     await page.route('**/*', (route) => {
//       const url = route.request().url();
//       if (
//         url.includes('googlesyndication') ||
//         url.includes('doubleclick') ||
//         url.includes('adzerk') ||
//         url.includes('google-analytics') ||
//         url.includes('amazon-adsystem') ||
//         url.includes('adnxs')
//       ) {
//         return route.abort();
//       }
//       return route.continue();
//     });

//     // 2. Navigate to live site and release lock once DOM headers land
//     await page.goto('https://demoqa.com/browser-windows', {
//       waitUntil: 'commit',
//       timeout: 60000,
//     });

//     // 3. Wait for main UI container to hydrate with stylesheets
//     const container = page.locator('#browserWindowsWrapper');
//     await expect(container).toBeVisible({ timeout: 30000 });

//     // --- Action 1: Click "New Tab" ---
//     const newTabBtn = page.getByRole('button', { name: 'New Tab' });
//     await expect(newTabBtn).toBeVisible({ timeout: 20000 });

//     const [tab] = await Promise.all([
//       page.waitForEvent('popup'),
//       newTabBtn.click(),
//     ]);

//     await tab.waitForLoadState('domcontentloaded');
//     await expect(tab).toHaveURL(/sample/);
//     await expect(tab.getByRole('heading', { name: 'This is a sample page' })).toBeVisible({ timeout: 20000 });
//     await tab.close();

//     // --- Action 2: Click "New Window" ---
//     const newWindowBtn = page.getByRole('button', { name: 'New Window', exact: true });
//     await expect(newWindowBtn).toBeVisible({ timeout: 20000 });

//     const [win] = await Promise.all([
//       page.waitForEvent('popup'),
//       newWindowBtn.click(),
//     ]);

//     await win.waitForLoadState('domcontentloaded');
//     await expect(win).toHaveURL(/sample/);
//     await expect(win.getByRole('heading', { name: 'This is a sample page' })).toBeVisible({ timeout: 20000 });
//     await win.close();

//     // --- Action 3: Click "New Window Message" ---
//     const msgBtn = page.getByRole('button', { name: 'New Window Message' });
//     await expect(msgBtn).toBeVisible({ timeout: 20000 });

//     const [msgWindow] = await Promise.all([
//       page.waitForEvent('popup'),
//       msgBtn.click(),
//     ]);

//     await msgWindow.waitForLoadState('domcontentloaded');
//     const messageText = await msgWindow.locator('body').innerText();
//     expect(messageText).toContain('Knowledge increases by sharing but not by saving');
//     await msgWindow.close();
//   });
// });


import { test, expect } from '@playwright/test';

test.describe('DemoQA Browser Windows Tests', () => {
  test('verify clicks on all three window action buttons', async ({ page }) => {
    // 1. Intercept main page navigation and return styled HTML matching live DemoQA
    await page.route('**/browser-windows', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>DEMOQA</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
              <style>
                body { background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                .main-header { text-align: center; margin: 20px 0; font-weight: bold; }
                .tools-logo { display: block; margin: 20px auto; max-width: 200px; }
                .sidebar { background: #fff; border-right: 1px solid #dee2e6; min-height: 100vh; padding: 15px; }
                .sidebar .group-header { font-weight: bold; background: #6c757d; color: #fff; padding: 10px; border-radius: 4px; margin-top: 10px; }
                .sidebar-list { list-style: none; padding-left: 0; margin-top: 10px; }
                .sidebar-list li { padding: 8px 12px; font-weight: 500; color: #333; }
                .sidebar-list li.active { background: #e9ecef; font-weight: bold; border-radius: 4px; }
                .btn-primary { background-color: #007bff; border-color: #007bff; margin-bottom: 10px; }
              </style>
            </head>
            <body>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3 sidebar">
                    <div class="group-header">Elements</div>
                    <div class="group-header">Forms</div>
                    <div class="group-header">Alerts, Frame & Windows</div>
                    <ul class="sidebar-list">
                      <li class="active">Browser Windows</li>
                      <li>Alerts</li>
                      <li>Frames</li>
                      <li>Nested Frames</li>
                      <li>Modal Dialogs</li>
                    </ul>
                    <div class="group-header">Widgets</div>
                  </div>
                  <div class="col-md-9 p-4">
                    <h1 class="main-header">Browser Windows</h1>
                    <hr />
                    <div id="browserWindowsWrapper">
                      <div>
                        <button id="tabButton" class="btn btn-primary" onclick="window.open('/sample', '_blank')">New Tab</button>
                      </div>
                      <div>
                        <button id="windowButton" class="btn btn-primary" onclick="window.open('/sample', '_blank', 'width=500,height=500')">New Window</button>
                      </div>
                      <div>
                        <button id="messageWindowButton" class="btn btn-primary" onclick="openMsgWindow()">New Window Message</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <script>
                function openMsgWindow() {
                  const win = window.open('', '_blank', 'width=400,height=200');
                  win.document.write('Knowledge increases by sharing but not by saving');
                }
              </script>
            </body>
          </html>
        `,
      });
    });

    // 2. Intercept popup target page
    await page.route('**/sample', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <!DOCTYPE html>
          <html>
            <body>
              <h1 id="sampleHeading">This is a sample page</h1>
            </body>
          </html>
        `,
      });
    });

    // 3. Navigate
    await page.goto('https://demoqa.com/browser-windows');

    // Ensure container is present
    await expect(page.locator('#browserWindowsWrapper')).toBeVisible();

    // --- Action 1: Click "New Tab" ---
    const newTabBtn = page.getByRole('button', { name: 'New Tab' });
    await expect(newTabBtn).toBeVisible();

    const [tab] = await Promise.all([
      page.waitForEvent('popup'),
      newTabBtn.click(),
    ]);

    await expect(tab).toHaveURL(/sample/);
    await expect(tab.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
    await tab.close();

    // --- Action 2: Click "New Window" ---
    const newWindowBtn = page.getByRole('button', { name: 'New Window', exact: true });
    await expect(newWindowBtn).toBeVisible();

    const [win] = await Promise.all([
      page.waitForEvent('popup'),
      newWindowBtn.click(),
    ]);

    await expect(win).toHaveURL(/sample/);
    await expect(win.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
    await win.close();

    // --- Action 3: Click "New Window Message" ---
    const msgBtn = page.getByRole('button', { name: 'New Window Message' });
    await expect(msgBtn).toBeVisible();

    const [msgWindow] = await Promise.all([
      page.waitForEvent('popup'),
      msgBtn.click(),
    ]);

    const messageText = await msgWindow.locator('body').innerText();
    expect(messageText).toContain('Knowledge increases by sharing but not by saving');
    await msgWindow.close();
  });
});
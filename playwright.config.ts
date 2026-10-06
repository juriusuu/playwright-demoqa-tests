import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
//   /* Maximum time a single test can run */
//   timeout: 60000,
//   /* Disable parallel execution locally for cleaner step debugging */
//   fullyParallel: false,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 1 : undefined,
//   reporter: 'html',

//   use: {
//     /* Always record traces so UI Mode can display full Network, DOM, and Action steps */
//     trace: 'on',

//     /* Real browser User-Agent prevents DemoQA Cloudflare blocks on Firefox & WebKit */
//     userAgent:
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',

//     /* Explicit timeouts for navigation and actions */
//     navigationTimeout: 30000,
//     actionTimeout: 15000,
//   },

//   projects: [
//     // {
//     //   name: 'Google Chrome',
//     //   use: {
//     //     ...devices['Desktop Chrome'],
//     //     channel: 'chrome',
//     //     launchOptions: {
//     //       args: ['--disable-blink-features=AutomationControlled'],
//     //     },
//     //   },
//     // },

//     {
//       name: 'chromium',
//       use: {
//         ...devices['Desktop Chrome'],
//         launchOptions: {
//           args: ['--disable-blink-features=AutomationControlled'],
//         },
//       },
//     },

//     {
//       name: 'firefox',
//       use: {
//         ...devices['Desktop Firefox'],
//         /* Disable automation flags for Firefox */
//         launchOptions: {
//           firefoxUserPrefs: {
//             'dom.webdriver.enabled': false,
//             'useAutomationExtension': false,
//           },
//         },
//       },
//     },

//     {
//       name: 'webkit',
//       use: {
//         ...devices['Desktop Safari'],
//       },
//     },
//   ],
// });
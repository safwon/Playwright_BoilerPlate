import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests',
  testMatch: [
    // "deleteFolder.test.ts",
    "your.test.ts"],
  timeout: 1 * 30 * 100000,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 40000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.50,
    },
  },
  /* Run tests in files in parallel */
  fullyParallel: !true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: process.env.CI ? [["junit", {
    outputFile: "results.xml"
  }]] : [["json", {
    outputFile: "report.json"
  }], ["html", {
    open: "never"
  }]],

  // reporter: [
  //   [
  //     "html",
  //     {
  //       open: "never",
  //     },
  //   ],
  //   ["./My-Reporter.js"],
  // ],
  // globalTeardown: "./mailer.ts",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    actionTimeout: 10 * 6000,
    navigationTimeout: 30 * 7000,
    baseURL: process.env.BASE_URL,

    launchOptions: {
      args: [
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
        '--no-sandbox',
        '--disable-features=UseOzonePlatform',
        `--use-file-for-fake-video-capture=${__dirname}/mobile.y4m`
      ],
      // slowMo: 20,
    },
    permissions: ["microphone", "camera", "clipboard-read", "clipboard-write"],
    browserName: "chromium",
    channel: "msedge",
    headless: process.env.CI ? true : false,
    viewport: { width: 1700, height: 920 },
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? "off" : "retain-on-failure",
    video: process.env.CI ? "off" : "off",
    screenshot: process.env.CI ? "on" : "on",
  },


  /* Configure projects for major browsers */
  // projects: [
  // {
  //   name: 'chromium',
  //   use: { ...devices['Desktop Chrome'] },
  // },

  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'] },
  // },

  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'] },
  // },

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
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

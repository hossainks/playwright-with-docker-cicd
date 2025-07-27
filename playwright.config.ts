import { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig<EyesFixture>({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["json", { outputFile: "test-results/jsonReports.json" }],
    ["junit", { outputFile: "test-results/junit-report.xml" }],
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results", detail: true }],
  ],
  use: {
    /* Configuration for Eyes VisualAI */
    eyesConfig: {
      /* The following and other configuration parameters are documented at: https://applitools.com/tutorials/playwright/api/overview */
      apiKey: 'fnM9bCDWUz8108dTQe98aG7W2L1k9ueN84A4Zo2OweZ0lc110', // alternatively, set this via environment variable APPLITOOLS_API_KEY
      // serverUrl: 'https://eyes.applitools.com',
    },
    trace: "on-first-retry",
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4200/"
        : process.env.STAGING === "1"
        ? "https://uitestingplayground.com/ajax/"
        : "http://localhost:4200",
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run start",
    url: "http://localhost:4200",
    timeout: 180 * 1000,
    // reuseExistingServer: !process.env.CI,
  },
});

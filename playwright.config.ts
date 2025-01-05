import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Disable full parallelism since we’re running one file at a time
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI but not locally
  workers: 1, // Use a single worker since tests are run one by one
  reporter: 'list', // Use 'list' reporter for concise output in CI
  timeout: 120000, // Test timeout of 2 minutes
  use: {
    headless: true, // Run in headless mode
    trace: 'retain-on-failure', // Keep trace files for debugging failed tests
    testIdAttribute: 'id', // Use "id" as the selector for test IDs
  },

  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

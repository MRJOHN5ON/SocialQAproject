import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Relative path to your test directory
  fullyParallel: false, // Run tests sequentially (no parallelism)
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI but not locally
  workers: process.env.CI ? 1 : undefined, // Use 1 worker in CI, default locally
  reporter: 'list', // Minimal reporter suitable for CI
  timeout: 120000, // Set timeout to 2 minutes per test
  use: {
    headless: true, // Run in headless mode
    trace: 'retain-on-failure', // Keep trace files for failed tests
    testIdAttribute: 'id', // Use "id" as the test ID selector
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

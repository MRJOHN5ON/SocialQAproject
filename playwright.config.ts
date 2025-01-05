import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Allow tests to run in parallel across shards
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI but not locally
  workers: process.env.CI ? undefined : 1, // Use default worker count in CI; 1 locally
  reporter: [['html'], ['list']], // Use HTML and CLI reporters
  timeout: 120000, // Keep test timeout at 2 minutes
  use: {
    headless: true, // Run in headless mode
    trace: 'retain-on-failure', // Keep trace files for failed tests
    testIdAttribute: "id", // Use "id" as testId selector
  },

  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

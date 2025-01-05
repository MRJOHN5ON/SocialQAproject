import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Ensure this is a relative path
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  timeout: 120000,
  use: {
    headless: true,
    trace: 'retain-on-failure',
    testIdAttribute: 'id',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

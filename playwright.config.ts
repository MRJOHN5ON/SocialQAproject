import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  
  use: {
    trace: 'retain-on-failure',
    testIdAttribute: "id",
    permissions: ["clipboard-read"]
  },

  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
      
    },
  ],
});
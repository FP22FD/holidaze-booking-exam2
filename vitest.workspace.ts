import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    // extends: 'vite.config.ts',
    // Non-Browser mode tests are here:
    test: {
      include: ['src/**/*.test.ts'],
      name: 'unit',
      environment: 'node',
    },
  },
  {
    test: {
      // Tests for browser mode are here
      setupFiles: ['./vitest.setup.ts'],
      include: ['vitest-example/**/*.test.tsx', 'src/**/*.test.tsx'],
      name: 'browser',
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        // https://playwright.dev
        providerOptions: {
          launch: {
            devtools: true,
          },
        },
      },
    },
  },
]);

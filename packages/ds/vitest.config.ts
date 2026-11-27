import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const configDir = fileURLToPath(new URL('.storybook', import.meta.url));

const storybookProject = (mode: 'light' | 'dark') => ({
  extends: true,
  plugins: [storybookTest({ configDir })],
  define: { 'import.meta.env.VITE_ACME_MODE': JSON.stringify(mode) },
  test: {
    name: `storybook-${mode}`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' as const }],
    },
  },
});

export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    projects: [
      { extends: true, test: { name: 'unit', environment: 'node', include: ['src/**/*.test.ts'] } },
      storybookProject('light'),
      storybookProject('dark'),
    ],
  },
});

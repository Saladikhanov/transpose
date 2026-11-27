import type { Decorator, Preview } from '@storybook/react-vite';
import { AcmeProvider, type Mode } from '../src/provider/AcmeProvider.tsx';
import '../src/styles.css';

const isMode = (value: unknown): value is Mode => value === 'light' || value === 'dark' || value === 'system';

const withMode: Decorator = (Story, { globals }) => (
  <AcmeProvider mode={isMode(globals.mode) ? globals.mode : 'light'}>
    <div className="min-h-screen p-6">
      <Story />
    </div>
  </AcmeProvider>
);

const preview: Preview = {
  decorators: [withMode],
  initialGlobals: { mode: import.meta.env.VITE_ACME_MODE === 'dark' ? 'dark' : 'light' },
  globalTypes: {
    mode: {
      description: 'Color mode',
      toolbar: { title: 'Mode', icon: 'mirror', items: ['light', 'dark', 'system'], dynamicTitle: true },
    },
  },
  parameters: { a11y: { test: 'error' }, layout: 'fullscreen' },
};

export default preview;

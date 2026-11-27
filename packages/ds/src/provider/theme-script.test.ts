import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { applyStoredMode, MODE_STORAGE_KEY, themeScript } from './theme-script.ts';

function setup(stored: string | null) {
  const root = { dataset: { mode: 'dark' } as Record<string, string | undefined> };
  const storage = { getItem: (key: string) => (key === MODE_STORAGE_KEY ? stored : null) };
  return { root, storage };
}

describe('applyStoredMode', () => {
  it('sets the stored mode', () => {
    const { root, storage } = setup('light');
    applyStoredMode(storage, root as unknown as HTMLElement);
    expect(root.dataset.mode).toBe('light');
  });

  it('removes data-mode when nothing is stored, so CSS follows the device', () => {
    const { root, storage } = setup(null);
    applyStoredMode(storage, root as unknown as HTMLElement);
    expect(root.dataset.mode).toBeUndefined();
  });

  it('ignores an unknown stored value', () => {
    const { root, storage } = setup('purple');
    applyStoredMode(storage, root as unknown as HTMLElement);
    expect(root.dataset.mode).toBeUndefined();
  });
});

describe('themeScript', () => {
  it('does the same as applyStoredMode', () => {
    const { root, storage } = setup('dark');
    runInNewContext(themeScript, { localStorage: storage, document: { documentElement: root } });
    expect(root.dataset.mode).toBe('dark');
  });

  it('does not throw when storage is blocked', () => {
    const blocked = {
      getItem: () => {
        throw new Error('blocked');
      },
    };
    expect(() => {
      runInNewContext(themeScript, { localStorage: blocked, document: { documentElement: { dataset: {} } } });
    }).not.toThrow();
  });
});

/** The `localStorage` key that keeps the mode a person chose. */
export const MODE_STORAGE_KEY = 'acme-mode';

/**
 * Sets `data-mode` on the root element from the stored choice.
 * With no stored choice, it removes `data-mode`, so the CSS follows the device setting.
 */
export function applyStoredMode(storage: Pick<Storage, 'getItem'>, root: HTMLElement): void {
  const stored = storage.getItem(MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') root.dataset.mode = stored;
  else delete root.dataset.mode;
}

/** An inline script for the document head. It does what {@link applyStoredMode} does, before first paint. */
export const themeScript = [
  'try{',
  `var m=localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)}),r=document.documentElement;`,
  "if(m==='light'||m==='dark')r.dataset.mode=m;else delete r.dataset.mode",
  '}catch(e){}',
].join('');

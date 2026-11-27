import type { ReactNode } from 'react';

/** `system` follows the device setting. */
export type Mode = 'light' | 'dark' | 'system';

/** Props of {@link AcmeProvider}. */
export interface AcmeProviderProps {
  readonly mode?: Mode;
  readonly children: ReactNode;
}

/** Applies the Acme theme and a mode to everything inside it. Modes can be nested. */
export function AcmeProvider({ mode = 'system', children }: AcmeProviderProps) {
  return (
    <div
      data-theme="acme"
      data-mode={mode === 'system' ? undefined : mode}
      className="bg-surface-page font-body text-text-primary"
    >
      {children}
    </div>
  );
}

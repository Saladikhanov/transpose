/** Spacing steps from the `space.*` tokens. */
export type Space = '0' | '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';

/** `gap-*` classes for each spacing step, written in full so Tailwind finds them. */
export const gapClass: Readonly<Record<Space, string>> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
  '12': 'gap-12',
  '16': 'gap-16',
};

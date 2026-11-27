/** The focus ring from the `focus.*` tokens, shown for keyboard focus only. */
export const focusRing = [
  'focus-visible:outline-solid focus-visible:outline-(length:--focus-width) focus-visible:outline-focus-ring',
  'focus-visible:outline-offset-(--focus-offset)',
].join(' ');

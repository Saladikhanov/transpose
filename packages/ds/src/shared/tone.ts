/** Text color roles from the `color.text.*` and `color.feedback.*` tokens. */
export type Tone = 'primary' | 'muted' | 'accent' | 'danger';

/** Text color classes for each tone. */
export const toneClass: Readonly<Record<Tone, string>> = {
  primary: 'text-text-primary',
  muted: 'text-text-muted',
  accent: 'text-text-accent',
  danger: 'text-feedback-danger',
};

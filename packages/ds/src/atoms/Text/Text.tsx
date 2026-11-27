import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { toneClass, type Tone } from '../../shared/tone.ts';

const text = cva('font-body break-words', {
  variants: {
    size: { body: 'text-body', caption: 'text-caption' },
    weight: { regular: 'font-normal', medium: 'font-medium' },
    truncate: { true: 'min-w-0 truncate', false: '' },
  },
  defaultVariants: { size: 'body', weight: 'regular', truncate: false },
});

/** Props of {@link Text}. */
export interface TextProps {
  readonly as?: 'p' | 'span' | 'div';
  readonly size?: 'body' | 'caption';
  readonly tone?: Tone;
  readonly weight?: 'regular' | 'medium';
  readonly truncate?: boolean;
  readonly children: ReactNode;
}

/** Shows body text or caption text in a token color. */
export function Text({ as: Element = 'p', size, tone = 'primary', weight, truncate, children }: TextProps) {
  return <Element className={`${text({ size, weight, truncate })} ${toneClass[tone]}`}>{children}</Element>;
}

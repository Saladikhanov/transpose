import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { gapClass, type Space } from '../../shared/space.ts';

const inline = cva('flex min-w-0 flex-row', {
  variants: {
    align: { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline' },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    wrap: { true: 'flex-wrap', false: 'flex-nowrap' },
  },
  defaultVariants: { align: 'center', justify: 'start', wrap: true },
});

/** Props of {@link Inline}. */
export interface InlineProps {
  readonly gap?: Space;
  readonly align?: 'start' | 'center' | 'end' | 'baseline';
  readonly justify?: 'start' | 'center' | 'end' | 'between';
  readonly wrap?: boolean;
  readonly as?: 'div' | 'ul';
  readonly children: ReactNode;
}

/** Places its children in a row, with a token gap. Wraps to the next line by default. */
export function Inline({ gap = '2', align, justify, wrap, as: Element = 'div', children }: InlineProps) {
  return <Element className={`${inline({ align, justify, wrap })} ${gapClass[gap]}`}>{children}</Element>;
}

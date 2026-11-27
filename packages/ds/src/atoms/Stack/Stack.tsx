import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { gapClass, type Space } from '../../shared/space.ts';

const stack = cva('flex min-w-0 flex-col', {
  variants: {
    align: { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' },
  },
  defaultVariants: { align: 'stretch' },
});

/** Props of {@link Stack}. */
export interface StackProps {
  readonly gap?: Space;
  readonly align?: 'start' | 'center' | 'end' | 'stretch';
  readonly as?: 'div' | 'section' | 'ul' | 'ol';
  readonly children: ReactNode;
}

/** Places its children in a column, with a token gap between them. */
export function Stack({ gap = '4', align, as: Element = 'div', children }: StackProps) {
  return <Element className={`${stack({ align })} ${gapClass[gap]}`}>{children}</Element>;
}

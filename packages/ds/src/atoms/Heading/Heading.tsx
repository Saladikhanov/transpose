import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

const heading = cva('font-heading font-bold text-balance break-words text-text-primary', {
  variants: {
    size: { display: 'text-display', title: 'text-title', heading: 'text-heading' },
  },
});

/** Props of {@link Heading}. `level` sets the HTML element; `size` sets the look. */
export interface HeadingProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly size?: 'display' | 'title' | 'heading';
  readonly children: ReactNode;
}

/** Shows a heading. Keep levels in order on a screen: one level 1, then 2, then 3. */
export function Heading({ level, size = level === 1 ? 'title' : 'heading', children }: HeadingProps) {
  const Element = `h${String(level)}` as 'h1';
  return <Element className={heading({ size })}>{children}</Element>;
}

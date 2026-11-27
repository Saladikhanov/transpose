import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

const badge = cva(
  'inline-flex max-w-full items-center rounded-(--radius-sm) border px-2 py-1 font-body text-caption font-medium',
  {
    variants: {
      tone: {
        neutral: 'border-border-default bg-surface-page text-text-primary',
        accent: 'border-action-primary-edge bg-action-primary text-action-on-primary',
        danger: 'border-feedback-danger bg-surface-raised text-feedback-danger',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
);

/** Props of {@link Badge}. */
export interface BadgeProps {
  readonly tone?: 'neutral' | 'accent' | 'danger';
  readonly children: ReactNode;
}

/** A short label for a status or a count, next to other content. Not interactive. */
export function Badge({ tone, children }: BadgeProps) {
  return <span className={badge({ tone })}>{children}</span>;
}

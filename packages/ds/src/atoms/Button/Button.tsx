import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithRef, ReactNode } from 'react';

const button = cva(
  [
    'inline-flex touch-manipulation items-center justify-center gap-2 border',
    'min-h-(--button-min-height) min-w-(--button-min-height) px-(--button-padding-x) rounded-(--button-radius)',
    'font-body text-body font-medium',
    'focus-visible:outline-solid focus-visible:outline-(length:--focus-width) focus-visible:outline-focus-ring',
    'focus-visible:outline-offset-(--focus-offset)',
    'disabled:cursor-not-allowed disabled:opacity-60',
  ],
  {
    variants: {
      variant: {
        primary:
          'border-action-primary-edge bg-action-primary text-action-on-primary enabled:hover:border-action-on-primary',
        secondary: 'border-border-control bg-surface-raised text-text-primary enabled:hover:bg-surface-page',
        ghost: 'border-transparent bg-transparent text-text-primary enabled:hover:bg-surface-raised',
      },
      width: { auto: '', full: 'w-full' },
    },
    defaultVariants: { variant: 'secondary', width: 'auto' },
  },
);

/** Props of {@link Button}. Takes the native button props, except `className` and `style`. */
export type ButtonProps = Omit<ComponentPropsWithRef<'button'>, 'className' | 'style' | 'children'> &
  VariantProps<typeof button> & {
    readonly children: ReactNode;
  };

/** Starts an action on the current screen. Use at most one `primary` button per screen. */
export function Button({ variant, width, type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} className={button({ variant, width })} />;
}

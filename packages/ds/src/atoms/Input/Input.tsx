import type { ComponentPropsWithRef } from 'react';
import { focusRing } from '../../shared/focus.ts';

const inputClass = [
  'w-full min-w-0 touch-manipulation border',
  'min-h-(--input-min-height) px-(--input-padding-x) rounded-(--input-radius) border-(color:--input-border)',
  'bg-surface-raised font-body text-body text-text-primary placeholder:text-text-muted',
  'aria-invalid:border-2 aria-invalid:border-feedback-danger',
  'disabled:cursor-not-allowed disabled:opacity-60',
  focusRing,
].join(' ');

/** Props of {@link Input}. Takes native input props, except `className`, `style` and `size`. */
export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'className' | 'style' | 'type' | 'size'> & {
  readonly type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';
  readonly invalid?: boolean;
};

/** A one-line text field. Give it a label: use `FormField`, or `aria-label` when no visible label fits. */
export function Input({ type = 'text', invalid = false, spellCheck, ...props }: InputProps) {
  const noSpellCheck = type === 'email' || type === 'url' || type === 'tel' || type === 'password';
  return (
    <input
      type={type}
      spellCheck={spellCheck ?? (noSpellCheck ? false : undefined)}
      {...props}
      aria-invalid={invalid || undefined}
      className={inputClass}
    />
  );
}

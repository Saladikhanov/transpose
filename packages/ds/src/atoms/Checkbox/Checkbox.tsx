import { Check } from 'lucide-react';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import { focusRing } from '../../shared/focus.ts';

/** Props of {@link Checkbox}. `label` is required: the label and the box share one hit target. */
export interface CheckboxProps {
  readonly label: string;
  readonly checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly invalid?: boolean;
  readonly name?: string;
  readonly value?: string;
  readonly id?: string;
}

/** A yes / no choice with a visible label. */
export function Checkbox({ label, onCheckedChange, invalid = false, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex min-h-(--size-touch-target) cursor-pointer touch-manipulation items-center gap-3 font-body text-body text-text-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-text-muted">
      <RadixCheckbox.Root
        {...props}
        aria-invalid={invalid || undefined}
        onCheckedChange={(state) => onCheckedChange?.(state === true)}
        className={`flex size-5 shrink-0 items-center justify-center rounded-(--radius-sm) border border-(color:--input-border) bg-surface-raised aria-invalid:border-2 aria-invalid:border-feedback-danger disabled:opacity-60 data-[state=checked]:border-action-primary-edge data-[state=checked]:bg-action-primary ${focusRing}`}
      >
        <RadixCheckbox.Indicator>
          <Check className="size-4 text-action-on-primary" strokeWidth={3} aria-hidden />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <span>{label}</span>
    </label>
  );
}

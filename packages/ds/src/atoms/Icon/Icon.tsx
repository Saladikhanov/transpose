import { cva } from 'class-variance-authority';
import { toneClass, type Tone } from '../../shared/tone.ts';
import { icons, type IconName } from './icons.ts';

const icon = cva('shrink-0', {
  variants: { size: { sm: 'size-4', md: 'size-5', lg: 'size-6' } },
  defaultVariants: { size: 'md' },
});

/** Props of {@link Icon}. Give `label` only when the icon carries meaning that no text next to it gives. */
export interface IconProps {
  readonly name: IconName;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly tone?: Tone;
  readonly label?: string;
}

/** Shows one icon from the allowed set. Without `label`, screen readers skip it. */
export function Icon({ name, size, tone = 'primary', label }: IconProps) {
  const Glyph = icons[name];
  const a11y = label === undefined ? { 'aria-hidden': true } : { role: 'img', 'aria-label': label };
  return <Glyph className={`${icon({ size })} ${toneClass[tone]}`} strokeWidth={2} {...a11y} />;
}

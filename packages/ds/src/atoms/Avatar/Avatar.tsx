import { cva } from 'class-variance-authority';
import { Avatar as RadixAvatar } from 'radix-ui';

const avatar = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-(--radius-full) border border-border-default bg-surface-page',
  {
    variants: { size: { sm: 'size-8 text-caption', md: 'size-10 text-caption', lg: 'size-14 text-body' } },
    defaultVariants: { size: 'md' },
  },
);

const PIXELS = { sm: 32, md: 40, lg: 56 } as const;

/** Returns up to two initials from a name: "Ana Lima" → "AL". */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

/** Props of {@link Avatar}. `name` is the accessible name and the source of the initials. */
export interface AvatarProps {
  readonly name: string;
  readonly src?: string;
  readonly size?: 'sm' | 'md' | 'lg';
}

/** A picture of a person, or their initials when there is no picture or it does not load. */
export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  return (
    <RadixAvatar.Root className={avatar({ size })}>
      {src !== undefined && (
        <RadixAvatar.Image
          src={src}
          alt={name}
          width={PIXELS[size]}
          height={PIXELS[size]}
          className="size-full object-cover"
        />
      )}
      <RadixAvatar.Fallback
        role="img"
        aria-label={name}
        delayMs={src === undefined ? 0 : 600}
        className="font-body font-medium text-text-primary"
      >
        {initials(name)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}

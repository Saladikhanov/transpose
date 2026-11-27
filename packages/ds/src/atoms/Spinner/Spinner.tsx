/** Props of {@link Spinner}. */
export interface SpinnerProps {
  readonly label?: string;
  readonly size?: 'sm' | 'md';
}

/** Shows that something is loading. Screen readers announce `label`. Stops spinning with reduced motion. */
export function Spinner({ label = 'Loading…', size = 'md' }: SpinnerProps) {
  return (
    <span role="status" className="inline-flex items-center text-text-primary">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className={`${size === 'sm' ? 'size-4' : 'size-6'} motion-safe:animate-spin`}
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

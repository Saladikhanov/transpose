import { contrastRatio } from './contrast.ts';

/** How a pair is used: `text` needs 4.5:1; `large` text and `ui` parts need 3:1 (WCAG 2.1 AA). */
export type ContrastKind = 'text' | 'large' | 'ui';

/** The minimum contrast ratio for each kind of pair. */
export const MIN_RATIO: Readonly<Record<ContrastKind, number>> = { text: 4.5, large: 3, ui: 3 };

/** A foreground and background token that the components use together. */
export interface ContrastPair {
  readonly foreground: string;
  readonly background: string;
  readonly kind: ContrastKind;
}

/** A declared pair that is below its minimum ratio. */
export interface ContrastFailure {
  readonly pair: ContrastPair;
  readonly ratio: number;
  readonly required: number;
}

function resolve(colors: Readonly<Record<string, string>>, token: string): string {
  const value = colors[token];
  if (value === undefined) throw new Error(`Unknown color token "${token}".`);
  return value;
}

/**
 * Checks each declared pair against the resolved colors of one theme and mode.
 * Returns the pairs below their minimum ratio. Throws on a token that has no color.
 */
export function checkContrastPairs(
  pairs: readonly ContrastPair[],
  colors: Readonly<Record<string, string>>,
): ContrastFailure[] {
  return pairs.flatMap((pair) => {
    const ratio = contrastRatio(resolve(colors, pair.foreground), resolve(colors, pair.background));
    const required = MIN_RATIO[pair.kind];
    return ratio < required ? [{ pair, ratio, required }] : [];
  });
}

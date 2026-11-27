import { checkContrastPairs, type ContrastKind, type ContrastPair } from '../contrast-pairs.ts';
import type { ResolvedToken } from './load.ts';

const KINDS: readonly ContrastKind[] = ['text', 'large', 'ui'];

function isKind(value: unknown): value is ContrastKind {
  return KINDS.some((kind) => kind === value);
}

/** Validates the parsed `contrast-pairs.json` and returns its pairs. Throws on a bad entry. */
export function parsePairs(json: unknown): ContrastPair[] {
  if (!Array.isArray(json)) throw new Error('contrast-pairs.json must be an array.');
  return json.map((entry: unknown, index) => {
    if (typeof entry !== 'object' || entry === null)
      throw new Error(`Pair ${String(index)} is not an object.`);
    const { foreground, background, kind } = entry as Record<string, unknown>;
    if (typeof foreground !== 'string' || typeof background !== 'string' || !isKind(kind)) {
      throw new Error(
        `Pair ${String(index)} needs string foreground, string background and kind text, large or ui.`,
      );
    }
    return { foreground, background, kind };
  });
}

/** Reports semantic tokens that do not reference a primitive, and component tokens that do not reference a semantic token. */
export function checkLayers(tokens: readonly ResolvedToken[]): string[] {
  const layerByPath = new Map(tokens.map((token) => [token.path, token.layer]));
  return tokens.flatMap((token) => {
    if (token.layer === 'semantic' && !token.reference?.startsWith('primitive.')) {
      return [`${token.path}: a semantic token must reference a primitive token.`];
    }
    if (token.layer === 'component') {
      const target = token.reference === undefined ? undefined : layerByPath.get(token.reference);
      if (target !== 'semantic') return [`${token.path}: a component token must reference a semantic token.`];
    }
    return [];
  });
}

/** Reports semantic tokens that one mode defines and another mode does not. */
export function checkSameSemanticTokens(modes: Readonly<Record<string, readonly ResolvedToken[]>>): string[] {
  const pathsByMode = Object.entries(modes).map(
    ([mode, tokens]) =>
      [
        mode,
        new Set(tokens.filter((token) => token.layer === 'semantic').map((token) => token.path)),
      ] as const,
  );
  const all = new Set(pathsByMode.flatMap(([, paths]) => [...paths]));
  return pathsByMode.flatMap(([mode, paths]) =>
    [...all].filter((path) => !paths.has(path)).map((path) => `${mode}: missing semantic token ${path}.`),
  );
}

/** Reports each declared pair below its minimum contrast in one theme × mode. */
export function checkContrast(
  label: string,
  pairs: readonly ContrastPair[],
  tokens: readonly ResolvedToken[],
): string[] {
  const colors = Object.fromEntries(tokens.map((token) => [token.path, token.value]));
  return checkContrastPairs(pairs, colors).map(
    ({ pair, ratio, required }) =>
      `${label}: ${pair.foreground} on ${pair.background} is ${ratio.toFixed(2)}:1, needs ${String(required)}:1 (${pair.kind}).`,
  );
}

/** Runs every check on all modes of one theme and returns all errors, without duplicates. */
export function validateTheme(
  theme: string,
  modes: Readonly<Record<string, readonly ResolvedToken[]>>,
  pairs: readonly ContrastPair[],
): string[] {
  const errors = [
    ...Object.values(modes).flatMap((tokens) => checkLayers(tokens)),
    ...checkSameSemanticTokens(modes),
    ...Object.entries(modes).flatMap(([mode, tokens]) => checkContrast(`${theme}/${mode}`, pairs, tokens)),
  ];
  return [...new Set(errors)];
}

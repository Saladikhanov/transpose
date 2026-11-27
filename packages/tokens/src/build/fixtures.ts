import type { Layer, ResolvedToken } from './load.ts';

/** Builds a resolved token for tests. */
export function token(path: string, layer: Layer, value: string, reference?: string): ResolvedToken {
  return { path, name: path.replaceAll('.', '-'), layer, value, reference };
}

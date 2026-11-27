import StyleDictionary from 'style-dictionary';

/** The token layer, taken from the file the token is defined in. */
export type Layer = 'primitive' | 'semantic' | 'component';

/** One token after Style Dictionary resolved its references. */
export interface ResolvedToken {
  readonly path: string;
  readonly name: string;
  readonly layer: Layer;
  readonly value: string;
  readonly reference: string | undefined;
}

/** A theme × mode pair, for example `acme` + `light`. */
export interface ThemeMode {
  readonly theme: string;
  readonly mode: 'light' | 'dark';
}

const REFERENCE = /^\{([^{}]+)\}$/;

function layerOf(filePath: string): Layer {
  if (filePath.endsWith('primitive.json')) return 'primitive';
  if (filePath.endsWith('component.json')) return 'component';
  return 'semantic';
}

function referenceOf(original: unknown): string | undefined {
  if (typeof original !== 'string') return undefined;
  return REFERENCE.exec(original)?.[1];
}

/**
 * Loads and resolves all tokens for one theme × mode.
 * Paths are relative, so run it with the package root as the working directory.
 */
export async function loadThemeMode({ theme, mode }: ThemeMode): Promise<ResolvedToken[]> {
  const sd = new StyleDictionary({
    source: [
      'src/tokens/primitive.json',
      'src/tokens/semantic.json',
      `src/themes/${theme}/${mode}.json`,
      'src/tokens/component.json',
    ],
    log: { verbosity: 'silent' },
    platforms: { resolved: { transforms: [] } },
  });
  const { allTokens } = await sd.getPlatformTokens('resolved');
  return allTokens.map((token) => ({
    path: token.path.join('.'),
    name: token.path.join('-'),
    layer: layerOf(token.filePath),
    value: String(token.$value),
    reference: referenceOf(token.original.$value),
  }));
}

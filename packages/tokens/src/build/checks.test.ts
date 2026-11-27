import { describe, expect, it } from 'vitest';
import { checkLayers, checkSameSemanticTokens, parsePairs, validateTheme } from './checks.ts';
import { token } from './fixtures.ts';

const primitiveDark = token('primitive.gray.950', 'primitive', '#222831');
const primitiveLight = token('primitive.gray.0', 'primitive', '#ffffff');
const primitiveYellow = token('primitive.yellow.400', 'primitive', '#ffd369');

describe('checkLayers', () => {
  it('accepts semantic → primitive and component → semantic', () => {
    const tokens = [
      primitiveDark,
      token('color.text.primary', 'semantic', '#222831', 'primitive.gray.950'),
      token('input.text', 'component', '#222831', 'color.text.primary'),
    ];
    expect(checkLayers(tokens)).toEqual([]);
  });

  it('rejects a semantic token with a raw value', () => {
    expect(checkLayers([token('color.text.primary', 'semantic', '#222831')])).toEqual([
      'color.text.primary: a semantic token must reference a primitive token.',
    ]);
  });

  it('rejects a component token that references a primitive', () => {
    expect(
      checkLayers([primitiveDark, token('input.text', 'component', '#222831', 'primitive.gray.950')]),
    ).toEqual(['input.text: a component token must reference a semantic token.']);
  });

  it('rejects a component token that references another component token', () => {
    const tokens = [
      primitiveDark,
      token('color.text.primary', 'semantic', '#222831', 'primitive.gray.950'),
      token('input.text', 'component', '#222831', 'color.text.primary'),
      token('select.text', 'component', '#222831', 'input.text'),
    ];
    expect(checkLayers(tokens)).toEqual(['select.text: a component token must reference a semantic token.']);
  });
});

describe('checkSameSemanticTokens', () => {
  it('reports a semantic token that only one mode defines', () => {
    const shared = token('color.text.primary', 'semantic', '#222831', 'primitive.gray.950');
    const extra = token('color.text.muted', 'semantic', '#4f5560', 'primitive.gray.600');
    expect(checkSameSemanticTokens({ light: [shared, extra], dark: [shared] })).toEqual([
      'dark: missing semantic token color.text.muted.',
    ]);
  });
});

describe('validateTheme', () => {
  it('fails the build on a declared pair with low contrast', () => {
    const light = [
      primitiveLight,
      primitiveYellow,
      token('color.surface.raised', 'semantic', '#ffffff', 'primitive.gray.0'),
      token('color.text.accent', 'semantic', '#ffd369', 'primitive.yellow.400'),
    ];
    const pairs = parsePairs([
      { foreground: 'color.text.accent', background: 'color.surface.raised', kind: 'text' },
    ]);
    expect(validateTheme('acme', { light }, pairs)).toEqual([
      'acme/light: color.text.accent on color.surface.raised is 1.42:1, needs 4.5:1 (text).',
    ]);
  });
});

describe('parsePairs', () => {
  it('rejects an unknown kind', () => {
    expect(() => parsePairs([{ foreground: 'a', background: 'b', kind: 'huge' }])).toThrow('Pair 0 needs');
  });

  it('rejects a file that is not an array', () => {
    expect(() => parsePairs({})).toThrow('must be an array');
  });
});

import { describe, expect, it } from 'vitest';
import { checkContrastPairs, type ContrastPair } from './contrast-pairs.ts';

const light = {
  'color.surface.page': '#eeeeee',
  'color.surface.raised': '#ffffff',
  'color.text.primary': '#222831',
  'color.text.accent': '#8a5f00',
  'color.action.primary': '#ffd369',
  'color.action.on-primary': '#222831',
};

const pairs: ContrastPair[] = [
  { foreground: 'color.text.primary', background: 'color.surface.raised', kind: 'text' },
  { foreground: 'color.text.accent', background: 'color.surface.raised', kind: 'text' },
  { foreground: 'color.action.on-primary', background: 'color.action.primary', kind: 'text' },
];

describe('checkContrastPairs', () => {
  it('passes the declared pairs of the default light theme', () => {
    expect(checkContrastPairs(pairs, light)).toEqual([]);
  });

  it('reports the accent used as text on a light surface', () => {
    const accentAsText: ContrastPair = {
      foreground: 'color.action.primary',
      background: 'color.surface.raised',
      kind: 'text',
    };
    const [failure] = checkContrastPairs([accentAsText], light);
    expect(failure?.pair).toBe(accentAsText);
    expect(failure?.required).toBe(4.5);
    expect(failure?.ratio).toBeLessThan(1.5);
  });

  it('uses 3:1 for large text and UI parts, and 4.5:1 for text', () => {
    const colors = { fg: '#949494', bg: '#ffffff' };
    expect(checkContrastPairs([{ foreground: 'fg', background: 'bg', kind: 'text' }], colors)).toHaveLength(
      1,
    );
    expect(checkContrastPairs([{ foreground: 'fg', background: 'bg', kind: 'large' }], colors)).toEqual([]);
    expect(checkContrastPairs([{ foreground: 'fg', background: 'bg', kind: 'ui' }], colors)).toEqual([]);
  });

  it('throws on a token with no color', () => {
    expect(() =>
      checkContrastPairs([{ foreground: 'missing', background: 'color.surface.page', kind: 'text' }], light),
    ).toThrow('Unknown color token "missing"');
  });
});

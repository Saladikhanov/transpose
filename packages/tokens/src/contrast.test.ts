import { describe, expect, it } from 'vitest';
import { contrastRatio, parseHex } from './contrast.ts';

describe('contrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('returns 1 for the same color', () => {
    expect(contrastRatio('#ffd369', '#ffd369')).toBe(1);
  });

  it('does not depend on the order of the colors', () => {
    expect(contrastRatio('#222831', '#ffd369')).toBe(contrastRatio('#ffd369', '#222831'));
  });

  it('passes 4.5:1 for the default theme text on page, both modes', () => {
    expect(contrastRatio('#eeeeee', '#222831')).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio('#222831', '#eeeeee')).toBeGreaterThanOrEqual(4.5);
  });

  it('fails 4.5:1 for yellow text on white (why light mode needs its own accent text token)', () => {
    expect(contrastRatio('#ffd369', '#ffffff')).toBeLessThan(4.5);
  });
});

describe('parseHex', () => {
  it('rejects a color that is not #rrggbb', () => {
    expect(() => parseHex('red')).toThrow('Invalid color');
  });
});

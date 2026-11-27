import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parsePairs, validateTheme } from './checks.ts';
import { loadThemeMode } from './load.ts';

describe('the Acme theme', () => {
  it('passes every layer, completeness and contrast check in both modes', async () => {
    const light = await loadThemeMode({ theme: 'acme', mode: 'light' });
    const dark = await loadThemeMode({ theme: 'acme', mode: 'dark' });
    const pairs = parsePairs(JSON.parse(readFileSync('src/contrast-pairs.json', 'utf8')));
    expect(validateTheme('acme', { light, dark }, pairs)).toEqual([]);
  });
});

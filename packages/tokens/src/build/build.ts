import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parsePairs, validateTheme } from './checks.ts';
import { loadThemeMode } from './load.ts';
import { renderCss, renderJson, renderTailwind, renderTypes } from './write.ts';

const THEME = 'acme';

process.chdir(fileURLToPath(new URL('../..', import.meta.url)));

const light = await loadThemeMode({ theme: THEME, mode: 'light' });
const dark = await loadThemeMode({ theme: THEME, mode: 'dark' });
const modes = { light, dark };
const pairs = parsePairs(JSON.parse(readFileSync('src/contrast-pairs.json', 'utf8')));
const errors = validateTheme(THEME, modes, pairs);

if (errors.length > 0) {
  console.error(`Token build failed with ${String(errors.length)} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

mkdirSync('dist', { recursive: true });
writeFileSync('dist/tokens.css', renderCss(light, dark));
writeFileSync('dist/tailwind.css', renderTailwind(light));
writeFileSync('dist/tokens.ts', renderTypes(light));
writeFileSync('dist/tokens.json', renderJson(THEME, modes));
console.log(
  `Tokens built: ${String(light.length)} tokens, ${String(pairs.length)} contrast pairs checked in 2 modes.`,
);

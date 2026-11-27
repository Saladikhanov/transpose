import type { ResolvedToken } from './load.ts';

const emitted = (tokens: readonly ResolvedToken[]): ResolvedToken[] =>
  tokens.filter((token) => token.layer !== 'primitive');

function declaration(token: ResolvedToken): string {
  const value =
    token.layer === 'component' && token.reference !== undefined
      ? `var(--${token.reference.replaceAll('.', '-')})`
      : token.value;
  return `  --${token.name}: ${value};`;
}

function block(selector: string, tokens: readonly ResolvedToken[], indent = ''): string {
  const lines = tokens.map((token) => `${indent}${declaration(token)}`);
  return [`${indent}${selector} {`, ...lines, `${indent}}`].join('\n');
}

/**
 * Renders the CSS variables. Light values apply by default and with `data-mode="light"`.
 * Dark values apply with `data-mode="dark"`, or with no `data-mode` when the device prefers dark.
 * Dark blocks repeat the component tokens, because a `var()` inside a custom property resolves where it is declared.
 */
export function renderCss(light: readonly ResolvedToken[], dark: readonly ResolvedToken[]): string {
  const lightValues = new Map(light.map((token) => [token.path, token.value]));
  const darkOnly = emitted(dark).filter(
    (token) =>
      token.layer === 'component' ||
      (token.layer === 'semantic' && lightValues.get(token.path) !== token.value),
  );
  return [
    block(':root,\n[data-mode="light"]', emitted(light)),
    block('[data-mode="dark"]', darkOnly),
    `@media (prefers-color-scheme: dark) {\n${block(':root:not([data-mode])', darkOnly, '  ')}\n}`,
    '',
  ].join('\n\n');
}

function themeEntry(token: ResolvedToken): string | undefined {
  const [group, key, part] = token.path.split('.');
  const variable = `var(--${token.name})`;
  if (group === 'color') return `  --${token.name}: ${variable};`;
  if (group === 'space') return `  --spacing-${String(key)}: ${variable};`;
  if (group === 'radius' || group === 'font') return `  --${group}-${String(key)}: ${variable};`;
  if (group === 'text' && part === 'size') return `  --text-${String(key)}: ${variable};`;
  if (group === 'text' && part === 'leading') return `  --text-${String(key)}--line-height: ${variable};`;
  return undefined;
}

/** Renders a Tailwind v4 `@theme inline` block. It removes the default color palette, so only DS colors exist. */
export function renderTailwind(light: readonly ResolvedToken[]): string {
  const entries = emitted(light)
    .filter((token) => token.layer === 'semantic')
    .flatMap((token) => themeEntry(token) ?? []);
  return ['@theme inline {', '  --color-*: initial;', ...entries, '}', ''].join('\n');
}

/** Renders a TypeScript module with the list of CSS variable names. */
export function renderTypes(light: readonly ResolvedToken[]): string {
  const names = emitted(light).map((token) => `  '${token.name}',`);
  return [
    'export const tokenNames = [',
    ...names,
    '] as const;',
    '',
    'export type TokenName = (typeof tokenNames)[number];',
    '',
  ].join('\n');
}

/** Renders the resolved values per theme and mode as JSON, keyed by token path. */
export function renderJson(theme: string, modes: Readonly<Record<string, readonly ResolvedToken[]>>): string {
  const values = Object.fromEntries(
    Object.entries(modes).map(([mode, tokens]) => [
      mode,
      Object.fromEntries(emitted(tokens).map((token) => [token.path, token.value])),
    ]),
  );
  return `${JSON.stringify({ [theme]: values }, null, 2)}\n`;
}

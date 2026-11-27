import { describe, expect, it } from 'vitest';
import { token } from './fixtures.ts';
import { renderCss, renderJson, renderTailwind, renderTypes } from './write.ts';

const light = [
  token('primitive.gray.0', 'primitive', '#ffffff'),
  token('space.4', 'semantic', '1rem', 'primitive.space.4'),
  token('color.surface.page', 'semantic', '#eeeeee', 'primitive.gray.100'),
  token('text.body.size', 'semantic', '1rem', 'primitive.font-size.md'),
  token('text.body.leading', 'semantic', '1.5', 'primitive.line-height.relaxed'),
  token('panel.padding', 'component', '1rem', 'space.4'),
];
const dark = light.map((item) => (item.path === 'color.surface.page' ? { ...item, value: '#222831' } : item));

describe('renderCss', () => {
  const css = renderCss(light, dark);

  it('never emits primitive tokens', () => {
    expect(css).not.toContain('primitive');
  });

  it('emits component tokens as references to semantic variables', () => {
    expect(css).toContain('--panel-padding: var(--space-4);');
  });

  it('puts only changed values in the dark blocks', () => {
    expect(css).toContain('[data-mode="dark"] {\n  --color-surface-page: #222831;\n}');
    expect(css).toContain('@media (prefers-color-scheme: dark) {\n  :root:not([data-mode]) {');
  });
});

describe('renderTailwind', () => {
  const tailwind = renderTailwind(light);

  it('removes the default palette and maps tokens to Tailwind namespaces', () => {
    expect(tailwind).toContain('--color-*: initial;');
    expect(tailwind).toContain('--color-surface-page: var(--color-surface-page);');
    expect(tailwind).toContain('--spacing-4: var(--space-4);');
    expect(tailwind).toContain('--text-body: var(--text-body-size);');
    expect(tailwind).toContain('--text-body--line-height: var(--text-body-leading);');
  });

  it('does not map component tokens', () => {
    expect(tailwind).not.toContain('panel');
  });
});

describe('renderTypes and renderJson', () => {
  it('lists the emitted names', () => {
    expect(renderTypes(light)).toContain("  'panel-padding',");
  });

  it('keys values by theme, mode and path', () => {
    const json = JSON.parse(renderJson('acme', { light, dark })) as Record<
      string,
      Record<string, Record<string, string>>
    >;
    expect(json.acme?.dark?.['color.surface.page']).toBe('#222831');
    expect(json.acme?.light?.['primitive.gray.0']).toBeUndefined();
  });
});

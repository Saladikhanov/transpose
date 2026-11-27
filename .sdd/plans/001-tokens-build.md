# 001 · Acme DS token build

- **Spec:** 000-mvp, F1 (Acme DS), section 6
- **Size:** Normal
- **Status:** Done 2026-11-27

## Behaviour

When this work is done:

1. `pnpm --filter @transpose/tokens build` reads DTCG JSON and writes 4 files to `packages/tokens/dist/`:
   - `tokens.css`: CSS variables for each theme × mode.
   - `tailwind.css`: a Tailwind v4 `@theme inline` block that maps utilities to those variables.
   - `tokens.ts`: a typed list of token names, for the DS and the manifest.
   - `tokens.json`: a flat map of resolved values per theme × mode, for the AI layer and the contrast check.
2. The CSS follows the mode rules: `[data-mode="light"]` and `[data-mode="dark"]` set values. With no `data-mode`, the page follows `prefers-color-scheme`. This works with scripts off.
3. The build fails, with a clear message, when:
   - a declared contrast pair is below its minimum in any theme × mode;
   - a semantic token has a raw value instead of a reference to a primitive;
   - a component token references a primitive instead of a semantic token;
   - a theme × mode does not define every semantic token.
4. `pnpm check` runs the build, so CI catches each failure above.

## Approach

```
packages/tokens/
  src/tokens/primitive.json       colors, space, radius, font, type sizes
  src/tokens/component.json       button, panel, input, focus (reference semantic only)
  src/themes/acme/light.json      semantic layer, light mode
  src/themes/acme/dark.json       semantic layer, dark mode
  src/contrast-pairs.json         declared pairs, shared by all themes
  src/build/*.ts                  Style Dictionary config, formats, layer checks
```

- Style Dictionary 5 (DTCG support built in). One run per theme × mode. Custom formats for the CSS selectors and the Tailwind block.
- Layer checks and the contrast check run on the resolved tokens before files are written.
- `dist/` is git-ignored. Turbo runs `build` before `typecheck` and `test` of packages that depend on tokens.

## Proposed default values

| Group      | Values                                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colors     | Section 6 of the spec and `docs/design.md` (11 semantic colors, both modes)                                                                              |
| Space      | 4 px base: `0, 1 (4), 2 (8), 3 (12), 4 (16), 6 (24), 8 (32), 12 (48), 16 (64)`, in rem                                                                   |
| Radius     | `sm 2px`, `md 4px` (default), `lg 8px`, `full 9999px`                                                                                                    |
| Font       | Space Grotesk for headings; Inter for body text; system monospace for code                                                                               |
| Type roles | `display` clamp(2rem → 3rem), `title` clamp(1.5rem → 2rem), `heading` 1.25rem, `body` 1rem, `caption` 0.875rem; line heights 1.1 / 1.2 / 1.3 / 1.5 / 1.4 |
| Focus      | ring width 3px, offset 2px, color `color.focus.ring`                                                                                                     |

## Proof

- Unit tests for each layer check and for the build failing on a low-contrast pair (fixture tokens).
- A test that the built CSS has the light, dark and `prefers-color-scheme` selectors.
- `checkContrastPairs` runs on the real Acme theme in `pnpm check`.

## Rules touched

- design-system: tokens 1–7, accent color, contrast pairs. No exceptions.
- code-organisation 6: new dependency `style-dictionary`, needed for the DTCG build (decision `tokens-in-dtcg`).

## Decisions

None new. This plan implements `tokens-in-dtcg`.

## Question ledger

| #   | Question                                           | Answer                                                             |
| --- | -------------------------------------------------- | ------------------------------------------------------------------ |
| 1   | Are the proposed space, radius and type values OK? | Yes (owner, 2026-11-27)                                            |
| 2   | Space Grotesk for body text too?                   | No: Space Grotesk for headings, Inter for body (owner, 2026-11-27) |

No open questions.

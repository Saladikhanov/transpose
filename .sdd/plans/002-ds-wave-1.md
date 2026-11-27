# 002 · Acme DS wave 1 and Storybook

- **Spec:** 000-mvp, F1 (Acme DS), section 6
- **Size:** Normal
- **Status:** Agreed 2026-11-27

## Behaviour

When this work is done:

1. `packages/ds` (`@transpose/ds`) exports 15 components, in folders by level:
   - **Atoms:** Text, Heading, Button, Icon, Input, Checkbox, Badge, Avatar, Spinner, and the layout atoms Stack and Inline
   - **Molecules:** FormField
   - **Organisms:** Panel, Dialog
   - **Templates:** Centered
2. `AcmeProvider` sets `data-mode` (`light`, `dark` or `system`). `themeScript` applies the mode before first paint, for apps that render on the server.
3. Components use only semantic and component tokens through Tailwind utilities from `@transpose/tokens/tailwind.css`. Tailwind's default palette does not exist in the DS.
4. Each component has: a `.tsx` file, `cva` variants, an MDX doc in STE style (what it is for, when to use it, when not to, props, rules), and stories for each variant and state.
5. Storybook runs with a light / dark toolbar switch. Every story is also a test: it renders in a real browser, runs its `play` interactions, and fails on any axe violation.
6. Each component meets the quality floor: visible focus, 44 px touch targets for controls, keyboard support, AA contrast in both modes.

## Approach

```
packages/ds/
  src/atoms/<Name>/<Name>.tsx, <Name>.stories.tsx, <Name>.mdx
  src/molecules/  src/organisms/  src/templates/
  src/provider/AcmeProvider.tsx, theme-script.ts
  src/styles.css            imports tokens.css, tailwind.css, fonts, Tailwind
  .storybook/               main.ts, preview.tsx (mode switch decorator)
```

| Need             | Choice                                                         | Why                                                             |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| Behaviour        | `radix-ui` (Checkbox, Dialog, Slot)                            | decision `radix-for-behaviour`                                  |
| Variants         | `class-variance-authority`                                     | rule design-system components 5                                 |
| Styles           | Tailwind v4 with `@tailwindcss/vite`                           | decision in spec; also tests `tailwind.css` for real            |
| Fonts            | `@fontsource/space-grotesk`, `@fontsource-variable/inter`      | self-hosted: no requests to Google, works offline               |
| Stories and docs | Storybook 10 (`react-vite`, `addon-docs`, `addon-a11y`)        | the DS docs and the visual check                                |
| Component tests  | `addon-vitest` with Vitest browser mode (Playwright, Chromium) | stories are the tests; real browser for focus, keyboard and axe |

Build in 3 PRs, so each one stays reviewable:

1. **Foundation** (done 2026-11-27, PR `feat/ds-foundation`): package, Tailwind, fonts, provider, Storybook, test setup, and **Button** end to end (component, docs, stories, tests).
2. **Atoms:** the other 10 atoms, Stack and Inline first.
3. **Composites:** FormField, Panel, Dialog, Centered.

## Proof

- Every story passes its `play` test and axe, in light and dark mode.
- A test that `themeScript` sets `data-mode` from the device setting when no choice is stored.
- `pnpm check` runs the DS tests in CI (only when the DS or the tokens change, through `--affected`).

## Rules touched

- design-system: all; quality floor; UI work (plan with `frontend-design`, audit with `web-design-guidelines` and `vercel-react-best-practices`).
- code-organisation 6: each dependency above has its need in the table.

## Decisions

- New: [ds-props-only](../decisions/ds-props-only.md).

## Question ledger

| #   | Question                                       | Answer                                                                            |
| --- | ---------------------------------------------- | --------------------------------------------------------------------------------- |
| 1   | Do DS components accept `className`?           | No. Props only, and layout atoms Stack and Inline join wave 1 (owner, 2026-11-27) |
| 2   | Icons: `lucide-react` or our own SVG set?      | `lucide-react`; the manifest lists an allowed subset (owner, 2026-11-27)          |
| 3   | Component tests in a real browser or in jsdom? | Real browser (owner, 2026-11-27)                                                  |

No open questions.

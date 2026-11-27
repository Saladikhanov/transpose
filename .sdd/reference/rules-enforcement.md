# Rules enforcement

What holds each rule. A rule with "review" has no check yet; add a check when a tool can decide it.

| Rule                                                 | Held by                                                                                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Code organisation 1, 2, 5                            | dependency-cruiser in `pnpm check` (week 1)                                                                                                            |
| Code organisation 3                                  | file size check in `pnpm check` (week 1)                                                                                                               |
| TypeScript 1, 4, 7                                   | `tsc --strict`, typescript-eslint `strictTypeChecked` (`no-explicit-any`, `no-unsafe-*`), `noInlineConfig`, `eslint --max-warnings 0` in every package |
| TypeScript 2, 3                                      | review                                                                                                                                                 |
| Design system tokens 3, 7                            | token build in `pnpm check`: layer checks and declared contrast pairs (`packages/tokens/src/build/checks.ts`)                                          |
| Design system components 6                           | axe tests in Storybook test runner (week 1)                                                                                                            |
| Design system: accent, contrast pairs                | token build checks `src/contrast-pairs.json` in each mode; accent misuse in components: review                                                         |
| Design system: quality floor 1, 2, 3, 4              | axe in Storybook tests (week 1), Playwright + axe on `apps/web` (week 2), quality floor eval on generated screens (week 4)                             |
| Design system: quality floor 7                       | Lighthouse CI CLS budget (week 6)                                                                                                                      |
| Design system: quality floor 5, 6, 8                 | review, with `web-design-guidelines`                                                                                                                   |
| Design system: UI work                               | review                                                                                                                                                 |
| Code organisation 6 (no new dependency without need) | review                                                                                                                                                 |
| AI layer 10 (no invented content)                    | quality floor eval checks text against the screenshot (week 4)                                                                                         |
| AI layer 1                                           | ESLint `no-restricted-imports` (week 2)                                                                                                                |
| AI layer 6                                           | integration test on `ai_calls` (week 2)                                                                                                                |
| AI layer 9                                           | CI eval gate (week 4)                                                                                                                                  |
| Documentation: comments in code                      | `transpose/no-comments` ESLint rule (`packages/eslint-plugin`), with tests                                                                             |
| Documentation 2, 9                                   | doc lint, warnings only (week 2)                                                                                                                       |
| Commit convention: grammar                           | PR title check in CI (`ci.yml`, `pr-title`)                                                                                                            |
| Commit convention: squash merge                      | GitHub repo setting "Allow squash merging" only                                                                                                        |
| Commit convention: version                           | release-please (`release.yml`)                                                                                                                         |

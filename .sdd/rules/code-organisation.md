# Code organisation

## Packages

| Package                  | Contains                                                        | May import                          |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------- |
| `packages/tokens`        | DTCG token JSON, themes, Style Dictionary build, contrast check | nothing internal                    |
| `packages/ds`            | Acme DS components, `AcmeProvider`, docs                        | `tokens`                            |
| `packages/manifest`      | Manifest generator, zod schemas for trees                       | `ds` (read only, at build time)     |
| `packages/renderer`      | Component tree → React                                          | `ds`, `manifest`                    |
| `packages/codegen`       | Component tree → TSX and stories                                | `manifest`                          |
| `packages/ai`            | Provider, prompts, tools, tracing                               | `manifest`                          |
| `packages/events`        | SSE event schemas shared by API and web                         | nothing internal                    |
| `packages/eslint-plugin` | Project ESLint rules (`no-comments`)                            | nothing internal                    |
| `packages/db`            | Schema, migrations, seed                                        | nothing internal                    |
| `apps/api`               | NestJS                                                          | any package except `ds`, `renderer` |
| `apps/web`               | Next.js                                                         | any package except `ai`, `db`       |

## Instructions

1. Dependencies go one way, as in the table. Do not import from an app into a package.
2. Import a package through its entry point (`@transpose/<name>`). Do not import its internal files.
3. Keep a file under 300 lines. Split it before it reaches the limit.
4. Put tests next to the code: `<name>.test.ts`.
5. Do not create circular imports.
6. Do not add a dependency, a service or an abstraction without a need stated in the plan.

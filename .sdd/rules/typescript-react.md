# TypeScript and React

1. Use TypeScript strict mode. Do not use `any`. Use `unknown` and narrow it.
2. Validate every input that crosses a boundary with zod: API bodies, SSE events, model output, files.
3. Infer types from zod schemas (`z.infer`). Do not write the same type twice.
4. Use `import type` for type-only imports.
5. Use function components. Do not use default exports, except where a tool requires them (Next.js pages, `*.config.*` files).
6. Keep server state in the API. Keep client state local to the component that needs it.
7. Do not disable a lint rule or a type check in code. Fix the cause or change the rule with `/improve`.
8. Write a test for each new behaviour: Vitest for units, Playwright for user journeys.
9. Before you use a library API, check it at the installed version. Do not rely on memory.
10. Keep TypeScript at 6.x. typescript-eslint does not support TypeScript 7 yet. Remove the pin when it does.

# Transpose

Rebuild any flow in your design system, including the states the screenshots don't show.

Read [.sdd/README.md](.sdd/README.md) first. The rules in [.sdd/rules/](.sdd/rules/) apply to all work. This file does not repeat them.

## Work

- Use the flow: `/spec` → `/plan` → `/implement`. Use `/improve` for any process change.
- Before you plan or write code, read the rules that the work touches.
- Run `pnpm check` before you say a change is done. It runs the same gates as CI.
- Report the real output of each command. Never say a check passed if you did not run it.
- For UI work, plan with the `frontend-design` skill. Then audit with `web-design-guidelines` and `vercel-react-best-practices`. See [.sdd/rules/design-system.md](.sdd/rules/design-system.md).
- Write all docs in the style of [.sdd/rules/documentation.md](.sdd/rules/documentation.md) (STE100 at ~80%).
- Use the terms in [.sdd/glossary.md](.sdd/glossary.md).
- Do not add features outside [the spec](.sdd/specs/000-mvp.md) without asking.
- Prefer plain, explicit code over clever abstractions. A new contributor must understand each line without extra context.

## Commands

| Command        | Does                                         |
| -------------- | -------------------------------------------- |
| `pnpm install` | Installs all workspaces                      |
| `pnpm check`   | Lint, format, types, tests, structure checks |
| `pnpm dev`     | Runs web and API in dev mode                 |

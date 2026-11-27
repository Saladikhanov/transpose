# Pull requests check only the packages a change reaches; main checks everything

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

CI ran every lint, type check and test on every push. The monorepo will grow to about 10 packages and two apps, and CI time grows with it. Most pull requests change one or two packages.

## Decision

- On a pull request, CI runs `pnpm check:affected`: format, file size and root lint for the whole repo, then `turbo run build lint typecheck test --affected`. Turbo selects the packages that changed since the base branch, and the packages that depend on them.
- On a push to `main`, CI runs the full `pnpm check`.
- A change to a file in `globalDependencies` (`turbo.json`) makes every package affected: `tsconfig.base.json`, `eslint.config.js`, `.prettierrc.json`, and the project ESLint rules in `packages/eslint-plugin/src/`.
- CI keeps the Turbo cache between runs, so an unchanged task is restored, not re-run.
- Tests stay next to the code they test. Turbo and Vitest find what to run from the package graph and the import graph, not from folders.

## Alternatives considered

- **Run everything on every push.** Simple, but CI time grows with the repo.
- **`vitest --changed` inside each package.** Finer, by file. Rejected for now: packages are small; add it when a package has hundreds of tests.
- **A mirrored `test/` folder.** Rejected: it does not make CI faster, and tests drift from the code they test.
- **Nx.** Rejected: Turborepo already does the package graph and the cache.

## Consequences

**Positive**

- A pull request that changes one package checks one package and its dependents.
- Docs-only pull requests run no package tasks.

**Negative**

- A missing entry in `globalDependencies` can skip a package that a root file affects. The full run on `main` catches it after merge.

## Conditions for review

Review when a pull request run takes more than 5 minutes, or when the full run on `main` finds a failure that the pull request run missed.

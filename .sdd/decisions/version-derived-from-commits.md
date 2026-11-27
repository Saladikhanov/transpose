# The version is derived from commits by release-please

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

Commits follow Conventional Commits, and PRs are squash-merged. The project needs a semantic version, a changelog and GitHub Releases, with no manual steps that can be forgotten.

## Decision

Use release-please on `main`. It reads the commits since the last release, opens a release PR with the next version and `CHANGELOG.md`, and creates the tag and GitHub Release when that PR is merged.

- One version for the whole repository. All packages are private.
- Start at `0.1.0` (`initial-version` in the config). Without it, release-please makes the first release `1.0.0`. Before `1.0.0`, a breaking change bumps the minor version.
- Release `1.0.0` at public launch, with `release-as` in the config.

## Alternatives considered

- **Changesets.** Rejected: each PR needs a hand-written changeset file; this adds a step that commits already carry.
- **semantic-release.** Rejected: it releases on every merge, with no review step before a release.
- **Manual version.** Rejected: easy to forget and to get wrong.

## Consequences

**Positive**

- The version and the changelog come from data that CI already checks (the PR title).
- Each release is a reviewed PR.

**Negative**

- A badly typed PR title gives a wrong version. CI checks the type, not the meaning.
- PRs opened with the default `GITHUB_TOKEN` do not start other workflows, so CI does not run on the release PR. The release PR changes only the version and the changelog.

## Conditions for review

Review when a package is published to npm. Then each published package needs its own version.

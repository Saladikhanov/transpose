# Commit convention

Use Conventional Commits for commits and PR titles.

```
<type>(<scope>): <summary in imperative, lower case, no period>
```

| Type       | Use it for                           |
| ---------- | ------------------------------------ |
| `feat`     | New behaviour for a user             |
| `fix`      | A defect fix                         |
| `docs`     | Docs only                            |
| `refactor` | Code change with no behaviour change |
| `test`     | Tests only                           |
| `chore`    | Tooling, config, dependencies        |
| `ci`       | CI workflows                         |
| `eval`     | Eval datasets, scorers, thresholds   |

Scope is a package or app name: `tokens`, `ds`, `ai`, `api`, `web`, `sdd`.

## Merge

1. Merge every PR with squash merge. The PR title becomes the commit on `main`.
2. Write the PR title in the commit grammar above. CI checks it.

## Version impact

The version is derived from commits. Do not edit the version by hand. The reasoning is in [version-derived-from-commits](../decisions/version-derived-from-commits.md).

| Commit on `main`                          | Before 1.0.0                                  | From 1.0.0 |
| ----------------------------------------- | --------------------------------------------- | ---------- |
| `fix:`                                    | patch (0.1.0 → 0.1.1)                         | patch      |
| `feat:`                                   | minor (0.1.0 → 0.2.0)                         | minor      |
| `feat!:` or a `BREAKING CHANGE:` footer   | minor                                         | major      |
| `eval:`                                   | no release by itself; listed in the changelog | same       |
| `docs`, `refactor`, `test`, `chore`, `ci` | no release                                    | no release |

Use `!` only for a change that breaks a public contract: the manifest format, the event schemas, the tree schemas or the export format.

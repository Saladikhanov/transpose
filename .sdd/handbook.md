# Handbook

## Principles

- Every activity must add product value. Skip work that adds none.
- AI writes the paperwork. People make the decisions.
- Working outcomes are the evidence. A claim without a test, an eval or a link is not evidence.
- Say how you know. Mark each statement as measured, read in code, or assumed.

## The flow

| Stage        | Purpose                                       | Gate to the next stage                                              |
| ------------ | --------------------------------------------- | ------------------------------------------------------------------- |
| `/spec`      | A need or a defect becomes a spec in `specs/` | The spec has a problem, an expected outcome, scope and out of scope |
| `/plan`      | Behaviour, approach and proof are agreed      | The plan has no open question in its question ledger                |
| `/implement` | The change is built, tested and documented    | `pnpm check` passes. Docs are updated. The PR report is written     |
| Merge        | The change is reviewed                        | AI review and human review are done. Findings are fixed or accepted |

Technical work (a Task) starts at `/plan`.

## Models per stage

| Stage                        | Model  |
| ---------------------------- | ------ |
| `/spec`, `/plan`, `/improve` | Opus   |
| `/implement`                 | Sonnet |
| `reviewer-agent`             | Opus   |
| `claim-checker`              | Sonnet |
| `repo-explorer`              | Haiku  |

A plan is ready for `/implement` when a cheaper model can follow it without a new choice. If it cannot, `/implement` stops and the work goes back to `/plan`. The reasoning is in [model-per-stage](decisions/model-per-stage.md).

## Proportion

|           | Small                             | Normal                                            |
| --------- | --------------------------------- | ------------------------------------------------- |
| Example   | A bug fix, a new token, a doc fix | A feature (F1–F12 in the spec)                    |
| Spec      | Not needed                        | Needed                                            |
| Plan      | About 12 lines                    | Full plan with a question ledger                  |
| PR report | 4 lines, and what is not done     | Full, with eval numbers when AI behaviour changes |

## Definition of Done

1. `pnpm check` passes locally and in CI.
2. Tests cover the new behaviour. AI behaviour changes have eval results in the PR.
3. Affected docs are updated, in the style of [rules/documentation.md](rules/documentation.md).
4. A new choice with a rejected alternative has a record in `decisions/`.
5. The PR report says what is not done.

## Who does what

| AI does                                   | The person owns                 |
| ----------------------------------------- | ------------------------------- |
| Drafts specs, plans, code, tests and docs | The purpose and the trade-offs  |
| Investigates options                      | The decisions                   |
| Reviews a PR it did not write             | Supervision and the final merge |

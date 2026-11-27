# Each SDD stage runs on the model that fits its job

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

`/spec`, `/plan` and `/implement` ran on whichever model the session used. Thinking work (finding gaps, weighing options, asking questions) needs the strongest model. Following an agreed plan does not, and it uses most of the tokens.

## Decision

Each command and subagent names its model in its front matter.

| Stage                        | Model  | Job                                              |
| ---------------------------- | ------ | ------------------------------------------------ |
| `/spec`, `/plan`, `/improve` | Opus   | Think: find gaps, weigh options, write decisions |
| `/implement`                 | Sonnet | Follow an agreed plan with no open questions     |
| `reviewer-agent`             | Opus   | Review a change it did not write                 |
| `claim-checker`              | Sonnet | Check claims against the code                    |
| `repo-explorer`              | Haiku  | Search the code                                  |

`/implement` stops when a question comes up that the plan does not answer, and sends it back to `/plan`. It also stops after two failures with the same cause, and never edits a test or a check to make it pass.

## Alternatives considered

- **One model for everything.** Simple. Rejected: Opus for implementation spends tokens on work that does not need it; Sonnet for planning misses gaps that cost more later.
- **Sonnet for review too.** Rejected: the review is the last check before merge, and it must catch what the implementing model missed.

## Consequences

**Positive**

- Most tokens (implementation) go to the cheaper model.
- The plan must be complete enough for a cheaper model to follow it. This makes plans better.

**Negative**

- A thin plan makes `/implement` stop often. The fix is a better plan, not a stronger implementation model.

## Conditions for review

Review when model prices or abilities change, or when the reviewer finds many defects that a stronger implementation model would have avoided.

## See also

- [handbook: models per stage](../handbook.md#models-per-stage)

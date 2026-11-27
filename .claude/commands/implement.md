---
description: Build one agreed plan, with tests, docs and a PR
argument-hint: <plan file>
---

Implement the plan: $ARGUMENTS

1. Read the plan. Stop if its question ledger has an open question.
2. Make sure you are on a feature branch, not `main`.
3. Build the change in small steps. After each step, run the tests that the step touches.
4. Write the tests that the plan's Proof section lists.
5. Write the decision records that the plan lists.
6. Update the docs that the change makes stale.
7. If the change touches UI, audit it with the `web-design-guidelines` and `vercel-react-best-practices` skills in both modes. Fix each finding, or record why it does not apply.
8. Run `pnpm check`. Fix every finding. Do not disable a check.
9. If the change touches prompts or models, run the evals and put the numbers in the PR.
10. Open a draft PR. The title follows `.sdd/rules/commit-convention.md`.
11. Run the `reviewer-agent` subagent on the PR. Fix or answer each finding.
12. Write the PR report: what changed, how it is proven, what is not done.

A deviation from the plan is allowed only with the owner's yes. Record it in the plan.

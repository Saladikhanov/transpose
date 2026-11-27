---
description: Write one agreed plan for a spec or a technical task
argument-hint: <spec id or task description>
---

Write a plan for: $ARGUMENTS

1. Read the spec (if there is one), `.sdd/handbook.md` and the rules the work touches.
2. Set the size: Small or Normal (see the handbook, Proportion).
3. Investigate what exists. Use the `repo-explorer` subagent for wide searches. Cite `path:line`.
4. Write `.sdd/plans/<id>-<slug>.md`:
   - **Behaviour**: what is true when the work is done.
   - **Approach**: the packages and files that change, and why.
   - **Proof**: the tests and evals that show it works.
   - **Rules touched**, and any exception with its reason and end date.
   - **Decisions**: new choices that need a record in `.sdd/decisions/`.
   - **Question ledger**: each open question, and what closes it.
5. A Small plan is about 12 lines and has no ledger unless a question came up.
6. Use the `claim-checker` subagent on the factual claims of the plan.
7. Ask the owner the ledger questions. Update the plan with the answers.

The plan is agreed when the ledger has no open question and the owner says yes. Do not write code in this command.

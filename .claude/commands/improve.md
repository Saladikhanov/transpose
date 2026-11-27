---
description: Improve the delivery process from one sentence
model: opus
argument-hint: <what went wrong or what could be better>
---

Improve the process: $ARGUMENTS

1. Apply the improvement to the current work now.
2. Find the one right place to encode it:
   - a **check** (CI, lint, test), if a tool can decide it;
   - a **rule**, if it is a convention with no real alternative;
   - a **decision**, if an alternative was rejected;
   - a **command**, if it changes how a stage runs.
3. Prefer a check over a rule. A rule that no tool checks gets a row in `.sdd/reference/rules-enforcement.md` that says "review".
4. Delete the guidance that the change makes obsolete, in the same change.
5. Report: what changed, and where.

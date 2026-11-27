---
description: Turn a need or a defect into a spec in .sdd/specs/
argument-hint: <one or more sentences about the need>
---

Turn this need into a spec: $ARGUMENTS

1. Read `.sdd/specs/000-mvp.md` and `.sdd/glossary.md`.
2. Find the problem behind the request. Separate the problem from any solution in it.
3. Test the premise where you can: read the code, or reproduce a defect. Say how you know.
4. Ask the owner up to 3 questions at a time. Ask only what changes the spec.
5. Write `.sdd/specs/<next id>-<slug>.md` with these sections: Problem, Expected outcome, Scope, Out of scope, Open questions.
6. Write in the style of `.sdd/rules/documentation.md`.
7. Report: the file, and the open questions that are left.

Do not plan or write code in this command.

# SDD

How change is delivered in Transpose. People and AI agents read the same files.

## Start here

| You want to                                     | Go to                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| Know how work flows and what "done" means       | [handbook.md](handbook.md)                                       |
| Know a convention before you write code or docs | [rules/](rules/)                                                 |
| Know what checks each rule                      | [reference/rules-enforcement.md](reference/rules-enforcement.md) |
| Know why the system is the way it is            | [decisions/](decisions/)                                         |
| Look up a term                                  | [glossary.md](glossary.md)                                       |
| Read the product spec                           | [specs/000-mvp.md](specs/000-mvp.md)                             |

## The flow

```
/spec  ->  /plan  ->  /implement        /improve (any time)
```

The commands live in [`../.claude/commands/`](../.claude/commands/). The subagents live in [`../.claude/agents/`](../.claude/agents/). The tooling fixes these locations.

## What lives here

| Path          | Content                                                       |
| ------------- | ------------------------------------------------------------- |
| `handbook.md` | The flow, proportion, Definition of Done                      |
| `glossary.md` | One term, one meaning                                         |
| `rules/`      | Conventions with no real alternative, written as instructions |
| `decisions/`  | Choices with a rejected alternative. Never deleted            |
| `specs/`      | One spec per need                                             |
| `plans/`      | One plan per delivery item                                    |
| `reference/`  | What holds each rule: a check, or review only                 |

## Change this structure

Use `/improve`. Write the fix in exactly one place: a check, a rule, a decision or a command. Delete the old guidance in the same change.

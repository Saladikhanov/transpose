# Decisions

Why Transpose is the way it is. A record explains a choice, the rejected alternatives, and what to know before you reverse it. It does not describe current behaviour.

Records are never deleted. To reverse a decision, mark the old record `Superseded by <slug>` and write a new one.

## Format

```markdown
# <the decision, as a statement>

- **Status:** Accepted | Superseded by <slug>
- **Date:** YYYY-MM-DD
- **Spec:** <spec id>
```

Then: `## Context`, `## Decision`, `## Alternatives considered`, `## Consequences` (**Positive**, **Negative**), `## Conditions for review`, `## See also`.

## Write a record when

The choice reaches beyond one package, and it is hard to reverse, has non-obvious trade-offs, or would confuse a new contributor.

## Index

| Record                                                          | Topic         |
| --------------------------------------------------------------- | ------------- |
| [two-step-pipeline](two-step-pipeline.md)                       | AI pipeline   |
| [model-writes-json-not-code](model-writes-json-not-code.md)     | AI pipeline   |
| [radix-for-behaviour](radix-for-behaviour.md)                   | Design system |
| [tokens-in-dtcg](tokens-in-dtcg.md)                             | Design system |
| [ds-props-only](ds-props-only.md)                               | Design system |
| [nestjs-api](nestjs-api.md)                                     | Architecture  |
| [own-sse-events](own-sse-events.md)                             | Architecture  |
| [ai-calls-table-first](ai-calls-table-first.md)                 | Observability |
| [version-derived-from-commits](version-derived-from-commits.md) | Delivery      |
| [ci-runs-affected-packages](ci-runs-affected-packages.md)       | Delivery      |

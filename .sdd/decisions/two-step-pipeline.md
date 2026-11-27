# Screens are analysed and mapped to the DS in two separate steps

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

A screenshot must become a tree of DS components. One model call can do it all, but then a wrong result has no clear cause, and the vision step must know the DS.

## Decision

Use two steps:

1. **Analyze**: a vision model turns a screenshot into a semantic tree. It does not know the DS.
2. **Map**: a second step turns the semantic tree into a component tree, with tools over the manifest and the DS docs.

The user reviews the semantic tree between the two steps (plan review).

## Alternatives considered

- **One call, screenshot to component tree.** Rejected: no place for plan review, errors cannot be traced to a step, and each step cannot be evaluated alone.

## Consequences

**Positive**

- Each step has its own eval: element recall for Analyze, validity and rule checks for Map.
- The user can fix the plan before tokens are spent on Map.
- A new DS changes only Map.

**Negative**

- Two calls cost more latency and tokens.
- The semantic tree schema is one more contract to maintain.

## Conditions for review

Review if one-call quality is equal or better on the eval set and plan review is rarely used.

## See also

- [model-writes-json-not-code](model-writes-json-not-code.md)

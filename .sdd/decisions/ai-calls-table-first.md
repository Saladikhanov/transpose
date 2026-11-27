# AI calls are traced in a Postgres table first

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

Every AI call needs model, prompt version, tokens, cost, latency, repairs and fallback. The admin page and the README cost numbers need this data.

## Decision

Write every AI call to an `ai_calls` table in Postgres from `packages/ai`. Add Langfuse later only if the table is not enough.

## Alternatives considered

- **Langfuse from day one.** Rich UI for traces. Rejected for now: one more service and account; the table covers the MVP needs.

## Consequences

**Positive**

- No extra service. Metrics are plain SQL.
- Simple to read and to query.

**Negative**

- No trace UI; nested spans need our own schema.

## Conditions for review

Review when we need nested traces across steps or prompt comparisons beyond SQL.

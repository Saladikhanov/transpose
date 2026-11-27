# Acme DS uses Radix primitives for behaviour

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

Acme DS needs dialogs, popovers, selects, tabs and tooltips with correct focus, keyboard and ARIA behaviour. Writing them from zero takes weeks and is easy to get wrong.

## Decision

Use Radix UI primitives for behaviour. Acme DS adds all styles, tokens and rules.

## Alternatives considered

- **Base UI** (MUI team). Newer and actively developed. Rejected: Radix is more widely used and has more examples, because shadcn/ui is built on it.
- **React Aria** (Adobe). Strong accessibility. Rejected: larger API, more time to learn.
- **MUI.** Rejected: styled components with Material look; the DS would look like MUI, not like its own system.

## Consequences

**Positive**

- Accessible behaviour from day one.
- A common stack (Radix + Tailwind) that reviewers know.

**Negative**

- Radix development has slowed. A future move to Base UI is possible.

## Conditions for review

Review if Radix stops getting fixes for React versions we need.

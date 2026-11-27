# Design tokens are DTCG JSON built by Style Dictionary

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

Acme DS is white-label: themes change values, not components. The AI layer and the checks must know which tokens are allowed.

## Decision

Write tokens as JSON in the W3C Design Tokens (DTCG) format, in three layers: primitive, semantic, component. Style Dictionary builds CSS variables for Tailwind `@theme`, TS types, and JSON for the manifest. A contrast check runs on every theme and mode.

## Alternatives considered

- **Tokens written directly in CSS.** Faster. Rejected: no TS types, no single source for the AI layer, no build-time checks.
- **Tokens in TS objects.** Rejected: not a standard; design tools cannot read it.

## Consequences

**Positive**

- One source for CSS, TS and AI.
- A standard format that Figma Variables and Tokens Studio can read.
- A theme that fails contrast fails the build.

**Negative**

- One more build step and tool to learn.

## Conditions for review

Review if Style Dictionary cannot express a token type we need.

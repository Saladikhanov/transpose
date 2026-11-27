# The model writes JSON; code comes from our own codegen

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

The product exports TSX and Storybook stories. A model can write TSX directly, but that code can import unknown components, use invalid props or contain anything.

## Decision

The model returns only data: semantic trees, component trees and patches, validated by zod against the manifest. `packages/codegen` turns a valid component tree into TSX and stories with deterministic code.

## Alternatives considered

- **The model writes TSX.** Rejected: output cannot be fully validated, and the same input gives different code.
- **The model writes TSX and a linter checks it.** Rejected: a linter catches style, not wrong components or props.

## Consequences

**Positive**

- Every output is validated before the user sees it.
- Exported code always type-checks and follows one style.
- Patches (chat edits) are small and easy to show as a diff.

**Negative**

- What the tree schema cannot express, the product cannot build: custom logic, custom CSS.
- Codegen is code we must write and test.

## Conditions for review

Review if users need output that the tree schema cannot express, often.

## See also

- [two-step-pipeline](two-step-pipeline.md)

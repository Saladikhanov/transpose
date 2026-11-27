# Acme DS components take props only, with no className or style

- **Status:** Accepted
- **Date:** 2026-11-27
- **Spec:** 000-mvp

## Context

Transpose promises that its output uses only the team's design system. Map validates each component tree against the manifest: the component must exist and its props must be valid. A `className` prop would let a person or a model write `bg-[#ff0000] p-[13px]` and skip tokens, the contrast check and white-label themes. Zod cannot validate such a string in a useful way.

## Decision

DS components accept typed props only. They do not accept `className` or `style`. Layout is done with layout atoms (`Stack`, `Inline`, later `Grid`) and templates, which use spacing tokens.

## Alternatives considered

- **`className` on every component.** Common and convenient. Rejected: it reopens the hole that the token rules close, and overrides break when the DS changes its markup.
- **`className` on templates only.** Rejected: the model would move its styling into templates.

## Consequences

**Positive**

- Every generated tree is fully checked by the manifest schema.
- Themes reach every component; the DS can change its markup without breaking consumers.
- A need that props cannot meet becomes a visible gap for the DS team, not a silent override.

**Negative**

- Less convenient for developers: no quick `className="mt-4"`.
- The DS needs layout atoms from wave 1.

## Conditions for review

Review if teams that adopt the DS ask for an escape hatch often, and the gap report cannot keep up.

## See also

- [model-writes-json-not-code](model-writes-json-not-code.md)

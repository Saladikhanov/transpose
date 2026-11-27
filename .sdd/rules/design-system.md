# Design system

The reasoning is in [tokens-in-dtcg](../decisions/tokens-in-dtcg.md) and [radix-for-behaviour](../decisions/radix-for-behaviour.md).

## Tokens

1. Write tokens in DTCG JSON in `packages/tokens/src`. Do not write token values in CSS or TS by hand.
2. Use three layers: primitive, semantic, component.
3. A component reads only semantic or component tokens. It never reads a primitive token.
4. A theme changes token values only. A theme never changes structure or behaviour.
5. Give each theme a value for both modes: `light` and `dark`.
6. Use `rem` for sizes. Use `clamp()` for heading sizes.
7. Every theme and mode must pass the contrast check: text 4.5:1, large text and UI 3:1.

## Components

1. Put each component in the folder of its level: `atoms/`, `molecules/`, `organisms/`, `templates/`.
2. A molecule does one job. An organism is a self-contained section block.
3. Do not put domain logic in a component. Use `TimeSlotGrid`, not `BookingSlotPicker`.
4. Use Radix primitives for behaviour that needs focus, keyboard or ARIA work.
5. Define variants with `cva`. Consumers see props only, not Tailwind classes.
6. Give each component an MDX doc, a story per variant and state, and an axe test.

## Accent color

The default accent (`#FFD369`) fails contrast as text or as a thin line on light surfaces.

1. Use the accent as a fill only, with `color.action.on-primary` text on it.
2. Do not use the accent as text, as a border, as an icon color or as a focus ring in light mode. Use `color.text.accent` for accent text.
3. Do not use the accent as a full-page background.
4. A brand theme with a different accent follows the same rules when its contrast check fails.

## Contrast pairs

1. Declare every foreground and background pair that the components use, with its kind: `text` (4.5:1) or `large` and `ui` (3:1).
2. The token build checks each declared pair in each theme and mode. An undeclared pair is a defect.

## Quality floor

Each component, each page of `apps/web`, and each screen that Transpose generates meets this floor:

1. Layout works from 320 px wide, with no horizontal scroll.
2. Keyboard focus is visible on every interactive element: a 3 px outline in `color.focus.ring`, 2 px offset. Never remove it.
3. Touch targets are at least 44 × 44 px.
4. Text and UI meet WCAG 2.1 AA contrast in both modes.
5. No state depends on hover only.
6. Motion respects `prefers-reduced-motion` and never blocks content or input.
7. Images and fonts cause no layout shift.
8. The theme applies before first paint. It follows the device setting by default. A manual choice is stored on the device only.

## UI work

1. Before you build UI, plan it with the `frontend-design` skill. Write the plan in the plan file.
2. After you build or change UI, audit it with `web-design-guidelines` (accessibility and UX) and `vercel-react-best-practices` (React performance), in both modes.
3. Fix each finding, or record why it does not apply.
4. Record small design choices (a radius, a spacing, a removed element) with a date in the decisions log of [docs/design.md](../../docs/design.md). Choices that reach beyond one component get a record in `decisions/`.

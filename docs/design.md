# Design

Acme DS is the demo design system of Transpose. This file holds its direction, its default theme and a log of small design choices. The rules are in [.sdd/rules/design-system.md](../.sdd/rules/design-system.md).

## Direction

- Neutral structure, so screenshots of any product fit into it.
- One strong accent, used as a fill only.
- Light and dark modes from day one. Both pass WCAG 2.1 AA.
- White label: a brand theme changes token values, never components.

## Default theme

Palette source: Color Hunt `222831 · 393E46 · FFD369 · EEEEEE`. Fonts: Space Grotesk for headings, Inter for body text. Radius: 4 px.

| Semantic token            | Dark      | Light     |
| ------------------------- | --------- | --------- |
| `color.surface.page`      | `#222831` | `#EEEEEE` |
| `color.surface.raised`    | `#393E46` | `#FFFFFF` |
| `color.border.default`    | `#4A505A` | `#D6D6D6` |
| `color.border.control`    | `#A8ADB4` | `#4F5560` |
| `color.text.primary`      | `#EEEEEE` | `#222831` |
| `color.text.muted`        | `#A8ADB4` | `#4F5560` |
| `color.text.accent`       | `#FFD369` | `#8A5F00` |
| `color.action.primary`    | `#FFD369` | `#FFD369` |
| `color.action.on-primary` | `#222831` | `#222831` |
| `color.indicator.active`  | `#FFD369` | `#222831` |
| `color.focus.ring`        | `#FFD369` | `#222831` |
| `color.feedback.danger`   | `#FF8A80` | `#B3261E` |

These values are a first draft. The contrast check on declared pairs decides.

## Quality floor

See [design-system rules, Quality floor](../.sdd/rules/design-system.md#quality-floor).

## Decisions log

Newest last.

- 2026-11-27: direction "bold contrast" chosen from three options (neutral, warm, bold).
- 2026-11-27: lime accent replaced by the Color Hunt palette with yellow `#FFD369`.
- 2026-11-27: accent is a fill only. In light mode, links use `color.text.accent` `#8A5F00`, because yellow text on white is about 1.4:1.
- 2026-11-27: in light mode the progress indicator and the focus ring use `#222831`, not yellow, for the same reason.
- 2026-11-27: in light mode the yellow button gets a thin darker edge, so its shape stays visible on white.

- 2026-11-27: Space Grotesk for headings only; Inter for body text, because it reads better in forms, tables and long text.

- 2026-11-27: new token `color.border.control` for input borders. `color.border.default` is too light for a control edge in light mode (about 1.4:1 on white); WCAG 1.4.11 asks 3:1 for the edge that identifies a control. `color.border.default` stays for decorative dividers.
- 2026-11-27: the token build checks 14 declared contrast pairs. All pass in both modes.

## Open items

- None.

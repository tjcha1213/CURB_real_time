# Design system

> Living document. When you change a token, update this file and log the decision in [`decisions.md`](./decisions.md).

This site is **editorial, not dashboard** (CLAUDE.md §3). The design system is deliberately small — most visual decisions are made per-scene inside component files, not via a library of reusable "cards."

## Color tokens

Defined as `@theme` CSS variables in [`app/globals.css`](../app/globals.css). All hex values are **draft** until we run them against real photos and charts; treat the numbers below as v0.1.

| Token | Hex | Purpose |
|---|---|---|
| `--color-paper` | `#f6f1e8` | Default body background — warm off-white |
| `--color-paper-deep` | `#eee6d6` | Subtle section separation between light scenes |
| `--color-ink` | `#1a1a1a` | Primary text on light scenes |
| `--color-ink-mute` | `#5a5a5a` | Secondary text, captions |
| `--color-rule` | `#d7cebd` | Hairline rules, borders |
| `--color-dark` | `#141311` | Dark-scene background (charcoal, warm) |
| `--color-dark-paper` | `#1e1c18` | Dark-scene panel |
| `--color-discard` | `#d94f30` | **The accent.** Use for the "discard" signal — emphasized numbers, callouts. Sparingly. |
| `--color-reuse` | `#3e6b3a` | Paired signal color for "reuse" framing. Sparingly. |

Rules:

- **No other colors.** If you reach for a third hue, first ask whether grey would do.
- **Color is never the only encoding** (CLAUDE.md §8). Pair with icon, label, or weight.
- WCAG AA on body text is a minimum. Verify contrast after any background change.

## Type

- **Display:** Fraunces (variable, with `opsz` + `SOFT` axes) via `next/font`.
- **Body:** Inter (variable).
- **Mono:** system `ui-monospace` stack for eyebrows and small labels.

Display usage:

- `h1` (act openers): `clamp(2.5rem, 6vw, 5rem)`, `font-light`, tight leading.
- `h2` (intra-scene): `clamp(2rem, 4vw, 3.5rem)`, `font-light`.
- Hero numbers (via `BigNumber`): `clamp(4rem, 14vw, 11rem)`, `leading-[0.9]`.

Body usage:

- Lede: `text-lg` / `text-xl`, `leading-relaxed`, capped to `prose-body` (36rem).
- Default prose: `text-base`, `leading-[1.5]`.

Don't add more sizes without a reason. The point of a restrained scale is that readers feel the hierarchy.

## Spacing & layout

- Scenes are full-viewport (`min-h-[100svh]`), separated visually by background tone.
- Padding scales responsively: `px-6 py-24` → `md:px-10` → `lg:px-16` → `xl:px-24`.
- Layouts inside scenes use 12-column grids asymmetrically (CLAUDE.md §3 — no equal-tile dashboards). Typical splits: 5/7 or 7/5.
- Mobile-first: every scene must work at 375 px wide (CLAUDE.md §10).

## Motion

- Default: **no motion**. Honor `prefers-reduced-motion` (handled in `globals.css`).
- Scroll-triggered chart reveals are allowed (Scrollama). Decorative animation is not.
- If a motion choice doesn't reveal information, delete it.

## Chart language

See CLAUDE.md §8. Summary:

- One hero chart per scene.
- Every hero chart has at least one annotation.
- Every chart component exports a `summary` prop → rendered as `.sr-only` text.
- Default tooltip: none. Everything essential visible without hover.

## Components inventory (as of v0.1)

Under [`components/ui/`](../components/ui/):

- `SceneFrame` — full-viewport wrapper with tone variants.
- `Headline` / `Lede` / `Handoff` — the three text primitives every scene uses.
- `BigNumber` — hero-number treatment for scene opens.
- `ChartPlaceholder` — dashed-border stand-in until the real chart lands.

Everything else is per-scene for now. Resist extracting "reusable" chart styles prematurely.

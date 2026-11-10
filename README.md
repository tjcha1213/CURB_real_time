# Massachusetts Furniture Waste — a data-journalism site

> DPI 853M Group 3 — Takashi Ban, Tae Jun Cha, Hyeji Kim, Seojin Moon, Mandy Tao
> Harvard Kennedy School, Spring 2026 · Prof. Hong Qu

A single-page, scrollytelling site about the gap between Massachusetts' successful 2022 Mattress Disposal Ban and the messy reality of furniture waste — dramatized through the annual Allston Christmas move-out spectacle — and a proposal for a coordinated municipal pick-up + digital reuse platform.

**See [CLAUDE.md](./CLAUDE.md) for the full project brief, narrative spine, design principles, and stack.**

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Other commands

```bash
pnpm build        # production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
```

## Data pipeline

Processed data in `public/data/` is produced by the Python scripts in `data-prep/`. See [`data-prep/README.md`](./data-prep/README.md).

## Docs

- [`docs/design-system.md`](./docs/design-system.md) — tokens, type, color
- [`docs/data-sources.md`](./docs/data-sources.md) — provenance log
- [`docs/decisions.md`](./docs/decisions.md) — ADR-style decision log

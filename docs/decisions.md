# Decision log

> ADR-style. Append, don't rewrite. Each entry: date, title, context, decision, alternatives considered, consequences.

---

## 2026-04-24 · Project scaffold v0

**Context.** Fresh repo with only `CLAUDE.md`. Needed enough structure for the team (and Claude Code) to start filling in scenes and data without bikeshedding the stack.

**Decision.** Ship the stack as locked in CLAUDE.md §4: Next.js 15 App Router + TypeScript, Tailwind v4 with CSS custom properties for design tokens, Fraunces + Inter via `next/font`, D3 + Observable Plot + MapLibre + Scrollama + Framer Motion installed but unused until needed. Seven scene files populated with draft copy and `ChartPlaceholder` stand-ins. Docs skeleton (`design-system.md`, `data-sources.md`, this file). Python data-prep skeleton with numbered fetch scripts.

**Alternatives considered.**
- Astro instead of Next.js — runner-up in CLAUDE.md. Rejected for now because the team is more likely to want React/D3 interop than Astro's content-first model; we can revisit if bundle size becomes a problem.
- `create-next-app` scaffold — rejected because it would have pulled in boilerplate we'd immediately delete (default CSS, app-icon assets, sample pages).
- Recharts / Chart.js for a quick-win first chart — rejected per CLAUDE.md §13. We accept the higher upfront cost of hand-written D3/Plot for distinctiveness.

**Consequences.**
- Color hex values in `globals.css` and `design-system.md` are v0.1 drafts (per CLAUDE.md §3 "confirm with the team before locking"). Need a team pass before M3 (Hero visuals).
- All scene hero numbers are placeholders until the data pipeline produces real JSONs in `public/data/`. Scene 1's "~900 tons" is explicitly called out as illustrative in its caption.
- `public/data/` is referenced by `lib/data/loaders.ts` but empty — any attempt to actually render a chart will throw. This is intentional: the placeholder UI documents the slot without pretending data exists.

## 2026-04-24 · M1 data spine + initial hero visuals

**Context.** After scaffold v0 the site was visually complete but empty — all hero numbers were placeholder, all charts were dashed-border boxes. Needed to move the narrative from "seven empty acts" to "seven acts with a real, defensible number and a real, annotated visual."

**Decision.**

1. **Dataset IDs confirmed and logged** in [`data-sources.md`](./data-sources.md): Cambridge Socrata (`2z9k-mv9g`, `a249-j2dd`), Boston CKAN (5 resources — 311 yearly 2024–2026, rolling new-system table, moving permits), MassDEP PDFs, EPR Commission background doc.

2. **Data-prep scripts** (`01_fetch_cambridge.py`, `02_fetch_boston_311.py`, `03_fetch_massdep.py`, `04_process_geo.py`) actually fetch and aggregate. `_common.py` holds shared IO helpers. MassDEP values are hand-transcribed from the 2024 SW Data Update + EPR Background Document (MassDEP doesn't publish an API) with inline comments citing the URL.

3. **Server-rendered SVG charts** (`components/charts/*`) built on D3's scale + shape modules only. No client JS for the charts, no runtime data fetching — scenes are async React Server Components that read `public/data/*.json` from disk at build time. Keeps the page weight at ~106 kB First Load JS total.

4. **Real numbers wired end-to-end:**
   - Scene 1 hero: **1,700 abandoned mattresses + 2,400 Sept 1 moving permits** (Boston Public Works via CBS/NBC Boston, Sept 2023).
   - Scene 2: **6.22M short tons** statewide disposal 2024 (MassDEP).
   - Scene 3: Boston moving-permit year-over-year August spike (14 years of permit data); bulky-item 311 September spike (2024+).
   - Scene 4: Neighborhood hotspot lollipop, annualized Sept bulky 311 per 1,000 housing units, dot-sized by student share.
   - Scene 5: **399,000 mattresses diverted in 2024, ~66% of generation** (EPR Commission 2025-06-10), paired with Cambridge's own monthly tonnage series.
   - Scene 6: Eight reuse partner categories (Habitat, Goodwill, Buy Nothing, Freecycle, Household Goods, More Than Words, children's hospital NICU, university move-out drives).
   - Scene 7: Napkin-math pilot cost ($1.5–2.5M/yr, benchmarked against MassDEP's $2.7M mattress grant pool).

5. **SceneRail** — a subtle right-edge nav rail that highlights the current act via IntersectionObserver. Hidden below md. This is the only client-side JS on the story page.

**Alternatives considered.**
- **Client-side D3 with useEffect + refs.** Rejected: ships ~50 kB of D3 to the browser for charts that never change at runtime. Server SVG is both faster and easier to debug.
- **Observable Plot for everything.** Kept installed (may still be used for quick experiments), but the hero charts needed enough annotation control that raw D3 was cleaner.
- **Scroll-triggered Framer Motion reveals.** Skipped per CLAUDE.md §3: a scene fade-in would be decorative, not revealing. Framer Motion stays in the dependency list for when a chart's motion genuinely clarifies (e.g. an animated path from pre- to post-ban).
- **Mattress chart as two small-multiples (mattress ↑, furniture flat).** Kept the mattress panel as the full hero and used Cambridge's monthly series as the sub-panel — the "furniture flat" side has no data yet, and a fake placeholder line would undermine the argument.
- **Boston 311 backfill pre-2024.** Deferred: the bulky-specific type values are only stable in the 2024+ CKAN resources. Backfill needs a per-year filter dictionary and isn't on the critical path.

**Consequences.**
- `public/data/` is now committed with real data. Re-running `data-prep/*.py` regenerates deterministically.
- Boston 311 bulky series begins 2024-01. Scene 3 is honest about that; the permit rhythm (2012–2026) carries the year-over-year story.
- Cambridge 311 tonnage includes `mattresses` column, which is what makes the Scene 5 sub-panel possible — worth noting in the repo since we'll want to surface `electronics` and `textiles` later too.
- Scene 4 student-share values are still approximations (not tract-level ACS). A `05_fetch_acs.py` script is the obvious next step before M3 sign-off.
- MassDEP pre-ban mattress numbers (2019–2021) are estimates, flagged as such in the chart data's `note` field. The visual direction is right; the exact ramp is approximate.

## _template_

**Context.** _What prompted the decision._

**Decision.** _What we chose._

**Alternatives considered.** _What we rejected and why._

**Consequences.** _What downstream work this enables or forces._

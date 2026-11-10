# CLAUDE.md — MA Furniture Waste Data Storytelling Site

> DPI 853M Group 3 (Takashi Ban, Tae Jun Cha, Hyeji Kim, Seojin Moon, Mandy Tao)
> Professor Hong Qu — Spring 2026

This file is the single source of truth for Claude Code working on this repo. Read it in full at the start of every session before touching code or data. If you're about to do something that contradicts this doc, stop and ask.

---

## 1. What we're building (read this first)

**A single-page, scrollytelling data-journalism website** about Massachusetts bulky waste — specifically the gap between the (successful) 2022 Mattress Disposal Ban and the (unregulated, messy) reality of furniture waste, dramatized through the annual Allston Christmas move-out spectacle.

The site ends with a **proposed solution**: a coordinated municipal pick-up program + a resident-facing digital reuse platform. We're not just reporting the problem — we're advocating a policy.

Think **The Pudding × NYT Upshot × FT Visual Journalism**, not a Tableau dashboard. Editorial voice, strong typography, purposeful motion, opinionated point of view. The site should feel like it was made by humans who care, not auto-generated from a template.

**Primary audience:** Cambridge / Boston municipal policymakers and urban planners. Every design choice should be defensible to someone who will cite this in a memo.
**Secondary:** Residents (esp. off-campus students), university sustainability offices, environmental advocacy groups.

**Non-goals:**
- Not a generic dashboard. No "pick a filter, see a chart" UX.
- Not exhaustive. We choose a few sharp stories over comprehensive coverage.
- Not a policy white paper. Words are scaffolding for visuals, not the other way around.

---

## 2. Narrative spine (the story we're telling)

The site is structured as **seven acts**. Every chart, map, and sentence must serve one of these acts. If something doesn't fit, cut it.

1. **Hook — "Every September, Allston looks like this."** Full-bleed photo + one devastating number. One scroll.
2. **Scale — "This is not a local quirk."** MA-wide bulky waste tonnage. Context against national / peer-state baselines.
3. **Rhythm — "Waste has a calendar."** Time-series showing the September spike; calendar heatmap of 311 complaints and moving permits.
4. **Geography — "It concentrates here."** Interactive map of Boston/Cambridge hotspots. 311 dumping complaints × moving permits × student housing density.
5. **The mattress counter-example — "We already proved regulation works."** Before/after the 2022 ban. Paired with the furniture void. This is the pivot of the piece.
6. **What reuse could look like — "Furniture has a second life."** Survey of existing reuse infrastructure (Goodwill, Habitat ReStore, Freecycle, Buy Nothing, campus free-piles). Where the gaps are.
7. **Our proposal — "A coordinated pick-up + reuse platform."** Concrete policy ask. Cost/benefit napkin math. What municipalities would need to do on day one. CTA.

Each act = one full-viewport "scene" with a headline, a lede, a single dominant visualization, and a handoff sentence to the next act.

---

## 3. Design principles (non-negotiable)

These exist because left to defaults, LLM-generated sites look the same. We're actively avoiding that.

- **Editorial, not dashboard.** Serif display font for headlines, sans for body. Generous whitespace. Asymmetric layouts. No card grids of equal-sized tiles.
- **One chart per scene.** No small-multiples-for-the-sake-of-it. Each visual is hero-sized and earns its space.
- **Restrained palette.** Neutral backgrounds (warm off-white / deep charcoal for dark scenes). **One** accent color for emphasis — propose a slightly desaturated red-orange (`#D94F30`-ish, evoking the "discard" flag on a curb) with green (`#3E6B3A`-ish, "reuse") as the paired signal color. Confirm with the team before locking.
- **Type first, chrome last.** No gradients, no glassmorphism, no generic shadcn dashboard look. Numbers are huge; charts are spare.
- **Motion with purpose.** Scroll-triggered chart reveals are allowed. Decorative animation is not. If motion doesn't reveal information, kill it.
- **Mobile-first but desktop-special.** Most policy readers open links on phones. Mobile must work end-to-end. Desktop gets extra flourishes (e.g., larger map, side-by-side comparisons) but nothing critical is desktop-only.
- **Accessible.** WCAG AA contrast minimum. All charts have text alternatives. Color is never the only encoding.
- **Load fast.** Target Lighthouse Performance ≥ 90. Lazy-load the map. Preprocess data server-side; no client-side heavy lifting.

When in doubt, open a Pudding or FT Visual Vault piece and ask "would this feel at home there?"

---

## 4. Tech stack (locked unless we decide to change it together)

Chosen for: fast iteration with Claude Code, full design control, easy static deployment, no backend overhead.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + TypeScript | Best Claude Code ergonomics, great static export, React ecosystem for charts. Astro is the runner-up if we find we want even less JS. |
| Styling | **Tailwind CSS v4** + CSS custom properties for design tokens | Fast, and tokens let us theme scenes (light/dark per act). |
| Typography | **Fraunces** (display) + **Inter** (body) via next/font | Fraunces has editorial warmth, Inter is boring in the good way. Revisit if team wants alternatives. |
| Charts | **D3.js** (custom) + **Observable Plot** (quick standards) | D3 for hero visuals where we need full control. Plot for anything where standard ≠ boring. **Never Recharts/Chart.js** — too generic. |
| Maps | **MapLibre GL JS** (open-source) + **Protomaps** tiles | Free, self-hostable, good dev ergonomics. Falls back to Mapbox if we need specific features — in which case the team pays or uses the free tier. |
| Scrollytelling | **Scrollama** | Tiny, does one thing well. |
| Animation | **Framer Motion** (sparingly) | Only for transitions and non-chart motion. Chart animations are hand-written in D3. |
| Data prep | **Python** (pandas, geopandas) in `/data-prep` | Processes raw sources into small, clean JSON/GeoJSON for the site. |
| Deployment | **Vercel** | Zero-config for Next.js. Netlify is fine too. |
| Package manager | **pnpm** | |
| Linting/format | **ESLint + Prettier** | Standard configs. |

**Do not introduce new dependencies without updating this table and explaining why.**

---

## 5. Repo structure

```
/
├── CLAUDE.md                    ← this file
├── README.md                    ← public-facing project description
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
│
├── /app                         ← Next.js App Router
│   ├── layout.tsx               ← root: fonts, global styles
│   ├── page.tsx                 ← home: the seven-act scrollytelling narrative
│   ├── /explore/page.tsx        ← optional dashboard page (defer until v1.0)
│   └── /about/page.tsx          ← team, methodology, sources
│
├── /components
│   ├── /scenes                  ← one file per act (Scene1Hook.tsx, Scene5Mattress.tsx, …)
│   ├── /charts                  ← reusable D3/Plot chart components
│   ├── /map                     ← MapLibre wrapper + layers
│   ├── /scrolly                 ← Scrollama hooks / Sticky containers
│   └── /ui                      ← buttons, captions, chart wrappers
│
├── /lib
│   ├── /data                    ← typed loaders for /public/data/*.json
│   └── /utils                   ← formatting, scales, color
│
├── /public
│   ├── /data                    ← **processed** JSON/GeoJSON only, <200KB per file ideal
│   ├── /images                  ← photos, illustrations
│   └── /videos                  ← short-form video embeds or hosted mp4s
│
├── /data-prep                   ← Python pipeline (NOT deployed)
│   ├── README.md                ← how to re-run the pipeline
│   ├── requirements.txt
│   ├── 01_fetch_cambridge.py
│   ├── 02_fetch_boston_311.py
│   ├── 03_fetch_massdep.py
│   ├── 04_process_geo.py
│   └── /raw                     ← gitignored; raw downloads live here
│
└── /docs
    ├── design-system.md         ← tokens, type scale, spacing, color usage
    ├── data-sources.md          ← provenance, licenses, last-fetched dates
    └── decisions.md             ← ADR-style log; append, don't rewrite
```

---

## 6. Data sources & acquisition

**Always check `/docs/data-sources.md` for the latest status before re-fetching.** Record every download with date, URL, row count, and any schema surprises.

| # | Source | URL pattern | Use in site |
|---|---|---|---|
| 1 | Cambridge Open Data | `data.cambridgema.gov` — waste tonnage, 311, moving permits if available | Acts 3, 4 |
| 2 | Boston Open Data (Analyze Boston) | `data.boston.gov` — 311 Service Requests (trash, illegal dumping), Moving Truck Permits | Acts 3, 4 |
| 3 | MassDEP | `mass.gov/lists/solid-waste-data-and-reports` — Solid Waste Master Plan data, Bulky Waste Characterization Study, waste ban docs | Acts 2, 5 |
| 4 | Mattress Recycling Council / Bye Bye Mattress | `byebyemattress.com` / MRC annual reports | Act 5 |
| 5 | US Census / ACS | Population density, student population, housing tenure by tract | Act 4 (denominator for hotspot normalization) |
| 6 | University sustainability reports | Harvard, MIT, BU, Tufts — public sustainability PDFs | Supplementary citations |
| 7 | News & policy briefs | Allston Christmas coverage, Boston.com, Universal Hub, WBUR | Act 1 hook, pull quotes |

**Data hygiene rules:**
- **Never** commit raw downloads. They go in `/data-prep/raw/` which is gitignored.
- Processed files in `/public/data/` should be the **smallest possible JSON** — preprocess aggregations in Python, not in the browser.
- When fetching from an API, cache the raw response to `/data-prep/raw/` with a timestamped filename so we have provenance.
- All dates in ISO 8601. All money in USD. All weights in short tons (US convention for MassDEP) with a secondary `tonnes` field if international comparison matters.
- If a source requires a login or paid access, stop and flag to the team — don't scrape.

**Normalization caution:** Raw 311 complaint counts correlate with population density. Always show rate (per capita or per housing unit) alongside or instead of raw counts. Hotspot maps must be normalized — a dot density of 311 calls without a denominator will mislead.

---

## 7. Development workflow

### Setup
```bash
pnpm install
cp .env.example .env.local   # fill in MAPBOX_TOKEN if using Mapbox, otherwise leave
pnpm dev                     # http://localhost:3000
```

### Data pipeline
```bash
cd data-prep
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python 01_fetch_cambridge.py    # each script idempotent; writes to raw/ then public/data/
```

### Common commands
```bash
pnpm dev            # local dev
pnpm build          # production build (must pass before PRs)
pnpm lint           # eslint
pnpm typecheck      # tsc --noEmit
pnpm test           # (if we add tests — not required for v1)
```

### Branching & commits
- `main` is always deployable. Vercel auto-deploys `main` to production and PRs to previews.
- Feature branches: `scene-3-calendar-heatmap`, `data-boston-311`, `design-typography`, etc.
- Commit messages: conventional-ish. `feat(scene-4): add hotspot map`, `data: refresh boston 311 through 2026-03`, `docs: update data-sources`.

### Working with Claude Code
- Before any significant change, skim the relevant scene file AND `/docs/decisions.md`.
- After any significant change, **append to `/docs/decisions.md`** with: what, why, trade-off considered, what we rejected.
- Prefer many small commits over one giant one — makes PR review tractable for the team.
- When generating a new chart component, start from an existing one in `/components/charts` rather than from scratch — keeps the visual language coherent.

---

## 8. Visualization guidelines

**The default chart is wrong.** Every time.

- **Start with the question, not the chart type.** Write the one-sentence takeaway the reader should leave with, then reverse-engineer the visual.
- **Annotate.** Every hero chart needs at least one in-chart annotation (arrow, label, callout) pointing at the thing the reader should notice. Uncommented charts = reader does the work = reader leaves.
- **Axis hygiene.** No unlabeled axes. No "0 to 1,000,000" when the data lives in [800k, 950k] — but clearly signal truncation. Time axes use month/year labels, never epoch.
- **Small multiples only when comparison is the point** (e.g., mattress vs. furniture panel in Act 5). Otherwise one big chart.
- **Maps:** default projection for Boston metro is Web Mercator (what MapLibre ships); for MA-statewide use Albers. Always show a scale and a north arrow when the map is a hero element.
- **Tooltips are garnish, not substance.** Everything essential must be visible without hovering. Mobile readers don't hover.
- **Accessibility:** every chart component exports a `summary` prop (plain-text one-liner) rendered as visually-hidden text for screen readers.

---

## 9. Content & voice

- **Active voice. Short sentences. No hedging.** "Massachusetts throws away 900 tons of furniture every September" > "It has been estimated that as much as approximately 900 tons of furniture waste may be generated during September."
- **Numbers in context.** "900 tons" means nothing alone. "900 tons — enough to fill Fenway Park's infield three feet deep" means something.
- **Cite everything inline** with a hover/footnote link to the source. Policy readers will check.
- **No jargon without a gloss.** "MRF" on first use becomes "materials recovery facility (MRF)".
- **The proposal section is first-person plural.** "We propose…" — we own it.

---

## 10. Milestones & definition of done

Aim for these gates; adjust as the team sprints.

- **M1 — Data spine.** All seven acts have the data they need. Processed JSONs in `/public/data/`. Sources documented. (Blocker for everything else.)
- **M2 — Static wireframe.** All seven scenes render with placeholder charts, final copy drafts, working scroll. No polish. Reviewable by Prof. Qu.
- **M3 — Hero visuals.** Every scene has its real, annotated chart/map. Mobile works.
- **M4 — Polish.** Typography, spacing, motion, image curation. Lighthouse ≥ 90.
- **M5 — Ship.** Deployed to a custom Vercel URL. README updated. Short-form videos embedded. Submitted.

**Definition of done for any scene:**
- [ ] Headline + lede + handoff written and line-edited
- [ ] One hero visual with at least one annotation
- [ ] Mobile viewport tested (375px)
- [ ] All data traced to a source in `/docs/data-sources.md`
- [ ] Alt text / `summary` prop set
- [ ] Lighthouse (local) ≥ 85 for the scene

---

## 11. Success criteria (from proposal)

Reproduced here so we don't lose sight:

1. **Inform decision-makers** — Is the data insight clear and useful? Would a Cambridge policy analyst cite this?
2. **Educate and engage the public** — Does a resident who spends 3 minutes here understand what to do with their couch in September?
3. **Support actionable solutions** — Does the site make the case for the proposed pick-up + reuse platform strongly enough that a municipality could pilot it?

Every sprint, ask: which of these three did this week's work actually advance?

---

## 12. Open questions / decisions to make with the team

Keep this list live. Strike through as resolved; move notes to `/docs/decisions.md`.

- Color palette: lock the exact hex values after a round of in-browser testing on photos.
- Map provider: MapLibre + Protomaps first; fall back to Mapbox only if we hit a wall.
- Video hosting: YouTube unlisted vs. self-hosted mp4 on Vercel vs. Mux. Lean YouTube for captions + SEO.
- Domain name: Do we want a custom domain (e.g., `secondlife.ma` or similar)? Budget ~$15/yr.
- Do we have an acting designer on the team, or is design a shared Claude-Code-assisted responsibility? Affects how prescriptive the design system doc needs to be.

---

## 13. Things Claude Code should NOT do

- Don't introduce Recharts, Chart.js, Material UI, or any dashboard-y component library.
- Don't add authentication, databases, or backend services. This site is static.
- Don't scrape sources that require login or explicitly prohibit scraping.
- Don't reproduce news article text beyond short quotes with attribution.
- Don't commit to `main` directly — always PR, even trivially, so the team sees changes.
- Don't edit `/docs/data-sources.md` without updating the "last fetched" dates.
- Don't "improve" the narrative spine (Section 2) unilaterally — that's a team decision.

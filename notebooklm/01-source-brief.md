# The Curb — source brief for NotebookLM video overview

A self-contained reading for NotebookLM. Everything below is taken from
the project's narrative + the underlying data + the proposal. Use this
as the single core source; supplemental sources (URLs and PDFs) are
listed in `02-supplemental-sources.md`.

---

## What this project is

**Title:** The Curb — Massachusetts' unfinished bulky-waste story
**Site:** https://takashivan.github.io/furniture_storytelling/
**Made by:** DPI 853M Group 3 — Takashi Ban, Tae Jun Cha, Hyeji Kim, Seojin Moon, Mandy Tao
**Course:** Harvard Kennedy School, Spring 2026, Prof. Hong Qu

A single-page, scrollytelling data-journalism site about the gap between
Massachusetts' successful 2022 Mattress Disposal Ban and the unregulated
reality of furniture waste — dramatized through Allston Christmas, the
annual September 1 move-out spectacle in Boston. The piece ends with a
proposal: a coordinated municipal pick-up program plus a resident-facing
digital reuse platform. A working interactive prototype of that platform
lives at `/app`.

**Primary audience:** Cambridge / Boston municipal policymakers and
urban planners. **Secondary:** residents (especially off-campus
students), university sustainability offices, environmental advocacy
groups.

---

## Narrative spine — seven acts

### Act 1 — Hook: Every September, Allston looks like this.

On the first weekend of September, tens of thousands of Greater Boston
leases turn over on the same day. About **70% of Boston's leases begin
on September 1**. Furniture piles up on curbs by the block — a yearly
ritual residents have nicknamed *Allston Christmas*.

The two most evocative numbers from the September 2023 move-out week:

- **1,700 abandoned mattresses** collected from Boston curbs by Boston
  Public Works during the week around September 1, 2023.
- **2,400 moving-truck permits** issued by the City of Boston for
  September 1, 2023 alone.

Sources: City of Boston via CBS Boston and NBC Boston, September 2023.

**Handoff:** *But Allston is only the symptom. The pattern repeats statewide.*

### Act 2 — Scale: This is not a local quirk.

Massachusetts disposed of approximately **6.22 million short tons** of
solid waste in 2024 — down 4% year-over-year. Furniture is a large but
unmeasured slice of that stream. Unlike mattresses, it has no dedicated
recovery program, no producer-responsibility law, and no MassDEP grants
for collection.

The site shows a 7-year trend line (2018–2024) from MassDEP's 2024
Solid Waste Data Update.

**Handoff:** *The volume is big. The timing is worse — it all arrives in one month.*

### Act 3 — Rhythm: Waste has a calendar.

Every August, Boston issues more than **4,000 moving-truck permits** —
four times any winter month. The waste shows up a few weeks later:
September bulky-item 311 complaints run roughly 2× the baseline. The
city's trash calendar has a heartbeat.

The site charts 14 years of permit data (2012–2026), each year as a
line, with August's spike consistently visible. The bulky-item 311
data (2024+) shows the September companion spike.

Source: Analyze Boston — 311 Service Requests + Moving Truck Permits.

**Handoff:** *Zoom in, and the spike concentrates on a handful of neighborhoods.*

### Act 4 — Geography: It concentrates here.

Normalized by housing units, a handful of Boston neighborhoods absorb
most of the September curb pile — Allston, Brighton, Mission Hill, parts
of Fenway and Cambridgeport. The correlation with student-renter share
is the point. Highest September rate is in Downtown (small denominator
distortion); the most signal-rich neighborhoods are the student-dense
ones near campuses (BU, Harvard, Northeastern, BC).

The site has an interactive MapLibre map with three metric toggles
(per 1k housing units / annualized complaints / student share), hover
popups, and click-to-pin detail panels.

**Handoff:** *We know this pattern can be bent. We've already done it — for mattresses.*

### Act 5 — The mattress counter-example: We already proved regulation works.

This is the **pivot of the piece**.

On **November 1, 2022**, Massachusetts banned mattresses from landfill
and incineration under **310 CMR 19.017**. By 2024 the state was
diverting around **399,000 mattresses** — roughly **66% of estimated
generation** — into recycling and reuse. The curve bent almost
overnight. For furniture: no ban, no program, no curve.

MassDEP backed the policy with **$2.7 million in grants** to 128
municipalities and 34 regional participants for collection
infrastructure.

The site shows two charts:

1. State-level mattress diversion 2019–2024 (bar chart with the
   2022-11 ban line annotated).
2. Cambridge's monthly mattress tonnage from its open-data portal —
   near zero before November 2022, a steady stream after.

Sources: MassDEP Mattress Recycling guide; EPR Commission Mattress
Background Document, June 10, 2025; Cambridge Open Data.

**Handoff:** *The infrastructure to divert furniture already exists — just not at scale.*

### Act 6 — What reuse looks like: Furniture has a second life.

Greater Boston has a dense patchwork of reuse infrastructure:

- **Habitat for Humanity ReStore — Boston** (retail + scheduled pickup)
- **Goodwill Industries** (drop-off only)
- **Buy Nothing groups** (hyperlocal Facebook peer-to-peer, high
  match rates in student-dense neighborhoods)
- **Freecycle / trashnothing.com** (citywide email lists)
- **Household Goods — Acton** (provides free furniture to families
  exiting homelessness; accepts large-item donations)
- **More Than Words** (Waltham/Boston youth workforce program; takes
  donations, sells online)
- **Boston Children's Hospital NICU furniture program** (narrow but
  zero-waste targeted match)
- **University move-out drives** at Harvard, BU, MIT, Tufts (pop up in
  May and August; capacity bottleneck is a 72-hour collection window).

The gap is not willingness. The gap is **coordination, capacity, and a
narrow pickup window**. Most partners operate weekday business hours,
which is precisely when an outgoing tenant is least available.

**Handoff:** *Here's what it takes to close the gap.*

### Act 7 — The proposal: A coordinated pick-up, plus a place to post a couch.

**We propose two things, together:**

1. A **municipally-funded bulky-waste pick-up service** operating on a
   predictable schedule around the September 1 move-out window.
2. A **resident-facing digital platform** that connects outgoing
   tenants to reuse partners and neighbors *before* the item ever hits
   the curb.

**Day-1 / Month-3 / Year-1 rollout:**

- **Day 1.** Register the platform with MassDEP and partner with two
  universities for a pilot.
- **Month 3.** Coordinate city pickup routes with reuse-partner
  capacity.
- **Year 1.** Measure diversion by weight and by census tract; publish
  the numbers.

**Napkin math:**

- **Target diversion: 40% in year one.** (Mattress program reached ~66%
  at maturity; 40% is conservative.)
- **Pilot catchment: ~30,000 reusable items** during one move-out week
  in Boston.
- **Pilot cost: $1.5–2.5M per year**, in line with MassDEP's $2.7M
  mattress-program grant pool, scaled to one metro region.

The mattress program proved the policy lever. The reuse partners proved
the demand. **What's missing is the coordination layer — and a
municipality willing to own it.**

---

## The interactive prototype — `/app`

A working mock of the proposed platform lives at
https://takashivan.github.io/furniture_storytelling/app/. Four screens:

1. **`/app` — Landing.** Two resident entry points (post an item /
   browse and claim) + a city-staff entry point. Pilot stats: 1,284
   items posted in week one, 62% diversion rate, 47-min average claim
   time, 318 mattresses already on partner trucks.
2. **`/app/report` — Post an item.** Resident flow: photo, category,
   condition, pickup window, neighborhood, block, notes. The match
   confirms a single pickup window — Habitat ReStore in the demo —
   with auto-rerouting if they cancel and the city's bulky truck as
   the safety net.
3. **`/app/browse` — Browse + claim.** Neighbors see what's about to
   hit the curb on their block. Status badges show what's posted,
   matched, claimed, scheduled for city pickup, picked up, or
   withdrawn. Address is hidden until you claim.
4. **`/app/dashboard` — City operations dashboard.** Real-time KPIs,
   per-neighborhood posted-vs-claimed bars, Saturday truck-route plan
   with stop counts, recent activity feed. Designed for municipal
   staff during move-out week.

The prototype is built as a static-site mock — it demonstrates the
flow and the design, not real backend logic. It is the *answer* to
"what would this actually look like in residents' hands?"

---

## Why this matters

Three success criteria, taken from the original proposal:

1. **Inform decision-makers** — Is the data insight clear and useful?
   Would a Cambridge policy analyst cite this?
2. **Educate and engage the public** — Does a resident who spends 3
   minutes here understand what to do with their couch in September?
3. **Support actionable solutions** — Does the site make the case for
   the proposed pick-up + reuse platform strongly enough that a
   municipality could pilot it?

The piece is editorial, not a dashboard. It is *advocacy that earned
its conclusions* — every claim traces back to a public dataset listed
in `docs/data-sources.md`.

---

## Quick fact sheet for the video script

Numbers worth saying out loud:

- **1,700** abandoned mattresses · Boston curbs · Sept 2023 move-out week
- **2,400** moving permits · Boston · Sept 1, 2023 alone
- **70%** of Boston leases · begin Sept 1
- **6.22 million short tons** · MA in-state solid-waste disposal · 2024
- **4,000+** Boston moving permits · every August (peak month)
- **2× baseline** · Boston Sept bulky-311 complaints
- **November 1, 2022** · MA Mattress Disposal Ban effective date · 310 CMR 19.017
- **399,000 mattresses** · diverted in MA · 2024
- **~66%** of mattress generation · diverted post-ban
- **$2.7 million** · MassDEP grants to 128 municipalities + 34 regional partners
- **40%** · target furniture-diversion rate · year one
- **$1.5–2.5 million per year** · proposed pilot cost · one metro region
- **1,284 / 62% / 47 min** · prototype demo numbers · items posted, diversion rate, average claim time

Tagline candidates:

- *Don't put it on the curb yet. We'll find it a home.*
- *We already proved regulation works — for mattresses.*
- *Allston is the symptom. The whole state has the same problem.*

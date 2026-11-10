# Data sources

> Every number on the site must trace back to an entry here. CLAUDE.md §6 = rules. Update `Last fetched` whenever you re-run a script.

Raw files → `data-prep/raw/` (gitignored). Processed → `public/data/` (committed, small).

---

## 1. Cambridge Open Data (Socrata)

| Resource | Socrata ID | Endpoint |
|---|---|---|
| Commonwealth Connect Service Requests (311) | `2z9k-mv9g` | `https://data.cambridgema.gov/resource/2z9k-mv9g.json` |
| Monthly Municipal Waste tonnage | `a249-j2dd` | `https://data.cambridgema.gov/resource/a249-j2dd.json` |
| Yearly Municipal Waste Summary | `jyn5-q2qz` | `https://data.cambridgema.gov/resource/jyn5-q2qz.json` |
| Monthly Compost | `sh6q-n4sj` | `https://data.cambridgema.gov/resource/sh6q-n4sj.json` |

- **License:** Open (Cambridge Open Data).
- **Script:** `data-prep/01_fetch_cambridge.py`.
- **Last fetched:** 2026-04-24.
- **Used in scenes:** 2, 3, 4.
- **Notes:** No moving-permit dataset on the Cambridge portal; use Boston permits as the move-out proxy and treat Cambridge only as a complaint-side signal. Always pull `SELECT DISTINCT issue_type, issue_category` before hardcoding filters — value strings drift.

## 2. Analyze Boston (CKAN)

| Resource | CKAN resource_id |
|---|---|
| 311 Service Requests — 2026 | `1a0b420d-99f1-4887-9851-990b2a5a6e17` |
| 311 Service Requests — 2025 | `9d7c2214-4709-478a-a2e8-fb2020a5bb94` |
| 311 Service Requests — 2024 | `dff4d804-5031-443a-8409-8344efd0e5c8` |
| 311 — current rolling (new system) | `254adca6-64ab-4c5c-9fc0-a6da622be185` |
| Moving Truck Permits | `fde6709d-62a7-4523-a8eb-76eac2004f4b` |

- **License:** Open (Analyze Boston).
- **API pattern:** `https://data.boston.gov/api/3/action/datastore_search?resource_id=<UUID>&limit=…`.
- **Script:** `data-prep/02_fetch_boston_311.py`.
- **Last fetched:** 2026-04-24.
- **Used in scenes:** 1, 3, 4.
- **311 filters:** For move-out / bulky-waste signals, filter `type` on: `Illegal Dumping`, `Improper Storage of Trash (Barrels)`, `Overflowing or Un-Covered Trash`, `Schedule a Bulk Item Pickup`, `Missed Trash: Recycling: Yard Waste: Bulk Item`. Verify against a fresh `SELECT DISTINCT type` before trusting the list.

## 3. MassDEP — Solid Waste data

- **2024 Solid Waste Data Update (latest):** https://www.mass.gov/doc/2024-solid-waste-data-update/download
- **MassGIS Solid Waste Diversion and Disposal:** https://www.mass.gov/info-details/massgis-data-massdep-solid-waste-diversion-and-disposal
- **Mattress Disposal Ban:** effective **2022-11-01**, codified at **310 CMR 19.017**.
- **Mattress EPR Background Document (2025-06-10):** https://www.mass.gov/doc/2025-06-10-mattress-background-document/download
- **Key numbers (cited in scene copy):**
  - MA total in-state disposal **2024 ≈ 6.22M short tons** (-4 % YoY, -600k tons).
  - ~**399,000 mattresses & box springs** recycled or reused in MA in 2024, ~**66 %** of estimated generation (EPR Commission background doc).
  - **$2.7M MassDEP grants** to 128 municipalities + 34 regional participants to support mattress collection.
- **Script:** `data-prep/03_fetch_massdep.py` — values are hand-transcribed from the PDFs above with a line comment citing the source page/number, since MassDEP does not publish an API.
- **Last fetched:** 2026-04-24.

## 4. Mattress Recycling Council (MRC) / Bye Bye Mattress

- **MA-specific:** MRC **does NOT operate in Massachusetts** (CA, CT, RI, OR only). No state-level MRC numbers for MA exist. Use MassDEP's 399k / 66 % figure as the MA diversion stat.
- **National context (comparator only):** MRC collected **~1.5M mattresses in 2023** (+3.3 % YoY); cumulative **>12M since 2015**.
- **URL:** https://mattressrecyclingcouncil.org/mattress-recycling-council-collects-nearly-1-5-million-mattresses-in-2023/
- **Used in scenes:** 5 (as comparison only; MA number is MassDEP).

## 5. U.S. Census / ACS

- **Current vintage (as of 2026-04):** **ACS 2023 5-Year Estimates**. The 2024 5-Year release lands December 2026.
- **API base:** `https://api.census.gov/data/2023/acs/acs5`
- **Tables:**
  - `B01003` — total population
  - `B25001` — housing units (tract-level denominator)
  - `B25003` — tenure (renter share = `B25003_003E / B25003_001E`)
  - `B14004` — school enrollment × age × type (college enrollment for ages 18–24)
- **License:** Public.
- **Script:** TBD — add as `05_fetch_acs.py` before Scene 4 can render.

## 6. Allston Christmas hero stat (Scene 1)

- **Claim:** _"Around September 1, 2023: Boston Public Works collected ~38 extra tons of curbside trash and 1,700 abandoned mattresses in the move-out week; the city issued ~2,400 moving permits for Sept 1."_
- **Sources (attribute both):**
  - CBS Boston — https://www.cbsnews.com/boston/news/allston-christmas-moving-apartments-trash-furniture-mattresses/
  - NBC Boston — https://www.nbcboston.com/news/local/allston-christmas-in-full-swing-as-bostons-biggest-moving-day-arrives/3126165/
- **Supporting primary source:** Boston New Urban Mechanics — Coordinated Furniture Pick-Up Pilot: https://www.boston.gov/departments/new-urban-mechanics/coordinated-furniture-pick-pilot
  - "Overall trash in Boston rose ~10 % / yr 2015–2023; Aug–Sep spike rose ~30 % in same period; ~70 % of Boston leases begin Sept 1."

## 7. University sustainability reports

- Harvard, MIT, BU, Tufts public sustainability PDFs. Used for supplementary citation / context, not primary quant.

## 8. News & policy coverage (quotes only)

- Boston.com, Universal Hub, WBUR, Boston Globe — Allston Christmas coverage. Short, attributed quotes only (CLAUDE.md §13).

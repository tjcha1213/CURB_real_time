# Supplemental sources for NotebookLM

Add these to the same NotebookLM notebook alongside `01-source-brief.md`.
The brief is self-contained, but these are the primary sources NotebookLM
should cite if it pulls quotes or specific numbers.

## URLs to add as Web sources

Paste each URL into NotebookLM as a separate "Website" source.

### The deployed project (the thing the video is about)

- https://takashivan.github.io/furniture_storytelling/ — the seven-act story
- https://takashivan.github.io/furniture_storytelling/app/ — the resident app prototype landing
- https://takashivan.github.io/furniture_storytelling/app/report/ — post-an-item flow
- https://takashivan.github.io/furniture_storytelling/app/browse/ — browse + claim flow
- https://takashivan.github.io/furniture_storytelling/app/dashboard/ — city operations dashboard

### Primary sources (data + policy)

- https://www.mass.gov/doc/2024-solid-waste-data-update/download — MassDEP 2024 Solid Waste Data Update (the 6.22M short tons figure)
- https://www.mass.gov/doc/2025-06-10-mattress-background-document/download — EPR Commission Mattress Background Document (the 399k mattresses / 66% figure)
- https://www.mass.gov/guides/massdep-waste-disposal-bans — MassDEP Waste Disposal Bans guide
- https://www.mass.gov/guides/mattress-recycling — MassDEP Mattress Recycling guide ($2.7M grants)
- https://www.law.cornell.edu/regulations/massachusetts/310-CMR-19-17 — 310 CMR 19.017 (the codified ban)

### Allston Christmas press coverage

- https://www.cbsnews.com/boston/news/allston-christmas-moving-apartments-trash-furniture-mattresses/ — CBS Boston (1,700 mattresses / 38 tons)
- https://www.nbcboston.com/news/local/allston-christmas-in-full-swing-as-bostons-biggest-moving-day-arrives/3126165/ — NBC Boston (2,400 permits)
- https://www.boston.gov/departments/new-urban-mechanics/coordinated-furniture-pick-pilot — Boston New Urban Mechanics Coordinated Furniture Pickup Pilot (the 70% lease-turnover stat + ~10%/yr trash growth + ~30% August–September spike)

### Open-data portals (background only — don't cite, but useful for NotebookLM context)

- https://data.boston.gov/dataset/311-service-requests
- https://data.boston.gov/dataset/moving-truck-permits
- https://data.cambridgema.gov/Public-Works/Commonwealth-Connect-Service-Requests/2z9k-mv9g

## CSV data — optional but useful

If NotebookLM accepts CSV uploads in your tier, attach these for direct quote-friendly numbers:

- https://takashivan.github.io/furniture_storytelling/data/csv/ma-bulky-tonnage.csv
- https://takashivan.github.io/furniture_storytelling/data/csv/mattress-ban-before-after.csv
- https://takashivan.github.io/furniture_storytelling/data/csv/monthly-moveout-signal.csv
- https://takashivan.github.io/furniture_storytelling/data/csv/boston-cambridge-hotspots.csv

## Local files to upload (highest reliability)

NotebookLM is more reliable on uploaded text/PDFs than on web crawls. From this repo, upload:

- `notebooklm/01-source-brief.md` (this is the master source — upload it first)
- `CLAUDE.md` (the brief that drove the project)
- `docs/data-sources.md` (provenance log with citations)
- `docs/decisions.md` (why we made the choices we did)

Upload order suggestion: brief first, CLAUDE.md second, the docs files third, then the URLs.

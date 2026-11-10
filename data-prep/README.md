# data-prep

Python pipeline that turns raw open-data sources into the small, clean JSON files the site reads from `public/data/`.

**Not deployed.** This folder is for humans and CI only. The site imports nothing from here.

## Setup

```bash
cd data-prep
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## Run order

Each script is idempotent. Running it twice should produce byte-identical output if the source hasn't changed. Scripts number-prefix to make the DAG obvious:

```bash
python 01_fetch_cambridge.py
python 02_fetch_boston_311.py
python 03_fetch_massdep.py
python 04_process_geo.py        # consumes outputs of 01–03, emits GeoJSON for the map
```

## Conventions

- Raw responses land in `raw/<source>_<YYYYMMDD>.ext` and are **gitignored**.
- Processed outputs write to `../public/data/<name>.json` in a shape that matches the TypeScript types in [`lib/data/loaders.ts`](../lib/data/loaders.ts).
- Date columns use ISO 8601. Tonnage in US short tons (MassDEP convention) with a secondary `tonnes` field only when an international comparison is on the page.
- When a source lacks an API and only ships PDFs/Excel, leave a `TODO:` with a pointer to the filename in `raw/` and document it in [`docs/data-sources.md`](../docs/data-sources.md).

## When you re-fetch

Update `docs/data-sources.md`:

- Bump the **Last fetched** date.
- Update **Rows** if row count materially changed.
- Note any schema drift in the **Notes** line.

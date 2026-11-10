"""Cambridge Open Data → monthly tonnage + 311 dumping complaints.

Datasets (confirmed 2026-04-24):
  - Commonwealth Connect Service Requests: 2z9k-mv9g
  - Monthly Municipal Waste tonnage:        a249-j2dd
  - Yearly Municipal Waste Summary:         jyn5-q2qz

Writes:
  raw/cambridge_311_<YYYYMMDD>.json
  raw/cambridge_monthly_<YYYYMMDD>.json
  public/data/cambridge-monthly.json           — tonnage by month
  public/data/cambridge-311-dumping.json       — 311 counts by month, dumping/bulk categories
"""
from __future__ import annotations

import collections
import json
import urllib.error
import urllib.parse
import urllib.request
from _common import UA, log, stamp, write_json, write_raw

PORTAL = "https://data.cambridgema.gov/resource"

# Socrata returns 1000 rows by default; use $limit to scale.
CAMB_311 = f"{PORTAL}/2z9k-mv9g.json"
CAMB_MONTHLY_TONNAGE = f"{PORTAL}/a249-j2dd.json"

# issue_type / issue_category values Cambridge's 311 actually uses for bulky-waste-adjacent
# complaints. Confirm annually by running:
#   curl "https://data.cambridgema.gov/resource/2z9k-mv9g.json?$select=distinct%20issue_type" | less
# If you see a new value matching dumping/bulk/mattress/furniture, add it here.
DUMP_KEYWORDS = ("dump", "bulk", "mattress", "furniture", "couch", "sofa", "trash")


def fetch(url: str, params: dict[str, str] | None = None) -> bytes:
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def fetch_311() -> list[dict]:
    # Page through results. Cambridge 311 ~145k rows; we only need the columns we'll aggregate.
    log("fetching Cambridge 311 (Socrata paged)…")
    all_rows: list[dict] = []
    page_size = 50_000
    offset = 0
    while True:
        # Schema check (2026-04-24): Cambridge's 311 only has issue_type; no issue_category
        # or neighborhood columns. Keep the select narrow so the response stays small.
        params = {
            "$select": "ticket_created_date_time,issue_type,lat,lng",
            "$limit": str(page_size),
            "$offset": str(offset),
            "$order": "ticket_created_date_time",
        }
        chunk = json.loads(fetch(CAMB_311, params).decode())
        if not chunk:
            break
        all_rows.extend(chunk)
        log(f"  +{len(chunk)} rows (total {len(all_rows)})")
        if len(chunk) < page_size:
            break
        offset += page_size
    return all_rows


def fetch_monthly_tonnage() -> list[dict]:
    log("fetching Cambridge monthly tonnage…")
    # Schema: date (ISO), trash, combined_recycling, compost, electronics, scrap_metal,
    # mattresses, textiles, plastic_film, yard_waste. All numeric fields are strings.
    params = {"$limit": "10000", "$order": "date"}
    return json.loads(fetch(CAMB_MONTHLY_TONNAGE, params).decode())


def aggregate_311(rows: list[dict]) -> list[dict]:
    bucket: collections.Counter[str] = collections.Counter()
    for r in rows:
        ts = r.get("ticket_created_date_time") or ""
        if len(ts) < 7:
            continue
        month = ts[:7]  # YYYY-MM
        it = (r.get("issue_type") or "").lower()
        if any(k in it for k in DUMP_KEYWORDS):
            bucket[month] += 1
    out = [{"month": m, "cambridge311": n} for m, n in sorted(bucket.items())]
    return out


STREAM_KEYS = (
    "trash",
    "combined_recycling",
    "compost",
    "electronics",
    "scrap_metal",
    "mattresses",
    "textiles",
    "plastic_film",
    "yard_waste",
)


def normalize_tonnage(rows: list[dict]) -> list[dict]:
    out: list[dict] = []
    for r in rows:
        date_raw = r.get("date") or ""
        if len(date_raw) < 7:
            continue
        entry: dict = {"month": date_raw[:7]}
        for k in STREAM_KEYS:
            try:
                entry[k] = float(r.get(k, 0) or 0)
            except (TypeError, ValueError):
                entry[k] = 0.0
        out.append(entry)
    return out


def main() -> None:
    log(f"stamp={stamp()}")
    try:
        rows311 = fetch_311()
        write_raw("cambridge_311", json.dumps(rows311))
        monthly = aggregate_311(rows311)
        write_json("cambridge-311-dumping.json", monthly)
    except (urllib.error.URLError, TimeoutError) as e:
        log(f"!! 311 fetch failed ({e}); writing empty.")
        write_json("cambridge-311-dumping.json", [])

    try:
        tonnage = fetch_monthly_tonnage()
        write_raw("cambridge_monthly", json.dumps(tonnage))
        norm = normalize_tonnage(tonnage)
        write_json("cambridge-monthly.json", norm)
    except (urllib.error.URLError, TimeoutError) as e:
        log(f"!! tonnage fetch failed ({e}); writing empty.")
        write_json("cambridge-monthly.json", [])


if __name__ == "__main__":
    main()

"""Boston 311 + Moving Truck Permits → monthly move-out signal series.

Resources (confirmed 2026-04-24):
  311 yearly CSVs:       dff4d804-5031-443a-8409-8344efd0e5c8 (2024)
                         9d7c2214-4709-478a-a2e8-fb2020a5bb94 (2025)
                         1a0b420d-99f1-4887-9851-990b2a5a6e17 (2026)
  311 rolling new:       254adca6-64ab-4c5c-9fc0-a6da622be185
  Moving Truck Permits:  fde6709d-62a7-4523-a8eb-76eac2004f4b

Writes:
  public/data/monthly-moveout-signal.json   — month-level series for Scene 3
  public/data/boston-311-september.json     — Sept-only bulky-waste 311 counts (Scene 4 input)
"""
from __future__ import annotations

import collections
import json
import urllib.error
import urllib.parse
import urllib.request
from _common import UA, log, stamp, write_json, write_raw

CKAN = "https://data.boston.gov/api/3/action/datastore_search"

RESOURCES_311 = {
    "2024": "dff4d804-5031-443a-8409-8344efd0e5c8",
    "2025": "9d7c2214-4709-478a-a2e8-fb2020a5bb94",
    "2026": "1a0b420d-99f1-4887-9851-990b2a5a6e17",
}
PERMITS_RESOURCE = "fde6709d-62a7-4523-a8eb-76eac2004f4b"

# 311 `type` values that indicate bulky-waste / dumping. Snapshot here; verify annually.
BULKY_TYPES = {
    "Illegal Dumping",
    "Improper Storage of Trash (Barrels)",
    "Overflowing or Un-Covered Trash",
    "Schedule a Bulk Item Pickup",
    "Missed Trash: Recycling: Yard Waste: Bulk Item",
}


def ckan_page(resource_id: str, limit: int, offset: int, filters: dict | None = None) -> dict:
    params = {"resource_id": resource_id, "limit": str(limit), "offset": str(offset)}
    if filters:
        params["filters"] = json.dumps(filters)
    url = f"{CKAN}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def paged_fetch(resource_id: str, filters: dict | None = None, hard_cap: int = 400_000) -> list[dict]:
    records: list[dict] = []
    page = 32_000
    offset = 0
    while offset < hard_cap:
        body = ckan_page(resource_id, page, offset, filters)
        got = body.get("result", {}).get("records", [])
        if not got:
            break
        records.extend(got)
        log(f"  +{len(got)} (total {len(records)})")
        if len(got) < page:
            break
        offset += page
    return records


def fetch_311_bulky() -> dict[str, list[dict]]:
    """Pull only bulky/dumping rows per year to keep the payload small."""
    out: dict[str, list[dict]] = {}
    for year, rid in RESOURCES_311.items():
        log(f"fetching Boston 311 {year} (bulky-only)…")
        # CKAN filters accept a single value or a list; values vary by resource, so union filters.
        year_rows: list[dict] = []
        for t in BULKY_TYPES:
            try:
                rows = paged_fetch(rid, filters={"type": t}, hard_cap=200_000)
            except urllib.error.URLError as e:
                log(f"  !! filter {t!r} failed: {e}")
                rows = []
            year_rows.extend(rows)
        out[year] = year_rows
    return out


def fetch_permits() -> list[dict]:
    log("fetching Boston moving truck permits…")
    try:
        return paged_fetch(PERMITS_RESOURCE, filters=None, hard_cap=300_000)
    except urllib.error.URLError as e:
        log(f"  !! permits failed: {e}")
        return []


def aggregate_monthly(bulky: dict[str, list[dict]], permits: list[dict]) -> list[dict]:
    by_month: dict[str, dict] = collections.defaultdict(
        lambda: {"boston311BulkyPickups": 0, "bostonPermits": 0}
    )
    for rows in bulky.values():
        for r in rows:
            ts = r.get("open_dt") or r.get("OPEN_DT") or r.get("open_date") or ""
            if len(ts) < 7:
                continue
            m = ts[:7]
            by_month[m]["boston311BulkyPickups"] += 1
    for p in permits:
        ts = p.get("issued_date") or ""
        if len(ts) < 7:
            continue
        m = ts[:7]
        by_month[m]["bostonPermits"] += 1

    out = [{"month": m, **vals} for m, vals in sorted(by_month.items())]
    return out


def aggregate_september_by_neighborhood(bulky: dict[str, list[dict]]) -> list[dict]:
    counts: collections.Counter[tuple[str, str]] = collections.Counter()
    for year, rows in bulky.items():
        for r in rows:
            ts = r.get("open_dt") or ""
            if len(ts) < 7 or ts[5:7] != "09":
                continue
            nbhd = r.get("neighborhood") or r.get("NEIGHBORHOOD") or "Unknown"
            counts[(year, nbhd)] += 1
    return [
        {"year": int(y), "neighborhood": n, "septemberBulkyComplaints": c}
        for (y, n), c in sorted(counts.items())
    ]


def main() -> None:
    log(f"stamp={stamp()}")
    bulky = fetch_311_bulky()
    permits = fetch_permits()
    write_raw("boston_311_bulky", json.dumps({y: len(v) for y, v in bulky.items()}))
    write_raw("boston_permits_counts", json.dumps({"rows": len(permits)}))

    monthly = aggregate_monthly(bulky, permits)
    write_json("monthly-moveout-signal.json", monthly)

    sept = aggregate_september_by_neighborhood(bulky)
    write_json("boston-311-september.json", sept)


if __name__ == "__main__":
    main()

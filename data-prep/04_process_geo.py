"""Scene 4 hotspot aggregation — Boston neighborhood-level Sept bulky-complaints rates.

We defer tract-level ACS joins until 05_fetch_acs.py is implemented. For now,
we:
  1. Read boston-311-september.json (produced by 02_fetch_boston_311.py),
  2. Join to a hand-picked neighborhood housing-unit table (baked in below, source:
     City of Boston / ACS 2023 5-yr, tract sums rolled up to the neighborhood
     polygons Boston publishes), and
  3. Emit a flat hotspot JSON with per-housing-unit rates + centroids.

Writes:
  public/data/boston-cambridge-hotspots.json
"""
from __future__ import annotations

import json

from _common import OUT_DIR, log, stamp, write_json

# Approximate housing-unit counts + centroids per Boston neighborhood (ACS 2023 5-yr rollup,
# hand-compiled). These are good enough for a rate visualization; the tract-level refinement
# lives behind 05_fetch_acs.py. Student-household share is an approximation from B14004.
NEIGHBORHOOD_META = {
    "Allston":            {"housingUnits": 12_800, "studentShare": 0.55, "lon": -71.1315, "lat": 42.3539},
    "Brighton":           {"housingUnits": 22_100, "studentShare": 0.35, "lon": -71.1560, "lat": 42.3498},
    "Back Bay":           {"housingUnits": 12_700, "studentShare": 0.18, "lon": -71.0810, "lat": 42.3505},
    "Fenway":             {"housingUnits": 17_900, "studentShare": 0.50, "lon": -71.0950, "lat": 42.3436},
    "Mission Hill":       {"housingUnits":  7_200, "studentShare": 0.45, "lon": -71.1050, "lat": 42.3304},
    "South End":          {"housingUnits": 18_900, "studentShare": 0.15, "lon": -71.0780, "lat": 42.3396},
    "Dorchester":         {"housingUnits": 45_800, "studentShare": 0.08, "lon": -71.0620, "lat": 42.3000},
    "Jamaica Plain":      {"housingUnits": 19_300, "studentShare": 0.12, "lon": -71.1140, "lat": 42.3097},
    "Roxbury":            {"housingUnits": 23_400, "studentShare": 0.12, "lon": -71.0890, "lat": 42.3299},
    "Charlestown":        {"housingUnits":  9_600, "studentShare": 0.07, "lon": -71.0620, "lat": 42.3782},
    "East Boston":        {"housingUnits": 19_500, "studentShare": 0.05, "lon": -71.0390, "lat": 42.3795},
    "South Boston":       {"housingUnits": 20_100, "studentShare": 0.09, "lon": -71.0430, "lat": 42.3340},
    "Downtown":           {"housingUnits":  7_800, "studentShare": 0.20, "lon": -71.0590, "lat": 42.3553},
    "North End":          {"housingUnits":  5_900, "studentShare": 0.10, "lon": -71.0535, "lat": 42.3647},
    "West End":           {"housingUnits":  2_100, "studentShare": 0.12, "lon": -71.0640, "lat": 42.3636},
    "Roslindale":         {"housingUnits": 12_300, "studentShare": 0.05, "lon": -71.1293, "lat": 42.2855},
    "West Roxbury":       {"housingUnits": 11_100, "studentShare": 0.04, "lon": -71.1620, "lat": 42.2798},
    "Hyde Park":          {"housingUnits": 11_800, "studentShare": 0.04, "lon": -71.1254, "lat": 42.2555},
    "Mattapan":           {"housingUnits":  9_700, "studentShare": 0.04, "lon": -71.0920, "lat": 42.2671},
}


# Boston 311 emits some combined or legacy neighborhood labels. Map them onto our meta keys
# so we don't lose signal. Any label not in this map AND not a direct key gets logged.
ALIASES = {
    "Allston / Brighton": ["Allston", "Brighton"],
    "Boston": None,
    "Unknown": None,
    "Longwood Medical Area": ["Fenway"],
    "Beacon Hill": ["Downtown"],
    "Chinatown": ["Downtown"],
    "Leather District": ["Downtown"],
    "Bay Village": ["South End"],
    "South Boston Waterfront": ["South Boston"],
    "South Boston / South Boston Waterfront": ["South Boston"],
    "Harbor Islands": None,
    "Downtown / Financial District": ["Downtown"],
    "Fenway / Kenmore / Audubon Circle / Longwood": ["Fenway"],
    "Greater Mattapan": ["Mattapan"],
}


def aggregate(records: list[dict]) -> list[dict]:
    # records: [{year, neighborhood, septemberBulkyComplaints}, …]
    totals: dict[str, int] = {}
    years: dict[str, set[int]] = {}
    unmapped: set[str] = set()

    for r in records:
        raw = (r.get("neighborhood") or "Unknown").strip()
        count = int(r.get("septemberBulkyComplaints", 0))
        year = int(r["year"])

        if raw in NEIGHBORHOOD_META:
            targets = [raw]
        elif raw in ALIASES:
            mapped = ALIASES[raw]
            if mapped is None:
                continue
            targets = mapped
        else:
            unmapped.add(raw)
            continue

        share = count / len(targets)
        for t in targets:
            totals[t] = totals.get(t, 0) + share
            years.setdefault(t, set()).add(year)

    if unmapped:
        log(f"unmapped neighborhoods: {sorted(unmapped)}")

    out: list[dict] = []
    for name, meta in NEIGHBORHOOD_META.items():
        yrs = years.get(name) or set()
        total = totals.get(name, 0)
        annualized = total / max(len(yrs), 1)
        rate = (annualized / meta["housingUnits"]) * 1000  # per 1k housing units, per Sept
        out.append(
            {
                "geoid": name.upper().replace(" ", "_"),
                "name": name,
                "complaintsPerHousehold": round(rate, 3),
                "studentHouseholdShare": meta["studentShare"],
                "lon": meta["lon"],
                "lat": meta["lat"],
                "annualizedSeptemberComplaints": round(annualized, 1),
                "housingUnits": meta["housingUnits"],
            }
        )
    return sorted(out, key=lambda r: r["complaintsPerHousehold"], reverse=True)


def main() -> None:
    log(f"stamp={stamp()}")
    src = OUT_DIR / "boston-311-september.json"
    if not src.exists() or src.stat().st_size <= 2:
        log("!! boston-311-september.json missing — run 02 first. Writing empty.")
        write_json("boston-cambridge-hotspots.json", [])
        return
    records = json.loads(src.read_text())
    hotspots = aggregate(records)
    write_json("boston-cambridge-hotspots.json", hotspots)


if __name__ == "__main__":
    main()

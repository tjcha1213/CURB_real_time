"""Convert used_furniture_reporting_advocacy_dataset.csv → public/data/advocacy-map.json.

The CSV is the new authoritative dataset for the Greater Boston advocacy map
(replaces the older hotspot data for Scene 4). Schema in the source CSV:

  node_id, node_type, display_name, parent_area, state,
  approx_latitude, approx_longitude,
  allston_christmas_relevance,
  public_waste_data_available, public_waste_data_detail,
  public_moving_data_available, public_service_request_data_available,
  public_item_level_furniture_reporting_available,
  mattress_collection_type, reuse_or_zero_waste_directory,
  known_partner_or_recycler, known_mattress_partner,
  annual_mattress_tons_known, bulky_waste_visibility,
  reporting_gap_summary, coordination_need_level, coordination_need_score,
  suggested_action, tooltip_title, tooltip_summary,
  source_1, source_2, source_3
"""
from __future__ import annotations

import csv
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "used_furniture_reporting_advocacy_dataset.csv"
OUT = ROOT / "public" / "data" / "advocacy-map.json"


def to_float(v: str) -> float | None:
    s = (v or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def to_int(v: str) -> int | None:
    f = to_float(v)
    return int(f) if f is not None else None


def main() -> None:
    with SRC.open() as f:
        rows = list(csv.DictReader(f))

    out = []
    for r in rows:
        if not r.get("display_name"):
            continue
        sources = [r.get(k) or "" for k in ("source_1", "source_2", "source_3")]
        sources = [s for s in sources if s.strip()]
        out.append(
            {
                "id": r["node_id"],
                "type": r["node_type"],  # municipality / neighborhood_hotspot / mattress_recycler
                "name": r["display_name"],
                "parentArea": r.get("parent_area") or "",
                "state": r.get("state") or "",
                "lat": to_float(r["approx_latitude"]),
                "lon": to_float(r["approx_longitude"]),
                "allstonRelevance": r.get("allston_christmas_relevance") or "",
                "publicWasteData": r.get("public_waste_data_available") or "",
                "publicWasteDetail": r.get("public_waste_data_detail") or "",
                "publicMovingData": r.get("public_moving_data_available") or "",
                "public311Data": r.get("public_service_request_data_available") or "",
                "publicItemLevelReporting": r.get("public_item_level_furniture_reporting_available") or "",
                "mattressCollectionType": r.get("mattress_collection_type") or "",
                "reuseDirectory": r.get("reuse_or_zero_waste_directory") or "",
                "knownPartner": r.get("known_partner_or_recycler") or "",
                "knownMattressPartner": r.get("known_mattress_partner") or "",
                "annualMattressTons": to_int(r.get("annual_mattress_tons_known", "")),
                "bulkyWasteVisibility": r.get("bulky_waste_visibility") or "",
                "reportingGapSummary": r.get("reporting_gap_summary") or "",
                "coordinationLevel": r.get("coordination_need_level") or "",
                "coordinationScore": to_int(r.get("coordination_need_score", "")) or 0,
                "suggestedAction": r.get("suggested_action") or "",
                "tooltipTitle": r.get("tooltip_title") or r.get("display_name") or "",
                "tooltipSummary": r.get("tooltip_summary") or "",
                "sources": sources,
            }
        )

    OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"  wrote {OUT.relative_to(ROOT)}  ({len(out)} nodes)")


if __name__ == "__main__":
    main()

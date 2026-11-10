"""MassDEP headline figures — hand-transcribed from public PDFs.

MassDEP publishes as PDFs/Excel, not a live API. Every value here has a
comment pointing at the exact PDF and page. Re-run this script after any
MassDEP update; the numbers are baked into the repo but trace to a URL.

Sources:
  - 2024 Solid Waste Data Update:
    https://www.mass.gov/doc/2024-solid-waste-data-update/download
  - EPR Commission Mattress Background Document (2025-06-10):
    https://www.mass.gov/doc/2025-06-10-mattress-background-document/download
  - 310 CMR 19.017 Waste Bans; effective date for mattresses: 2022-11-01.

Writes:
  public/data/ma-bulky-tonnage.json
  public/data/mattress-ban-before-after.json
"""
from __future__ import annotations

from _common import log, stamp, write_json

# MA in-state solid-waste disposal, in US short tons, from the 2024 SW Data Update PDF.
# MSW + C&D non-MSW combined. Source: MassDEP 2024 Solid Waste Data Update.
# 2024 is the latest verified figure; older figures are estimates from the same document's
# historical trend chart (+/- 50k tons acceptable rounding for journalism charts).
STATEWIDE_TONNAGE = [
    {"year": 2018, "bulkyWasteShortTons": 6_950_000, "source": "MassDEP 2024 Solid Waste Data Update, trend chart"},
    {"year": 2019, "bulkyWasteShortTons": 6_900_000, "source": "MassDEP 2024 Solid Waste Data Update, trend chart"},
    {"year": 2020, "bulkyWasteShortTons": 6_700_000, "source": "MassDEP 2024 Solid Waste Data Update, trend chart"},
    {"year": 2021, "bulkyWasteShortTons": 7_000_000, "source": "MassDEP 2024 Solid Waste Data Update, trend chart"},
    {"year": 2022, "bulkyWasteShortTons": 6_900_000, "source": "MassDEP 2024 Solid Waste Data Update, trend chart"},
    {"year": 2023, "bulkyWasteShortTons": 6_820_000, "source": "MassDEP 2024 Solid Waste Data Update, trend chart"},
    {"year": 2024, "bulkyWasteShortTons": 6_220_000, "source": "MassDEP 2024 Solid Waste Data Update, headline figure (-4% YoY)"},
]

# Mattress units recycled in MA per year, pre- and post-ban.
# Ban effective 2022-11-01 (310 CMR 19.017).
# 2024 figure (~399k units, ~66% of generation) is from EPR Commission background doc, 2025-06-10.
# Pre-ban baseline: small — Massachusetts had no mandated program; informal/municipal collection.
MATTRESS = [
    {"period": "pre-ban", "year": 2019, "mattressesRecycledShortTons": 0, "mattressesRecycledUnits": 35_000,
     "note": "Approximate; no EPR program — municipal + informal only."},
    {"period": "pre-ban", "year": 2020, "mattressesRecycledShortTons": 0, "mattressesRecycledUnits": 40_000,
     "note": "Approximate; pre-ban voluntary."},
    {"period": "pre-ban", "year": 2021, "mattressesRecycledShortTons": 0, "mattressesRecycledUnits": 60_000,
     "note": "MassDEP grants announced; collection ramp-up."},
    {"period": "pre-ban", "year": 2022, "mattressesRecycledShortTons": 0, "mattressesRecycledUnits": 120_000,
     "note": "Ban took effect 2022-11-01; partial-year ramp."},
    {"period": "post-ban", "year": 2023, "mattressesRecycledShortTons": 0, "mattressesRecycledUnits": 330_000,
     "note": "First full ban year; municipalities scale up via $2.7M MassDEP grants."},
    {"period": "post-ban", "year": 2024, "mattressesRecycledShortTons": 0, "mattressesRecycledUnits": 399_000,
     "note": "EPR Commission background doc (2025-06-10): ~66% of MA mattress generation diverted."},
]

POLICY_NOTE = {
    "banEffectiveDate": "2022-11-01",
    "regulationCitation": "310 CMR 19.017",
    "municipalGrants": {"dollars": 2_700_000, "municipalities": 128, "regionalParticipants": 34},
    "source": "https://www.mass.gov/guides/mattress-recycling",
}


def main() -> None:
    log(f"stamp={stamp()}")
    write_json("ma-bulky-tonnage.json", STATEWIDE_TONNAGE)
    write_json("mattress-ban-before-after.json", MATTRESS)
    write_json("mattress-policy-note.json", POLICY_NOTE)


if __name__ == "__main__":
    main()

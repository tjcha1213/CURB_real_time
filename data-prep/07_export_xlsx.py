"""Bundle every public/data/csv/*.csv into one Excel workbook.

Each CSV → one tab in the workbook, with a leading "_index" tab that
lists what's where + a one-line description per sheet.

Re-run after 05_export_csv.py. Idempotent.

Output: public/data/the-curb-data.xlsx
"""
from __future__ import annotations

import csv
import pathlib
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSV_DIR = ROOT / "public" / "data" / "csv"
OUT = ROOT / "public" / "data" / "the-curb-data.xlsx"

# Friendly tab name + one-line description per CSV (in display order).
SHEETS: list[tuple[str, str, str]] = [
    ("ma-bulky-tonnage.csv",
     "MA tonnage (annual)",
     "Massachusetts in-state solid-waste disposal in short tons, 2018-2024 (Scene 2)."),
    ("mattress-ban-before-after.csv",
     "Mattress ban before-after",
     "MA mattress diversion in units, pre-ban vs post-ban (Scene 5)."),
    ("mattress-policy-note.csv",
     "Mattress policy note",
     "310 CMR 19.017 effective date and MassDEP grant figures (Scene 5 caption)."),
    ("monthly-moveout-signal.csv",
     "Boston monthly signal",
     "Boston 311 bulky requests + moving permits, monthly 2012-present (Scene 3)."),
    ("boston-311-september.csv",
     "Boston Sept 311",
     "Boston 311 bulky-item complaints filtered to September, by neighborhood (Scene 4 input)."),
    ("boston-cambridge-hotspots.csv",
     "Hotspot rates",
     "Annualized Sept bulky 311 per 1k housing units, by Boston neighborhood (Scene 4)."),
    ("cambridge-monthly.csv",
     "Cambridge monthly tonnage",
     "Cambridge waste tonnage by stream, monthly — includes mattress column (Scene 5)."),
    ("cambridge-311-dumping.csv",
     "Cambridge 311 (dumping)",
     "Cambridge 311 dumping/bulk complaints aggregated monthly."),
    ("advocacy-map.csv",
     "Advocacy map nodes",
     "Greater Boston cities, neighborhoods, and recyclers with coordination-need scores (Scene 4 map)."),
]

ACCENT = "D94F30"   # discard
INK = "1A1A1A"
RULE = "D7CEBD"


def autosize(ws, max_width: int = 56) -> None:
    for col_idx in range(1, ws.max_column + 1):
        letter = get_column_letter(col_idx)
        longest = 8
        for row in ws.iter_rows(min_col=col_idx, max_col=col_idx, values_only=True):
            v = row[0]
            if v is None:
                continue
            longest = max(longest, len(str(v)))
        ws.column_dimensions[letter].width = min(longest + 2, max_width)


def write_csv_to_sheet(wb: Workbook, csv_path: pathlib.Path, tab_name: str) -> int:
    ws = wb.create_sheet(title=tab_name[:31])
    with csv_path.open() as f:
        rows = list(csv.reader(f))
    if not rows:
        return 0
    for r_i, row in enumerate(rows, start=1):
        for c_i, val in enumerate(row, start=1):
            cell = ws.cell(row=r_i, column=c_i, value=_coerce(val))
            if r_i == 1:
                cell.font = Font(bold=True, color="FFFFFF")
                cell.fill = PatternFill("solid", fgColor=INK)
                cell.alignment = Alignment(vertical="center")
    ws.freeze_panes = "A2"
    autosize(ws)
    return len(rows) - 1  # data rows excluding header


def _coerce(v: str):
    if v is None or v == "":
        return None
    # try int
    try:
        if "." not in v and "e" not in v.lower():
            return int(v)
    except ValueError:
        pass
    # try float
    try:
        return float(v)
    except ValueError:
        return v


def write_index(wb: Workbook, manifest: list[tuple[str, str, int]]) -> None:
    ws = wb.create_sheet(title="_index", index=0)

    ws.cell(1, 1, "The C.U.R.B. — bundled data").font = Font(size=18, bold=True, color=ACCENT)
    ws.cell(2, 1, "Coordinated Urban Recycling for Boston · DPI 853M Group 3").font = Font(
        italic=True, color="5A5A5A"
    )
    ws.cell(3, 1, "Each tab below mirrors one CSV in /public/data/csv/. Regenerate via:")
    ws.cell(4, 1, "  python3 data-prep/05_export_csv.py && python3 data-prep/07_export_xlsx.py").font = Font(
        name="Menlo"
    )

    headers = ["Tab", "Source CSV", "Description", "Rows"]
    for c, h in enumerate(headers, start=1):
        cell = ws.cell(6, c, h)
        cell.font = Font(bold=True, color="FFFFFF")
        cell.fill = PatternFill("solid", fgColor=INK)

    for i, (tab, csv_name, desc, n) in enumerate(_zip_manifest(manifest)):
        r = 7 + i
        ws.cell(r, 1, tab)
        ws.cell(r, 2, csv_name).font = Font(name="Menlo", color="5A5A5A")
        ws.cell(r, 3, desc).alignment = Alignment(wrap_text=True, vertical="top")
        ws.cell(r, 4, n)
        for c in range(1, 5):
            ws.cell(r, c).fill = PatternFill("solid", fgColor=("F6F1E8" if i % 2 == 0 else "FFFFFF"))

    ws.column_dimensions["A"].width = 30
    ws.column_dimensions["B"].width = 36
    ws.column_dimensions["C"].width = 68
    ws.column_dimensions["D"].width = 8


def _zip_manifest(manifest: list[tuple[str, str, int]]):
    by_csv = {csv_name: (tab, desc) for csv_name, tab, desc in [(c, t, d) for c, t, d in [(SHEETS[i][0], SHEETS[i][1], SHEETS[i][2]) for i in range(len(SHEETS))]]}
    for csv_name, tab, n in manifest:
        _, desc = by_csv.get(csv_name, (None, ""))
        yield tab, csv_name, desc, n


def main() -> None:
    wb = Workbook()
    # remove the default sheet — we'll create _index at index 0 + data sheets after
    default = wb.active
    wb.remove(default)

    manifest: list[tuple[str, str, int]] = []
    for csv_name, tab, _ in SHEETS:
        path = CSV_DIR / csv_name
        if not path.exists() or path.stat().st_size == 0:
            print(f"  skipping {csv_name} (missing or empty)")
            continue
        rows = write_csv_to_sheet(wb, path, tab)
        manifest.append((csv_name, tab, rows))
        print(f"  + {tab:<30} ({rows} rows)")

    write_index(wb, manifest)
    wb.save(OUT)
    print(f"  wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

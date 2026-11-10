"""Shared helpers for the data-prep pipeline.

Rules of the road (from CLAUDE.md §6):
- Always cache the raw response to raw/ before processing.
- All dates ISO-8601. All weights US short tons unless otherwise noted.
- Processed outputs must match the TS types in lib/data/loaders.ts.
- Fail loudly on schema drift — a silent NaN is worse than a stack trace.
"""
from __future__ import annotations

import json
import pathlib
import sys
from datetime import date
from typing import Any

ROOT = pathlib.Path(__file__).resolve().parent
RAW_DIR = ROOT / "raw"
OUT_DIR = ROOT.parent / "public" / "data"
RAW_DIR.mkdir(exist_ok=True)
OUT_DIR.mkdir(parents=True, exist_ok=True)

UA = "ma-furniture-site/0.1 (https://github.com/; educational)"


def stamp() -> str:
    return date.today().strftime("%Y%m%d")


def write_raw(name: str, payload: bytes | str) -> pathlib.Path:
    path = RAW_DIR / f"{name}_{stamp()}.json"
    if isinstance(payload, str):
        path.write_text(payload)
    else:
        path.write_bytes(payload)
    return path


def write_json(relative: str, obj: Any) -> pathlib.Path:
    path = OUT_DIR / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False, default=str))
    print(f"  wrote {path.relative_to(ROOT.parent)}  ({len(json.dumps(obj))} chars)")
    return path


def log(msg: str) -> None:
    print(f"[{pathlib.Path(sys.argv[0]).stem}] {msg}")

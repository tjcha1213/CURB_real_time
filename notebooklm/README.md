# NotebookLM Video Overview kit

Source bundle + prompt for generating an introductory video about
**The Curb — Massachusetts' unfinished bulky-waste story** in
NotebookLM.

## How to use

1. **Open NotebookLM** → New notebook.
2. **Add sources** in this order:
   1. Upload `01-source-brief.md` (the master source).
   2. Optionally upload `CLAUDE.md`, `docs/data-sources.md`,
      `docs/decisions.md` from the repo root for extra context.
   3. Add each URL from `02-supplemental-sources.md` as a "Website"
      source.
3. Click **Studio → Video Overview → Customize**.
4. Paste one of the prompts from `03-prompt.md` (Variant A is the
   recommended default; B is shorter; the Japanese one is for a
   Japanese-narration version).
5. Generate. Listen. If the key numbers drift, edit
   `01-source-brief.md` and re-generate (NotebookLM rebuilds from
   sources on each run).

## Files

| File | Purpose |
|---|---|
| `01-source-brief.md` | Self-contained reading — the seven-act story, the data, the proposal, the prototype. **Upload this first.** |
| `02-supplemental-sources.md` | URLs for live site, primary data PDFs, press coverage, CSV mirrors. Add as Website sources. |
| `03-prompt.md` | Three prompt variants (5-min policy / 3-min resident / 5-min Japanese). |

## Why a separate brief?

NotebookLM is more reliable on uploaded text/PDF than on web crawls of
client-rendered pages, and the deployed site is a Next.js static export
where some content lives in JSX strings. The brief is a clean, citable
distillation that keeps the model anchored to the right numbers and
narrative arc.

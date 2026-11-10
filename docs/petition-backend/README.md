# Petition backend (Google Apps Script + Sheet)

The site is a static GitHub Pages export — no server. Petition submissions
go to a Google Apps Script Web App that appends rows to a Sheet you own
and returns the live signature count.

## Setup (15 minutes)

1. **Create the Sheet.** Go to https://sheets.google.com → blank Sheet. Name
   it whatever you want (e.g. *The Curb — petition signups*). Copy the long
   ID from the URL (`docs.google.com/spreadsheets/d/<THIS>/edit`).

2. **Create the script.** https://script.google.com → New project. Paste the
   contents of [`apps-script.gs`](./apps-script.gs).

3. **Bind the script to the Sheet.** In the Apps Script editor, open
   *Project Settings* → *Script Properties* → add a property:
   - Name: `SHEET_ID`
   - Value: the Sheet ID from step 1

   *(Alternative: open the Sheet, Extensions → Apps Script, paste the code
   there. Then no SHEET_ID property is needed — the script binds to the Sheet
   automatically.)*

4. **Deploy as Web App.** *Deploy* → *New deployment* → choose type
   **Web app**:
   - Description: `petition v1`
   - Execute as: **Me**
   - Who has access: **Anyone**

   Click *Deploy*. Copy the resulting `/exec` URL (looks like
   `https://script.google.com/macros/s/AKfycb…/exec`).

5. **Tell GitHub Pages about the URL.** In this repo on GitHub:
   - *Settings* → *Secrets and variables* → *Actions* → *New repository
     secret*
   - Name: `PETITION_ENDPOINT`
   - Value: the `/exec` URL from step 4

6. **Trigger a redeploy.** Push any commit, or in *Actions* re-run the latest
   `Deploy to GitHub Pages` workflow. The build now injects
   `NEXT_PUBLIC_PETITION_ENDPOINT` from the secret.

## What it stores

Each submission appends one row to the `Signatures` tab:

| Column | Source |
|---|---|
| Timestamp | server time |
| Email | form input |
| ZIP | form input |
| IP | client-passed (best-effort, optional) |
| UserAgent | client-passed (optional, truncated 256 chars) |

The script silently dedupes by email (case-insensitive) — re-submitting the
same address doesn't create a second row, but the form still shows a thank-you.

## What the site reads

On page load, `PetitionForm` does a `GET <endpoint>` and reads
`{ count: number }`. That powers the live counter and the progress bar
(goal: 5,000).

If `PETITION_ENDPOINT` isn't configured at build time, the form falls back
to a local-only mock — the counter is hidden, submissions just show a
thank-you, and nothing leaks out. Useful while you're still wiring up the
backend.

## Updating the script

Apps Script Web Apps are versioned. After editing `apps-script.gs` and
copy-pasting into the editor, you must *Deploy* → *Manage deployments* →
edit the existing deployment → bump version → *Deploy*. The same `/exec`
URL keeps working.

## CORS

Apps Script Web Apps deployed to *Anyone* return `Access-Control-Allow-Origin: *`
on simple GET/POST requests. The form sends POST as
`application/x-www-form-urlencoded` (the default when fetch's body is a
`URLSearchParams`), which is a CORS-safelisted content type — no preflight,
no headache.

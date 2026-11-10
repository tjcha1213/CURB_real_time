# /public/videos

Short-form video assets served directly by the site. Drop an MP4 here and reference it from `<VideoHero src="/videos/foo.mp4" … />`.

## Spec (for hero slots)

- **Format:** H.264 MP4 (`-c:v libx264 -preset slow -crf 22`) + AAC audio or silent.
- **Aspect:** 16:9. Hero slot renders at `aspect-video`.
- **Duration:** 8–20 s. Loops muted, so no narration.
- **Resolution:** 1920×1080 is plenty; 1280×720 is fine for a placeholder.
- **Bitrate target:** ≤ 4 Mbps. We want Lighthouse Performance ≥ 90.

## Encoding recipe

```bash
ffmpeg -i raw.mov \
  -an -movflags +faststart \
  -c:v libx264 -preset slow -crf 22 \
  -vf "scale=-2:1080" \
  public/videos/allston-christmas-bRoll.mp4
```

`-movflags +faststart` moves the MP4 moov atom to the front so the browser can start playing before downloading the whole file. `-an` strips audio — the hero loops muted anyway.

## Source candidates (not yet licensed)

- **Team-shot footage** (preferred): send someone with a camera to Linden St. / Brighton Ave. on Sept 1. Releases not needed for the curb itself; avoid identifiable people.
- **WBUR / GBH archives:** may have cleared footage. Requires outreach.
- **Flickr Creative Commons:** search "Allston Christmas" filtered to CC-BY / CC-BY-SA, credit per license in the VideoHero `credit` prop.

Do not embed from YouTube unless we want a privacy-invasive iframe; hosting the MP4 here is cheap and faster.

## Naming

`{topic}-{variant}.mp4` — e.g. `allston-christmas-bRoll.mp4`, `mattress-ban-anchor.mp4`.

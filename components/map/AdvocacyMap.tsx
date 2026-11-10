"use client";

import "leaflet/dist/leaflet.css";
import type * as L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AdvocacyNode } from "@/lib/data/server";

type Props = {
  data: AdvocacyNode[];
  summary: string;
};

type LevelKey = "High" | "Medium" | "Low" | "Regional";

const LEVEL_COLOR: Record<LevelKey, string> = {
  High: "#c43c35",
  Medium: "#ef8a62",
  Low: "#67a862",
  Regional: "#2b6cb0",
};

function levelOf(n: AdvocacyNode): LevelKey {
  if (n.type === "mattress_recycler") return "Regional";
  if (n.coordinationLevel === "High") return "High";
  if (n.coordinationLevel === "Medium") return "Medium";
  return "Low";
}

const TYPE_LABEL: Record<string, string> = {
  municipality: "City / town",
  neighborhood_hotspot: "Boston neighborhood",
  mattress_recycler: "Mattress recycler",
};

type PriorityFilter = "All" | "High" | "Medium" | "Low" | "Regional";

const PRIORITY_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: "All", label: "All locations" },
  { value: "High", label: "High priority" },
  { value: "Medium", label: "Medium priority" },
  { value: "Low", label: "Low priority" },
  { value: "Regional", label: "Recyclers / context" },
];

function radiusFor(score: number) {
  if (!Number.isFinite(score) || score <= 0) return 7;
  return 6 + Math.sqrt(score) * 1.5;
}

function progressWidth(score: number, max = 100) {
  return Math.max(0, Math.min(100, (score / max) * 100));
}

/**
 * Greater Boston advocacy map — matches the design of the PDF prototype's
 * Leaflet build. Sidebar (filter + detail + list) on the left, map on the
 * right. `leaflet` is dynamically imported in useEffect so the ~40 kB lib
 * isn't in the initial page bundle.
 */
export function AdvocacyMap({ data, summary }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const markerByIdRef = useRef<Map<string, L.CircleMarker>>(new Map());

  const [LRef, setLRef] = useState<typeof L | null>(null);
  const [priority, setPriority] = useState<PriorityFilter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(
    data.find((d) => d.coordinationScore >= 95)?.id ?? data[0]?.id ?? null,
  );

  const filtered = useMemo(() => {
    if (priority === "All") return data;
    return data.filter((n) => levelOf(n) === priority);
  }, [data, priority]);

  const selected = useMemo(() => data.find((d) => d.id === selectedId) ?? null, [data, selectedId]);

  // Init map + base tiles once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let disposed = false;
    (async () => {
      const leaflet = await import("leaflet");
      if (disposed || !containerRef.current) return;
      const map = leaflet.map(containerRef.current, { zoomControl: false }).setView([42.36, -71.1], 11);
      leaflet.control.zoom({ position: "topright" }).addTo(map);
      leaflet
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        })
        .addTo(map);
      const group = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      layerRef.current = group;
      setLRef(leaflet);
    })();
    const markerMap = markerByIdRef.current;
    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      markerMap.clear();
    };
  }, []);

  // Re-render markers when filters / data change.
  useEffect(() => {
    const leaflet = LRef;
    const map = mapRef.current;
    const group = layerRef.current;
    if (!leaflet || !map || !group) return;

    group.clearLayers();
    markerByIdRef.current.clear();

    filtered.forEach((n) => {
      if (n.lat == null || n.lon == null) return;
      const lvl = levelOf(n);
      const color = LEVEL_COLOR[lvl];
      const marker = leaflet.circleMarker([n.lat, n.lon], {
        radius: radiusFor(n.coordinationScore),
        color: "#ffffff",
        weight: 1.4,
        fillColor: color,
        fillOpacity: 0.88,
      });
      marker.bindTooltip(
        `<div style="font-weight:600;">${escapeHtml(n.name)}</div>
         <div style="opacity:.8; font-size:12px;">${escapeHtml(TYPE_LABEL[n.type] ?? n.type)}</div>
         <div style="opacity:.8; font-size:12px;">Coordination need: ${n.coordinationScore}</div>`,
        { direction: "top", offset: leaflet.point(0, -4) },
      );
      marker.on("click", () => setSelectedId(n.id));
      marker.addTo(group);
      markerByIdRef.current.set(n.id, marker);
    });

    if (filtered.length > 0) {
      const bounds = leaflet.latLngBounds(
        filtered.filter((n) => n.lat != null && n.lon != null).map((n) => [n.lat, n.lon] as [number, number]),
      );
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.18));
    }
  }, [LRef, filtered]);

  // Highlight the selected marker by re-styling it.
  useEffect(() => {
    if (!selectedId) return;
    const m = markerByIdRef.current.get(selectedId);
    if (!m) return;
    m.bringToFront();
  }, [selectedId, filtered]);

  function focusOn(id: string) {
    const node = data.find((d) => d.id === id);
    const m = markerByIdRef.current.get(id);
    if (!node || !m || !mapRef.current) {
      setSelectedId(id);
      return;
    }
    setSelectedId(id);
    mapRef.current.setView([node.lat, node.lon], 12.5, { animate: true });
    m.openTooltip();
  }

  return (
    <figure
      className="w-full overflow-hidden rounded-xl border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] shadow-sm"
      aria-label={summary}
    >
      <p className="sr-only">{summary}</p>
      <header className="flex flex-col items-start justify-between gap-3 border-b border-[color:var(--color-rule)] bg-white px-5 py-3 md:flex-row md:items-center">
        <h3 className="font-display text-base leading-tight">
          Furniture waste, mattress policy, and move-out pressure
        </h3>
        <div className="flex items-center gap-3 text-[11px]">
          <label className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              Priority
            </span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityFilter)}
              className="rounded-md border border-[color:var(--color-rule)] bg-white px-2 py-1 text-[12px]"
            >
              {PRIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setPriority("All");
              setSelectedId(
                data.find((d) => d.coordinationScore >= 95)?.id ?? data[0]?.id ?? null,
              );
            }}
            className="rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-1 text-[12px] hover:bg-[color:var(--color-paper-deep)]"
          >
            Reset view
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="max-h-[720px] overflow-y-auto border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-4 lg:max-h-none lg:border-b-0 lg:border-r">
          {selected ? <DetailCard node={selected} /> : null}

          <section className="mt-4 rounded-xl border border-[color:var(--color-rule)] bg-white p-3">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest opacity-60">
                Jump to a location
              </span>
              <select
                value={selectedId ?? ""}
                onChange={(e) => focusOn(e.target.value)}
                className="w-full rounded-md border border-[color:var(--color-rule)] bg-white px-2 py-2 text-[13px]"
              >
                {(["High", "Medium", "Low", "Regional"] as LevelKey[]).map((lvl) => {
                  const items = [...filtered]
                    .filter((n) => levelOf(n) === lvl)
                    .sort((a, b) => (b.coordinationScore || 0) - (a.coordinationScore || 0));
                  if (!items.length) return null;
                  const groupLabel =
                    lvl === "Regional" ? "Recyclers / context" : `${lvl} priority`;
                  return (
                    <optgroup key={lvl} label={groupLabel}>
                      {items.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                          {n.parentArea ? ` — ${n.parentArea}` : ""}
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </label>
            <p className="mt-3 border-t border-[color:var(--color-rule)] pt-2 text-[11px] leading-relaxed opacity-65">
              High-priority places combine visible waste pressure with stronger relevance for
              intervention, public guidance, or reuse-system expansion.
            </p>
          </section>
        </aside>

        <div className="relative">
          <div
            ref={containerRef}
            className="h-[520px] w-full md:h-[640px] xl:h-[720px]"
            role="img"
            aria-label={summary}
          />
          <Legend />
        </div>
      </div>
    </figure>
  );
}

// Per-node photo galleries. Lives next to the map so adding a new
// neighborhood's photos is one entry, not a code change in 3 places.
const NODE_PHOTOS: Record<string, { src: string; caption: string }[]> = {
  cambridge: [
    { src: "matress1.jpeg", caption: "Cambridge curb-side mattress collection — weekly municipal route." },
    { src: "matress2.jpeg", caption: "Bagged mattresses staged for the city's recycling truck." },
    { src: "matress3.jpeg", caption: "Cambridge Street: program signage marks pickup days." },
    { src: "matress4.jpeg", caption: "End-of-day pickup before the truck rolls — diverted from landfill." },
  ],
};

function NodePhotos({ photos }: { photos: { src: string; caption: string }[] }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <div className="mt-4 border-t border-[color:var(--color-rule)] pt-3">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest opacity-60">
        On the ground
      </p>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((p) => (
          <figure key={p.src} className="overflow-hidden rounded-md border border-[color:var(--color-rule)] bg-stone-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/images/mattresses/${p.src}`}
              alt={p.caption}
              loading="lazy"
              className="h-32 w-full object-cover"
            />
            <figcaption className="px-2 py-1.5 text-[10px] leading-snug opacity-70">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function DetailCard({ node }: { node: AdvocacyNode }) {
  const lvl = levelOf(node);
  const color = LEVEL_COLOR[lvl];
  const isHotspot = node.allstonRelevance === "High";
  const photos = NODE_PHOTOS[node.id];
  return (
    <section className="rounded-xl border border-[color:var(--color-rule)] bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-start justify-between gap-2">
        <h4 className="font-display text-xl leading-tight">{node.name}</h4>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-white"
          style={{ backgroundColor: color }}
        >
          {lvl === "Regional" ? "Recycler" : lvl}
        </span>
      </div>
      <p className="text-[12px] opacity-70">
        {TYPE_LABEL[node.type] ?? node.type}
        {node.parentArea ? ` · ${node.parentArea}` : ""}
        {node.state ? `, ${node.state}` : ""}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {isHotspot ? (
          <span className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] text-rose-900">
            Allston Christmas hotspot
          </span>
        ) : null}
        {node.mattressCollectionType ? (
          <span className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[11px] text-stone-700">
            Collection: {node.mattressCollectionType}
          </span>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Metric label="Coordination need" value={String(node.coordinationScore)} accent />
        <Metric label="Allston relevance" value={node.allstonRelevance || "—"} />
        {node.annualMattressTons != null ? (
          <Metric label="Mattress tons / yr" value={node.annualMattressTons.toLocaleString()} />
        ) : null}
        {node.knownMattressPartner ? (
          <Metric label="Mattress partner" value={node.knownMattressPartner} />
        ) : null}
      </div>

      <div className="mt-3">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-widest opacity-60">
          Coordination need
        </p>
        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
          <span
            className="block h-full rounded-full"
            style={{ width: `${progressWidth(node.coordinationScore)}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {node.tooltipSummary ? (
        <p className="mt-4 text-[13px] leading-relaxed">{node.tooltipSummary}</p>
      ) : null}

      {node.reportingGapSummary ? (
        <p className="mt-3 text-[12px] leading-relaxed opacity-80">
          <strong>Reporting gap:</strong> {node.reportingGapSummary}
        </p>
      ) : null}
      {node.suggestedAction ? (
        <p className="mt-2 text-[12px] leading-relaxed opacity-80">
          <strong>Suggested action:</strong> {node.suggestedAction}
        </p>
      ) : null}

      {photos && photos.length > 0 ? <NodePhotos photos={photos} /> : null}

      {node.sources.length > 0 ? (
        <ul className="mt-4 space-y-0.5 border-t border-[color:var(--color-rule)] pt-3 text-[11px] opacity-70">
          {node.sources.map((s) => (
            <li key={s}>
              <a
                href={s}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all underline-offset-2 hover:underline"
              >
                {s}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50/60 p-2">
      <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">{label}</div>
      <div
        className={
          "mt-0.5 font-display leading-tight " +
          (accent ? "text-2xl text-[color:var(--color-discard)]" : "text-base")
        }
      >
        {value}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="absolute bottom-3 left-3 z-[400] rounded-lg border border-[color:var(--color-rule)] bg-white/95 px-3 py-2 text-[11px] leading-relaxed shadow-sm backdrop-blur">
      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest opacity-60">
        Map guide
      </div>
      <ul className="space-y-1">
        {(Object.keys(LEVEL_COLOR) as LevelKey[]).map((k) => (
          <li key={k} className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: LEVEL_COLOR[k] }}
            />
            <span>
              {k === "Regional" ? "Recycler / context" : `${k} priority`}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 max-w-[180px] text-[10px] opacity-65">
        Bubble size = coordination-need score (0–100).
      </p>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

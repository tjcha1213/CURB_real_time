"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MlMap, Popup as MlPopup } from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Hotspot } from "@/lib/data/server";

type Metric = "rate" | "complaints" | "studentShare";

type Props = {
  data: Hotspot[];
  summary: string;
};

const METRICS: { id: Metric; label: string; accessor: (d: Hotspot) => number }[] = [
  { id: "rate", label: "Rate per 1k housing units", accessor: (d) => d.complaintsPerHousehold },
  { id: "complaints", label: "Annualized Sept complaints", accessor: (d) => d.annualizedSeptemberComplaints },
  { id: "studentShare", label: "Student household share", accessor: (d) => d.studentHouseholdShare * 100 },
];

/**
 * Interactive MapLibre map of Boston neighborhoods.
 *
 * Lazy-loaded: the `maplibre-gl` module and its CSS are imported inside
 * useEffect so they only download when the component mounts on the client.
 * This keeps the initial JS bundle small (CLAUDE.md §3).
 *
 * Interactions:
 *  - Hover  → ephemeral popup
 *  - Click  → fly-to + pin neighborhood in a side panel
 *  - Metric toggle re-drives circle-radius
 *  - Navigation + Fullscreen controls
 */
export function HotspotMap({ data, summary }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const [metric, setMetric] = useState<Metric>("rate");
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const [ready, setReady] = useState(false);

  const geojson = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: data.map((d) => ({
        type: "Feature" as const,
        properties: {
          name: d.name,
          rate: d.complaintsPerHousehold,
          complaints: d.annualizedSeptemberComplaints,
          studentShare: d.studentHouseholdShare * 100,
          housingUnits: d.housingUnits,
        },
        geometry: { type: "Point" as const, coordinates: [d.lon, d.lat] },
      })),
    }),
    [data],
  );

  const domainMax = useMemo(() => {
    const m = METRICS.find((x) => x.id === metric)!;
    return Math.max(...data.map(m.accessor), 1);
  }, [data, metric]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let disposed = false;
    let hoverPopup: MlPopup | null = null;

    (async () => {
      // Dynamic JS import so the maplibre-gl bundle (~200 kB) is only
      // pulled when the map mounts. CSS is imported at module top-level
      // so Next can hoist it into the page stylesheet at build time.
      const { default: maplibregl } = await import("maplibre-gl");
      if (disposed || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            carto: {
              type: "raster",
              tiles: [
                "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
                "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
            },
          },
          layers: [{ id: "carto", type: "raster", source: "carto" }],
        },
        center: [-71.085, 42.336],
        zoom: 11.2,
        minZoom: 10,
        maxZoom: 15,
        attributionControl: { compact: true },
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
      map.addControl(new maplibregl.FullscreenControl(), "top-right");
      map.addControl(new maplibregl.ScaleControl({ unit: "imperial" }), "bottom-left");

      map.on("load", () => {
        map.addSource("hotspots", { type: "geojson", data: geojson });

        map.addLayer({
          id: "hotspots-halo",
          type: "circle",
          source: "hotspots",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "rate"],
              0,
              8,
              domainMax,
              56,
            ],
            "circle-color": "#D94F30",
            "circle-opacity": 0.12,
            "circle-stroke-width": 0,
          },
        });

        map.addLayer({
          id: "hotspots-dot",
          type: "circle",
          source: "hotspots",
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "rate"],
              0,
              4,
              domainMax,
              20,
            ],
            "circle-color": "#D94F30",
            "circle-opacity": 0.85,
            "circle-stroke-width": 0.6,
            "circle-stroke-color": "#ffffff",
          },
        });

        map.addLayer({
          id: "hotspots-label",
          type: "symbol",
          source: "hotspots",
          filter: [
            "in",
            ["get", "name"],
            ["literal", ["Allston", "Brighton", "Fenway", "Mission Hill", "Back Bay", "South End", "Dorchester"]],
          ],
          layout: {
            "text-field": ["get", "name"],
            "text-size": 11,
            "text-offset": [0, 1.6],
            "text-anchor": "top",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          },
          paint: {
            "text-color": "#1a1a1a",
            "text-halo-color": "#f6f1e8",
            "text-halo-width": 1.6,
          },
        });

        hoverPopup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 10 });

        map.on("mousemove", "hotspots-dot", (e) => {
          const f = e.features?.[0];
          if (!f || f.geometry.type !== "Point" || !hoverPopup) return;
          map.getCanvas().style.cursor = "pointer";
          const [lon, lat] = f.geometry.coordinates as [number, number];
          const p = f.properties as {
            name: string;
            rate: number;
            complaints: number;
            studentShare: number;
            housingUnits: number;
          };
          hoverPopup
            .setLngLat([lon, lat])
            .setHTML(
              `<div style="font-family: ui-sans-serif, system-ui; font-size: 12px; line-height: 1.4;">
                 <div style="font-family: ui-serif, Georgia, serif; font-size: 15px; margin-bottom: 4px;">${p.name}</div>
                 <div><strong>${Number(p.rate).toFixed(1)}</strong> Sept 311 / 1k HU</div>
                 <div style="opacity:0.65;">~${Math.round(Number(p.complaints))} complaints · ${Math.round(Number(p.housingUnits) / 1000)}k housing units</div>
                 <div style="opacity:0.65;">Student share ~${Math.round(Number(p.studentShare))}%</div>
                 <div style="opacity:0.55; margin-top:4px; font-size:10px;">click to pin</div>
               </div>`,
            )
            .addTo(map);
        });
        map.on("mouseleave", "hotspots-dot", () => {
          map.getCanvas().style.cursor = "";
          hoverPopup?.remove();
        });

        map.on("click", "hotspots-dot", (e) => {
          const f = e.features?.[0];
          if (!f || f.geometry.type !== "Point") return;
          const [lon, lat] = f.geometry.coordinates as [number, number];
          const p = f.properties as { name: string };
          const match = data.find((d) => d.name === p.name);
          if (match) setSelected(match);
          map.flyTo({ center: [lon, lat], zoom: 13, duration: 800 });
        });

        setReady(true);
      });

      mapRef.current = map;
    })();

    return () => {
      disposed = true;
      hoverPopup?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-drive the dot radius when the metric changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const prop = metric === "rate" ? "rate" : metric === "complaints" ? "complaints" : "studentShare";
    map.setPaintProperty("hotspots-halo", "circle-radius", [
      "interpolate",
      ["linear"],
      ["get", prop],
      0,
      8,
      domainMax,
      56,
    ]);
    map.setPaintProperty("hotspots-dot", "circle-radius", [
      "interpolate",
      ["linear"],
      ["get", prop],
      0,
      4,
      domainMax,
      20,
    ]);
  }, [metric, domainMax, ready]);

  const currentMeta = METRICS.find((m) => m.id === metric)!;

  return (
    <figure
      className="relative w-full overflow-hidden border border-[color:var(--color-rule)]"
      aria-label={summary}
    >
      <p className="sr-only">{summary}</p>

      <div className="relative">
        <div ref={containerRef} className="h-[560px] w-full" role="img" aria-label={summary} />

        {/* Metric toggle */}
        <div className="absolute left-3 top-3 flex flex-col gap-1 bg-[color:var(--color-paper)]/90 p-2 text-[11px] backdrop-blur-sm">
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">
            Size by
          </span>
          {METRICS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetric(m.id)}
              className={
                "text-left transition " +
                (metric === m.id
                  ? "font-medium text-[color:var(--color-discard)]"
                  : "opacity-65 hover:opacity-100")
              }
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Selection panel */}
        {selected && (
          <aside className="absolute bottom-3 right-3 max-w-[280px] bg-[color:var(--color-paper)]/95 p-4 text-sm backdrop-blur-sm">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h4 className="font-display text-lg leading-tight">{selected.name}</h4>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="opacity-50 hover:opacity-90"
              >
                ×
              </button>
            </div>
            <dl className="space-y-1.5 text-[12px] leading-relaxed">
              <div className="flex justify-between gap-4">
                <dt className="opacity-60">Sept rate</dt>
                <dd>
                  <strong>{selected.complaintsPerHousehold.toFixed(1)}</strong> / 1k HU
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="opacity-60">Annualized</dt>
                <dd>{Math.round(selected.annualizedSeptemberComplaints)} complaints</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="opacity-60">Housing units</dt>
                <dd>{selected.housingUnits.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="opacity-60">Student share</dt>
                <dd>{Math.round(selected.studentHouseholdShare * 100)}%</dd>
              </div>
            </dl>
          </aside>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-[color:var(--color-paper)]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm">
          <span className="opacity-60">{currentMeta.label.toLowerCase()}</span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block rounded-full bg-[color:var(--color-discard)]"
              style={{ width: 6, height: 6, opacity: 0.55 }}
            />
            <span>low</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block rounded-full bg-[color:var(--color-discard)]"
              style={{ width: 16, height: 16, opacity: 0.9 }}
            />
            <span>high</span>
          </span>
        </div>
      </div>
    </figure>
  );
}

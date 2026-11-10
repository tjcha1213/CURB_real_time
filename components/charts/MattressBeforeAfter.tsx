import * as d3 from "d3";
import type { MattressYear } from "@/lib/data/server";

type Props = { data: MattressYear[]; summary: string };

/**
 * Server-rendered SVG. D3 scales only; no DOM. Shows units (K) per year
 * as bars, with a vertical marker at 2022-11-01 (the ban's effective date).
 */
export function MattressBeforeAfter({ data, summary }: Props) {
  if (!data.length) {
    return (
      <figure className="border border-dashed border-[color:var(--color-rule)] p-6">
        <p className="text-sm opacity-60">No mattress data yet. Run `python3 data-prep/03_fetch_massdep.py`.</p>
      </figure>
    );
  }

  const W = 960;
  const H = 420;
  const M = { top: 24, right: 32, bottom: 48, left: 56 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const years = data.map((d) => d.year);
  const x = d3
    .scaleBand<number>()
    .domain(years)
    .range([0, innerW])
    .paddingInner(0.25);
  const yMax = d3.max(data, (d) => d.mattressesRecycledUnits) ?? 0;
  const y = d3.scaleLinear().domain([0, yMax * 1.05]).range([innerH, 0]).nice();
  const banYearIndex = years.findIndex((y) => y === 2022);
  const banX = banYearIndex >= 0 ? (x(2022) ?? 0) + x.bandwidth() : null;

  const yTicks = y.ticks(5);

  return (
    <figure className="w-full">
      <p className="sr-only">{summary}</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={summary}
        className="h-auto w-full overflow-visible"
      >
        <g transform={`translate(${M.left},${M.top})`}>
          {yTicks.map((t) => (
            <g key={t} transform={`translate(0,${y(t)})`}>
              <line x1={0} x2={innerW} stroke="currentColor" strokeOpacity={0.12} />
              <text x={-8} dy="0.32em" textAnchor="end" fontSize={11} fill="rgba(255,248,234,0.82)">
                {t === 0 ? "0" : `${Math.round(t / 1000)}k`}
              </text>
            </g>
          ))}

          {data.map((d) => {
            const isPost = d.period === "post-ban";
            const bx = x(d.year) ?? 0;
            const bh = innerH - y(d.mattressesRecycledUnits);
            return (
              <g key={d.year}>
                <rect
                  x={bx}
                  y={y(d.mattressesRecycledUnits)}
                  width={x.bandwidth()}
                  height={bh}
                  fill={isPost ? "var(--color-gold)" : "currentColor"}
                  fillOpacity={isPost ? 1 : 0.35}
                />
                <text
                  x={bx + x.bandwidth() / 2}
                  y={y(d.mattressesRecycledUnits) - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fill="rgba(255,248,234,0.92)"
                >
                  {Math.round(d.mattressesRecycledUnits / 1000)}k
                </text>
                <text
                  x={bx + x.bandwidth() / 2}
                  y={innerH + 18}
                  textAnchor="middle"
                  fontSize={11}
                  fill="rgba(255,248,234,0.82)"
                >
                  {d.year}
                </text>
              </g>
            );
          })}

          {banX !== null && (
            <g>
              <line
                x1={banX}
                x2={banX}
                y1={-8}
                y2={innerH + 8}
                stroke="var(--color-discard)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <text
                x={banX + 6}
                y={4}
                fontSize={11}
                fill="var(--color-discard)"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Nov 2022 — MA mattress ban takes effect
              </text>
            </g>
          )}

          <text
            x={0}
            y={-8}
            fontSize={11}
            fill="rgba(255,248,234,0.82)"
            fontFamily="var(--font-mono)"
          >
            Mattresses diverted in MA (units, thousands)
          </text>
        </g>
      </svg>
    </figure>
  );
}

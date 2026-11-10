import * as d3 from "d3";
import type { Hotspot } from "@/lib/data/server";

type Props = { data: Hotspot[]; summary: string; top?: number };

/**
 * Ranked dot-and-line visualization of neighborhood bulky-complaint rate
 * per 1k housing units. Each dot is sized by student household share — the
 * correlation is the point of the chart.
 */
export function HotspotLollipop({ data, summary, top = 12 }: Props) {
  if (!data.length) return null;

  const rows = [...data]
    .sort((a, b) => b.complaintsPerHousehold - a.complaintsPerHousehold)
    .slice(0, top);

  const W = 720;
  const rowH = 32;
  const H = rowH * rows.length + 60;
  const M = { top: 40, right: 140, bottom: 16, left: 150 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const x = d3
    .scaleLinear()
    .domain([0, (d3.max(rows, (r) => r.complaintsPerHousehold) ?? 1) * 1.1])
    .range([0, innerW]);
  const y = d3
    .scaleBand<string>()
    .domain(rows.map((r) => r.name))
    .range([0, innerH])
    .paddingInner(0.35);

  const size = d3
    .scaleSqrt()
    .domain([0, d3.max(rows, (r) => r.studentHouseholdShare) ?? 1])
    .range([3, 13]);

  return (
    <figure className="w-full">
      <p className="sr-only">{summary}</p>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="h-auto w-full">
        <g transform={`translate(${M.left},${M.top})`}>
          <text x={0} y={-22} fontSize={11} opacity={0.7} fontFamily="var(--font-mono)">
            Annualized September bulky 311 complaints per 1,000 housing units
          </text>
          <text
            x={innerW + 8}
            y={-22}
            fontSize={11}
            opacity={0.7}
            fontFamily="var(--font-mono)"
            textAnchor="start"
          >
            Dot size = student household share
          </text>

          {rows.map((r) => {
            const cy = (y(r.name) ?? 0) + y.bandwidth() / 2;
            return (
              <g key={r.geoid}>
                <line
                  x1={0}
                  x2={x(r.complaintsPerHousehold)}
                  y1={cy}
                  y2={cy}
                  stroke="currentColor"
                  strokeOpacity={0.3}
                />
                <circle
                  cx={x(r.complaintsPerHousehold)}
                  cy={cy}
                  r={size(r.studentHouseholdShare)}
                  fill="var(--color-discard)"
                />
                <text x={-10} y={cy} dy="0.32em" textAnchor="end" fontSize={12}>
                  {r.name}
                </text>
                <text
                  x={x(r.complaintsPerHousehold) + size(r.studentHouseholdShare) + 6}
                  y={cy}
                  dy="0.32em"
                  fontSize={11}
                  opacity={0.7}
                >
                  {r.complaintsPerHousehold.toFixed(1)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </figure>
  );
}

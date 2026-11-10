import * as d3 from "d3";

type Datum = { name: string; posted: number; claimed: number; diversionRate: number };

/**
 * Tiny side-by-side stacked bars for the city dashboard's neighborhood
 * breakdown. Pure server-side SVG.
 */
export function MiniBars({ data }: { data: Datum[] }) {
  const W = 720;
  const rowH = 28;
  const H = rowH * data.length + 32;
  const M = { top: 24, right: 90, bottom: 0, left: 130 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.posted) ?? 1])
    .range([0, innerW]);
  const y = d3
    .scaleBand<string>()
    .domain(data.map((d) => d.name))
    .range([0, innerH])
    .paddingInner(0.3);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Per-neighborhood posted vs claimed bars">
      <g transform={`translate(${M.left},${M.top})`}>
        <text x={0} y={-10} fontSize={10} opacity={0.55} fontFamily="var(--font-mono)">
          posted (lighter) · claimed (darker) · diversion %
        </text>
        {data.map((d) => {
          const yy = y(d.name) ?? 0;
          const cy = yy + y.bandwidth() / 2;
          return (
            <g key={d.name}>
              <text x={-12} y={cy} dy="0.32em" textAnchor="end" fontSize={12}>
                {d.name}
              </text>
              <rect
                x={0}
                y={yy}
                width={x(d.posted)}
                height={y.bandwidth()}
                fill="var(--color-discard)"
                fillOpacity={0.18}
              />
              <rect
                x={0}
                y={yy}
                width={x(d.claimed)}
                height={y.bandwidth()}
                fill="var(--color-discard)"
                fillOpacity={0.85}
              />
              <text
                x={x(d.posted) + 8}
                y={cy}
                dy="0.32em"
                fontSize={11}
                fill="var(--color-ink)"
                opacity={0.7}
              >
                {d.posted.toLocaleString()} · {Math.round(d.diversionRate * 100)}%
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

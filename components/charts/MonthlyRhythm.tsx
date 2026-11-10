import * as d3 from "d3";
import type { MonthlySignal } from "@/lib/data/server";

type Props = {
  data: MonthlySignal[];
  summary: string;
  /** Only include years with data for this field. Default: permits. */
  series?: "bostonPermits" | "boston311BulkyPickups";
};

/**
 * Small-multiple year-over-year line chart for a single monthly metric.
 * Highlights August (permits) or September (bulky pickups) as the spike.
 * Server-rendered SVG, zero client JS.
 */
export function MonthlyRhythm({ data, summary, series = "bostonPermits" }: Props) {
  if (!data.length) return null;

  const filtered = data.filter((d) => (d[series] ?? 0) > 0);
  if (!filtered.length) return null;

  // Group by year.
  const byYear = new Map<number, { month: number; value: number }[]>();
  for (const row of filtered) {
    const [y, m] = row.month.split("-").map(Number);
    const v = row[series] ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push({ month: m, value: v });
  }
  const years = [...byYear.keys()].sort();
  const latestYear = years[years.length - 1];

  const W = 960;
  const H = 420;
  const M = { top: 28, right: 32, bottom: 48, left: 56 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const x = d3.scaleLinear().domain([1, 12]).range([0, innerW]);
  const yMax = d3.max(filtered, (d) => d[series] ?? 0) ?? 0;
  const y = d3.scaleLinear().domain([0, yMax * 1.05]).range([innerH, 0]).nice();

  const line = d3
    .line<{ month: number; value: number }>()
    .x((d) => x(d.month))
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const spikeMonth = series === "bostonPermits" ? 8 : 9;
  const spikeLabel = series === "bostonPermits" ? "Aug — permits peak" : "Sep — bulky 311 spike";

  const yTicks = y.ticks(4);

  return (
    <figure className="w-full">
      <p className="sr-only">{summary}</p>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="h-auto w-full">
        <g transform={`translate(${M.left},${M.top})`}>
          {yTicks.map((t) => (
            <g key={t} transform={`translate(0,${y(t)})`}>
              <line x1={0} x2={innerW} stroke="currentColor" strokeOpacity={0.08} />
              <text x={-8} dy="0.32em" textAnchor="end" fontSize={11} opacity={0.6}>
                {t === 0 ? "0" : `${Math.round(t / 1000)}k`}
              </text>
            </g>
          ))}

          {MONTHS.map((m, i) => (
            <text
              key={m}
              x={x(i + 1)}
              y={innerH + 22}
              textAnchor="middle"
              fontSize={11}
              opacity={i + 1 === spikeMonth ? 1 : 0.6}
              fill={i + 1 === spikeMonth ? "var(--color-discard)" : "currentColor"}
              style={i + 1 === spikeMonth ? { fontFamily: "var(--font-display)" } : undefined}
            >
              {m}
            </text>
          ))}

          <line
            x1={x(spikeMonth)}
            x2={x(spikeMonth)}
            y1={-8}
            y2={innerH + 8}
            stroke="var(--color-discard)"
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="3 4"
          />

          {years.map((yr) => {
            const rows = byYear
              .get(yr)!
              .sort((a, b) => a.month - b.month);
            const isLatest = yr === latestYear;
            return (
              <path
                key={yr}
                d={line(rows) ?? ""}
                fill="none"
                stroke={isLatest ? "currentColor" : "currentColor"}
                strokeWidth={isLatest ? 2 : 1}
                strokeOpacity={isLatest ? 1 : 0.18}
              />
            );
          })}

          <text
            x={x(spikeMonth) + 6}
            y={4}
            fontSize={11}
            fill="var(--color-discard)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {spikeLabel}
          </text>

          <text
            x={innerW}
            y={-10}
            fontSize={11}
            opacity={0.7}
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            {latestYear} highlighted · {years.length} years plotted
          </text>
        </g>
      </svg>
    </figure>
  );
}

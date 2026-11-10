import * as d3 from "d3";
import type { CambridgeMonthly } from "@/lib/data/server";

type Props = { data: CambridgeMonthly[]; summary: string };

/**
 * A companion to the statewide mattress chart: Cambridge is one of the
 * few MA municipalities that publishes mattress tonnage by month.
 * The 2022-11 ban inflection is visible as a near-zero baseline giving
 * way to a consistent monthly stream.
 */
export function CambridgeMattressMini({ data, summary }: Props) {
  if (!data.length) return null;

  const rows = data
    .filter((d) => d.mattresses !== undefined)
    .map((d) => ({ month: d.month, value: d.mattresses }))
    .sort((a, b) => (a.month < b.month ? -1 : 1));

  const parse = (m: string) => new Date(`${m}-01T00:00:00Z`);

  const W = 720;
  const H = 220;
  const M = { top: 24, right: 24, bottom: 28, left: 48 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const x = d3
    .scaleTime()
    .domain(d3.extent(rows, (r) => parse(r.month)) as [Date, Date])
    .range([0, innerW]);
  const y = d3
    .scaleLinear()
    .domain([0, (d3.max(rows, (r) => r.value) ?? 0) * 1.1])
    .range([innerH, 0])
    .nice();

  const line = d3
    .line<{ month: string; value: number }>()
    .x((r) => x(parse(r.month)))
    .y((r) => y(r.value))
    .curve(d3.curveMonotoneX);

  const ban = new Date("2022-11-01T00:00:00Z");
  const banX = x(ban);

  return (
    <figure className="w-full">
      <p className="sr-only">{summary}</p>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="h-auto w-full">
        <g transform={`translate(${M.left},${M.top})`}>
          {y.ticks(3).map((t) => (
            <g key={t} transform={`translate(0,${y(t)})`}>
              <line x1={0} x2={innerW} stroke="currentColor" strokeOpacity={0.08} />
              <text x={-8} dy="0.32em" textAnchor="end" fontSize={10} fill="rgba(255,248,234,0.82)">
                {t}
              </text>
            </g>
          ))}

          {x.ticks(6).map((t, i) => (
            <text
              key={i}
              x={x(t)}
              y={innerH + 18}
              textAnchor="middle"
              fontSize={10}
              fill="rgba(255,248,234,0.82)"
            >
              {t.getFullYear()}
            </text>
          ))}

          <path d={line(rows) ?? ""} fill="none" stroke="var(--color-gold)" strokeWidth={1.8} />

          <line
            x1={banX}
            x2={banX}
            y1={0}
            y2={innerH}
            stroke="var(--color-discard)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text
            x={banX + 4}
            y={10}
            fontSize={10}
            fill="var(--color-discard)"
            style={{ fontFamily: "var(--font-display)" }}
          >
            2022-11 ban
          </text>

          <text
            x={0}
            y={-8}
            fontSize={10}
            fill="rgba(255,248,234,0.82)"
            fontFamily="var(--font-mono)"
          >
            Cambridge mattress tonnage, monthly (short tons)
          </text>
        </g>
      </svg>
    </figure>
  );
}

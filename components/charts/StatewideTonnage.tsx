import * as d3 from "d3";
import type { StatewideTonnage as Row } from "@/lib/data/server";

type Props = { data: Row[]; summary: string };

export function StatewideTonnage({ data, summary }: Props) {
  if (!data.length) return null;

  const W = 960;
  const H = 420;
  const M = { top: 28, right: 32, bottom: 48, left: 72 };
  const innerW = W - M.left - M.right;
  const innerH = H - M.top - M.bottom;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year) as [number, number])
    .range([0, innerW]);

  const yMin = (d3.min(data, (d) => d.bulkyWasteShortTons) ?? 0) * 0.96;
  const yMax = (d3.max(data, (d) => d.bulkyWasteShortTons) ?? 0) * 1.02;
  const y = d3.scaleLinear().domain([yMin, yMax]).range([innerH, 0]).nice();

  const line = d3
    .line<Row>()
    .x((d) => x(d.year))
    .y((d) => y(d.bulkyWasteShortTons))
    .curve(d3.curveMonotoneX);

  const area = d3
    .area<Row>()
    .x((d) => x(d.year))
    .y0(innerH)
    .y1((d) => y(d.bulkyWasteShortTons))
    .curve(d3.curveMonotoneX);

  const latest = data[data.length - 1];
  const yTicks = y.ticks(4);
  const xTicks = x.ticks(Math.min(data.length, 8)).map((t) => Math.round(t));

  return (
    <figure className="w-full">
      <p className="sr-only">{summary}</p>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={summary} className="h-auto w-full">
        <g transform={`translate(${M.left},${M.top})`}>
          {yTicks.map((t) => (
            <g key={t} transform={`translate(0,${y(t)})`}>
              <line x1={0} x2={innerW} stroke="currentColor" strokeOpacity={0.1} />
              <text x={-10} dy="0.32em" textAnchor="end" fontSize={11} opacity={0.6}>
                {(t / 1_000_000).toFixed(1)}M
              </text>
            </g>
          ))}

          {xTicks.map((t) => (
            <text
              key={t}
              x={x(t)}
              y={innerH + 22}
              textAnchor="middle"
              fontSize={11}
              opacity={0.7}
            >
              {t}
            </text>
          ))}

          <path
            d={area(data) ?? ""}
            fill="currentColor"
            fillOpacity={0.08}
          />
          <path
            d={line(data) ?? ""}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />

          {data.map((d) => (
            <circle
              key={d.year}
              cx={x(d.year)}
              cy={y(d.bulkyWasteShortTons)}
              r={3}
              fill="currentColor"
            />
          ))}

          {/* Annotation on latest year */}
          <g>
            <line
              x1={x(latest.year)}
              x2={x(latest.year)}
              y1={y(latest.bulkyWasteShortTons) - 6}
              y2={y(latest.bulkyWasteShortTons) - 52}
              stroke="var(--color-discard)"
              strokeWidth={1.5}
            />
            <text
              x={x(latest.year) - 8}
              y={y(latest.bulkyWasteShortTons) - 60}
              textAnchor="end"
              fontSize={12}
              fill="var(--color-discard)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {latest.year}: {(latest.bulkyWasteShortTons / 1_000_000).toFixed(2)}M short tons
            </text>
          </g>

          <text x={0} y={-10} fontSize={11} opacity={0.7} fontFamily="var(--font-mono)">
            Massachusetts in-state solid-waste disposal (short tons, MassDEP)
          </text>
        </g>
      </svg>
    </figure>
  );
}

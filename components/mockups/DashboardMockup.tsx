/**
 * Government-side operations dashboard mockup for Scene 8.
 *
 * Replicates the panel from curb-the-pile.html — three KPIs across
 * the top, four partner-capacity rows, and a small bar chart of Sept 1
 * reports by neighborhood. Pure presentational SVG.
 */
type Capacity = {
  status: "active" | "warn" | "full";
  name: string;
  detail: string;
  tag: string;
};

const KPIS = [
  { value: "247", label: "Items reported today" },
  { value: "61%", label: "Matched to reuse" },
  { value: "18.4t", label: "Est. diverted weight" },
];

const CAPACITY: Capacity[] = [
  { status: "active", name: "Household Goods (Acton)", detail: "3 slots open", tag: "Active" },
  { status: "warn", name: "Habitat ReStore — Brighton", detail: "1 slot open", tag: "Near capacity" },
  { status: "full", name: "DPW Bulky Route B — Allston", detail: "Full", tag: "Full today" },
  { status: "active", name: "Buy Nothing — Allston / Brighton", detail: "38 active posts", tag: "High activity" },
];

const STATUS_COLOR: Record<Capacity["status"], { dot: string; bg: string; fg: string }> = {
  active: { dot: "var(--color-reuse)", bg: "rgba(62,107,58,0.18)", fg: "#6BBF8A" },
  warn: { dot: "#B8860B", bg: "rgba(184,134,11,0.20)", fg: "#D4A82A" },
  full: { dot: "var(--color-discard)", bg: "rgba(214,69,69,0.22)", fg: "#ff8b8b" },
};

const NEIGHBORHOODS = [
  { name: "Allston", n: 89 },
  { name: "Brighton", n: 54 },
  { name: "Mission Hill", n: 38 },
  { name: "South End", n: 29 },
  { name: "Back Bay", n: 22 },
  { name: "East Boston", n: 15 },
];

export function DashboardMockup() {
  const max = Math.max(...NEIGHBORHOODS.map((n) => n.n));
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#173126] shadow-[0_24px_80px_rgba(9,32,24,0.4)]">
      <div className="flex items-center gap-2 border-b border-white/8 bg-[linear-gradient(90deg,rgba(214,69,69,0.18),rgba(216,166,64,0.1),rgba(46,107,67,0.08))] px-4 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-white/20" />
        ))}
        <p className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/50">
          The CURB — Operations Dashboard · Sept 1, 2026
        </p>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="grid grid-cols-3 gap-2">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-3"
            >
              <div className="font-display text-[1.4rem] leading-none text-white/90">
                {k.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.06em] text-white/45">
                {k.label}
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">
            Active partner capacity
          </p>
          <div className="divide-y divide-white/8">
            {CAPACITY.map((c) => {
              const s = STATUS_COLOR[c.status];
              return (
                <div key={c.name} className="flex items-center gap-2.5 py-2 text-[13px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.dot }} />
                  <span className="flex-1 text-white/85">{c.name}</span>
                  <span className="text-[12px] text-white/45">{c.detail}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px]"
                    style={{ background: s.bg, color: s.fg }}
                  >
                    {c.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">
            Neighborhood breakdown — Sept 1 reports
          </p>
          <svg
            viewBox="0 0 320 130"
            className="h-auto w-full"
            role="img"
            aria-label="Bar chart of September 1 furniture reports by neighborhood"
          >
            {NEIGHBORHOODS.map((d, i) => {
              const w = 36;
              const gap = 12;
              const x = i * (w + gap);
              const h = (d.n / max) * 90;
              return (
                <g key={d.name}>
                  <rect
                    x={x}
                    y={100 - h}
                    width={w}
                    height={h}
                    fill="var(--color-discard)"
                    fillOpacity={0.85}
                  />
                  <text
                    x={x + w / 2}
                    y={100 - h - 4}
                    textAnchor="middle"
                    fontSize={9}
                    fill="rgba(247,244,238,0.8)"
                  >
                    {d.n}
                  </text>
                  <text
                    x={x + w / 2}
                    y={114}
                    textAnchor="middle"
                    fontSize={8}
                    fill="rgba(247,244,238,0.5)"
                  >
                    {d.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

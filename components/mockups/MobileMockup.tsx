/**
 * Resident-side mobile mockup for Scene 8.
 *
 * Replicates the phone frame in curb-the-pile.html — top bar with city
 * brand, a placeholder map with colored dots, a live curb-report feed,
 * and a 4-tab bottom nav. Pure presentational; no client interactivity.
 */
type FeedItem = {
  type: string;
  desc: string;
  meta: string;
  tone: "discard" | "reuse" | "amber";
};

const FEED: FeedItem[] = [
  {
    type: "Sofa · Good condition",
    desc: "Linden St. at Glenville Ave. — wood frame, fabric, moveable by 2 people",
    meta: "Reported 14 min ago · Matched to Household Goods ✓",
    tone: "discard",
  },
  {
    type: "Dresser · Fair condition",
    desc: "Comm. Ave. near Kelton St. — 4-drawer, missing handle",
    meta: "Reported 38 min ago · Awaiting match",
    tone: "amber",
  },
  {
    type: "Bookshelf · Excellent",
    desc: "Ashford St. — IKEA Billy, disassembled, all hardware present",
    meta: "Reported 1 hr ago · Claimed via Buy Nothing ✓",
    tone: "reuse",
  },
];

const TONE_COLOR: Record<FeedItem["tone"], string> = {
  discard: "var(--color-discard)",
  reuse: "var(--color-reuse)",
  amber: "#B8860B",
};

const TABS = [
  { label: "Map", active: true },
  { label: "Report", active: false },
  { label: "Pickup", active: false },
  { label: "Partners", active: false },
];

export function MobileMockup() {
  return (
    <div className="mx-auto w-[260px] rounded-[36px] border-2 border-black/55 bg-[#0f120f] p-3 shadow-[0_25px_80px_rgba(9,32,24,0.4)]">
      <div className="overflow-hidden rounded-[24px] bg-[color:var(--color-paper)]">
        {/* Top bar */}
        <div className="bg-[linear-gradient(135deg,var(--color-discard),#b93131)] px-3 pb-2 pt-3 text-white">
          <p className="font-display text-[14px] leading-tight">The CURB · Allston</p>
          <p className="mt-0.5 text-[10px] font-light opacity-85">
            7 items reported nearby · 2 pickups available today
          </p>
        </div>

        {/* Mini map */}
        <div className="relative h-[140px] overflow-hidden bg-[linear-gradient(180deg,#dbead6,#c8dec0)]">
          <svg
            viewBox="0 0 260 140"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <rect x="0" y="0" width="260" height="140" fill="url(#mapBg)" />
            <path
              d="M-10 118 C42 100, 84 95, 136 102 S232 116, 278 106"
              fill="none"
              stroke="rgba(244,236,220,0.95)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M-10 118 C42 100, 84 95, 136 102 S232 116, 278 106"
              fill="none"
              stroke="rgba(139,125,102,0.26)"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
            />
            <path
              d="M18 18 L232 18"
              fill="none"
              stroke="rgba(246,240,228,0.9)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M28 18 L92 122"
              fill="none"
              stroke="rgba(246,240,228,0.88)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M112 10 L148 128"
              fill="none"
              stroke="rgba(246,240,228,0.82)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M186 16 L156 128"
              fill="none"
              stroke="rgba(246,240,228,0.82)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M228 22 L204 126"
              fill="none"
              stroke="rgba(246,240,228,0.8)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M52 44 L218 44"
              fill="none"
              stroke="rgba(246,240,228,0.74)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M68 74 L236 74"
              fill="none"
              stroke="rgba(246,240,228,0.72)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M82 102 L212 102"
              fill="none"
              stroke="rgba(246,240,228,0.68)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            <rect x="38" y="26" width="32" height="14" rx="3" fill="rgba(132,165,126,0.32)" />
            <rect x="88" y="26" width="44" height="14" rx="3" fill="rgba(132,165,126,0.24)" />
            <rect x="154" y="26" width="26" height="14" rx="3" fill="rgba(132,165,126,0.28)" />
            <rect x="196" y="26" width="22" height="14" rx="3" fill="rgba(132,165,126,0.24)" />
            <rect x="72" y="52" width="26" height="16" rx="3" fill="rgba(132,165,126,0.26)" />
            <rect x="118" y="52" width="24" height="16" rx="3" fill="rgba(132,165,126,0.22)" />
            <rect x="160" y="52" width="38" height="16" rx="3" fill="rgba(132,165,126,0.24)" />
            <rect x="100" y="82" width="30" height="14" rx="3" fill="rgba(132,165,126,0.22)" />
            <rect x="146" y="82" width="30" height="14" rx="3" fill="rgba(132,165,126,0.26)" />
            <rect x="185" y="82" width="18" height="14" rx="3" fill="rgba(132,165,126,0.2)" />

            <path
              d="M122 38 L176 32 L198 58 L164 88 L110 78 L106 52 Z"
              fill="rgba(78,147,101,0.18)"
              stroke="rgba(46,107,67,0.65)"
              strokeWidth="1.5"
            />
            <path
              d="M58 90 L111 74 L165 86"
              fill="none"
              stroke="rgba(214,69,69,0.5)"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />

            <text x="178" y="15" fontSize="7" fill="rgba(35,25,22,0.55)">COMMONWEALTH AVE</text>
            <text x="126" y="67" fontSize="7" fill="rgba(35,25,22,0.52)">GLENVILLE AVE</text>
            <text x="77" y="98" fontSize="7" fill="rgba(35,25,22,0.5)">LINDEN ST</text>

            <defs>
              <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dbead6" />
                <stop offset="100%" stopColor="#c8dec0" />
              </linearGradient>
            </defs>
          </svg>
          <Dot top={42} left={60} color="var(--color-discard)" />
          <Dot top={68} left={108} color="var(--color-discard)" />
          <Dot top={86} left={156} color="var(--color-reuse)" />
          <Dot top={32} left={150} color="#B8860B" />
          <div className="absolute left-2 top-2 rounded bg-white/88 px-1.5 py-0.5 text-[7px] font-mono uppercase tracking-[0.12em] text-[color:var(--color-ink)]">
            Move-out heatmap
          </div>
          <p className="absolute bottom-1.5 left-2 rounded bg-white/90 px-1.5 py-0.5 text-[8px] text-[color:var(--color-reuse)]">
            ● Household Goods pickup zone
          </p>
        </div>

        {/* Feed */}
        <div className="space-y-1.5 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(239,226,203,0.4))] p-2.5">
          <p className="px-1 text-[8.5px] font-semibold uppercase tracking-[0.08em] text-stone-500">
            Live curb reports
          </p>
          {FEED.map((f, i) => (
            <div
              key={i}
              className="rounded-md bg-white p-2"
              style={{ borderLeft: `3px solid ${TONE_COLOR[f.tone]}` }}
            >
              <p
                className="text-[8px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: TONE_COLOR[f.tone] }}
              >
                {f.type}
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-stone-700">{f.desc}</p>
              <p className="mt-0.5 text-[8px] text-stone-400">{f.meta}</p>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="flex border-t border-[color:rgba(16,38,29,0.08)] bg-[#fff9f0] py-1.5">
          {TABS.map((t) => (
            <div
              key={t.label}
              className="flex flex-1 flex-col items-center gap-0.5"
              style={{
                color: t.active ? "var(--color-discard)" : "#888",
              }}
            >
              <span
                aria-hidden
                className="h-3.5 w-3.5 rounded-sm bg-current"
                style={{ opacity: t.active ? 0.85 : 0.2 }}
              />
              <span className="text-[8px]">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dot({ top, left, color }: { top: number; left: number; color: string }) {
  return (
    <span
      className="absolute h-3 w-3 rounded-full"
      style={{ top, left, background: color, color }}
    >
      <span
        aria-hidden
        className="absolute -left-1.5 -top-1.5 h-6 w-6 rounded-full border-[1.5px]"
        style={{ borderColor: color, opacity: 0.4 }}
      />
    </span>
  );
}

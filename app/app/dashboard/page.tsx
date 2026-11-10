import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { MiniBars } from "@/components/charts/MiniBars";
import {
  DASHBOARD_KPIS,
  NEIGHBORHOOD_BREAKDOWN,
  RECENT_ACTIVITY,
  type ActivityEvent,
} from "@/lib/data/mock-app";

export const metadata = {
  title: "City dashboard · The Curb",
};

const KIND_COLOR: Record<ActivityEvent["kind"], string> = {
  posted: "bg-[color:var(--color-paper-deep)] text-[color:var(--color-ink)]",
  matched: "bg-[color:var(--color-reuse)]/12 text-[color:var(--color-reuse)]",
  claimed: "bg-[color:var(--color-reuse)]/22 text-[color:var(--color-reuse)]",
  scheduled: "bg-[color:var(--color-discard)]/10 text-[color:var(--color-discard)]",
  "picked-up": "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]",
};

function timeOnly(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function Dashboard() {
  return (
    <AppShell active="dashboard" eyebrow="Operations · pilot week">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Sept 1 move-out · Boston pilot
          </p>
          <h1 className="mt-2 font-display text-4xl leading-tight">
            What the curb looks like — in real time.
          </h1>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest opacity-60">
          <span aria-hidden className="inline-block h-2 w-2 animate-pulse rounded-full bg-[color:var(--color-reuse)]" />
          Live · auto-refresh every 60 s
        </div>
      </header>

      <section className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DASHBOARD_KPIS.map((k) => (
          <div key={k.label} className="border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">{k.label}</p>
            <p className="mt-3 font-display text-4xl leading-none">{k.value}</p>
            <p
              className={
                "mt-2 text-xs leading-snug " +
                (k.positive ? "text-[color:var(--color-reuse)]" : "text-[color:var(--color-discard)]")
              }
            >
              {k.delta}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="font-display text-2xl leading-tight">By neighborhood</h2>
          <p className="mt-2 max-w-prose text-sm leading-relaxed opacity-75">
            Where posts are coming from, and how many are getting matched before the curb.
            Diversion rate beats raw counts — Allston is the noisiest, but Mission Hill is doing
            almost as well.
          </p>
          <div className="mt-6 border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-4">
            <MiniBars data={NEIGHBORHOOD_BREAKDOWN} />
          </div>

          <h2 className="mt-12 font-display text-2xl leading-tight">Truck route — Saturday</h2>
          <ol className="mt-4 space-y-2 border-l border-[color:var(--color-rule)] pl-4">
            {[
              { time: "09:00", stop: "Allston · Linden St / Pratt St (3 stops)", n: 12 },
              { time: "10:15", stop: "Brighton · Comm Ave (2 stops)", n: 6 },
              { time: "11:30", stop: "Fenway · Peterborough St (1 stop)", n: 3 },
              { time: "12:30", stop: "Mission Hill · Smith St (2 stops)", n: 5 },
              { time: "13:45", stop: "Cambridgeport · Magazine St (1 stop)", n: 2 },
            ].map((r) => (
              <li key={r.time} className="flex items-baseline gap-4 text-sm">
                <span className="font-mono text-[11px] tabular-nums opacity-60">{r.time}</span>
                <span className="flex-1 leading-relaxed">{r.stop}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">{r.n} items</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-5">
          <h2 className="font-display text-2xl leading-tight">Recent activity</h2>
          <p className="mt-2 text-sm opacity-75">Last hour, all neighborhoods.</p>

          <ul className="mt-5 space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.id} className="flex items-start gap-3 border-b border-[color:var(--color-rule)] pb-3">
                <span className={"shrink-0 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest " + KIND_COLOR[a.kind]}>
                  {a.kind}
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-snug">{a.text}</p>
                  <p className="mt-0.5 text-[11px] opacity-60">
                    {a.neighborhood} · {timeOnly(a.ts)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 border border-[color:var(--color-rule)] bg-[color:var(--color-paper-deep)]/40 p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              For municipal pilots
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Every event in this feed is part of a per-tract diversion record published as open data.
              See the project&apos;s{" "}
              <Link href="/" className="underline underline-offset-2">
                Scene 7 proposal
              </Link>{" "}
              for the day-1 / month-3 / year-1 rollout.
            </p>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}

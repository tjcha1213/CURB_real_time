import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { ITEMS } from "@/lib/data/mock-app";

export const metadata = {
  title: "The Curb · App — Report or claim furniture",
};

const ENTRIES = [
  {
    href: "/app/report",
    eyebrow: "I'm moving out",
    title: "Post a piece of furniture",
    body: "Snap a photo, pick a window. We'll match you to a neighbor, a reuse partner, or the city's bulky pickup — whichever can take it first.",
    cta: "Post an item",
  },
  {
    href: "/app/browse",
    eyebrow: "I'm staying / moving in",
    title: "Find something nearby",
    body: "Browse what's about to hit the curb on your block. Claim it before the truck does — or send it on to a partner who needs it.",
    cta: "Browse items",
  },
];

const HOW = [
  {
    step: "01",
    title: "Post in under a minute",
    body: "Photo, category, condition, pickup window. We pre-fill your block from your address.",
  },
  {
    step: "02",
    title: "Match runs every 5 minutes",
    body: "Buy Nothing first, then reuse nonprofits with capacity that day, then the city's bulky route as the safety net.",
  },
  {
    step: "03",
    title: "One confirmed handoff",
    body: "You get a single time window, an arrival ETA, and a reminder. No coordinating with three groups.",
  },
];

export default function AppLanding() {
  const recentMatched = ITEMS.filter((i) => i.status === "matched" || i.status === "claimed").length;
  const recentDiverted = recentMatched + ITEMS.filter((i) => i.status === "picked-up" || i.status === "scheduled").length;

  return (
    <AppShell active="home" eyebrow="Resident app">
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Greater Boston · Sept move-out
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.04] tracking-tight">
            Don&apos;t put it on the curb yet.
            <br />
            <span className="text-[color:var(--color-discard)]">We&apos;ll find it a home.</span>
          </h1>
          <p className="prose-body mt-6 text-lg leading-relaxed opacity-90">
            The Curb routes outgoing tenants to the right reuse partner — neighbors first, nonprofits
            second, the city&apos;s bulky truck as the safety net. One post, one confirmed pickup window,
            zero scrolling through five different Facebook groups.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ENTRIES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="group flex flex-col justify-between border border-[color:var(--color-rule)] bg-[color:var(--color-paper-deep)]/40 p-6 transition hover:border-[color:var(--color-discard)]"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    {e.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight">{e.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">{e.body}</p>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-discard)]">
                  {e.cta}
                  <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              This week — pilot stats
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-y-5">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">Items posted</dt>
                <dd className="font-display text-3xl leading-none">1,284</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">Diversion rate</dt>
                <dd className="font-display text-3xl leading-none text-[color:var(--color-reuse)]">
                  62%
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">Avg. claim time</dt>
                <dd className="font-display text-3xl leading-none">47<span className="ml-1 text-base font-normal opacity-60">min</span></dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">Mattresses on partner trucks</dt>
                <dd className="font-display text-3xl leading-none">318</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-[color:var(--color-rule)] pt-4 text-xs leading-relaxed opacity-70">
              Demo numbers — based on the pilot scope outlined in{" "}
              <Link href="/#scene-proposal" className="underline underline-offset-2">
                Scene 7 of the story
              </Link>
              . Currently {recentDiverted} of {ITEMS.length} sample items are matched or scheduled.
            </p>
          </div>

          <div className="mt-6 border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-6">
            <Link
              href="/app/dashboard"
              className="group flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                  For city staff
                </p>
                <p className="mt-1 font-display text-lg leading-tight">
                  Open the operations dashboard
                </p>
              </div>
              <span aria-hidden className="text-2xl opacity-50 transition group-hover:translate-x-1 group-hover:opacity-90">→</span>
            </Link>
          </div>
        </aside>
      </section>

      <section className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
        {HOW.map((h) => (
          <div key={h.step} className="border-t border-[color:var(--color-rule)] pt-5">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">Step {h.step}</p>
            <h3 className="mt-3 font-display text-xl leading-tight">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-80">{h.body}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}

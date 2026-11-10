import Link from "next/link";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";

/**
 * Act 7 — our proposal. Numbers here are deliberately order-of-magnitude
 * "napkin math" — the site's job is to make the case, not cost it. Final
 * costing belongs in a white paper, not a scrollytelling page.
 */
const NAPKIN = [
  {
    label: "Target diversion",
    value: "40%",
    body: "MassDEP's mattress program hit ~66% at maturity. A coordinated furniture program aiming for 40% in year one is conservative.",
  },
  {
    label: "Pilot catchment",
    value: "~30k units",
    body: "Boston's ~70% lease-turnover + ~38 tons curb bulk around Sept 1 suggests ~30k reusable items land on curbs during one move-out week.",
  },
  {
    label: "Pilot cost",
    value: "$1.5–2.5M / yr",
    body: "In line with MassDEP's $2.7M mattress-program grant pool, scaled to one metro region.",
  },
];

export function Scene7Proposal() {
  return (
    <SceneFrame id="scene-proposal" tone="paperDeep" eyebrow="Act 7 · Our proposal">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Headline>A coordinated pick-up, plus a place to post a couch.</Headline>
          <Lede className="mt-8">
            We propose two things, together. First: a municipally-funded bulky-waste pick-up
            service on a predictable schedule around the September&nbsp;1 move-out window.
            Second: a resident-facing digital platform that connects outgoing tenants to reuse
            partners and neighbors <em>before</em> the item ever hits the curb.
          </Lede>
          <Lede className="mt-6 opacity-90">
            The mattress program proved the policy lever. The reuse partners proved the demand.
            What&apos;s missing is the coordination layer — and a municipality willing to own it.
          </Lede>
        </div>
        <aside className="lg:col-span-5">
          <ul className="space-y-5 border-l border-[color:var(--color-rule)] pl-6 text-base leading-relaxed">
            <li>
              <strong className="font-display text-lg">Day 1.</strong> Register the platform with
              MassDEP and partner with two universities for a pilot.
            </li>
            <li>
              <strong className="font-display text-lg">Month 3.</strong> Coordinate city pickup
              routes with reuse-partner capacity.
            </li>
            <li>
              <strong className="font-display text-lg">Year 1.</strong> Measure diversion by
              weight and by census tract; publish the numbers.
            </li>
          </ul>
        </aside>
      </div>

      <section className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        {NAPKIN.map((n) => (
          <div key={n.label} className="border-t border-[color:var(--color-rule)] pt-5">
            <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">{n.label}</p>
            <p className="mt-1 font-display text-4xl leading-none text-[color:var(--color-reuse)]">
              {n.value}
            </p>
            <p className="mt-3 text-sm leading-relaxed opacity-80">{n.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 flex flex-col gap-6 border-t border-[color:var(--color-rule)] pt-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">
            See it working — interactive prototype
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight">
            We built the app. Walk through the resident flow and the city dashboard.
          </h3>
          <p className="mt-3 text-sm leading-relaxed opacity-80">
            Three pages, sample data — what residents see when they post a couch, what neighbors see when they
            browse, and what city staff see during move-out week.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/app"
            className="inline-flex items-center gap-3 bg-[color:var(--color-discard)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-paper)] transition hover:opacity-90"
          >
            Open the prototype  →
          </Link>
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-3 border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-5 py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-[color:var(--color-paper-deep)]"
          >
            City dashboard
          </Link>
        </div>
      </section>

      <div className="mt-24 flex flex-col gap-4 text-sm opacity-80 md:flex-row md:items-center md:justify-between">
        <p>
          DPI 853M Group 3 · Spring 2026 ·{" "}
          <Link href="/about" className="underline underline-offset-4">
            About & methodology
          </Link>
        </p>
        <p className="font-mono text-xs uppercase tracking-widest">
          The C.U.R.B. <span className="opacity-60">· Coordinated Urban Recycling for Boston</span>
        </p>
      </div>
    </SceneFrame>
  );
}

import { Handoff } from "@/components/ui/Handoff";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";

const PARTNERS = [
  {
    name: "Habitat for Humanity ReStore",
    kind: "Retail + pickup",
    notes: "Accepts gently used furniture; schedules pickups in Greater Boston. Proceeds fund affordable housing.",
  },
  {
    name: "Goodwill Industries",
    kind: "Retail drop-off",
    notes: "Accepts most small-to-medium furniture at attended donation centers. No pickup.",
  },
  {
    name: "Buy Nothing (neighborhood Facebook groups)",
    kind: "Peer-to-peer",
    notes: "Hyperlocal, high match rate in student-dense neighborhoods. Zero-logistics handoff.",
  },
  {
    name: "Freecycle / trashnothing.com",
    kind: "Peer-to-peer",
    notes: "Citywide mailing list; lower match rate but works outside Facebook.",
  },
  {
    name: "Household Goods (Acton)",
    kind: "Pickup + refurnish",
    notes: "Provides free furniture to families exiting homelessness. Accepts large-item donations.",
  },
  {
    name: "More Than Words (Waltham/Boston)",
    kind: "Retail + workforce",
    notes: "Youth workforce program. Takes donations, sells online.",
  },
  {
    name: "Boston Children's Hospital NICU furniture program",
    kind: "Targeted match",
    notes: "Narrow but zero-waste: specific items go to families in need.",
  },
  {
    name: "University move-out drives (Harvard, BU, MIT, Tufts)",
    kind: "Campus",
    notes: "Pop up each May & August. Capacity bottleneck: a 72-hour collection window.",
  },
];

export function Scene6Reuse() {
  return (
    <SceneFrame id="scene-reuse" tone="paper" eyebrow="Act 6 · What reuse looks like">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Headline>Furniture has a second life.</Headline>
          <Lede className="mt-8">
            Greater Boston has a dense patchwork of reuse infrastructure. The gap isn&apos;t
            willingness — it&apos;s coordination, capacity, and a narrow pickup window.
          </Lede>
          <p className="mt-6 max-w-md text-sm opacity-70">
            Eight partner categories below. Most operate only on weekday business hours, which is
            exactly when a lease-turnover tenant is least available.
          </p>
        </div>
        <div className="lg:col-span-7">
          <dl className="divide-y divide-[color:var(--color-rule)]">
            {PARTNERS.map((p) => (
              <div key={p.name} className="grid grid-cols-12 gap-4 py-4">
                <dt className="col-span-12 font-display text-lg leading-tight md:col-span-5">
                  {p.name}
                </dt>
                <dd className="col-span-4 font-mono text-[11px] uppercase tracking-wider opacity-60 md:col-span-2">
                  {p.kind}
                </dd>
                <dd className="col-span-12 text-sm leading-relaxed opacity-80 md:col-span-5">
                  {p.notes}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Handoff>Here&apos;s what it takes to close the gap.</Handoff>
    </SceneFrame>
  );
}

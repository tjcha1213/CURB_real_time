import { Mail, MapPin, Megaphone } from "lucide-react";
import { DashboardMockup } from "@/components/mockups/DashboardMockup";
import { MobileMockup } from "@/components/mockups/MobileMockup";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { PetitionForm } from "@/components/ui/PetitionForm";
import { SceneFrame } from "@/components/ui/SceneFrame";

const RESIDENT_USES = [
  "Tag curbside furniture by type, size, and condition in under 60 seconds.",
  "Get matched instantly to a nearby reuse partner, Buy Nothing group, or scheduled pickup window.",
  "Browse what's available on the block before moving day so anything reusable is claimed before it hits the curb.",
  "Schedule a municipal bulky pickup for items that can't be reused — without calling 311.",
];

const CITY_USES = [
  "See live curb-report density by neighborhood and dispatch pickup routes dynamically, not on a fixed schedule.",
  "Monitor partner capacity in real time — routing overflow to the next available reuse organization before the truck rolls.",
  "Export diversion weight by neighborhood, date, and item type — the accountability data MassDEP needs for grant reporting.",
  "Identify enforcement gaps: neighborhoods with high curb-report volume and zero matched pickups are where waste-ban violations concentrate.",
];

const DEMANDS = [
  {
    n: "01",
    title: "Move-out week curbside pickup",
    body: "Free, scheduled bulky-item pickup across Allston, Brighton, and other hotspots during the last week of August and first week of September.",
  },
  {
    n: "02",
    title: "Universal mattress recycling",
    body: "Adopt Cambridge-style weekly mattress recycling citywide. Mattresses are 75% recyclable — but only if they're collected separately.",
  },
  {
    n: "03",
    title: "Landlord responsibility standards",
    body: "Require landlords of buildings with 7+ units to provide bulky-waste containers and donation drop-off coordination during turnover.",
  },
  {
    n: "04",
    title: "Fund a regional reuse network",
    body: "Stand up a permanent reuse hub partnered with local nonprofits so usable couches, desks, and dressers reach neighbors instead of landfills.",
  },
];

/**
 * Act 8 — Take action. Layout matches curb-the-pile/src/components/TakeAction.tsx
 * (left: headline + bullets, right: petition card) with the platform-mockup
 * pair from curb-the-pile.html stacked above.
 */
export function Scene8TakeAction() {
  return (
    <SceneFrame id="scene-take-action" tone="dark" eyebrow="Act 8 · Take action">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <Headline>The infrastructure is built. The coordination layer isn&apos;t.</Headline>
          <Lede className="mt-8">
            Reuse partners exist. Open data exists. The mattress program proved the policy works.
            What&apos;s missing is a single place — on a phone and on a government dashboard —
            where all of it comes together in real time.
          </Lede>
        </header>

        {/* Mockup pair */}
        <section className="mt-20">
          <p className="mb-10 text-center font-display text-[clamp(1.8rem,4vw,3.25rem)] leading-tight text-white">
            What the hub looks like:
          </p>
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-10">
            <div>
              <div className="mb-5 text-center">
                <p className="font-display text-xl">For residents</p>
                <p className="mx-auto mt-1 max-w-xs text-sm opacity-60">
                  Report curbside furniture in under 60 seconds. Get matched to a reuse partner or
                  pickup window before the item hits the landfill queue.
                </p>
              </div>
              <MobileMockup />
            </div>
            <div>
              <div className="mb-5 text-center">
                <p className="font-display text-xl">For government workers</p>
                <p className="mx-auto mt-1 max-w-md text-sm opacity-60">
                  A live operations dashboard for DPW dispatchers, MassDEP analysts, and reuse-program
                  coordinators — same data, different view.
                </p>
              </div>
              <div className="mx-auto max-w-[520px]">
                <DashboardMockup />
              </div>
            </div>
          </div>
        </section>

        {/* Roles */}
        <section className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          <RoleColumn label="Residents use the mobile app to" tone="discard" items={RESIDENT_USES} />
          <RoleColumn label="Government workers use the dashboard to" tone="reuse" items={CITY_USES} />
        </section>

        {/* Demands */}
        <section className="mt-24">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-50">Our demands</p>
            <h3 className="mt-3 font-display text-3xl leading-tight">
              Four asks for Greater Boston municipalities.
            </h3>
          </div>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {DEMANDS.map((d) => (
              <li
                key={d.n}
                className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-discard)]">
                  Demand {d.n}
                </span>
                <div>
                  <p className="font-display text-lg leading-tight">{d.title}</p>
                  <p className="mt-2 text-sm leading-relaxed opacity-75">{d.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Take action — petition (mirrors curb-the-pile TakeAction.tsx) */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-discard)]">
                Take action
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light leading-tight">
                Sign on. Show up. Curb the pile.
              </h2>
              <p className="mt-6 text-base leading-relaxed opacity-80 md:text-lg">
                Add your name to the petition and we&apos;ll send you a single, focused email
                before each city council hearing on furniture waste — no spam, no fundraising
                asks.
              </p>
              <ul className="mt-8 space-y-4 text-base opacity-90">
                <Bullet icon={<Megaphone className="h-5 w-5" />}>
                  Help deliver 5,000 signatures to Boston City Hall by August 1.
                </Bullet>
                <Bullet icon={<Mail className="h-5 w-5" />}>
                  Get a 60-second email script before each hearing.
                </Bullet>
                <Bullet icon={<MapPin className="h-5 w-5" />}>
                  Join a neighborhood reuse pop-up during move-out week.
                </Bullet>
              </ul>
            </div>
            <PetitionForm />
          </div>
        </section>
      </div>
    </SceneFrame>
  );
}

function Bullet({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-[color:var(--color-discard)]">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

function RoleColumn({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "discard" | "reuse";
}) {
  const accent = tone === "discard" ? "var(--color-discard)" : "var(--color-reuse)";
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_50px_rgba(9,32,24,0.2)]">
      <p
        className="mb-4 font-mono text-[10px] uppercase tracking-widest"
        style={{ color: accent }}
      >
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className="flex gap-3 border-b border-white/[0.06] py-2 text-sm leading-snug opacity-80 last:border-b-0"
          >
            <span aria-hidden style={{ color: accent }} className="mt-0.5 shrink-0">→</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

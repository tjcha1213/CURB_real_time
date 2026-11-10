import { BigNumber } from "@/components/ui/BigNumber";
import { Handoff } from "@/components/ui/Handoff";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";
import { VideoHero } from "@/components/ui/VideoHero";

/**
 * Act 1 — Hook. Numbers come from Boston press coverage of September 2023
 * Allston Christmas (CBS Boston, NBC Boston attributing Boston Public Works).
 * Docs: docs/data-sources.md §6.
 */
export function Scene1Hook() {
  return (
    <SceneFrame id="scene-hook" tone="dark" eyebrow="Act 1 · Hook">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-6 flex flex-col items-start gap-4">
            <p className="max-w-3xl font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-snug text-white">
              <span className="text-[color:var(--color-gold)]">The C.U.R.B.</span>
              {" "}
              <span className="text-white/88">
                - <span className="text-[color:var(--color-gold)]">C</span>oordination{" "}
                <span className="text-[color:var(--color-gold)]">U</span>rban{" "}
                <span className="text-[color:var(--color-gold)]">R</span>ecycling for{" "}
                <span className="text-[color:var(--color-gold)]">B</span>oston
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/app`}
                className="inline-flex items-center rounded-full border border-[color:var(--color-gold)]/45 bg-white/6 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-white/12"
              >
                Go to prototype application
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/app/dashboard`}
                className="inline-flex items-center rounded-full border border-[color:var(--color-gold)]/45 bg-white/6 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition hover:bg-white/12"
              >
                Go to city dashboard
              </a>
            </div>
          </div>
          <Headline as="h1">
            Every September,
            <br />
            Allston looks like this.
          </Headline>
          <Lede className="mt-8">
            On the first weekend of September, tens of thousands of Greater Boston leases turn
            over on the same day. Furniture piles up on curbs by the block — a yearly ritual
            residents have nicknamed <em>Allston Christmas</em>.
          </Lede>
          <div className="mt-10">
            <VideoHero
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/videos/the-curb-intro.mp4`}
              credit="The C.U.R.B. — Coordinated Urban Recycling for Boston · 90-second introduction"
            />
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:col-span-5">
          <BigNumber
            value="1,700"
            unit="mattresses"
            emphasis="discard"
            caption="Abandoned on Boston curbs during the week around September 1, 2023 — collected by the city as bulky pickups."
          />
          <BigNumber
            value="2,400"
            unit="permits"
            emphasis="discard"
            caption="Moving-truck permits Boston issued for the September 1, 2023 lease-turnover day alone. Around 70% of city leases begin that date."
          />
          <p className="max-w-md text-sm opacity-70">
            Sources: City of Boston via CBS Boston & NBC Boston (Sept&nbsp;2023 move-out week).
          </p>
        </div>
      </div>
      <Handoff>But Allston is only the symptom. The pattern repeats statewide.</Handoff>
    </SceneFrame>
  );
}

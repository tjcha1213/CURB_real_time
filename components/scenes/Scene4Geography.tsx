import { HotspotLollipop } from "@/components/charts/HotspotLollipop";
import { AdvocacyMap } from "@/components/map/AdvocacyMap";
import { Handoff } from "@/components/ui/Handoff";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";
import { loadAdvocacyNodes, loadHotspots } from "@/lib/data/server";

export async function Scene4Geography() {
  const [advocacy, hotspots] = await Promise.all([loadAdvocacyNodes(), loadHotspots()]);

  return (
    <SceneFrame id="scene-geography" tone="paper" eyebrow="Act 4 · Geography">
      <div className="flex flex-col gap-10">
        <header className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Headline>It concentrates here.</Headline>
            <Lede className="mt-8">
              Greater Boston has dozens of municipalities with mattress collection programs — and
              one neighborhood that absorbs most of the move-out furniture surge. Click a marker to
              see a city&apos;s collection program, public-data gaps, and the suggested next step.
            </Lede>
          </div>
          <p className="text-sm leading-relaxed opacity-70 lg:col-span-5">
            Coordination-need score (0–100) is a weighted blend of Allston Christmas relevance,
            public-reporting gaps, and the absence of an item-level used-furniture feed. High =
            prioritize for a coordinated reporting + pickup pilot.
          </p>
        </header>

        <AdvocacyMap
          data={advocacy}
          summary="Map of Greater Boston cities, neighborhoods, and mattress recyclers, sized by coordination-need score. Allston and Brighton are flagged as the highest-priority hotspots; Cambridge serves as the model municipal program; recyclers like UTEC and Conigliaro Industries are shown as the regional infrastructure backbone."
        />

        <details className="border-t border-[color:var(--color-rule)] pt-6">
          <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-widest opacity-60">
            Boston neighborhood-level rate (2024–2025)
          </summary>
          <div className="mt-6">
            <HotspotLollipop
              data={hotspots}
              summary="Lollipop chart ranking Boston neighborhoods by bulky-item 311 complaints per 1,000 housing units in September, dot-sized by student household share."
              top={12}
            />
          </div>
        </details>
      </div>
      <Handoff>We know this pattern can be bent. We&apos;ve already done it — for mattresses.</Handoff>
    </SceneFrame>
  );
}

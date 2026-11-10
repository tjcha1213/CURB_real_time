import { MonthlyRhythm } from "@/components/charts/MonthlyRhythm";
import { Handoff } from "@/components/ui/Handoff";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";
import { loadMonthlySignal } from "@/lib/data/server";

export async function Scene3Rhythm() {
  const data = await loadMonthlySignal();

  return (
    <SceneFrame id="scene-rhythm" tone="paperDeep" eyebrow="Act 3 · Rhythm">
      <div className="flex flex-col gap-12">
        <div className="max-w-3xl">
          <Headline>Waste has a calendar.</Headline>
          <Lede className="mt-8">
            Every August, Boston issues more than <strong>4,000 moving-truck permits</strong> —
            four times any winter month. The waste shows up a few weeks later: September
            bulky-item complaints run roughly <strong>2×</strong> the baseline. The city&apos;s
            trash calendar has a heartbeat.
          </Lede>
          <p className="mt-6 text-sm opacity-70">
            Source: Analyze Boston — Moving Truck Permits (2012–present). Each thin line is one
            year; the highlighted line is the most recent year with complete data.
          </p>
        </div>
        <MonthlyRhythm
          data={data}
          series="bostonPermits"
          summary="Monthly Boston moving-truck permits plotted year-over-year 2012 to 2026. All lines peak sharply in August, with the August value consistently 4 to 7 times the winter baseline."
        />
        <p className="mt-2 max-w-2xl text-sm opacity-70">
          Note: the bulky-item 311 category was consistently tracked starting in 2024. The
          August permit spike is the earlier signal — people permit the truck first, then discard
          the old couch.
        </p>
        <MonthlyRhythm
          data={data}
          series="boston311BulkyPickups"
          summary="Monthly Boston 311 bulky-item complaints year-over-year, highlighting the September spike to roughly twice the baseline."
        />
      </div>
      <Handoff>Zoom in, and the spike concentrates on a handful of neighborhoods.</Handoff>
    </SceneFrame>
  );
}

import { StatewideTonnage } from "@/components/charts/StatewideTonnage";
import { Handoff } from "@/components/ui/Handoff";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";
import { loadStatewideTonnage } from "@/lib/data/server";

export async function Scene2Scale() {
  const data = await loadStatewideTonnage();
  const latest = data[data.length - 1];

  return (
    <SceneFrame id="scene-scale" tone="paper" eyebrow="Act 2 · Scale">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Headline>This is not a local quirk.</Headline>
          <Lede className="mt-8">
            Massachusetts disposed of roughly{" "}
            <strong>
              {latest
                ? `${(latest.bulkyWasteShortTons / 1_000_000).toFixed(2)} million short tons`
                : "6 million+ short tons"}
            </strong>{" "}
            of solid waste in&nbsp;{latest?.year ?? "recent years"}. Furniture is a large,
            unmeasured slice of that stream — and unlike mattresses, it has no dedicated recovery
            program.
          </Lede>
          <p className="mt-6 text-sm opacity-70">
            Source: MassDEP 2024 Solid Waste Data Update. Earlier years derived from the same
            document&apos;s trend chart (±50k tons).
          </p>
        </div>
        <div className="lg:col-span-7">
          <StatewideTonnage
            data={data}
            summary="Massachusetts in-state solid-waste disposal from 2018 to 2024, measured in short tons. The 2024 value — 6.22 million short tons — is marked as the latest figure."
          />
        </div>
      </div>
      <Handoff>The volume is big. The timing is worse — it all arrives in one month.</Handoff>
    </SceneFrame>
  );
}

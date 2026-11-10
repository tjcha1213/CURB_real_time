import { CambridgeMattressMini } from "@/components/charts/CambridgeMattressMini";
import { MattressBeforeAfter } from "@/components/charts/MattressBeforeAfter";
import { Handoff } from "@/components/ui/Handoff";
import { Headline } from "@/components/ui/Headline";
import { Lede } from "@/components/ui/Lede";
import { SceneFrame } from "@/components/ui/SceneFrame";
import { loadCambridgeMonthly, loadMattress } from "@/lib/data/server";

/**
 * Act 5 — the pivot of the piece (CLAUDE.md §2). Real data: MassDEP +
 * EPR Commission background doc (2025) for statewide units, plus Cambridge
 * Open Data monthly tonnage for the municipal-level mattress signal.
 */
export async function Scene5Mattress() {
  const [mattress, cambridge] = await Promise.all([loadMattress(), loadCambridgeMonthly()]);

  return (
    <SceneFrame id="scene-mattress" tone="dark" eyebrow="Act 5 · The mattress counter-example">
      <div className="flex flex-col gap-16">
        <div className="max-w-3xl">
          <Headline>We already proved regulation works.</Headline>
          <Lede className="mt-8">
            On <strong>November 1, 2022</strong>, Massachusetts banned mattresses from landfill
            and incineration under 310&nbsp;CMR&nbsp;19.017. By 2024 the state was diverting
            around <strong>399,000 mattresses</strong> — roughly <strong>66%</strong> of estimated
            generation. The curve bent almost overnight. For furniture: no ban, no program, no
            curve.
          </Lede>
          <p className="mt-6 text-sm opacity-70">
            Sources: MassDEP Mattress Recycling guide; EPR Commission Mattress Background
            Document, 2025-06-10. Pre-ban years are ramp-up estimates; post-ban years are
            state-published totals.
          </p>
        </div>
        <MattressBeforeAfter
          data={mattress}
          summary="Bar chart of mattresses diverted in Massachusetts per year from 2019 to 2024. Units jump from about 60 thousand pre-ban to 399 thousand in the first full post-ban year. The November 2022 ban effective date is marked."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-display text-xl opacity-90">
              One city, the same curve.
            </h3>
            <p className="mb-4 max-w-md text-sm opacity-70">
              Cambridge is one of the few MA municipalities that publishes mattress tonnage by
              month. Near-zero before the ban; a steady monthly stream after.
            </p>
            <CambridgeMattressMini
              data={cambridge}
              summary="Monthly mattress tonnage collected by the City of Cambridge from 2019 to present. Near-zero before November 2022; a consistent stream afterward."
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base leading-relaxed opacity-80 md:text-lg">
              Furniture has no equivalent. There is no 310&nbsp;CMR entry for it, no producer
              responsibility law, no municipal grants for collection. The infrastructure to
              divert it exists — it&apos;s just not funded or coordinated.
            </p>
          </div>
        </div>
      </div>
      <Handoff>The infrastructure to divert furniture already exists — just not at scale.</Handoff>
    </SceneFrame>
  );
}

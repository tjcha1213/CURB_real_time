import { VideoHero } from "@/components/ui/VideoHero";

/**
 * Closing section after Scene 8 — full-bleed PR video demoing the
 * resident app + city dashboard. Sits below the petition so the page
 * ends with the product in motion, not a form.
 */
export function AppDemoFinale() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <section
      id="app-demo"
      className="scene-panel relative w-full bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-dark)_94%,white),var(--color-dark-paper))] px-6 py-24 text-[color:var(--color-paper)] md:px-10 lg:px-16 xl:px-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
            Coda · the app in motion
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-light leading-tight tracking-tight">
            See what <span className="text-[color:var(--color-discard)]">The C.U.R.B.</span>{" "}
            actually feels like.
          </h2>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] opacity-65">
            The C.U.R.B. — Coordinated Urban Recycling for Boston
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed opacity-80">
            A short walkthrough of the prototype — posting an item, matching a partner,
            dispatching a city pickup. The resident app and the city dashboard are the same
            product, two views. Sound on if you want the narration.
          </p>
        </header>

        <VideoHero
          src={`${basePath}/videos/ourmovie.mp4`}
          credit="The C.U.R.B. — Coordinated Urban Recycling for Boston · DPI 853M Group 3, Spring 2026"
        />
      </div>
    </section>
  );
}

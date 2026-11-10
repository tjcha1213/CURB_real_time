import { clsx } from "@/lib/utils/clsx";

type Props = {
  id: string;
  tone?: "paper" | "paperDeep" | "dark";
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Full-viewport scene container. One per act. Kept intentionally
 * spartan — scene files own their own layout inside this frame.
 */
export function SceneFrame({ id, tone = "paper", eyebrow, children, className }: Props) {
  const toneClass =
    tone === "dark"
      ? "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-dark)_94%,white),var(--color-dark-paper))] text-[color:var(--color-paper)]"
      : tone === "paperDeep"
        ? "bg-[color:var(--color-paper-deep)] text-[color:var(--color-ink)]"
        : "bg-[color:var(--color-paper)] text-[color:var(--color-ink)]";
  return (
    <section
      id={id}
      data-tone={tone}
      className={clsx(
        "scene-panel relative min-h-[100svh] w-full px-6 py-24 md:px-10 lg:px-16 xl:px-24",
        toneClass,
        className,
      )}
    >
      <div className="relative z-10">
        {eyebrow ? (
          <p className="mb-10 inline-flex rounded-full border border-current/12 bg-white/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] opacity-80 backdrop-blur-sm">
            {eyebrow}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

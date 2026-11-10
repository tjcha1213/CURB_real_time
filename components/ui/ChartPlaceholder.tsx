import { clsx } from "@/lib/utils/clsx";

type Props = {
  label: string;
  summary: string;
  ratio?: "wide" | "square" | "tall";
  className?: string;
};

/**
 * Stand-in box for a hero chart until the real D3/Plot component lands.
 * Exports a `summary` (CLAUDE.md §8) that would be visually hidden on
 * the real component — here we surface it so reviewers see what goes
 * in the slot.
 */
export function ChartPlaceholder({ label, summary, ratio = "wide", className }: Props) {
  const aspect =
    ratio === "square" ? "aspect-square" : ratio === "tall" ? "aspect-[3/4]" : "aspect-[16/9]";
  return (
    <figure
      className={clsx(
        "flex w-full flex-col justify-between border border-dashed border-[color:var(--color-rule)] p-6",
        aspect,
        className,
      )}
      role="img"
      aria-label={summary}
    >
      <p className="font-mono text-[11px] uppercase tracking-widest opacity-60">
        Chart placeholder
      </p>
      <p className="max-w-prose font-display text-2xl leading-tight">{label}</p>
      <p className="max-w-prose text-sm leading-relaxed opacity-70">{summary}</p>
    </figure>
  );
}

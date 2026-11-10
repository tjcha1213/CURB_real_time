type Props = {
  value: string;
  unit?: string;
  caption: string;
  emphasis?: "discard" | "reuse" | "ink";
};

/**
 * Hero number treatment for scene opens. Keep sparse — CLAUDE.md §3
 * says "numbers are huge; charts are spare."
 */
export function BigNumber({ value, unit, caption, emphasis = "ink" }: Props) {
  const colorVar =
    emphasis === "discard"
      ? "var(--color-discard)"
      : emphasis === "reuse"
        ? "var(--color-reuse)"
        : "currentColor";
  return (
    <figure className="flex flex-col gap-3 rounded-[1.5rem] border border-current/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_rgba(9,32,24,0.2)] backdrop-blur-sm">
      <span
        className="font-display text-[clamp(4rem,14vw,11rem)] leading-[0.9] tracking-tight"
        style={{ color: colorVar }}
      >
        {value}
        {unit ? (
          <span className="ml-2 align-top font-display text-[0.35em] font-normal opacity-70">
            {unit}
          </span>
        ) : null}
      </span>
      <figcaption className="max-w-sm text-sm leading-relaxed opacity-80">{caption}</figcaption>
    </figure>
  );
}

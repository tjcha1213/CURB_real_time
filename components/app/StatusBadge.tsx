import { clsx } from "@/lib/utils/clsx";
import type { ItemStatus } from "@/lib/data/mock-app";

const STYLES: Record<ItemStatus, { label: string; tone: string }> = {
  posted: { label: "Posted", tone: "bg-[color:var(--color-paper-deep)] text-[color:var(--color-ink)]" },
  matched: { label: "Matched", tone: "bg-[color:var(--color-reuse)]/12 text-[color:var(--color-reuse)]" },
  claimed: { label: "Claimed", tone: "bg-[color:var(--color-reuse)]/22 text-[color:var(--color-reuse)]" },
  scheduled: { label: "City pickup", tone: "bg-[color:var(--color-discard)]/10 text-[color:var(--color-discard)]" },
  "picked-up": { label: "Picked up", tone: "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]" },
  withdrawn: { label: "Withdrawn", tone: "bg-[color:var(--color-rule)] text-[color:var(--color-ink-mute)]" },
};

export function StatusBadge({ status, className }: { status: ItemStatus; className?: string }) {
  const s = STYLES[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        s.tone,
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

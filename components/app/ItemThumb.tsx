import { clsx } from "@/lib/utils/clsx";
import type { Item } from "@/lib/data/mock-app";

const VIBE_BG: Record<Item["vibe"], string> = {
  rose: "bg-[#E7B7A6]",
  olive: "bg-[#9DA084]",
  sand: "bg-[#D9C9A6]",
  slate: "bg-[#7E8B95]",
  amber: "bg-[#D9A06B]",
  sage: "bg-[#9CB199]",
};

const ICON: Record<Item["category"], string> = {
  "Couch / Sofa": "M4 17v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M4 17h16M5 17v3M19 17v3M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4",
  Mattress: "M4 7h16v10H4z M4 12h16",
  Dresser: "M5 4h14v16H5z M5 9h14 M5 14h14 M9 6.5h6 M9 11.5h6 M9 16.5h6",
  "Bed frame": "M4 18v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2 M4 18h16 M4 18v2 M20 18v2 M7 14V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5",
  Chair: "M7 4v6h10V4 M5 14h14 M9 14v6 M15 14v6",
  Table: "M3 8h18v3H3z M5 11v9 M19 11v9",
  Lamp: "M9 3h6l2 7H7zM12 10v8 M8 21h8",
  Bookshelf: "M5 4h14v16H5z M5 9h14 M5 14h14 M5 19h14",
  Other: "M4 4h16v16H4z M9 9h6v6H9z",
};

/**
 * Stand-in image card. No real photos in the mock — vibe-color block + icon
 * keeps it clean, readable, and obviously a mock without looking unfinished.
 */
export function ItemThumb({
  item,
  size = "md",
  className,
}: {
  item: Item;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims =
    size === "lg"
      ? "aspect-[4/3]"
      : size === "sm"
        ? "aspect-square"
        : "aspect-[5/4]";
  return (
    <div
      className={clsx(
        "relative flex w-full items-center justify-center overflow-hidden",
        dims,
        VIBE_BG[item.vibe],
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-1/2 w-1/2 text-[color:var(--color-paper)] opacity-90"
      >
        <path d={ICON[item.category]} />
      </svg>
      <span className="absolute bottom-2 left-2 bg-[color:var(--color-paper)]/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest opacity-90">
        {item.category}
      </span>
    </div>
  );
}

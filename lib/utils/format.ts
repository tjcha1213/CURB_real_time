/** Short-ton formatter — MassDEP convention (CLAUDE.md §6). */
export const tons = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

/** US dollars, no cents. */
export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

/** Percent, one decimal. */
export const pct = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 }).format(n);

/** Month label for time-axis ticks. */
export const monthLabel = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

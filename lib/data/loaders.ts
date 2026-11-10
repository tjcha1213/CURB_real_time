/**
 * Typed loaders for processed JSON in /public/data. Every dataset
 * the site consumes should pass through one of these — no fetch()
 * calls scattered across scene components.
 *
 * Files referenced here don't exist yet; they'll appear as the
 * /data-prep pipeline produces them. Each loader should fail loudly
 * if its file is missing so we notice during dev.
 */

export type StatewideTonnage = {
  year: number;
  bulkyWasteShortTons: number;
  source: string;
};

export type MonthlyMoveOutSignal = {
  month: string; // ISO YYYY-MM
  bostonPermits?: number;
  boston311BulkyPickups?: number;
  cambridge311?: number;
};

export type HotspotFeature = {
  geoid: string;
  name: string;
  complaintsPerHousehold: number;
  studentHouseholdShare: number;
  lon: number;
  lat: number;
};

export type MattressBeforeAfter = {
  period: "pre-ban" | "post-ban";
  year: number;
  mattressesRecycledShortTons: number;
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "force-cache" });
  if (!res.ok) throw new Error(`[data] ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export const loadStatewideTonnage = () =>
  fetchJson<StatewideTonnage[]>("/data/ma-bulky-tonnage.json");

export const loadMonthlyMoveOutSignal = () =>
  fetchJson<MonthlyMoveOutSignal[]>("/data/monthly-moveout-signal.json");

export const loadHotspots = () => fetchJson<HotspotFeature[]>("/data/boston-cambridge-hotspots.json");

export const loadMattressBeforeAfter = () =>
  fetchJson<MattressBeforeAfter[]>("/data/mattress-ban-before-after.json");

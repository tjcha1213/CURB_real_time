/**
 * Server-side JSON loaders. Reads from /public/data at build/request time
 * so scene components stay async-free and we ship zero data-fetch JS to
 * the client. Mirrors the shapes declared in loaders.ts (client version).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "public", "data");

async function read<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(DATA_DIR, file), "utf-8");
    if (!raw.trim()) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw err;
  }
}

export type StatewideTonnage = { year: number; bulkyWasteShortTons: number; source: string };
export type MattressYear = {
  period: "pre-ban" | "post-ban";
  year: number;
  mattressesRecycledUnits: number;
  mattressesRecycledShortTons: number;
  note?: string;
};
export type MonthlySignal = {
  month: string;
  boston311BulkyPickups?: number;
  bostonPermits?: number;
};
export type CambridgeMonthly = {
  month: string;
  trash: number;
  combined_recycling: number;
  compost: number;
  mattresses: number;
  textiles: number;
  electronics: number;
  scrap_metal: number;
  yard_waste: number;
  plastic_film: number;
};
export type Hotspot = {
  geoid: string;
  name: string;
  complaintsPerHousehold: number;
  studentHouseholdShare: number;
  lon: number;
  lat: number;
  annualizedSeptemberComplaints: number;
  housingUnits: number;
};

export type AdvocacyNode = {
  id: string;
  type: "municipality" | "neighborhood_hotspot" | "mattress_recycler";
  name: string;
  parentArea: string;
  state: string;
  lat: number;
  lon: number;
  allstonRelevance: string;
  publicWasteData: string;
  publicWasteDetail: string;
  publicMovingData: string;
  public311Data: string;
  publicItemLevelReporting: string;
  mattressCollectionType: string;
  reuseDirectory: string;
  knownPartner: string;
  knownMattressPartner: string;
  annualMattressTons: number | null;
  bulkyWasteVisibility: string;
  reportingGapSummary: string;
  coordinationLevel: "High" | "Medium" | "Low" | "" | string;
  coordinationScore: number;
  suggestedAction: string;
  tooltipTitle: string;
  tooltipSummary: string;
  sources: string[];
};

export const loadStatewideTonnage = () => read<StatewideTonnage[]>("ma-bulky-tonnage.json", []);
export const loadMattress = () => read<MattressYear[]>("mattress-ban-before-after.json", []);
export const loadMonthlySignal = () => read<MonthlySignal[]>("monthly-moveout-signal.json", []);
export const loadCambridgeMonthly = () => read<CambridgeMonthly[]>("cambridge-monthly.json", []);
export const loadHotspots = () => read<Hotspot[]>("boston-cambridge-hotspots.json", []);
export const loadAdvocacyNodes = () => read<AdvocacyNode[]>("advocacy-map.json", []);

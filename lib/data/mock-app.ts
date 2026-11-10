/**
 * Mock data for the resident-facing reporting + pickup app under /app.
 * Numbers and names are illustrative; reuse-partner names are real but
 * any pickup-window claim is hypothetical.
 */

export type ItemStatus =
  | "posted"
  | "matched"
  | "claimed"
  | "scheduled"
  | "picked-up"
  | "withdrawn";

export type ItemCategory =
  | "Couch / Sofa"
  | "Mattress"
  | "Dresser"
  | "Bed frame"
  | "Chair"
  | "Table"
  | "Lamp"
  | "Bookshelf"
  | "Other";

export type Item = {
  id: string;
  category: ItemCategory;
  title: string;
  condition: "Like new" | "Good" | "Fair" | "Needs repair";
  postedAt: string; // ISO
  pickupWindow: string; // human-readable
  neighborhood: string;
  block: string;
  distanceMi: number;
  postedBy: string;
  status: ItemStatus;
  matchedPartner?: string;
  /** A vibe color for the placeholder image card. */
  vibe: "rose" | "olive" | "sand" | "slate" | "amber" | "sage";
  notes?: string;
};

export const ITEMS: Item[] = [
  {
    id: "ITEM-1041",
    category: "Couch / Sofa",
    title: "3-seat sofa, charcoal",
    condition: "Good",
    postedAt: "2026-08-29T10:14:00",
    pickupWindow: "Sat 10am – 2pm",
    neighborhood: "Allston",
    block: "Linden St",
    distanceMi: 0.3,
    postedBy: "Mira K.",
    status: "matched",
    matchedPartner: "Habitat ReStore — Boston",
    vibe: "rose",
    notes: "Two grad students moving out. Couch is 3 years old, no rips, slightly faded.",
  },
  {
    id: "ITEM-1042",
    category: "Mattress",
    title: "Queen mattress, no stains",
    condition: "Good",
    postedAt: "2026-08-29T11:02:00",
    pickupWindow: "Sat 10am – 2pm",
    neighborhood: "Allston",
    block: "Linden St",
    distanceMi: 0.3,
    postedBy: "Mira K.",
    status: "scheduled",
    matchedPartner: "City of Boston — bulky pickup",
    vibe: "olive",
    notes: "Diverts via municipal mattress program (310 CMR 19.017).",
  },
  {
    id: "ITEM-1043",
    category: "Dresser",
    title: "5-drawer oak dresser",
    condition: "Like new",
    postedAt: "2026-08-29T09:30:00",
    pickupWindow: "Fri 6pm – 8pm",
    neighborhood: "Brighton",
    block: "Commonwealth Ave",
    distanceMi: 0.8,
    postedBy: "Sam P.",
    status: "claimed",
    matchedPartner: "Buy Nothing — Brighton",
    vibe: "amber",
  },
  {
    id: "ITEM-1044",
    category: "Bed frame",
    title: "Queen platform frame",
    condition: "Fair",
    postedAt: "2026-08-28T19:55:00",
    pickupWindow: "Sat morning",
    neighborhood: "Mission Hill",
    block: "Smith St",
    distanceMi: 1.2,
    postedBy: "Devon R.",
    status: "posted",
    vibe: "slate",
  },
  {
    id: "ITEM-1045",
    category: "Bookshelf",
    title: "5-shelf laminate bookcase",
    condition: "Good",
    postedAt: "2026-08-29T08:10:00",
    pickupWindow: "Sat 10am – 2pm",
    neighborhood: "Allston",
    block: "Pratt St",
    distanceMi: 0.4,
    postedBy: "Yuki M.",
    status: "posted",
    vibe: "sand",
  },
  {
    id: "ITEM-1046",
    category: "Chair",
    title: "Pair of dining chairs",
    condition: "Good",
    postedAt: "2026-08-29T12:00:00",
    pickupWindow: "Anytime Sat–Sun",
    neighborhood: "Cambridgeport",
    block: "Magazine St",
    distanceMi: 1.6,
    postedBy: "Priya S.",
    status: "matched",
    matchedPartner: "Household Goods — Acton",
    vibe: "sage",
  },
  {
    id: "ITEM-1047",
    category: "Table",
    title: "Round dining table",
    condition: "Needs repair",
    postedAt: "2026-08-28T22:40:00",
    pickupWindow: "Fri 6pm – 8pm",
    neighborhood: "Fenway",
    block: "Peterborough St",
    distanceMi: 0.9,
    postedBy: "Aisha B.",
    status: "withdrawn",
    vibe: "amber",
    notes: "Wobbly leg — needs a screw kit.",
  },
  {
    id: "ITEM-1048",
    category: "Lamp",
    title: "Floor lamp + side lamp set",
    condition: "Like new",
    postedAt: "2026-08-29T14:25:00",
    pickupWindow: "Sat 10am – 2pm",
    neighborhood: "Allston",
    block: "Glenville Ave",
    distanceMi: 0.5,
    postedBy: "Tomas L.",
    status: "posted",
    vibe: "rose",
  },
];

export type PartnerKind = "Reuse nonprofit" | "Peer network" | "City pickup";

export type Partner = {
  id: string;
  name: string;
  kind: PartnerKind;
  servingNeighborhoods: string[];
  acceptedCategories: ItemCategory[];
  pickup: boolean;
  windowText: string;
  capacityRemainingPct: number;
};

export const PARTNERS: Partner[] = [
  {
    id: "habitat-boston",
    name: "Habitat for Humanity ReStore — Boston",
    kind: "Reuse nonprofit",
    servingNeighborhoods: ["Allston", "Brighton", "Fenway", "Back Bay"],
    acceptedCategories: ["Couch / Sofa", "Dresser", "Table", "Bookshelf"],
    pickup: true,
    windowText: "Sat & Sun, 10am – 4pm",
    capacityRemainingPct: 45,
  },
  {
    id: "buy-nothing-brighton",
    name: "Buy Nothing — Brighton",
    kind: "Peer network",
    servingNeighborhoods: ["Brighton", "Allston"],
    acceptedCategories: ["Couch / Sofa", "Mattress", "Dresser", "Chair", "Table", "Lamp", "Bookshelf", "Other"],
    pickup: false,
    windowText: "Posted to local group within 5 min",
    capacityRemainingPct: 100,
  },
  {
    id: "household-goods",
    name: "Household Goods — Acton",
    kind: "Reuse nonprofit",
    servingNeighborhoods: ["Cambridgeport", "Mission Hill", "South End"],
    acceptedCategories: ["Couch / Sofa", "Bed frame", "Chair", "Table", "Lamp"],
    pickup: true,
    windowText: "Truck route Sat 9am – 1pm",
    capacityRemainingPct: 70,
  },
  {
    id: "city-pickup-boston",
    name: "City of Boston — bulky pickup",
    kind: "City pickup",
    servingNeighborhoods: ["Allston", "Brighton", "Fenway", "Mission Hill", "South End", "Dorchester"],
    acceptedCategories: ["Mattress", "Couch / Sofa", "Dresser", "Bed frame", "Bookshelf", "Other"],
    pickup: true,
    windowText: "Move-out week curbside, Aug 30 – Sep 5",
    capacityRemainingPct: 30,
  },
];

export type DashboardKPI = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
};

export const DASHBOARD_KPIS: DashboardKPI[] = [
  {
    label: "Items posted (last 7 days)",
    value: "1,284",
    delta: "+38% vs. baseline week",
    positive: true,
  },
  {
    label: "Diversion rate (matched / posted)",
    value: "62%",
    delta: "Target: 40% in year 1",
    positive: true,
  },
  {
    label: "Avg. time to claim",
    value: "47 min",
    delta: "−18 min vs. last week",
    positive: true,
  },
  {
    label: "Mattresses on partner trucks",
    value: "318",
    delta: "−1,400 vs. uncoordinated curb",
    positive: true,
  },
];

export type ActivityEvent = {
  id: string;
  ts: string; // ISO
  kind: "posted" | "matched" | "claimed" | "scheduled" | "picked-up";
  text: string;
  neighborhood: string;
};

export const RECENT_ACTIVITY: ActivityEvent[] = [
  { id: "evt-1", ts: "2026-08-29T15:42:00", kind: "picked-up", text: "Habitat truck picked up dresser from Pratt St", neighborhood: "Allston" },
  { id: "evt-2", ts: "2026-08-29T15:31:00", kind: "matched", text: "Sofa matched to Habitat ReStore (Boston)", neighborhood: "Allston" },
  { id: "evt-3", ts: "2026-08-29T15:18:00", kind: "claimed", text: "Bookshelf claimed by neighbor (Buy Nothing)", neighborhood: "Brighton" },
  { id: "evt-4", ts: "2026-08-29T15:02:00", kind: "scheduled", text: "Mattress added to City of Boston Sat route", neighborhood: "Allston" },
  { id: "evt-5", ts: "2026-08-29T14:48:00", kind: "posted", text: "Lamp set posted on Glenville Ave", neighborhood: "Allston" },
  { id: "evt-6", ts: "2026-08-29T14:31:00", kind: "matched", text: "Dining chairs matched to Household Goods", neighborhood: "Cambridgeport" },
  { id: "evt-7", ts: "2026-08-29T14:11:00", kind: "claimed", text: "Floor lamp claimed by neighbor", neighborhood: "Fenway" },
  { id: "evt-8", ts: "2026-08-29T13:50:00", kind: "posted", text: "Bed frame posted on Smith St", neighborhood: "Mission Hill" },
];

export const NEIGHBORHOOD_BREAKDOWN = [
  { name: "Allston", posted: 412, claimed: 281, diversionRate: 0.68 },
  { name: "Brighton", posted: 327, claimed: 199, diversionRate: 0.61 },
  { name: "Mission Hill", posted: 156, claimed: 98, diversionRate: 0.63 },
  { name: "Fenway", posted: 142, claimed: 81, diversionRate: 0.57 },
  { name: "Back Bay", posted: 98, claimed: 64, diversionRate: 0.65 },
  { name: "South End", posted: 84, claimed: 47, diversionRate: 0.56 },
  { name: "Cambridgeport", posted: 65, claimed: 41, diversionRate: 0.63 },
];

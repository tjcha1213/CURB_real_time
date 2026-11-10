import { AppShell } from "@/components/app/AppShell";
import { ItemThumb } from "@/components/app/ItemThumb";
import { StatusBadge } from "@/components/app/StatusBadge";
import { ITEMS } from "@/lib/data/mock-app";

export const metadata = {
  title: "Browse + claim · The Curb",
};

const FILTERS = [
  "All",
  "Couch / Sofa",
  "Mattress",
  "Dresser",
  "Bed frame",
  "Chair",
  "Table",
  "Lamp",
  "Bookshelf",
];

const ACTIVE_FILTER = "All";
const SELECTED = ITEMS[0];

export default function BrowsePage() {
  return (
    <AppShell active="browse" eyebrow="Browse + claim">
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              {ITEMS.length} items · within 1 mi · move-out week
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight">
              What&apos;s hitting the curb this weekend.
            </h1>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <span
                key={f}
                className={
                  "border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest " +
                  (f === ACTIVE_FILTER
                    ? "border-[color:var(--color-discard)] bg-[color:var(--color-discard)]/8 text-[color:var(--color-discard)]"
                    : "border-[color:var(--color-rule)] bg-[color:var(--color-paper)] opacity-80")
                }
              >
                {f}
              </span>
            ))}
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <li key={item.id}>
                <div
                  className={
                    "flex w-full flex-col " +
                    (item.id === SELECTED.id
                      ? "outline outline-2 outline-offset-2 outline-[color:var(--color-discard)]"
                      : "")
                  }
                >
                  <ItemThumb item={item} size="md" />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-base leading-tight">{item.title}</p>
                      <p className="mt-1 text-[12px] opacity-70">
                        {item.condition} · {item.pickupWindow} · {item.distanceMi.toFixed(1)} mi
                      </p>
                      <p className="mt-1 text-[11px] opacity-55">
                        {item.block}, {item.neighborhood}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 border border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
            <ItemThumb item={SELECTED} size="lg" />
            <div className="space-y-5 p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-55">
                    {SELECTED.id}
                  </p>
                  <h2 className="mt-1 font-display text-2xl leading-tight">{SELECTED.title}</h2>
                </div>
                <StatusBadge status={SELECTED.status} />
              </div>

              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                <Stat label="Condition" value={SELECTED.condition} />
                <Stat label="Pickup" value={SELECTED.pickupWindow} />
                <Stat label="Block" value={`${SELECTED.block}, ${SELECTED.neighborhood}`} />
                <Stat label="Distance" value={`${SELECTED.distanceMi.toFixed(1)} mi`} />
                <Stat label="Posted by" value={SELECTED.postedBy} />
                {SELECTED.matchedPartner ? (
                  <Stat label="Routed to" value={SELECTED.matchedPartner} />
                ) : null}
              </dl>

              {SELECTED.notes ? (
                <p className="border-l border-[color:var(--color-rule)] pl-4 text-sm leading-relaxed opacity-85">
                  &quot;{SELECTED.notes}&quot;
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <span className="bg-[color:var(--color-discard)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-paper)]">
                  Claim this item
                </span>
                <span className="border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest opacity-80">
                  Save for later
                </span>
              </div>

              <p className="border-t border-[color:var(--color-rule)] pt-4 text-[11px] leading-relaxed opacity-60">
                Address is hidden until you claim. The poster gets your initials and one-time pickup
                message — no DMs, no inbox to manage.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest opacity-55">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

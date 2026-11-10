import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { ItemThumb } from "@/components/app/ItemThumb";
import { StatusBadge } from "@/components/app/StatusBadge";
import { ITEMS, PARTNERS } from "@/lib/data/mock-app";

export const metadata = {
  title: "Post an item · The Curb",
};

const CATEGORIES = ["Couch / Sofa", "Mattress", "Dresser", "Bed frame", "Chair", "Table", "Lamp", "Bookshelf", "Other"];
const CONDITIONS = ["Like new", "Good", "Fair", "Needs repair"];
const WINDOWS = ["Tonight, 6 – 8 pm", "Tomorrow morning", "Saturday 10 am – 2 pm", "Sunday afternoon", "Anytime this weekend"];

const example = ITEMS[0]; // sofa

export default function ReportPage() {
  return (
    <AppShell active="report" eyebrow="Post an item">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <section className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
            <span className="text-[color:var(--color-discard)]">1 · Details</span>
            <span aria-hidden className="opacity-30">/</span>
            <span className="opacity-50">2 · Matching</span>
            <span aria-hidden className="opacity-30">/</span>
            <span className="opacity-50">3 · Confirmed</span>
          </div>

          <div className="space-y-8">
            <Field label="Photo">
              <div className="flex aspect-[5/3] w-full items-center justify-center border border-dashed border-[color:var(--color-rule)] bg-[color:var(--color-paper-deep)]/30">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-reuse)]">
                  ✓ photo attached
                </span>
              </div>
            </Field>

            <Field label="Category">
              <ChoiceGrid options={CATEGORIES} active="Couch / Sofa" />
            </Field>

            <Field label="Condition">
              <ChoiceGrid options={CONDITIONS} active="Good" cols={4} />
            </Field>

            <Field label="Pickup window">
              <ChoiceGrid options={WINDOWS} active="Saturday 10 am – 2 pm" cols={3} />
            </Field>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Neighborhood">
                <FakeInput value="Allston" />
              </Field>
              <Field label="Block / cross street">
                <FakeInput value="Linden St" />
              </Field>
            </div>

            <Field label="Notes (optional)">
              <FakeInput value="Two grad students moving out. Couch is 3 years old, no rips, slightly faded." multiline />
            </Field>

            <Link
              href="#match"
              className="inline-flex items-center gap-3 bg-[color:var(--color-discard)] px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-paper)] transition hover:opacity-90"
            >
              Find a match  →
            </Link>
          </div>

          <div id="match" className="mt-16 border border-[color:var(--color-reuse)]/40 bg-[color:var(--color-reuse)]/8 p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-reuse)]">
              ✓ Match confirmed
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Habitat for Humanity ReStore — Boston
            </h2>
            <p className="mt-2 text-base leading-relaxed opacity-85">
              <strong>Saturday 10 am – 2 pm</strong>, picking up at <strong>Linden St, Allston</strong>. We&apos;ll text you 30 min before arrival.
            </p>
            <ul className="mt-8 space-y-1 text-sm leading-relaxed">
              <li>• You&apos;ll get a single confirmed window — no scrolling through groups.</li>
              <li>• If they cancel, we auto-reroute to the next partner in the list.</li>
              <li>• Worst case: the city&apos;s bulky truck is the safety net for move-out week.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app/browse"
                className="bg-[color:var(--color-ink)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-paper)]"
              >
                See what neighbors posted →
              </Link>
              <Link
                href="/app"
                className="border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-4 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-[color:var(--color-paper-deep)]"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>

        <aside className="lg:col-span-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest opacity-60">Live preview</p>
          <div className="border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-4">
            <ItemThumb item={example} size="lg" />
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg leading-tight">{example.title}</p>
                <p className="text-xs opacity-70">
                  {example.condition} · {example.pickupWindow} · {example.block}, {example.neighborhood}
                </p>
              </div>
              <StatusBadge status="matched" />
            </div>
            {example.notes ? (
              <p className="mt-3 border-t border-[color:var(--color-rule)] pt-3 text-xs leading-relaxed opacity-80">
                &quot;{example.notes}&quot;
              </p>
            ) : null}
          </div>

          <p className="mt-8 mb-3 font-mono text-[10px] uppercase tracking-widest opacity-60">
            Likely partners — Allston
          </p>
          <ul className="space-y-3">
            {PARTNERS.filter((p) => p.servingNeighborhoods.includes("Allston"))
              .slice(0, 4)
              .map((p) => (
                <li
                  key={p.id}
                  className="flex items-start justify-between gap-3 border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] p-3"
                >
                  <div>
                    <p className="text-sm font-medium leading-tight">{p.name}</p>
                    <p className="mt-0.5 text-xs opacity-70">{p.windowText}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    {p.kind}
                  </span>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest opacity-70">{label}</p>
      {children}
    </div>
  );
}

function ChoiceGrid({ options, active, cols = 3 }: { options: string[]; active: string; cols?: 2 | 3 | 4 }) {
  const colsClass = cols === 4 ? "grid-cols-2 sm:grid-cols-4" : cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2";
  return (
    <div className={`grid gap-2 ${colsClass}`}>
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <span
            key={opt}
            className={
              "border px-3 py-2 text-left text-sm " +
              (isActive
                ? "border-[color:var(--color-discard)] bg-[color:var(--color-discard)]/8 text-[color:var(--color-discard)]"
                : "border-[color:var(--color-rule)] bg-[color:var(--color-paper)] opacity-80")
            }
          >
            {opt}
          </span>
        );
      })}
    </div>
  );
}

function FakeInput({ value, multiline }: { value: string; multiline?: boolean }) {
  if (multiline) {
    return (
      <p className="min-h-[68px] w-full border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-2 text-sm leading-relaxed">
        {value}
      </p>
    );
  }
  return (
    <p className="w-full border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-2 text-sm">
      {value}
    </p>
  );
}

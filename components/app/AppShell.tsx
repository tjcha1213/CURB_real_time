import Link from "next/link";
import type { ReactNode } from "react";

const TABS: { href: string; label: string; sub: string }[] = [
  { href: "/app", label: "Home", sub: "01" },
  { href: "/app/report", label: "Post an item", sub: "02" },
  { href: "/app/browse", label: "Browse + claim", sub: "03" },
  { href: "/app/dashboard", label: "City dashboard", sub: "04" },
];

type Props = {
  children: ReactNode;
  active?: "home" | "report" | "browse" | "dashboard";
  /** Page-specific eyebrow shown to the right of the wordmark. */
  eyebrow?: string;
};

export function AppShell({ children, active = "home", eyebrow }: Props) {
  return (
    <div className="flex min-h-svh flex-col bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <div className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-discard)]/8 px-6 py-2 text-center font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-discard)]">
        Demo · interactive product mock for the Scene 7 proposal
      </div>

      <header className="sticky top-0 z-40 border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/app" className="flex items-baseline gap-2">
              <span
                aria-hidden
                className="inline-block h-3 w-3 translate-y-0.5 rounded-full bg-[color:var(--color-discard)]"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl leading-none">The C.U.R.B.</span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] opacity-55">
                  Coordinated Urban Recycling for Boston
                </span>
              </span>
              <span className="ml-1 font-mono text-[10px] uppercase tracking-widest opacity-50">
                app
              </span>
            </Link>
            {eyebrow ? (
              <span className="ml-2 hidden border-l border-[color:var(--color-rule)] pl-3 font-mono text-[10px] uppercase tracking-widest opacity-60 md:inline">
                {eyebrow}
              </span>
            ) : null}
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {TABS.map((t) => {
              const id = t.href === "/app" ? "home" : t.href.split("/").pop();
              const isActive = id === active;
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group flex flex-col leading-tight"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">
                    {t.sub}
                  </span>
                  <span
                    className={
                      "text-sm transition " +
                      (isActive
                        ? "text-[color:var(--color-discard)]"
                        : "opacity-75 group-hover:opacity-100")
                    }
                  >
                    {t.label}
                  </span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/"
            className="hidden font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 lg:inline"
          >
            ← Back to story
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">{children}</main>

      <footer className="border-t border-[color:var(--color-rule)] px-6 py-6 text-center font-mono text-[10px] uppercase tracking-widest opacity-50">
        The C.U.R.B. (Coordinated Urban Recycling for Boston) · v0.3 · DPI 853M Group 3
      </footer>
    </div>
  );
}

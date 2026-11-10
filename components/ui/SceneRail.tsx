"use client";

import { useEffect, useState } from "react";

type Scene = { id: string; label: string };

const SCENES: Scene[] = [
  { id: "scene-hook", label: "Hook" },
  { id: "scene-scale", label: "Scale" },
  { id: "scene-rhythm", label: "Rhythm" },
  { id: "scene-geography", label: "Geography" },
  { id: "scene-mattress", label: "Mattress" },
  { id: "scene-reuse", label: "Reuse" },
  { id: "scene-proposal", label: "Proposal" },
  { id: "scene-take-action", label: "Take action" },
];

/**
 * Persistent nav rail, right-aligned, showing which act is in view.
 * Hidden below md — on mobile you just scroll. Not flashy; it exists so
 * readers can orient themselves inside a long page (CLAUDE.md §3: type
 * first, chrome last).
 */
export function SceneRail() {
  const [active, setActive] = useState<string>(SCENES[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const scene of SCENES) {
      const el = document.getElementById(scene.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Story sections"
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3 rounded-full border border-[rgba(214,189,166,0.6)] bg-[rgba(248,241,227,0.72)] px-3 py-4 shadow-[0_18px_48px_rgba(35,25,22,0.14)] backdrop-blur-md">
        {SCENES.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={
                    "h-px transition-all " +
                    (isActive
                      ? "w-8 bg-[color:var(--color-discard)]"
                      : "w-3 bg-[color:var(--color-reuse)] opacity-35 group-hover:w-5 group-hover:opacity-80")
                  }
                />
                <span
                  className={
                    "font-mono text-[10px] uppercase tracking-[0.18em] transition " +
                    (isActive
                      ? "text-[color:var(--color-ink)] opacity-100"
                      : "text-[color:var(--color-ink-mute)] opacity-70 group-hover:opacity-100")
                  }
                >
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

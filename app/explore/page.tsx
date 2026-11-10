import Link from "next/link";

export const metadata = {
  title: "Explore — The Curb",
};

/**
 * Per CLAUDE.md §5 this page is deferred until v1.0 — the narrative
 * is the product. Kept as a stub so the route exists.
 */
export default function Explore() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="mb-6 text-sm text-[color:var(--color-ink-mute)]">
        <Link href="/" className="underline underline-offset-4">
          ← Back to story
        </Link>
      </p>
      <h1 className="mb-6 font-display text-4xl leading-tight">Explore</h1>
      <p className="prose-body text-lg leading-relaxed text-[color:var(--color-ink-mute)]">
        A self-serve data explorer is planned for after the v1.0 story ships. For now, the
        narrative is the product — start at the{" "}
        <Link href="/" className="underline underline-offset-4">
          top of the story
        </Link>
        .
      </p>
    </main>
  );
}

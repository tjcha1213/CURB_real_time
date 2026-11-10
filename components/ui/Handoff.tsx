/**
 * End-of-scene one-liner that hands the reader to the next act.
 * CLAUDE.md §2: every scene ends with a "handoff sentence."
 */
export function Handoff({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-16 max-w-md font-display text-xl italic leading-snug opacity-80 md:text-2xl">
      {children}
    </p>
  );
}

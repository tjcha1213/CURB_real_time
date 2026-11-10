import Link from "next/link";

export const metadata = {
  title: "About — The Curb",
};

export default function About() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <p className="mb-6 text-sm text-[color:var(--color-ink-mute)]">
        <Link href="/" className="underline underline-offset-4">
          ← Back to story
        </Link>
      </p>
      <h1 className="mb-8 font-display text-4xl leading-tight">About this project</h1>
      <div className="prose-body space-y-6 text-lg leading-relaxed">
        <p>
          This site was built by <strong>Takashi Ban, Tae Jun Cha, Hyeji Kim, Seojin Moon,</strong>{" "}
          and <strong>Mandy Tao</strong> for DPI&nbsp;853M (Prof.&nbsp;Hong Qu) at the Harvard
          Kennedy School, Spring 2026.
        </p>
        <h2 className="pt-6 font-display text-2xl">Methodology</h2>
        <p>
          Every number on this site traces back to a public dataset — Cambridge and Boston Open
          Data portals, MassDEP&apos;s Solid Waste Master Plan reports, the Mattress Recycling
          Council&apos;s annual reports, and the U.S. Census. See the{" "}
          <a
            href="https://github.com/"
            className="text-[color:var(--color-discard)] underline underline-offset-4"
          >
            source log
          </a>{" "}
          in the repo for exact URLs and fetch dates.
        </p>
        <h2 className="pt-6 font-display text-2xl">Acknowledgements</h2>
        <p>Thanks to the municipal open-data teams who publish these sources under open licenses.</p>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_PETITION_ENDPOINT ?? "";
const GOAL = 5000;

/**
 * Petition form. POSTs to a Google Apps Script Web App that appends to
 * a Google Sheet; the same endpoint returns the live signature count
 * via GET. Falls back to a local-only mock when no endpoint is
 * configured (useful in dev / before the backend is wired).
 *
 * Setup: docs/petition-backend/README.md
 */
export function PetitionForm() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySigned, setAlreadySigned] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Initial count fetch.
  useEffect(() => {
    if (!ENDPOINT) return;
    let cancelled = false;
    fetch(ENDPOINT, { method: "GET", cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (typeof d?.count === "number") setCount(d.count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (zip.length !== 5) {
      setError("Please enter a 5-digit ZIP code.");
      return;
    }
    setError("");
    setBusy(true);

    if (!ENDPOINT) {
      // Local-only mock: pretend it worked.
      setCount((c) => (c ?? 0) + 1);
      setSubmitted(true);
      setBusy(false);
      return;
    }

    try {
      const body = new URLSearchParams({
        email,
        zip,
        ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      });
      const res = await fetch(ENDPOINT, { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        count?: number;
        alreadySigned?: boolean;
        error?: string;
      };
      if (!data.ok && data.error) {
        setError(data.error);
        return;
      }
      if (typeof data.count === "number") setCount(data.count);
      if (data.alreadySigned) setAlreadySigned(true);
      setSubmitted(true);
    } catch {
      setError("Couldn't reach the petition server. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-8 backdrop-blur-md md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-reuse)]">
          ✓ {alreadySigned ? "Already on the list" : "You're on the list"}
        </p>
        <h3 className="mt-3 font-display text-2xl leading-tight">
          {alreadySigned
            ? "Looks like you signed before. Thanks again."
            : "Thanks. We'll send you the script before each city council hearing."}
        </h3>
        {count != null ? <CountStrip count={count} /> : null}
        <p className="mt-4 text-sm leading-relaxed opacity-80">
          One email per hearing — never more, never spam. We&apos;ll never share your address.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setAlreadySigned(false);
            setEmail("");
            setZip("");
          }}
          className="mt-5 font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100"
        >
          ← Sign with another address
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-8 shadow-[0_22px_80px_rgba(9,32,24,0.3)] backdrop-blur-md md:p-10"
    >
      <h3 className="font-display text-2xl leading-tight">Sign the petition</h3>
      <p className="mt-2 text-sm opacity-70">
        We share signature counts publicly. We never share your contact info.
      </p>

      {count != null ? <CountStrip count={count} /> : null}

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={busy}
            className="w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-current placeholder:opacity-50 focus:border-[color:var(--color-gold)] focus:outline-none disabled:opacity-50"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium">ZIP code</span>
          <input
            type="text"
            required
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
            placeholder="02134"
            disabled={busy}
            className="w-full rounded-xl border border-white/30 bg-white/10 px-3 py-2.5 text-sm text-current placeholder:opacity-50 focus:border-[color:var(--color-gold)] focus:outline-none disabled:opacity-50"
          />
        </label>

        {error ? (
          <p className="text-sm text-[color:var(--color-discard)]">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-[linear-gradient(135deg,var(--color-discard),#b93131)] px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-paper)] transition hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Adding…" : "Add my name"}
        </button>
      </div>
    </form>
  );
}

function CountStrip({ count }: { count: number }) {
  const pct = Math.min(100, (count / GOAL) * 100);
  return (
    <div className="mt-5 rounded-xl border border-white/15 bg-[rgba(16,38,29,0.28)] px-4 py-3">
      <div className="flex items-baseline justify-between gap-3">
        <p>
          <span className="font-display text-3xl leading-none">
            {count.toLocaleString()}
          </span>
          <span className="ml-2 text-xs uppercase tracking-widest opacity-70">
            signatures so far
          </span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
          goal {GOAL.toLocaleString()}
        </p>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[color:var(--color-discard)] transition-all duration-700"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

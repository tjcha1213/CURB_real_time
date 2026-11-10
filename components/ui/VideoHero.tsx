import { clsx } from "@/lib/utils/clsx";

type Props = {
  src?: string;
  poster?: string;
  /** Short caption shown over the placeholder when no src is set. */
  caption?: string;
  /** Source attribution line rendered under the video frame. */
  credit?: string;
  className?: string;
  /**
   * "intro" (default) = a deliberately-watched intro video: shows
   * controls, plays once, autoplays muted (so it grabs attention without
   * blowing speakers); user can unmute via the controls bar.
   *
   * "ambient" = autoplay-muted-loop with no controls. Reserved for
   * decorative b-roll where audio would be jarring.
   */
  mode?: "intro" | "ambient";
};

/**
 * Full-bleed video slot. Renders a <video> when `src` is provided;
 * otherwise a labelled placeholder so reviewers see what goes there.
 */
export function VideoHero({
  src,
  poster,
  caption,
  credit,
  className,
  mode = "intro",
}: Props) {
  const isIntro = mode === "intro";
  return (
    <figure className={clsx("relative w-full overflow-hidden", className)}>
      {src ? (
        <video
          className="aspect-video h-auto w-full rounded-[1.75rem] border border-white/12 bg-[color:var(--color-dark-paper)] object-cover shadow-[0_30px_80px_rgba(9,32,24,0.42)]"
          src={src}
          poster={poster}
          autoPlay
          muted
          playsInline
          loop={!isIntro}
          controls={isIntro}
          preload="auto"
        />
      ) : (
        <div
          className="relative flex aspect-video w-full items-end overflow-hidden rounded-[1.75rem] border border-white/10 bg-[color:var(--color-dark-paper)] shadow-[0_30px_80px_rgba(9,32,24,0.42)]"
          role="img"
          aria-label={caption ?? "Video placeholder — pending footage"}
        >
          {/* subtle diagonal scrim so the placeholder doesn't read as a broken image */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 12px, rgba(255,255,255,0) 12px 24px)",
            }}
            aria-hidden
          />
          <div className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
            Video · placeholder
          </div>
          <div className="relative z-10 w-full p-6 md:p-10">
            <p className="font-display text-2xl leading-tight opacity-90 md:text-3xl">
              {caption ??
                "Allston Christmas b-roll goes here — street-level, slow pan, September 1 morning."}
            </p>
          </div>
        </div>
      )}
      {credit ? (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-70">
          {credit}
        </figcaption>
      ) : null}
    </figure>
  );
}

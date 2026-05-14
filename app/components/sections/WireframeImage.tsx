type Props = {
  label: string;
  accent: string;
  aspect?: string;
  tone?: "light" | "dark";
  caption?: string;
  className?: string;
};

/**
 * Low-fi placeholder that signals "image will live here" without resorting to
 * a generic gray box. Uses dashed bezel + diagonal stripe fill + crosshair.
 */
export function WireframeImage({
  label,
  accent,
  aspect = "4/3",
  tone = "light",
  caption,
  className = "",
}: Props) {
  const isDark = tone === "dark";
  const ink = isDark ? "rgba(250,245,233,0.78)" : "rgba(14,43,34,0.78)";
  const dim = isDark ? "rgba(250,245,233,0.42)" : "rgba(14,43,34,0.42)";
  const hair = isDark ? "rgba(250,245,233,0.18)" : "rgba(14,43,34,0.16)";
  const tint = isDark ? "rgba(250,245,233,0.04)" : "rgba(14,43,34,0.025)";

  return (
    <figure className={`relative ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-[18px]"
        style={{
          aspectRatio: aspect,
          background: tint,
          boxShadow: `inset 0 0 0 1px ${hair}`,
        }}
      >
        {/* Dashed inner bezel */}
        <div
          aria-hidden
          className="absolute inset-2 rounded-[12px] pointer-events-none"
          style={{
            border: `1px dashed ${hair}`,
          }}
        />
        {/* Diagonal stripe fill */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, transparent 0 11px, ${hair} 11px 12px)`,
            opacity: 0.55,
          }}
        />
        {/* Center crosshair */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line x1="0" y1="0" x2="100" y2="100" stroke={hair} strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" stroke={hair} strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Top-left corner tag */}
        <div
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: dim }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: accent }}
            aria-hidden
          />
          IMG · placeholder
        </div>

        {/* Bottom-right ratio chip */}
        <div
          className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.14em]"
          style={{ color: dim }}
        >
          {aspect.replace("/", " : ")}
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em] max-w-[28ch]"
            style={{ color: ink }}
          >
            {label}
          </span>
        </div>
      </div>
      {caption && (
        <figcaption
          className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em]"
          style={{ color: dim }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

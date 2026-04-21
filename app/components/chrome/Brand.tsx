type BrandProps = {
  /** When true, swaps to footer styling (cream mark, larger name). */
  variant?: "nav" | "footer";
  showTld?: boolean;
};

/**
 * The Moddin wordmark. Used in nav (small, dark mark) and footer (large, cream mark).
 */
export function Brand({ variant = "nav", showTld = true }: BrandProps) {
  const isFooter = variant === "footer";
  const markClasses = isFooter
    ? "size-[38px] bg-cream text-ink"
    : "size-9 bg-ink text-cream";
  const nameSize = isFooter ? "text-[26px]" : "text-2xl";

  return (
    <a
      href="#top"
      className="flex items-baseline gap-3 font-serif font-medium tracking-[-0.02em]"
      aria-label="Moddin home"
    >
      <span
        className={`${markClasses} grid place-items-center self-center -translate-y-px rounded-full font-serif italic font-normal text-[22px]`}
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 1' }}
      >
        M
      </span>
      <span
        className={`${nameSize} ${isFooter ? "text-cream font-normal" : ""}`}
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
      >
        Modd<em className={`not-italic ${isFooter ? "italic text-ember font-normal" : ""}`} style={{ fontStyle: "italic", color: isFooter ? "var(--ember)" : "var(--terracotta)", fontWeight: 400 }}>i</em>n
      </span>
      {showTld && !isFooter && (
        <span className="hidden md:inline self-center font-mono text-[10px] uppercase tracking-[0.2em] text-stone ml-1">
          — BD / Global
        </span>
      )}
    </a>
  );
}

import type { ReactNode } from "react";

type EyebrowProps = {
  index?: string; // e.g. "i.", "ii." — small italic counter
  children: ReactNode;
  tone?: "ink" | "cream";
};

/**
 * Small label with a colored dot, optional roman-numeral index, and text.
 * The `tone` prop swaps the foreground/background colors for the dark sections.
 */
export function Eyebrow({ index, children, tone = "ink" }: EyebrowProps) {
  const isDark = tone === "cream";
  return (
    <div
      className={`inline-flex items-center gap-3 text-[12.5px] font-medium tracking-[0.02em] ${
        isDark ? "text-cream/80" : "text-stone"
      }`}
    >
      <span
        className={`inline-block size-[7px] rounded-full ${
          isDark ? "bg-ember" : "bg-terracotta"
        }`}
      />
      {index && (
        <span className="serif-italic text-[15px] font-normal text-terracotta tracking-[-0.01em]">
          {index}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}

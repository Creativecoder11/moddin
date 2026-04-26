import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  tone?: "ink" | "cream";
};

/**
 * Small section label.
 * The `tone` prop swaps the foreground/background colors for the dark sections.
 */
export function Eyebrow({ children, tone = "ink" }: EyebrowProps) {
  const isDark = tone === "cream";
  return (
    <div
      className={`inline-flex items-center text-[clamp(15px,1.05vw,18px)] font-semibold tracking-[0.02em] ${
        isDark ? "text-cream/80" : "text-stone"
      }`}
    >
      <span>{children}</span>
    </div>
  );
}

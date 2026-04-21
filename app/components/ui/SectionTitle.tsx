import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "cream";
};

/**
 * Editorial section H2. Wrap italic copy in <em> for the terracotta accent.
 */
export function SectionTitle({
  children,
  className = "",
  tone = "ink",
}: SectionTitleProps) {
  const color = tone === "cream" ? "text-cream" : "text-ink";
  return (
    <h2 className={`section-title ${color} ${className}`.trim()}>{children}</h2>
  );
}

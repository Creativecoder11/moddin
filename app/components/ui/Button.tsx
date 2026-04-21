import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "dark" | "ghost" | "light" | "outline";

const VARIANTS: Record<Variant, string> = {
  dark:
    "bg-ink text-[var(--cream)] hover:bg-terracotta hover:-translate-y-px",
  ghost:
    "bg-transparent text-ink border border-[var(--rule)] hover:border-ink hover:-translate-y-px",
  light: "bg-cream text-ink hover:bg-ember",
  outline:
    "bg-transparent text-[var(--cream)] border border-[var(--rule-d)] hover:border-cream",
};

const VARIANT_STYLES: Partial<Record<Variant, CSSProperties>> = {
  dark: { color: "var(--cream)" },
  outline: { color: "var(--cream)" },
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
};

/**
 * Pill-shaped link styled per the Moddin brand. Hover lift + arrow shift come
 * from utility classes (no JS).
 */
export function ButtonLink({
  variant = "dark",
  arrow = false,
  className = "",
  style,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      {...rest}
      style={{ ...VARIANT_STYLES[variant], ...style }}
      className={`group inline-flex items-center gap-[10px] rounded-full px-[22px] py-[14px] text-[14px] tracking-[0.01em] transition-all duration-[250ms] ease-out ${VARIANTS[variant]} ${className}`.trim()}
    >
      {children}
      {arrow && (
        <span className="inline-block transition-transform duration-[250ms] ease-out group-hover:translate-x-[3px]">
          →
        </span>
      )}
    </a>
  );
}

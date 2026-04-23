import { type HTMLAttributes } from "react";

type BrandProps = HTMLAttributes<HTMLAnchorElement> & {
  variant?: "nav" | "footer";
  showTld?: boolean;
};

export function Brand({ variant = "nav", showTld = true, className = "", ...rest }: BrandProps) {
  const isFooter = variant === "footer";

  return (
    <a
      href="#top"
      className={`group flex items-baseline gap-[6px] font-serif transition-opacity hover:opacity-80 ${className}`}
      aria-label="Moddin home"
      {...rest}
    >
      <span
        className={`text-[32px] leading-none tracking-[-0.04em] ${isFooter ? "text-cream" : "text-ink"}`}
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 0' }}
      >
        Modd<em className={`italic ${isFooter ? "text-ember" : "text-terracotta"}`} style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}>i</em>n
      </span>
      {showTld && !isFooter && (
        <span className="hidden md:inline-block translate-y-[-4px] font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-stone opacity-90">
          bd
        </span>
      )}
    </a>
  );
}

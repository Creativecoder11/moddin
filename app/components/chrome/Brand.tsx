import { type HTMLAttributes } from "react";
import Image from "next/image";

type BrandProps = HTMLAttributes<HTMLAnchorElement> & {
  variant?: "nav" | "footer";
};

export function Brand({ variant = "nav", className = "", ...rest }: BrandProps) {
  const isFooter = variant === "footer";

  return (
    <a
      href="#top"
      className={`group flex items-center transition-opacity hover:opacity-80 ${className}`}
      aria-label="Moddin home"
      {...rest}
    >
      <Image
        src="/logo.png"
        alt="Moddin Logo"
        width={isFooter ? 180 : 128}
        height={isFooter ? 34 : 24}
        priority={!isFooter}
        sizes={isFooter ? "180px" : "128px"}
        className="object-contain"
      />
    </a>
  );
}

import { type HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

type BrandProps = HTMLAttributes<HTMLAnchorElement> & {
  variant?: "nav" | "footer";
};

export function Brand({ variant = "nav", className = "", ...rest }: BrandProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      className={`group flex items-center ${isFooter ? 'transition-opacity hover:opacity-80' : ''} ${className}`}
      aria-label="Moddin home"
      {...rest}
    >
      <Image
        src="/Moddin-Logo.svg"
        alt="Moddin Logo"
        width={isFooter ? 180 : 128}
        height={isFooter ? 36 : 25}
        preload={!isFooter}
        sizes={isFooter ? "180px" : "128px"}
        unoptimized
        className="object-contain brightness-0 invert"
      />
    </Link>
  );
}

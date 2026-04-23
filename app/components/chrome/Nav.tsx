"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { NAV_LINKS } from "@/app/data/site";
import { ButtonLink } from "../ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 300);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-[34px] left-0 right-0 z-50 transition-all duration-[600ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--paper)_94%,transparent)] border-b border-[var(--rule-2)] py-[14px] backdrop-blur-[24px] backdrop-saturate-150"
          : "bg-transparent border-b border-transparent py-5",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="wrap flex items-center justify-between">
        <Brand className="flex-shrink-0" />
        
        <nav aria-label="Primary" className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-[48px]">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-sans font-medium text-ink/75 hover:text-terracotta transition-colors tracking-[0.04em] uppercase"
            >
              {l.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center flex-shrink-0">
          <ButtonLink
            href="#contact"
            variant="dark"
            className="whitespace-nowrap py-[12px] px-[26px] text-[12px] font-bold uppercase tracking-[0.15em]"
          >
            Let&apos;s Talk
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

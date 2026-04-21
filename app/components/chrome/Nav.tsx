"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { NAV_LINKS } from "@/app/data/site";
import { ButtonLink } from "../ui/Button";

/**
 * Fixed nav that lives just below the ticker.
 * - `.is-scrolled` darkens the backdrop after 40px of scroll.
 * - `.is-hidden` slides it off-screen when scrolling down past 260px.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 260);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-[34px] left-0 right-0 z-50 border-b border-[var(--rule)]",
        "transition-[transform,background-color,border-color] duration-[400ms] ease-[cubic-bezier(.2,.6,.2,1)]",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--paper)_96%,transparent)]"
          : "bg-[color-mix(in_srgb,var(--paper)_86%,transparent)]",
        hidden ? "-translate-y-full" : "translate-y-0",
        "backdrop-saturate-150 backdrop-blur-[12px]",
      ].join(" ")}
    >
      <div className="wrap flex items-center justify-between h-[78px]">
        <Brand />
        <nav aria-label="Primary" className="hidden md:flex gap-[34px] items-center">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-ink opacity-75 hover:opacity-100 transition-opacity tracking-[0.01em]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <ButtonLink
          href="#contact"
          variant="dark"
          arrow
          className="shrink-0 whitespace-nowrap py-[11px] text-[13.5px]"
        >
          Book an Intro Call
        </ButtonLink>
      </div>
    </header>
  );
}

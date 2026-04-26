"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brand } from "./Brand";
import { NAV_LINKS } from "@/app/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

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

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color,transform,backdrop-filter] duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          scrolled
            ? "backdrop-blur-[18px] backdrop-saturate-150 bg-[color-mix(in_srgb,var(--paper)_94%,transparent)] border-b border-[var(--rule-2)] py-[8px]"
            : "bg-transparent border-b border-transparent py-[12px]",
          // Hide auto-scroll only when drawer is closed
          !open && hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
      >
        <div className="wrap flex items-center justify-between gap-3">
          <Brand className="flex-shrink-0" />

          <nav
            aria-label="Primary"
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-[clamp(20px,2vw,34px)]"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={[
                  "text-[14px] font-sans font-medium transition-colors tracking-[-0.005em]",
                  scrolled
                    ? "text-ink/85 hover:text-terracotta"
                    : "text-white/90 hover:text-white drop-shadow-sm",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex group items-center gap-[10px] rounded-full bg-ink pl-[18px] pr-[5px] py-[5px] text-[13px] font-sans font-medium text-cream tracking-[0.005em] transition-all duration-[250ms] ease-out hover:bg-terracotta hover:-translate-y-px whitespace-nowrap"
              style={{ color: "var(--cream)" }}
            >
              <span className="py-[4px]">Partner With Us</span>
              <span className="inline-flex items-center justify-center size-[28px] rounded-full bg-[color-mix(in_srgb,var(--cream)_14%,transparent)] transition-transform duration-[250ms] ease-out group-hover:translate-x-[2px]">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 7 H13 M8 2 L13 7 L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-mega-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden relative inline-flex items-center justify-center size-[40px] rounded-full border border-[var(--rule)] bg-[color-mix(in_srgb,var(--cream)_60%,transparent)] text-ink hover:border-ink transition-colors"
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <span className="relative block w-[18px] h-[12px]" aria-hidden>
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-full bg-current"
                  initial={false}
                  animate={
                    open
                      ? { top: 5, rotate: 45 }
                      : { top: 0, rotate: 0 }
                  }
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-full bg-current top-[5px]"
                  initial={false}
                  animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-full bg-current"
                  initial={false}
                  animate={
                    open
                      ? { bottom: 5, rotate: -45 }
                      : { bottom: 0, rotate: 0 }
                  }
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MegaMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MegaMenu({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id="mobile-mega-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="lg:hidden fixed inset-0 z-40"
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-[6px]"
        variants={{
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }}
        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
      />

      {/* Drawer */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[var(--paper)] border-b border-[var(--rule)] origin-top overflow-hidden"
        style={{ paddingTop: "calc(var(--nav-h) + 8px)" }}
        variants={{
          closed: { y: "-8%", opacity: 0 },
          open: { y: 0, opacity: 1 },
        }}
        transition={{
          duration: reduce ? 0 : 0.55,
          ease: EASE,
        }}
      >
        {/* Soft glow */}
        <div
          aria-hidden
          className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(214,106,43,0.18), transparent 60%)",
            filter: "blur(20px)",
          }}
        />

        <motion.nav
          aria-label="Mobile primary"
          className="wrap relative pb-10 pt-2"
          variants={{
            open: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.1 } },
            closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
          }}
        >
          <motion.div
            className="text-[12px] font-sans tracking-[0.16em] uppercase text-stone mb-5 flex items-center gap-2"
            variants={itemVariants(reduce)}
          >
            <span className="size-[6px] rounded-full bg-terracotta" />
            Menu
          </motion.div>

          <ul className="flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <motion.li
                key={l.href}
                className="border-b border-[var(--rule-2)]"
                variants={itemVariants(reduce)}
              >
                <a
                  href={l.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between gap-4 py-[18px] hover:bg-[color-mix(in_srgb,var(--linen)_40%,transparent)] -mx-[clamp(24px,5vw,72px)] px-[clamp(24px,5vw,72px)] transition-colors"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="serif-italic text-[15px] text-terracotta tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-serif text-[clamp(28px,7vw,40px)] leading-none tracking-[-0.02em] text-ink"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                    >
                      {l.label}
                    </span>
                  </span>
                  <span className="size-[32px] rounded-full border border-[var(--rule)] grid place-items-center text-ink/70 group-hover:bg-ink group-hover:text-cream group-hover:border-ink group-hover:-rotate-45 transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path
                        d="M1 7 H13 M8 2 L13 7 L8 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-7 flex flex-col gap-3"
            variants={itemVariants(reduce)}
          >
            <a
              href="#contact"
              onClick={onClose}
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-ink pl-[22px] pr-[6px] py-[6px] text-[14px] font-sans font-medium text-cream tracking-[0.005em] transition-all duration-[250ms] ease-out hover:bg-terracotta"
              style={{ color: "var(--cream)" }}
            >
              <span className="py-[6px]">Partner With Us</span>
              <span className="inline-flex items-center justify-center size-[34px] rounded-full bg-[color-mix(in_srgb,var(--cream)_14%,transparent)] transition-transform duration-[250ms] ease-out group-hover:translate-x-[2px]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 7 H13 M8 2 L13 7 L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <p className="serif-italic text-[14px] text-stone">
              Bangladesh — made easier to enter.
            </p>
          </motion.div>
        </motion.nav>
      </motion.div>
    </motion.div>
  );
}

function itemVariants(reduce: boolean | null) {
  return {
    closed: {
      opacity: 0,
      y: reduce ? 0 : 14,
      transition: { duration: reduce ? 0 : 0.25, ease: EASE },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: EASE },
    },
  };
}

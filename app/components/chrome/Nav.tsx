"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Brand } from "./Brand";
import { NAV_LINKS } from "@/app/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

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
          "fixed top-[0.75rem] sm:top-[1rem] left-1/2 -translate-x-1/2 z-50 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          "w-[calc(100vw-2rem)] lg:w-max max-w-[calc(100vw-2rem)] rounded-full",
          "bg-ink text-cream",
          scrolled
            ? "shadow-[0_10px_36px_-12px_rgba(11,11,12,0.48),0_2px_10px_-4px_rgba(11,11,12,0.34)]"
            : "shadow-[0_10px_26px_-18px_rgba(11,11,12,0.42)]",
          // Hide auto-scroll only when drawer is closed
          !open && hidden ? "-translate-y-[calc(100%+2rem)] opacity-0 scale-[0.98]" : "translate-y-0 opacity-100 scale-100",
        ].join(" ")}
      >
        <div className="flex items-center justify-between lg:justify-start w-full py-[6px] pl-[20px] pr-[6px] lg:pr-[6px] gap-[clamp(16px,4vw,64px)]">
          <Brand className="flex-shrink-0 transition-transform duration-500 hover:scale-95 origin-left" />

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center"
          >
            {NAV_LINKS.map((l, i) => (
              <div key={l.label} className="flex items-center">
                {i > 0 && <span className="w-[1px] h-[14px] bg-[var(--rule-d)] mx-[clamp(16px,2vw,32px)]" />}
                <span
                  className="flex items-center text-[14.5px] font-sans text-cream/78 whitespace-nowrap cursor-default"
                >
                  <span>{l.label}</span>
                </span>
              </div>
            ))}

            <div className="flex items-center">
              <span className="w-[1px] h-[14px] bg-[var(--rule-d)] mx-[clamp(16px,2vw,32px)]" />
              <a
                href="#contact"
                className="inline-flex group relative items-center gap-[10px] rounded-full bg-cream overflow-hidden pl-[16px] pr-[5px] py-[5px] text-[13px] font-sans font-medium text-ink tracking-[0.01em] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]"
              >
                <span className="relative z-10 py-[2px]">Partner With Us</span>
                <span className="relative z-10 flex items-center justify-center size-[28px] rounded-full bg-ink text-cream transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-terracotta group-hover:-rotate-45">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </nav>

          <div className="flex lg:hidden items-center gap-2 flex-shrink-0 ml-auto">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-mega-menu"
              onClick={() => setOpen((v) => !v)}
              className="relative inline-flex items-center justify-center size-[38px] sm:size-[40px] rounded-full border border-[var(--rule-d)] bg-[color-mix(in_srgb,var(--cream)_10%,transparent)] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <span className="relative block w-[16px] h-[10px]" aria-hidden>
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-full bg-current"
                  initial={false}
                  animate={open ? { top: 4, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-full bg-current top-[4px]"
                  initial={false}
                  animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 right-0 h-[1.5px] rounded-full bg-current"
                  initial={false}
                  animate={open ? { bottom: 4.5, rotate: -45 } : { bottom: 0, rotate: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
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
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
      />

      {/* Drawer */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[var(--paper)] border-b border-[var(--rule)] origin-top overflow-hidden shadow-2xl"
        style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}
        variants={{
          closed: { y: "-10%", opacity: 0, scaleY: 0.96 },
          open: { y: 0, opacity: 1, scaleY: 1 },
        }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      >
        {/* Soft glow */}
        <div
          aria-hidden
          className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(214,106,43,0.15), transparent 60%)",
            filter: "blur(24px)",
          }}
        />

        <motion.nav
          aria-label="Mobile primary"
          className="wrap relative pb-12 pt-4"
          variants={{
            open: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.15 } },
            closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
          }}
        >
          <motion.div
            className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-stone mb-8 flex items-center gap-3"
            variants={itemVariants(reduce)}
          >
            <span className="w-8 h-[1px] bg-terracotta/40" />
            Menu
          </motion.div>

          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <motion.li key={l.label} variants={itemVariants(reduce)}>
                <div
                  className="flex items-center justify-between py-[16px] border-b border-[var(--rule-2)] whitespace-nowrap overflow-hidden cursor-default"
                >
                  <span className="flex items-baseline overflow-hidden">
                    <span
                      className="font-serif text-[clamp(32px,8vw,48px)] leading-none tracking-[-0.02em] text-ink truncate"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                    >
                      {l.label}
                    </span>
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div className="mt-10 pt-8 border-t border-[var(--rule-2)]" variants={itemVariants(reduce)}>
            <a
              href="#contact"
              onClick={onClose}
              className="group inline-flex items-center justify-between w-full rounded-full bg-ink p-[8px] pl-[24px] text-[15px] font-sans font-medium text-cream tracking-[0.01em] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-terracotta"
            >
              <span>Partner With Us</span>
              <span className="flex items-center justify-center size-[40px] rounded-full bg-[color-mix(in_srgb,var(--cream)_15%,transparent)] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.nav>
      </motion.div>
    </motion.div>
  );
}

function itemVariants(reduce: boolean | null) {
  return {
    closed: { opacity: 0, y: reduce ? 0 : 16, transition: { duration: reduce ? 0 : 0.3, ease: EASE } },
    open: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease: EASE } },
  };
}

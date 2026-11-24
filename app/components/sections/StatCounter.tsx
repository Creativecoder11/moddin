"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type StatCounterProps = {
  target: number;
  /** Decimal places shown while counting and at rest (e.g. 1 for "2.2"). */
  decimals?: number;
  prefix?: string;
  suffix: string;
};

const DURATION = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
// Server + hydration snapshot: "reduced" => final value, so the HTML never ships 0.
const getServerReducedMotion = () => true;

/**
 * Count-up from 0 to `target` once the element is half in view.
 * The server-rendered HTML, the no-JS view and reduced-motion users all get the
 * final value; only a hydrated client that allows motion animates (and only after
 * the element enters view). Attach `ref` to the element that holds the number.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  decimals = 0,
  startDelay = 0,
) {
  const ref = useRef<T>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  // null = count not started: keep showing the final value.
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;
    let timeoutId = 0;
    let rafId = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        setValue(0);
        timeoutId = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / DURATION, 1);
            setValue(target * easeOutCubic(p));
            if (p < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
        }, startDelay);
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [reduced, target, startDelay]);

  const shown = reduced || value === null ? target : value;
  return { ref, text: shown.toFixed(decimals) };
}

export function StatCounter({
  target,
  decimals = 0,
  prefix = "",
  suffix,
}: StatCounterProps) {
  const { ref, text } = useCountUp<HTMLDivElement>(target, decimals);

  return (
    <div ref={ref} className="n">
      {`${prefix}${text}`}
      <span className="unit">{suffix}</span>
    </div>
  );
}

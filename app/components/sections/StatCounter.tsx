"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  target: number;
  prefix?: string;
  suffix: string;
};

const DURATION = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Number that animates from 0 to `target` once it scrolls into view.
 * Mirrors the original vanilla-JS counter, but as a self-contained React component.
 */
export function StatCounter({ target, prefix = "", suffix }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || playedRef.current) continue;
          playedRef.current = true;
          io.unobserve(e.target);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / DURATION, 1);
            setValue(Math.round(target * easeOutCubic(p)));
            if (p < 1) requestAnimationFrame(tick);
            else setValue(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="n">
      {prefix}
      {value}
      <span className="unit">{suffix}</span>
    </div>
  );
}

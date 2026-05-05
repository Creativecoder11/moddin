"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ScrollReveal } from "../ui/ScrollReveal";

export function PhotoBand() {
  const reduce = useReducedMotion();
  const speedAttr = (v: string) => (reduce ? undefined : v);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < 0.55) continue;
          (entry.target as HTMLElement).classList.add("in");
          io.unobserve(entry.target);
        }
      },
      { threshold: [0, 0.25, 0.55, 0.8, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="band" aria-label="Field work">
      <div className="band-inner wrap">
        <div
          className="band-text"
          data-scroll
          data-scroll-speed={speedAttr("0.35")}
        >
          <div className="eyebrow">
            <span>On the ground in Bangladesh</span>
          </div>
          <ScrollReveal as="h3">
            We spend most of
            <br />
            our week in
            <br />
            <em>ports, boardrooms,</em>
            <br />
            and <em>ministries</em> —
            <br />
            not on slide decks.
          </ScrollReveal>
        </div>
        <div ref={mapRef} className="band-map" aria-hidden>
          <div className="band-map__wipe">
            <Image
              src="/world-map.png"
              alt=""
              width={891}
              height={512}
              sizes="(min-width: 900px) 44vw, 80vw"
              className="band-map__img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

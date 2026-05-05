"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import bandImage from "../../../public/bangladesh-on-the-ground-logistics.jpeg";
import { ScrollReveal } from "../ui/ScrollReveal";

export function PhotoBand() {
  const reduce = useReducedMotion();
  const speedAttr = (v: string) => (reduce ? undefined : v);

  return (
    <section className="band" aria-label="Field work">
      <div
        className="band-plane"
        data-scroll
        data-scroll-speed={speedAttr("0.12")}
        aria-hidden
      />
      <div
        className="band-media"
        data-scroll
        data-scroll-speed={speedAttr("-0.3")}
      >
        <Image
          className="band-img"
          src={bandImage}
          alt="On-the-ground logistics and trade activity in Bangladesh"
          fill
          loading="lazy"
          placeholder="blur"
          sizes="100vw"
        />
      </div>
      <div
        className="band-inner wrap"
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
    </section>
  );
}

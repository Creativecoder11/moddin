"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import bandImage from "../../../public/bangladesh-on-the-ground-logistics.jpeg";

export function PhotoBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const easedProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.25,
  });

  const backdropY = useTransform(easedProgress, [0, 1], ["-18px", "18px"]);
  const imageY = useTransform(easedProgress, [0, 1], ["-7%", "7%"]);
  const textY = useTransform(easedProgress, [0, 1], ["42px", "-54px"]);

  return (
    <section ref={sectionRef} className="band" aria-label="Field work">
      <motion.div
        className="band-plane"
        style={{ y: shouldReduceMotion ? 0 : backdropY }}
        aria-hidden
      />
      <motion.div
        className="band-media"
        style={{ y: shouldReduceMotion ? 0 : imageY }}
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
      </motion.div>
      <motion.div
        className="band-inner wrap"
        style={{ y: shouldReduceMotion ? 0 : textY }}
      >
        <div className="eyebrow">
          <span className="tick" />
          <span>On the ground in Bangladesh</span>
        </div>
        <h3>
          We spend most of
          <br />
          our week in
          <br />
          <em>ports, boardrooms,</em>
          <br />
          and <em>ministries</em> —
          <br />
          not on slide decks.
        </h3>
      </motion.div>
    </section>
  );
}

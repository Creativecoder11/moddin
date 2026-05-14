"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal } from "../ui/Reveal";
import type {
  ServicePageHeroMeta,
  ServiceWireframeVariant,
} from "@/app/data/service-pages";

type Props = {
  title: string;
  hero: ServicePageHeroMeta;
  wireframeVariant: ServiceWireframeVariant;
  image: { src: string; alt: string };
};

const VARIANT_LABEL: Record<ServiceWireframeVariant, string> = {
  brief: "Country Brief",
  corridor: "Corridor View",
  pipeline: "Deal Pipeline",
  narrative: "Narrative System",
  network: "Stakeholder Map",
};

export function ServiceHero({ title, hero, wireframeVariant, image }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  const subLabel = VARIANT_LABEL[wireframeVariant];

  return (
    <section
      ref={ref}
      className="svc-hero-v2"
      style={{ ["--svc-bg" as string]: hero.bg, ["--svc-accent" as string]: hero.accent }}
      aria-label={title}
    >
      {/* BG IMAGE w/ parallax */}
      <motion.div
        aria-hidden
        className="svc-hero-v2__img"
        style={{
          y: reduce ? "0%" : imageY,
          scale: reduce ? 1 : imageScale,
        }}
      >
        <Image
          src={image.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Image visible → solid color; hard cut to paper at section edge */}
      <div aria-hidden className="svc-hero-v2__wash" />

      {/* BODY */}
      <div className="wrap svc-hero-v2__wrap">
        <div className="svc-hero-v2__body">
          <Reveal className="svc-hero-v2__eyebrow">
            <span className="svc-hero-v2__line" style={{ background: hero.accent }} aria-hidden />
            <span>{subLabel}</span>
          </Reveal>

          <Reveal as="h1" delay={2} className="svc-hero-v2__title">
            {title}
          </Reveal>

          <Reveal delay={3} className="svc-hero-v2__sub">
            <p>{hero.subhead}</p>
          </Reveal>

          <Reveal delay={4} className="svc-hero-v2__ctas">
            <a href="/contact" className="svc-hero-v2__btn-primary">
              <span>Start with Moddin</span>
              <span
                className="svc-hero-v2__btn-pill"
                style={{ background: hero.accent }}
                aria-hidden
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a href="#service-context" className="svc-hero-v2__btn-ghost">
              <span className="underline-soft">See how it works</span>
              <span className="svc-hero-v2__arrow" aria-hidden>↓</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

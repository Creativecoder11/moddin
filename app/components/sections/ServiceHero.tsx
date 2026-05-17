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
  tagline?: string;
  hero: ServicePageHeroMeta;
  wireframeVariant: ServiceWireframeVariant;
  image: { src: string; alt: string };
};

export function ServiceHero({ title, tagline, hero, image }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);

  const heading = tagline ?? title;

  return (
    <section
      ref={ref}
      className="sub-hero"
      style={{ ["--svc-accent" as string]: hero.accent }}
      aria-label={title}
    >
      <div className="sub-hero__media">
        <motion.div
          aria-hidden
          className="sub-hero__img"
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
        <div aria-hidden className="sub-hero__veil" />
        <div aria-hidden className="sub-hero__topo" />
      </div>

      <div className="sub-hero__slab">
        <div className="sub-hero__tab">
          <span className="sub-hero__tab-mark" aria-hidden />
          <span>{hero.category}</span>
        </div>

        <div className="wrap sub-hero__grid">
          <Reveal className="sub-hero__headline">
            <h1 className="sub-hero__title">{heading}</h1>
          </Reveal>

          <Reveal as="aside" delay={2} className="sub-hero__aside">
            <p className="sub-hero__lede">{hero.subhead}</p>
            <a href="/contact" className="sub-hero__cta btn btn-dark">
              <span>Contact Us</span>
              <span className="sub-hero__cta-arrow" aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

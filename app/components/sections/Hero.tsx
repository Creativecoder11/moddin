"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";
import { ButtonLink } from "../ui/Button";
import heroImage from "../../../public/hero-bangladesh-network.webp";

const COUNTER_TARGET = 460;
const COUNTER_DURATION = 1600;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function Hero() {
  const metricRef = useRef<HTMLDivElement>(null);
  const [metricCount, setMetricCount] = useState(0);
  const countPlayedRef = useRef(false);

  useEffect(() => {
    const el = metricRef.current;
    if (!el) return;
    let timeoutId = 0;
    let rafId = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || countPlayedRef.current) continue;
          countPlayedRef.current = true;
          io.unobserve(e.target);
          timeoutId = window.setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / COUNTER_DURATION, 1);
              setMetricCount(Math.round(COUNTER_TARGET * easeOutCubic(p)));
              if (p < 1) rafId = requestAnimationFrame(tick);
              else setMetricCount(COUNTER_TARGET);
            };
            rafId = requestAnimationFrame(tick);
          }, 1220);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="hero-section relative w-full overflow-hidden bg-paper -mt-[112px] max-[560px]:-mt-[96px]"
      aria-label="Bangladesh, Unlocked"
    >
      {/* Single full-bleed image. CSS handles mobile bg vs desktop right-column. */}
      <div
        data-scroll
        data-scroll-speed="-0.35"
        className="hero-image absolute -inset-y-[8%] inset-x-0 lg:right-0 lg:left-[52.38%]"
        aria-hidden
      >
        <Image
          src={heroImage}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
          style={{ filter: "saturate(1.05) contrast(1.05)" }}
        />
        {/* Mobile-only dark scrim for legibility (hidden on desktop) */}
        <div
          className="absolute inset-0 lg:hidden pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.42) 40%, rgba(11,11,12,0.78) 100%)",
          }}
        />
        {/* Desktop subtle vignette */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,12,0.10) 0%, rgba(11,11,12,0) 30%, rgba(11,11,12,0) 70%, rgba(11,11,12,0.45) 100%)",
          }}
        />
        {/* Warm tint on both */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(180,74,30,0.14), transparent 60%)",
          }}
        />
        {/* Hairline seam at column edge on desktop */}
        <div className="absolute inset-y-0 left-0 w-px bg-[var(--rule-2)] hidden lg:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] min-h-[100svh] lg:min-h-screen relative">
        {/* LEFT — typography */}
        <div
          data-scroll
          data-scroll-speed="0.5"
          className="hero-copy relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:pl-[clamp(40px,6vw,96px)] lg:pr-[clamp(24px,3vw,56px)] pt-[clamp(140px,22vw,200px)] lg:pt-[clamp(160px,16vw,220px)] pb-[clamp(64px,12vw,140px)] lg:pb-[clamp(96px,12vw,160px)]"
        >
          <Reveal
            delay={1}
            className="inline-flex self-start items-center gap-3 mb-[clamp(24px,4vw,40px)] px-4 py-[8px] rounded-full border border-[var(--rule-2)] bg-cream/95 backdrop-blur-sm lg:bg-cream lg:backdrop-blur-0"
          >
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-terracotta" />
            </span>
            <span className="text-[12px] font-sans tracking-[0.16em] uppercase text-stone font-bold">
              Moddin
            </span>
          </Reveal>

          <Reveal
            as="h1"
            delay={2}
            className="text-[clamp(48px,8vw,128px)] leading-[0.95] tracking-[-0.03em] font-serif text-cream lg:text-ink mb-[clamp(20px,3vw,32px)]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 0' }}
          >
            Bangladesh,
            <br />
            <em
              className="italic text-ember lg:text-terracotta relative inline-block mt-1"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
              }}
            >
              Unlocked.
              <svg
                className="absolute -bottom-3 left-0 w-[90%] h-auto text-ember lg:text-terracotta opacity-40 lg:opacity-30"
                viewBox="0 0 160 10"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0,8 Q80,-4 160,8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </em>
          </Reveal>

          <Reveal delay={3} className="max-w-[520px] mb-[clamp(28px,5vw,48px)]">
            <TextEffect
              as="p"
              className="text-[clamp(18px,2vw,26px)] leading-[1.3] font-sans font-semibold text-cream lg:text-ink mb-[clamp(12px,2vw,20px)] tracking-[-0.01em]"
              per="word"
              preset="blur"
              scrollReveal
            >
              {"Your gateway to Bangladesh’s market."}
            </TextEffect>
            <TextEffect
              as="p"
              className="text-[clamp(15px,1.1vw,17px)] leading-[1.65] text-cream/75 lg:text-ink/65 font-serif max-w-[440px]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
              per="word"
              preset="blur"
              scrollReveal
              delay={0.15}
            >
              {"Moddin connects global businesses with Bangladesh—enabling trade, investment, and real market entry."}
            </TextEffect>
          </Reveal>

          <Reveal
            delay={4}
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <ButtonLink
              href="#contact"
              variant="dark"
              arrow
              className="px-7 py-[14px] text-[15px] font-medium"
            >
              Partner With Us
            </ButtonLink>
            <a
              href="#why"
              className="group text-[15px] font-sans font-medium text-cream/80 lg:text-ink/70 hover:text-cream lg:hover:text-ink transition-colors flex items-center gap-3"
            >
              <span className="flex items-center justify-center size-10 rounded-full border border-cream/30 lg:border-[var(--rule)] group-hover:border-cream lg:group-hover:border-ink lg:group-hover:bg-cream transition-all duration-300">
                <span className="group-hover:translate-y-[2px] transition-transform text-[12px]">
                  ↓
                </span>
              </span>
              Explore the thesis
            </a>
          </Reveal>
        </div>

        {/* Empty right-side spacer — image already absolutely positioned */}
        <div className="hidden lg:block" aria-hidden />

        {/* Floating Market Cap card — desktop only */}
        <div
          ref={metricRef}
          data-scroll
          data-scroll-speed="0.8"
          className="absolute z-30 right-[100px] bottom-[100px] w-[320px] hidden lg:block"
        >
          <Reveal delay={4}>
            <div className="p-7 rounded-[24px] bg-cream border border-[var(--rule-2)] ring-1 ring-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-transform duration-500">
              <div className="text-[13px] font-sans font-semibold tracking-[0.01em] text-stone mb-3 uppercase">
                Opportunity Size
              </div>
              <div className="text-[64px] font-serif text-ink tracking-[-0.04em] leading-none">
                ${metricCount}
                <span
                  className="text-[44px] text-terracotta italic ml-[2px]"
                  style={{
                    fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                  }}
                >
                  B
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-[var(--rule-2)] flex items-center gap-3">
                <span className="size-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[13px] font-sans font-medium text-stone tracking-[0.01em]">
                  Fastest growing
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

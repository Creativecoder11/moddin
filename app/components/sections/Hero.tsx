"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";

const HERO_IMG = "/hero-bangladesh-network.webp";

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrolled = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrolled * 0.06}px) scale(${1.05 + scrolled * 0.0002})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full bg-paper overflow-hidden -mt-[112px] max-[560px]:-mt-[96px]">
      {/* SVG defs: clip-path for the image pod + patterns */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id="hero-image-pod" clipPathUnits="objectBoundingBox">
            {/* Image shows in a pod with big dark zone at top-right (for the map)
                and a smaller dark zone at bottom-right (for dots). */}
            <path d="
              M 0.00 0.12
              C 0.12 0.08  0.25 0.06  0.38 0.10
              C 0.55 0.16  0.70 0.30  0.85 0.48
              C 0.92 0.56  0.97 0.60  1.00 0.60
              L 1.00 0.80
              C 0.92 0.80  0.82 0.86  0.72 0.90
              C 0.58 0.94  0.38 0.96  0.20 0.98
              C 0.10 0.99  0.00 1.00  0.00 1.00
              Z
            " />
          </clipPath>
          <radialGradient id="hero-bd-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--terracotta)" stopOpacity="0.7" />
            <stop offset="55%" stopColor="var(--terracotta)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--terracotta)" stopOpacity="0" />
          </radialGradient>
          <pattern id="hero-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(250,245,233,0.22)" />
          </pattern>
        </defs>
      </svg>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-[92vh] lg:min-h-screen relative">
        {/* LEFT COLUMN — cream, typography */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:pl-[clamp(40px,6vw,96px)] lg:pr-12 pt-[140px] lg:pt-[180px] pb-16 lg:pb-32">
          <Reveal
            delay={1}
            className="inline-flex self-start items-center gap-3 mb-10 px-4 py-[8px] rounded-full border border-[var(--rule-2)] bg-cream"
          >
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-terracotta" />
            </span>
            <span className="text-[12px] font-sans tracking-[0.16em] uppercase text-stone font-bold">
              Strategic Market Entry
            </span>
          </Reveal>

          <Reveal
            as="h1"
            delay={2}
            className="text-[clamp(56px,7.2vw,128px)] leading-[0.95] tracking-[-0.03em] font-serif text-ink mb-8"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 0' }}
          >
            Bangladesh,
            <br />
            <em
              className="italic text-terracotta relative inline-block mt-1"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
            >
              Decoded.
              <svg
                className="absolute -bottom-3 left-0 w-[90%] h-auto text-terracotta opacity-30"
                viewBox="0 0 160 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M0,8 Q80,-4 160,8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </em>
          </Reveal>

          <Reveal delay={3} className="max-w-[520px] mb-12">
            <p className="text-[clamp(20px,1.9vw,26px)] leading-[1.3] font-sans font-semibold text-ink mb-6 tracking-[-0.01em]">
              Complex markets demand clear pathways.
            </p>
            <p
              className="text-[clamp(15px,1.1vw,17px)] leading-[1.65] text-ink/65 font-serif max-w-[440px]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
            >
              Moddin accelerates market access for global capital. We connect foreign investors to high-growth opportunities, transforming friction into leverage.
            </p>
          </Reveal>

          <Reveal delay={4} className="flex flex-wrap items-center gap-6">
            <ButtonLink href="#contact" variant="dark" arrow className="px-8 py-4 text-[15px] font-medium">
              Partner With Us
            </ButtonLink>
            <a
              href="#why"
              className="group text-[15px] font-sans font-medium text-ink/70 hover:text-ink transition-colors flex items-center gap-3"
            >
              <span className="flex items-center justify-center size-10 rounded-full border border-[var(--rule)] bg-transparent group-hover:border-ink group-hover:bg-cream transition-all duration-300">
                <span className="group-hover:translate-y-[2px] transition-transform text-[12px]">↓</span>
              </span>
              Explore the thesis
            </a>
          </Reveal>
        </div>

        {/* RIGHT COLUMN — visual composition */}
        <div className="relative bg-ink min-h-[520px] lg:min-h-full order-first lg:order-none">
          {/* Layer 1: Map + connection arcs occupying the top-right dark zone */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 800 900"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            {/* Stylized landmass — South / SE Asia — positioned in top-right dark area */}
            <g opacity="0.55">
              <path
                d="M280,80 C360,70 440,90 520,110 C580,124 640,122 700,115 C740,110 780,120 820,135 L820,260 C780,272 740,266 700,274 C650,282 600,268 550,245 C500,225 460,220 420,228 C370,238 320,240 280,230 C260,225 240,210 250,180 C240,140 260,100 280,80 Z"
                fill="rgba(217,198,166,0.28)"
                stroke="rgba(217,198,166,0.35)"
                strokeWidth="0.7"
              />
              <path
                d="M200,260 C280,250 360,270 440,280 C500,288 560,292 620,285 C680,278 740,290 800,305 L800,410 C740,418 680,404 620,405 C560,408 500,420 440,415 C360,408 280,395 220,380 C200,375 180,360 190,330 C180,300 190,280 200,260 Z"
                fill="rgba(217,198,166,0.2)"
                stroke="rgba(217,198,166,0.28)"
                strokeWidth="0.6"
              />
            </g>

            {/* Soft glow behind Bangladesh */}
            <circle cx="680" cy="175" r="120" fill="url(#hero-bd-glow)" />

            {/* Bangladesh highlight shape (upper-right) */}
            <path
              d="M662,148 C678,138 694,142 704,152 C712,162 720,176 716,188 C720,198 712,210 700,214 C688,220 672,216 662,208 C652,198 648,182 652,170 C648,160 654,152 662,148 Z"
              fill="var(--terracotta)"
            />
            <path
              d="M662,148 C678,138 694,142 704,152 C712,162 720,176 716,188 C720,198 712,210 700,214 C688,220 672,216 662,208 C652,198 648,182 652,170 C648,160 654,152 662,148 Z"
              fill="none"
              stroke="var(--ember)"
              strokeWidth="1"
              opacity="0.8"
            />

            {/* Connection arcs from Bangladesh to various endpoints */}
            <g stroke="var(--ember)" strokeWidth="1" fill="none" opacity="0.75">
              <path d="M680,180 C560,140 420,110 280,130" />
              <path d="M680,180 C520,200 360,230 220,260" strokeDasharray="3 3" />
              <path d="M680,180 C560,260 420,320 280,360" />
              <path d="M680,180 C580,120 480,80 360,60" strokeDasharray="3 3" />
              <path d="M680,180 C700,140 740,100 780,80" />
              <path d="M680,180 C720,240 770,290 790,340" strokeDasharray="3 3" />
              <path d="M680,180 C620,150 560,140 500,140" />
            </g>

            {/* Endpoint nodes */}
            <g fill="var(--ember)">
              <circle cx="280" cy="130" r="3" />
              <circle cx="220" cy="260" r="3" />
              <circle cx="280" cy="360" r="3" />
              <circle cx="360" cy="60" r="3" />
              <circle cx="780" cy="80" r="3" />
              <circle cx="790" cy="340" r="3" />
              <circle cx="500" cy="140" r="3" />
            </g>
            <g fill="var(--ember)" opacity="0.35">
              <circle cx="280" cy="130" r="6" />
              <circle cx="360" cy="60" r="6" />
              <circle cx="780" cy="80" r="6" />
              <circle cx="500" cy="140" r="6" />
            </g>
          </svg>

          {/* Layer 2: Dotted pattern in the bottom-right dark zone */}
          <svg
            className="absolute bottom-0 right-0 w-[50%] h-[25%]"
            preserveAspectRatio="none"
            aria-hidden
          >
            <rect width="100%" height="100%" fill="url(#hero-dots)" />
          </svg>

          {/* Layer 3: Image pod — clipped to reveal a curved middle band */}
          <div
            className="absolute inset-0"
            style={{ clipPath: "url(#hero-image-pod)", WebkitClipPath: "url(#hero-image-pod)" }}
          >
            <Image
              ref={imgRef}
              src={HERO_IMG}
              alt="Dhaka skyline at dusk - capital of Bangladesh"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="absolute inset-0 w-full h-full object-cover origin-center"
              style={{
                transform: "scale(1.05)",
                filter: "sepia(0.75) saturate(1.2) brightness(0.92) contrast(1.08) hue-rotate(-10deg)",
              }}
            />
            <div className="absolute inset-0 bg-[#b04a1c]/25 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[#e09a5c]/15 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e05]/40 via-transparent to-[#0b0604]/35 mix-blend-multiply" />
          </div>
        </div>

        {/* Floating Market Cap card — straddles the column seam */}
        <Reveal
          delay={4}
          className="absolute z-30 left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[300px] hidden lg:block"
        >
          <div className="p-8 rounded-[24px] bg-cream border border-[var(--rule-2)] ring-1 ring-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] group hover:-translate-y-1 transition-transform duration-500">
            <div className="text-[14px] font-sans font-semibold tracking-[0.01em] text-stone mb-3">
              Market Cap
            </div>
            <div className="text-[64px] font-serif text-ink tracking-[-0.04em] leading-none">
              $460
              <span
                className="text-[44px] text-terracotta italic ml-[2px]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}
              >
                B
              </span>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--rule-2)] flex items-center gap-3">
              <span className="size-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-[13px] font-sans font-medium text-stone tracking-[0.01em]">
                Fastest growing
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

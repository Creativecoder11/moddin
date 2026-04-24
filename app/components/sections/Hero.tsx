"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "../ui/Reveal";
import { TICKER_ITEMS } from "@/app/data/site";
import { ButtonLink } from "../ui/Button";

const HERO_IMG = "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80";

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrolled = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrolled * 0.08}px) scale(${1.02 + scrolled * 0.0002})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full bg-paper pt-[100px] md:pt-[130px] min-h-[90vh] lg:min-h-screen flex flex-col">
      {/* Inline SVG definitions for clip paths */}
      <svg width="0" height="0" className="absolute hidden">
        <defs>
          <clipPath id="hero-curve-mask" clipPathUnits="objectBoundingBox">
            {/* A smooth S-curve covering the right side. 
                Starts top left, dips down, swoops right and down. */}
            <path d="M0,1 
                     C0.2,0.8 0.1,0.5 0.4,0.3 
                     C0.6,0.1 0.8,0.1 1,0 
                     L1,1 Z" />
          </clipPath>
          <clipPath id="hero-black-bg" clipPathUnits="objectBoundingBox">
             {/* The solid black background shape extending further left */}
             <path d="M0,0 
                      C0.1,0.2 0.05,0.4 0.2,0.6 
                      C0.4,0.9 0.7,0.95 1,1 
                      L1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* The solid black overarching shape for the right side */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] bg-ink z-0 pointer-events-none hidden lg:block"
        style={{ clipPath: 'url(#hero-black-bg)' }}
      />

      <div className="wrap relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8 relative pb-20 lg:pb-32 h-full">
          
          {/* Left Column: Typography */}
          <div className="flex-1 w-full max-w-[640px] z-20 relative mix-blend-normal pt-10 lg:pt-[10vh]">
            <Reveal delay={1} className="inline-flex items-center gap-3 mb-8 px-4 py-[8px] rounded-full border border-[var(--rule-2)] bg-cream backdrop-blur-sm">
               <span className="relative flex size-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75"></span>
                 <span className="relative inline-flex rounded-full size-2 bg-terracotta"></span>
               </span>
               <span className="text-[12px] font-sans tracking-[0.1em] uppercase text-stone font-bold">Strategic Market Entry</span>
            </Reveal>

            <Reveal as="h1" delay={2} className="text-[clamp(56px,8vw,140px)] leading-[0.95] tracking-[-0.03em] font-serif text-ink mb-6" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40, "WONK" 0' }}>
              Bangladesh, <br />
              <em className="italic text-terracotta relative inline-block mt-2" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1' }}>
                Decoded.
                <svg className="absolute -bottom-4 left-0 w-[110%] h-auto text-terracotta opacity-[0.2]" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M0,10 Q100,-5 200,10" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </em>
            </Reveal>
            
            <Reveal delay={3} className="max-w-[500px] mb-12">
              <p className="text-[clamp(20px,2.5vw,28px)] leading-[1.4] font-sans tracking-tight font-medium text-ink opacity-80 mb-5">
                Complex markets demand clear pathways.
              </p>
              <p className="text-[clamp(16px,1.5vw,18px)] leading-[1.6] text-ink opacity-70 font-serif" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}>
                Moddin accelerates market access for global capital. We connect foreign investors to high-growth opportunities, transforming friction into leverage.
              </p>
            </Reveal>

            <Reveal delay={4} className="flex flex-wrap items-center gap-6">
               <ButtonLink href="#contact" variant="dark" arrow className="px-8 py-4 text-[15px]">
                 Partner With Us
               </ButtonLink>
               <a href="#why" className="group text-[15px] font-sans font-medium tracking-wide text-ink/70 hover:text-ink transition-colors flex items-center gap-3">
                 <div className="flex items-center justify-center size-10 rounded-full border border-[var(--rule)] bg-transparent group-hover:border-ink group-hover:bg-cream transition-all duration-300">
                    <span className="group-hover:translate-y-[2px] transition-transform text-[12px]">↓</span>
                 </div>
                 Explore the thesis
               </a>
            </Reveal>
          </div>

          {/* Right Column: Imagery & Floating Card */}
          <div className="w-full lg:w-[50vw] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 relative z-10 flex items-end lg:items-center justify-end lg:justify-start h-[500px] lg:h-auto mt-8 lg:mt-0">
             
             {/* The Image Container masked by the S-curve */}
             <div 
               className="absolute inset-0 right-0 lg:w-full h-full lg:h-[110%] lg:-top-[5%] overflow-hidden pointer-events-none rounded-2xl lg:rounded-none"
               style={{ clipPath: 'url(#hero-curve-mask)' }}
             >
                <img 
                  ref={imgRef}
                  src={HERO_IMG} 
                  alt="Bangladesh Market Horizon" 
                  className="absolute inset-0 w-full h-full object-cover origin-center opacity-80"
                />
                
                {/* Color cast overlay for the image */}
                <div className="absolute inset-0 bg-amber-900/20 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30 mix-blend-multiply" />

                {/* Map Connections Overlay Layer */}
                <div className="absolute inset-0 z-20 overflow-hidden hidden lg:block opacity-60">
                   <svg width="100%" height="100%" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" fill="none">
                      {/* Connection Arcs */}
                      <path d="M400,300 Q200,100 100,400" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                      <path d="M400,300 Q500,50 700,250" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                      <path d="M400,300 Q600,400 750,600" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
                      
                      {/* Highlighted Country/Region (Bangladesh approx) */}
                      <circle cx="400" cy="300" r="8" fill="var(--terracotta)" />
                      <circle cx="400" cy="300" r="16" fill="var(--terracotta)" opacity="0.3" className="animate-ping" />
                      
                      {/* Destination Nodes */}
                      <circle cx="100" cy="400" r="4" fill="white" />
                      <circle cx="700" cy="250" r="4" fill="white" />
                      <circle cx="750" cy="600" r="4" fill="white" />
                   </svg>
                </div>
             </div>
             
             {/* Data Card Float */}
             <div className="absolute left-1/2 lg:left-[5%] bottom-0 lg:bottom-[20%] -translate-x-1/2 lg:translate-x-0 p-8 rounded-[24px] bg-cream border border-[var(--rule-2)] w-[280px] pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-30 group hover:-translate-y-2 transition-transform duration-500">
                <div className="text-[13px] font-sans font-bold tracking-wide text-stone mb-2">Market Cap</div>
                <div className="text-[56px] font-serif text-ink tracking-[-0.04em] leading-none mb-1">$460<span className="text-[40px] text-terracotta italic ml-[2px]">B</span></div>
                <div className="mt-6 pt-4 border-t border-[var(--rule-2)] flex items-center gap-3">
                  <div className="size-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-[12px] font-sans font-medium text-stone tracking-[0.02em]">Fastest growing</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "../ui/Reveal";
import { TICKER_ITEMS } from "@/app/data/site";
import { ButtonLink } from "../ui/Button";

const HERO_IMG = "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80";

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Elegant Parallax & scale on scroll
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrolled = window.scrollY;
      imgRef.current.style.transform = `translateY(${scrolled * 0.12}px) scale(${1.05 + scrolled * 0.0003})`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-visible bg-paper pt-[100px] md:pt-[130px] pb-0">
      {/* Decorative Grid Lines Background for Editorial Polish */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
      />
      
      <div className="wrap relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 relative min-h-[70vh] pb-10 lg:pb-16">
          
          {/* Left Column: Typography */}
          <div className="flex-1 w-full max-w-[640px] z-20 relative mix-blend-normal">
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
                <svg className="absolute -bottom-4 left-0 w-[110%] h-auto text-terracotta opacity-[0.15] hidden md:block" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none"><path d="M0,10 Q100,-5 200,10" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
              </em>
            </Reveal>
            
            <Reveal delay={3} className="max-w-[500px] mb-10">
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

          {/* Right Column: Imagery */}
          <Reveal delay={5} className="w-full lg:w-[45%] h-[40vh] lg:h-[65vh] relative z-10 pointer-events-none mt-8 lg:mt-0 flex items-center justify-end">
             <div className="w-full h-full relative overflow-hidden rounded-[24px] lg:rounded-l-[40px] bg-bone border border-[var(--rule-2)] pointer-events-auto">
                <img 
                  ref={imgRef}
                  src={HERO_IMG} 
                  alt="Bangladesh Market Horizon" 
                  className="absolute inset-0 w-[110%] h-[110%] -top-[5%] -left-[5%] object-cover origin-center"
                />
                {/* Refined gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-terracotta/5 mix-blend-color" />
             </div>
             
             {/* Data Card Float */}
             <div className="absolute -left-6 lg:-left-12 bottom-12 lg:bottom-1/4 p-6 rounded-[20px] bg-cream/95 backdrop-blur-xl border border-[var(--rule-2)] w-[220px] pointer-events-auto group hover:-translate-y-2 transition-transform duration-500">
                <div className="text-[12px] font-sans font-bold tracking-widest uppercase text-stone mb-3">Market Cap</div>
                <div className="text-5xl font-serif text-ink tracking-[-0.04em]">$460<span className="text-3xl text-terracotta italic ml-[2px]">B</span></div>
                <div className="mt-4 pt-4 border-t border-[var(--rule-2)] flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] font-sans font-bold text-stone uppercase tracking-[0.15em]">Fastest Growing</span>
                </div>
             </div>
          </Reveal>

        </div>
      </div>

      {/* High-Impact Editorial Ticker */}
      <Reveal delay={5} className="w-full relative z-30 flex py-6 md:py-10 overflow-hidden border-y border-[var(--ink)] shadow-[0_12px_40px_rgba(11,11,12,0.15)]">
        {/* Animated Complementary Gradient Background */}
        <div 
          className="absolute inset-0 z-0 opacity-95"
          style={{
            background: 'linear-gradient(90deg, var(--forest) 0%, var(--ink) 35%, var(--terracotta) 65%, var(--forest) 100%)',
            backgroundSize: '200% 100%',
            animation: 'gradient-flow 15s linear infinite'
          }}
        />
        
        <div className="flex gap-12 md:gap-24 min-w-full w-max animate-[scroll-left_35s_linear_infinite] items-center px-12 md:px-24 relative z-10">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-12 md:gap-24 shrink-0 group">
              <span 
                className={`font-sans text-[clamp(28px,4vw,64px)] uppercase tracking-[0.08em] font-black whitespace-nowrap transition-transform duration-500 ease-out group-hover:scale-105 ${
                  i % 2 === 0 
                    ? 'text-cream drop-shadow-lg' 
                    : 'text-transparent [-webkit-text-stroke:1.5px_var(--cream)] opacity-90'
                }`}
              >
                {item}
              </span>
              {/* Minimalist Tech Separator */}
              <div className="flex items-center justify-center text-brass opacity-80 group-hover:rotate-180 transition-transform duration-700 ease-out">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                    <path d="M12 2v20M2 12h20" />
                 </svg>
              </div>
            </div>
          ))}
        </div>

        {/* CSS for background flow */}
        <style>{`
          @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}</style>
      </Reveal>
    </section>
  );
}

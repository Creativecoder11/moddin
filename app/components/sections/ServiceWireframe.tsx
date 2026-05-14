"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ServiceWireframeVariant } from "@/app/data/service-pages";

type Props = {
  variant: ServiceWireframeVariant;
  bg: string;
  accent: string;
  title: string;
};

type Row = { label: string; w: number };
type Stat = { label: string; value: string };

const META: Record<
  ServiceWireframeVariant,
  { id: string; tag: string; rows: Row[]; stats: Stat[] }
> = {
  brief: {
    id: "BD · 01",
    tag: "Country Brief",
    rows: [
      { label: "Macro thesis", w: 0.62 },
      { label: "Sector matrix", w: 0.86 },
      { label: "Friction map", w: 0.44 },
      { label: "Entry routes", w: 0.72 },
    ],
    stats: [
      { label: "Sectors", value: "12" },
      { label: "Routes", value: "04" },
      { label: "Live", value: "Q2" },
    ],
  },
  corridor: {
    id: "TR · 02",
    tag: "Corridor View",
    rows: [
      { label: "Origin nodes", w: 0.56 },
      { label: "Distributor fit", w: 0.78 },
      { label: "Compliance gate", w: 0.42 },
      { label: "Channel mix", w: 0.66 },
    ],
    stats: [
      { label: "Lanes", value: "08" },
      { label: "Partners", value: "23" },
      { label: "Active", value: "11" },
    ],
  },
  pipeline: {
    id: "IN · 03",
    tag: "Deal Pipeline",
    rows: [
      { label: "Origination", w: 0.7 },
      { label: "Diligence", w: 0.5 },
      { label: "Structuring", w: 0.62 },
      { label: "Close window", w: 0.36 },
    ],
    stats: [
      { label: "Mandates", value: "06" },
      { label: "Targets", value: "47" },
      { label: "Stage 3", value: "09" },
    ],
  },
  narrative: {
    id: "CB · 04",
    tag: "Narrative System",
    rows: [
      { label: "Investor frame", w: 0.72 },
      { label: "Corporate frame", w: 0.58 },
      { label: "Institutional frame", w: 0.46 },
      { label: "Asset library", w: 0.81 },
    ],
    stats: [
      { label: "Pillars", value: "04" },
      { label: "Assets", value: "32" },
      { label: "Owners", value: "07" },
    ],
  },
  network: {
    id: "PA · 05",
    tag: "Stakeholder Map",
    rows: [
      { label: "Ministries", w: 0.6 },
      { label: "Agencies", w: 0.72 },
      { label: "Chambers", w: 0.5 },
      { label: "Compliance gates", w: 0.4 },
    ],
    stats: [
      { label: "Bodies", value: "18" },
      { label: "Briefs", value: "12" },
      { label: "Live", value: "05" },
    ],
  },
};

export function ServiceWireframe({ variant, bg, accent, title }: Props) {
  const reduce = useReducedMotion();
  const data = META[variant];

  return (
    <div className="relative w-full">
      {/* Outer "device" shell — Double-Bezel outer */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] rounded-[clamp(20px,2vw,28px)] p-[clamp(8px,0.9vw,13px)] overflow-hidden"
        style={{
          background: `linear-gradient(165deg, ${hex(accent, 0.22)}, ${hex(bg, 0)} 55%)`,
          boxShadow: `0 40px 100px -30px ${hex(accent, 0.55)}, 0 22px 60px -22px rgba(0,0,0,0.55), inset 0 0 0 1px ${hex(
            "#faf5e9",
            0.12
          )}`,
        }}
      >
        {/* Inner core — Double-Bezel inner */}
        <div
          className="relative w-full h-full rounded-[calc(clamp(20px,2vw,28px)-clamp(8px,0.9vw,13px))] overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${shift(bg, -6)}, ${bg})`,
            boxShadow: `inset 0 1px 0 ${hex("#faf5e9", 0.1)}, inset 0 0 0 1px ${hex("#faf5e9", 0.06)}`,
          }}
        >
          {/* Diagonal-line wireframe texture (very subtle) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, transparent 0 9px, ${hex(
                "#faf5e9",
                1
              )} 9px 10px)`,
            }}
          />

          {/* Top bar — "window" dots + ID */}
          <div className="flex items-center justify-between px-[clamp(18px,1.8vw,24px)] pt-[clamp(16px,1.6vw,20px)]">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-[7px] rounded-full" style={{ background: hex("#faf5e9", 0.45) }} />
              <span className="size-[7px] rounded-full" style={{ background: hex("#faf5e9", 0.28) }} />
              <span className="size-[7px] rounded-full" style={{ background: hex("#faf5e9", 0.18) }} />
            </div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: hex("#faf5e9", 0.42) }}
            >
              {data.id}
            </span>
          </div>

          {/* Header */}
          <div className="px-[clamp(20px,2.2vw,32px)] pt-[clamp(22px,2.6vw,36px)]">
            <div
              className="font-mono text-[10.5px] uppercase tracking-[0.24em] mb-[clamp(10px,1vw,14px)]"
              style={{ color: accent }}
            >
              <span
                className="inline-block size-1.5 rounded-full mr-2 align-middle"
                style={{ background: accent, boxShadow: `0 0 10px ${hex(accent, 0.8)}` }}
                aria-hidden
              />
              {data.tag}
            </div>
            <div
              className="font-serif text-[clamp(18px,2vw,26px)] leading-[1.05] tracking-[-0.02em]"
              style={{
                color: hex("#faf5e9", 0.94),
                fontVariationSettings: '"opsz" 144, "SOFT" 40',
              }}
            >
              {title}
            </div>
            <div
              className="mt-[clamp(14px,1.5vw,20px)] h-px w-full"
              style={{ background: hex("#faf5e9", 0.12) }}
            />
          </div>

          {/* Body — bar rows */}
          <div className="px-[clamp(20px,2.2vw,32px)] pt-[clamp(18px,2vw,28px)] space-y-[clamp(12px,1.3vw,18px)]">
            {data.rows.map((row, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                    style={{ color: hex("#faf5e9", 0.55) }}
                  >
                    {String(i + 1).padStart(2, "0")} · {row.label}
                  </span>
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: hex("#faf5e9", 0.4) }}
                  >
                    {Math.round(row.w * 100)}%
                  </span>
                </div>
                <div
                  className="h-[6px] w-full rounded-full overflow-hidden"
                  style={{
                    background: hex("#faf5e9", 0.07),
                    boxShadow: `inset 0 0 0 1px ${hex("#faf5e9", 0.05)}`,
                  }}
                >
                  <motion.div
                    initial={reduce ? false : { width: 0 }}
                    whileInView={{ width: `${row.w * 100}%` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      delay: 0.25 + i * 0.1,
                      duration: 0.95,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accent}, ${hex(accent, 0.65)})`,
                      boxShadow: `0 0 12px ${hex(accent, 0.5)}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer stat tiles */}
          <div className="absolute bottom-[clamp(18px,2vw,24px)] left-[clamp(20px,2.2vw,32px)] right-[clamp(20px,2.2vw,32px)] grid grid-cols-3 gap-2">
            {data.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-[10px] px-3 py-2.5"
                style={{
                  background: hex("#faf5e9", 0.05),
                  boxShadow: `inset 0 0 0 1px ${hex("#faf5e9", 0.1)}, inset 0 1px 0 ${hex(
                    "#faf5e9",
                    0.06
                  )}`,
                }}
              >
                <div
                  className="font-mono text-[9px] uppercase tracking-[0.18em]"
                  style={{ color: hex("#faf5e9", 0.45) }}
                >
                  {s.label}
                </div>
                <div
                  className="mt-1 font-serif text-[clamp(15px,1.4vw,18px)] leading-none"
                  style={{ color: hex("#faf5e9", 0.92) }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Glow corner accent */}
          <span
            aria-hidden
            className="absolute top-[clamp(18px,1.8vw,24px)] right-[clamp(18px,1.8vw,24px)] size-[6px] rounded-full"
            style={{ background: accent, boxShadow: `0 0 14px ${hex(accent, 0.75)}` }}
          />
        </div>
      </div>

      {/* Floating annotation badge */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="absolute -bottom-3 left-4 sm:left-8 inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-[10.5px] uppercase tracking-[0.18em]"
        style={{
          background: "#faf5e9",
          color: bg,
          boxShadow: `0 16px 36px -12px rgba(0,0,0,0.45), 0 0 0 1px ${hex("#000", 0.04)}`,
        }}
      >
        <span
          className="size-1.5 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
        Wireframe · v0.1
      </motion.div>
    </div>
  );
}

function hex(c: string, alpha: number) {
  const m = c.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Slightly lighten or darken a hex by clamping each channel by `pct` (-100..100).
function shift(c: string, pct: number) {
  const m = c.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  const adj = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v + (255 - v) * (pct / 100))));
  return `rgb(${adj(r)}, ${adj(g)}, ${adj(b)})`;
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Reveal } from "../ui/Reveal";
import type {
  ServicePageBlock,
  ServicePageContent,
  ServicePageStat,
  ServiceWireframeVariant,
} from "@/app/data/service-pages";

type Props = {
  content: ServicePageContent;
};

export function ServiceBody({ content }: Props) {
  const variant = content.wireframeVariant;
  switch (variant) {
    case "brief":
      return <BodyBrief content={content} />;
    case "corridor":
      return <BodyCorridor content={content} />;
    case "pipeline":
      return <BodyPipeline content={content} />;
    case "narrative":
      return <BodyNarrative content={content} />;
    case "network":
      return <BodyNetwork content={content} />;
    default:
      return <BodyBrief content={content} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function splitIntro(text: string): [string, string] {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const mid = Math.ceil(sentences.length / 2);
  return [sentences.slice(0, mid).join(" "), sentences.slice(mid).join(" ")];
}

function gatherBullets(blocks: readonly ServicePageBlock[]): string[] {
  const list: string[] = [];
  for (const b of blocks) {
    if (b.bullets && b.bullets.length > 0) {
      for (const bullet of b.bullets) list.push(bullet);
    }
  }
  return list;
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CornerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PillCTA({
  href = "/contact",
  label,
  accent,
  light,
}: {
  href?: string;
  label: string;
  accent: string;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`svar-cta-pill${light ? " svar-cta-pill--light" : ""}`}
      style={{ ["--svc-accent" as string]: accent }}
    >
      <span className="svar-cta-pill__label">{label}</span>
      <span className="svar-cta-pill__icon" aria-hidden>
        <CornerIcon />
      </span>
    </a>
  );
}

/* ================================================================== */
/*  VARIANT A — BRIEF: Editorial Manifesto                             */
/* ================================================================== */

function BodyBrief({ content }: { content: ServicePageContent }) {
  const reduce = useReducedMotion();
  const bandRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const bandImgY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  const accent = content.hero.accent;
  const blocks = content.blocks;
  const [lede1, lede2] = splitIntro(blocks[0]?.body ?? content.intro);
  const manifesto = (blocks[0]?.bullets ?? blocks[1]?.bullets ?? []) as string[];
  const tensionBlock = blocks[1];
  const tensionBullets = (tensionBlock?.bullets ?? []) as string[];
  const bandBlock = blocks[2] ?? blocks[blocks.length - 1];

  return (
    <div
      className="svar svar-brief"
      style={{ ["--svc-accent" as string]: accent }}
    >
      {/* SECTION A — Manifesto */}
      <section className="svar-brief__manifesto">
        <div className="wrap svar-brief__manifesto-inner">
          <Reveal className="svar-eyebrow">
            <i className="svar-eyebrow__mark" style={{ background: accent }} />
            <span>Scope of Practice</span>
          </Reveal>

          <div className="svar-brief__lede">
            <Reveal as="h2" className="svar-brief__lede-h">
              The country thesis — <em>line by line.</em>
            </Reveal>
            <Reveal delay={1} className="svar-brief__lede-copy">
              <p>{lede1}</p>
              {lede2 && <p>{lede2}</p>}
            </Reveal>
          </div>

          <ol className="svar-brief__rows">
            {manifesto.map((line, i) => (
              <Reveal
                as="li"
                delay={((i % 3) + 1) as 1 | 2 | 3}
                key={i}
                className="svar-brief__row"
              >
                <span className="svar-brief__row-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="svar-brief__row-text">{line}</span>
                <span className="svar-brief__row-rule" aria-hidden />
                <span className="svar-brief__row-arrow" aria-hidden>
                  <ArrowIcon />
                </span>
              </Reveal>
            ))}
          </ol>

          {tensionBullets.length > 0 && (
            <div className="svar-brief__tension">
              <Reveal className="svar-brief__tension-head">
                <span className="svar-brief__tension-kicker">
                  {tensionBlock?.title ?? "Where decisions usually stall"}
                </span>
              </Reveal>
              <ul className="svar-brief__tension-list">
                {tensionBullets.map((b, i) => (
                  <Reveal
                    as="li"
                    delay={((i % 2) + 1) as 1 | 2}
                    key={i}
                    className="svar-brief__tension-item"
                  >
                    <span className="svar-brief__tension-bar" aria-hidden />
                    <span>{b}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* SECTION B — Cinemascope band */}
      <section ref={bandRef} className="svar-brief__cine">
        <div className="svar-brief__cine-frame">
          <motion.div
            className="svar-brief__cine-img"
            style={{ y: reduce ? "0%" : bandImgY }}
          >
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <span className="svar-brief__cine-vignette" aria-hidden />
        </div>

        <Reveal as="article" delay={2} className="svar-brief__cine-card">
          <span className="svar-eyebrow svar-eyebrow--dark">
            <i className="svar-eyebrow__mark" style={{ background: accent }} />
            <span>How we work</span>
          </span>
          <h3 className="svar-brief__cine-title">
            {content.bandHeading ?? bandBlock?.title}
          </h3>
          <p className="svar-brief__cine-body">{bandBlock?.body}</p>
          <PillCTA label="Read more" accent={accent} />
        </Reveal>
      </section>

      {/* SECTION C — Stat strip */}
      {content.stats && content.stats.length > 0 && (
        <StatStrip
          stats={content.stats}
          heading="Outsized"
          headingEm="Value."
          caption={content.closingBody}
        />
      )}

      {/* SECTION D — Pull quote */}
      {content.closingStatement && (
        <PullQuote text={content.closingStatement} accent={accent} />
      )}
    </div>
  );
}

/* ================================================================== */
/*  VARIANT B — CORRIDOR: Horizontal Pipeline                          */
/* ================================================================== */

function BodyCorridor({ content }: { content: ServicePageContent }) {
  const reduce = useReducedMotion();
  const accent = content.hero.accent;
  const blocks = content.blocks;
  const moduleBlock = blocks.find((b) => b.bullets && b.bullets.length > 0);
  const audienceBlock = blocks
    .slice()
    .reverse()
    .find((b) => b.bullets && b.bullets.length > 0 && b !== moduleBlock);
  const modules = (moduleBlock?.bullets ?? []) as string[];
  const audiences = (audienceBlock?.bullets ?? []) as string[];
  const bandBlock = blocks[blocks.length - 2] ?? blocks[blocks.length - 1];

  const bandRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const imgX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div
      className="svar svar-corridor"
      style={{ ["--svc-accent" as string]: accent }}
    >
      {/* SECTION A — Horizontal corridor */}
      <section className="svar-corridor__lab">
        <div className="wrap">
          <div className="svar-corridor__head">
            <Reveal className="svar-eyebrow">
              <i
                className="svar-eyebrow__mark"
                style={{ background: accent }}
              />
              <span>Service Corridor</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="svar-corridor__title">
              {moduleBlock?.title ?? "Core service modules"}
              <em className="svar-corridor__title-em">.</em>
            </Reveal>
            <Reveal delay={2} className="svar-corridor__copy">
              <p>{moduleBlock?.body ?? blocks[0]?.body}</p>
            </Reveal>
          </div>

          <div className="svar-corridor__track">
            <span className="svar-corridor__rail" aria-hidden />
            <ol className="svar-corridor__cards">
              {modules.map((m, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                  className="svar-corridor__card"
                >
                  <span className="svar-corridor__card-shell">
                    <span className="svar-corridor__card-core">
                      <span className="svar-corridor__card-step">
                        <span className="svar-corridor__card-dot" aria-hidden />
                        Stage {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="svar-corridor__card-text">{m}</span>
                      <span className="svar-corridor__card-meta">
                        <span>Module</span>
                        <span aria-hidden>{i + 1}/{modules.length}</span>
                      </span>
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* SECTION B — Editorial split */}
      <section ref={bandRef} className="svar-corridor__split">
        <div className="wrap svar-corridor__split-wrap">
          <Reveal className="svar-corridor__split-text">
            <span className="svar-eyebrow svar-eyebrow--dark">
              <i
                className="svar-eyebrow__mark"
                style={{ background: accent }}
              />
              <span>{audienceBlock?.title ?? "Who this is for"}</span>
            </span>
            <h3 className="svar-corridor__split-title">
              {content.bandHeading ?? bandBlock?.title}
            </h3>
            <p className="svar-corridor__split-body">
              {audienceBlock?.body ?? bandBlock?.body}
            </p>
            <ul className="svar-corridor__split-list">
              {audiences.map((a, i) => (
                <li key={i} className="svar-corridor__split-item">
                  <span className="svar-corridor__split-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <PillCTA label="Plan a corridor" accent={accent} light />
          </Reveal>

          <Reveal delay={2} className="svar-corridor__split-media">
            <span className="svar-corridor__split-media-shell">
              <motion.span
                className="svar-corridor__split-media-frame"
                style={{ x: reduce ? "0%" : imgX }}
              >
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.span>
            </span>
            <span className="svar-corridor__split-caption" aria-hidden>
              {String(modules.length || 4).padStart(2, "0")} · stages
            </span>
          </Reveal>
        </div>
      </section>

      {/* SECTION C — Vertical bar stats */}
      {content.stats && content.stats.length > 0 && (
        <BarStats
          stats={content.stats}
          heading="Corridors,"
          headingEm="quantified."
          caption={content.closingBody}
          accent={accent}
        />
      )}

      {/* SECTION D — Inline statement */}
      {content.closingStatement && (
        <InlineStatement text={content.closingStatement} accent={accent} />
      )}
    </div>
  );
}

/* ================================================================== */
/*  VARIANT C — PIPELINE: Vertical Timeline                            */
/* ================================================================== */

function BodyPipeline({ content }: { content: ServicePageContent }) {
  const reduce = useReducedMotion();
  const accent = content.hero.accent;
  const blocks = content.blocks;
  const cycle = blocks.find((b) => b.bullets && b.bullets.length > 0);
  const stages = (cycle?.bullets ?? []) as string[];
  const introBlock = blocks[0];
  const bandBlock = blocks[blocks.length - 1];

  const bandRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <div
      className="svar svar-pipeline"
      style={{ ["--svc-accent" as string]: accent }}
    >
      {/* SECTION A — Vertical timeline */}
      <section className="svar-pipeline__rail">
        <div className="wrap svar-pipeline__rail-wrap">
          <div className="svar-pipeline__head">
            <Reveal className="svar-eyebrow svar-eyebrow--dark">
              <i
                className="svar-eyebrow__mark"
                style={{ background: accent }}
              />
              <span>Deal Cycle</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="svar-pipeline__title">
              {introBlock?.title ?? "Mandate-aligned opportunity development"}
            </Reveal>
            <Reveal delay={2} className="svar-pipeline__copy">
              <p>{introBlock?.body}</p>
            </Reveal>
          </div>

          <ol className="svar-pipeline__timeline">
            <span className="svar-pipeline__spine" aria-hidden />
            {stages.map((stage, i) => (
              <Reveal
                as="li"
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className={`svar-pipeline__node ${
                  i % 2 === 0 ? "svar-pipeline__node--l" : "svar-pipeline__node--r"
                }`}
              >
                <span className="svar-pipeline__node-mark" aria-hidden>
                  <span className="svar-pipeline__node-dot" />
                </span>
                <span className="svar-pipeline__node-card">
                  <span className="svar-pipeline__node-shell">
                    <span className="svar-pipeline__node-core">
                      <span className="svar-pipeline__node-step">
                        Stage {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="svar-pipeline__node-text">{stage}</span>
                    </span>
                  </span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION B — Portrait strip */}
      <section ref={bandRef} className="svar-pipeline__portrait">
        <div className="wrap svar-pipeline__portrait-wrap">
          <Reveal className="svar-pipeline__portrait-media">
            <span className="svar-pipeline__portrait-shell">
              <motion.span
                className="svar-pipeline__portrait-frame"
                style={{ y: reduce ? "0%" : imgY }}
              >
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.span>
            </span>
          </Reveal>

          <Reveal as="article" delay={2} className="svar-pipeline__portrait-card">
            <span className="svar-eyebrow svar-eyebrow--dark">
              <i
                className="svar-eyebrow__mark"
                style={{ background: accent }}
              />
              <span>How we work</span>
            </span>
            <h3 className="svar-pipeline__portrait-title">
              {content.bandHeading ?? bandBlock?.title}
            </h3>
            <p className="svar-pipeline__portrait-body">{bandBlock?.body}</p>
            <div className="svar-pipeline__portrait-meta">
              <span>Coordinated diligence</span>
              <span aria-hidden>·</span>
              <span>Stakeholder access</span>
              <span aria-hidden>·</span>
              <span>Faster decisions</span>
            </div>
            <PillCTA label="Discuss mandate" accent={accent} />
          </Reveal>
        </div>
      </section>

      {/* SECTION C — Featured stat bento */}
      {content.stats && content.stats.length > 0 && (
        <BentoStats
          stats={content.stats}
          heading="Pipeline,"
          headingEm="qualified."
          caption={content.closingBody}
          accent={accent}
        />
      )}

      {/* SECTION D — Right-aligned statement */}
      {content.closingStatement && (
        <RightStatement text={content.closingStatement} accent={accent} />
      )}
    </div>
  );
}

/* ================================================================== */
/*  VARIANT D — NARRATIVE: Magazine Spread                             */
/* ================================================================== */

function BodyNarrative({ content }: { content: ServicePageContent }) {
  const accent = content.hero.accent;
  const blocks = content.blocks;
  const messagingBlock = blocks.find((b) => b.bullets && b.bullets.length > 0);
  const audiences = (messagingBlock?.bullets ?? []) as string[];
  const introBlock = blocks[0];
  const systemBlock = blocks[2] ?? blocks[blocks.length - 2];
  const govBlock = blocks[3] ?? blocks[blocks.length - 1];

  return (
    <div
      className="svar svar-narrative"
      style={{ ["--svc-accent" as string]: accent }}
    >
      {/* SECTION A — Magazine spread */}
      <section className="svar-narrative__spread">
        <div className="wrap svar-narrative__spread-wrap">
          <Reveal className="svar-eyebrow svar-narrative__eyebrow">
            <i className="svar-eyebrow__mark" style={{ background: accent }} />
            <span>Narrative Architecture</span>
          </Reveal>

          <Reveal as="h2" delay={1} className="svar-narrative__h">
            {introBlock?.title}
            <em className="svar-narrative__h-em">.</em>
          </Reveal>

          <Reveal delay={2} className="svar-narrative__lede">
            <p>
              <span className="svar-narrative__dropcap">
                {(introBlock?.body ?? "T").charAt(0)}
              </span>
              {(introBlock?.body ?? "").slice(1)}
            </p>
          </Reveal>

          <div className="svar-narrative__bento">
            {audiences.map((line, i) => (
              <Reveal
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className={`svar-narrative__tile svar-narrative__tile--${(i % 3) + 1}`}
              >
                <span className="svar-narrative__tile-shell">
                  <span className="svar-narrative__tile-core">
                    <span className="svar-narrative__tile-num">
                      Track {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="svar-narrative__tile-text">{line}</span>
                    <span className="svar-narrative__tile-rule" aria-hidden />
                    <span className="svar-narrative__tile-foot">
                      <span>Audience</span>
                      <ArrowIcon />
                    </span>
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B — Tilted polaroid */}
      <section className="svar-narrative__polar">
        <div className="wrap svar-narrative__polar-wrap">
          <Reveal className="svar-narrative__polar-media">
            <span className="svar-narrative__polar-frame">
              <span className="svar-narrative__polar-photo">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 56vw"
                  className="object-cover"
                />
              </span>
              <span className="svar-narrative__polar-tape" aria-hidden />
              <span className="svar-narrative__polar-stamp" aria-hidden>
                Sheet · 01
              </span>
            </span>
          </Reveal>

          <Reveal as="article" delay={2} className="svar-narrative__polar-card">
            <span className="svar-narrative__polar-tag">
              {systemBlock?.title ?? "Content and campaign system"}
            </span>
            <h3 className="svar-narrative__polar-title">
              {content.bandHeading ?? "An operating system for the country story."}
            </h3>
            <p className="svar-narrative__polar-body">{systemBlock?.body}</p>
            <p className="svar-narrative__polar-body">
              {govBlock?.body}
            </p>
            <PillCTA label="Book workshop" accent={accent} />
          </Reveal>
        </div>
      </section>

      {/* SECTION C — Sequential card stack stats */}
      {content.stats && content.stats.length > 0 && (
        <StackedStats
          stats={content.stats}
          heading="A coherent"
          headingEm="signal system."
          caption={content.closingBody}
          accent={accent}
        />
      )}

      {/* SECTION D — Centered ornamental */}
      {content.closingStatement && (
        <CenteredQuote text={content.closingStatement} accent={accent} />
      )}
    </div>
  );
}

/* ================================================================== */
/*  VARIANT E — NETWORK: Asymmetric Bento                              */
/* ================================================================== */

function BodyNetwork({ content }: { content: ServicePageContent }) {
  const accent = content.hero.accent;
  const blocks = content.blocks;
  const componentsBlock = blocks.find((b) => b.bullets && b.bullets.length > 0);
  const nodes = (componentsBlock?.bullets ?? []) as string[];
  const introBlock = blocks[0];
  const closingBlock = blocks[blocks.length - 1];

  return (
    <div
      className="svar svar-network"
      style={{ ["--svc-accent" as string]: accent }}
    >
      {/* SECTION A — Network bento */}
      <section className="svar-network__grid">
        <div className="wrap">
          <div className="svar-network__head">
            <Reveal className="svar-eyebrow">
              <i
                className="svar-eyebrow__mark"
                style={{ background: accent }}
              />
              <span>Institutional Network</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="svar-network__title">
              {introBlock?.title}
              <em className="svar-network__title-em">.</em>
            </Reveal>
            <Reveal delay={2} className="svar-network__copy">
              <p>{introBlock?.body}</p>
            </Reveal>
          </div>

          <div className="svar-network__bento">
            <Reveal className="svar-network__center">
              <span className="svar-network__center-shell">
                <span className="svar-network__center-core">
                  <span className="svar-network__center-kicker">
                    Coordination
                  </span>
                  <span className="svar-network__center-h">
                    {componentsBlock?.title ?? "Service components"}
                  </span>
                  <span className="svar-network__center-body">
                    {componentsBlock?.body}
                  </span>
                  <span className="svar-network__center-mark" aria-hidden />
                </span>
              </span>
            </Reveal>

            {nodes.map((node, i) => (
              <Reveal
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className={`svar-network__node svar-network__node--${i + 1}`}
              >
                <span className="svar-network__node-shell">
                  <span className="svar-network__node-core">
                    <span className="svar-network__node-num">
                      N · {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="svar-network__node-text">{node}</span>
                    <span className="svar-network__node-arrow" aria-hidden>
                      <ArrowIcon />
                    </span>
                  </span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION B — Wide horizontal card */}
      <section className="svar-network__wide">
        <div className="wrap">
          <Reveal className="svar-network__wide-shell">
            <div className="svar-network__wide-media">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
                className="object-cover"
              />
            </div>
            <div className="svar-network__wide-content">
              <span className="svar-eyebrow svar-eyebrow--dark">
                <i
                  className="svar-eyebrow__mark"
                  style={{ background: accent }}
                />
                <span>Operating principle</span>
              </span>
              <h3 className="svar-network__wide-title">
                {content.bandHeading ?? closingBlock?.title}
              </h3>
              <p className="svar-network__wide-body">{closingBlock?.body}</p>
              <PillCTA label="Plan engagement" accent={accent} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION C — Dense hairline stats */}
      {content.stats && content.stats.length > 0 && (
        <HairlineStats
          stats={content.stats}
          heading="Mapped,"
          headingEm="sequenced."
          caption={content.closingBody}
          accent={accent}
        />
      )}

      {/* SECTION D — Annotation statement */}
      {content.closingStatement && (
        <AnnotationStatement
          text={content.closingStatement}
          accent={accent}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/*  SHARED SUB-COMPONENTS                                              */
/* ================================================================== */

function StatStrip({
  stats,
  heading,
  headingEm,
  caption,
}: {
  stats: readonly ServicePageStat[];
  heading: string;
  headingEm: string;
  caption?: string;
}) {
  return (
    <section className="svar-strip">
      <div className="wrap">
        <div className="svar-strip__head">
          <Reveal as="h2" className="svar-strip__heading">
            {heading} <em className="svar-strip__heading-em">{headingEm}</em>
          </Reveal>
          {caption && (
            <Reveal delay={1} className="svar-strip__caption">
              <p>{caption}</p>
            </Reveal>
          )}
        </div>
        <ol className="svar-strip__row">
          {stats.map((s, i) => (
            <Reveal
              as="li"
              delay={((i % 3) + 1) as 1 | 2 | 3}
              key={i}
              className="svar-strip__cell"
            >
              <span className="svar-strip__cell-tag">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="svar-strip__cell-value">{s.value}</span>
              <span className="svar-strip__cell-label">{s.label}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BarStats({
  stats,
  heading,
  headingEm,
  caption,
}: {
  stats: readonly ServicePageStat[];
  heading: string;
  headingEm: string;
  caption?: string;
  accent: string;
}) {
  return (
    <section className="svar-bars">
      <div className="wrap">
        <div className="svar-bars__head">
          <Reveal as="h2" className="svar-bars__heading">
            {heading} <em className="svar-bars__heading-em">{headingEm}</em>
          </Reveal>
          {caption && (
            <Reveal delay={1} className="svar-bars__caption">
              <p>{caption}</p>
            </Reveal>
          )}
        </div>
        <ul className="svar-bars__list">
          {stats.map((s, i) => {
            const len = 36 + ((i * 18) % 60);
            return (
              <Reveal
                as="li"
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="svar-bars__row"
              >
                <span className="svar-bars__row-label">
                  <span className="svar-bars__row-tag">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s.label}</span>
                </span>
                <span className="svar-bars__row-bar" aria-hidden>
                  <span
                    className="svar-bars__row-fill"
                    style={{ width: `${len}%` }}
                  />
                </span>
                <span className="svar-bars__row-value">{s.value}</span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function BentoStats({
  stats,
  heading,
  headingEm,
  caption,
}: {
  stats: readonly ServicePageStat[];
  heading: string;
  headingEm: string;
  caption?: string;
  accent: string;
}) {
  const featured = stats[0];
  const rest = stats.slice(1);
  return (
    <section className="svar-bento">
      <div className="wrap">
        <div className="svar-bento__head">
          <Reveal as="h2" className="svar-bento__heading">
            {heading} <em className="svar-bento__heading-em">{headingEm}</em>
          </Reveal>
          {caption && (
            <Reveal delay={1} className="svar-bento__caption">
              <p>{caption}</p>
            </Reveal>
          )}
        </div>
        <div className="svar-bento__grid">
          {featured && (
            <Reveal className="svar-bento__feature">
              <span className="svar-bento__feature-shell">
                <span className="svar-bento__feature-core">
                  <span className="svar-bento__feature-eyebrow">Headline</span>
                  <span className="svar-bento__feature-value">
                    {featured.value}
                  </span>
                  <span className="svar-bento__feature-label">
                    {featured.label}
                  </span>
                  <span className="svar-bento__feature-foot">
                    <span aria-hidden>↗</span>
                    <span>Across mandates</span>
                  </span>
                </span>
              </span>
            </Reveal>
          )}
          {rest.map((s, i) => (
            <Reveal
              key={i}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="svar-bento__cell"
            >
              <span className="svar-bento__cell-shell">
                <span className="svar-bento__cell-core">
                  <span className="svar-bento__cell-value">{s.value}</span>
                  <span className="svar-bento__cell-label">{s.label}</span>
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackedStats({
  stats,
  heading,
  headingEm,
  caption,
}: {
  stats: readonly ServicePageStat[];
  heading: string;
  headingEm: string;
  caption?: string;
  accent: string;
}) {
  return (
    <section className="svar-stack">
      <div className="wrap svar-stack__wrap">
        <div className="svar-stack__head">
          <Reveal as="h2" className="svar-stack__heading">
            {heading} <em className="svar-stack__heading-em">{headingEm}</em>
          </Reveal>
          {caption && (
            <Reveal delay={1} className="svar-stack__caption">
              <p>{caption}</p>
            </Reveal>
          )}
        </div>
        <ol className="svar-stack__list">
          {stats.map((s, i) => (
            <Reveal
              as="li"
              delay={((i % 3) + 1) as 1 | 2 | 3}
              key={i}
              className="svar-stack__card"
              style={{ ["--i" as string]: i }}
            >
              <span className="svar-stack__card-rank">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="svar-stack__card-value">{s.value}</span>
              <span className="svar-stack__card-label">{s.label}</span>
              <span className="svar-stack__card-tail" aria-hidden />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HairlineStats({
  stats,
  heading,
  headingEm,
  caption,
}: {
  stats: readonly ServicePageStat[];
  heading: string;
  headingEm: string;
  caption?: string;
  accent: string;
}) {
  return (
    <section className="svar-hair">
      <div className="wrap">
        <div className="svar-hair__head">
          <Reveal as="h2" className="svar-hair__heading">
            {heading} <em className="svar-hair__heading-em">{headingEm}</em>
          </Reveal>
          {caption && (
            <Reveal delay={1} className="svar-hair__caption">
              <p>{caption}</p>
            </Reveal>
          )}
        </div>
        <dl className="svar-hair__grid">
          {stats.map((s, i) => (
            <Reveal
              key={i}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="svar-hair__cell"
            >
              <dt className="svar-hair__cell-label">
                <span aria-hidden>0{i + 1}</span>
                <span>{s.label}</span>
              </dt>
              <dd className="svar-hair__cell-value">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function PullQuote({ text, accent }: { text: string; accent: string }) {
  return (
    <section className="svar-quote" style={{ ["--svc-accent" as string]: accent }}>
      <div className="wrap svar-quote__wrap">
        <span className="svar-quote__mark svar-quote__mark--l" aria-hidden>
          “
        </span>
        <Reveal as="h2" className="svar-quote__h">
          {text}
        </Reveal>
        <span className="svar-quote__mark svar-quote__mark--r" aria-hidden>
          ”
        </span>
      </div>
    </section>
  );
}

function InlineStatement({ text, accent }: { text: string; accent: string }) {
  return (
    <section
      className="svar-inline"
      style={{ ["--svc-accent" as string]: accent }}
    >
      <div className="wrap svar-inline__wrap">
        <span className="svar-inline__bar" aria-hidden />
        <Reveal as="h2" className="svar-inline__h">
          {text}
        </Reveal>
      </div>
    </section>
  );
}

function RightStatement({ text, accent }: { text: string; accent: string }) {
  return (
    <section
      className="svar-right"
      style={{ ["--svc-accent" as string]: accent }}
    >
      <div className="wrap svar-right__wrap">
        <Reveal className="svar-right__index">
          <span className="svar-right__index-mark" aria-hidden />
          <span>End note</span>
        </Reveal>
        <Reveal as="h2" delay={1} className="svar-right__h">
          {text}
        </Reveal>
      </div>
    </section>
  );
}

function CenteredQuote({ text, accent }: { text: string; accent: string }) {
  return (
    <section
      className="svar-center"
      style={{ ["--svc-accent" as string]: accent }}
    >
      <div className="wrap svar-center__wrap">
        <span className="svar-center__rule" aria-hidden />
        <Reveal as="h2" className="svar-center__h">
          {text}
        </Reveal>
        <span className="svar-center__rule" aria-hidden />
      </div>
    </section>
  );
}

function AnnotationStatement({
  text,
  accent,
}: {
  text: string;
  accent: string;
}) {
  return (
    <section
      className="svar-annot"
      style={{ ["--svc-accent" as string]: accent }}
    >
      <div className="wrap svar-annot__wrap">
        <span className="svar-annot__tag">
          <span aria-hidden>※</span> Field note
        </span>
        <Reveal as="h2" className="svar-annot__h">
          {text}
        </Reveal>
        <span className="svar-annot__signoff" aria-hidden>
          — Moddin Practice
        </span>
      </div>
    </section>
  );
}

/* Unused but exported for future variants if needed */
export const _gatherBullets = gatherBullets;

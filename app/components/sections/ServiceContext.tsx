import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";
import { ServicePageBlock, ServiceWireframeVariant } from "@/app/data/service-pages";

type Props = {
  block1: ServicePageBlock;
  block2: ServicePageBlock;
  accent: string;
  variant: ServiceWireframeVariant;
};

export function ServiceContext({ block1, block2, accent }: Props) {
  return (
    <section
      id="service-context"
      className="svc-context-v2"
      style={{ ["--svc-accent" as string]: accent }}
    >
      {/* Section header */}
      <div className="wrap svc-grid__head">
        <Reveal className="svc-grid__kicker">
          <span className="svc-grid__kicker-dot" style={{ background: accent }} aria-hidden />
          <span>Overview</span>
        </Reveal>
        <Reveal as="h2" delay={1} className="svc-grid__title">
          A grounded read on opportunity and friction.
        </Reveal>
      </div>

      {/* Card row */}
      <div className="wrap svc-grid__row">
        <CardItem
          index="01"
          eyebrow="Context"
          block={block1}
          accent={accent}
        />
        <CardItem
          index="02"
          eyebrow="Challenge"
          block={block2}
          accent={accent}
          variant="muted"
        />
      </div>
    </section>
  );
}

function CardItem({
  index,
  eyebrow,
  block,
  accent,
  variant = "primary",
}: {
  index: string;
  eyebrow: string;
  block: ServicePageBlock;
  accent: string;
  variant?: "primary" | "muted";
}) {
  return (
    <Reveal as="article" className={`svc-card-v2 svc-card-v2--${variant}`}>
      <header className="svc-card-v2__head">
        <span className="svc-card-v2__index">{index}</span>
        <span className="svc-card-v2__rule" aria-hidden />
        <span className="svc-card-v2__eyebrow">{eyebrow}</span>
      </header>

      <h3 className="svc-card-v2__title">
        {block.title}
      </h3>

      <TextEffect
        as="p"
        className="svc-card-v2__body"
        per="word"
        preset="fade"
        scrollReveal
      >
        {block.body}
      </TextEffect>

      {block.bullets && block.bullets.length > 0 && (
        <ul className="svc-card-v2__bullets">
          {block.bullets.map((b, i) => (
            <li key={i}>
              <span className="svc-card-v2__bul" style={{ background: accent }} aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Subtle pattern band at bottom */}
      <span className="svc-card-v2__pattern" aria-hidden />
    </Reveal>
  );
}

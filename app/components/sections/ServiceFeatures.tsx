import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";
import { ServicePageBlock, ServiceWireframeVariant } from "@/app/data/service-pages";

type Props = {
  blocks: ServicePageBlock[];
  accent: string;
  variant: ServiceWireframeVariant;
};

export function ServiceFeatures({ blocks, accent }: Props) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <section
      className="svc-features-v2"
      style={{ ["--svc-accent" as string]: accent }}
    >
      <div className="wrap svc-features-v2__head">
        <Reveal className="svc-features-v2__kicker">
          <span className="svc-features-v2__dot" style={{ background: accent }} aria-hidden />
          <span>Operating Model</span>
        </Reveal>
        <Reveal as="h2" delay={1} className="svc-features-v2__title">
          How the engagement actually moves.
        </Reveal>
      </div>

      <div className="wrap svc-features-v2__grid">
        {blocks.map((block, i) => (
          <Reveal as="article" key={i} delay={(((i % 3) + 1) as 1 | 2 | 3)} className="svc-card-v2 svc-card-v2--primary svc-card-v2--feature">
            <header className="svc-card-v2__head">
              <span className="svc-card-v2__index">{`0${i + 3}`}</span>
              <span className="svc-card-v2__rule" aria-hidden />
              <span className="svc-card-v2__eyebrow">Phase</span>
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
                {block.bullets.map((b, bi) => (
                  <li key={bi}>
                    <span className="svc-card-v2__bul" style={{ background: accent }} aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            <span className="svc-card-v2__pattern" aria-hidden />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { INSIGHTS } from "@/app/data/site";
import { IMAGE_BLUR_DATA_URL } from "../ui/image-placeholders";

export function Insights() {
  return (
    <section id="insights" className="insights">
      <div className="wrap">
        <div className="ins-head">
          <div>
            <Reveal className="eyebrow">
              <span>Insights</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              Bangladesh Market <em>Insights.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={2}>
            Practical insights, sector updates, and guides for companies and
            investors evaluating Bangladesh.
          </Reveal>
        </div>

        <div className="ins-grid">
          {INSIGHTS.map((card, i) => (
            <Reveal
              key={card.title}
              as="article"
              delay={i === 0 ? undefined : (i as 1 | 2)}
              className="ins-card"
            >
              <div className="cover">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR_DATA_URL}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <span className="tag">{card.tag}</span>
              </div>
              <div className="body">
                <div className="meta">
                  <span>{card.metaA}</span>
                  <span>{card.metaB}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="row">
                  <span className="go">{card.cta}</span>
                  <span className="arr">→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="ins-cta">
          <span className="t">All insights in one place</span>
          <a href="#" className="btn btn-ghost">
            View Insights <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

import { Reveal } from "../ui/Reveal";
import { INSIGHTS } from "@/app/data/site";

export function Insights() {
  return (
    <section id="insights" className="insights">
      <div className="wrap">
        <div className="ins-head">
          <div>
            <Reveal className="eyebrow">
              <span className="tick" />
              <span className="idx">vii.</span>
              <span>Insights</span>
            </Reveal>
            <Reveal as="h2" delay={1} className="section-title" style={{ marginTop: 20 }}>
              Insights for Entering <em>Bangladesh.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={2}>
            Practical resources designed to help investors and companies evaluate
            Bangladesh with more clarity.
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.src} alt={card.alt} loading="lazy" />
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

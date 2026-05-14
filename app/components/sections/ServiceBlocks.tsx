import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";

type Block = {
  title: string;
  body: string;
  bullets?: readonly string[];
};

type Props = {
  blocks: readonly Block[];
  serviceTitle: string;
};

export function ServiceBlocks({ blocks, serviceTitle }: Props) {
  return (
    <section className="svc-blocks">
      <div className="wrap">
        <div className="svc-blocks__head">
          <Reveal className="eyebrow">
            <span>How It Works</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              Service <em>Detail.</em>
            </h2>
          </Reveal>
        </div>

        <div className="svc-blocks__grid">
          {blocks.map((block, i) => {
            const isDark = i % 3 === 2;
            return (
              <Reveal
                key={block.title}
                as="article"
                delay={(i % 3) as 1 | 2 | 3}
                className={`svc-card svc-blocks__card${isDark ? " svc-card--dark" : ""}`}
              >
                <header className="svc-card__head">
                  <span className="svc-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="svc-card__lab">{serviceTitle}</span>
                  <span className="svc-rule" aria-hidden />
                  <span className="svc-rule__dot" aria-hidden />
                </header>

                <h3 className="svc-title">{block.title}</h3>

                <TextEffect
                  as="p"
                  className="svc-body"
                  per="word"
                  preset="fade"
                  scrollReveal
                >
                  {block.body}
                </TextEffect>

                {block.bullets && block.bullets.length > 0 && (
                  <ul className="svc-bullets">
                    {block.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}

                <footer className="svc-card__foot">
                  <span className="svc-pill">
                    <span className="svc-pill__dot" aria-hidden />
                    {serviceTitle}
                  </span>
                  <span className="svc-arr" aria-hidden>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </footer>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

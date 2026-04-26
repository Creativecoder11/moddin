import { Reveal } from "../ui/Reveal";

export function Quote() {
  return (
    <section className="quote">
      <div className="wrap">
        <div className="quote-grid">
          <Reveal className="quote-mark">“</Reveal>
          <div>
            <Reveal delay={1} className="quote-text">
              Clarity over complexity.
              <br />
              Fewer words, stronger direction—so global partners move from interest
              to action faster.
            </Reveal>
            <Reveal delay={2} className="quote-meta">
              <i /> Our approach · The Moddin way
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

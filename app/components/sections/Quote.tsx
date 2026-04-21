import { Reveal } from "../ui/Reveal";

export function Quote() {
  return (
    <section className="quote">
      <div className="wrap">
        <div className="quote-grid">
          <Reveal className="quote-mark">“</Reveal>
          <div>
            <Reveal delay={1} className="quote-text">
              The deck is expansive. The website is <em>decisive.</em> Moddin sells
              clarity — fewer adjectives, more mechanics — so global partners move
              from interest to execution <em>faster</em>.
            </Reveal>
            <Reveal delay={2} className="quote-meta">
              <i /> Editorial principle · Moddin house style
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

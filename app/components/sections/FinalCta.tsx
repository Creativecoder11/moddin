import { Reveal } from "../ui/Reveal";
import { PrimerForm } from "./PrimerForm";

export function FinalCta() {
  return (
    <section id="contact" className="cta">
      <div className="wrap cta-inner">
        <div>
          <div className="eyebrow" style={{ color: "var(--ember)" }}>
            <span className="tick" style={{ background: "var(--ember)" }} />
            <span className="idx" style={{ color: "var(--ember)" }}>
              viii.
            </span>
            <span>Contact</span>
          </div>
          <h2
            className="cta-title"
            style={{
              color: "var(--cream)",
              fontSize: "clamp(26px, 4.2vw, 64px)",
              lineHeight: 1,
            }}
          >
            <span
              className="cta-title-line"
              style={{ display: "block", whiteSpace: "nowrap" }}
            >
              Explore Bangladesh With
            </span>
            <span
              className="cta-title-line"
              style={{ display: "block", whiteSpace: "nowrap" }}
            >
              Clarity and <em>Confidence.</em>
            </span>
          </h2>
          <Reveal as="p" delay={1} className="lead">
            Whether you&rsquo;re evaluating entry, partnerships, or investment, we help
            you move with the right local context and execution support.
          </Reveal>
          <Reveal delay={2} className="cta-ctas">
            <a href="mailto:hello@moddin.com" className="btn btn-light">
              Book a Call <span>→</span>
            </a>
            <a href="mailto:hello@moddin.com" className="btn btn-outline">
              Book a Call
            </a>
          </Reveal>
          <Reveal delay={3} className="second">
            Response within 24 hours
          </Reveal>
        </div>

        <Reveal as="aside" delay={1} className="aside">
          <div className="k">
            <i />
            Response within 24 hours
          </div>
          <h3>Request the Business Deck</h3>
          <p>
            A structured view of Bangladesh&rsquo;s opportunity&mdash;covering market
            insights, sector focus, and our execution approach.
          </p>
          <PrimerForm />
        </Reveal>
      </div>
    </section>
  );
}

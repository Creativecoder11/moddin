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
          <Reveal as="h2">
            Ready to explore
            <br />
            Bangladesh with <em>more clarity?</em>
          </Reveal>
          <Reveal as="p" delay={1} className="lead">
            Whether you&rsquo;re evaluating market entry, partnerships, or
            investment pathways, Moddin helps you move with the right local context
            and execution support.
          </Reveal>
          <Reveal delay={2} className="cta-ctas">
            <a href="mailto:hello@moddin.com" className="btn btn-light">
              Book an Intro Call <span>→</span>
            </a>
            <a href="mailto:hello@moddin.com" className="btn btn-outline">
              Send us a brief
            </a>
          </Reveal>
          <Reveal delay={3} className="second">
            Or send us your brief and we&rsquo;ll point you to the right next step.
          </Reveal>
        </div>

        <Reveal as="aside" delay={1} className="aside">
          <div className="k">
            <i />
            Quick reply · &lt; 24 hrs
          </div>
          <h3>Short on time? Get the one-pager.</h3>
          <p>
            The Moddin primer on Bangladesh market entry — stats, sector highlights,
            and our working model — in a single PDF.
          </p>
          <PrimerForm />
        </Reveal>
      </div>
    </section>
  );
}

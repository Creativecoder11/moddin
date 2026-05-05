"use client";

import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { TextEffect } from "../ui/text-effect";
import { PrimerForm } from "./PrimerForm";

export function FinalCta() {
  return (
    <section id="contact" className="cta">
      <div className="wrap cta-inner">
        <div>
          <Reveal className="eyebrow" style={{ color: "var(--ember)" }}>
            <span>Contact</span>
          </Reveal>
          <SplitText
            tag="h2"
            className="cta-title"
            textAlign="left"
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
          </SplitText>
          <TextEffect as="p" className="lead" per="word" preset="blur" scrollReveal delay={0.1}>
            {"Whether you're evaluating entry, partnerships, or investment, we help you move with the right local context and execution support."}
          </TextEffect>
          <Reveal delay={2} className="cta-ctas">
            <a href="mailto:hello@moddin.com" className="btn btn-light">
              Book a Call <span>→</span>
            </a>
          </Reveal>
        </div>

        <Reveal as="aside" delay={1} className="aside">
          <div className="k">
            <i />
            Response within 24 hours
          </div>
          <TextEffect as="h3" per="word" preset="blur" scrollReveal>
            {"Request the Business Deck"}
          </TextEffect>
          <TextEffect as="p" per="word" preset="blur" scrollReveal delay={0.1}>
            {"A structured view of Bangladesh's opportunity—covering market insights, sector focus, and our execution approach."}
          </TextEffect>
          <PrimerForm />
        </Reveal>
      </div>
    </section>
  );
}

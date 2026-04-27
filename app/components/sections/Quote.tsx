"use client";

import { Reveal } from "../ui/Reveal";
import { TextEffect } from "../ui/text-effect";

export function Quote() {
  return (
    <section className="quote">
      <div className="wrap">
        <div className="quote-grid">
          <Reveal className="quote-mark">&ldquo;</Reveal>
          <div>
            <TextEffect
              as="div"
              className="quote-text"
              per="line"
              preset="blur"
              scrollReveal
              segmentWrapperClassName="block"
            >
              {"Clarity over complexity.\nFewer words, stronger direction—so global partners move from interest to action faster."}
            </TextEffect>
            <Reveal delay={2} className="quote-meta">
              <i /> Our approach · The Moddin way
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

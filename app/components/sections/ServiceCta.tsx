import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { TextEffect } from "../ui/text-effect";

type Props = {
  title: string;
  body: string;
  buttonLabel: string;
};

export function ServiceCta({ title, body, buttonLabel }: Props) {
  return (
    <section className="cta">
      <div className="wrap cta-inner svc-cta__inner">
        <div>
          <Reveal className="eyebrow" style={{ color: "var(--ember)" }}>
            <span>Get Started</span>
          </Reveal>
          <SplitText
            tag="h2"
            className="cta-title"
            textAlign="left"
            style={{
              color: "var(--cream)",
              fontSize: "clamp(28px, 4.2vw, 60px)",
              lineHeight: 1.05,
            }}
          >
            {title}
          </SplitText>
          <TextEffect
            as="p"
            className="lead"
            per="word"
            preset="fade"
            scrollReveal
            delay={0.1}
          >
            {body}
          </TextEffect>
          <Reveal delay={2} className="cta-ctas">
            <a href="mailto:hello@moddin.com" className="btn btn-light">
              {buttonLabel} <span>→</span>
            </a>
            <a href="/#contact" className="btn btn-outline">
              Learn More <span>→</span>
            </a>
          </Reveal>
        </div>

        <Reveal as="aside" delay={1} className="aside">
          <div className="k">
            <i />
            Response within 24 hours
          </div>
          <h3>Ready to move forward?</h3>
          <p>
            Share your objectives and we&apos;ll come back with a structured
            view of how we can support your goals in Bangladesh.
          </p>
          <a
            href="mailto:hello@moddin.com"
            className="btn btn-dark"
            style={{
              background: "var(--ember)",
              color: "var(--ink)",
              width: "100%",
              justifyContent: "center",
            }}
          >
            Contact Us <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

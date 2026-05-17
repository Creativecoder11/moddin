"use client";

import { Reveal } from "../ui/Reveal";
import SplitText from "../ui/SplitText";
import { TextEffect } from "../ui/text-effect";

type Props = {
  title: string;
  body: string;
  buttonLabel: string;
  accent?: string;
};

export function ServiceCta({ title, body, buttonLabel, accent }: Props) {
  return (
    <section
      className="sub-cta"
      style={accent ? { ["--svc-accent" as string]: accent } : undefined}
    >
      <span className="sub-cta__halo" aria-hidden />
      <span className="sub-cta__grain" aria-hidden />

      <div className="wrap sub-cta__inner">
        <div className="sub-cta__copy">
          <Reveal className="sub-cta__eyebrow">
            <span
              className="sub-cta__dot"
              style={{ background: accent ?? "var(--ember)" }}
              aria-hidden
            />
            <span>Get Started</span>
          </Reveal>

          <SplitText
            tag="h2"
            className="sub-cta__title"
            textAlign="left"
            splitType="words"
            from={{ opacity: 0, y: 28 }}
            duration={1}
          >
            {title}
          </SplitText>

          <TextEffect
            as="p"
            className="sub-cta__body"
            per="word"
            preset="fade"
            scrollReveal
            delay={0.1}
          >
            {body}
          </TextEffect>

          <Reveal delay={2} className="sub-cta__sig">
            <span className="sub-cta__sig-line" aria-hidden />
            <span>
              hello<span aria-hidden>@</span>moddin.com · Reply within 24 hours
            </span>
          </Reveal>
        </div>

        <Reveal as="aside" delay={1} className="sub-cta__form-shell">
          <div className="sub-cta__form">
            <div className="sub-cta__form-head">
              <span className="sub-cta__form-k">
                <i />
                Reply within 24 hours
              </span>
              <h3 className="sub-cta__form-title">
                Tell us where you&apos;re headed.
              </h3>
              <p className="sub-cta__form-sub">
                Three lines is plenty—we&apos;ll come back with sequencing,
                stakeholders, and a first 90-day path.
              </p>
            </div>

            <form
              className="sub-cta__form-fields"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "mailto:hello@moddin.com";
              }}
            >
              <div className="sub-cta__row">
                <label className="sub-cta__field">
                  <span>01 — Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="sub-cta__field">
                  <span>02 — Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>
              <label className="sub-cta__field">
                <span>03 — Objective</span>
                <textarea
                  name="message"
                  placeholder="A sentence or two on your objective."
                  rows={3}
                />
              </label>

              <button type="submit" className="sub-cta__submit">
                <span>{buttonLabel}</span>
                <span className="sub-cta__submit-pill" aria-hidden>
                  →
                </span>
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

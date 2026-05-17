import Link from "next/link";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { ServiceHero } from "../components/sections/ServiceHero";
import { ServiceFaq } from "../components/sections/ServiceFaq";
import { ContactForm } from "../components/sections/ContactForm";
import { Reveal } from "../components/ui/Reveal";
import SplitText from "../components/ui/SplitText";
import { TextEffect } from "../components/ui/text-effect";

export const metadata = {
  title: "Contact Us | Moddin",
  description:
    "Get in touch with Moddin to discuss market entry, trade, investment, or institutional access in Bangladesh. Responses within 24 hours.",
};

type InfoCell = { kicker: string; value: string; href?: string; sub: string };

const INFO: InfoCell[] = [
  {
    kicker: "Email",
    value: "hello@moddin.com",
    href: "mailto:hello@moddin.com",
    sub: "For inquiries, briefs, and partnerships.",
  },
  {
    kicker: "Office",
    value: "Gulshan Avenue, Dhaka 1212",
    sub: "Gulshan business district, Bangladesh — meetings by appointment.",
  },
  {
    kicker: "Hours",
    value: "Sun – Thu",
    sub: "9:00 – 18:00 BST (GMT+6). Calls scheduled by request.",
  },
  {
    kicker: "Reply",
    value: "< 24 hours",
    sub: "We acknowledge every inquiry — usually within the same day.",
  },
];

const STEPS = [
  {
    title: "You send a brief.",
    body: "Share your context and what you'd like to explore — even a few lines is enough to start.",
  },
  {
    title: "We come back.",
    body: "Within 24 hours, you'll get a written response, relevant context, and a proposed next step.",
  },
  {
    title: "We map the path.",
    body: "A short call to align on objectives, constraints, and the right level of support.",
  },
] as const;

const PATHS = [
  {
    num: "01",
    label: "Trade",
    title: "Trade & Market expansion",
    body: "Cross-border trade, sourcing alignment, and partner connections across Bangladesh's industrial ecosystem.",
    href: "/trade",
  },
  {
    num: "02",
    label: "Investment",
    title: "Investment & Deal facilitation",
    body: "Opportunity discovery through to deal execution — partnerships, structuring, and market entry.",
    href: "/investment",
  },
  {
    num: "03",
    label: "Branding",
    title: "Country branding & Positioning",
    body: "Investment narratives, sector positioning, and investor-facing communication for Bangladesh.",
    href: "/branding",
  },
  {
    num: "04",
    label: "Policy",
    title: "Policy & Institutional access",
    body: "Regulatory pathways, ministerial access, and institutional coordination for smoother execution.",
    href: "/policy-and-access",
  },
] as const;

const FAQS = [
  {
    question: "What kind of inquiries do you respond to?",
    answer:
      "Market entry questions, sourcing or investment briefs, partner introductions, institutional access, sector research requests, and any structured conversation about operating in or with Bangladesh. If we're not the right fit, we'll say so and point you to who is.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "Almost always within 24 hours of receiving your message, often the same business day. If your inquiry needs a coordinated response across our team, we'll acknowledge it immediately and follow up with substance soon after.",
  },
  {
    question: "Do I need a formal RFP or brief before reaching out?",
    answer:
      "No. A few sentences about your objective and timeline is enough. We'll come back with the right next step — whether that's a short call, a written response, or a structured proposal.",
  },
  {
    question: "Can we meet in person in Dhaka?",
    answer:
      "Yes — we're based in Dhaka and host meetings by appointment in Gulshan. Let us know your dates and we'll find a window. We also travel for engagements where it's useful.",
  },
  {
    question: "Is there a cost to an initial conversation?",
    answer:
      "No. Discovery conversations and scoping discussions are part of how we get aligned. Paid engagements begin once the scope, objectives, and approach are agreed.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-paper">
        {/* HERO — same pattern as other non-home pages */}
        <ServiceHero
          title="Let's start the conversation"
          hero={{
            category: "Contact",
            subhead: "Tell us where you are. We'll come back with the right next step.",
            bg: "var(--ink)",
            accent: "var(--ember)",
          }}
          wireframeVariant="brief"
          image={{
            src: "/bg-bangladesh.webp",
            alt: "Dhaka skyline",
          }}
        />

        {/* INFO STRIP — quad row of essentials */}
        <section className="contact-info" aria-label="Contact details">
          <div className="wrap">
            <div className="contact-info__grid">
              {INFO.map((cell, i) => (
                <Reveal key={cell.kicker} className="contact-info__cell" delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <span className="contact-info__kicker">{cell.kicker}</span>
                  <p className="contact-info__value">
                    {cell.href ? (
                      <a href={cell.href}>{cell.value}</a>
                    ) : (
                      cell.value
                    )}
                  </p>
                  <span className="contact-info__sub">{cell.sub}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN — form + sidebar */}
        <section className="contact-main" id="form" aria-label="Send a message">
          <div className="wrap">
            <header className="contact-main__head">
              <div>
                <Reveal className="eyebrow">
                  <span>Send a message</span>
                </Reveal>
                <SplitText
                  tag="h2"
                  className="section-title"
                  textAlign="left"
                  style={{ marginTop: 18 }}
                >
                  Tell us about <em>your goal.</em>
                </SplitText>
              </div>
              <TextEffect
                as="p"
                per="word"
                preset="fade"
                scrollReveal
                delay={0.1}
              >
                Drop in a few details — who you are, what you&apos;re exploring, and the rough timing.
                We&apos;ll come back with relevant context and the right next step.
              </TextEffect>
            </header>

            <div className="contact-main__grid">
              <Reveal className="contact-panel" delay={1}>
                <div className="contact-panel__head">
                  <h2>
                    Your <em>message.</em>
                  </h2>
                  <span className="contact-panel__counter">Form · 01 / 01</span>
                </div>
                <ContactForm />
              </Reveal>

              <Reveal as="aside" className="contact-aside" delay={2}>
                <div>
                  <Reveal className="eyebrow">
                    <span>What happens next</span>
                  </Reveal>
                  <h3 style={{ marginTop: 18 }}>
                    A clear path, <em>start to finish.</em>
                  </h3>
                </div>

                <ol className="contact-steps">
                  {STEPS.map((s, i) => (
                    <li key={s.title}>
                      <span className="contact-steps__num">0{i + 1}.</span>
                      <span className="contact-steps__body">
                        <strong>{s.title}</strong>
                        <span>{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="contact-aside__channels">
                  <a className="contact-aside__channel" href="mailto:hello@moddin.com">
                    <span className="contact-aside__channel-label">Email us</span>
                    <span className="contact-aside__channel-value">hello@moddin.com →</span>
                  </a>
                  <a
                    className="contact-aside__channel"
                    href="mailto:hello@moddin.com?subject=Business%20Deck%20Request"
                  >
                    <span className="contact-aside__channel-label">Business deck</span>
                    <span className="contact-aside__channel-value">Request →</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PATHWAYS — quick links into service detail pages */}
        <section className="contact-paths" aria-label="Explore by topic">
          <div className="wrap">
            <header className="contact-paths__head">
              <div>
                <Reveal className="eyebrow">
                  <span>Not sure where to start?</span>
                </Reveal>
                <SplitText
                  tag="h2"
                  className="section-title"
                  textAlign="left"
                  style={{ marginTop: 18 }}
                >
                  Explore by <em>focus area.</em>
                </SplitText>
              </div>
              <TextEffect
                as="p"
                per="word"
                preset="fade"
                scrollReveal
                delay={0.1}
              >
                Each engagement is shaped to context, but most conversations start in one of these four
                areas. Browse what we do, then come back with the brief that fits.
              </TextEffect>
            </header>

            <div className="contact-paths__grid">
              {PATHS.map((p, i) => (
                <Reveal key={p.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <Link href={p.href} className="contact-path">
                    <span className="contact-path__num">{p.num}. {p.label}</span>
                    <h3 className="contact-path__title">{p.title}</h3>
                    <p className="contact-path__body">{p.body}</p>
                    <div className="contact-path__foot">
                      <span className="contact-path__cta">Read more</span>
                      <span className="contact-path__arr" aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M1 7H13M8 2L13 7L8 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — reuse the service FAQ accordion */}
        <ServiceFaq faqs={FAQS} />

        {/* MAP — office location */}
        <section className="contact-map" aria-label="Office location">
          <div className="wrap">
            <header className="contact-map__head">
              <div>
                <Reveal className="eyebrow">
                  <span>Find us</span>
                </Reveal>
                <SplitText
                  tag="h2"
                  className="section-title"
                  textAlign="left"
                  style={{ marginTop: 18 }}
                >
                  Visit us in <em>Dhaka.</em>
                </SplitText>
              </div>
              <TextEffect
                as="p"
                per="word"
                preset="fade"
                scrollReveal
                delay={0.1}
              >
                Meetings by appointment in the Gulshan business district. Let us know your dates
                and we&apos;ll find a window that works.
              </TextEffect>
            </header>

            <div className="contact-map__layout">
              <Reveal className="contact-map__info" delay={1}>
                <span className="eyebrow">
                  <span>Our office</span>
                </span>
                <h3 className="contact-map__addr">
                  Dhaka, <em>Bangladesh</em>
                </h3>
                <p className="contact-map__sub">
                  Set in the Gulshan business district — the diplomatic and corporate heart
                  of the capital. Meetings are hosted by appointment.
                </p>

                <a
                  className="contact-map__dir"
                  href="https://www.google.com/maps/dir/?api=1&destination=23.837439828964076,90.36883026744783"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span>Get directions</span>
                  <span aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7H13M8 2L13 7L8 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </Reveal>

              <Reveal className="contact-map__frame" delay={2}>
                <iframe
                  className="contact-map__iframe"
                  title="Moddin office location, Dhaka"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=90.35883026744783%2C23.832439828964076%2C90.37883026744783%2C23.842439828964076&layer=mapnik&marker=23.837439828964076%2C90.36883026744783"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

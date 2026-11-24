import Link from "next/link";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { ServiceHero } from "../components/sections/ServiceHero";
import { ServiceFaq } from "../components/sections/ServiceFaq";
import { ContactForm } from "../components/sections/ContactForm";
import { DeckRequest } from "../components/sections/DeckRequest";
import { Reveal } from "../components/ui/Reveal";
import SplitText from "../components/ui/SplitText";
import { TextEffect } from "../components/ui/text-effect";
import { BOOKING_LINK, CONTACT, SERVICES } from "@/app/data/site";
import { pageMetadata } from "@/app/data/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Moddin to discuss market entry, trade, investment, or institutional access in Bangladesh. Responses within 24 hours.",
  path: "/contact",
});

type InfoCell = { kicker: string; value: string; href?: string; sub: string };

const INFO: InfoCell[] = [
  {
    kicker: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    sub: "For inquiries, briefs and partnerships.",
  },
  {
    kicker: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    sub: "Sun – Thu, during office hours.",
  },
  {
    kicker: "Office",
    value: CONTACT.officeShort,
    sub: "Meetings by appointment.",
  },
  {
    kicker: "Hours",
    value: CONTACT.hours,
    sub: "Calls scheduled on request.",
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

const FAQS = [
  {
    question: "What kind of inquiries do you respond to?",
    answer:
      "Market entry questions, sourcing or investment briefs, partner introductions, institutional access, sector research requests, and any structured conversation about operating in or with Bangladesh. If we're not the right fit, we'll say so and point you to who is.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "Usually the same business day, always within 24 hours. If your inquiry needs input from across the team, we'll confirm we've received it first and follow up in full shortly after.",
  },
  {
    question: "Do I need a formal RFP or brief before reaching out?",
    answer:
      "No. A few sentences about your objective and timeline is enough. We'll come back with the right next step — whether that's a short call, a written response, or a structured proposal.",
  },
  {
    question: "Can we meet in person in Dhaka?",
    answer:
      "Yes. We meet by appointment at our office in Mirpur DOHS, and we travel for engagements where meeting in person helps.",
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
      <main id="main-content" className="bg-paper">
        {/* HERO — same pattern as other non-home pages */}
        <ServiceHero
          title={<>Let&apos;s start the <em>conversation.</em></>}
          label="Let's start the conversation."
          cta={{ label: "Book a Call", ...BOOKING_LINK }}
          hero={{
            category: "Contact",
            subhead: "Tell us where you are. We'll come back with the right next step.",
            bg: "var(--ink)",
            accent: "var(--ember)",
          }}
          wireframeVariant="brief"
          image={{
            src: "/bg-bangladesh.webp",
            alt: "",
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
                        {i === 2 && (
                          <a className="contact-steps__link" {...BOOKING_LINK}>
                            Book a Call →
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="contact-aside__channels">
                  <a className="contact-aside__channel" href={`mailto:${CONTACT.email}`}>
                    <span className="contact-aside__channel-label">Email us</span>
                    <span className="contact-aside__channel-value">{`${CONTACT.email} →`}</span>
                  </a>
                  <DeckRequest variant="aside" />
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
              {SERVICES.map((s, i) => (
                <Reveal key={s.num} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                  <Link href={s.href} className="contact-path">
                    <span className="contact-path__num">{s.num}. {s.label}</span>
                    <h3 className="contact-path__title">{s.title}</h3>
                    <p className="contact-path__body">{s.body}</p>
                    <div className="contact-path__foot">
                      <span className="contact-path__cta">{`${s.linkLabel} →`}</span>
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
                Meetings are by appointment. Share a few dates and we&apos;ll find a time.
              </TextEffect>
            </header>

            <div className="contact-map__layout">
              <Reveal className="contact-map__info" delay={1}>
                <span className="eyebrow">
                  <span>Our office</span>
                </span>
                <h3 className="contact-map__addr">
                  Mirpur DOHS, <em>Dhaka.</em>
                </h3>
                <p className="contact-map__sub">
                  House 654, Road 09, Ave 04, Dhaka 1216.
                </p>

                <a
                  className="contact-map__dir"
                  href={CONTACT.map.directionsUrl}
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
                  title="Map of the Moddin office in Mirpur DOHS, Dhaka"
                  src={CONTACT.map.embedUrl}
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

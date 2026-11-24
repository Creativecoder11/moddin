import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "../components/chrome/Nav";
import { Footer } from "../components/chrome/Footer";
import { Reveal } from "../components/ui/Reveal";
import { CONTACT } from "@/app/data/site";
import { formatArticleDate } from "@/app/data/insights";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Moddin collects, uses, shares and keeps personal data, and how to exercise your rights.",
  alternates: { canonical: "/privacy" },
};

/** ISO date of the last policy revision. Bump when the policy text changes. */
const LAST_UPDATED = "2026-11-24";

const EMAIL = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;
const CONTACT_PAGE = <Link href="/contact">contact page</Link>;

// LEGAL REVIEW: this copy is a plain-English draft. Every statement describes what the code does
// today (app/actions/leads.ts, lib/mailer.ts, app/contact/page.tsx); re-check it when that changes.
// Typographic quotes are typed directly instead of as &apos;/&quot; entities: an earlier build of
// this page rendered entity-containing list items with the space after </strong> missing (cause not found).
const SECTIONS: readonly { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Moddin helps global companies, investors and institutions enter Bangladesh. This policy
          explains what personal data we collect through this website, why we collect it, who else
          handles it, and the choices you have.
        </p>
        <p>
          Moddin is based in Dhaka, Bangladesh. We decide why and how the data described here is
          used, which makes us its “controller”. You can reach us at {EMAIL} or through our{" "}
          {CONTACT_PAGE}.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <p>
          We collect only what you choose to send us through the forms on this site. You don’t need
          an account to use it.
        </p>
        <ul className="article-ul">
          <li>
            <strong>Contact form.</strong> Your name, email address, company (optional), timeline
            (optional), the type of inquiry you pick, and your message.
          </li>
          <li>
            <strong>Inquiry form on service and article pages.</strong> Your name, email address, a
            message about your objective, the topic of the page it was sent from, and that page’s
            web address.
          </li>
          <li>
            <strong>Business deck request.</strong> Your email address, the time of the request, and
            the web address of the page you made it from.
          </li>
          <li>
            <strong>Booking a call.</strong> If you book a call through an online scheduling
            tool, that provider processes the details you enter under its own policy.
          </li>
        </ul>
        <p>
          Whatever you type in a message field reaches us exactly as written, so please leave out
          anything you wouldn’t want us to hold.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    // LEGAL REVIEW: confirm the legal basis wording (consent plus legitimate interest in running
    // and protecting the site) for the jurisdictions we serve.
    body: (
      <>
        <p>We use what you send us to:</p>
        <ul className="article-ul">
          <li>read and reply to your inquiry, and follow up on it;</li>
          <li>give you access to the business deck, and follow up about Moddin afterwards;</li>
          <li>keep the forms free of spam and abuse.</li>
        </ul>
        <p>
          Each form has a hidden field that real visitors never see; if it is filled in, the
          submission is discarded. The site also counts how often a form is submitted from the same
          IP address over a short window (about ten minutes). That count lives only in the server’s
          memory and is lost when the server restarts. It is not saved to a database or added to the
          emails we receive.
        </p>
        <p>
          We don’t use your details for advertising, and we don’t build profiles from them. We rely
          on your consent, which you give by submitting a form, and on our interest in running and
          protecting the site.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-it-with",
    title: "Who we share it with",
    // LEGAL REVIEW: confirm the hosting provider (not named in the repo), where each processor
    // stores data, and whether international-transfer wording is needed.
    body: (
      <>
        <p>
          We don’t sell your personal data, and we don’t share it for advertising. A few providers
          handle data on our behalf, only to provide their service:
        </p>
        <ul className="article-ul">
          <li>
            <strong>Resend</strong> delivers each form submission to our inbox as an email.
          </li>
          <li>
            <strong>Our hosting provider</strong> runs the website and may log technical request
            data, such as IP address and browser type, to deliver pages and keep the service
            secure.
          </li>
          <li>
            <strong>A scheduling provider</strong>, if you book a call through one, processes the
            booking details you enter.
          </li>
          <li>
            <strong>An internal tracking tool</strong>, if we set one up. Leads such as deck
            requests may also be recorded there, and we will update this policy when that happens.
          </li>
        </ul>
        <p>
          These providers may handle data in countries other than Bangladesh. We may also disclose
          personal data when the law requires it, for example to answer a valid request from a court
          or public authority.
        </p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    // LEGAL REVIEW: 24 months is a proposed retention period, not yet confirmed by Moddin/counsel.
    body: (
      <>
        <p>
          The website itself doesn’t keep a database of what you submit. Your details exist as
          emails in our inbox (and later in any tracking tool above), so those are what we keep.
        </p>
        <ul className="article-ul">
          <li>
            <strong>Inquiry and deck-request emails:</strong> up to 24 months after our last
            correspondence with you, then deleted.
          </li>
          <li>
            <strong>Form-abuse counts:</strong> kept in server memory only, used over a ten-minute
            window, and cleared when the server restarts.
          </li>
        </ul>
        <p>
          We may keep something longer if the law requires it or we need it to deal with a dispute.
          You can also ask us to delete your details sooner (see{" "}
          <a href="#your-rights">Your rights</a>).
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    // LEGAL REVIEW: the 30-day response time is proposed; confirm it and the list of rights that
    // applies to each audience (Bangladesh, UK, EU). No statute sections are cited on purpose.
    body: (
      <>
        <p>You can ask us to:</p>
        <ul className="article-ul">
          <li>tell you what personal data we hold about you and give you a copy (access);</li>
          <li>correct anything that is wrong or out of date (correction);</li>
          <li>delete your personal data (deletion);</li>
          <li>stop using it in a particular way, such as for follow-up emails (objection);</li>
          <li>
            treat your consent as withdrawn at any time. This doesn’t affect what we did before you
            withdrew it.
          </li>
        </ul>
        <p>
          To make a request, email {EMAIL} from the address you used with us and tell us what you
          would like. We may ask you to confirm who you are first. We aim to reply within 30 days.
        </p>
        <p>
          Moddin is based in Bangladesh. If you are in the UK or the EU and are unhappy with how we
          handle your data, you can also complain to your local data protection authority. We would
          welcome the chance to put things right first.
        </p>
      </>
    ),
  },
  {
    id: "cookies-and-analytics",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          This website doesn’t use analytics, advertising trackers or tracking pixels, and it
          doesn’t set cookies or save anything in your browser’s storage.
        </p>
        <ul className="article-ul">
          <li>
            <strong>Fonts</strong> are served from our own site, so loading them doesn’t contact a
            font provider.
          </li>
          <li>
            <strong>Map.</strong> Our {CONTACT_PAGE} embeds a map from OpenStreetMap. When it loads,
            your browser connects to OpenStreetMap, which receives your IP address and browser
            details and handles them under its own policy. The “Get directions” link opens Google
            Maps in a new tab only if you click it, and Google’s policy applies from then.
          </li>
        </ul>
        <p>
          If we add analytics or other third-party tools later, we’ll update this policy first.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. When we do, we’ll post the new version on this
        page and change the “Last updated” date at the top.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Email {EMAIL} or send a message through our {CONTACT_PAGE}. If your request is about your
        rights, tell us which one and the email address you used with us.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="bg-paper">
        {/* HERO — shares the body's grid so the title lines up with the text column */}
        <section className="legal-hero" aria-labelledby="legal-title">
          <div className="wrap legal-grid">
            <div className="legal-hero__body">
              <Reveal className="eyebrow">
                <span className="sub-hero__tab-mark" aria-hidden />
                <span>Legal</span>
              </Reveal>
              <h1 id="legal-title" className="sub-hero__title legal-hero__title">
                Privacy <em>Policy.</em>
              </h1>
              <p className="legal-hero__updated">
                Last updated <time dateTime={LAST_UPDATED}>{formatArticleDate(LAST_UPDATED)}</time>
              </p>
            </div>
          </div>
        </section>

        {/* BODY — sticky TOC left, text right on desktop; TOC stacks above on smaller screens */}
        <section className="article" aria-label="Privacy policy text">
          <div className="wrap legal-grid">
            {/* Same markup and classes as ArticleToc, which hard-codes "In this article". */}
            <aside className="legal-side">
              <nav aria-label="On this page" className="article-toc">
                <span className="article-toc__k">On this page</span>
                <ol>
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>
                        <span className="article-toc__n">{String(i + 1).padStart(2, "0")}</span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="legal-main">
              <div className="legal-prose">
                {SECTIONS.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    className="article-section"
                    aria-labelledby={`${s.id}-title`}
                  >
                    <span className="article-section__n">{String(i + 1).padStart(2, "0")}</span>
                    <h2 id={`${s.id}-title`}>{s.title}</h2>
                    {s.body}
                  </section>
                ))}
              </div>

              {/* CLOSING — privacy questions */}
              <aside className="article-callout legal-contact" aria-label="Privacy questions">
                <span className="article-callout__k">Privacy questions</span>
                <p>Questions about this policy or your personal data? Email {EMAIL}.</p>
                <address className="legal-contact__address">{CONTACT.office}</address>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

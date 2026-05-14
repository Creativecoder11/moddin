"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const INQUIRY_TYPES = [
  { id: "trade", label: "Trade" },
  { id: "investment", label: "Investment" },
  { id: "branding", label: "Branding" },
  { id: "policy", label: "Policy & Access" },
  { id: "general", label: "General" },
] as const;

type InquiryId = (typeof INQUIRY_TYPES)[number]["id"];

type FormState = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const reduce = useReducedMotion();
  const [inquiry, setInquiry] = useState<InquiryId>("general");
  const [data, setData] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // No backend wired — optimistic UX so the page feels responsive.
    await new Promise((r) => setTimeout(r, reduce ? 0 : 450));
    setSubmitting(false);
    setSent(true);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const filled = (k: keyof FormState) => (data[k].length > 0 ? "contact-field--filled" : "");

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <motion.div
          key="sent"
          className="contact-success"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
        >
          <div className="contact-success__check" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3>
            Message <em>received.</em>
          </h3>
          <p>
            Thanks {data.name ? data.name.split(" ")[0] : "for reaching out"} — we&apos;ll come back to you at{" "}
            <strong>{data.email || "your inbox"}</strong> within 24 hours, usually sooner.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ marginTop: 24 }}
            onClick={() => {
              setSent(false);
              setData(EMPTY);
              setInquiry("general");
            }}
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="contact-form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          aria-label="Contact form"
        >
          {/* Inquiry chips */}
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--stone)",
                marginBottom: 12,
              }}
            >
              I&apos;m interested in <span style={{ color: "var(--terracotta)" }}>*</span>
            </legend>
            <div className="contact-chips" role="radiogroup" aria-label="Inquiry type">
              {INQUIRY_TYPES.map((t) => {
                const active = inquiry === t.id;
                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    data-active={active ? "true" : undefined}
                    className="contact-chip"
                    onClick={() => setInquiry(t.id)}
                    whileTap={{ scale: reduce ? 1 : 0.96 }}
                  >
                    {t.label}
                  </motion.button>
                );
              })}
            </div>
          </fieldset>

          <div className="contact-form__row">
            <div className={`contact-field ${filled("name")}`}>
              <label htmlFor="name">
                Full Name <span className="req">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={data.name}
                onChange={onChange}
                placeholder="Jane Doe"
              />
            </div>
            <div className={`contact-field ${filled("email")}`}>
              <label htmlFor="email">
                Email <span className="req">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={data.email}
                onChange={onChange}
                placeholder="jane@company.com"
              />
            </div>
          </div>

          <div className="contact-form__row">
            <div className={`contact-field ${filled("company")}`}>
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={data.company}
                onChange={onChange}
                placeholder="Company Ltd."
              />
            </div>
            <div className={`contact-field ${filled("subject")}`}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={data.subject}
                onChange={onChange}
                placeholder="Briefly, what brings you here?"
              />
            </div>
          </div>

          <div className={`contact-field ${filled("message")}`}>
            <label htmlFor="message">
              Message <span className="req">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={data.message}
              onChange={onChange}
              placeholder="Tell us about your objectives, timing, and where you'd like support."
            />
          </div>

          <p className="contact-fineprint">
            By submitting, you agree we may contact you about your inquiry. We&apos;ll never share your
            details with third parties. See our{" "}
            <a href="/privacy">privacy approach</a>.
          </p>

          <div className="contact-meta">
            <span className="contact-meta__note">Average reply: under 24 hours</span>
            <motion.button
              type="submit"
              className="contact-submit"
              disabled={submitting}
              whileHover={reduce ? undefined : { y: -1 }}
              whileTap={{ scale: reduce ? 1 : 0.98 }}
            >
              {submitting ? "Sending…" : "Send Message"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M1 7H13M8 2L13 7L8 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>

          {/* Hidden field so the consumer of the form data knows which inquiry the user picked */}
          <input type="hidden" name="inquiry" value={inquiry} />
        </motion.form>
      )}
    </AnimatePresence>
  );
}

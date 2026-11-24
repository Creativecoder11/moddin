"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../ui/use-reduced-motion";
import { submitContact } from "@/app/actions/leads";
import { CONTACT } from "@/app/data/site";
import {
  CONTACT_FIELDS,
  FAILURE_LEAD,
  INQUIRY_TYPES,
  LIMITS,
  TIMELINES,
  validateContactField,
  type ContactField,
  type ContactValues,
  type InquiryId,
} from "@/lib/lead-validation";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMPTY: ContactValues = { name: "", email: "", company: "", timeline: "", message: "" };

type Errors = Partial<Record<ContactField, string>>;
type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function FieldError({ field, message }: { field: ContactField; message?: string }) {
  return message ? (
    <p className="contact-field__error" id={`${field}-error`} role="alert">
      {message}
    </p>
  ) : null;
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const [state, formAction, pending] = useActionState(submitContact, null);
  const [inquiry, setInquiry] = useState<InquiryId>("general");
  // Fields stay controlled: React resets the form after every action, and controlled
  // values survive that reset, so a failed send never wipes what the visitor typed.
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const timelineRef = useRef<HTMLSelectElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Server-side field errors (the client check passed but the server disagreed) join the
  // same error state. Adjusting state while rendering avoids an extra effect pass.
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state?.status === "invalid") setErrors(state.fieldErrors);
  }

  // React calls form.reset() after each action. <input>/<textarea> keep their text because React
  // mirrors it into defaultValue, but a controlled <select> would fall back to "Select…". Re-apply it.
  useLayoutEffect(() => {
    if (timelineRef.current) timelineRef.current.value = values.timeline;
  }, [state, values.timeline]);

  const sent = state?.status === "success";
  const failed = state?.status === "error" && !pending;

  const focusField = (field: ContactField) =>
    (formRef.current?.elements.namedItem(field) as HTMLElement | null)?.focus();

  useEffect(() => {
    if (state?.status === "success") successRef.current?.focus();
    if (state?.status === "invalid") {
      const first = CONTACT_FIELDS.find((f) => state.fieldErrors[f]);
      if (first) focusField(first);
    }
  }, [state]);

  const onChange = (e: ChangeEvent<FieldEl>) => {
    const field = e.target.name as ContactField;
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once a field has an error, re-check on every change so it clears the moment it's valid.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateContactField(field, value) }));
    }
  };

  const onBlur = (e: FocusEvent<FieldEl>) => {
    const field = e.target.name as ContactField;
    const message = validateContactField(field, e.target.value);
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  // Runs before React dispatches the action: preventDefault here stops the send.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (pending) {
      e.preventDefault();
      return;
    }
    const next: Errors = {};
    for (const f of CONTACT_FIELDS) next[f] = validateContactField(f, values[f]);
    setErrors(next);
    const firstInvalid = CONTACT_FIELDS.find((f) => next[f]);
    if (firstInvalid) {
      e.preventDefault();
      focusField(firstInvalid);
    }
  };

  const fieldClass = (f: ContactField) =>
    `contact-field${values[f] ? " contact-field--filled" : ""}${errors[f] ? " contact-field--invalid" : ""}`;

  const errorProps = (f: ContactField) =>
    errors[f] ? { "aria-invalid": true as const, "aria-describedby": `${f}-error` } : {};

  const fieldProps = (f: ContactField) => ({
    id: f,
    name: f,
    value: values[f],
    onChange,
    onBlur,
    ...errorProps(f),
  });

  return (
    // Form and success share one grid cell, so the success state can't change the height.
    <div className="contact-stack">
      <form
        ref={formRef}
        className={`contact-form${sent ? " contact-form--sent" : ""}`}
        action={formAction}
        onSubmit={onSubmit}
        noValidate
        inert={sent}
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
          <div className={fieldClass("name")}>
            <label htmlFor="name">
              Full Name <span className="req">*</span>
            </label>
            <input
              {...fieldProps("name")}
              type="text"
              required
              autoComplete="name"
              maxLength={LIMITS.name}
              placeholder="Jane Doe"
            />
            <FieldError field="name" message={errors.name} />
          </div>
          <div className={fieldClass("email")}>
            <label htmlFor="email">
              Email <span className="req">*</span>
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              required
              autoComplete="email"
              maxLength={LIMITS.email}
              placeholder="jane@company.com"
            />
            <FieldError field="email" message={errors.email} />
          </div>
        </div>

        <div className="contact-form__row">
          <div className={fieldClass("company")}>
            <label htmlFor="company">Company</label>
            <input
              {...fieldProps("company")}
              type="text"
              autoComplete="organization"
              maxLength={LIMITS.company}
              placeholder="Company Ltd."
            />
            <FieldError field="company" message={errors.company} />
          </div>
          <div className={fieldClass("timeline")}>
            <label htmlFor="timeline">Timeline</label>
            <select ref={timelineRef} {...fieldProps("timeline")}>
              <option value="">Select…</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FieldError field="timeline" message={errors.timeline} />
          </div>
        </div>

        <div className={fieldClass("message")}>
          <label htmlFor="message">
            Message <span className="req">*</span>
          </label>
          <textarea
            {...fieldProps("message")}
            required
            rows={5}
            maxLength={LIMITS.message}
            placeholder="Tell us about your objectives, timing, and where you'd like support."
          />
          <FieldError field="message" message={errors.message} />
        </div>

        <p className="contact-fineprint">
          We&apos;ll use your details only to respond to your inquiry. We never sell your data. See
          our <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <div className="contact-meta">
          {failed && (
            <p className="contact-form__failure" role="alert">
              {FAILURE_LEAD}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          )}
          <motion.button
            type="submit"
            className="contact-submit"
            disabled={pending}
            aria-busy={pending}
            whileHover={reduce ? undefined : { y: -1 }}
            whileTap={{ scale: reduce ? 1 : 0.98 }}
          >
            {pending ? "Sending…" : "Send Message"}
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

        {/* Which inquiry chip is active, for the server action */}
        <input type="hidden" name="inquiry" value={inquiry} />

        {/* Honeypot: real visitors never see or fill this. */}
        <div className="hp-field" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
      </form>

      {sent && (
        <motion.div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="contact-success"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
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
          <p className="contact-success__msg">
            Thanks, we&apos;ve got your message. Expect a reply within one business day.
          </p>
        </motion.div>
      )}
    </div>
  );
}

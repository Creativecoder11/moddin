"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { submitContact } from "@/app/actions/leads";
import { CONTACT } from "@/app/data/site";
import {
  FAILURE_LEAD,
  LIMITS,
  validateContactField,
  type ContactField,
  type InquiryId,
} from "@/lib/lead-validation";

// Objective is required, like the contact form's Message: the server rejects an empty one.
const FIELDS = ["name", "email", "message"] as const satisfies readonly ContactField[];
type Field = (typeof FIELDS)[number];
type Errors = Partial<Record<Field, string>>;
type FieldEl = HTMLInputElement | HTMLTextAreaElement;

const EMPTY: Record<Field, string> = { name: "", email: "", message: "" };

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p className="sub-cta__error" id={id} role="alert">
      {message}
    </p>
  ) : null;
}

type Props = {
  inquiry: InquiryId;
  buttonLabel: string;
};

/** Lead form for service pages and articles; same flow and server action as ContactForm. */
export function ServiceCtaForm({ inquiry, buttonLabel }: Props) {
  const uid = useId();
  const [state, formAction, pending] = useActionState(submitContact, null);
  // Controlled so a failed send keeps what was typed (React resets the form after every action).
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Server-side field errors join the same error state (adjust state while rendering, no effect pass).
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state?.status === "invalid") setErrors(state.fieldErrors);
  }

  const sent = state?.status === "success";
  const failed = state?.status === "error" && !pending;

  useEffect(() => {
    if (state?.status === "success") successRef.current?.focus();
    if (state?.status === "invalid") {
      const first = FIELDS.find((f) => state.fieldErrors[f]);
      if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
  }, [state]);

  const onChange = (e: ChangeEvent<FieldEl>) => {
    const field = e.target.name as Field;
    const { value } = e.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once a field has an error, re-check on every change so it clears the moment it's valid.
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateContactField(field, value) }));
    }
  };

  const onBlur = (e: FocusEvent<FieldEl>) => {
    const field = e.target.name as Field;
    const message = validateContactField(field, e.target.value);
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  // Runs before React dispatches the action: preventDefault here stops the send,
  // and the page value set here is already in the FormData the action receives.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (pending) {
      e.preventDefault();
      return;
    }
    const next: Errors = {};
    for (const f of FIELDS) next[f] = validateContactField(f, values[f]);
    setErrors(next);
    const firstInvalid = FIELDS.find((f) => next[f]);
    if (firstInvalid) {
      e.preventDefault();
      (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    if (pageRef.current) pageRef.current.value = window.location.href;
  };

  const errorId = (f: Field) => `${uid}-${f}-error`;
  const fieldClass = (f: Field) =>
    `sub-cta__field${errors[f] ? " sub-cta__field--invalid" : ""}`;
  const fieldProps = (f: Field) => ({
    id: `${uid}-${f}`,
    name: f,
    value: values[f],
    required: true,
    onChange,
    onBlur,
    ...(errors[f] ? { "aria-invalid": true as const, "aria-describedby": errorId(f) } : {}),
  });

  return (
    // Form and success share one grid cell, so the success state can't change the height.
    <div className="contact-stack">
      <form
        ref={formRef}
        className={`sub-cta__form-fields${sent ? " contact-form--sent" : ""}`}
        action={formAction}
        onSubmit={onSubmit}
        noValidate
        inert={sent}
      >
        <div className="sub-cta__row">
          <div className={fieldClass("name")}>
            <label htmlFor={`${uid}-name`}>
              <span>01 — Name</span>
            </label>
            <input
              {...fieldProps("name")}
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name}
              placeholder="Your name"
            />
            <FieldError id={errorId("name")} message={errors.name} />
          </div>
          <div className={fieldClass("email")}>
            <label htmlFor={`${uid}-email`}>
              <span>02 — Email</span>
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              maxLength={LIMITS.email}
              placeholder="you@company.com"
            />
            <FieldError id={errorId("email")} message={errors.email} />
          </div>
        </div>

        <div className={fieldClass("message")}>
          <label htmlFor={`${uid}-message`}>
            <span>03 — Objective</span>
          </label>
          <textarea
            {...fieldProps("message")}
            rows={3}
            maxLength={LIMITS.message}
            placeholder="A sentence or two on your objective."
          />
          <FieldError id={errorId("message")} message={errors.message} />
        </div>

        <p className="sub-cta__consent">
          We&apos;ll use your details only to respond to your inquiry. We never sell your data. See
          our <Link href="/privacy">Privacy Policy</Link>.
        </p>

        {failed && (
          <p className="sub-cta__failure" role="alert">
            {FAILURE_LEAD}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        )}

        <button type="submit" className="sub-cta__submit" disabled={pending} aria-busy={pending}>
          <span>{pending ? "Sending…" : buttonLabel}</span>
          <span className="sub-cta__submit-pill" aria-hidden>
            →
          </span>
        </button>

        <input type="hidden" name="inquiry" value={inquiry} />
        <input ref={pageRef} type="hidden" name="page" defaultValue="" />

        {/* Honeypot: real visitors never see or fill this. */}
        <div className="hp-field" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>
      </form>

      {sent && (
        <div ref={successRef} tabIndex={-1} role="status" className="sub-cta__success">
          <span className="sub-cta__success-check" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l4.5 4.5L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>Thanks, we&apos;ve got your message. Expect a reply within one business day.</p>
        </div>
      )}
    </div>
  );
}

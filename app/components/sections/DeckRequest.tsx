"use client";

import Link from "next/link";
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { requestDeck } from "@/app/actions/leads";
import { CONTACT } from "@/app/data/site";
import { FAILURE_LEAD, LIMITS, validateEmail } from "@/lib/lead-validation";

type Props = {
  /** "cta" = dark homepage Contact card; "aside" = contact-page sidebar slot. */
  variant: "cta" | "aside";
};

/**
 * Email-gated Business Deck request. The parent renders the title and description;
 * this is the form plus its states. Every state keeps the same height: the form
 * stays mounted (inert) beside the download link, and the message line reserves
 * room for the longest message.
 */
export function DeckRequest({ variant }: Props) {
  const uid = useId();
  const inputId = `${uid}-email`;
  const noteId = `${uid}-note`;

  const [state, formAction, pending] = useActionState(requestDeck, null);
  // Controlled so a failed send keeps the typed address (React resets the form after each action).
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Server-side email error joins the same error state (adjust state while rendering, no effect pass).
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state?.status === "invalid") setEmailError(state.fieldErrors.email);
  }

  const done = state?.status === "success";
  const failed = state?.status === "error" && !pending;

  // The form goes inert on success, so hand focus to the download link; on a server-side
  // rejection put it back on the field.
  useEffect(() => {
    if (state?.status === "success") linkRef.current?.focus();
    if (state?.status === "invalid") inputRef.current?.focus();
  }, [state]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  // Runs before React dispatches the action: preventDefault here stops the send,
  // and the page value set here is already in the FormData the action receives.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (pending) {
      e.preventDefault();
      return;
    }
    const error = validateEmail(email);
    setEmailError(error);
    if (error) {
      e.preventDefault();
      inputRef.current?.focus();
      return;
    }
    if (pageRef.current) pageRef.current.value = window.location.href;
  };

  const mailto = `mailto:${CONTACT.email}`;
  const note = emailError ? (
    emailError
  ) : failed ? (
    <>
      {FAILURE_LEAD}
      <a href={mailto}>{CONTACT.email}</a>.
    </>
  ) : done ? (
    "Thanks, your copy is ready."
  ) : null;

  return (
    <div className={`deck-request deck-request--${variant}`}>
      <div className="deck-request__stage">
        <form
          className="deck-request__form"
          action={formAction}
          onSubmit={onSubmit}
          noValidate
          inert={done}
        >
          <label className="deck-request__label" htmlFor={inputId}>
            Work email
          </label>
          <div className="form deck-request__row">
            <input
              ref={inputRef}
              id={inputId}
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={LIMITS.email}
              placeholder="you@company.com"
              value={email}
              onChange={onChange}
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? noteId : undefined}
            />
            <button type="submit" disabled={pending} aria-busy={pending}>
              {pending ? "Sending…" : "Request the deck"}
            </button>
          </div>

          {/* Honeypot: real visitors never see or fill these. */}
          <div className="hp-field" aria-hidden="true">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
            </label>
          </div>
          <input ref={pageRef} type="hidden" name="page" defaultValue="" />
        </form>

        {done && (
          <a ref={linkRef} className="deck-request__download" href={CONTACT.deckUrl} download>
            Download the deck ↓
          </a>
        )}
      </div>

      <div className="deck-request__note">
        <span className="deck-request__note-size" aria-hidden="true">
          {FAILURE_LEAD}
          {CONTACT.email}.
        </span>
        <div
          id={noteId}
          className={`deck-request__msg${emailError || failed ? " is-error" : ""}`}
          aria-live="polite"
        >
          {note}
        </div>
      </div>

      <div className="deck-request__consent">
        We&apos;ll only use your email to follow up about Moddin. See our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}

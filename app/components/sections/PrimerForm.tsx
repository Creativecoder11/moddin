"use client";

import { useState, type FormEvent } from "react";

/**
 * "Get the one-pager" email capture in the final CTA.
 * Mirrors the original inline form: optimistic UI, no real backend wired.
 */
export function PrimerForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setEmail("");
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="you@company.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{sent ? "Sent ✓" : "Send"}</button>
    </form>
  );
}

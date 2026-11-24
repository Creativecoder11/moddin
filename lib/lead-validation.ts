import { CONTACT } from "@/app/data/site";

/**
 * Rules shared by the lead server actions (app/actions/leads.ts) and the client
 * forms, so the two can't drift. Lives outside the "use server" file because
 * that file may only export async functions.
 */

export const INQUIRY_TYPES = [
  { id: "trade", label: "Trade" },
  { id: "investment", label: "Investment" },
  { id: "branding", label: "Branding" },
  { id: "policy", label: "Policy & Access" },
  { id: "general", label: "General" },
] as const;

export type InquiryId = (typeof INQUIRY_TYPES)[number]["id"];

export const TIMELINES = [
  "Just exploring",
  "Within 3 months",
  "3–6 months",
  "6+ months",
] as const;

export const LIMITS = { name: 100, email: 254, company: 120, message: 5000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Field order matches the DOM order, so "first invalid" is also the first on screen. */
export const CONTACT_FIELDS = ["name", "email", "company", "timeline", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;

export const FAILURE_LEAD = "Something went wrong. Please try again, or email ";
export const FAILURE_MESSAGE = `${FAILURE_LEAD}${CONTACT.email}.`;

export function validateEmail(raw: string): string | undefined {
  const value = raw.trim();
  return value.length <= LIMITS.email && EMAIL_RE.test(value)
    ? undefined
    : "Enter a valid email address";
}

export function validateContactField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Enter your full name";
      return value.length > LIMITS.name
        ? `Keep your name under ${LIMITS.name} characters`
        : undefined;
    case "email":
      return validateEmail(value);
    case "company":
      return value.length > LIMITS.company
        ? `Keep this under ${LIMITS.company} characters`
        : undefined;
    case "timeline":
      return value && !(TIMELINES as readonly string[]).includes(value)
        ? "Choose one of the listed options"
        : undefined;
    case "message":
      if (!value) return "Tell us a little about your goal";
      return value.length > LIMITS.message
        ? `Keep your message under ${LIMITS.message.toLocaleString("en-US")} characters`
        : undefined;
  }
}

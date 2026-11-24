"use server";

import { headers } from "next/headers";
import { sendMail } from "@/lib/mailer";
import {
  CONTACT_FIELDS,
  FAILURE_MESSAGE,
  INQUIRY_TYPES,
  validateContactField,
  validateEmail,
  type ContactField,
} from "@/lib/lead-validation";

export type LeadResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "invalid"; fieldErrors: Record<string, string> };

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

// shortcut: per-instance in-memory counter. It resets on restart and isn't shared
// across serverless instances; move to a shared store (Upstash/Redis) if abuse shows up.
function isRateLimited(action: string, ip: string): boolean {
  const now = Date.now();
  const key = `${action}:${ip}`;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  const limited = recent.length >= RATE_LIMIT.max;
  if (!limited) recent.push(now);
  hits.set(key, recent);

  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(k);
    }
    // Still over the cap (many live keys): evict oldest-inserted so memory stays bounded.
    for (const k of hits.keys()) {
      if (hits.size <= 1000) break;
      hits.delete(k);
    }
  }
  return limited;
}

// Assumes a platform proxy (e.g. Vercel) sets x-forwarded-for; elsewhere the first entry is client-controlled.
async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

async function deliver(action: string, mail: Parameters<typeof sendMail>[0]): Promise<LeadResult> {
  try {
    if (isRateLimited(action, await clientIp())) {
      return { status: "error", message: FAILURE_MESSAGE };
    }
    await sendMail(mail);
    return { status: "success" };
  } catch (err) {
    console.error(`[leads] ${action} delivery failed`, err);
    return { status: "error", message: FAILURE_MESSAGE };
  }
}

export async function submitContact(
  _prev: LeadResult | null,
  formData: FormData,
): Promise<LeadResult> {
  // Public endpoint: the framework can hand us anything, so check the shape first.
  if (!(formData instanceof FormData)) return { status: "error", message: FAILURE_MESSAGE };
  // Honeypot: bots fill the hidden `website` field; pretend it worked and send nothing.
  if (field(formData, "website")) return { status: "success" };

  const values = Object.fromEntries(
    CONTACT_FIELDS.map((f) => [f, field(formData, f)]),
  ) as Record<ContactField, string>;
  const inquiry = INQUIRY_TYPES.find((t) => t.id === field(formData, "inquiry"));
  // Only the service-page/article CTA form sends `page`; the contact form doesn't, so its email is unchanged.
  const page = field(formData, "page").slice(0, 500);

  const fieldErrors: Record<string, string> = {};
  for (const f of CONTACT_FIELDS) {
    const message = validateContactField(f, values[f]);
    if (message) fieldErrors[f] = message;
  }
  if (!inquiry) fieldErrors.inquiry = "Choose what you're interested in";
  if (!inquiry || Object.keys(fieldErrors).length > 0) {
    return { status: "invalid", fieldErrors };
  }

  return deliver("contact", {
    subject: `Website inquiry (${inquiry.label}): ${values.name}`,
    replyTo: values.email,
    text: [
      `Inquiry: ${inquiry.label}`,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || "—"}`,
      `Timeline: ${values.timeline || "—"}`,
      ...(/^https?:\/\//.test(page) ? [`Page: ${page}`] : []),
      "",
      "Message:",
      values.message,
    ].join("\n"),
  });
}

export async function requestDeck(
  _prev: LeadResult | null,
  formData: FormData,
): Promise<LeadResult> {
  if (!(formData instanceof FormData)) return { status: "error", message: FAILURE_MESSAGE };
  if (field(formData, "website")) return { status: "success" }; // honeypot

  const email = field(formData, "email");
  const emailError = validateEmail(email);
  if (emailError) return { status: "invalid", fieldErrors: { email: emailError } };

  const page = field(formData, "page").slice(0, 500);
  const lead = {
    email,
    timestamp: new Date().toISOString(),
    page: /^https?:\/\//.test(page) ? page : "(unknown)",
  };

  // PENDING INPUT: CRM / sheet destination
  // Forward `lead` there once the Moddin team names one; until then the email below is the only record.

  return deliver("deck", {
    subject: `Business deck request: ${lead.email}`,
    replyTo: lead.email,
    text: [
      `Email: ${lead.email}`,
      `Requested at: ${lead.timestamp}`,
      `Page: ${lead.page}`,
    ].join("\n"),
  });
}

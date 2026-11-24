import { CONTACT } from "@/app/data/site";

type Mail = { subject: string; text: string; replyTo?: string };

/**
 * Sends one plain-text email to CONTACT.email through Resend's REST API.
 * Without RESEND_API_KEY: logs the payload and succeeds in development, throws in
 * production so the form shows its failure state instead of silently losing leads.
 */
export async function sendMail({ subject, text, replyTo }: Mail): Promise<{ ok: true }> {
  const payload = {
    from: process.env.RESEND_FROM ?? "Moddin Website <onboarding@resend.dev>",
    to: [CONTACT.email],
    subject: subject.replace(/\s+/g, " ").trim(),
    text,
    ...(replyTo ? { reply_to: replyTo } : {}),
  };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not set; cannot deliver mail.");
    }
    console.info("[mailer] RESEND_API_KEY not set, skipping send. Payload:", payload);
    return { ok: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
  return { ok: true };
}

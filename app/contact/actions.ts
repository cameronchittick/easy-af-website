"use server";

/**
 * A Server Action runs as a POST against the page that invokes it, and that
 * route is reachable by anyone who can send the same POST. Next.js checks
 * Origin against Host (blocking cross-site submits) and caps bodies at 1MB,
 * but the docs are explicit that framework protections are not a substitute
 * for application-level checks — so everything below is validated server side.
 * https://nextjs.org/docs/app/guides/server-actions#security
 *
 * No zod: three fields do not justify a dependency. Add one when the form grows.
 * No email SDK: an API key in the consumer's first five minutes breaks
 * one-click deploy. A webhook URL works with Slack, Discord, Zapier or a form
 * service and needs zero dependencies.
 */

export type ContactState = { ok: boolean; message: string } | null;

const LIMITS = { name: 100, email: 200, message: 5000 } as const;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a real browser leaves this empty because it is hidden. Bots fill
  // it. Report success so the bot does not learn anything and retry.
  if (formData.get("company")) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill in every field." };
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return { ok: false, message: "That's longer than we can accept." };
  }
  // Deliberately loose: the only way to truly verify an address is to mail it.
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return {
      ok: false,
      message: "Contact form isn't configured yet — set CONTACT_WEBHOOK_URL.",
    };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      // `text` is what Slack and Discord render; the rest is for everything else.
      body: JSON.stringify({
        text: `New contact from ${name} <${email}>\n\n${message}`,
        name,
        email,
        message,
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  return { ok: true, message: "Thanks — we'll be in touch." };
}

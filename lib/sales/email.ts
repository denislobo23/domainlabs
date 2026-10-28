// Sends email through Resend (https://resend.com) using its HTTP API.
// Needs RESEND_API_KEY, and domainlabs.com.au verified in Resend so mail
// can be sent from denis.lobo@domainlabs.com.au.

export const SALES_FROM =
  process.env.SALES_FROM_EMAIL || "Denis Lobo <denis.lobo@domainlabs.com.au>";
export const SALES_NOTIFY =
  process.env.SALES_NOTIFY_EMAIL || "denis.lobo@domainlabs.com.au";
export const SALES_PHONE = process.env.SALES_PHONE || "0433 915 802";

type Email = {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(email: Email): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SALES_FROM,
      to: email.to,
      subject: email.subject,
      text: email.text,
      html: email.html,
      reply_to: email.replyTo,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function siteUrl(request: Request): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  return new URL(request.url).origin;
}

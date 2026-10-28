import { NextResponse } from "next/server";
import { formatAud } from "@/lib/data/domain-sales";
import { formatAbn } from "@/lib/sales/abn";
import { SALES_NOTIFY, SALES_PHONE, escapeHtml, sendEmail } from "@/lib/sales/email";
import { agreementPoints } from "@/lib/sales/terms";
import { readToken } from "@/lib/sales/token";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const signature = typeof body.signature === "string" ? body.signature.trim().slice(0, 120) : "";
  const agreed = body.agreed === true;

  const purchase = readToken(token);
  if (!purchase) {
    return NextResponse.json(
      { error: `This confirmation link has expired or isn't valid. Please call us on ${SALES_PHONE}.` },
      { status: 400 },
    );
  }
  if (!agreed || signature.length < 2) {
    return NextResponse.json(
      { error: "Please tick the box and type your full name to sign." },
      { status: 400 },
    );
  }

  const confirmedAt = new Date();
  const when = confirmedAt.toLocaleString("en-AU", {
    timeZone: "Australia/Melbourne",
    dateStyle: "long",
    timeStyle: "short",
  });
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const points = agreementPoints(purchase);

  const recordText = [
    "PURCHASE AGREEMENT CONFIRMED",
    "",
    `Domain: ${purchase.domain}`,
    `Price: ${formatAud(purchase.price)} + GST`,
    `Buyer: ${purchase.name}`,
    `Business: ${purchase.business}`,
    `ABN: ${formatAbn(purchase.abn)}`,
    `Email: ${purchase.email}`,
    `Mobile: ${purchase.mobile}`,
    "",
    "Agreed to:",
    ...points.map((p, i) => `${i + 1}) ${p}`),
    "",
    `Signed: ${signature}`,
    `Confirmed: ${when} (Melbourne time), ${confirmedAt.toISOString()}`,
    `IP address: ${ip}`,
  ].join("\n");

  const recordHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
      <p><strong>Purchase agreement confirmed</strong></p>
      <p>Domain: ${escapeHtml(purchase.domain)}<br>
      Price: ${formatAud(purchase.price)} + GST<br>
      Buyer: ${escapeHtml(purchase.name)}<br>
      Business: ${escapeHtml(purchase.business)}<br>
      ABN: ${formatAbn(purchase.abn)}<br>
      Email: ${escapeHtml(purchase.email)}<br>
      Mobile: ${escapeHtml(purchase.mobile)}</p>
      <p>Agreed to:</p>
      <ol>${points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ol>
      <p>Signed: <strong>${escapeHtml(signature)}</strong><br>
      Confirmed: ${escapeHtml(when)} (Melbourne time)<br>
      IP address: ${escapeHtml(ip)}</p>
    </div>`;

  try {
    await sendEmail({
      to: SALES_NOTIFY,
      replyTo: purchase.email,
      subject: `CONFIRMED: ${purchase.domain} sold to ${purchase.business}, start the transfer`,
      text: recordText,
      html: recordHtml,
    });

    await sendEmail({
      to: purchase.email,
      replyTo: SALES_NOTIFY,
      subject: `Confirmed: your purchase of ${purchase.domain}`,
      text: [
        `Hi ${purchase.name},`,
        "",
        `Thanks, your purchase of ${purchase.domain} is confirmed. We'll now transfer the domain into ${purchase.business}'s details and send you the EPP code. You'll only receive the invoice once the domain is in your account.`,
        "",
        "A copy of what you agreed to is below for your records.",
        "",
        recordText,
        "",
        `Questions? Call me on ${SALES_PHONE}.`,
        "",
        "Regards,",
        "Denis",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
          <p>Hi ${escapeHtml(purchase.name)},</p>
          <p>Thanks, your purchase of <strong>${escapeHtml(purchase.domain)}</strong> is confirmed. We'll now transfer the domain into ${escapeHtml(purchase.business)}'s details and send you the EPP code. You'll only receive the invoice once the domain is in your account.</p>
          <p>A copy of what you agreed to is below for your records.</p>
        </div>
        ${recordHtml}
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
          <p>Questions? Call me on ${escapeHtml(SALES_PHONE)}.</p>
          <p>Regards,<br>Denis</p>
        </div>`,
    });
  } catch (error) {
    console.error("Confirmation email failed", error);
    return NextResponse.json(
      { error: `We couldn't record your confirmation just now. Please call us on ${SALES_PHONE}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

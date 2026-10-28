import { NextResponse } from "next/server";
import { findDomainSale, formatAud, priceBreakdown } from "@/lib/data/domain-sales";
import { cleanAbn, formatAbn, isValidAbn } from "@/lib/sales/abn";
import {
  SALES_NOTIFY,
  SALES_PHONE,
  escapeHtml,
  sendEmail,
  siteUrl,
} from "@/lib/sales/email";
import { agreementPoints } from "@/lib/sales/terms";
import { createToken, type PurchaseRequest } from "@/lib/sales/token";

export const runtime = "nodejs";

function field(body: Record<string, unknown>, name: string, max = 200): string {
  const value = body[name];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Spam trap filled in: pretend it worked, send nothing.
  if (field(body, "website")) return NextResponse.json({ ok: true });

  const sale = findDomainSale(field(body, "domain"));
  if (!sale || sale.sold) {
    return NextResponse.json({ error: "This domain is no longer available." }, { status: 404 });
  }

  const name = field(body, "name", 120);
  const business = field(body, "business", 160);
  const abn = cleanAbn(field(body, "abn", 40));
  const email = field(body, "email", 200).toLowerCase();
  const mobile = field(body, "mobile", 40);

  if (!name || !business || !email || !mobile) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please check your email address." }, { status: 400 });
  }
  if (!isValidAbn(abn)) {
    return NextResponse.json(
      { error: "That ABN doesn't look right. Please check the 11 digits." },
      { status: 400 },
    );
  }
  if (mobile.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ error: "Please check your mobile number." }, { status: 400 });
  }

  const purchase: PurchaseRequest = {
    domain: sale.domain,
    price: sale.price,
    name,
    business,
    abn,
    email,
    mobile,
    requestedAt: new Date().toISOString(),
  };

  const confirmUrl = `${siteUrl(request)}/confirm?token=${createToken(purchase)}`;
  const points = agreementPoints(purchase);
  const { total } = priceBreakdown(sale.price);

  try {
    await sendEmail({
      to: email,
      replyTo: SALES_NOTIFY,
      subject: `Please confirm your purchase of ${sale.domain}`,
      text: [
        `Hi ${name},`,
        "",
        `Thanks for your interest in ${sale.domain}. To secure it, please confirm the following:`,
        "",
        ...points.map((p, i) => `${i + 1}) ${p}`),
        "",
        `Confirm and sign here: ${confirmUrl}`,
        "",
        "You don't pay anything until the domain is safely in your account.",
        `Questions? Call me on ${SALES_PHONE} or reply to this email.`,
        "",
        "Regards,",
        "Denis",
        "Domain Labs (Netlocal Consulting Pty Ltd, ABN 69 607 380 638)",
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thanks for your interest in <strong>${escapeHtml(sale.domain)}</strong>. To secure it, please confirm the following:</p>
          <ol>${points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ol>
          <p style="margin:28px 0">
            <a href="${confirmUrl}" style="background:#000;color:#fff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:bold">I agree &ndash; confirm purchase</a>
          </p>
          <p>You don't pay anything until the domain is safely in your account.</p>
          <p>Questions? Call me on ${escapeHtml(SALES_PHONE)} or reply to this email.</p>
          <p>Regards,<br>Denis</p>
          <p style="color:#666;font-size:12px">Domain Labs (Netlocal Consulting Pty Ltd, ABN 69 607 380 638)</p>
        </div>`,
    });

    // Heads-up for Denis that someone has started a purchase.
    await sendEmail({
      to: SALES_NOTIFY,
      replyTo: email,
      subject: `Purchase started: ${sale.domain} (${formatAud(total)} inc GST), awaiting confirmation`,
      text: [
        `${name} has asked to buy ${sale.domain}. They have been emailed the agreement and haven't confirmed yet.`,
        "",
        `Business: ${business}`,
        `ABN: ${formatAbn(abn)}`,
        `Email: ${email}`,
        `Mobile: ${mobile}`,
        `Price: ${formatAud(sale.price)} + GST`,
      ].join("\n"),
      html: `<p>${escapeHtml(name)} has asked to buy <strong>${escapeHtml(sale.domain)}</strong>. They have been emailed the agreement and haven't confirmed yet.</p>
        <p>Business: ${escapeHtml(business)}<br>ABN: ${formatAbn(abn)}<br>Email: ${escapeHtml(email)}<br>Mobile: ${escapeHtml(mobile)}<br>Price: ${formatAud(sale.price)} + GST</p>`,
    });
  } catch (error) {
    console.error("Purchase email failed", error);
    return NextResponse.json(
      { error: `We couldn't send the email just now. Please call us on ${SALES_PHONE}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

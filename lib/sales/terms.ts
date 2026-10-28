import { formatAud, priceBreakdown } from "@/lib/data/domain-sales";
import { formatAbn } from "@/lib/sales/abn";
import type { PurchaseRequest } from "@/lib/sales/token";

export const TRANSFER_STEPS = [
  "You provide your ABN and contact details for the Australian domain registry.",
  "We transfer the domain registration into your business's details.",
  "We send you the domain password (also called the EPP code).",
  "You move the domain to your preferred registrar.",
  "Once the domain is safely in your account, we send you the invoice.",
];

// The points the buyer agrees to. Used on the confirm page and in both emails,
// so the wording is always identical.
export function agreementPoints(r: PurchaseRequest): string[] {
  const { price, gst, total } = priceBreakdown(r.price);
  return [
    `I want to purchase the domain ${r.domain}.`,
    `The domain is to be registered to ${r.business}, ABN ${formatAbn(r.abn)}.`,
    `I agree to the price of ${formatAud(price)} + GST (${formatAud(gst)}), ${formatAud(total)} in total.`,
    "I agree to the transfer method described: the domain is transferred to my business first, and I pay the invoice within 7 days of the domain being in my account.",
  ];
}

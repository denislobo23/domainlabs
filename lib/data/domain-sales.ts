// Domains listed for direct sale at domainlabs.com.au/<domain>
//
// To list a domain: add a line below with the domain and price (ex GST).
// To stop selling a domain (e.g. once sold): set sold: true or delete the line.
// "reasons" is optional — leave it out to use the standard three reasons.

export type DomainSale = {
  domain: string; // e.g. "zenna.com.au" (lowercase)
  price: number; // AUD, excluding GST
  sold?: boolean;
  reasons?: string[];
};

export const domainSales: DomainSale[] = [
  { domain: "zenna.com.au", price: 395 },
  { domain: "mypayments.com.au", price: 350 },
  { domain: "dialabin.com.au", price: 450 },
];

export const GST_RATE = 0.1;

export function normaliseDomain(input: string): string {
  return decodeURIComponent(input).trim().toLowerCase().replace(/^www\./, "");
}

export function findDomainSale(input: string): DomainSale | undefined {
  const domain = normaliseDomain(input);
  return domainSales.find((d) => d.domain.toLowerCase() === domain);
}

export function defaultReasons(domain: string): string[] {
  return [
    `Most Australians type .com.au by default, so ${domain} is the address your customers are most likely to try first.`,
    "Owning it means no competitor can ever use it, or trade on a name your customers associate with you.",
    "It doesn't change your current website: we can point it straight at your existing site, so nothing breaks.",
  ];
}

export function formatAud(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function priceBreakdown(price: number) {
  const gst = Math.round(price * GST_RATE * 100) / 100;
  return { price, gst, total: Math.round((price + gst) * 100) / 100 };
}

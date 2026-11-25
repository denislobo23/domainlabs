// Invoices shown at domainlabs.com.au/invoice/<id>
//
// To add an invoice: copy an entry below and change the details.
// Give each new invoice an id ending in a random code (e.g. "-df241323") so the
// link can't be guessed, since the page shows your bank details.

export type InvoiceLine = {
  description: string;
  amount: number; // AUD, excluding GST
};

export type Invoice = {
  id: string; // the part of the link after /invoice/
  number: string; // shown on the invoice and used as the payment reference
  date: string; // e.g. "19 November 2026"
  due: string;
  billTo: string[]; // one line each: business, ABN, attention, email
  lines: InvoiceLine[];
  gst: boolean; // add 10% GST
  pdfBlob?: string; // optional: name of an uploaded PDF in Vercel Blob
};

export const PAYMENT_DETAILS = {
  method: "Bank transfer (EFT)",
  accountName: "Netlocal Consulting Pty Ltd",
  bsb: "033-372",
  accountNumber: "593194",
};

export const invoices: Invoice[] = [
  {
    id: "DOM260828-colouranalysis",
    number: "DOM260828",
    date: "14 October 2026",
    due: "21 October 2026",
    billTo: ["Colour Analysis Studio"],
    lines: [
      {
        description: "ColourAnalysis.com.au domain, website and associated digital assets",
        amount: 2500,
      },
    ],
    gst: true,
    pdfBlob: "DOM260828.pdf",
  },
  {
    id: "DOM261119-waterseal-df241323",
    number: "DOM261119",
    date: "26 November 2026",
    due: "3 December 2026",
    billTo: [
      "Waterseal Waterproofing Pty Ltd",
      "ABN 73 099 002 338",
      "Attn: Leon De Gaye",
      "mail@waterseal.net.au",
    ],
    lines: [
      {
        description: "Domain name waterseal.com.au: transfer of registration to Waterseal Waterproofing Pty Ltd",
        amount: 450,
      },
    ],
    gst: true,
  },
];

export function findInvoice(id: string): Invoice | undefined {
  return invoices.find((inv) => inv.id === id);
}

export function invoiceTotals(invoice: Invoice) {
  const subtotal = invoice.lines.reduce((sum, line) => sum + line.amount, 0);
  const gst = invoice.gst ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  return { subtotal, gst, total: Math.round((subtotal + gst) * 100) / 100 };
}

export function money(amount: number): string {
  return amount.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
  });
}

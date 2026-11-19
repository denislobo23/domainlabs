import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findInvoice, invoiceTotals, money, PAYMENT_DETAILS } from "@/lib/data/invoices";
import PrintButton from "./PrintButton";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export const metadata: Metadata = {
  title: "Tax Invoice | Domain Labs",
  robots: { index: false, follow: false, nocache: true },
};

export default async function InvoicePage({ params }: Props) {
  const { invoiceId } = await params;
  const invoice = findInvoice(invoiceId);
  if (!invoice) notFound();

  const { subtotal, gst, total } = invoiceTotals(invoice);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-sm print:shadow-none">
        <header className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-blue-800">Domain Labs</h1>
          <p>Netlocal Consulting Pty Ltd</p>
          <p>ABN 69 607 380 638</p>
        </header>

        <h2 className="text-2xl font-semibold">Tax Invoice</h2>
        <p>Invoice: {invoice.number}</p>
        <p>Date: {invoice.date}</p>
        <p>Due: {invoice.due}</p>

        <section className="mt-8">
          <h3 className="font-semibold">Bill To</h3>
          {invoice.billTo.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>

        <section className="mt-8 border-y py-5">
          {invoice.lines.map((line) => (
            <div key={line.description} className="flex justify-between gap-6">
              <span>{line.description}</span>
              <span className="whitespace-nowrap">{money(line.amount)}</span>
            </div>
          ))}

          <div className="mt-5 flex justify-between">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>

          {invoice.gst && (
            <div className="mt-2 flex justify-between">
              <span>GST (10%)</span>
              <span>{money(gst)}</span>
            </div>
          )}

          <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold">
            <span>Total AUD</span>
            <span>{money(total)}</span>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-semibold">Payment Details</h3>
          <p>{PAYMENT_DETAILS.method}</p>
          <p>Account: {PAYMENT_DETAILS.accountName}</p>
          <p>BSB: {PAYMENT_DETAILS.bsb}</p>
          <p>Account number: {PAYMENT_DETAILS.accountNumber}</p>
          <p>Reference: {invoice.number}</p>
        </section>

        <div className="print:hidden">
          {invoice.pdfBlob ? (
            <a
              href={`/invoice/${invoice.id}/download`}
              className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Download Invoice PDF
            </a>
          ) : (
            <PrintButton />
          )}
        </div>

        <p className="mt-8 text-sm text-slate-500">Thank you for your business.</p>
      </div>
    </main>
  );
}

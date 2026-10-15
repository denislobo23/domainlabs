
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ invoiceId: string }>;
};

export default async function InvoicePage({ params }: Props) {
  const { invoiceId } = await params;

  if (invoiceId !== "DOM260828-colouranalysis") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-sm">
        <header className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-blue-800">
            Domain Labs
          </h1>
          <p>Netlocal Consulting Pty Ltd</p>
          <p>ABN 69 607 380 638</p>
        </header>

        <h2 className="text-2xl font-semibold">Tax Invoice</h2>
        <p>Invoice: DOM260828</p>
        <p>Date: 14 October 2026</p>
        <p>Due: 21 October 2026</p>

        <section className="mt-8">
          <h3 className="font-semibold">Bill To</h3>
          <p>Colour Analysis Studio</p>
        </section>

        <section className="mt-8 border-y py-5">
          <p>
            ColourAnalysis.com.au domain, website and
            associated digital assets
          </p>

          <div className="mt-5 flex justify-between">
            <span>Subtotal</span>
            <span>$2,500.00</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>GST (10%)</span>
            <span>$250.00</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold">
            <span>Total AUD</span>
            <span>$2,750.00</span>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-semibold">Payment Details</h3>
          <p>Bank transfer (EFT)</p>
          <p>Account: Netlocal Consulting Pty Ltd</p>
          <p>BSB: 033-372</p>
          <p>Account number: 593194</p>
          <p>Reference: DOM260828</p>
        </section>

        <a
          href={`/invoice/${invoiceId}/download`}
          className="mt-8 inline-block rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Download Invoice PDF
        </a>

        <p className="mt-8 text-sm text-slate-500">
          Thank you for your business.
        </p>
      </div>
    </main>
  );
}

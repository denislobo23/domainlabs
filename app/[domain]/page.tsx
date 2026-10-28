import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  defaultReasons,
  findDomainSale,
  formatAud,
  priceBreakdown,
} from "@/lib/data/domain-sales";
import { SALES_PHONE } from "@/lib/sales/email";
import { TRANSFER_STEPS } from "@/lib/sales/terms";
import BuyForm from "./BuyForm";

type Props = {
  params: Promise<{ domain: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const sale = findDomainSale(domain);
  if (!sale) return {};
  return {
    title: `${sale.domain} is available | Domain Labs`,
    description: `Secure ${sale.domain}. No payment until the domain is safely in your account.`,
    robots: { index: false, follow: false },
  };
}

export default async function DomainSalePage({ params }: Props) {
  const { domain } = await params;
  const sale = findDomainSale(domain);
  if (!sale) notFound();

  const { price, gst, total } = priceBreakdown(sale.price);
  const reasons = sale.reasons ?? defaultReasons(sale.domain);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 pt-10 pb-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          {sale.sold ? "Sold" : "Available now"}
        </p>

        <h1 className="break-all text-4xl font-bold tracking-tight sm:text-6xl">
          {sale.domain}
        </h1>

        {sale.sold ? (
          <p className="mt-6 text-lg text-gray-600">
            This domain has been sold. If you&apos;re looking for a similar
            domain, please{" "}
            <Link href="/contact" className="underline">
              get in touch
            </Link>
            .
          </p>
        ) : (
          <>
            <div className="mt-8 rounded-2xl border border-gray-200 p-6">
              <p className="text-4xl font-bold">
                {formatAud(price)}{" "}
                <span className="text-lg font-medium text-gray-500">+ GST</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {formatAud(total)} including GST ({formatAud(gst)}). One-off
                purchase, no ongoing fees to us.
              </p>
              <p className="mt-4 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
                You don&apos;t pay anything until the domain is safely in your
                account.
              </p>
              <a
                href="#buy"
                className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white hover:opacity-90"
              >
                Buy this domain
              </a>
            </div>

            <h2 className="mt-14 text-2xl font-bold">Why this domain</h2>
            <ul className="mt-5 space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3 text-gray-700">
                  <span aria-hidden className="mt-2 h-2 w-2 flex-none rounded-full bg-black" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 text-2xl font-bold">How the transfer works</h2>
            <ol className="mt-5 space-y-4">
              {TRANSFER_STEPS.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-gray-700">{step}</span>
                </li>
              ))}
            </ol>

            <div id="buy" className="mt-14 scroll-mt-6 rounded-2xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold">Buy {sale.domain}</h2>
              <p className="mt-2 text-gray-600">
                Enter your details below. We&apos;ll email you a short
                agreement to confirm, then start the transfer.
              </p>
              <BuyForm domain={sale.domain} />
            </div>
          </>
        )}

        <div className="mt-14 border-t pt-8 text-sm text-gray-600">
          <p className="font-semibold text-black">Questions?</p>
          <p className="mt-1">
            Call Denis Lobo on{" "}
            <a href={`tel:${SALES_PHONE.replace(/\s/g, "")}`} className="underline">
              {SALES_PHONE}
            </a>{" "}
            or email{" "}
            <a href="mailto:denis.lobo@domainlabs.com.au" className="underline">
              denis.lobo@domainlabs.com.au
            </a>
            .
          </p>
          <p className="mt-4">
            Domain Labs is a trading name of Netlocal Consulting Pty Ltd, ABN 69
            607 380 638.
          </p>
        </div>
      </section>
    </main>
  );
}

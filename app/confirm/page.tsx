import type { Metadata } from "next";
import { formatAbn } from "@/lib/sales/abn";
import { SALES_PHONE } from "@/lib/sales/email";
import { agreementPoints } from "@/lib/sales/terms";
import { readToken } from "@/lib/sales/token";
import ConfirmForm from "./ConfirmForm";

export const metadata: Metadata = {
  title: "Confirm your domain purchase | Domain Labs",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ConfirmPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const tokenValue = typeof token === "string" ? token : "";
  const purchase = tokenValue ? readToken(tokenValue) : null;

  if (!purchase) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-2xl px-6 pt-12 pb-20">
          <h1 className="text-3xl font-bold">This link has expired</h1>
          <p className="mt-4 text-gray-600">
            Confirmation links last 14 days. Please call Denis on {SALES_PHONE}{" "}
            or email denis.lobo@domainlabs.com.au and we&apos;ll sort it out.
          </p>
        </section>
      </main>
    );
  }

  const points = agreementPoints(purchase);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-2xl px-6 pt-10 pb-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Purchase agreement
        </p>
        <h1 className="break-all text-3xl font-bold sm:text-4xl">{purchase.domain}</h1>

        <div className="mt-8 rounded-2xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Buyer</p>
          <p className="font-semibold">{purchase.name}</p>
          <p className="text-gray-700">
            {purchase.business}, ABN {formatAbn(purchase.abn)}
          </p>
          <p className="text-gray-700">
            {purchase.email} · {purchase.mobile}
          </p>
        </div>

        <h2 className="mt-10 text-xl font-bold">By signing below, I agree that:</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-gray-800">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>

        <ConfirmForm token={tokenValue} domain={purchase.domain} />
      </section>
    </main>
  );
}

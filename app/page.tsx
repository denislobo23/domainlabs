import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/data/assets";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-0 pb-20">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="relative h-[420px] sm:h-[460px] md:h-[500px]">
            {/* Mobile hero */}
            <Image
              src="/images/brand/hero-mobile.jpg"
              alt="DomainLabs mobile hero"
              fill
              sizes="100vw"
              className="object-cover md:hidden"
              priority
            />

            {/* Desktop hero */}
            <Image
              src="/images/brand/hero.jpg"
              alt="DomainLabs hero"
              fill
              sizes="100vw"
              className="hidden object-cover md:block"
              priority
            />

            {/* Buttons */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto md:bottom-10 md:left-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/view-assets"
                  className="w-full rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:opacity-90 sm:w-auto"
                >
                  View Assets
                </Link>

                <Link
                  href="/contact"
                  className="w-full rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black shadow-lg transition hover:opacity-90 sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ASSETS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Featured Assets
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            High-Value Digital Opportunities
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            A curated selection of premium assets positioned for serious buyers
            and strategic acquisition.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {assets
            .filter((asset) =>
              ["cciv", "finis", "colouranalysis", "adina"].includes(asset.slug)
            )
            .map((asset) => (
              <div
                key={asset.slug}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-32 items-center">
                  {asset.logo ? (
                    <Image
                      src={asset.logo}
                      alt={`${asset.name} logo`}
                      width={300}
                      height={130}
                      className="h-auto max-h-[120px] w-auto object-contain transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-12 w-full items-center justify-center rounded bg-gray-100 text-xs font-semibold text-gray-500">
                      {asset.name}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold tracking-tight">
                  {asset.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{asset.domain}</p>

                <p className="mt-4 flex-grow text-sm leading-6 text-gray-600">
                  {asset.summary}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="inline-flex rounded-full border border-gray-300 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                    {asset.status.replace("-", " ")}
                  </span>

                  <div className="flex items-center gap-4">
                    <a
                      href={asset.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-black transition hover:translate-x-1"
                    >
                      View →
                    </a>

                    <Link
                      href={`/contact?asset=${asset.domain}`}
                      className="text-sm font-semibold text-gray-600 hover:text-black"
                    >
                      Enquire →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6">
          <Link
            href="/view-assets"
            className="inline-block rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            View Assets
          </Link>
        </div>
      </section>

      {/* WHY DOMAINLABS */}
      <section className="mx-auto max-w-7xl px-6 pb-20 -mt-8 md:-mt-12">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Why DomainLabs
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Curated, Commercial, Buyer-Focused
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">Curated, Not Crowded</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We focus on a selective portfolio of digital assets with clear
                commercial upside, not a bloated list of random domains.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Built for Buyers, Not Browsers
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Every asset is positioned to communicate strategic value,
                branding potential, and acquisition relevance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Positioned for Commercial Value
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We combine premium names, strong presentation, and real-world
                buyer logic to create assets that feel valuable and credible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-black px-8 py-12 text-white sm:px-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            View Assets
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
            View our digital assets or get in touch to discuss strategic
            acquisition opportunities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/assets"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              View Assets
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
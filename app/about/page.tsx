import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-950">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            About Domain Labs
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            We develop domains into strategic digital assets.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Domain Labs acquires, develops, and positions premium domain names
            to help businesses attract customers, build trust, and create a
            stronger online presence.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/view-assets"
              className="rounded-full bg-slate-950 px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Our Assets
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-slate-300 px-8 py-4 text-center text-sm font-semibold text-slate-950 transition hover:border-blue-700 hover:text-blue-700"
            >
              Make an Enquiry
            </Link>
          </div>
        </div>
      </section>

      

      {/* WHAT WE DO */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            What We Do
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We treat domains like commercial property. The right domain can
            become a permanent digital location that supports lead generation,
            authority, and long-term brand value.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We select domains with strongly evident commercial intent, develop them into credible online assets, and
            position them for businesses that want a stronger market advantage.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-100 p-8">
          <h3 className="text-xl font-bold">A strong domain helps you:</h3>

          <ul className="mt-6 space-y-4 text-slate-700">
            <li>✓ Attract high-intent customers</li>
            <li>✓ Build trust before the first conversation</li>
            <li>✓ Reduce dependence on paid advertising</li>
            <li>✓ Improve brand authority and recall</li>
            <li>✓ Own a scarce digital position</li>
          </ul>
        </div>
      </section>

      {/* CONVERSION SECTION */}
      <section className="bg-blue-50 px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            A better domain can change how customers see your business.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            If your competitors look more established online, customers notice.
            A premium domain gives your business credibility, clarity, and a
            stronger first impression.
          </p>

          <div className="mt-10">
            <Link
              href="/view-assets"
              className="rounded-full bg-blue-700 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-950"
            >
              Explore Available Domains
            </Link>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight">
          Our Approach
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold">1. Acquire</h3>
            <p className="mt-4 text-slate-600">
              We identify domains with commercial value, search intent, and
              market relevance.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold">2. Develop</h3>
            <p className="mt-4 text-slate-600">
              We create clean, credible microsites that show how each domain can
              be used.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 p-8">
            <h3 className="text-xl font-bold">3. Position</h3>
            <p className="mt-4 text-slate-600">
              We position each asset for businesses that want more visibility,
              credibility, and customer enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* ENQUIRY HOOK */}
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Strategic Asset Enquiry
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Interested in one of our domains?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you want to acquire a premium domain, develop a lead
            generation asset, or improve your online positioning, Domain Labs
            can help you secure the right digital advantage.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-blue-100"
            >
              Contact Domain Labs
            </Link>

            <Link
              href="/assets"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
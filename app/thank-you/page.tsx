import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          DomainLabs
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Thank You — We’ve Received Your Enquiry
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Thanks for reaching out. We’ll review your enquiry and get back to you shortly.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
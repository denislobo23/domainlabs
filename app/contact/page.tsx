"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/xojeejyj", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      router.push("/thank-you");
    } else {
      alert("Sorry, something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Contact
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Get in Touch
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          If you're interested in acquiring a digital asset or discussing a
          strategic opportunity, reach out below.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input type="hidden" name="_subject" value="New DomainLabs Enquiry" />
          <input type="hidden" name="interest" value="General enquiry" />

          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number (optional)"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

          <input
            type="text"
            name="domain_interest"
            placeholder="Which domain or asset are you interested in?"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

          <textarea
            name="message"
            placeholder="Your message"
            required
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-black px-6 py-3 text-white hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
}
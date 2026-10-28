"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

const inputClass = "w-full rounded-lg border border-gray-300 px-4 py-3";

export default function BuyForm({ domain }: { domain: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, domain }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: result.error || "Sorry, something went wrong. Please try again or call us.",
        });
        return;
      }
      setStatus({ kind: "sent", email: String(data.email) });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Sorry, something went wrong. Please try again or call us.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="mt-6 rounded-lg bg-green-50 p-5 text-green-900">
        <p className="font-semibold">Thanks, check your email.</p>
        <p className="mt-1">
          We&apos;ve sent the purchase agreement for {domain} to {status.email}.
          Click the confirm button in that email to secure the domain. If it
          hasn&apos;t arrived in a few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Spam trap: hidden from people, bots tend to fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <input name="name" required placeholder="Your full name" className={inputClass} autoComplete="name" />
      <input name="business" required placeholder="Business name" className={inputClass} autoComplete="organization" />
      <input
        name="abn"
        required
        placeholder="ABN (11 digits)"
        inputMode="numeric"
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className={inputClass}
        autoComplete="email"
      />
      <input
        name="mobile"
        type="tel"
        required
        placeholder="Mobile number"
        className={inputClass}
        autoComplete="tel"
      />

      {status.kind === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{status.message}</p>
      )}

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending..." : "Buy this domain"}
      </button>

      <p className="text-xs text-gray-500">
        Nothing is charged now. You&apos;ll receive an email to confirm the
        purchase, and the invoice is only sent once the domain is in your
        account.
      </p>
    </form>
  );
}

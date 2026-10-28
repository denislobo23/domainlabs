"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

export default function ConfirmForm({ token, domain }: { token: string; domain: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, signature, agreed }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ kind: "error", message: result.error || "Sorry, something went wrong." });
        return;
      }
      setStatus({ kind: "done" });
    } catch {
      setStatus({ kind: "error", message: "Sorry, something went wrong. Please try again." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="mt-10 rounded-lg bg-green-50 p-6 text-green-900">
        <p className="text-lg font-semibold">Thank you, your purchase is confirmed.</p>
        <p className="mt-2">
          We&apos;ve emailed you a copy of the agreement. We&apos;ll now start
          transferring {domain} into your business&apos;s details and will be in
          touch with the EPP code.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-gray-200 p-6">
      <label className="flex gap-3 text-gray-800">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-5 w-5 flex-none"
          required
        />
        <span>I have read and agree to the points above.</span>
      </label>

      <div>
        <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
          Type your full name to sign
        </label>
        <input
          id="signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg"
          autoComplete="name"
        />
      </div>

      {status.kind === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{status.message}</p>
      )}

      <button
        type="submit"
        disabled={status.kind === "sending" || !agreed || signature.trim().length < 2}
        className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {status.kind === "sending" ? "Confirming..." : "I agree, confirm purchase"}
      </button>
    </form>
  );
}

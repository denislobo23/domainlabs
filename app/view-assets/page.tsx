"use client";

import { useState } from "react";
import Image from "next/image";
import { assets } from "@/lib/data/assets";

export default function ViewAssetsPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const correctPassword = "DLPortfolio2026";

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="mx-auto max-w-md px-6 pt-20 pb-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Private Access
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            View Assets
          </h1>

          <p className="mt-4 text-gray-600">
            This page is private. Enter the access password to continue.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === correctPassword) {
                setUnlocked(true);
              } else {
                alert("Incorrect password");
              }
            }}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-6 py-3 text-white"
            >
              Enter
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Private Asset Portfolio
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            View Digital Assets
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            A private portfolio of selected domain-based digital assets.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((asset) => (
            <a
              key={asset.slug}
              href={asset.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex h-32 items-center">
                <Image
                  src={asset.logo}
                  alt={`${asset.name} logo`}
                  width={320}
                  height={140}
                  className="h-auto max-h-[140px] w-auto object-contain"
                />
              </div>

              <h2 className="text-lg font-semibold">{asset.name}</h2>
              <p className="mt-1 text-sm text-gray-500">{asset.domain}</p>

              <p className="mt-3 flex-grow text-sm leading-6 text-gray-600">
                {asset.summary}
              </p>

              <span className="mt-5 inline-block w-fit rounded border border-gray-300 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                {asset.status.replace("-", " ")}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
"use client";

import Header from "@/components/Header";

export default function MoneyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7FB]">
      <Header />
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-slate-400 mb-4">
          Money · Cost of Living
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          Money & Cost of Living
        </h1>
        <p className="mt-6 text-slate-600 max-w-3xl">
          Content will be curated here.
        </p>
      </section>
    </main>
  );
}
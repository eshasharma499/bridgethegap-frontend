"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Destination {
  name: string;
  country: string;
  emoji: string;
  description: string;
  costBreakdown: {
    flight: string;
    stay: string;
    food: string;
    total: string;
  };
  visaInfo: {
    required: boolean;
    type: string;
    duration: string;
    cost: string;
  };
  bestTime: string;
  matchScore: number;
}

interface PlanResult {
  intent: string;
  destinations: Destination[];
  tips: string[];
}

// ─── Example queries ─────────────────────────────────────────────────────────

const EXAMPLES = [
  "I have ₹2 lakh for 7 days, where should I go?",
  "Best solo trip under ₹1.5 lakh for 5 days",
  "Beach destination for 7 days under ₹80,000",
  "Europe trip for 10 days with ₹3 lakh",
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TravelPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState("");

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setSubmitted(q.trim());
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q.trim() }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F7FB]">

      {/* ── PAGE HEADER ── */}
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-slate-400 mb-4">
          AI Planner · Travel
        </p>

        <h1 className="text-4xl font-semibold text-slate-900 leading-tight max-w-3xl">
          Where do you want to go?
        </h1>

        <p className="mt-4 text-lg text-slate-500 max-w-2xl">
          Tell us your budget and duration. Our AI will find the best
          destinations, break down costs, and explain visa requirements.
        </p>
      </section>

      {/* ── SEARCH SECTION ── */}
      <section className="px-10 max-w-6xl mx-auto">

        {/* Search bar */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-2 flex items-center gap-3 focus-within:border-slate-400 transition-all">
          <span className="pl-3 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>

          <input
            className="flex-1 bg-transparent outline-none text-slate-800 text-sm py-3 placeholder-slate-400"
            placeholder="e.g. I have ₹2 lakh for 7 days, where should I go?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          />

          <button
            onClick={() => handleSearch(query)}
            disabled={loading || !query.trim()}
            className="bg-slate-900 text-white text-sm px-6 py-3 rounded-xl hover:bg-slate-700 disabled:opacity-40 transition-all"
          >
            {loading ? "Planning..." : "Plan Trip →"}
          </button>
        </div>

        {/* Example chips */}
        <div className="flex flex-wrap gap-2 mt-4 mb-12">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setQuery(ex); handleSearch(ex); }}
              className="text-xs px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800 transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="px-10 pb-32 max-w-6xl mx-auto">

        {/* Loading skeletons */}
        {loading && (
          <div>
            <p className="text-sm text-slate-400 mb-6 italic">
              Planning your trip for &quot;{submitted}&quot;...
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm space-y-4 animate-pulse">
                  <div className="h-6 bg-slate-100 rounded w-2/3" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-20 bg-slate-100 rounded" />
                  <div className="flex gap-2">
                    <div className="h-14 bg-slate-100 rounded flex-1" />
                    <div className="h-14 bg-slate-100 rounded flex-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div>
            {/* Query echo */}
            <p className="text-sm text-slate-400 mb-2">Results for</p>
            <p className="text-xl font-semibold text-slate-800 mb-8 italic">
              &quot;{submitted}&quot;
            </p>

            {/* Destination cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {result.destinations.map((dest, i) => (
                <DestinationCard key={i} dest={dest} />
              ))}
            </div>

            {/* Tips */}
            {result.tips.length > 0 && (
              <div>
                <p className="uppercase tracking-widest text-xs text-slate-400 mb-4">
                  Travel Intelligence
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.tips.map((tip, i) => (
                    <div key={i}
                      className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-3 shadow-sm">
                      <span className="text-slate-300 mt-0.5">✦</span>
                      <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🌍</p>
            <p className="text-slate-400 text-sm">
              Enter your budget and duration above to get AI-powered travel recommendations.
            </p>
          </div>
        )}

      </section>
    </main>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 transition-all duration-300 p-6 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{dest.emoji}</span>
          <div>
            <h3 className="font-semibold text-slate-900">{dest.name}</h3>
            <p className="text-xs text-slate-400">{dest.country}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 mb-0.5">Match</p>
          <p className="text-lg font-semibold text-slate-700">{dest.matchScore}%</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed">{dest.description}</p>

      {/* Cost breakdown */}
      <div className="bg-slate-50 rounded-xl p-4 space-y-2">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Cost Breakdown</p>
        {[
          { label: "✈ Flight", val: dest.costBreakdown.flight },
          { label: "🏨 Stay", val: dest.costBreakdown.stay },
          { label: "🍽 Food", val: dest.costBreakdown.food },
        ].map(({ label, val }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="text-slate-700">{val}</span>
          </div>
        ))}
        <div className="pt-2 flex justify-between font-semibold text-sm border-t border-slate-200">
          <span className="text-slate-700">Total</span>
          <span className="text-slate-900">{dest.costBreakdown.total}</span>
        </div>
      </div>

      {/* Visa + Best time */}
      <div className="flex gap-2">
        <div className="flex-1 bg-slate-50 rounded-xl p-3">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Visa</p>
          <p className="text-xs font-medium text-slate-700">{dest.visaInfo.type}</p>
          <p className="text-xs text-slate-400 mt-0.5">{dest.visaInfo.cost}</p>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl p-3">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Best Time</p>
          <p className="text-xs font-medium text-slate-700">{dest.bestTime}</p>
        </div>
      </div>

    </div>
  );
}
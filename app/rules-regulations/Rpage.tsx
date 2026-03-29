"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";

const COUNTRIES = [
  "United Kingdom", "Germany", "Canada", "Australia",
  "United States", "Netherlands", "Singapore", "Japan",
  "France", "UAE", "Ireland", "New Zealand",
];

const TOPICS = [
  {
    title: "Immigration & Visa Status",
    slug: "immigration-visa",
    icon: "🛂",
    summary: "Your legal right to enter, stay, and return. What your visa truly allows — and how small violations quietly affect future travel.",
    keyFacts: [
      "Visa validity ≠ permitted stay duration",
      "Entry clearance ≠ compliance completion",
      "Most violations happen after arrival, not at entry",
      "Immigration history compounds — mistakes follow you for years",
    ],
    consequence: "Working 1 extra hour beyond your visa limit can void your entire visa status in Germany.",
  },
  {
    title: "Work & Employment Permissions",
    slug: "work-employment",
    icon: "💼",
    summary: "What you are allowed to earn, and under what conditions. Work permissions, hour limits, freelance rules, and risks of unauthorized work.",
    keyFacts: [
      "UK students: 20 hrs/week during term, full-time in holidays",
      "Germany: 120 full days OR 240 half days per year",
      "Australia: 48 hrs per fortnight on student visa",
      "Freelancing without a work permit = unauthorized work in most countries",
    ],
    consequence: "In Australia, working more than 48 hrs/fortnight results in automatic visa cancellation with no warning.",
  },
  {
    title: "Residence, Registration & ID Laws",
    slug: "residence-registration-id",
    icon: "🏠",
    summary: "What you must register, report, or carry — and when. Address registration, ID rules, renewals, and common documentation gaps.",
    keyFacts: [
      "Germany: Anmeldung (address registration) required within 14 days of arrival",
      "Netherlands: Register at municipality within 5 days",
      "UK: No address registration but National Insurance Number needed for work",
      "UAE: Emirates ID must be obtained within 30 days of visa activation",
    ],
    consequence: "Not registering your address in Germany within 14 days can block you from opening a bank account, getting a SIM card, or enrolling in university.",
  },
  {
    title: "Housing, Rental & Tenant Laws",
    slug: "housing-rental-tenant",
    icon: "🔑",
    summary: "Where you can live, how you can rent, and what protects you. Rental contracts, deposits, subletting, and tenant rights.",
    keyFacts: [
      "UK deposits capped at 5 weeks rent — must be in a government scheme",
      "Germany: Landlords must return deposit within 3-6 months",
      "Canada: 60-90 days notice required for most lease terminations",
      "Australia: Renters have strong legal protections — know them",
    ],
    consequence: "Subletting without landlord permission in the UK can void your tenancy and give your landlord grounds for immediate eviction.",
  },
  {
    title: "Financial, Tax & Banking Compliance",
    slug: "financial-tax-banking",
    icon: "💰",
    summary: "How money is tracked, taxed, and regulated. Tax residency, banking rules, reporting duties, and common financial mistakes.",
    keyFacts: [
      "UK: File Self Assessment if you earn over £1,000 from self-employment",
      "Germany: Tax return filing is often mandatory even for students",
      "Canada: You are a tax resident if you spend 183+ days in Canada",
      "UAE: No income tax, but VAT applies to most goods and services",
    ],
    consequence: "Not filing taxes in Canada in your first year — even with low income — can disqualify you from government benefits and affect your PR application.",
  },
  {
    title: "Healthcare, Insurance & Legal Obligations",
    slug: "healthcare-insurance-legal",
    icon: "🏥",
    summary: "What you are required to have before you need it. Insurance requirements, healthcare access, and medical legal responsibilities.",
    keyFacts: [
      "Germany: Health insurance is mandatory — you cannot enroll in university without it",
      "UK: International students pay NHS surcharge upfront (£776/year)",
      "Australia: OSHC (Overseas Student Health Cover) required for student visa",
      "USA: No mandatory insurance, but hospital bills can exceed Rs 10 lakh for minor emergencies",
    ],
    consequence: "Arriving in Germany without health insurance means you cannot register at the Bürgeramt, cannot open a bank account, and cannot enroll in university.",
  },
];

export default function RulesRegulationsPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const askAI = async (topic: string) => {
    setActiveTopic(topic);
    setAiLoading(true);
    setAiAnswer(null);
    try {
      const res = await fetch("/api/framework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `Explain ${topic} in detail for Indians going abroad. Use the Question → Consequence → Reality framework. Be specific with rules, limits, and real consequences.`,
          country: selectedCountry,
        }),
      });
      const data = await res.json();
      setAiAnswer(data.answer);
    } catch {
      setAiAnswer("Could not load AI response. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F7FB]">
      <Header />

      {/* Hero */}
      <section className="px-8 md:px-16 pt-28 pb-12 max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-xs text-slate-400 mb-3">Foundation · Legal Framework</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight mb-4">
          Rules & Regulations
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mb-8">
          The legal, social, and practical rules you must understand before stepping into a new country.
          Not the brochure version — the real one.
        </p>

        {/* Country filter */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => setSelectedCountry(null)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
              !selectedCountry
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-200 text-slate-500 hover:border-slate-400"
            }`}>
            All Countries
          </button>
          {COUNTRIES.map((c) => (
            <button key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                selectedCountry === c
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-700"
              }`}>
              {c}
            </button>
          ))}
        </div>
        {selectedCountry && (
          <p className="text-xs text-purple-600 mt-1">
            Showing content focused on {selectedCountry}. Click any topic to get AI-powered country-specific details.
          </p>
        )}
      </section>

      {/* Topic cards */}
      <section className="px-8 md:px-16 pb-16 max-w-6xl mx-auto space-y-6">
        {TOPICS.map((topic) => (
          <div key={topic.slug}
            className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden
              hover:border-slate-300 hover:shadow-md transition-all duration-300">

            {/* Card header */}
            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-2xl mt-0.5">{topic.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">{topic.title}</h2>
                    <p className="text-slate-500 leading-relaxed mb-4">{topic.summary}</p>

                    {/* Key facts */}
                    <div className="space-y-1.5 mb-4">
                      {topic.keyFacts.map((fact, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <span className="text-purple-400 mt-0.5 shrink-0">→</span>
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>

                    {/* Consequence callout */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">Real Consequence</p>
                      <p className="text-sm text-amber-800">{topic.consequence}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => askAI(topic.title)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>
                    {selectedCountry ? `Ask AI about ${selectedCountry}` : "Ask AI →"}
                  </button>
                  <Link href={`/rules-regulations/${topic.slug}`}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600
                      border border-slate-200 hover:border-slate-400 transition-all text-center">
                    Full Guide →
                  </Link>
                </div>
              </div>
            </div>

            {/* AI answer panel */}
            {activeTopic === topic.title && (aiLoading || aiAnswer) && (
              <div className="border-t border-slate-100 bg-slate-50 px-8 py-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>B</div>
                  <p className="text-xs font-semibold text-slate-600">
                    BridgeTheGap AI {selectedCountry ? `— ${selectedCountry}` : ""}
                  </p>
                </div>
                {aiLoading ? (
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{aiAnswer}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

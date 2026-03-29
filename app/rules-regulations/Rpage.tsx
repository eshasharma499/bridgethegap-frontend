import Link from "next/link";
import Header from "@/components/Header";

export default function RulesRegulationsPage() {
  const cards = [
    {
      title: "Immigration & Visa Status",
      desc: "Your legal right to enter, stay, and return. Understand what your visa truly allows — and how small violations quietly affect future travel.",
      slug: "immigration-visa",
    },
    {
      title: "Work & Employment Permissions",
      desc: "What you're allowed to earn, and under what conditions. Covers work permissions, hour limits, freelance rules, and risks of unauthorized work.",
      slug: "work-employment",
    },
    {
      title: "Residence, Registration & ID Laws",
      desc: "What you must register, report, or carry — and when. Explains address registration, ID rules, renewals, and common documentation gaps.",
      slug: "residence-registration-id",
    },
    {
      title: "Housing, Rental & Tenant Laws",
      desc: "Where you can live, how you can rent, and what protects you. Covers rental contracts, deposits, subletting, and tenant rights.",
      slug: "housing-rental-tenant",
    },
    {
      title: "Financial, Tax & Banking Compliance",
      desc: "How money is tracked, taxed, and regulated. Understand tax residency, banking rules, reporting duties, and common financial mistakes.",
      slug: "financial-tax-banking",
    },
    {
      title: "Healthcare, Insurance & Legal Obligations",
      desc: "What you're required to have before you need it. Covers insurance requirements, healthcare access, and medical legal responsibilities.",
      slug: "healthcare-insurance-legal",
    },
    {
      title: "Public Conduct, Civil & Local Laws",
      desc: "Everyday rules that differ more than you expect. Covers public behaviour, transport laws, ID requirements, and civil obligations.",
      slug: "public-conduct-civil-laws",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7FB]">
      <Header />

      {/* Hero */}
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-slate-400 mb-3">
          Foundation · Legal Framework
        </p>
        <h1 className="text-5xl font-semibold text-slate-900 leading-tight tracking-tight">
          Rules & Regulations
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-3xl">
          Understand the legal, social, and practical rules you must know
          before stepping into a new country.
        </p>
      </section>

      {/* Cards */}
      <section className="px-10 pb-32 max-w-6xl mx-auto space-y-4">
        {cards.map((card) => (
          <Link
            key={card.slug}
            href={`/rules-regulations/${card.slug}`}
            className="block bg-white rounded-2xl p-10 border-2 border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-slate-900 transition-all duration-300 ease-out"
          >
            <h2 className="text-2xl font-semibold text-slate-900">
              {card.title}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-3xl">
              {card.desc}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
export default function RulesRegulationsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7FB]">
      
      {/* Hero Section */}
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <h1 className="text-5xl font-semibold text-slate-900 leading-tight">
          Rules & Regulations
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-3xl">
          Understand the legal, social, and practical rules you must know
          before stepping into a new country.
        </p>
      </section>

      {/* Content Sections */}
      <section className="px-10 pb-32 max-w-6xl mx-auto space-y-12">

        {/* Section Block */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Immigration & Visa Rules
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {/* Placeholder content */}
            Content will be curated here. This section will explain
            visa types, entry rules, duration limits, and legal obligations.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Work & Employment Regulations
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {/* Placeholder content */}
            Content will be curated here. This section will explain
            work permits, allowed work hours, and restrictions.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Local Laws & Compliance
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {/* Placeholder content */}
            Content will be curated here. This section will explain
            laws that commonly surprise newcomers.
          </p>
        </div>

      </section>
    </main>
  );
}

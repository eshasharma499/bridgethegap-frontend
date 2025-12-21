export default function ImmigrationVisaPage() {
  return (
    <main className="min-h-screen bg-[#F8F7FB]">

      {/* PAGE HEADER */}
      <section className="px-10 py-20 max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-slate-400 mb-4">
          Rules & Regulations · Detail Page
        </p>

        <h1 className="text-4xl font-semibold text-slate-900 leading-tight max-w-4xl">
          Immigration & Visa Status
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-3xl">
          Understand your legal right to enter, stay, and return — and how
          small violations quietly affect future travel.
        </p>
      </section>

      {/* CONTENT */}
      <section className="px-10 pb-32 max-w-6xl mx-auto space-y-16">

        {/* SECTION 1 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            What Immigration & Visa Status Actually Means
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            Immigration status is the legal condition under which a foreign
            national is allowed to enter a country, remain for a defined
            period, and perform specific activities.
          </p>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>How long you may stay</li>
            <li>Whether you may work or study</li>
            <li>Whether you can extend or re-enter</li>
            <li>What actions may invalidate your stay</li>
          </ul>

          <p className="mt-6 italic text-slate-500">
            Most immigration problems happen not at entry — but after arrival.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Visa Purpose & Activity Limits
          </h2>

          <p className="text-slate-600 leading-relaxed mb-6">
            Every visa is issued for a defined purpose. That purpose legally
            limits what you are allowed to do.
          </p>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Study</li>
            <li>Employment</li>
            <li>Job search</li>
            <li>Tourism or short stay</li>
            <li>Business or meetings</li>
            <li>Family or dependent stay</li>
            <li>Research or training</li>
          </ul>

          <p className="mt-6 text-slate-600">
            Doing something useful does not make it legal.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Entry Permission vs Legal Stay
          </h2>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Entry clearance ≠ long-term residence</li>
            <li>Border approval ≠ compliance completion</li>
            <li>Visa validity ≠ permitted stay duration</li>
          </ul>

          <p className="mt-6 italic text-slate-500">
            Legal stay is maintained through compliance, not presence.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Duration, Validity & Overstay Risks
          </h2>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Maximum permitted stay</li>
            <li>Visa expiry vs stay duration</li>
            <li>Extension deadlines</li>
            <li>Exit requirements</li>
          </ul>

          <p className="mt-6 italic text-slate-500">
            Immigration systems remember timelines better than people do.
          </p>
        </div>

        {/* SECTION 5 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Post-Arrival Obligations
          </h2>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Address or residence registration</li>
            <li>Biometric or ID registration</li>
            <li>Immigration office reporting</li>
            <li>Document verification</li>
            <li>Insurance confirmation</li>
          </ul>

          <p className="mt-6 italic text-slate-500">
            Arrival is when legal responsibility begins.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Status Changes & Transitions
          </h2>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Student → Worker</li>
            <li>Tourist → Job seeker</li>
            <li>Dependent → Employed</li>
            <li>Short stay → Long stay</li>
          </ul>

          <p className="mt-6 italic text-slate-500">
            Intent does not replace authorization.
          </p>
        </div>

        {/* SECTION 7 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Re-entry, Travel & Record Impact
          </h2>

          <p className="text-slate-600 leading-relaxed">
            Immigration history compounds over time. Violations may affect
            future visas, border approvals, residence eligibility, and
            settlement options — even years later.
          </p>
        </div>

        {/* SECTION 8 */}
        <div className="bg-white rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Common Assumptions That Cause Trouble
          </h2>

          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>“Nobody checks.”</li>
            <li>“It’s fine for students.”</li>
            <li>“I’ll fix it later.”</li>
            <li>“My friend did the same thing.”</li>
          </ul>
        </div>

        {/* SECTION 9 */}
        <div className="bg-slate-100 rounded-2xl p-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            What This Page Does — and Does Not Do
          </h2>

          <p className="text-slate-600 max-w-4xl">
            This page explains how immigration systems generally work. It helps
            you reduce blind risk and ask the right questions early. It does not
            replace official government guidance or legal advice.
          </p>
        </div>

      </section>
    </main>
  );
}

import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HomeCards from "@/components/HomeCards";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      <Header />
      <HeroSlider />

      {/* ── INTRO ── */}
      <section className="px-8 md:px-16 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-medium">
              Before you move
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900 mb-5">
              Study. Work. Travel.{" "}
              <span className="text-slate-400">
                Understand the world before you step into it.
              </span>
            </h2>
            <div className="h-0.5 w-10 bg-purple-500 rounded-full mb-5" />
            <p className="text-lg leading-relaxed text-slate-500 mb-8">
              BridgeTheGap gives you real knowledge about life abroad —
              visa rules, true costs, work rights, and what people actually
              experience. Not brochure promises.
            </p>
            {/* CTA goes to Travel planner — not repeating Life Abroad 360 */}
            <div className="flex gap-3 flex-wrap">
              <Link href="/travel"
                className="inline-flex items-center gap-2 bg-slate-900 text-white
                  px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 text-sm font-medium">
                Plan a Trip with AI →
              </Link>
              <Link href="/framework"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-600
                  px-6 py-3 rounded-full hover:border-purple-400 hover:text-purple-700 transition-all duration-300 text-sm font-medium">
                Ask a Question
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { number: "6", label: "Core life modules", accent: true },
              { number: "50+", label: "Countries covered", accent: false },
              { number: "Q→C→R", label: "Our knowledge framework", accent: false },
              { number: "AI", label: "Powered by real knowledge", accent: true },
            ].map((stat) => (
              <div key={stat.label}
                className={`rounded-2xl p-6 border ${stat.accent
                  ? "bg-purple-50 border-purple-100"
                  : "bg-slate-50 border-slate-100"
                }`}>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</p>
                <p className="text-xs text-slate-500 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-slate-50 px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Our approach</p>
            <h3 className="text-3xl font-semibold text-slate-900">
              Question → Consequence → Reality
            </h3>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Every answer on BridgeTheGap follows this framework — not just what the rule is,
              but what actually happens in real life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "❓",
                title: "Question",
                desc: "We identify what you're really asking — not just the surface question, but the underlying concern or assumption.",
                color: "border-purple-200 bg-white",
              },
              {
                icon: "⚡",
                title: "Consequence",
                desc: "We tell you what actually happens legally and practically — fines, bans, visa rejections, and real outcomes.",
                color: "border-violet-200 bg-white",
              },
              {
                icon: "✅",
                title: "Reality",
                desc: "We share what real people experience and what you should actually do — based on facts, not hope.",
                color: "border-indigo-200 bg-white",
              },
            ].map((step) => (
              <div key={step.title}
                className={`rounded-2xl border-2 ${step.color} p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300`}>
                <div className="text-2xl mb-3">{step.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 MODULE CARDS + LIFE ABROAD 360 ── */}
      <HomeCards />

      {/* ── TRAVEL PLANNER CTA ── */}
      <section className="px-8 md:px-16 py-16 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#4A1DB0] to-[#2D1580] px-10 py-12
          flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-purple-400/10 rounded-full blur-xl" />
          <div className="relative">
            <p className="text-xs uppercase tracking-widest text-purple-300 mb-2">AI Travel Planner</p>
            <h3 className="text-2xl font-semibold text-white mb-2">
              I have ₹2 lakh. Where can I travel for 7 days?
            </h3>
            <p className="text-purple-200 text-sm max-w-md">
              Tell us your budget and duration. Get real destination recommendations
              with cost breakdowns, visa info, and practical tips.
            </p>
          </div>
          <Link href="/travel"
            className="relative shrink-0 bg-white text-purple-900 font-semibold
              px-8 py-3 rounded-full hover:bg-purple-50 transition-all whitespace-nowrap shadow-lg">
            Try Travel Planner →
          </Link>
        </div>
      </section>
    </main>
  );
}

<h1>TEST CHANGE LIVE</h1>
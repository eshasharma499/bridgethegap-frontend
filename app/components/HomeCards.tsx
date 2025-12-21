"use client";

import Link from "next/link";

export default function HomeCards() {
  const cards = [
  {
    title: "Rules & Regulations",
    desc: "What you are legally allowed to do — and what can get you into trouble.",
    link: "/rules-regulations",
  },
  {
    title: "Money & Cost of Living",
    desc: "Real expenses beyond tuition, rent, and Instagram expectations.",
    link: "/money",
  },
  {
    title: "Life & Culture",
    desc: "Unspoken rules, social behaviour, and daily life realities.",
    link: "/life",
  },
  {
    title: "Study & Education",
    desc: "How education systems actually function — not brochure promises..",
    link: "/study",
  },
  {
    title: "Work & Jobs",
    desc: "Employment rules, job realities, work culture, and expectations abroad..",
    link: "/work",
  },
  {
    title: "Safety & Daily Living",
    desc: "Healthcare, emergencies, and everyday safety essentials.",
    link: "/safety",
  },
];


  return (
    <section className="w-full px-10 py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Section framing */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900">
            Understand life abroad — before you move
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Everything people usually learn too late — explained clearly,
            calmly, and in one place.
          </p>
        </div>

       {/* Cards grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
  {cards.map((card, index) => {
    const CardContent = (
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border-2
          border-black
          bg-white
          p-6
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        {/* Water-fill hover layer */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-[#C08497]
            to-[#9D174D]
            translate-y-full
            group-hover:translate-y-0
            transition-transform
            duration-700
            ease-in-out
          "
        />

        {/* Card content */}
        <div className="relative z-10">
          <h3
            className="
              text-xl
              font-semibold
              mb-3
              text-black
              group-hover:text-white
              transition-colors
              duration-300
            "
          >
            {card.title}
          </h3>

          <p
            className="
              text-slate-700
              group-hover:text-slate-200
              transition-colors
              duration-300
            "
          >
            {card.desc}
          </p>
        </div>
      </div>
    );

    return card.link ? (
      <Link key={index} href={card.link} className="block">
        {CardContent}
      </Link>
    ) : (
      <div key={index}>{CardContent}</div>
    );
  })}
</div>


        {/* LIFE ABROAD 360 — CENTER PANEL */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#5B0F1B] to-[#8B1E2D] px-10 py-14 text-white overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

          <div className="relative max-w-4xl">
            <p className="text-sm uppercase tracking-wide text-white/70 mb-2">
              Core framework
            </p>

            <h3 className="text-3xl font-semibold mb-4">
              Life Abroad 360°
            </h3>

            <p className="text-lg text-white/90 max-w-3xl">
              A complete 360-degree understanding of life in any country —
              covering rules, culture, money, work, safety, and realities
              beyond visas and brochures.
            </p>

            <div className="mt-8">
              <div
                className="
                  group
                  relative
                  inline-block
                  overflow-hidden
                  rounded-full
                  border
                  border-white/50
                  px-6
                  py-3
                  cursor-pointer
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    bg-white
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform
                    duration-700
                    ease-in-out
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    font-medium
                    text-white
                    group-hover:text-[#7A1C28]
                    transition-colors
                    duration-300
                  "
                >
                  Explore framework →
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

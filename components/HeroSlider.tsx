"use client";

import { useEffect, useState } from "react";
import ProgressivePanels from "./ProgressivePanels";
import Link from "next/link";

const slides = [
  {
    text: "Bridge the Gap Between Curiosity and Clarity",
    sub: "Real knowledge about life abroad — before you step into it.",
    bg: "from-[#4A1DB0] to-[#2D1580]",
    badge: "Welcome",
    button: false,
    link: "/framework",
  },
  {
    text: "Learn the unwritten rules before you land.",
    sub: "Visa traps, work limits, cultural norms — all explained clearly.",
    bg: "from-[#0A1A33] to-[#0E2A55]",
    badge: "Rules & Visa",
    button: true,
    link: "/rules-regulations",
  },
  {
    text: "From applications to opportunities — understand what truly awaits you abroad.",
    sub: "Study, work, travel — with eyes wide open.",
    bg: "from-[#3F2AA8] to-[#2B1D7A]",
    badge: "Study Abroad",
    button: true,
    link: "/study",
  },
  {
    text: "Learn from journeys, share yours, and help the next dreamer bridge their gap.",
    sub: "A community built on real experience, not brochure promises.",
    bg: "from-[#5B2DCC] to-[#3F2AA8]",
    badge: "Community",
    button: true,
    link: "/framework",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setVisible(true);
      }, 350);
    }, 4500);
    return () => clearInterval(interval);
  }, [hovered]);

  const goTo = (index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
    }, 350);
  };

  const slide = slides[current];

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative h-[540px] overflow-hidden bg-gradient-to-br ${slide.bg} transition-colors duration-700`}
    >
      <ProgressivePanels />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 grid-cols-1 items-center gap-8">

        {/* LEFT */}
        <div
          className="space-y-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-pulse" />
            <span className="text-xs text-white/70 tracking-widest uppercase">
              {slide.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold leading-tight text-white max-w-lg">
            {slide.text}
          </h1>

          {/* Sub */}
          <p className="text-sm md:text-base text-white/65 max-w-sm leading-relaxed">
            {slide.sub}
          </p>

          {/* CTA */}
          <Link
            href={slide.link}
            className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full
              transition-all duration-200 shadow-lg text-sm w-fit"
            style={{
              background: slide.button ? "white" : "rgba(139,92,246,0.8)",
              color: slide.button ? "#3b0764" : "white",
            }}
          >
            {slide.button ? "Explore →" : "Life Abroad 360° →"}
          </Link>
        </div>

        {/* RIGHT — decorative bars */}
        <div className="relative h-full hidden md:flex items-center justify-end">
          <div className="absolute right-0 top-0 flex h-full gap-3 opacity-60 items-end pb-8">
            {[
              { height: "100%", color: "rgba(236,72,153,0.7)" },
              { height: "78%", color: "rgba(234,179,8,0.7)" },
              { height: "100%", color: "rgba(139,92,246,0.7)" },
              { height: "62%", color: "rgba(249,115,22,0.7)" },
            ].map((bar, i) => (
              <div
                key={i}
                className="w-5 rounded-full"
                style={{
                  height: bar.height,
                  background: bar.color,
                  animation: `btgFloat 3s ease-in-out ${i * 0.3}s infinite alternate`,
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-12 h-[55%] w-[70%] rounded-tl-full bg-white/5 blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
          bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
          flex items-center justify-center text-white text-sm transition-all"
      >
        ❮
      </button>

      {/* Next arrow */}
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full
          bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20
          flex items-center justify-center text-white text-sm transition-all"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? "24px" : "10px",
              height: "10px",
              background: current === i ? "white" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

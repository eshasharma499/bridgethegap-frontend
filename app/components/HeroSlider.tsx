"use client";

import { useEffect, useState } from "react";
import ProgressivePanels from "./ProgressivePanels";


const slides = [
  {
    text: (
      <>
        Bridge the Gap <br />
        Between Curiosity and <br />
        Clarity
      </>
    ),
    bg: "from-[#5B2DCC] to-[#3F2AA8]",
    button: false,
  },
  {
    text: (
      <>
        Learn the unwritten rules <br />
        before you land.
      </>
    ),
    bg: "from-[#0A1A33] to-[#0E2A55]",
    button: true,
  },
  {
    text: (
      <>
        From applications to opportunities — <br />
        understand what truly awaits you abroad.
      </>
    ),
    bg: "from-[#3F2AA8] to-[#2B1D7A]",
    button: true,
  },
  {
    text: (
      <>
        Learn from journeys, share yours, and help <br />
        the next dreamer bridge their gap
      </>
    ),
    bg: "from-[#7B5BE6] to-[#5B3FD9]",
    button: true,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [hovered]);

  return (
    
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative h-[520px] overflow-hidden bg-gradient-to-r ${slides[current].bg} transition-all duration-700`}
    >
        <ProgressivePanels />

      {/* MAIN GRID */}
      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-2 items-center px-12">
        
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <h1
            key={current}
            className="animate-fadeSlide text-5xl font-bold leading-tight text-white"
          >
            {slides[current].text}
          </h1>

          {slides[current].button && (
            <button className="rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white hover:bg-purple-700 transition">
              Learn More
            </button>
          )}
        </div>

        {/* RIGHT DECORATIVE VISUAL */}
        <div className="relative h-full">
          {/* Vertical Bars */}
          <div className="absolute right-0 top-0 flex h-full gap-4 opacity-80">
            <div className="h-full w-6 rounded-full bg-pink-500/70 animate-slowFloat" />
            <div className="h-[85%] w-6 rounded-full bg-yellow-400/70 animate-slowFloat delay-200" />
            <div className="h-full w-6 rounded-full bg-purple-600/70 animate-slowFloat delay-500" />
            <div className="h-[70%] w-6 rounded-full bg-orange-400/70 animate-slowFloat delay-700" />
          </div>

          {/* Soft Wave */}
          <div className="absolute bottom-0 right-0 h-[60%] w-[80%] rounded-tl-full bg-white/10 blur-2xl" />
        </div>
      </div>

      {/* ARROWS (OUTSIDE TEXT ZONE) */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white transition"
      >
        ❮
      </button>

      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 text-4xl text-white/70 hover:text-white transition"
      >
        ❯
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 cursor-pointer rounded-full transition ${
              current === index
                ? "bg-blue-400 scale-110"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

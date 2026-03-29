import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HomeCards from "@/components/HomeCards";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />

      {/* Premium intro / positioning section */}
      <section className="px-10 py-24">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <p className="text-sm uppercase tracking-widest text-slate-400 mb-4">
            Before you move
          </p>

          {/* Main statement */}
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-900">
            Study. Work. Travel. <br />
            Understand the world{" "}
            <span className="text-slate-500">
              before you step into it.
            </span>
          </h2>

          {/* Divider */}
          <div className="mt-6 h-[2px] w-16 bg-slate-300 rounded-full" />

          {/* Supporting explanation */}
          <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-3xl">
            BridgeTheGap helps you understand rules, culture, cost of living,
            and real-life realities of countries — so you can make informed
            decisions before you move, study, work, or travel.
          </p>

        </div>
      </section>

      {/* Cards + Life Abroad 360 section */}
      <HomeCards />
    </main>
  );
}

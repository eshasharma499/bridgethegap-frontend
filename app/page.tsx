import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />

      <section className="px-10 py-20">
        <h2 className="text-3xl font-semibold text-slate-900">
          Study. Work. Travel. Understand the world <br />
          before you step into it.
        </h2>
      </section>
    </main>
  );
}

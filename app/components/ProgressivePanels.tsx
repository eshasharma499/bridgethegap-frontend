"use client";

export default function ProgressivePanels() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      
      {/* Panel 1 */}
      <div className="absolute right-[-5%] top-[-10%] h-[140%] w-[260px] rotate-6 rounded-[120px] bg-white/10 blur-[1px]" />

      {/* Panel 2 */}
      <div className="absolute right-[8%] top-[15%] h-[90%] w-[220px] -rotate-3 rounded-[100px] bg-white/15 blur-[1px]" />

      {/* Panel 3 */}
      <div className="absolute right-[18%] top-[35%] h-[70%] w-[200px] rotate-2 rounded-[90px] bg-white/10 blur-[2px]" />

    </div>
  );
}


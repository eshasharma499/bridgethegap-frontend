"use client";
import { useEffect } from "react";
import { AuthCard, GlobeBackground } from "@/components/Login";

export default function LoginPage() {

  // 💡 Cursor glow movement
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");

    window.addEventListener("mousemove", (e) => {
      if (glow) {
        glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">

      {/* 🌍 Globe */}
      <GlobeBackground />

      {/* 🌌 Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 z-10" />

      {/* 💡 Cursor Glow */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <div
          id="cursor-glow"
          className="absolute w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl mix-blend-overlay"
        />
      </div>

      {/* 🧊 Card */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <AuthCard />
      </div>

    </div>
  );
}
"use client";
import { useState } from "react";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-3xl 
    shadow-[0_0_60px_rgba(255,255,255,0.08)] 
    animate-[pulseGlow_6s_ease-in-out_infinite]
    w-[380px] text-white">

      <h2 className="text-2xl font-semibold mb-2 text-center">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      <p className="text-xs text-gray-400 text-center mb-4">
        Secure access powered by intelligent systems
      </p>

      <div className="flex justify-center gap-6 mb-6 text-sm">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "text-white" : "text-gray-400"}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "text-white" : "text-gray-400"}
        >
          Register
        </button>
      </div>

      {!isLogin && (
        <input
          placeholder="Full Name"
          className="mb-3 w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
        />
      )}

      <input
        placeholder="Email or Phone"
        className="mb-3 w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
      />

      <input
        placeholder="Password"
        type="password"
        className="mb-4 w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
      />

      <button className="bg-white text-black w-full p-3 rounded-lg font-medium hover:bg-gray-200 transition">
        {isLogin ? "Login" : "Register"}
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin
        ? "/api/auth/login"
        : "/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // IMPORTANT
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      // ✅ Save login state (optional)
      localStorage.setItem("btg_user", email);

      // ✅ Redirect to MAIN PAGE (this is your requirement)
      router.push("/");

    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-3xl 
      shadow-[0_0_60px_rgba(255,255,255,0.08)] 
      w-[380px] text-white"
    >
      <h2 className="text-2xl font-semibold mb-2 text-center">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      <p className="text-xs text-gray-400 text-center mb-4">
        Secure access powered by intelligent systems
      </p>

      {/* TOGGLE */}
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

      {/* NAME */}
      {!isLogin && (
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
        />
      )}

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20"
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="bg-white text-black w-full p-3 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </div>
  );
}
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import GlobeBackground from '../../components/Login.tsx/GlobeBackground' // ✅ FIXED PATH

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'username' | 'password'>('username')

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'username' && username.trim()) {
      setStep('password')
      return
    }
    if (step === 'password') {
      localStorage.setItem('btg_user', username)
      router.push('/')
    }
  }

  return (
    <div className="relative min-h-screen bg-[#05050f] flex items-center justify-center px-4 overflow-hidden">

      {/* 🌍 Globe Background */}
      <GlobeBackground />

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-20 w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              B
            </div>
            <span className="text-white font-semibold tracking-wide">BridgeTheGap</span>
          </div>

          <h1 className="text-2xl font-semibold text-white mb-2">
            {step === 'username' ? 'Welcome back' : `Hello, ${username}`}
          </h1>

          <p className="text-white/40 text-sm">
            {step === 'username'
              ? 'Continue where clarity begins.'
              : 'Enter your password to continue.'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-8">
          <form onSubmit={handleContinue} className="space-y-6">

            {step === 'username' ? (
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-3 block">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  placeholder="your_username"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3
                    text-white placeholder-white/20 focus:outline-none focus:border-purple-500
                    transition-all text-sm"
                />
              </div>
            ) : (
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-3 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3
                    text-white placeholder-white/20 focus:outline-none focus:border-purple-500
                    transition-all text-sm"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={step === 'username' ? !username.trim() : !password.trim()}
              className="w-full py-3 rounded-xl font-medium text-white text-sm
                transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              {step === 'username' ? 'Continue →' : 'Sign In →'}
            </button>

            {step === 'password' && (
              <button
                type="button"
                onClick={() => {
                  setStep('username')
                  setPassword('')
                }}
                className="w-full text-center text-xs text-white/30 hover:text-white/60 transition-all"
              >
                ← Back
              </button>
            )}
          </form>
        </div>

        {/* Sign up link */}
        <p className="text-center text-xs text-white/25 mt-6">
          New here?{" "}
          <span className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
            Create an account
          </span>
        </p>

      </div>
    </div>
  )
}
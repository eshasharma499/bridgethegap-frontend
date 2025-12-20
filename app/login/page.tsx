'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { login, isLoggedIn } from '../lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  // If already logged in → go home
  if (typeof window !== 'undefined' && isLoggedIn()) {
    router.replace('/')
    return null
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="border border-white/40 p-[6px] rounded-xl">
        <div className="border border-white/20 rounded-lg px-10 py-12 w-[420px] bg-black">

          <h1 className="text-white text-2xl mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-400 text-sm mb-10">
            Continue where clarity begins.
          </p>

          <form onSubmit={handleLogin} className="space-y-10">
            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 mb-3 block">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/40 py-2 text-white focus:outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-white py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition"
            >
              Continue
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

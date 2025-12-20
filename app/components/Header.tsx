'use client'

import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'

export default function Header() {
  const router = useRouter()

  return (
    <header className="w-full px-8 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">BridgeTheGap</h1>

      <nav className="flex items-center space-x-6 text-sm">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Life Abroad 360</a>
        <a href="#" className="hover:underline">About</a>

        {/* Login Icon */}
        <button
          onClick={() => router.push('/login')}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Login"
        >
          <User size={18} />
        </button>
      </nav>
    </header>
  )
}

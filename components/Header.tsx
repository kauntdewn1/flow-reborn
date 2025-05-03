'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/dgyocpguk/image/upload/v1745797780/logo_horz_verm_ichwjl.png"
              alt="FLOW REBORN"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/dashboard') ? 'text-red-500' : 'text-zinc-300'
              }`}
            >
              Painel
            </Link>
            <Link
              href="/bunker"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/bunker') ? 'text-red-500' : 'text-zinc-300'
              }`}
            >
              Bunker
            </Link>
            <Link
              href="/mentoria"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/mentoria') ? 'text-red-500' : 'text-zinc-300'
              }`}
            >
              Mentoria
            </Link>
            <Link
              href="/profile"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/profile') ? 'text-red-500' : 'text-zinc-300'
              }`}
            >
              Perfil
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-red-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                isActive('/dashboard') ? 'text-red-500' : 'text-zinc-300 hover:text-red-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Painel
            </Link>
            <Link
              href="/bunker"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                isActive('/bunker') ? 'text-red-500' : 'text-zinc-300 hover:text-red-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Bunker
            </Link>
            <Link
              href="/mentoria"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                isActive('/mentoria') ? 'text-red-500' : 'text-zinc-300 hover:text-red-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mentoria
            </Link>
            <Link
              href="/profile"
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                isActive('/profile') ? 'text-red-500' : 'text-zinc-300 hover:text-red-500'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Perfil
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

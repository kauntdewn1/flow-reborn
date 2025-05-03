// app/page.tsx
'use client'

import HeroSection from '@/components/HeroSection'
import SurvivalOffer from '@/components/SurvivalOffer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <SurvivalOffer />
    </main>
  )
}

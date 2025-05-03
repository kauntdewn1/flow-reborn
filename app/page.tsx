// app/page.tsx
'use client';

import HeroSection from '@/components/HeroSection';
import SurvivalOffer from '@/components/SurvivalOffer';
import Testimonials from '@/components/Testimonials';
import WarStats from '@/components/WarStats';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <WarStats />
      <SurvivalOffer />
      <Testimonials />
      <CallToAction />
    </main>
  );
}

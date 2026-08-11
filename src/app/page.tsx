'use client';

import { useState } from 'react';
import { Member } from '@/data/members';
import Hero from '@/components/Hero';
import GamesSection from '@/components/GamesSection';
import TierList from '@/components/TierList';
import BirthdayCalendar from '@/components/BirthdayCalendar';
import MemberModal from '@/components/MemberModal';
import TravelsSection from '@/components/TravelsSection';
import PlacesSection from '@/components/PlacesSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <main className="min-h-screen">
      {/* Navbar Minimalista estilo Japonés */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b-4 border-accent-black px-4 py-2 flex justify-between items-center">
        <span className="anime-text text-xl italic tracking-tighter">
          GURRU<span className="text-accent-red">BOYS</span>
        </span>
        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
          <span className="text-accent-red">SALTA_CAP</span>
          <span className="text-accent-black">ARG_2026</span>
        </div>
      </nav>

      <div className="pt-12">
        <Hero />
        
        <GamesSection />
        
        <section id="members" className="py-20 bg-white">
          <TierList onMemberClick={setSelectedMember} />
          <BirthdayCalendar onMemberClick={setSelectedMember} />
        </section>

        <PlacesSection />

        <TravelsSection />

        <Footer />
      </div>

      <MemberModal 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </main>
  );
}

'use client';

import { Member, members } from '@/data/members';
import { motion } from 'framer-motion';

interface TierListProps {
  onMemberClick: (member: Member) => void;
}

const tiers = [
  { label: 'S', color: 'bg-tier-s', shadow: 'shadow-[#ff4f4f]/50' },
  { label: 'A', color: 'bg-tier-a', shadow: 'shadow-[#ff9f4f]/50' },
  { label: 'B', color: 'bg-tier-b', shadow: 'shadow-[#ffff4f]/50' },
  { label: 'C', color: 'bg-tier-c', shadow: 'shadow-[#4fff4f]/50' },
  { label: 'D', color: 'bg-tier-d', shadow: 'shadow-[#4f9fff]/50' },
  { label: 'Ex', color: 'bg-gray-400', shadow: 'shadow-gray-400/50' },
];

export default function TierList({ onMemberClick }: TierListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      <h2 className="text-4xl anime-text text-accent-black mb-8 text-center bg-accent-gold inline-block px-4 py-2 border-4 border-accent-black -rotate-2 mx-auto block w-fit">
        Gurru-Tier List
      </h2>

      <div className="space-y-2 border-4 border-accent-black bg-accent-black shadow-xl">
        {tiers.map((tier) => (
          <div key={tier.label} className="flex min-h-[100px] group">
            {/* Tier Label */}
            <div className={`w-24 md:w-32 ${tier.color} flex items-center justify-center border-r-4 border-accent-black`}>
              <span className="text-4xl font-black text-black group-hover:scale-125 transition-transform">
                {tier.label}
              </span>
            </div>

            {/* Members in Tier */}
            <div className="flex-1 bg-[#1a1a1a] p-3 flex flex-wrap gap-4 items-center">
              {members
                .filter((m) => m.tier === tier.label)
                .map((member) => (
                  <motion.button
                    key={member.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onMemberClick(member)}
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-accent-black overflow-hidden bg-white shadow-lg transition-all hover:shadow-accent-gold/50"
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
                  </motion.button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs font-mono text-gray-500 mt-4 uppercase">
        * Haz click en un Gurruboy para ver su poder de duelo
      </p>
    </div>
  );
}

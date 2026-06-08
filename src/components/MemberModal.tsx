'use client';

import { Member } from '@/data/members';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MemberModalProps {
  member: Member | null;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  if (!member) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white border-8 border-accent-black overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-accent-red transform rotate-45 translate-x-6 -translate-y-6" />
          
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 p-1 bg-white border-2 border-accent-black hover:bg-accent-red hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            <div className="relative mb-6 group">
              <div className="absolute -inset-2 bg-accent-gold opacity-50 blur group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <img
                src={member.image}
                alt={member.name}
                className="relative w-full aspect-square object-cover border-4 border-accent-black bg-white"
              />
              <div className="absolute bottom-4 left-4 bg-accent-black text-white px-3 py-1 anime-text text-sm">
                Rank: {member.tier}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-3xl anime-text text-accent-red leading-tight">
                  {member.name}
                </h2>
                <p className="text-xl font-bold text-accent-black">
                  aka "{member.nickname}"
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-accent-gold px-2 py-0.5 text-xs font-bold border border-accent-black">
                  BIRTHDAY
                </span>
                <span className="font-mono">{member.birthday}</span>
              </div>

              <div className="bg-gray-100 p-4 border-l-4 border-accent-red italic text-gray-700 leading-relaxed">
                "{member.description}"
              </div>
            </div>
          </div>

          <div className="bg-accent-black p-2 flex justify-end">
            <div className="text-[10px] text-gray-400 font-mono">
              GURRUBOYS // MEMBER_ID_{member.name.toUpperCase()}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

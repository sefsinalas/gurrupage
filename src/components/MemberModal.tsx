'use client';

import { Member } from '@/data/members';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Swords, Zap, ShieldAlert, Award, Cake, Flame, AlertTriangle } from 'lucide-react';

interface MemberModalProps {
  member: Member | null;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  if (!member) return null;

  // Calculate overall power rating
  const validSkills = member.skills || [];
  const totalSkillLevel = validSkills.reduce((acc, curr) => acc + curr.level, 0);
  const avgPower = validSkills.length > 0 ? Math.round(totalSkillLevel / validSkills.length) : 50;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-white border-4 sm:border-8 border-accent-black shadow-[8px_8px_0px_#000] overflow-hidden my-auto"
        >
          {/* Decorative Corner Badge */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent-red transform rotate-45 translate-x-8 -translate-y-8 z-10" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-1.5 bg-white border-2 border-accent-black hover:bg-accent-red hover:text-white transition-colors shadow-[2px_2px_0px_#000]"
            title="Cerrar"
          >
            <X size={20} />
          </button>

          {/* Double Section Layout (2 Columns on MD+) */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y-4 md:divide-y-0 md:divide-x-4 divide-accent-black">
            
            {/* LEFT SECTION: Character Profile Card */}
            <div className="md:col-span-5 p-6 bg-amber-50/40 flex flex-col justify-between space-y-4">
              <div>
                {/* Image Container */}
                <div className="relative mb-4 group">
                  <div className="absolute -inset-2 bg-accent-gold opacity-60 blur-xs group-hover:opacity-100 transition duration-300" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-full aspect-square object-cover border-4 border-accent-black bg-white shadow-[4px_4px_0px_#000]"
                  />
                  <div className="absolute bottom-3 left-3 bg-accent-black text-white px-3 py-1 anime-text text-xs border border-white flex items-center gap-1 shadow-md">
                    <Award size={14} className="text-accent-gold" />
                    RANK: {member.tier}
                  </div>
                </div>

                {/* Name & Nickname */}
                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl anime-text text-accent-red leading-none">
                    {member.name}
                  </h2>
                  <p className="text-lg font-bold text-accent-black font-mono">
                    aka "{member.nickname}"
                  </p>
                </div>

                {/* Birthday Tag */}
                <div className="mt-3 inline-flex items-center gap-2 bg-white px-3 py-1 border-2 border-accent-black shadow-[2px_2px_0px_#000]">
                  <Cake size={16} className="text-accent-red" />
                  <span className="font-mono text-xs font-bold text-gray-800">
                    {member.birthday}
                  </span>
                </div>

                {/* Bio / Description */}
                <div className="mt-4 bg-white p-3.5 border-l-4 border-accent-red border-y-2 border-r-2 border-accent-black text-sm italic text-gray-800 leading-relaxed font-sans shadow-[2px_2px_0px_#000]">
                  "{member.description}"
                </div>
              </div>

              {/* Power Summary Tag */}
              <div className="pt-3 border-t-2 border-dashed border-accent-black flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-gray-600 uppercase">
                  Nivel Promedio
                </span>
                <span className="text-sm font-black font-mono bg-accent-black text-accent-gold px-2 py-0.5 border border-black">
                  PWR {avgPower}
                </span>
              </div>
            </div>

            {/* RIGHT SECTION: Anime / Video Game RPG Stats Tree */}
            <div className="md:col-span-7 p-6 bg-white flex flex-col justify-between space-y-6">
              <div>
                {/* RPG Panel Header */}
                <div className="flex items-center justify-between border-b-4 border-accent-black pb-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Swords className="w-6 h-6 text-accent-red" />
                    <h3 className="text-xl sm:text-2xl font-black anime-text text-accent-black tracking-tight">
                      STATS & HABILIDADES
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold bg-accent-gold text-accent-black px-2 py-1 border-2 border-accent-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                    <Zap size={12} />
                    LVL SYSTEM 0-99
                  </span>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {validSkills.map((skill, index) => {
                    const isNegative = skill.level < 0;
                    const isOverflow = skill.level >= 100 || skill.raw?.includes('+');
                    const levelPercent = isNegative
                      ? Math.min(Math.abs(skill.level), 100)
                      : Math.min(skill.level, 100);

                    // Dynamic bar styling
                    let barBg = 'bg-accent-black';
                    let badgeBg = 'bg-accent-gold text-accent-black';

                    if (isOverflow) {
                      barBg = 'bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 animate-pulse';
                      badgeBg = 'bg-purple-700 text-yellow-300 border-yellow-300';
                    } else if (isNegative) {
                      barBg = 'bg-gradient-to-r from-red-600 to-rose-900 repeating-linear-gradient-45';
                      badgeBg = 'bg-red-600 text-white border-black';
                    } else if (skill.level >= 80) {
                      barBg = 'bg-gradient-to-r from-amber-400 to-yellow-500';
                      badgeBg = 'bg-accent-gold text-accent-black';
                    } else if (skill.level >= 50) {
                      barBg = 'bg-gradient-to-r from-emerald-400 to-green-500';
                      badgeBg = 'bg-emerald-600 text-white';
                    } else if (skill.level > 0) {
                      barBg = 'bg-gradient-to-r from-blue-400 to-cyan-500';
                      badgeBg = 'bg-blue-600 text-white';
                    } else {
                      barBg = 'bg-gray-400';
                      badgeBg = 'bg-gray-800 text-gray-200';
                    }

                    return (
                      <div key={index} className="space-y-1.5">
                        {/* Skill Name & Level Badge */}
                        <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold">
                          <span className="flex items-center gap-1.5 text-accent-black uppercase">
                            {isNegative ? (
                              <AlertTriangle size={14} className="text-red-600 animate-bounce" />
                            ) : isOverflow ? (
                              <Flame size={14} className="text-amber-500 animate-pulse" />
                            ) : (
                              <Zap size={14} className="text-accent-black" />
                            )}
                            {skill.name}
                          </span>

                          <div className="flex items-center gap-2">
                            {isNegative && (
                              <span className="text-[10px] uppercase tracking-wider text-red-600 font-black animate-pulse">
                                DEBUFF
                              </span>
                            )}
                            {isOverflow && (
                              <span className="text-[10px] uppercase tracking-wider text-purple-600 font-black">
                                OVERFLOW
                              </span>
                            )}
                            <span className={`px-2 py-0.5 text-xs font-black border-2 border-accent-black shadow-[1.5px_1.5px_0px_#000] ${badgeBg}`}>
                              {isNegative
                                ? `LV. ${skill.level}`
                                : isOverflow
                                ? `LV. ${skill.raw || '99+'}`
                                : `LV. ${skill.level}`}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="relative h-4 w-full bg-gray-100 border-2 border-accent-black overflow-hidden shadow-[2px_2px_0px_#000]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${levelPercent}%` }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`h-full ${barBg} border-r-2 border-accent-black`}
                          />
                          {/* Grid Lines inside bar */}
                          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none opacity-20 divide-x divide-black" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-4 border-t-2 border-accent-black flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span>GURRUBOYS // RPG CHARACTER SHEET</span>
                <span className="text-accent-red font-bold uppercase">SALTACAP_2026</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

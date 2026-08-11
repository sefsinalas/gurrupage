'use client';

import { useState } from 'react';
import { Member, members } from '@/data/members';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, ChevronLeft, ChevronRight, Sparkles, X, User } from 'lucide-react';

interface BirthdayCalendarProps {
  onMemberClick?: (member: Member) => void;
}

const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const MONTH_MAP: Record<string, number> = {
  ene: 0, enero: 0,
  feb: 1, febrero: 1,
  mar: 2, marzo: 2,
  abr: 3, abril: 3,
  may: 4, mayo: 4,
  jun: 5, junio: 5,
  jul: 6, julio: 6,
  ago: 7, agosto: 7,
  sep: 8, sept: 8, septiembre: 8, setiembre: 8,
  oct: 9, octubre: 9,
  nov: 10, noviembre: 10,
  dic: 11, diciembre: 11,
};

export function parseBirthday(bdayStr: string): { day: number; month: number } | null {
  if (!bdayStr || bdayStr.toLowerCase().includes('confirmar')) return null;

  const cleanStr = bdayStr.split('-')[0].trim().toLowerCase();
  const parts = cleanStr.split(/\s+de\s+/);
  if (parts.length < 2) return null;

  const day = parseInt(parts[0], 10);
  const monthKey = parts[1].trim();

  const month = MONTH_MAP[monthKey];
  if (isNaN(day) || month === undefined) return null;

  return { day, month };
}

// Tier colors for dots & badges
const TIER_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  S: { bg: 'bg-[#ff7f7f]', border: 'border-[#c0392b]', text: 'text-[#8b0000]' },
  A: { bg: 'bg-[#ffbf7f]', border: 'border-[#d35400]', text: 'text-[#8b4500]' },
  B: { bg: 'bg-[#ffff7f]', border: 'border-[#f1c40f]', text: 'text-[#8b8b00]' },
  C: { bg: 'bg-[#7fff7f]', border: 'border-[#27ae60]', text: 'text-[#006400]' },
  D: { bg: 'bg-[#7fbfff]', border: 'border-[#2980b9]', text: 'text-[#00008b]' },
};

export default function BirthdayCalendar({ onMemberClick }: BirthdayCalendarProps) {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDateMembers, setSelectedDateMembers] = useState<{
    dateStr: string;
    members: Member[];
  } | null>(null);

  // Group members by month and day
  const birthdayMap: Record<string, Member[]> = {};

  members.forEach((m) => {
    const parsed = parseBirthday(m.birthday);
    if (parsed) {
      const key = `${parsed.month}-${parsed.day}`;
      if (!birthdayMap[key]) {
        birthdayMap[key] = [];
      }
      birthdayMap[key].push(m);
    }
  });

  const getDaysInMonth = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const getFirstDayOffset = (year: number, monthIndex: number) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    // Convert Sunday=0 to Monday=0 indexing: (day + 6) % 7
    return (firstDay + 6) % 7;
  };

  const today = new Date();
  const isToday = (monthIndex: number, day: number) => {
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === monthIndex &&
      today.getDate() === day
    );
  };

  // Find upcoming birthdays relative to today
  const getUpcomingBirthdays = () => {
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    const allWithParsed = members
      .map((m) => {
        const parsed = parseBirthday(m.birthday);
        return { member: m, parsed };
      })
      .filter((item): item is { member: Member; parsed: { day: number; month: number } } => item.parsed !== null);

    // Calculate days away in the year loop
    return allWithParsed
      .map(({ member, parsed }) => {
        let diffMonth = parsed.month - todayMonth;
        let diffDay = parsed.day - todayDay;
        if (diffMonth < 0 || (diffMonth === 0 && diffDay < 0)) {
          diffMonth += 12;
        }
        const approxDaysAway = diffMonth * 30.4 + diffDay;
        return { member, parsed, approxDaysAway };
      })
      .sort((a, b) => a.approxDaysAway - b.approxDaysAway)
      .slice(0, 4);
  };

  const upcomingList = getUpcomingBirthdays();

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 p-4">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Cake className="w-7 h-7 text-accent-red animate-bounce" />
            <h3 className="text-2xl md:text-3xl font-black anime-text text-accent-black bg-accent-gold px-3 py-1 border-3 border-accent-black -rotate-1 shadow-[3px_3px_0px_#000]">
              Calendario de Cumpleaños
            </h3>
          </div>
          <p className="text-xs font-mono text-gray-600 mt-1">
            Revisa los días de gloria de cada Gurruboy durante todo el año
          </p>
        </div>

        {/* Year Selector */}
        <div className="flex items-center gap-2 bg-white border-3 border-accent-black p-1 shadow-[3px_3px_0px_#000]">
          <button
            onClick={() => setCurrentYear((prev) => prev - 1)}
            className="p-1 hover:bg-accent-gold transition-colors border border-transparent hover:border-accent-black"
            title="Año anterior"
          >
            <ChevronLeft className="w-5 h-5 text-accent-black" />
          </button>
          <span className="font-mono font-black text-lg px-3 text-accent-black">
            {currentYear}
          </span>
          <button
            onClick={() => setCurrentYear((prev) => prev + 1)}
            className="p-1 hover:bg-accent-gold transition-colors border border-transparent hover:border-accent-black"
            title="Año siguiente"
          >
            <ChevronRight className="w-5 h-5 text-accent-black" />
          </button>
        </div>
      </div>

      {/* Tiers legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 bg-white p-3 border-3 border-accent-black shadow-[3px_3px_0px_#000] text-xs font-mono">
        <span className="font-bold uppercase text-accent-black flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-accent-gold" />
          Leyenda Tiers:
        </span>
        {Object.entries(TIER_COLORS).map(([tier, colors]) => (
          <div key={tier} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${colors.bg} border ${colors.border} inline-block`} />
            <span className="font-bold">Tier {tier}</span>
          </div>
        ))}
      </div>

      {/* Annual Grid (12 Months) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MONTH_NAMES.map((monthName, monthIndex) => {
          const daysInMonth = getDaysInMonth(currentYear, monthIndex);
          const firstDayOffset = getFirstDayOffset(currentYear, monthIndex);
          const isCurrentMonth = today.getMonth() === monthIndex && today.getFullYear() === currentYear;

          return (
            <div
              key={monthName}
              className={`bg-white border-3 border-accent-black p-3 shadow-[3px_3px_0px_#000] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] ${
                isCurrentMonth ? 'ring-2 ring-accent-red ring-offset-2' : ''
              }`}
            >
              {/* Month Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-accent-black">
                <h4 className="font-black text-sm uppercase anime-text text-accent-black">
                  {monthName}
                </h4>
                {isCurrentMonth && (
                  <span className="text-[10px] font-mono font-bold bg-accent-red text-white px-1.5 py-0.5 rounded border border-accent-black">
                    ACTUAL
                  </span>
                )}
              </div>

              {/* Weekday Labels */}
              <div className="grid grid-cols-7 text-center font-mono text-[10px] font-bold text-gray-500 mb-1">
                {WEEKDAYS.map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 text-center gap-1">
                {/* Empty cells before month starts */}
                {Array.from({ length: firstDayOffset }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-6" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const key = `${monthIndex}-${dayNum}`;
                  const dayMembers = birthdayMap[key] || [];
                  const hasBirthday = dayMembers.length > 0;
                  const todayCheck = isToday(monthIndex, dayNum);

                  return (
                    <div
                      key={dayNum}
                      onClick={() => {
                        if (hasBirthday) {
                          setSelectedDateMembers({
                            dateStr: `${dayNum} de ${monthName}`,
                            members: dayMembers,
                          });
                        }
                      }}
                      className={`relative h-6 flex items-center justify-center text-xs font-mono rounded cursor-pointer transition-all ${
                        todayCheck
                          ? 'bg-accent-black text-white font-bold'
                          : hasBirthday
                          ? 'bg-yellow-50 hover:bg-yellow-100 border border-accent-black font-bold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{dayNum}</span>

                      {/* Birthday Dot / Indicator */}
                      {hasBirthday && (
                        <div className="absolute -bottom-1 flex items-center justify-center gap-0.5">
                          {dayMembers.map((m, idx) => {
                            const tierColor = TIER_COLORS[m.tier] || TIER_COLORS.S;
                            return (
                              <span
                                key={idx}
                                title={`${m.name} (${m.birthday})`}
                                className={`w-2 h-2 rounded-full ${tierColor.bg} border ${tierColor.border} shadow-sm animate-pulse`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Birthdays Section */}
      <div className="mt-8 bg-white border-4 border-accent-black p-4 shadow-[4px_4px_0px_#000]">
        <h4 className="text-lg font-black anime-text text-accent-black mb-3 flex items-center gap-2">
          <Cake className="w-5 h-5 text-accent-red" />
          Próximos Cumpleaños Gurruboys
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {upcomingList.map(({ member }) => (
            <motion.div
              key={member.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onMemberClick?.(member)}
              className="flex items-center gap-3 p-2 bg-gray-50 border-2 border-accent-black cursor-pointer hover:bg-accent-gold/20 transition-colors"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-10 h-10 rounded-full border-2 border-accent-black object-cover bg-white shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-xs text-accent-black truncate">
                    {member.name}
                  </p>
                  <span className={`text-[9px] font-bold px-1 rounded border ${TIER_COLORS[member.tier]?.bg} border-accent-black`}>
                    {member.tier}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-accent-red font-semibold">
                  {member.birthday}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Date Birthdays Popover / Modal */}
      <AnimatePresence>
        {selectedDateMembers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white border-4 border-accent-black p-5 shadow-[6px_6px_0px_#000]"
            >
              <button
                onClick={() => setSelectedDateMembers(null)}
                className="absolute top-2 right-2 p-1 bg-white border-2 border-accent-black hover:bg-accent-red hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-accent-black">
                <Cake className="w-6 h-6 text-accent-red" />
                <h3 className="font-black anime-text text-lg text-accent-black">
                  Cumpleaños el {selectedDateMembers.dateStr}
                </h3>
              </div>

              <div className="space-y-3">
                {selectedDateMembers.members.map((m) => (
                  <div
                    key={m.name}
                    className="p-3 bg-gray-50 border-2 border-accent-black flex items-center justify-between gap-3 hover:bg-accent-gold/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-12 h-12 rounded-full border-2 border-accent-black object-cover bg-white"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-accent-black">
                          {m.name} <span className="text-xs font-normal text-gray-500">({m.nickname})</span>
                        </h4>
                        <p className="text-xs font-mono text-accent-red font-semibold">
                          {m.birthday}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDateMembers(null);
                        onMemberClick?.(m);
                      }}
                      className="px-2.5 py-1 text-xs font-bold bg-accent-gold border-2 border-accent-black hover:bg-accent-red hover:text-white transition-colors flex items-center gap-1 shadow-[2px_2px_0px_#000]"
                    >
                      <User size={12} />
                      Ver
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

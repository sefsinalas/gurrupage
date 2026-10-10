'use client';

import { useState } from 'react';
import { tournaments, TournamentPlayerResult } from '@/data/tournaments';
import { Trophy, ExternalLink, Award, Percent, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TournamentsSection() {
  const [filter, setFilter] = useState<'all' | 'gurrus' | 'others'>('all');
  const tournament = tournaments[0]; // Primer torneo: WCQ National 2026

  const filteredResults = tournament.results.filter((player) => {
    if (filter === 'gurrus') return player.isGurru;
    if (filter === 'others') return !player.isGurru;
    return true;
  });

  return (
    <section id="tournaments" className="py-20 px-4 bg-[#111111] text-white relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute top-0 right-0 text-white/[0.03] text-8xl md:text-9xl font-black rotate-12 -translate-y-8 translate-x-12 pointer-events-none uppercase">
        TOURNAMENTS
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b-4 border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-accent-gold text-black p-2 border-2 border-white -rotate-3 shadow-lg">
                <Trophy size={28} />
              </div>
              <span className="text-accent-gold text-xs font-mono font-bold tracking-widest uppercase">
                COMPETITIVE ARENA
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl anime-text italic tracking-tighter text-white">
              Resultados de <span className="text-accent-red">Torneos</span>
            </h2>
          </div>

          {/* External reference link requested */}
          <div className="flex items-center">
            <a
              href={tournament.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-accent-red text-white text-xs font-mono font-bold px-3 py-2 border-2 border-white/20 hover:border-white transition-all group"
            >
              <span>Ver tabla oficial en Yu-Gi-Oh! Argentina</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Tournament Meta Card */}
        <div className="bg-[#1a1a1a] border-4 border-accent-black p-6 mb-8 relative shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-accent-red text-white text-xs font-black uppercase px-2.5 py-1 tracking-wider">
                  {tournament.date}
                </span>
                <span className="bg-white/10 text-gray-300 text-xs font-mono px-2 py-1">
                  {tournament.location}
                </span>
                <span className="bg-accent-gold text-black text-xs font-bold px-2 py-1">
                  Org: {tournament.organizer}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                {tournament.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {tournament.edition} &bull; {tournament.description}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-black/40 px-4 py-3 border-2 border-white/10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-accent-gold">
                  {tournament.totalPlayers}
                </div>
                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                  Jugadores
                </div>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">
                  {tournament.rounds}
                </div>
                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                  Rondas
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 transition-all ${
                filter === 'all'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'
              }`}
            >
              Todos ({tournament.results.length})
            </button>
            <button
              onClick={() => setFilter('gurrus')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 transition-all ${
                filter === 'gurrus'
                  ? 'bg-accent-red text-white border-accent-red shadow-md'
                  : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'
              }`}
            >
              Gurruboys ({tournament.results.filter((p) => p.isGurru).length})
            </button>
            <button
              onClick={() => setFilter('others')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 transition-all ${
                filter === 'others'
                  ? 'bg-accent-gold text-black border-accent-gold shadow-md'
                  : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'
              }`}
            >
              Referencias externas ({tournament.results.filter((p) => !p.isGurru).length})
            </button>
          </div>

          <div className="text-xs text-gray-400 font-mono flex items-center gap-1">
            <Percent size={14} className="text-accent-gold" />
            <span>Posición relativa = Percentil respecto a {tournament.totalPlayers} jugadores</span>
          </div>
        </div>

        {/* Standings Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResults.map((player: TournamentPlayerResult, idx: number) => {
            const topPercentage = ((player.position / player.totalPlayers) * 100).toFixed(1);
            const beatenPercentage = (100 - (player.position / player.totalPlayers) * 100).toFixed(1);
            const percentileProgress = Math.max(5, 100 - (player.position / player.totalPlayers) * 100);

            return (
              <motion.div
                key={player.fullName}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-5 border-4 relative transition-all group ${
                  player.isGurru
                    ? 'bg-[#181818] border-accent-black hover:border-accent-red'
                    : 'bg-[#151a21] border-blue-950 hover:border-accent-gold'
                }`}
              >
                {/* Top Badge Tag */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden bg-black shrink-0">
                      {player.avatar ? (
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-black">
                          {player.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-white uppercase group-hover:text-accent-gold transition-colors">
                          {player.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                            player.isGurru
                              ? 'bg-accent-red/20 text-accent-red border-accent-red/40'
                              : 'bg-blue-500/20 text-blue-300 border-blue-400/40'
                          }`}
                        >
                          {player.isGurru ? 'GURRUBOY' : 'REFERENCIA'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 block">
                        {player.fullName}
                      </span>
                    </div>
                  </div>

                  {/* Absolute Position Badge */}
                  <div className="text-right">
                    <div className="inline-block bg-white text-black font-black text-sm px-2 py-0.5 border-2 border-accent-black">
                      #{player.position}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                      de {player.totalPlayers}
                    </div>
                  </div>
                </div>

                {/* Relative Position & Progress Bar */}
                <div className="bg-black/50 p-3 border border-white/10 mb-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Posición Relativa:</span>
                    <span className="font-bold text-accent-gold">
                      Top {topPercentage}% del torneo
                    </span>
                  </div>

                  {/* Visual Bar: Higher = Better */}
                  <div className="w-full h-2.5 bg-white/10 overflow-hidden border border-white/20">
                    <div
                      className={`h-full transition-all duration-500 ${
                        player.isGurru ? 'bg-accent-red' : 'bg-accent-gold'
                      }`}
                      style={{ width: `${percentileProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span>Superó a {player.totalPlayers - player.position} duelistas</span>
                    <span className="text-white/80 font-semibold">{beatenPercentage}% del roster</span>
                  </div>
                </div>

                {/* Score & Record Footer */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-400">Récord:</span>
                    <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5">
                      {player.wins}W - {player.losses}L - {player.draws}D
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-accent-gold font-bold">
                    <Flame size={14} />
                    <span>{player.points} Pts</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small bottom reference footer */}
        <div className="mt-8 p-4 bg-white/5 border-2 border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-accent-gold" />
            <span>Datos oficiales sincronizados desde la plataforma de torneos de YGO Argentina.</span>
          </div>
          <a
            href={tournament.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold hover:underline font-mono inline-flex items-center gap-1"
          >
            {tournament.sourceUrl}
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}

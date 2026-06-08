import { games } from '@/data/content';
import { Gamepad2 } from 'lucide-react';

export default function GamesSection() {
  return (
    <section className="py-12 px-4 bg-accent-black text-white relative overflow-hidden">
      {/* Background text decoration */}
      <div className="absolute top-0 right-0 text-white/5 text-9xl font-black rotate-12 -translate-y-10 translate-x-10 pointer-events-none uppercase">
        Games Zone
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-accent-red p-2 border-2 border-white rotate-3">
            <Gamepad2 size={32} />
          </div>
          <h2 className="text-4xl anime-text italic border-b-4 border-accent-gold pb-1">
            Nuestros Juegos
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {games.map((game, index) => (
            <div
              key={game}
              className={`
                p-4 border-2 border-white/20 hover:border-accent-gold transition-all hover:bg-white/5 group
                ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
              `}
            >
              <div className="text-accent-gold text-xs font-mono mb-2">#0{index + 1}</div>
              <h3 className="text-xl font-bold uppercase tracking-tighter group-hover:text-accent-gold transition-colors">
                {game}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

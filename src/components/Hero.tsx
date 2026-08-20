import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[60vh] md:h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-9xl font-black text-accent-red -rotate-12">GURRU</div>
        <div className="absolute bottom-10 right-10 text-9xl font-black text-accent-black rotate-12">BOYS</div>
      </div>

      <div className="z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-accent-black text-white px-4 py-1 anime-text text-sm tracking-widest">
          <Sparkles size={14} className="text-accent-gold" />
          EST. SALTA CAPITAL, ARG
        </div>
        
        <h1 className="text-7xl md:text-9xl anime-text text-accent-black leading-none tracking-tighter">
          GURRU<span className="text-accent-red">BOYS</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-xl md:text-2xl font-bold text-gray-700 italic border-y-4 border-accent-gold py-2">
          &ldquo;Donde los duelos son ley y el café es obligatorio.&rdquo;
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <div className="bg-accent-red text-white font-black px-6 py-2 border-4 border-accent-black shadow-[4px_4px_0px_black] -rotate-2">
            YU-GI-OH!
          </div>
          <div className="bg-accent-gold text-black font-black px-6 py-2 border-4 border-accent-black shadow-[4px_4px_0px_black] rotate-2">
            MESA
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 bg-accent-black" />
      </div>
    </div>
  );
}

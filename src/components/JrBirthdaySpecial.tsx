'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Cake, Sparkles, X, Volume2, VolumeX, Flame, Zap, RefreshCw, ZoomIn, PartyPopper } from 'lucide-react';

const SPECIAL_IMAGES = [
  '/images/specials/45d83b9d-e33b-4f5a-abd3-7eb47ad9504b.jpeg',
  '/images/specials/538154ea-1af1-49bd-a108-71be7173181e.jpeg',
  '/images/specials/a6766e1c-adf5-4722-9b1d-0b866612de33.jpeg',
  '/images/specials/e73d56fa-59b1-4415-9e38-a5297adf94bd.jpeg',
  '/images/specials/efa4ccbc-fd24-4799-851e-c6d312dc4a8a.jpeg',
];

const STICKER_TEXTS = [
  '👑 CUMPLEAÑERO TIER S',
  '🔥 COMBO PROHIBIDO',
  '⚡ +1 NIVEL DE ADICCIÓN',
  '🃏 50% SANGRE 50% CARTAS',
  '🎂 EL ADICTO FESTEJA',
  '💥 INVOCACIÓN ESPECIAL',
  '🏆 MESA 1 ASEGURADA',
];

interface ParticlePhoto {
  id: number;
  src: string;
  sticker: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotate: number;
  scale: number;
  zIndex: number;
  delay: number;
}

interface ConfettiItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'square' | 'circle' | 'strip';
  rotate: number;
  delay: number;
  duration: number;
}

const emptySubscribe = () => () => {};

export default function JrBirthdaySpecial() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isBirthdayToday, setIsBirthdayToday] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photos, setPhotos] = useState<ParticlePhoto[]>([]);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [activeImage, setActiveImage] = useState<{ src: string; sticker: string } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Web Audio 8-bit Sound Synthesizer
  const playSoundEffect = useCallback((type: 'fanfare' | 'pop' | 'sparkle') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'fanfare') {
        // Play an 8-bit celebratory victory arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C E G C E G
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + i * 0.08 + 0.25);
        });
      } else if (type === 'sparkle') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch {
      // Audio playback fails gracefully if not permitted yet
    }
  }, [soundEnabled]);

  // Generate particle images with physics coordinates
  const triggerExplosion = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = width < 640 ? 10 : 16;
    const newPhotos: ParticlePhoto[] = [];

    const colors = ['#c0392b', '#f1c40f', '#2c3e50', '#e74c3c', '#2ecc71', '#9b59b6'];
    const newConfetti: ConfettiItem[] = [];

    // Create photos
    for (let i = 0; i < count; i++) {
      const src = SPECIAL_IMAGES[i % SPECIAL_IMAGES.length];
      const sticker = STICKER_TEXTS[i % STICKER_TEXTS.length];
      
      // Calculate random polar coordinates from center
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = Math.min(width, height) * (0.28 + Math.random() * 0.35);
      
      const targetX = Math.cos(angle) * distance + (Math.random() * 40 - 20);
      const targetY = Math.sin(angle) * distance + (Math.random() * 40 - 20);
      const rotate = (Math.random() * 40 - 20);
      const scale = width < 640 ? 0.75 + Math.random() * 0.25 : 0.85 + Math.random() * 0.35;

      newPhotos.push({
        id: Date.now() + i,
        src,
        sticker,
        x: 0,
        y: 0,
        targetX,
        targetY,
        rotate,
        scale,
        zIndex: 20 + (i % 10),
        delay: i * 0.04,
      });
    }

    // Create confetti
    for (let j = 0; j < 40; j++) {
      newConfetti.push({
        id: j,
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        size: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: j % 3 === 0 ? 'circle' : j % 3 === 1 ? 'square' : 'strip',
        rotate: Math.random() * 360,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
      });
    }

    setPhotos(newPhotos);
    setConfetti(newConfetti);
    playSoundEffect('fanfare');
  }, [playSoundEffect]);

  // Check date on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      const isAug20 = now.getMonth() === 7 && now.getDate() === 20;
      const urlParams = new URLSearchParams(window.location.search);
      const isForced = urlParams.has('jr') || urlParams.has('cumple') || urlParams.has('birthday');

      if (isAug20 || isForced) {
        setIsBirthdayToday(true);
        setIsOpen(true);
        triggerExplosion();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [triggerExplosion]);

  if (!isClient) return null;

  return (
    <>
      {/* Top Banner on page when it is JR's birthday */}
      {isBirthdayToday && (
        <aside aria-label="Aviso de Cumpleaños de JR" className="bg-gradient-to-r from-accent-red via-accent-gold to-accent-red text-white py-2 px-4 border-b-4 border-accent-black font-mono font-black text-xs md:text-sm text-center shadow-md relative z-30 flex items-center justify-center gap-2 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center"
          >
            <Cake className="w-4 h-4 text-white" />
          </motion.div>
          <span>
            🎉 ¡HOY 20 DE AGOSTO ES EL CUMPLE DE JR! (EL ADICTO) 🎉
          </span>
          <button
            onClick={() => {
              setIsOpen(true);
              triggerExplosion();
            }}
            className="ml-2 bg-accent-black text-accent-gold text-[10px] md:text-xs px-2.5 py-0.5 rounded border border-white hover:bg-white hover:text-black transition-colors uppercase font-bold shadow-[2px_2px_0px_#000]"
          >
            💥 ¡Explotar Fotos!
          </button>
        </aside>
      )}

      {/* Floating Action Button (Always available to trigger the celebration) */}
      <aside aria-label="Botón especial Cumpleaños de JR" className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -6, 0],
            boxShadow: [
              '4px 4px 0px #000',
              '6px 6px 0px #000',
              '4px 4px 0px #000',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => {
            setIsOpen(true);
            triggerExplosion();
          }}
          className="flex items-center gap-2 bg-accent-gold hover:bg-yellow-400 text-accent-black font-black text-xs md:text-sm px-4 py-2.5 border-3 border-accent-black anime-text group cursor-pointer"
        >
          <Cake className="w-5 h-5 text-accent-red group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">CUMPLE DE JR (20 AGO)</span>
          <span className="sm:hidden">CUMPLE JR</span>
          <Sparkles className="w-4 h-4 text-accent-red animate-pulse" />
        </motion.button>
      </aside>

      {/* Fullscreen Celebration & Image Explosion Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
          >
            {/* Manga Action Lines Background Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#fff_100%)] mix-blend-overlay" />
            
            {/* Pulsing Light Glow behind explosion */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent-red via-accent-gold to-yellow-300 blur-3xl pointer-events-none opacity-40"
            />

            {/* Confetti Falling Rain */}
            {confetti.map((c) => (
              <motion.div
                key={c.id}
                initial={{
                  x: c.x,
                  y: -50,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
                  rotate: c.rotate + 720,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  position: 'absolute',
                  width: c.shape === 'strip' ? c.size * 0.4 : c.size,
                  height: c.shape === 'strip' ? c.size * 1.8 : c.size,
                  backgroundColor: c.color,
                  borderRadius: c.shape === 'circle' ? '50%' : '2px',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            ))}

            {/* Top Control Bar */}
            <header className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 bg-accent-black/90 text-white px-3 py-1.5 border-2 border-accent-gold text-xs font-mono font-bold shadow-[3px_3px_0px_#000]">
                <Sparkles size={14} className="text-accent-gold animate-spin" />
                <span>ESPECIAL: 20 DE AGOSTO</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextState = !soundEnabled;
                    setSoundEnabled(nextState);
                    if (nextState) playSoundEffect('pop');
                  }}
                  className="p-2 bg-white border-2 border-accent-black hover:bg-accent-gold transition-colors text-accent-black shadow-[2px_2px_0px_#000]"
                  title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
                >
                  {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 bg-accent-red text-white px-3 py-1.5 border-2 border-white hover:bg-red-700 transition-colors font-bold text-xs shadow-[3px_3px_0px_#000]"
                  title="Cerrar y entrar a la página"
                >
                  <X size={16} />
                  <span>CERRAR</span>
                </button>
              </div>
            </header>

            {/* Center Epic Birthday Summons Banner */}
            <motion.div
              initial={{ scale: 0, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="relative z-30 text-center max-w-xl mx-auto pointer-events-auto px-4"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-accent-black text-accent-gold px-4 py-1 border-3 border-accent-gold anime-text text-xs md:text-sm shadow-[4px_4px_0px_#c0392b] mb-3">
                <Flame size={16} className="text-accent-red animate-bounce" />
                <span>⚠️ INVOCACIÓN DE CUMPLEAÑOS ACTIVADA ⚠️</span>
                <Flame size={16} className="text-accent-red animate-bounce" />
              </div>

              {/* Huge Main Header */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black anime-text text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                ¡FELIZ CUMPLE <span className="text-accent-gold bg-accent-black px-2 border-4 border-white inline-block -rotate-2">JR</span>!
              </h1>

              <div className="bg-white border-4 border-accent-black p-3 sm:p-4 shadow-[6px_6px_0px_#000] mt-3 transform rotate-1">
                <p className="text-sm sm:text-base md:text-lg font-bold text-accent-black italic">
                  &ldquo;50% hemoglobina, 50% cartas de Yu-Gi-Oh!... ¡Hoy la adicción está de fiesta!&rdquo;
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-xs font-mono font-bold text-accent-red">
                  <Cake size={14} />
                  <span>20 DE AGOSTO // GURRUBOY TIER S SUPREMO</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerExplosion();
                    playSoundEffect('pop');
                  }}
                  className="flex items-center gap-2 bg-accent-gold text-accent-black px-5 py-2.5 border-3 border-accent-black font-black text-sm uppercase anime-text shadow-[4px_4px_0px_#000] hover:bg-yellow-400 transition-colors"
                >
                  <RefreshCw size={16} className="animate-spin" />
                  💥 ¡EXPLOTAR MÁS FOTOS!
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 bg-white text-accent-black px-5 py-2.5 border-3 border-accent-black font-black text-sm uppercase anime-text shadow-[4px_4px_0px_#000] hover:bg-gray-100 transition-colors"
                >
                  <PartyPopper size={16} className="text-accent-red" />
                  Ir al Sitio Web
                </motion.button>
              </div>

              <p className="text-[11px] font-mono text-gray-300 mt-3 drop-shadow-md">
                💡 Tip: ¡Haz click o arrastra las fotos para verlas en grande!
              </p>
            </motion.div>

            {/* Exploded Floating / Draggable Photo Particles */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  drag
                  dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    rotate: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: photo.targetX,
                    y: photo.targetY,
                    scale: photo.scale,
                    rotate: photo.rotate,
                    opacity: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 14,
                    delay: photo.delay,
                  }}
                  whileHover={{
                    scale: photo.scale * 1.25,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage({ src: photo.src, sticker: photo.sticker });
                    playSoundEffect('sparkle');
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: photo.zIndex,
                  }}
                  className="pointer-events-auto cursor-grab active:cursor-grabbing group"
                >
                  {/* Photo Frame */}
                  <div className="relative bg-white p-2 border-3 sm:border-4 border-accent-black shadow-[6px_6px_0px_#000] transition-transform duration-200 group-hover:shadow-[8px_8px_0px_#c0392b]">
                    {/* Sticker Header */}
                    <div className="bg-accent-black text-accent-gold text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 mb-1.5 truncate max-w-[130px] sm:max-w-[160px] flex items-center gap-1 border border-accent-gold">
                      <Zap size={10} className="text-yellow-400 shrink-0" />
                      <span className="truncate">{photo.sticker}</span>
                    </div>

                    {/* Image Thumbnail */}
                    <div className="relative w-28 h-36 sm:w-36 sm:h-48 md:w-44 md:h-56 overflow-hidden bg-gray-100 border-2 border-accent-black">
                      <Image
                        src={photo.src}
                        alt="Especial Cumpleaños Jr"
                        fill
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 176px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                      <div className="absolute inset-0 bg-accent-gold/0 group-hover:bg-accent-gold/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 bg-accent-black text-white p-1.5 rounded-full border border-white transition-opacity shadow-md">
                          <ZoomIn size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corner Ribbon */}
                    <div className="mt-1 flex items-center justify-between text-[8px] font-mono font-bold text-gray-500">
                      <span>#JR_BDAY</span>
                      <span className="text-accent-red">AUG_20</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enlarged Single Photo Modal View */}
            <AnimatePresence>
              {activeImage && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto"
                >
                  <div className="relative max-w-lg w-full bg-white border-6 border-accent-black p-4 sm:p-6 shadow-[10px_10px_0px_#000]">
                    <button
                      onClick={() => setActiveImage(null)}
                      className="absolute top-3 right-3 p-1.5 bg-accent-red text-white border-2 border-accent-black hover:bg-black transition-colors shadow-[2px_2px_0px_#000]"
                      title="Cerrar vista"
                    >
                      <X size={20} />
                    </button>

                    <div className="inline-flex items-center gap-1.5 bg-accent-gold text-accent-black px-3 py-1 border-2 border-accent-black text-xs font-black anime-text mb-3 shadow-[2px_2px_0px_#000]">
                      <Cake size={14} className="text-accent-red" />
                      <span>{activeImage.sticker}</span>
                    </div>

                    <div className="relative w-full h-[55vh] overflow-hidden border-4 border-accent-black bg-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                      <Image
                        src={activeImage.src}
                        alt="JR Especial"
                        fill
                        sizes="(max-width: 640px) 100vw, 500px"
                        className="object-contain"
                        priority
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-accent-black">EDICIÓN ESPECIAL CUMPLEAÑOS</span>
                      <span className="text-accent-red">20 DE AGOSTO</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

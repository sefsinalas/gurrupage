'use client';

import { useState } from 'react';
import { travels } from '@/data/content';
import { Plane, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TravelsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-accent-gold p-2 border-2 border-accent-black -rotate-3">
            <Plane size={32} />
          </div>
          <h2 className="text-4xl anime-text text-accent-black border-b-4 border-accent-red">
            Bitácora de Viajes
          </h2>
        </div>

        <div className="space-y-16">
          {travels.map((travel) => (
            <div key={travel.id} className="relative">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 space-y-4">
                  <div>
                    <span className="bg-accent-red text-white text-xs font-bold px-2 py-1 uppercase">
                      {travel.date}
                    </span>
                    <h3 className="text-2xl font-black text-accent-black mt-2 leading-tight">
                      {travel.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic">
                    "{travel.description}"
                  </p>
                  
                  {travel.attendees.length > 0 && (
                    <div className="bg-gray-100 p-4 border-2 border-accent-black">
                      <div className="flex items-center gap-2 mb-2 text-accent-red">
                        <Users size={16} />
                        <span className="font-bold text-xs uppercase">Expedicionarios</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {travel.attendees.map((person) => (
                          <span key={person} className="text-xs bg-white px-2 py-0.5 border border-gray-300">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {travel.images.length > 0 ? (
                    travel.images.map((img, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedImage(img)}
                        className="aspect-video sm:aspect-square border-4 border-accent-black overflow-hidden hover:scale-105 transition-transform bg-gray-200"
                      >
                        <img src={img} alt={`${travel.title} ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))
                  ) : (
                    <div className="col-span-3 aspect-[21/9] border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-bold anime-text text-xl bg-gray-50">
                      PRÓXIMAMENTE...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 z-10 p-2 text-white hover:text-accent-red transition-colors"
              >
                <X size={40} />
              </button>
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-full object-contain border-4 border-white shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

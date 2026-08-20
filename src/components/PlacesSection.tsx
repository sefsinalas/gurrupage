import { places } from '@/data/content';
import { MapPin } from 'lucide-react';

export default function PlacesSection() {
  return (
    <section className="py-16 px-4 bg-[#f0f0f0] border-y-8 border-accent-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl anime-text text-accent-black mb-10 text-center">
          Nuestros <span className="text-accent-red">Dojos</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {places.map((place) => (
            <div key={place.name} className="flex gap-4 items-start p-4 bg-white border-4 border-accent-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="bg-accent-red text-white p-2">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-accent-black uppercase tracking-tight">
                  {place.name}
                </h3>
                <p className="text-gray-600 text-sm italic">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

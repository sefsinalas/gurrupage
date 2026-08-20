import { socials } from '@/data/content';
import { MessageCircle, Camera, Music, LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  facebook: MessageCircle,
  instagram: Camera,
  tiktok: Music,
};

export default function Footer() {
  return (
    <footer className="bg-accent-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-3xl anime-text italic text-accent-gold mb-2">GURRUBOYS</h2>
          <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">
            Salta Capital // Argentina // 2026
          </p>
        </div>

        <div className="flex gap-6">
          {socials.map((social) => {
            const Icon = icons[social.icon];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="p-3 border-2 border-white/20 group-hover:border-accent-red group-hover:bg-accent-red transition-all transform group-hover:-rotate-12">
                  <Icon size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50 group-hover:opacity-100 group-hover:text-accent-red">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <p className="text-[10px] text-gray-500 font-mono">
          © {new Date().getFullYear()} GURRUBOYS. ALL RIGHTS RESERVED. DESIGNED FOR THE SHADOW REALM.
        </p>
      </div>
    </footer>
  );
}

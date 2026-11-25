import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Memoria Gurru | GurruBoys",
  description: "El juego que construimos entre todos los GurruBoys.",
};

export default function Juego1() {
  return (
    <main className="h-dvh w-full bg-white">
      <Link href="/" className="fixed left-4 top-3 z-10 bg-accent-black px-3 py-2 text-sm font-bold uppercase tracking-widest text-accent-gold hover:underline focus-visible:outline-4 focus-visible:outline-accent-gold">
        ← Volver a GurruBoys
      </Link>
      <iframe
        src="/juego1/index.html"
        title="Juego 1 de los GurruBoys"
        sandbox="allow-scripts"
        referrerPolicy="no-referrer"
        className="block h-full w-full border-0"
      />
    </main>
  );
}

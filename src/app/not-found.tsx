import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sun } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-brand-gold-500/10 border border-brand-gold-500/20 text-brand-gold-600 flex items-center justify-center mb-6">
        <Sun className="w-8 h-8 stroke-[2.5]" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 bg-brand-gold-50 px-3 py-1 rounded-full border border-brand-gold-200 mb-3">
        Erreur 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
        Page non trouvée
      </h1>
      <p className="text-sm text-slate-500 max-w-md mb-8">
        La page que vous recherchez semble introuvable ou a été déplacée. Utilisez le menu ou retournez à l'accueil.
      </p>
      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-md"
      >
        <Home className="w-4 h-4" />
        <span>Retourner à l'accueil</span>
      </Link>
    </div>
  );
}

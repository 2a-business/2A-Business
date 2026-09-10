'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  fallbackHref?: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  fallbackHref = '/',
  badge,
  children,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (
      typeof window !== 'undefined' &&
      document.referrer &&
      document.referrer.startsWith(window.location.origin)
    ) {
      // L'utilisateur vient d'une page du site → retour sûr
      router.back();
    } else {
      // Arrivée directe (onglet vide, lien externe, favori…) → page d'accueil
      router.push(fallbackHref);
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto">
        {/* Navigation de retour obligatoire */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="group inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition shadow-sm text-sm font-medium"
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-brand-gold-400" />
            <span>Retour</span>
          </button>
        </div>

        {/* Titre et sous-titre */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {badge && (
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold-400 bg-brand-gold-500/10 border border-brand-gold-500/20 rounded-full mb-3">
                {badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-base sm:text-lg text-slate-300 max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Realisation } from '@/types';
import { getRealisations } from '@/lib/firebase/firestore';
import { INITIAL_REALISATIONS } from '@/lib/seedData';
import { MapPin, Calendar, Zap, ArrowRight, Filter, Search } from 'lucide-react';

export default function RealisationsPage() {
  const [realisations, setRealisations] = useState<Realisation[]>(INITIAL_REALISATIONS);
  const [filtered, setFiltered] = useState<Realisation[]>(INITIAL_REALISATIONS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getRealisations();
        setRealisations(data);
        setFiltered(data);
      } catch (err) {
        console.error('Erreur chargement réalisations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    let result = [...realisations];

    if (activeFilter === 'large') {
      result = result.filter((r) => r.puissance_kwc >= 70);
    } else if (activeFilter === 'medium') {
      result = result.filter((r) => r.puissance_kwc < 70);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.nom.toLowerCase().includes(term) ||
          r.localisation.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term)
      );
    }

    setFiltered(result);
  }, [activeFilter, searchTerm, realisations]);

  return (
    <div>
      {/* En-tête obligatoire avec flèche de retour */}
      <PageHeader
        title="Nos Réalisations"
        subtitle="Galerie dynamique de nos projets solaires et chantiers électriques réalisés avec succès."
        badge="Références & Expérience"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Barre de filtre et de recherche */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tous les projets ({realisations.length})
            </button>
            <button
              onClick={() => setActiveFilter('large')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeFilter === 'large'
                  ? 'bg-brand-gold-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Grandes puissances (≥ 70 kWc)
            </button>
            <button
              onClick={() => setActiveFilter('medium')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeFilter === 'medium'
                  ? 'bg-brand-gold-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Installations moyennes (&lt; 70 kWc)
            </button>
          </div>

          {/* Recherche */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une ville, un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Galerie dynamique */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-500">Chargement des réalisations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-base font-semibold text-slate-800">
              Aucun projet ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/realisations/${item.id}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-gold-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image du projet */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image_url}
                    alt={item.nom}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge Puissance kWc */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-brand-gold-400 text-xs font-black border border-brand-gold-500/30 flex items-center space-x-1 shadow-md">
                    <Zap className="w-3.5 h-3.5 fill-brand-gold-400" />
                    <span>{item.puissance_kwc} kWc</span>
                  </div>

                  {/* Année */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-slate-200 text-xs font-medium flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.annee}</span>
                  </div>
                </div>

                {/* Contenu textuel */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-gold-600 transition leading-snug line-clamp-2">
                      {item.nom}
                    </h3>
                    <div className="flex items-center text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold-600 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{item.localisation}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-brand-gold-600 flex items-center space-x-1">
                      <span>Découvrir le projet</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Livré & Opérationnel
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

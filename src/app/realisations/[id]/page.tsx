'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getRealisationById } from '@/lib/firebase/firestore';
import { Realisation } from '@/types';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Share2,
  PhoneCall,
} from 'lucide-react';
import { createGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function RealisationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<Realisation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      try {
        const item = await getRealisationById(id);
        setProject(item);
      } catch (err) {
        console.error('Erreur chargement projet:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/realisations');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 font-medium">Chargement des détails du projet...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Projet introuvable</h2>
        <p className="text-slate-500 mb-6">Cette réalisation n'existe pas ou a été modifiée.</p>
        <button
          onClick={() => router.push('/realisations')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold text-sm"
        >
          Retour aux réalisations
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* 1. BARRE DE NAVIGATION SUPÉRIEURE AVEC FLÈCHE DE RETOUR OBLIGATOIRE */}
      <div className="bg-slate-900/90 backdrop-blur-md text-white py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-800 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="group inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition text-sm font-medium"
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft className="w-4 h-4 text-brand-gold-400 transition-transform group-hover:-translate-x-1" />
            <span>Retour aux réalisations</span>
          </button>
          <div className="text-xs text-slate-400 hidden sm:block">
            <span>2A Business</span> / <span>Réalisations</span> /{' '}
            <span className="text-brand-gold-400 font-semibold">{project.nom}</span>
          </div>
        </div>
      </div>

      {/* 2. IMAGE TOUT EN HAUT QUI OCCUPE TOUTE LA LARGEUR DE L'ÉCRAN */}
      <div className="w-full relative h-[420px] sm:h-[520px] lg:h-[620px] bg-slate-950 overflow-hidden shadow-2xl">
        <Image
          src={project.image_url}
          alt={project.nom}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Badge flottant sur l'image */}
        <div className="absolute bottom-8 left-4 sm:left-8 lg:left-16 max-w-4xl text-white space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Puissance certifiée : {project.puissance_kwc} kWc</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
            {project.nom}
          </h1>
        </div>
      </div>

      {/* 3. INFORMATIONS TEXTUELLES (Nom, Localisation, Puissance en kWc, Année, Description) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-10">
          {/* Métadonnées Clés en Cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8 border-b border-slate-100">
            {/* Puissance en kWc */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-brand-gold-200 flex items-center space-x-4">
              <div className="p-3 bg-brand-gold-500 text-slate-950 rounded-xl shadow-md">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-gold-700">
                  Puissance Installée
                </p>
                <p className="text-2xl font-black text-slate-950">
                  {project.puissance_kwc} <span className="text-base font-semibold text-slate-600">kWc</span>
                </p>
              </div>
            </div>

            {/* Localisation */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-4">
              <div className="p-3 bg-slate-900 text-brand-gold-400 rounded-xl shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Localisation
                </p>
                <p className="text-base font-bold text-slate-900 line-clamp-1">
                  {project.localisation}
                </p>
              </div>
            </div>

            {/* Année de Réalisation */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-4">
              <div className="p-3 bg-slate-900 text-brand-gold-400 rounded-xl shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Année de Réalisation
                </p>
                <p className="text-2xl font-black text-slate-900">
                  {project.annee}
                </p>
              </div>
            </div>
          </div>

          {/* Description complète et Spécifications */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Description Technique du Projet
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base space-y-4">
              <p>{project.description}</p>
            </div>

            {/* Points forts de la réalisation */}
            <div className="pt-6 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Spécifications et Garanties associées :
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">
                    Étude d'ingénierie et modélisation thermique préalable
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">
                    Matériel photovoltaïque certifié Tier-1 IEC 61215
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">
                    Coffrets parafoudres et protections différentielles normalisées
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">
                    Système de télésurveillance et monitoring à distance
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action : Demande de projet similaire */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Vous avez un projet similaire à réaliser ?
              </h4>
              <p className="text-xs text-slate-500">
                Contactez notre bureau d'études pour une estimation sur-mesure gratuite.
              </p>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <Link
                href={`/contact?subject=${encodeURIComponent('Demande de devis pour projet similaire à : ' + project.nom)}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition text-center shadow-md shadow-brand-gold-500/20"
              >
                Demander un devis
              </Link>
              <a
                href={createGeneralWhatsAppLink(
                  `Bonjour 2A Business, j'ai vu votre réalisation "${project.nom}" (${project.puissance_kwc} kWc) et je souhaite un projet similaire.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center shadow-sm"
                title="Discuter sur WhatsApp"
              >
                <PhoneCall className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

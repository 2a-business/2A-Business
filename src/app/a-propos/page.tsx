import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import {
  Target,
  Compass,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sun,
  Zap,
  Leaf,
  Lightbulb,
} from 'lucide-react';

export const metadata = {
  title: 'À Propos | 2A Business',
  description: 'Découvrez la vision, la mission, les valeurs et l\'expertise de 2A Business dans l\'énergie solaire et l\'électricité.',
};

export default function AProposPage() {
  const values = [
    {
      title: 'Excellence Technique',
      description: 'Nous appliquons les standards d\'ingénierie les plus stricts pour des installations solaires et électriques sûres, durables et ultra-performantes.',
      icon: Award,
      color: 'text-amber-500 bg-amber-50',
    },
    {
      title: 'Durabilité & Écologie',
      description: 'Chaque kWh solaire produit contribue activement à la décarbonation de nos territoires et à la préservation de notre environnement.',
      icon: Leaf,
      color: 'text-emerald-500 bg-emerald-50',
    },
    {
      title: 'Innovation Continue',
      description: 'Veille technologique permanente sur les dernières avancées en cellules photovoltaïques, onduleurs hybrides et stockage lithium intelligent.',
      icon: Lightbulb,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      title: 'Sécurité & Conformité',
      description: 'Respect rigoureux des normes électriques (NFC 15-100, IEC) pour éliminer tout risque d\'incendie ou de coupure préjudiciable à vos activités.',
      icon: ShieldCheck,
      color: 'text-red-500 bg-red-50',
    },
    {
      title: 'Proximité & Écoute',
      description: 'Un interlocuteur dédié vous accompagne à chaque étape : de l\'audit initial au suivi de production après mise en service.',
      icon: Users,
      color: 'text-purple-500 bg-purple-50',
    },
  ];

  return (
    <div>
      {/* En-tête obligatoire avec flèche de retour */}
      <PageHeader
        title="À Propos de 2A Business"
        subtitle="Acteur de référence dans l'ingénierie solaire photovoltaïque et les solutions électriques haute fiabilité."
        badge="Notre Histoire & Engagement"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Présentation Approfondie */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 bg-brand-gold-50 px-3.5 py-1 rounded-full border border-brand-gold-200">
              Qui Sommes-Nous ?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Une passion pour la performance énergétique et la fiabilité
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Fondée avec la volonté de répondre aux défis énergétiques majeurs du continent, <strong>2A Business</strong> est une entreprise spécialisée dans les installations photovoltaïques, les réseaux électriques industriels et la distribution de matériel énergétique certifié.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Nous intervenons auprès des entreprises industrielles, des exploitants agricoles, des complexes tertiaires et des résidences privées pour leur garantir une énergie continue, propre et financièrement rentable, libérée des aléas du réseau traditionnel.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-2xl font-extrabold text-brand-gold-600">+10 ans</span>
                <p className="text-xs text-slate-600 font-medium mt-0.5">D'expertise cumulée sur le terrain</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-2xl font-extrabold text-emerald-600">100%</span>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Matériels certifiés et testés</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-[450px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
                alt="2A Business Présentation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white space-y-4 relative overflow-hidden border border-slate-800 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold-500/20 text-brand-gold-400 flex items-center justify-center border border-brand-gold-500/30">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white">Notre Vision</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Devenir le partenaire énergétique le plus fiable et innovant de la sous-région, en accélérant le déploiement de solutions d'énergie propre autonomes et raccordées, capables d'alimenter la croissance économique et industrielle sans compromettre l'environnement.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-brand-gold-500 text-slate-950 space-y-4 relative overflow-hidden shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-950/10 text-slate-950 flex items-center justify-center border border-slate-950/20">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">Notre Mission</h3>
            <p className="text-slate-900 font-medium leading-relaxed text-sm sm:text-base">
              Concevoir, installer et maintenir des systèmes photovoltaïques et électriques à haute valeur ajoutée, en offrant à nos clients un accompagnement rigoureux, des équipements de premier choix (Tier-1) et un service après-vente d'une réactivité sans faille.
            </p>
          </div>
        </section>

        {/* Nos Valeurs Fondamentales */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 bg-brand-gold-50 px-3.5 py-1 rounded-full border border-brand-gold-200">
              Ce Qui Nous Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Nos Valeurs d'Entreprise
            </h2>
            <p className="text-slate-600 text-base">
              Les principes non négociables qui régissent chacune de nos interventions et collaborations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-gold-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">{v.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bannière de transition vers les services */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Découvrez l'étendue de nos expertises et prestations
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Des installations solaires aux armoires industrielles, découvrez nos offres clés en main.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition flex items-center space-x-2"
          >
            <span>Explorer nos services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

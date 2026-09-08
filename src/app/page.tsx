import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sun,
  Zap,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  TrendingUp,
  Settings,
  BatteryCharging,
} from 'lucide-react';
import { INITIAL_REALISATIONS } from '@/lib/seedData';
import { createGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function HomePage() {
  const featuredRealisations = INITIAL_REALISATIONS.slice(0, 3);

  const activities = [
    {
      title: 'Énergie Solaire Photovoltaïque',
      description:
        'Conception, dimensionnement et installation de centrales solaires autonomes (Off-grid), raccordées au réseau (On-grid) et systèmes de pompage solaire agricole.',
      icon: Sun,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      link: '/services',
    },
    {
      title: 'Électricité Industrielle & Tertiaire',
      description:
        'Infrastructures électriques complètes, fabrication et câblage d\'armoires TGBT, postes de transformation MT/BT et mise en conformité des installations.',
      icon: Zap,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      link: '/services',
    },
    {
      title: 'Audit & Efficacité Énergétique',
      description:
        'Diagnostic thermique et électrique approfondi visant à réduire drastiquement vos factures d\'énergie et sécuriser la continuité de votre alimentation.',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      link: '/services',
    },
    {
      title: 'Équipements & Fournitures Certifiés',
      description:
        'Distribution de composants solaires de marques mondiales : panneaux solaires Tier-1, onduleurs hybrides intelligents et batteries lithium LiFePO4 garanties.',
      icon: BatteryCharging,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      link: '/produits',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow & Grid Decorative */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-brand-gold-400 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-brand-gold-400" />
              <span>Expertise Énergétique & Solutions Durables</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              L'Énergie & la Performance au service de votre avenir
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              <strong className="text-white">2A Business</strong> accompagne les entreprises, industries et particuliers dans la transition énergétique avec des installations solaires photovoltaïques fiables et des infrastructures électriques de pointe.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-base transition shadow-lg shadow-brand-gold-500/25 flex items-center justify-center space-x-2"
              >
                <span>Découvrir nos services</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/realisations"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition flex items-center justify-center space-x-2"
              >
                <span>Voir nos réalisations</span>
              </Link>
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Direct</span>
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-800/80">
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-brand-gold-400">+250</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Projets Réalisés</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-white">+2.5 MWc</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Puissance Installée</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-brand-gold-400">99.8%</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Taux de Disponibilité</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 text-center">
              <span className="block text-3xl sm:text-4xl font-black text-white">24/7</span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Support & Astreinte</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACTIVITÉS PRINCIPALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 bg-brand-gold-50 px-3.5 py-1 rounded-full border border-brand-gold-200">
            Notre Cœur de Métier
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Activités Principales de 2A Business
          </h2>
          <p className="text-slate-600 text-base">
            Des compétences éprouvées pour sécuriser, optimiser et pérenniser vos approvisionnements énergétiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, index) => {
            const Icon = act.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-gold-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${act.color} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-gold-600 transition">
                    {act.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={act.link}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-900 group-hover:text-brand-gold-600 transition"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION RÉALISATIONS PHARES */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-400 bg-brand-gold-500/10 px-3.5 py-1 rounded-full border border-brand-gold-500/20">
                Expérience Terrain
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Aperçu de nos Réalisations Récentes
              </h2>
            </div>
            <Link
              href="/realisations"
              className="inline-flex items-center space-x-2 text-brand-gold-400 hover:text-brand-gold-300 font-semibold text-sm group"
            >
              <span>Voir tous nos projets</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRealisations.map((project) => (
              <Link
                key={project.id}
                href={`/realisations/${project.id}`}
                className="group block rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/80 hover:border-brand-gold-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.image_url}
                    alt={project.nom}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-brand-gold-400 text-xs font-bold border border-brand-gold-500/30">
                    {project.puissance_kwc} kWc
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/70 text-slate-300 text-xs font-medium">
                    {project.annee}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-gold-400 transition line-clamp-1">
                    {project.nom}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    📍 {project.localisation}
                  </p>
                  <p className="text-sm text-slate-300 line-clamp-2 pt-1 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="pt-3 flex items-center text-xs font-semibold text-brand-gold-400 group-hover:underline">
                    <span>Consulter la fiche projet</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POURQUOI CHOISIR 2A BUSINESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 bg-brand-gold-50 px-3.5 py-1 rounded-full border border-brand-gold-200">
              Pourquoi nous faire confiance ?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Une rigueur d'ingénierie et un accompagnement de bout en bout
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chez 2A Business, chaque projet commence par une analyse précise de vos besoins pour vous proposer la solution technique la plus efficiente et rentable sur le long terme.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Dimensionnement Certifié & Sur-Mesure</h4>
                  <p className="text-sm text-slate-500">Études d'ensoleillement et calculs de charge par des logiciels spécialisés (PVsyst, AutoCAD).</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-50 text-brand-gold-600 rounded-lg flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Composants de Marque & Garanties Constructeur</h4>
                  <p className="text-sm text-slate-500">Panneaux solaires garantis 25 ans, onduleurs garantis jusqu'à 10 ans et batteries LiFePO4 longue durée.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg flex-shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Service Après-Vente & Télésurveillance</h4>
                  <p className="text-sm text-slate-500">Contrats de maintenance réactifs et monitoring à distance pour anticiper tout dysfonctionnement.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="relative h-[420px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                alt="2A Business Solaire Ingénierie"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white">
                <p className="text-xs text-brand-gold-400 font-bold uppercase tracking-wider">Engagement Qualité 2A</p>
                <p className="text-sm font-medium mt-1">« Nous transformons la lumière solaire en autonomie et en valeur économique pour votre entreprise. »</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BANNIÈRE APPEL À L'ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Prêt à concrétiser votre projet solaire ou électrique ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Nos ingénieurs vous conseillent gratuitement pour étudier la faisabilité technique et établir un devis personnalisé.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-brand-gold-500/25"
              >
                Demander un devis en ligne
              </Link>
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Échanger sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

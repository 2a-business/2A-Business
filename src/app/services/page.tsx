import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import {
  Sun,
  Zap,
  TrendingUp,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  BarChart3,
  Cpu,
} from 'lucide-react';

export const metadata = {
  title: 'Nos Services | 2A Business',
  description: 'Solutions solaires photovoltaïques, électricité industrielle, pompage solaire et audits énergétiques par 2A Business.',
};

export default function ServicesPage() {
  const serviceList = [
    {
      id: 'solaire',
      title: 'Énergie Solaire Photovoltaïque Clé en Main',
      tagline: 'Devenez producteur de votre propre électricité propre et rentable',
      icon: Sun,
      color: 'from-amber-500 to-amber-600',
      description:
        'Que ce soit pour réduire votre dépendance au réseau public ou pour apporter l\'électricité dans des zones isolées, 2A Business conçoit et déploie des centrales solaires fiables, robustes et sur-mesure.',
      points: [
        'Centrales solaires raccordées au réseau (On-Grid) avec gestion intelligente de l\'injection',
        'Systèmes autonomes (Off-Grid) avec parcs batteries Lithium LiFePO4 longue durée',
        'Systèmes hybrides Solaire + Réseau + Groupe électrogène sans micro-coupure',
        'Pompage solaire agricole au fil du soleil pour forages et irrigation continue',
        'Supervision à distance de la production via application mobile et PC',
      ],
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'electricite',
      title: 'Électricité Générale & Industrielle Haute Fiabilité',
      tagline: 'Des infrastructures conformes pour une alimentation continue et sécurisée',
      icon: Zap,
      color: 'from-blue-600 to-indigo-700',
      description:
        'L\'expertise électrotechnique de 2A Business vous assure des installations conformes aux normes internationales, adaptées aux fortes charges industrielles et protégées contre tout incident électrique.',
      points: [
        'Étude, fabrication et câblage d\'armoires électriques TGBT et coffrets divisionnaires',
        'Réseaux de distribution Basse Tension (BT) et postes de transformation Moyenne Tension (MT)',
        'Installation et couplage automatique d\'inverseurs de source pour groupes électrogènes',
        'Mise à la terre, réseaux équipotentiels et protection foudre (parafoudres Type 1 et 2)',
        'Éclairage LED industriel et tertiaire à très basse consommation',
      ],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'efficacite',
      title: 'Audit & Efficacité Énergétique',
      tagline: 'Diminuez durablement vos charges d\'exploitation et optimisez vos flux',
      icon: TrendingUp,
      color: 'from-emerald-600 to-teal-700',
      description:
        'Notre équipe d\'ingénieurs audite vos installations pour déceler les gaspillages, optimiser vos abonnements et vous proposer un plan d\'investissement à retour rapide.',
      points: [
        'Campagne de mesures et analyse fine de la courbe de charge (analyseur de réseau)',
        'Compensation de l\'énergie réactive (batteries de condensateurs pour supprimer les pénalités)',
        'Détection des points chauds par thermographie infrarouge haute résolution',
        'Calcul du retour sur investissement (ROI) et préconisations concrètes',
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'maintenance',
      title: 'Maintenance Préventive & Dépannage 24/7',
      tagline: 'La garantie d\'une disponibilité maximale de vos équipements',
      icon: Wrench,
      color: 'from-slate-700 to-slate-900',
      description:
        'Une installation solaire ou industrielle requiert un entretien régulier pour maintenir son rendement optimal au fil des décennies. Nous intervenons avec rapidité et rigueur.',
      points: [
        'Contrats de maintenance préventive personnalisés (annuels ou semestriels)',
        'Nettoyage professionnel des modules solaires et dépoussiérage des armoires',
        'Contrôle des serrages au couple et diagnostic de santé des batteries',
        'Astreinte et service d\'intervention rapide pour les urgences critiques',
      ],
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <div>
      {/* En-tête obligatoire avec flèche de retour et bouton bien visible vers Réalisations */}
      <PageHeader
        title="Nos Services & Offres"
        subtitle="Des compétences de haut niveau pour tous vos projets d'énergie solaire et d'infrastructures électriques."
        badge="Expertise Technique Clé en Main"
      >
        {/* BOUTON VISIBLE VERS NOS RÉALISATIONS DANS L'EN-TÊTE */}
        <Link
          href="/realisations"
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-brand-gold-500/20"
        >
          <span>Voir nos réalisations</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Bannière d'appel d'en-tête vers Réalisations */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-brand-gold-500/20 rounded-xl text-brand-gold-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-base text-white">
                Découvrez nos projets concrètement installés sur le terrain
              </p>
              <p className="text-xs text-slate-300">
                Centrales toiture, mini-réseaux, postes MT/BT et pompage solaire.
              </p>
            </div>
          </div>
          <Link
            href="/realisations"
            className="flex-shrink-0 px-6 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
          >
            Consulter la Galerie Projets
          </Link>
        </div>

        {/* Liste détaillée des services */}
        <div className="space-y-20">
          {serviceList.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Colonne Contenu */}
                <div
                  className={`space-y-6 lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold">
                    <Icon className="w-4 h-4 text-brand-gold-600" />
                    <span>Domaine Spécialisé 0{index + 1}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-brand-gold-600 font-semibold text-sm">
                    {service.tagline}
                  </p>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {service.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {service.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-3">
                        <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md mt-0.5 flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-slate-700 font-medium">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                    >
                      Demander un devis pour ce service
                    </Link>
                    <Link
                      href="/realisations"
                      className="px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-brand-gold-700 border border-brand-gold-200 text-xs font-bold uppercase tracking-wider transition flex items-center space-x-1.5"
                    >
                      <span>Voir les réalisations associées</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Colonne Image */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                    <div className="relative h-80 sm:h-96 w-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA FINAL VISIBLE VERS LES RÉALISATIONS */}
        <div className="rounded-3xl bg-brand-gold-500 text-slate-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Convaincu par nos compétences ?
            </h3>
            <p className="text-slate-900 font-medium text-sm sm:text-base">
              Explorez en détail les centrales solaires et chantiers électriques que nous avons déjà livrés avec succès.
            </p>
          </div>
          <Link
            href="/realisations"
            className="flex-shrink-0 px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm tracking-wide uppercase transition shadow-lg flex items-center space-x-2"
          >
            <span>Accéder à Nos Réalisations</span>
            <ArrowRight className="w-4 h-4 text-brand-gold-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

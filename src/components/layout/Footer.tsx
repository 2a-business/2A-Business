import React from 'react';
import Link from 'next/link';
import {
  Sun,
  Zap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { createGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Colonne 1 : Entreprise */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-gold-600 to-brand-gold-400 flex items-center justify-center">
                <Sun className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  2A
                </span>
                <span className="font-bold text-2xl tracking-wider text-brand-gold-400">
                  BUSINESS
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Leader en ingénierie énergétique, installations solaires photovoltaïques et infrastructures électriques haute et basse tension. Nous propulsons la transition énergétique des entreprises et particuliers.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-gold-400 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certifié QualiPV & Normes NFC 15-100</span>
            </div>
          </div>

          {/* Colonne 2 : Navigation Rapide */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-gold-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-brand-gold-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>À propos de nous</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-gold-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Nos services</span>
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-brand-gold-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Nos réalisations</span>
                </Link>
              </li>
              <li>
                <Link href="/produits" className="hover:text-brand-gold-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Catalogue produits</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Contact & Commande</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Nos Spécialités */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              Nos Solutions
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>Centrales Solaires Hybrides & Autonomes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>Électricité Industrielle & Tertiaire</span>
              </li>
              <li className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>Armoires Électriques & TGBT</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>Pompage Solaire Agricole</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>Audit & Efficacité Énergétique</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées Directes */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              Contact Direct
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <span>Nord Foire en face terrain basket, Dakar, Sénégal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
                <div className="space-x-1.5">
                  <a href="tel:+221770620408" className="hover:text-white transition">
                    +221 77 062 04 08
                  </a>
                  <span>/</span>
                  <a href="tel:+221773783368" className="hover:text-white transition">
                    77 378 33 68
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
                <a href="mailto:direction2a.business@gmail.com" className="hover:text-white transition break-all">
                  direction2a.business@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <span>Lun - Sam : 08h00 - 18h30 (Support d'urgence 24/7)</span>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href={createGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
              >
                <span>Écrivez-nous sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} 2A Business. Tous droits réservés.</p>
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-slate-300 transition">
              Espace Administrateur
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition">
              Demande de devis
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

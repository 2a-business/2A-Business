'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../cart/CartContext';
import {
  Sun,
  Zap,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck,
  PhoneCall,
  Phone,
  MapPin,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function Header() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Nos services', href: '/services' },
    { label: 'Nos réalisations', href: '/realisations' },
    { label: 'Nos produits', href: '/produits' },
    { label: 'Contact & Commande', href: '/contact' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg">
      {/* Barre d'Informations Officielles Supérieure */}
      <div className="bg-slate-950 text-slate-300 text-[11px] sm:text-xs border-b border-slate-800 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Localisation précise au Sénégal */}
          <div className="flex items-center space-x-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
            <span className="font-medium truncate">
              Nord Foire en face terrain basket, Sénégal
            </span>
          </div>

          {/* Contact : Email & Téléphones officiels */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
              <a
                href="mailto:direction2a.business@gmail.com"
                className="hover:text-white transition"
              >
                direction2a.business@gmail.com
              </a>
            </div>

            <div className="flex items-center space-x-1.5 font-bold text-white">
              <Phone className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
              <a
                href="tel:+221770620408"
                className="hover:text-brand-gold-400 transition"
              >
                77 062 04 08
              </a>
              <span className="text-slate-500">/</span>
              <a
                href="tel:+221773783368"
                className="hover:text-brand-gold-400 transition"
              >
                77 378 33 68
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo 2A Business */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-gold-600 to-brand-gold-400 flex items-center justify-center shadow-md shadow-brand-gold-500/20 group-hover:scale-105 transition">
              <div className="relative">
                <Sun className="w-6 h-6 text-slate-950 stroke-[2.2]" />
                <Zap className="w-3.5 h-3.5 text-white fill-white absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-brand-gold-400 transition">
                  2A
                </span>
                <span className="font-bold text-2xl tracking-wider text-brand-gold-400">
                  BUSINESS
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                Énergie Solaire & Électricité
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition duration-150',
                    active
                      ? 'bg-slate-800 text-brand-gold-400 font-semibold shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Panier */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-5 h-5 text-brand-gold-400" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-gold-500 text-slate-950 text-xs font-extrabold flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Lien Admin */}
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Accès Administrateur"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>Admin</span>
            </Link>

            {/* Bouton Contact Direct */}
            <a
              href={createGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-xs tracking-wide uppercase transition shadow-md shadow-brand-gold-500/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Devis Express</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              aria-label="Menu mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-xl text-base font-medium transition',
                  active
                    ? 'bg-slate-800 text-brand-gold-400 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Coordonnées rapides sur mobile */}
          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-400 px-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
              <span>Nord Foire en face terrain basket, Sénégal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
              <div className="space-x-1 font-semibold text-slate-200">
                <a href="tel:+221770620408" className="hover:text-brand-gold-400">77 062 04 08</a>
                <span>/</span>
                <a href="tel:+221773783368" className="hover:text-brand-gold-400">77 378 33 68</a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-brand-gold-400 flex-shrink-0" />
              <a href="mailto:direction2a.business@gmail.com" className="hover:text-white break-all">
                direction2a.business@gmail.com
              </a>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white bg-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-brand-gold-400" />
              <span>Espace Admin</span>
            </Link>
            <a
              href={createGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp (77 062 04 08)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

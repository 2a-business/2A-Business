'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  const link = createGeneralWhatsAppLink();

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-slate-700 hidden sm:block">
        <p className="font-bold text-brand-gold-400">Besoin d'un devis express ?</p>
        <p className="text-slate-300">Discutez en direct avec un expert 2A Business</p>
      </div>

      {/* Floating Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter 2A Business sur WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping" />
        <MessageCircle className="w-7 h-7 relative z-10 fill-white text-emerald-500" />
      </a>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { formatPrice } from '@/lib/utils';
import { createCartWhatsAppLink } from '@/lib/whatsapp';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
    getCommandeArticles,
  } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/contact');
  };

  const handleWhatsAppOrder = () => {
    const link = createCartWhatsAppLink(getCommandeArticles(), totalPrice);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-gold-500 rounded-lg text-slate-950">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Votre Panier</h2>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems > 1 ? 'articles sélectionnés' : 'article sélectionné'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  Votre panier est vide
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Parcourez notre catalogue pour découvrir nos panneaux solaires, onduleurs et équipements.
                </p>
                <Link
                  href="/produits"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center px-4 py-2.5 rounded-lg bg-brand-gold-500 text-slate-950 font-semibold text-sm hover:bg-brand-gold-400 transition"
                >
                  Voir les produits
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            ) : (
              items.map(({ article, quantite }) => (
                <div
                  key={article.id}
                  className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                    <Image
                      src={article.image_url}
                      alt={article.nom}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {article.nom}
                        </h4>
                        <button
                          onClick={() => removeFromCart(article.id)}
                          className="text-slate-400 hover:text-red-500 transition p-0.5"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="inline-block text-xs font-medium text-slate-500 mt-0.5">
                        {article.categorie}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {formatPrice(article.prix * quantite)}
                      </span>
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(article.id, quantite - 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded-l transition"
                          title="Diminuer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-slate-800">
                          {quantite}
                        </span>
                        <button
                          onClick={() => updateQuantity(article.id, quantite + 1)}
                          className="p-1 text-slate-600 hover:bg-slate-100 rounded-r transition"
                          title="Augmenter"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span>Sous-total articles</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold text-slate-900 pt-1 border-t border-slate-100">
                <span>Total estimé</span>
                <span className="text-brand-gold-600 text-lg">{formatPrice(totalPrice)}</span>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition flex items-center justify-center space-x-2 shadow-lg shadow-slate-900/10"
                >
                  <span>Valider la commande</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Commander via WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Devis personnalisé et confirmation de disponibilité sans engagement
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

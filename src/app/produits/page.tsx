'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { Article } from '@/types';
import { getArticles } from '@/lib/firebase/firestore';
import { INITIAL_ARTICLES } from '@/lib/seedData';
import { useCart } from '@/components/cart/CartContext';
import { formatPrice } from '@/lib/utils';
import { createProductWhatsAppLink, createCartWhatsAppLink } from '@/lib/whatsapp';
import {
  ShoppingBag,
  Plus,
  Check,
  Filter,
  Search,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function ProduitsPage() {
  const router = useRouter();
  const { addToCart, items, totalItems, totalPrice, setIsCartOpen, getCommandeArticles } =
    useCart();

  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [filtered, setFiltered] = useState<Article[]>(INITIAL_ARTICLES);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories = [
    'Toutes',
    'Panneaux Solaires',
    'Onduleurs',
    'Batteries de Stockage',
    'Régulateurs & Accessoires',
    'Équipements Électriques',
    'Kits Solaires',
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getArticles();
        // Ne montrer que les articles en stock ou épuisés (exclure ceux en Corbeille)
        const visibleArticles = data.filter((a) => a.disponibilite !== 'Corbeille');
        setArticles(visibleArticles);
        setFiltered(visibleArticles);
      } catch (err) {
        console.error('Erreur chargement articles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    let result = articles.filter((a) => a.disponibilite !== 'Corbeille');

    if (selectedCategory !== 'Toutes') {
      result = result.filter((a) => a.categorie === selectedCategory);
    }

    if (selectedPriceRange === 'low') {
      result = result.filter((a) => a.prix < 200000);
    } else if (selectedPriceRange === 'mid') {
      result = result.filter((a) => a.prix >= 200000 && a.prix <= 800000);
    } else if (selectedPriceRange === 'high') {
      result = result.filter((a) => a.prix > 800000);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.nom.toLowerCase().includes(term) ||
          a.description.toLowerCase().includes(term) ||
          a.categorie.toLowerCase().includes(term)
      );
    }

    setFiltered(result);
  }, [selectedCategory, selectedPriceRange, searchTerm, articles]);

  const handleAddToCart = (article: Article) => {
    addToCart(article, 1);
    setAddedItemIds((prev) => ({ ...prev, [article.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [article.id]: false }));
    }, 1500);
  };

  const handleValidateOrder = () => {
    router.push('/contact');
  };

  const handleWhatsAppCartOrder = () => {
    const link = createCartWhatsAppLink(getCommandeArticles(), totalPrice);
    window.open(link, '_blank');
  };

  return (
    <div className="pb-28">
      {/* En-tête obligatoire avec flèche de retour */}
      <PageHeader
        title="Nos Produits & Matériels"
        subtitle="Catalogue complet d'équipements solaires photovoltaïques et d'infrastructures électriques certifiés."
        badge="Matériel Garanti Tier-1"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Barre de Recherche et Filtres */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* Ligne 1 : Recherche + Fourchette de Prix */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par nom (panneau, onduleur, 5kVA...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Filtre Prix */}
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-semibold text-slate-500 flex items-center mr-1">
                <Filter className="w-3.5 h-3.5 mr-1" />
                Prix :
              </span>
              <button
                onClick={() => setSelectedPriceRange('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedPriceRange === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tous les prix
              </button>
              <button
                onClick={() => setSelectedPriceRange('low')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedPriceRange === 'low'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                &lt; 200 000 FCFA
              </button>
              <button
                onClick={() => setSelectedPriceRange('mid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedPriceRange === 'mid'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                200 000 - 800 000 FCFA
              </button>
              <button
                onClick={() => setSelectedPriceRange('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                  selectedPriceRange === 'high'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                &gt; 800 000 FCFA
              </button>
            </div>
          </div>

          {/* Ligne 2 : Catégories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-t border-slate-100 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-brand-gold-500 text-slate-950 shadow-md shadow-brand-gold-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de Produits */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-500">Chargement des produits...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-base font-semibold text-slate-800">
              Aucun produit ne correspond à vos critères.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Toutes');
                setSelectedPriceRange('all');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => {
              const isAdded = addedItemIds[article.id];
              const isOutOfStock = article.disponibilite === 'Épuisé';

              return (
                <div
                  key={article.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-brand-gold-400 hover:shadow-xl transition-all duration-300"
                >
                  {/* Photo Produit */}
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={article.image_url}
                      alt={article.nom}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Catégorie */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
                      {article.categorie}
                    </span>

                    {/* Badge Disponibilité */}
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isOutOfStock
                          ? 'bg-red-500 text-white'
                          : 'bg-emerald-500 text-white shadow-md'
                      }`}
                    >
                      {article.disponibilite}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                        {article.nom}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {article.description}
                      </p>

                      {/* Caractéristiques */}
                      {article.caracteristiques && article.caracteristiques.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          {article.caracteristiques.slice(0, 3).map((carac, idx) => (
                            <div key={idx} className="flex items-center text-xs text-slate-500">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 flex-shrink-0" />
                              <span className="line-clamp-1">{carac}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Prix et Actions */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                            Prix unitaire
                          </span>
                          <span className="text-xl font-black text-slate-950">
                            {formatPrice(article.prix)}
                          </span>
                        </div>
                        {/* Bouton WhatsApp direct pour ce produit */}
                        <a
                          href={createProductWhatsAppLink(article.nom, article.prix)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                          title="Demander sur WhatsApp"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </a>
                      </div>

                      {/* Bouton Ajouter au Panier */}
                      <button
                        onClick={() => handleAddToCart(article)}
                        disabled={isOutOfStock}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-sm ${
                          isOutOfStock
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Ajouté au panier !</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Ajouter au panier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BARRE FIXE DU PANIER EN BAS DE PAGE (QUAND DES ARTICLES SONT SÉLECTIONNÉS) */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white p-4 shadow-2xl animate-in slide-in-from-bottom">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-brand-gold-500 text-slate-950 rounded-2xl">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {totalItems} {totalItems > 1 ? 'articles sélectionnés' : 'article sélectionné'}
                </p>
                <p className="text-xs text-slate-300">
                  Total estimé :{' '}
                  <span className="text-brand-gold-400 font-black text-sm">
                    {formatPrice(totalPrice)}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
              >
                Voir le détail
              </button>

              {/* Bouton de validation redirigeant vers Contact/Commande en conservant les articles */}
              <button
                onClick={handleValidateOrder}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold-500/20"
              >
                <span>Valider la commande</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Possibilité de basculer aussi vers une commande directe sur WhatsApp */}
              <button
                onClick={handleWhatsAppCartOrder}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center shadow-md"
                title="Commander directement via WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

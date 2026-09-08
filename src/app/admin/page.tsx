'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { checkIsAdminLoggedIn, logoutAdmin } from '@/lib/firebase/auth';
import { isFirebaseConfigured } from '@/lib/firebase/config';
import { getRealisations, getArticles, getCommandes, getMedias } from '@/lib/firebase/firestore';
import RealisationsAdmin from '@/components/admin/RealisationsAdmin';
import ProductsAdmin from '@/components/admin/ProductsAdmin';
import TrashAdmin from '@/components/admin/TrashAdmin';
import OrdersAdmin from '@/components/admin/OrdersAdmin';
import MediaGallery from '@/components/admin/MediaGallery';
import {
  ShieldCheck,
  LogOut,
  FolderKanban,
  Package,
  Trash2,
  ShoppingBag,
  Image as ImageIcon,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'realisations' | 'products' | 'trash' | 'orders' | 'medias'>(
    'realisations'
  );

  // Stats
  const [stats, setStats] = useState({
    realisationsCount: 0,
    productsCount: 0,
    trashCount: 0,
    ordersCount: 0,
    mediasCount: 0,
  });

  useEffect(() => {
    const logged = checkIsAdminLoggedIn();
    if (!logged) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadStats();
    }
  }, [router]);

  async function loadStats() {
    try {
      const [reals, arts, cmds, meds] = await Promise.all([
        getRealisations(),
        getArticles(),
        getCommandes(),
        getMedias(),
      ]);

      setStats({
        realisationsCount: reals.length,
        productsCount: arts.filter((a) => a.disponibilite !== 'Corbeille').length,
        trashCount: arts.filter((a) => a.disponibilite === 'Corbeille').length,
        ordersCount: cmds.length,
        mediasCount: meds.length,
      });
    } catch (e) {
      console.error('Erreur chargement métriques admin:', e);
    }
  }

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 font-medium">Vérification de la session administrateur...</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* En-tête obligatoire avec flèche de retour */}
      <PageHeader
        title="Tableau de Bord Administrateur"
        subtitle="Gestion complète des projets, catalogue produits, corbeille, commandes et médiathèque Firebase Storage."
        badge="Espace Sécurisé 2A Business"
        fallbackHref="/"
      >
        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition text-xs font-bold"
        >
          <LogOut className="w-3.5 h-3.5 text-red-400" />
          <span>Déconnexion</span>
        </button>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Statut de connexion Firebase / Démo */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2.5 rounded-xl ${
                isFirebaseConfigured
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-amber-50 text-brand-gold-600 border border-brand-gold-200'
              }`}
            >
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {isFirebaseConfigured
                  ? 'Connecté à Firebase Cloud (Firestore & Storage)'
                  : 'Mode Démo & Persistance Locale Active'}
              </p>
              <p className="text-[11px] text-slate-500">
                {isFirebaseConfigured
                  ? 'Toutes les modifications sont synchronisées avec vos collections Firestore et bucket Storage.'
                  : 'Pour synchroniser avec votre compte Firebase de production, ajoutez vos clés dans le fichier .env.local.'}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isFirebaseConfigured
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isFirebaseConfigured ? 'Production Live' : 'Mode Démo Résilient'}
          </span>
        </div>

        {/* Métriques clés */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab('realisations')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'realisations'
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Réalisations
              </span>
              <FolderKanban className="w-4 h-4 text-brand-gold-400" />
            </div>
            <p className="text-3xl font-black mt-2">{stats.realisationsCount}</p>
            <p className="text-[10px] opacity-70 mt-1">Projets en ligne</p>
          </div>

          <div
            onClick={() => setActiveTab('products')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Catalogue
              </span>
              <Package className="w-4 h-4 text-brand-gold-400" />
            </div>
            <p className="text-3xl font-black mt-2">{stats.productsCount}</p>
            <p className="text-[10px] opacity-70 mt-1">Articles actifs</p>
          </div>

          <div
            onClick={() => setActiveTab('trash')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'trash'
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Corbeille
              </span>
              <Trash2 className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-3xl font-black mt-2 text-red-500">{stats.trashCount}</p>
            <p className="text-[10px] opacity-70 mt-1">Restaurable en 1 clic</p>
          </div>

          <div
            onClick={() => setActiveTab('orders')}
            className={`p-5 rounded-2xl border cursor-pointer transition ${
              activeTab === 'orders'
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Commandes
              </span>
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-black mt-2">{stats.ordersCount}</p>
            <p className="text-[10px] opacity-70 mt-1">Clients & Statuts</p>
          </div>
        </div>

        {/* Barre d'onglets */}
        <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('realisations')}
            className={`pb-3 px-4 text-xs font-bold transition whitespace-nowrap border-b-2 flex items-center space-x-2 ${
              activeTab === 'realisations'
                ? 'border-brand-gold-500 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Gestion Réalisations</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-4 text-xs font-bold transition whitespace-nowrap border-b-2 flex items-center space-x-2 ${
              activeTab === 'products'
                ? 'border-brand-gold-500 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalogue Produits</span>
          </button>

          <button
            onClick={() => setActiveTab('trash')}
            className={`pb-3 px-4 text-xs font-bold transition whitespace-nowrap border-b-2 flex items-center space-x-2 ${
              activeTab === 'trash'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Corbeille Produits ({stats.trashCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-4 text-xs font-bold transition whitespace-nowrap border-b-2 flex items-center space-x-2 ${
              activeTab === 'orders'
                ? 'border-brand-gold-500 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Gestion des Commandes</span>
          </button>

          <button
            onClick={() => setActiveTab('medias')}
            className={`pb-3 px-4 text-xs font-bold transition whitespace-nowrap border-b-2 flex items-center space-x-2 ${
              activeTab === 'medias'
                ? 'border-brand-gold-500 text-slate-950'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Médiathèque Storage</span>
          </button>
        </div>

        {/* Contenu selon l'onglet actif */}
        <div>
          {activeTab === 'realisations' && <RealisationsAdmin />}
          {activeTab === 'products' && <ProductsAdmin />}
          {activeTab === 'trash' && <TrashAdmin onRestored={loadStats} />}
          {activeTab === 'orders' && <OrdersAdmin />}
          {activeTab === 'medias' && <MediaGallery />}
        </div>
      </div>
    </div>
  );
}

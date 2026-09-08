'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Article } from '@/types';
import { getArticles, updateArticleStatus, deleteArticlePermanently } from '@/lib/firebase/firestore';
import { formatPrice } from '@/lib/utils';
import { RotateCcw, Trash2, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TrashAdminProps {
  onRestored?: () => void;
}

export default function TrashAdmin({ onRestored }: TrashAdminProps) {
  const [trashedArticles, setTrashedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    loadTrash();
  }, []);

  async function loadTrash() {
    try {
      const all = await getArticles();
      const trashed = all.filter((a) => a.disponibilite === 'Corbeille');
      setTrashedArticles(trashed);
    } catch (e) {
      console.error('Erreur chargement corbeille:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleRestore = async (article: Article) => {
    try {
      await updateArticleStatus(article.id, 'En stock');
      setNotice(`L'article "${article.nom}" a été restauré avec succès dans le catalogue.`);
      await loadTrash();
      if (onRestored) onRestored();
      setTimeout(() => setNotice(null), 3500);
    } catch (err) {
      console.error('Erreur restauration article:', err);
    }
  };

  const handlePermanentDelete = async (article: Article) => {
    if (
      confirm(
        `ATTENTION : Supprimer définitivement "${article.nom}" ? Cette action est irréversible et supprimera le document de Firestore.`
      )
    ) {
      try {
        await deleteArticlePermanently(article.id);
        await loadTrash();
      } catch (err) {
        console.error('Erreur suppression définitive:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>Système de Corbeille Produits</span>
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-black">
              {trashedArticles.length}
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Les produits supprimés ou mis au rebut sont conservés ici. Vous pouvez les restaurer en 1 clic à tout moment.
          </p>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Tableau Corbeille */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Chargement de la corbeille...
          </div>
        ) : trashedArticles.length === 0 ? (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <Trash2 className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="text-sm font-semibold text-slate-700">La corbeille est vide</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Tous vos articles épuisés ou supprimés temporairement apparaîtront ici avec possibilité de restauration immédiate.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-red-50/50 border-b border-red-100 text-red-900 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Article en Corbeille</th>
                  <th className="py-3.5 px-4">Catégorie</th>
                  <th className="py-3.5 px-4">Dernier Prix</th>
                  <th className="py-3.5 px-4">Statut</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {trashedArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 grayscale">
                          <Image
                            src={art.image_url}
                            alt={art.nom}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{art.nom}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                            {art.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
                        {art.categorie}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {formatPrice(art.prix)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                        Corbeille
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        {/* RESTAURATION EN 1 CLIC */}
                        <button
                          onClick={() => handleRestore(art)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition flex items-center space-x-1 border border-emerald-200"
                          title="Restaurer en un clic dans le catalogue"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restaurer</span>
                        </button>

                        {/* SUPPRESSION DÉFINITIVE */}
                        <button
                          onClick={() => handlePermanentDelete(art)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                          title="Supprimer définitivement de la base"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

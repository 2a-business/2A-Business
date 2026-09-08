'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Article, DisponibiliteProduit } from '@/types';
import { getArticles, saveArticle, updateArticleStatus } from '@/lib/firebase/firestore';
import { formatPrice } from '@/lib/utils';
import ImageSelectorModal from './ImageSelectorModal';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Tag,
  DollarSign,
  X,
  AlertTriangle,
} from 'lucide-react';

export default function ProductsAdmin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    nom: '',
    description: '',
    caracteristiques: ['Garantie constructeur 10 ans'],
    prix: 100000,
    disponibilite: 'En stock',
    categorie: 'Panneaux Solaires',
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  });

  const [caracInput, setCaracInput] = useState('');

  const categories = [
    'Panneaux Solaires',
    'Onduleurs',
    'Batteries de Stockage',
    'Régulateurs & Accessoires',
    'Équipements Électriques',
    'Kits Solaires',
  ];

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const list = await getArticles();
      // Filtrer pour n'afficher que les articles actifs (ceux qui ne sont pas dans la Corbeille)
      setArticles(list.filter((a) => a.disponibilite !== 'Corbeille'));
    } catch (e) {
      console.error('Erreur chargement articles:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      nom: '',
      description: '',
      caracteristiques: ['Garantie constructeur'],
      prix: 150000,
      disponibilite: 'En stock',
      categorie: 'Panneaux Solaires',
      image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    });
    setCaracInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: Article) => {
    setEditingArticle(a);
    setFormData({
      nom: a.nom,
      description: a.description,
      caracteristiques: a.caracteristiques || [],
      prix: a.prix,
      disponibilite: a.disponibilite,
      categorie: a.categorie,
      image_url: a.image_url,
    });
    setCaracInput('');
    setIsModalOpen(true);
  };

  // Mettre à la corbeille (système de corbeille demandé)
  const handleMoveToTrash = async (a: Article) => {
    if (confirm(`Déplacer "${a.nom}" vers la corbeille ? Vous pourrez le restaurer à tout moment dans l'onglet Corbeille.`)) {
      try {
        await updateArticleStatus(a.id, 'Corbeille');
        await loadArticles();
      } catch (err) {
        console.error('Erreur déplacement corbeille:', err);
      }
    }
  };

  // Basculer disponibilité (En stock <-> Épuisé)
  const handleToggleAvailability = async (a: Article) => {
    const nextStatus: DisponibiliteProduit = a.disponibilite === 'En stock' ? 'Épuisé' : 'En stock';
    try {
      await updateArticleStatus(a.id, nextStatus);
      await loadArticles();
    } catch (err) {
      console.error('Erreur changement disponibilité:', err);
    }
  };

  const handleAddCharacteristic = () => {
    if (caracInput.trim()) {
      setFormData({
        ...formData,
        caracteristiques: [...formData.caracteristiques, caracInput.trim()],
      });
      setCaracInput('');
    }
  };

  const handleRemoveCharacteristic = (index: number) => {
    setFormData({
      ...formData,
      caracteristiques: formData.caracteristiques.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const item: Article = {
        id: editingArticle ? editingArticle.id : `prod-${Date.now()}`,
        nom: formData.nom,
        description: formData.description,
        caracteristiques: formData.caracteristiques,
        prix: Number(formData.prix),
        disponibilite: formData.disponibilite,
        categorie: formData.categorie,
        image_url: formData.image_url,
      };

      await saveArticle(item);
      await loadArticles();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Erreur sauvegarde article:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête du module */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Catalogue Produits Actifs ({articles.length})
          </h3>
          <p className="text-xs text-slate-500">
            Gérez les prix, la disponibilité et les caractéristiques techniques de vos équipements.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider transition shadow-md"
        >
          <Plus className="w-4 h-4 text-brand-gold-400" />
          <span>Ajouter un produit</span>
        </button>
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Chargement des articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Aucun article actif dans le catalogue.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Catégorie</th>
                  <th className="py-3.5 px-4">Prix Unitaire</th>
                  <th className="py-3.5 px-4">Disponibilité</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
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
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {art.categorie}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-950 text-sm">
                      {formatPrice(art.prix)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAvailability(art)}
                        className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold transition ${
                          art.disponibilite === 'En stock'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                        title="Cliquer pour basculer la disponibilité"
                      >
                        {art.disponibilite === 'En stock' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>En stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            <span>Épuisé</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand-gold-600 hover:bg-amber-50"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveToTrash(art)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          title="Mettre à la corbeille"
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

      {/* MODALE D'AJOUT / MODIFICATION DE PRODUIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h4 className="text-lg font-bold text-slate-900">
                {editingArticle ? 'Modifier le Produit' : 'Ajouter un Produit au Catalogue'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Ex: Panneau Solaire Monocristallin 550W Tier-1"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              {/* Catégorie & Prix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    list="categories-datalist"
                    value={formData.categorie}
                    onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                    placeholder="Ex: Panneaux Solaires, Pompes solaires, Électroménager…"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none bg-white"
                  />
                  <datalist id="categories-datalist">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.prix}
                    onChange={(e) =>
                      setFormData({ ...formData, prix: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Disponibilité */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Disponibilité *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="disponibilite"
                      value="En stock"
                      checked={formData.disponibilite === 'En stock'}
                      onChange={() => setFormData({ ...formData, disponibilite: 'En stock' })}
                      className="text-brand-gold-500 focus:ring-brand-gold-500"
                    />
                    <span>En stock</span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="disponibilite"
                      value="Épuisé"
                      checked={formData.disponibilite === 'Épuisé'}
                      onChange={() => setFormData({ ...formData, disponibilite: 'Épuisé' })}
                      className="text-brand-gold-500 focus:ring-brand-gold-500"
                    />
                    <span>Épuisé</span>
                  </label>
                </div>
              </div>

              {/* Image (Upload direct ou Médiathèque) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Image Produit (Firebase Storage) *
                </label>
                <div className="flex items-center space-x-4 p-3 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="relative w-20 h-20 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0 border border-slate-300">
                    {formData.image_url ? (
                      <Image
                        src={formData.image_url}
                        alt="Aperçu"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400 m-auto mt-7" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <button
                      type="button"
                      onClick={() => setIsImagePickerOpen(true)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center space-x-2"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>Choisir une image (Upload ou Médiathèque)</span>
                    </button>
                    <p className="text-[10px] text-slate-400">
                      URL : <span className="text-slate-600 truncate inline-block max-w-xs align-bottom">{formData.image_url}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Points clés, usage recommandé..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none resize-none"
                />
              </div>

              {/* Caractéristiques */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Caractéristiques techniques clés
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={caracInput}
                    onChange={(e) => setCaracInput(e.target.value)}
                    placeholder="Ex: Puissance 550Wc / Tension 48V"
                    className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCharacteristic();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCharacteristic}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                  >
                    Ajouter
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.caracteristiques.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs"
                    >
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCharacteristic(i)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition shadow-md"
                >
                  {editingArticle ? 'Enregistrer les modifications' : 'Ajouter au catalogue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SÉLECTEUR D'IMAGE */}
      <ImageSelectorModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        currentImageUrl={formData.image_url}
        onSelectImage={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
      />
    </div>
  );
}

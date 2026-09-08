'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Realisation } from '@/types';
import { getRealisations, saveRealisation, deleteRealisation } from '@/lib/firebase/firestore';
import ImageSelectorModal from './ImageSelectorModal';
import {
  Plus,
  Edit2,
  Trash2,
  Zap,
  MapPin,
  Calendar,
  ExternalLink,
  Check,
  X,
  Image as ImageIcon,
} from 'lucide-react';

export default function RealisationsAdmin() {
  const [projects, setProjects] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);

  // Modale d'ajout / modification
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Realisation | null>(null);

  // Modale de choix d'image (Upload ou Médiathèque)
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Realisation, 'id'>>({
    nom: '',
    localisation: '',
    puissance_kwc: 50,
    annee: new Date().getFullYear(),
    description: '',
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const list = await getRealisations();
      setProjects(list);
    } catch (e) {
      console.error('Erreur chargement réalisations:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      nom: '',
      localisation: 'Dakar, Sénégal',
      puissance_kwc: 50,
      annee: new Date().getFullYear(),
      description: '',
      image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Realisation) => {
    setEditingProject(p);
    setFormData({
      nom: p.nom,
      localisation: p.localisation,
      puissance_kwc: p.puissance_kwc,
      annee: p.annee,
      description: p.description,
      image_url: p.image_url,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Supprimer définitivement la réalisation "${name}" ?`)) {
      try {
        await deleteRealisation(id);
        await loadProjects();
      } catch (err) {
        console.error('Erreur suppression projet:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const item: Realisation = {
        id: editingProject ? editingProject.id : `real-${Date.now()}`,
        nom: formData.nom,
        localisation: formData.localisation,
        puissance_kwc: Number(formData.puissance_kwc),
        annee: Number(formData.annee),
        description: formData.description,
        image_url: formData.image_url,
      };

      await saveRealisation(item);
      await loadProjects();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Erreur sauvegarde réalisation:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête du module */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Gestion des Réalisations & Chantiers
          </h3>
          <p className="text-xs text-slate-500">
            Ajoutez, modifiez ou supprimez les projets affichés dans la galerie publique.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider transition shadow-md"
        >
          <Plus className="w-4 h-4 text-brand-gold-400" />
          <span>Ajouter un projet</span>
        </button>
      </div>

      {/* Tableau des réalisations */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Chargement des réalisations...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Aucun projet enregistré. Cliquez sur « Ajouter un projet » pour commencer.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Projet</th>
                  <th className="py-3.5 px-4">Localisation</th>
                  <th className="py-3.5 px-4">Puissance (kWc)</th>
                  <th className="py-3.5 px-4">Année</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                          <Image
                            src={p.image_url}
                            alt={p.nom}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{p.nom}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{p.localisation}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-slate-900">
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-brand-gold-700 border border-brand-gold-200 font-black">
                        {p.puissance_kwc} kWc
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">{p.annee}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center space-x-2">
                        <Link
                          href={`/realisations/${p.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                          title="Voir la page publique"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand-gold-600 hover:bg-amber-50"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.nom)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          title="Supprimer"
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

      {/* MODALE D'AJOUT / MODIFICATION DE RÉALISATION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h4 className="text-lg font-bold text-slate-900">
                {editingProject ? 'Modifier la Réalisation' : 'Ajouter une Nouvelle Réalisation'}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom du projet */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Nom du projet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Ex: Centrale Toiture Usine Agroalimentaire"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              {/* Localisation */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Localisation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.localisation}
                  onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                  placeholder="Ex: Diamniadio, Sénégal"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                />
              </div>

              {/* Puissance (kWc) & Année */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Puissance en kWc *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.puissance_kwc}
                    onChange={(e) =>
                      setFormData({ ...formData, puissance_kwc: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Année de réalisation *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.annee}
                    onChange={(e) =>
                      setFormData({ ...formData, annee: parseInt(e.target.value) || 2024 })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sélecteur d'Image (Upload direct OU sélection Médiathèque) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Image du Projet (Firebase Storage) *
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
                      URL active : <span className="text-slate-600 truncate inline-block max-w-xs align-bottom">{formData.image_url}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description détaillée du projet *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Détails techniques, nombre de panneaux, onduleurs utilisés, économies générées..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-gold-500 focus:outline-none resize-none"
                />
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
                  {editingProject ? 'Mettre à jour le projet' : 'Enregistrer le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SÉLECTEUR D'IMAGE (UPLOAD DIRECT OU MÉDIATHÈQUE) */}
      <ImageSelectorModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        currentImageUrl={formData.image_url}
        onSelectImage={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
      />
    </div>
  );
}

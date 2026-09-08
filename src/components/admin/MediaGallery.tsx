'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaItem } from '@/types';
import { getMedias } from '@/lib/firebase/firestore';
import { uploadImage, deleteStorageImage } from '@/lib/firebase/storage';
import { formatDateTime } from '@/lib/utils';
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  HardDrive,
} from 'lucide-react';

export default function MediaGallery() {
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadMedias();
  }, []);

  async function loadMedias() {
    try {
      const data = await getMedias();
      setMedias(data);
    } catch (e) {
      console.error('Erreur chargement médias:', e);
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadImage(file, 'medias');
      await loadMedias();
    } catch (err) {
      console.error('Erreur upload:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (media: MediaItem) => {
    if (confirm(`Supprimer l'image "${media.nom}" ?`)) {
      try {
        await deleteStorageImage(media);
        await loadMedias();
      } catch (err) {
        console.error('Erreur suppression média:', err);
      }
    }
  };

  const handleCopyUrl = (media: MediaItem) => {
    navigator.clipboard.writeText(media.url);
    setCopiedId(media.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Notice Technique Firebase Storage */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start space-x-3 text-xs">
        <HardDrive className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Espace Centralisé Firebase Storage</p>
          <p className="text-blue-800 mt-0.5">
            Les fichiers binaires d'images sont transférés et hébergés physiquement sur le bucket sécurisé <strong>Firebase Storage</strong>. Seules leurs URL de téléchargement HTTPS sécurisées sont stockées et manipulées dans la base de données Firestore.
          </p>
        </div>
      </div>

      {/* Zone d'upload */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-gold-50 text-brand-gold-600 flex items-center justify-center mx-auto border border-brand-gold-200">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Uploader une nouvelle image
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG, WebP jusqu'à 10 Mo. L'image sera immédiatement disponible pour vos projets et fiches produits.
            </p>
          </div>

          <label className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition shadow-md">
            <span>{isUploading ? 'Téléchargement en cours...' : 'Sélectionner un fichier'}</span>
            <input
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Grille des Médias */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            Images hébergées ({medias.length})
          </h3>
          <button
            onClick={loadMedias}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Actualiser
          </button>
        </div>

        {medias.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="text-sm">Aucune image dans la médiathèque pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {medias.map((media) => (
              <div
                key={media.id}
                className="group rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex flex-col justify-between hover:border-brand-gold-400 hover:shadow-md transition"
              >
                <div className="relative h-44 w-full bg-slate-900">
                  <Image
                    src={media.url}
                    alt={media.nom}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 truncate" title={media.nom}>
                      {media.nom}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {formatDateTime(media.date)}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <button
                      onClick={() => handleCopyUrl(media)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 text-xs font-medium flex items-center space-x-1 transition"
                      title="Copier l'URL sécurisée"
                    >
                      {copiedId === media.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-bold">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copier URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center space-x-1">
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-700"
                        title="Ouvrir dans un nouvel onglet"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(media)}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

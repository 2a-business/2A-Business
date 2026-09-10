'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaItem } from '@/types';
import { getMedias } from '@/lib/firebase/firestore';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { X, Upload, Check, Image as ImageIcon, Search } from 'lucide-react';

interface ImageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  currentImageUrl?: string;
}

export default function ImageSelectorModal({
  isOpen,
  onClose,
  onSelectImage,
  currentImageUrl,
}: ImageSelectorModalProps) {
  const [tab, setTab] = useState<'gallery' | 'upload'>('gallery');
  const [medias, setMedias] = useState<MediaItem[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>(currentImageUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadMedias();
      setSelectedUrl(currentImageUrl || '');
    }
  }, [isOpen, currentImageUrl]);

  async function loadMedias() {
    try {
      const list = await getMedias();
      setMedias(list);
    } catch (e) {
      console.error('Erreur chargement médiathèque:', e);
    }
  }

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const cloudinaryUrl = await uploadImageToCloudinary(file);
      await loadMedias();
      setSelectedUrl(cloudinaryUrl);
      setTab('gallery');
    } catch (err) {
      console.error('Erreur upload image Cloudinary:', err);
      alert("Erreur lors de l'envoi de l'image.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredMedias = medias.filter((m) =>
    m.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-brand-gold-400" />
            <h3 className="font-bold text-base">Sélectionner ou Uploader une Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3">
          <button
            onClick={() => setTab('gallery')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
              tab === 'gallery'
                ? 'border-brand-gold-500 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Médiathèque ({medias.length} images)
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`pb-3 px-4 text-xs font-bold border-b-2 transition ${
              tab === 'upload'
                ? 'border-brand-gold-500 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Uploader un nouveau fichier
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {tab === 'gallery' ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher une image..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredMedias.map((media) => {
                  const isSelected = selectedUrl === media.url;
                  return (
                    <div
                      key={media.id}
                      onClick={() => setSelectedUrl(media.url)}
                      className={`relative aspect-video sm:aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition ${
                        isSelected
                          ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/30'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <Image
                        src={media.url}
                        alt={media.nom}
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-brand-gold-500/30 flex items-center justify-center">
                          <div className="p-1 rounded-full bg-brand-gold-500 text-slate-950 shadow">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 p-1 bg-slate-950/70 text-[10px] text-white truncate px-1.5">
                        {media.nom}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 text-center p-6">
              <Upload className="w-10 h-10 text-brand-gold-600 mb-3" />
              <p className="text-sm font-bold text-slate-800">
                Glissez une image ou cliquez pour parcourir
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                JPG, PNG ou WebP. L'image sera stockée sur Cloudinary et ajoutée à la médiathèque.
              </p>
              <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm">
                <span>{isUploading ? 'Téléchargement en cours...' : 'Choisir un fichier'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 truncate max-w-sm">
            {selectedUrl ? 'Image sélectionnée' : 'Aucune image sélectionnée'}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedUrl}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 transition disabled:opacity-50"
            >
              Valider la sélection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

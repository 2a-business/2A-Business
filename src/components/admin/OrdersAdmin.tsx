'use client';

import React, { useState, useEffect } from 'react';
import { Commande, StatutCommande } from '@/types';
import { getCommandes, updateCommandeStatut } from '@/lib/firebase/firestore';
import { formatPrice, formatDateTime } from '@/lib/utils';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Phone,
  Mail,
  MapPin,
  X,
  MessageCircle,
  Filter,
} from 'lucide-react';

export default function OrdersAdmin() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);

  useEffect(() => {
    loadCommandes();
  }, []);

  async function loadCommandes() {
    try {
      const list = await getCommandes();
      setCommandes(list);
    } catch (e) {
      console.error('Erreur chargement commandes:', e);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id: string, newStatut: StatutCommande) => {
    try {
      await updateCommandeStatut(id, newStatut);
      setCommandes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, statut: newStatut } : c))
      );
      if (selectedCommande && selectedCommande.id === id) {
        setSelectedCommande({ ...selectedCommande, statut: newStatut });
      }
    } catch (err) {
      console.error('Erreur mise à jour statut:', err);
    }
  };

  const filteredCommandes = commandes.filter((c) => {
    if (statusFilter === 'all') return true;
    return c.statut === statusFilter;
  });

  const getStatusBadge = (statut: StatutCommande) => {
    switch (statut) {
      case 'Validé':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Annulé':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'En attente':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Gestion des Commandes Clients ({commandes.length})
          </h3>
          <p className="text-xs text-slate-500">
            Suivi des commandes en temps réel, mise à jour des statuts et coordonnées de livraison.
          </p>
        </div>

        {/* Filtre par statut */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-semibold">Filtrer par statut :</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white focus:ring-2 focus:ring-brand-gold-500 focus:outline-none"
          >
            <option value="all">Tous ({commandes.length})</option>
            <option value="En attente">
              En attente ({commandes.filter((c) => c.statut === 'En attente').length})
            </option>
            <option value="Validé">
              Validé ({commandes.filter((c) => c.statut === 'Validé').length})
            </option>
            <option value="Annulé">
              Annulé ({commandes.filter((c) => c.statut === 'Annulé').length})
            </option>
          </select>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Chargement des commandes...
          </div>
        ) : filteredCommandes.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            Aucune commande trouvée pour ce statut.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Réf & Date</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Articles</th>
                  <th className="py-3.5 px-4">Montant Total</th>
                  <th className="py-3.5 px-4">Statut Modifiable</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCommandes.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <p className="font-mono font-bold text-slate-900">{c.id}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {formatDateTime(c.date)}
                      </p>
                    </td>

                    {/* Informations Client */}
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">
                        {c.client.prenom} {c.client.nom}
                      </p>
                      <p className="text-[11px] text-slate-500">{c.client.telephone}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-xs">
                        📍 {c.client.adresse}
                      </p>
                    </td>

                    {/* Articles commandés */}
                    <td className="py-3 px-4">
                      {c.articles && c.articles.length > 0 ? (
                        <div>
                          <p className="font-semibold text-slate-800">
                            {c.articles.length} article(s)
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-xs">
                            {c.articles.map((a) => `${a.quantite}x ${a.nom}`).join(', ')}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Demande de devis</span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="py-3 px-4 font-black text-slate-950 text-sm">
                      {formatPrice(c.total)}
                    </td>

                    {/* Statut Modifiable ('En attente', 'Validé', 'Annulé') */}
                    <td className="py-3 px-4">
                      <select
                        value={c.statut}
                        onChange={(e) =>
                          handleStatusChange(c.id, e.target.value as StatutCommande)
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold-500 ${getStatusBadge(
                          c.statut
                        )}`}
                      >
                        <option value="En attente">En attente</option>
                        <option value="Validé">Validé</option>
                        <option value="Annulé">Annulé</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCommande(c)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Détails</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODALE DÉTAIL D'UNE COMMANDE */}
      {selectedCommande && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Commande N° {selectedCommande.id}
                </span>
                <h4 className="text-lg font-bold text-slate-900">
                  Détail de la Commande
                </h4>
              </div>
              <button
                onClick={() => setSelectedCommande(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Fiche Client
              </h5>
              <div className="text-sm space-y-1 text-slate-700">
                <p className="font-bold text-slate-900">
                  {selectedCommande.client.prenom} {selectedCommande.client.nom}
                </p>
                <p className="flex items-center space-x-2 text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedCommande.client.telephone}</span>
                </p>
                {selectedCommande.client.email && (
                  <p className="flex items-center space-x-2 text-xs text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedCommande.client.email}</span>
                  </p>
                )}
                <p className="flex items-center space-x-2 text-xs text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedCommande.client.adresse}</span>
                </p>
              </div>
            </div>

            {/* Articles */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Articles Commandés
              </h5>
              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                {selectedCommande.articles.map((item, i) => (
                  <div key={i} className="p-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{item.nom}</p>
                      <p className="text-[11px] text-slate-500">
                        {item.quantite} x {formatPrice(item.prix)}
                      </p>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">
                      {formatPrice(item.prix * item.quantite)}
                    </span>
                  </div>
                ))}
                <div className="p-4 bg-slate-50 flex justify-between items-center text-sm font-black text-slate-900">
                  <span>Total Commande</span>
                  <span className="text-brand-gold-600 text-base">
                    {formatPrice(selectedCommande.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Statut & Contact direct */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-600">Changer le statut :</span>
                <select
                  value={selectedCommande.statut}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedCommande.id,
                      e.target.value as StatutCommande
                    )
                  }
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                >
                  <option value="En attente">En attente</option>
                  <option value="Validé">Validé</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>

              <a
                href={`https://wa.me/${selectedCommande.client.telephone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Bonjour ${selectedCommande.client.prenom}, c'est 2A Business concernant votre commande ${selectedCommande.id}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Joindre le client sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

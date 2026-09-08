'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import { useCart } from '@/components/cart/CartContext';
import { createCommande } from '@/lib/firebase/firestore';
import { formatPrice, formatDate } from '@/lib/utils';
import { createCartWhatsAppLink, createGeneralWhatsAppLink } from '@/lib/whatsapp';
import { Commande } from '@/types';
import {
  ShoppingBag,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  FileText,
  Printer,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

function ContactCommandeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subjectParam = searchParams.get('subject') || '';

  const { items, totalPrice, clearCart, getCommandeArticles, updateQuantity, removeFromCart } =
    useCart();

  // Formulaire Client
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    adresse: '',
    email: '',
    message: subjectParam,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<Commande | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (subjectParam) {
      setFormData((prev) => ({ ...prev, message: subjectParam }));
    }
  }, [subjectParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.prenom || !formData.nom || !formData.telephone || !formData.adresse) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparer les articles commandés
      const commandeArticles = getCommandeArticles();

      // Si le panier est vide, il s'agit d'une simple demande de devis/contact
      const { commande } = await createCommande(
        {
          prenom: formData.prenom,
          nom: formData.nom,
          telephone: formData.telephone,
          adresse: formData.adresse,
          email: formData.email,
        },
        commandeArticles,
        totalPrice
      );

      // Succès : conserver le récapitulatif de commande généré
      setOrderSuccess(commande);
      // Vider le panier
      clearCart();
    } catch (err: any) {
      console.error('Erreur enregistrement commande:', err);
      setErrorMsg('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="pb-20">
      {/* En-tête obligatoire avec flèche de retour */}
      <PageHeader
        title="Contact & Commande"
        subtitle="Finalisez votre commande ou transmettez votre demande d'étude personnalisée à nos ingénieurs."
        badge="Service Client & Commandes"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* MODAL / ÉCRAN DE SUCCÈS RÉCAPITULATIF APRÈS 'ENVOYER LA COMMANDE' */}
        {orderSuccess ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl space-y-8 animate-in fade-in">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Commande Enregistrée avec Succès
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Merci pour votre confiance !
              </h2>
              <p className="text-slate-600 text-sm">
                Votre commande a bien été transmise à l'équipe 2A Business. Un conseiller technique va vous contacter pour organiser la livraison et l'installation.
              </p>
            </div>

            {/* Fiche Récapitulative Officielle */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Référence Commande</p>
                  <p className="text-lg font-black text-slate-900">{orderSuccess.id}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Date d'enregistrement</p>
                  <p className="text-sm font-semibold text-slate-700">{formatDate(orderSuccess.date)}</p>
                </div>
              </div>

              {/* Coordonnées Client */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Destinataire
                </h4>
                <div className="text-sm text-slate-800 space-y-1 bg-white p-4 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-900">
                    {orderSuccess.client.prenom} {orderSuccess.client.nom}
                  </p>
                  <p className="text-slate-600">📍 {orderSuccess.client.adresse}</p>
                  <p className="text-slate-600">📞 {orderSuccess.client.telephone}</p>
                  {orderSuccess.client.email && (
                    <p className="text-slate-600">✉️ {orderSuccess.client.email}</p>
                  )}
                </div>
              </div>

              {/* Articles Commandés */}
              {orderSuccess.articles && orderSuccess.articles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Détail des Articles
                  </h4>
                  <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                    {orderSuccess.articles.map((item, i) => (
                      <div key={i} className="p-3 flex justify-between items-center text-sm">
                        <div>
                          <p className="font-semibold text-slate-900">{item.nom}</p>
                          <p className="text-xs text-slate-500">
                            {item.quantite} x {formatPrice(item.prix)}
                          </p>
                        </div>
                        <span className="font-bold text-slate-900">
                          {formatPrice(item.prix * item.quantite)}
                        </span>
                      </div>
                    ))}
                    <div className="p-4 bg-slate-50 flex justify-between items-center text-base font-black text-slate-900">
                      <span>Total TTC</span>
                      <span className="text-brand-gold-600 text-lg">
                        {formatPrice(orderSuccess.total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Statut */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">Statut actuel du dossier :</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {orderSuccess.statut}
                </span>
              </div>
            </div>

            {/* Boutons d'action après commande */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 border border-slate-300"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer le reçu</span>
              </button>

              <a
                href={createCartWhatsAppLink(
                  orderSuccess.articles,
                  orderSuccess.total,
                  `${orderSuccess.client.prenom} ${orderSuccess.client.nom}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmer sur WhatsApp</span>
              </a>

              <Link
                href="/produits"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
              >
                <span>Retour au catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* VUE NORMALE : FORMULAIRE CLIENT + RÉCAPITULATIF DU PANIER */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Colonne Gauche : Récapitulatif du Panier & Coordonnées */}
            <div className="lg:col-span-5 space-y-8">
              {/* Carte Récapitulatif de la commande (si articles) */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-brand-gold-500 text-slate-950 rounded-xl">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Articles Sélectionnés</h3>
                      <p className="text-xs text-slate-500">
                        {items.length > 0
                          ? `${items.length} produit(s) dans votre panier`
                          : 'Aucun article dans le panier'}
                      </p>
                    </div>
                  </div>
                  {items.length > 0 && (
                    <Link
                      href="/produits"
                      className="text-xs font-semibold text-brand-gold-600 hover:underline"
                    >
                      Modifier
                    </Link>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-sm text-slate-500">
                      Vous n'avez pas encore sélectionné de produit particulier. Vous pouvez remplir ce formulaire pour une <strong>demande de devis général ou un renseignement</strong>.
                    </p>
                    <Link
                      href="/produits"
                      className="inline-block px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                    >
                      Parcourir les produits
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
                      {items.map(({ article, quantite }) => (
                        <div key={article.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="relative w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                            <Image
                              src={article.image_url}
                              alt={article.nom}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {article.nom}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {quantite} x {formatPrice(article.prix)}
                            </p>
                          </div>
                          <span className="text-xs font-black text-slate-900 flex-shrink-0">
                            {formatPrice(article.prix * quantite)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t border-slate-200 space-y-2">
                      <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
                        <span>Sous-total</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-base font-black text-slate-950 pt-2 border-t border-slate-100">
                        <span>Total de la commande</span>
                        <span className="text-brand-gold-600 text-lg">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bloc Coordonnées & Assistance */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Assistance & Siège 2A Business</span>
                </h4>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                    <span>Nord Foire en face terrain basket, Dakar, Sénégal</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="space-x-1.5 font-bold text-white">
                        <a href="tel:+221770620408" className="hover:text-brand-gold-400 transition">
                          +221 77 062 04 08
                        </a>
                        <span>/</span>
                        <a href="tel:+221773783368" className="hover:text-brand-gold-400 transition">
                          77 378 33 68
                        </a>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                        WhatsApp : 77 062 04 08
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                    <a
                      href="mailto:direction2a.business@gmail.com"
                      className="hover:text-white transition break-all"
                    >
                      direction2a.business@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                    <span>Lun - Sam : 08h00 - 18h30 (Support d'urgence 24/7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Formulaire Client Obligatoire */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold-600 bg-brand-gold-50 px-3 py-1 rounded-full">
                  Formulaire Client
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 pt-2">
                  Vos Coordonnées de Commande
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Veuillez renseigner vos coordonnées pour finaliser l'enregistrement de votre commande.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Prénom & Nom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Ex: Amadou"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ex: Ba"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Téléphone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Téléphone WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      required
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="Ex: +221 77 123 45 67"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ex: amadou.ba@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Adresse physique */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Adresse de livraison / Chantier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    required
                    value={formData.adresse}
                    onChange={handleChange}
                    placeholder="Ex: Quartier Mermoz, Dakar / Région de Thiès"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white"
                  />
                </div>

                {/* Message / Remarques */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Remarques particulières ou détails techniques
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Précisez ici vos attentes particulières, contraintes de toiture ou délais souhaités..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold-500 bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                {/* BOUTON 'ENVOYER LA COMMANDE' */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-xl shadow-slate-950/20 disabled:bg-slate-400"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-gold-400" />
                        <span>Envoyer la commande</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    En cliquant sur « Envoyer la commande », vos informations seront enregistrées dans notre système sécurisé.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContactCommandePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-brand-gold-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium text-sm">Chargement du formulaire de commande...</p>
        </div>
      }
    >
      <ContactCommandeContent />
    </Suspense>
  );
}

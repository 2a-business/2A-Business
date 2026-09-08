export type DisponibiliteProduit = 'En stock' | 'Corbeille' | 'Épuisé';

export type StatutCommande = 'En attente' | 'Validé' | 'Annulé';

export interface Client {
  id: string;
  prenom: string;
  nom: string;
  telephone: string;
  adresse: string;
  email: string;
  createdAt?: string;
}

export interface Article {
  id: string;
  nom: string;
  description: string;
  caracteristiques: string[];
  prix: number;
  disponibilite: DisponibiliteProduit;
  categorie: string;
  image_url: string;
  createdAt?: string;
}

export interface CommandeArticle {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
  image_url?: string;
}

export interface Commande {
  id: string;
  id_client?: string;
  client: {
    prenom: string;
    nom: string;
    telephone: string;
    adresse: string;
    email: string;
  };
  articles: CommandeArticle[];
  total: number;
  date: string;
  statut: StatutCommande;
}

export interface Realisation {
  id: string;
  nom: string;
  localisation: string;
  puissance_kwc: number;
  annee: number;
  description: string;
  image_url: string;
  createdAt?: string;
}

export interface MediaItem {
  id: string;
  nom: string;
  url: string;
  path?: string;
  date: string;
  size?: number;
}

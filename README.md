# 2A Business — Documentation Technique & Fonctionnelle

> **Énergie Renouvelable & Installations Électriques · Dakar, Sénégal**
> Nord Foire en face terrain basket · +221 77 062 04 08 / 77 378 33 68 · direction2a.business@gmail.com

---

## Table des Matières

1. [Présentation du Projet](#1-présentation-du-projet)
2. [Stack Technique & Architecture](#2-stack-technique--architecture)
3. [Structure des Pages & Fonctionnalités Utilisateur](#3-structure-des-pages--fonctionnalités-utilisateur)
4. [Espace Administrateur Sécurisé](#4-espace-administrateur-sécurisé)
5. [Guide d'Installation et de Démarrage](#5-guide-dinstallation-et-de-démarrage)
6. [Configuration Firebase (Optionnelle)](#6-configuration-firebase-optionnelle)
7. [Variables d'Environnement](#7-variables-denvironnement)
8. [Déploiement en Production](#8-déploiement-en-production)
9. [Identifiants & Accès](#9-identifiants--accès)
10. [Scripts NPM disponibles](#10-scripts-npm-disponibles)
11. [Interfaces TypeScript](#11-interfaces-typescript-typesindexts)

---

## 1. Présentation du Projet

**2A Business** est une application web full-stack moderne développée pour une entreprise sénégalaise spécialisée dans :

- ☀️ L'installation de panneaux solaires et systèmes photovoltaïques
- ⚡ Les installations électriques résidentielles et industrielles
- 🔋 La vente de matériel solaire (onduleurs, batteries, câbles, etc.)

### Objectifs de l'application

| Objectif | Description |
|---|---|
| **Vitrine professionnelle** | Présenter l'entreprise, ses services et ses réalisations avec un design moderne |
| **Catalogue e-commerce** | Permettre aux visiteurs de consulter les produits et de constituer un panier |
| **Commandes WhatsApp** | Valider les commandes directement via WhatsApp avec un récapitulatif automatique |
| **Administration sécurisée** | Gérer les produits, réalisations, commandes et médias depuis un tableau de bord privé |

### Informations entreprise

| Champ | Valeur |
|---|---|
| **Nom** | 2A Business |
| **Secteur** | Énergie renouvelable & installations électriques |
| **Pays** | Sénégal 🇸🇳 |
| **Adresse** | Nord Foire en face terrain basket, Dakar |
| **Téléphone 1** | +221 77 062 04 08 |
| **Téléphone 2** | +221 77 378 33 68 |
| **Email** | direction2a.business@gmail.com |
| **WhatsApp** | +221 77 062 04 08 |

---

## 2. Stack Technique & Architecture

### Technologies utilisées

| Couche | Technologie | Rôle |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | Framework React SSR/SSG |
| **UI** | React 18 + Tailwind CSS 3 | Composants et styles |
| **Icônes** | Lucide React | Bibliothèque d'icônes SVG |
| **Backend** | Firebase Firestore | Base de données NoSQL temps réel |
| **Stockage** | Firebase Storage | Upload et hébergement des images |
| **Auth** | Firebase Authentication | Connexion sécurisée admin |
| **Langage** | TypeScript | Typage statique sur tout le projet |

### Architecture des dossiers

```
2A-Business/
├── src/
│   ├── app/                          # Pages Next.js (App Router)
│   │   ├── layout.tsx                # Layout racine (Header, Footer, Panier, WhatsApp)
│   │   ├── globals.css               # Styles globaux Tailwind
│   │   ├── page.tsx                  # Page Accueil
│   │   ├── a-propos/page.tsx         # Page À propos
│   │   ├── services/page.tsx         # Page Nos Services
│   │   ├── realisations/
│   │   │   ├── page.tsx              # Galerie des réalisations
│   │   │   └── [id]/page.tsx         # Fiche détail d'une réalisation
│   │   ├── produits/page.tsx         # Catalogue produits + Panier
│   │   ├── contact/page.tsx          # Formulaire de contact/commande
│   │   ├── admin/
│   │   │   ├── login/page.tsx        # Page de connexion admin
│   │   │   └── page.tsx              # Tableau de bord admin
│   │   └── not-found.tsx             # Page 404 personnalisée
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Barre de navigation responsive
│   │   │   ├── Footer.tsx            # Pied de page avec coordonnées
│   │   │   ├── PageHeader.tsx        # En-tête universel avec flèche retour
│   │   │   └── WhatsAppButton.tsx    # Bouton flottant WhatsApp
│   │   ├── cart/
│   │   │   ├── CartContext.tsx       # Context React (état du panier)
│   │   │   └── CartDrawer.tsx        # Tiroir latéral du panier
│   │   └── admin/
│   │       ├── ProductsAdmin.tsx     # Gestion du catalogue
│   │       ├── RealisationsAdmin.tsx # Gestion des réalisations
│   │       ├── OrdersAdmin.tsx       # Suivi des commandes
│   │       ├── TrashAdmin.tsx        # Corbeille (restauration/suppression)
│   │       ├── MediaGallery.tsx      # Médiathèque d'images
│   │       └── ImageSelectorModal.tsx# Modale hybride upload/médiathèque
│   │
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts             # Initialisation Firebase + détection mode
│   │   │   ├── firestore.ts          # CRUD Firestore + fallback localStorage
│   │   │   ├── storage.ts            # Upload images + fallback base64
│   │   │   └── auth.ts               # Authentification + fallback démo
│   │   ├── seedData.ts               # Données de démo (produits, réalisations…)
│   │   ├── utils.ts                  # Helpers (formatPrice, formatDate, cn)
│   │   └── whatsapp.ts               # Génération de liens WhatsApp
│   │
│   └── types/
│       └── index.ts                  # Interfaces TypeScript globales
│
├── public/                           # Fichiers statiques (images, favicon)
├── .env.local                        # Variables d'environnement (non versionnées)
├── .env.example                      # Modèle des variables d'environnement
├── next.config.mjs                   # Configuration Next.js
├── tailwind.config.ts                # Configuration Tailwind CSS
├── tsconfig.json                     # Configuration TypeScript
└── package.json                      # Dépendances npm
```

### Mode résilient (sans Firebase)

L'application fonctionne **sans configuration Firebase** grâce à un système de fallback automatique :

- `isFirebaseConfigured` dans `config.ts` détecte si les clés Firebase sont présentes
- Si non configuré → toutes les données transitent par `localStorage` avec les données de démo de `seedData.ts`
- Les images uploadées sont converties en **base64** et stockées localement
- L'authentification admin fonctionne avec les identifiants de démo intégrés

---

## 3. Structure des Pages & Fonctionnalités Utilisateur

### Page 1 — Accueil (`/`)

- **Hero** avec phrase d'accroche, boutons CTA (Services, Réalisations)
- **Activités principales** : Solaire, Électricité, Vente Matériel
- **Statistiques** : projets réalisés, clients satisfaits, années d'expérience
- **Réalisations en vedette** : aperçu des derniers projets
- **Bouton WhatsApp flottant** vert animé (visible sur toutes les pages)

### Page 2 — À propos (`/a-propos`)

- Présentation approfondie de l'entreprise
- **Vision**, **Mission** et **Valeurs** (5 valeurs : Innovation, Qualité, Engagement, Respect, Durabilité)
- Chiffres clés de l'entreprise
- Flèche de retour en haut de page ← (règle universelle pour toutes les sous-pages)

### Page 3 — Nos Services (`/services`)

- Présentation de 4 offres détaillées :
  1. ☀️ Installation Solaire
  2. ⚡ Installations Électriques
  3. 🔋 Vente de Matériel
  4. 🛠️ Maintenance & SAV
- Bouton CTA vers la page Réalisations sur chaque carte

### Page 4 — Réalisations (`/realisations`)

- **Galerie dynamique** avec filtres par catégorie et barre de recherche
- Chargement depuis Firebase Firestore (ou localStorage en mode démo)

### Page 4b — Détail Réalisation (`/realisations/[id]`)

- Image du projet en plein écran en haut
- Métadonnées : puissance (kWc), localisation, année, type
- Description complète du projet

### Page 5 — Produits / Catalogue (`/produits`)

- **Catalogue filtrable** par catégorie avec barre de recherche
- Bouton **"Ajouter au panier"** sur chaque produit
- **Panier latéral** (CartDrawer) coulissant, persisté en `localStorage`
- **Barre fixe en bas** avec boutons "Commander via WhatsApp" et "Valider la commande"

### Page 6 — Contact & Commande (`/contact`)

- Formulaire de contact : nom, email, téléphone, message
- **Récapitulatif du panier** intégré dans le formulaire
- Enregistrement de la commande dans Firestore (ou localStorage)
- **Reçu visuel** après soumission avec numéro de commande

### Composant WhatsApp flottant

- Visible sur **toutes les pages**, coin inférieur droit
- Animation `ping` verte pour attirer l'attention
- Lien vers `wa.me/221770620408` avec message pré-rempli

---

## 4. Espace Administrateur Sécurisé

### Accès

| Champ | Valeur |
|---|---|
| **URL** | `/admin/login` |
| **Email** | `direction2a.business@gmail.com` |
| **Mot de passe** | `@itadione1993` |

> **Note :** La page de connexion dispose d'un bouton "Remplir automatiquement" pour faciliter la saisie.

### Tableau de bord (`/admin`) — 5 onglets

#### Onglet 1 — Réalisations

| Action | Description |
|---|---|
| **Créer** | Ajouter un projet avec titre, catégorie, localisation, année, kWc, images |
| **Modifier** | Éditer tous les champs d'un projet existant |
| **Supprimer** | Déplacer en corbeille (récupérable) |
| **Images** | Sélectionner depuis la médiathèque ou uploader une nouvelle image |

#### Onglet 2 — Catalogue (Produits)

| Action | Description |
|---|---|
| **Créer** | Ajouter un article avec nom, catégorie libre/prédéfinie, prix, description, caractéristiques, image |
| **Catégorie** | Champ hybride : choisir parmi les suggestions OU taper librement une catégorie personnalisée |
| **Modifier** | Éditer tous les champs d'un article |
| **Statut** | Basculer entre Disponible / Stock limité / Rupture de stock |
| **Supprimer** | Déplacer en corbeille |

#### Onglet 3 — Corbeille

- Affiche les articles et réalisations supprimés
- **Restaurer** en 1 clic
- **Supprimer définitivement** (sans récupération possible)

#### Onglet 4 — Commandes

- Liste de toutes les commandes reçues
- Détail : client, articles, montant total, date
- Modifier le **statut** de chaque commande : En attente → Confirmée → En cours → Livrée → Annulée
- **Bouton WhatsApp** pour contacter directement le client

#### Onglet 5 — Médiathèque

- Upload d'images vers Firebase Storage (ou base64 en mode démo)
- Affichage en galerie avec nom et date
- **Copier l'URL** en 1 clic
- **Supprimer** une image de la médiathèque

---

## 5. Guide d'Installation et de Démarrage

### Prérequis

- **Node.js** ≥ 18.x ([télécharger](https://nodejs.org))
- **npm** ≥ 9.x (inclus avec Node.js)
- Un terminal (Terminal macOS, PowerShell Windows, ou Bash Linux)

### Étape 1 — Accéder au dossier du projet

```bash
cd /chemin/vers/2A-Business
```

### Étape 2 — Installer les dépendances

```bash
npm install --legacy-peer-deps
```

### Étape 3 — Configurer les variables d'environnement (optionnel)

```bash
cp .env.example .env.local
# Éditer .env.local avec vos clés Firebase
```

> Sans Firebase, l'application démarre immédiatement en **mode démo** avec des données pré-remplies.

### Étape 4 — Démarrer en mode développement

```bash
npm run dev
```

L'application est accessible sur : **http://localhost:3000**

### Étape 5 — Builder pour la production

```bash
npm run build
npm start
```

---

## 6. Configuration Firebase (Optionnelle)

### Créer un projet Firebase

1. Aller sur [console.firebase.google.com](https://console.firebase.google.com)
2. Créer un nouveau projet (ex: `2a-business-app`)
3. Activer **Firestore Database** (mode production)
4. Activer **Firebase Storage**
5. Activer **Authentication** → Email/Mot de passe

### Créer l'utilisateur admin dans Firebase Auth

1. Firebase Console → Authentication → Users
2. Ajouter : Email `direction2a.business@gmail.com` / Mot de passe `@itadione1993`

### Remplir `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
NEXT_PUBLIC_WHATSAPP_NUMBER=221770620408
```

### Collections Firestore attendues

| Collection | Description |
|---|---|
| `articles` | Catalogue des produits |
| `realisations` | Galerie des projets réalisés |
| `commandes` | Suivi des commandes clients |
| `clients` | Enregistrement formulaire contact |
| `medias` | URLs d'images de la médiathèque |
| `trash` | Corbeille récupérable |

---

## 7. Variables d'Environnement

| Variable | Description | Requis |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Clé API Firebase | Non (mode démo sans) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Domaine d'authentification | Non |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Identifiant du projet Firebase | Non |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Bucket de stockage | Non |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ID expéditeur FCM | Non |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | ID application Firebase | Non |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp (sans +) | Non |

> Toutes les variables sont optionnelles. L'app bascule en mode démo (localStorage) si elles sont absentes.

---

## 8. Déploiement en Production

### Option A — Vercel (Recommandée)

```bash
npm install -g vercel
vercel
```

Puis ajouter les variables d'environnement dans le tableau de bord Vercel (Settings → Environment Variables).

### Option B — Serveur Linux (VPS)

```bash
npm install --legacy-peer-deps
npm run build
# Avec PM2 pour un processus persistant :
npm install -g pm2
pm2 start npm --name "2a-business" -- start
pm2 save && pm2 startup
```

### Option C — Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 9. Identifiants & Accès

> ⚠️ **Ces informations sont confidentielles. Ne pas partager publiquement.**

| Champ | Valeur |
|---|---|
| **URL Admin** | `http://votre-domaine.com/admin/login` |
| **Email admin** | `direction2a.business@gmail.com` |
| **Mot de passe** | `@itadione1993` |
| **WhatsApp (bouton)** | wa.me/221770620408 |
| **Téléphone principal** | +221 77 062 04 08 |
| **Téléphone secondaire** | +221 77 378 33 68 |

---

## 10. Scripts NPM disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarrer le serveur de développement (hot-reload) |
| `npm run build` | Compiler l'application pour la production |
| `npm start` | Démarrer le serveur de production (après build) |
| `npm run lint` | Vérifier le code avec ESLint |

---

## 11. Interfaces TypeScript (types/index.ts)

```typescript
interface Article {
  id: string;
  nom: string;
  description: string;
  prix: number;
  categorie: string;          // Libre ou prédéfinie
  imageUrl?: string;
  caracteristiques?: Record<string, string>;
  disponibilite: 'disponible' | 'stock_limite' | 'rupture';
  deleted?: boolean;
  createdAt?: Date;
}

interface Realisation {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  localisation: string;
  annee: number;
  puissanceKwc?: number;
  imageUrl?: string;
  deleted?: boolean;
  createdAt?: Date;
}

interface Commande {
  id: string;
  clientNom: string;
  clientEmail?: string;
  clientTelephone?: string;
  articles: CommandeArticle[];
  total: number;
  statut: StatutCommande;
  message?: string;
  createdAt?: Date;
}

type StatutCommande = 'en_attente' | 'confirmee' | 'en_cours' | 'livree' | 'annulee';
```

---

*Documentation générée pour le projet 2A Business — Version 1.0 — Dakar, Sénégal*

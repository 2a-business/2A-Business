# ☀️ GUIDE D'UTILISATION & MANUEL DU PROPRIÉTAIRE
## Entreprise 2A Business — Solutions Énergétiques & Électriques

Bienvenue dans le guide officiel de votre site web **2A Business**. Ce manuel pratique est conçu spécialement pour vous permettre de gérer votre site, votre catalogue de produits, vos réalisations et vos commandes clients en toute autonomie et simplicité, sans compétences techniques particulières.

---

## 📌 SOMMAIRE
1. [Vos Coordonnées & Paramètres Officiels](#1-vos-coordonnées--paramètres-officiels)
2. [Structure & Navigation du Site](#2-structure--navigation-du-site)
3. [Comment Accéder à votre Espace Administrateur](#3-comment-accéder-à-votre-espace-administrateur)
4. [Gestion du Catalogue Produits](#4-gestion-du-catalogue-produits)
5. [Le Système de Corbeille Produits](#5-le-système-de-corbeille-produits)
6. [Gestion de vos Réalisations (Chantiers & Projets)](#6-gestion-de-vos-réalisations-chantiers--projets)
7. [Gestionnaire de Médias & Photos (Firebase Storage)](#7-gestionnaire-de-médias--photos-firebase-storage)
8. [Suivi et Traitement des Commandes Clients](#8-suivi-et-traitement-des-commandes-clients)
9. [Fonctionnement des Canaux WhatsApp](#9-fonctionnement-des-canaux-whatsapp)
10. [Guide de Démarrage et Déploiement](#10-guide-de-démarrage-et-déploiement)

---

## 1. Vos Coordonnées & Paramètres Officiels

Les informations suivantes sont intégrées et visibles sur l'ensemble de votre site web (dans la barre supérieure, le menu mobile, le formulaire de contact et le pied de page) :

- **Nom de l'entreprise :** 2A Business
- **Spécialité :** Énergie Solaire Photovoltaïque & Installations Électriques
- **Siège / Adresse géographique :** Nord Foire en face terrain basket, Dakar, Sénégal
- **Téléphones officiels d'appel :** `+221 77 062 04 08` / `+221 77 378 33 68`
- **Numéro unique WhatsApp (Commandes & Bouton flottant) :** `+221 77 062 04 08`
- **Email officiel & Compte administrateur :** `direction2a.business@gmail.com`

---

## 2. Structure & Navigation du Site

Votre site est composé de **6 pages publiques principales** et d'un **espace d'administration sécurisé** :

1. **Page Accueil (`/`) :** Vitrine d'accroche avec vos 4 activités majeures, chiffres clés, présentation des compétences, bouton WhatsApp flottant et coordonnées complètes.
2. **Page À propos (`/a-propos`) :** Présentation approfondie de votre entreprise, vision d'avenir, mission et vos 5 valeurs fondamentales.
3. **Page Nos services (`/services`) :** Détail de vos expertises (Solaire photovoltaïque, Électricité industrielle, Audits énergétiques, Maintenance 24/7) avec boutons d'accès direct vers vos réalisations.
4. **Page Nos réalisations (`/realisations`) :** Galerie dynamique de vos chantiers. Chaque projet possède sa propre **fiche détaillée (`/realisations/[id]`)** mettant en valeur une photo plein écran tout en haut, la puissance en **kWc**, la localisation et la description technique.
5. **Page Nos produits (`/produits`) :** Catalogue interactif avec filtres par catégorie et par prix, fiches techniques et panier d'achat.
6. **Page Contact / Commande (`/contact`) :** Formulaire de devis et récapitulatif de commande avec validation directe et reçu imprimable.
7. **Règle de confort :** Sur toutes les pages du site (sauf l'accueil), un bouton **« ← Retour »** est situé en haut à gauche pour permettre à vos visiteurs de revenir en 1 clic à la page précédente.

---

## 3. Comment Accéder à votre Espace Administrateur

Votre tableau de bord administrateur vous permet de piloter l'ensemble de votre activité en direct.

### Étape 1 : Accéder à la page de connexion
Rendez-vous à l'adresse suivante :
👉 **[http://localhost:3000/admin/login](http://localhost:3000/admin/login)**  
*(ou cliquez sur le bouton discret **« Admin »** en haut à droite ou dans le pied de page du site).*

### Étape 2 : Vos identifiants de connexion
- **Email :** `direction2a.business@gmail.com`
- **Mot de passe :** `@itadione1993`

> 💡 **Astuce pratique :** Sur la page de connexion, un cadre jaune affiche le bouton **« Remplir »**. Cliquez dessus pour pré-remplir instantanément votre email et mot de passe sans avoir à les taper manuellement.

---

## 4. Gestion du Catalogue Produits

Dans l'onglet **« Catalogue Produits »** de votre espace administrateur, vous gérez vos panneaux solaires, onduleurs, batteries, régulateurs et accessoires.

### A. Ajouter un nouveau produit
1. Cliquez sur le bouton noir **« + Ajouter un produit »** en haut à droite.
2. Remplissez les champs :
   - **Nom du produit :** (Ex: *Panneau Solaire Monocristallin 600W Tier-1*)
   - **Catégorie :** Sélectionnez la catégorie correspondante.
   - **Prix (FCFA) :** Entrez le prix unitaire en FCFA.
   - **Disponibilité :** Cochez *« En stock »* ou *« Épuisé »*.
   - **Image Produit :** Cliquez sur *« Choisir une image »* pour soit uploader une nouvelle photo depuis votre ordinateur/téléphone, soit en choisir une déjà présente dans votre médiathèque.
   - **Description :** Court résumé des atouts du matériel.
   - **Caractéristiques techniques :** Tapez un point fort (ex: *Garantie 25 ans*) et cliquez sur *« Ajouter »*.
3. Cliquez sur **« Ajouter au catalogue »**. Le produit apparaît instantanément sur la boutique.

### B. Modifier le prix ou les détails d'un produit
- Cliquez sur l'icône de **crayon bleu** sur la ligne du produit pour mettre à jour son prix, son image ou son descriptif.

### C. Basculer un produit entre « En stock » et « Épuisé »
- Dans le tableau, cliquez simplement sur le badge de disponibilité :
  - Un badge vert **« En stock »** passe immédiatement en rouge **« Épuisé »** (et inversement) en un seul clic.

---

## 5. Le Système de Corbeille Produits

Pour éviter toute perte accidentelle de données, un système de corbeille sécurisé a été mis en place :

1. **Mettre un produit à la corbeille :**
   - Sur la liste des produits, cliquez sur l'icône de **corbeille**.
   - Le produit quitte immédiatement la boutique publique pour ne plus être visible par les clients, mais ses données restent sauvegardées.
2. **Restaurer un produit en 1 clic :**
   - Rendez-vous dans l'onglet **« Corbeille Produits »**.
   - Cliquez sur le bouton vert **« Restaurer »** situé à côté du produit. Il réintègre immédiatement votre catalogue en stock.
3. **Supprimer définitivement :**
   - Si vous souhaitez effacer totalement le produit de la base de données, cliquez sur l'icône rouge de suppression définitive dans la corbeille.

---

## 6. Gestion de vos Réalisations (Chantiers & Projets)

Vos chantiers sont votre meilleure carte de visite. Dans l'onglet **« Gestion Réalisations »** :

### A. Publier un nouveau chantier réalisé
1. Cliquez sur **« + Ajouter un projet »**.
2. Indiquez :
   - **Nom du projet :** (Ex: *Centrale Solaire Toiture Usine Agroalimentaire*)
   - **Localisation :** (Ex: *Zone Industrielle de Diamniadio, Sénégal*)
   - **Puissance en kWc :** (Ex: *120* pour 120 kWc — ce chiffre s'affiche en grand avec un badge doré).
   - **Année :** (Ex: *2024*).
   - **Image du Projet :** Choisissez une belle photo grand angle du chantier (haute résolution conseillée).
   - **Description détaillée :** Explications sur le matériel installé, le nombre de panneaux, le problème résolu et les économies d'énergie générées.
3. Validez. La fiche projet est automatiquement générée avec photo plein écran en haut.

---

## 7. Gestionnaire de Médias & Photos (Firebase Storage)

Dans l'onglet **« Médiathèque Storage »** :
- Vous disposez d'un espace centralisé pour stocker toutes vos images d'installations, armoires électriques et matériels.
- **Téléversement simple :** Cliquez sur *« Sélectionner un fichier »* pour ajouter une photo depuis votre appareil.
- **Sécurité et performance :** Les fichiers physiques sont conservés sur votre serveur de stockage sécurisé Cloud, et le site génère automatiquement des liens rapides et protégés.
- **Réutilisation :** Chaque photo téléversée peut être réutilisée pour plusieurs produits ou projets différents sans avoir à la renvoyer une deuxième fois.

---

## 8. Suivi et Traitement des Commandes Clients

Lorsqu'un client passe commande sur le site web, celle-ci s'enregistre automatiquement et apparaît dans l'onglet **« Gestion des Commandes »**.

### A. Consulter une commande
Pour chaque commande, vous visualisez :
- Le numéro de commande unique (ex: `CMD-2024-1234`) et la date.
- Le nom complet, le téléphone, l'adresse de livraison et l'email du client.
- La liste précise des articles commandés avec leurs quantités et le total en FCFA.

### B. Mettre à jour le statut en direct
Dans la colonne **Statut Modifiable**, un menu déroulant vous permet de sélectionner :
- 🟡 **En attente :** Commande tout juste reçue par le client, en attente de vérification.
- 🟢 **Validé :** Commande confirmée, paiement convenu ou matériel en cours d'expédition.
- 🔴 **Annulé :** Demande annulée ou abandonnée par le client.

### C. Contacter le client en 1 clic
En cliquant sur **« Détails »** d'une commande, un bouton vert **« Joindre le client sur WhatsApp »** vous ouvre instantanément une discussion WhatsApp avec le client avec un message d'accueil mentionnant son numéro de dossier.

---

## 9. Fonctionnement des Canaux WhatsApp

Le site est optimisé pour le marché sénégalais où WhatsApp est le canal de conversion numéro 1 :

1. **Le bouton flottant vert (en bas à droite de chaque page) :**
   - Reste toujours visible lors du défilement.
   - Au clic, il ouvre directement une conversation sur votre numéro officiel : **`+221 77 062 04 08`**.
2. **Le panier d'achat WhatsApp :**
   - Lorsqu'un client choisit des articles (panneaux, onduleur, etc.), il peut cliquer sur **« Commander via WhatsApp »**.
   - Le site génère automatiquement un message prêt à l'envoi contenant le nom des produits, les quantités et le montant total calculé.
3. **Fiche produit individuelle :**
   - Chaque produit dispose d'une petite icône WhatsApp pour permettre au client de demander une précision sur cet article en particulier.

---

## 10. Guide de Démarrage et Déploiement

### Lancement local pour travailler ou tester :
Ouvrez un terminal dans le dossier du projet et tapez :
```bash
npm run dev
```
Ouvrez ensuite votre navigateur sur : **`http://localhost:3000`**

### Compiler pour la mise en ligne :
```bash
npm run build
npm start
```

### Pour connecter votre propre compte Firebase de production :
Dans le fichier `.env.local`, renseignez vos identifiants Firebase fournis par Google Console :
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER=221770620408`

---

*Documentation rédigée pour la Direction de 2A Business — Tous droits réservés.*

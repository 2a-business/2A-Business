import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import {
  Article,
  Realisation,
  Commande,
  Client,
  MediaItem,
  StatutCommande,
  DisponibiliteProduit,
} from '@/types';
import {
  INITIAL_ARTICLES,
  INITIAL_REALISATIONS,
  INITIAL_COMMANDES,
  INITIAL_MEDIAS,
} from '../seedData';

// Clés LocalStorage pour persistance en mode démo / hors ligne
const STORAGE_KEYS = {
  ARTICLES: '2a_articles',
  REALISATIONS: '2a_realisations',
  COMMANDES: '2a_commandes',
  CLIENTS: '2a_clients',
  MEDIAS: '2a_medias',
};

function getLocalData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setLocalData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Erreur écriture LocalStorage', err);
  }
}

// ----------------------------------------------------
// ARTICLES (PRODUITS)
// ----------------------------------------------------
export async function getArticles(): Promise<Article[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
      }
    } catch (error) {
      console.warn('Firestore fallback vers données locales (articles):', error);
    }
  }
  return getLocalData<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
}

export async function saveArticle(article: Article): Promise<Article> {
  const item = {
    ...article,
    id: article.id || `prod-${Date.now()}`,
    createdAt: article.createdAt || new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'articles', item.id), item);
    } catch (err) {
      console.error('Erreur enregistrement article Firestore:', err);
    }
  }

  // Toujours maintenir la sauvegarde locale pour réactivité et fallback
  const items = getLocalData<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  const index = items.findIndex((a) => a.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.unshift(item);
  }
  setLocalData(STORAGE_KEYS.ARTICLES, items);
  return item;
}

export async function updateArticleStatus(
  id: string,
  disponibilite: DisponibiliteProduit
): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'articles', id), { disponibilite });
    } catch (err) {
      console.error('Erreur mise à jour statut article Firestore:', err);
    }
  }

  const items = getLocalData<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  const updated = items.map((a) => (a.id === id ? { ...a, disponibilite } : a));
  setLocalData(STORAGE_KEYS.ARTICLES, updated);
}

export async function deleteArticlePermanently(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (err) {
      console.error('Erreur suppression Firestore:', err);
    }
  }

  const items = getLocalData<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  const filtered = items.filter((a) => a.id !== id);
  setLocalData(STORAGE_KEYS.ARTICLES, filtered);
}

// ----------------------------------------------------
// RÉALISATIONS
// ----------------------------------------------------
export async function getRealisations(): Promise<Realisation[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'realisations'), orderBy('annee', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Realisation));
      }
    } catch (error) {
      console.warn('Firestore fallback vers données locales (realisations):', error);
    }
  }
  return getLocalData<Realisation[]>(STORAGE_KEYS.REALISATIONS, INITIAL_REALISATIONS);
}

export async function getRealisationById(id: string): Promise<Realisation | null> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'realisations', id));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Realisation;
      }
    } catch (error) {
      console.warn('Firestore fallback pour réalisation id:', error);
    }
  }
  const items = getLocalData<Realisation[]>(STORAGE_KEYS.REALISATIONS, INITIAL_REALISATIONS);
  return items.find((r) => r.id === id) || null;
}

export async function saveRealisation(realisation: Realisation): Promise<Realisation> {
  const item = {
    ...realisation,
    id: realisation.id || `real-${Date.now()}`,
    createdAt: realisation.createdAt || new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'realisations', item.id), item);
    } catch (err) {
      console.error('Erreur enregistrement réalisation Firestore:', err);
    }
  }

  const items = getLocalData<Realisation[]>(STORAGE_KEYS.REALISATIONS, INITIAL_REALISATIONS);
  const index = items.findIndex((r) => r.id === item.id);
  if (index >= 0) {
    items[index] = item;
  } else {
    items.unshift(item);
  }
  setLocalData(STORAGE_KEYS.REALISATIONS, items);
  return item;
}

export async function deleteRealisation(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'realisations', id));
    } catch (err) {
      console.error('Erreur suppression réalisation Firestore:', err);
    }
  }

  const items = getLocalData<Realisation[]>(STORAGE_KEYS.REALISATIONS, INITIAL_REALISATIONS);
  setLocalData(
    STORAGE_KEYS.REALISATIONS,
    items.filter((r) => r.id !== id)
  );
}

// ----------------------------------------------------
// COMMANDES ET CLIENTS
// ----------------------------------------------------
export async function createCommande(
  clientData: Omit<Client, 'id'>,
  articles: Commande['articles'],
  total: number
): Promise<{ commande: Commande; client: Client }> {
  const clientId = `cli-${Date.now()}`;
  const commandeId = `CMD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const client: Client = {
    id: clientId,
    ...clientData,
    createdAt: new Date().toISOString(),
  };

  const commande: Commande = {
    id: commandeId,
    id_client: clientId,
    client: {
      prenom: clientData.prenom,
      nom: clientData.nom,
      telephone: clientData.telephone,
      adresse: clientData.adresse,
      email: clientData.email,
    },
    articles,
    total,
    date: new Date().toISOString(),
    statut: 'En attente',
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'clients', clientId), client);
      await setDoc(doc(db, 'commandes', commandeId), commande);
    } catch (err) {
      console.error('Erreur sauvegarde commande Firestore:', err);
    }
  }

  // Sauvegarde locale
  const allCommandes = getLocalData<Commande[]>(STORAGE_KEYS.COMMANDES, INITIAL_COMMANDES);
  allCommandes.unshift(commande);
  setLocalData(STORAGE_KEYS.COMMANDES, allCommandes);

  const allClients = getLocalData<Client[]>(STORAGE_KEYS.CLIENTS, []);
  allClients.unshift(client);
  setLocalData(STORAGE_KEYS.CLIENTS, allClients);

  return { commande, client };
}

export async function getCommandes(): Promise<Commande[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'commandes'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Commande));
      }
    } catch (error) {
      console.warn('Firestore fallback vers commandes locales:', error);
    }
  }
  return getLocalData<Commande[]>(STORAGE_KEYS.COMMANDES, INITIAL_COMMANDES);
}

export async function updateCommandeStatut(id: string, statut: StatutCommande): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'commandes', id), { statut });
    } catch (err) {
      console.error('Erreur mise à jour statut commande Firestore:', err);
    }
  }

  const items = getLocalData<Commande[]>(STORAGE_KEYS.COMMANDES, INITIAL_COMMANDES);
  const updated = items.map((c) => (c.id === id ? { ...c, statut } : c));
  setLocalData(STORAGE_KEYS.COMMANDES, updated);
}

// ----------------------------------------------------
// MÉDIAS (MÉDIATHÈQUE ADMIN)
// ----------------------------------------------------
export async function getMedias(): Promise<MediaItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'medias'));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MediaItem));
      }
    } catch (error) {
      console.warn('Firestore fallback pour médias:', error);
    }
  }
  return getLocalData<MediaItem[]>(STORAGE_KEYS.MEDIAS, INITIAL_MEDIAS);
}

export async function saveMediaItem(media: MediaItem): Promise<MediaItem> {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'medias', media.id), media);
    } catch (err) {
      console.error('Erreur enregistrement média Firestore:', err);
    }
  }

  const items = getLocalData<MediaItem[]>(STORAGE_KEYS.MEDIAS, INITIAL_MEDIAS);
  items.unshift(media);
  setLocalData(STORAGE_KEYS.MEDIAS, items);
  return media;
}

export async function deleteMediaItem(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'medias', id));
    } catch (err) {
      console.error('Erreur suppression média Firestore:', err);
    }
  }

  const items = getLocalData<MediaItem[]>(STORAGE_KEYS.MEDIAS, INITIAL_MEDIAS);
  setLocalData(
    STORAGE_KEYS.MEDIAS,
    items.filter((m) => m.id !== id)
  );
}

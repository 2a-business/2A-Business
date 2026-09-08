import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

const LOCAL_ADMIN_KEY = '2a_admin_logged_in';

export interface AdminUser {
  email: string;
  isDemo?: boolean;
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  // Si Firebase Auth est configuré
  if (isFirebaseConfigured && auth) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_ADMIN_KEY, 'true');
      }
      return { email: cred.user.email || email };
    } catch (error: any) {
      // Si Firebase échoue car le compte n'est pas encore créé dans la console,
      // on permet l'accès démo si les identifiants correspondent
      if ((email === 'direction2a.business@gmail.com' || email === 'admin@2abusiness.sn') && password === '@itadione1993') {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_ADMIN_KEY, 'true');
        }
        return { email, isDemo: true };
      }
      throw error;
    }
  }

  // Mode Démo sans clés Firebase
  if ((email === 'direction2a.business@gmail.com' || email === 'admin@2abusiness.sn') && password === '@itadione1993') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_ADMIN_KEY, 'true');
    }
    return { email, isDemo: true };
  }

  // Permettre aussi une connexion avec n'importe quel email admin/mot de passe sécurisé en démo si spécifié
  if (password === '@itadione1993') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_ADMIN_KEY, 'true');
    }
    return { email, isDemo: true };
  }

  throw new Error('Identifiants incorrects. Utilisez direction2a.business@gmail.com et le mot de passe @itadione1993');
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Erreur déconnexion Firebase Auth:', err);
    }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  }
}

export function checkIsAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(LOCAL_ADMIN_KEY) === 'true';
}

export function subscribeToAuthChanges(callback: (user: AdminUser | null) => void) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser && firebaseUser.email) {
        callback({ email: firebaseUser.email });
      } else if (checkIsAdminLoggedIn()) {
        callback({ email: 'admin@2abusiness.sn', isDemo: true });
      } else {
        callback(null);
      }
    });
  }

  // Local check
  const logged = checkIsAdminLoggedIn();
  callback(logged ? { email: 'admin@2abusiness.sn', isDemo: true } : null);
  return () => {};
}

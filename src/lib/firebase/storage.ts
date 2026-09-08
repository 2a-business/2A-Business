import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './config';
import { MediaItem } from '@/types';
import { saveMediaItem, deleteMediaItem } from './firestore';

export async function uploadImage(file: File, folder: string = 'medias'): Promise<MediaItem> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `${folder}/${timestamp}_${safeName}`;

  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, filePath);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      const mediaItem: MediaItem = {
        id: `med-${timestamp}`,
        nom: file.name,
        url: downloadURL,
        path: filePath,
        date: new Date().toISOString(),
        size: file.size,
      };

      await saveMediaItem(mediaItem);
      return mediaItem;
    } catch (error) {
      console.warn('Erreur Firebase Storage, bascule en mode local démo:', error);
    }
  }

  // Mode Démo / Fallback : Conversion en Base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const mediaItem: MediaItem = {
        id: `med-${timestamp}`,
        nom: file.name,
        url: dataUrl,
        path: filePath,
        date: new Date().toISOString(),
        size: file.size,
      };
      await saveMediaItem(mediaItem);
      resolve(mediaItem);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function deleteStorageImage(media: MediaItem): Promise<void> {
  if (isFirebaseConfigured && storage && media.path) {
    try {
      const storageRef = ref(storage, media.path);
      await deleteObject(storageRef);
    } catch (err) {
      console.warn('Erreur suppression physique Firebase Storage:', err);
    }
  }
  await deleteMediaItem(media.id);
}

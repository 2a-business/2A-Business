import { CommandeArticle } from '@/types';
import { formatPrice } from './utils';

const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '221770620408';

export function getWhatsAppNumber(): string {
  return DEFAULT_WHATSAPP_NUMBER.replace(/\+/g, '').replace(/\s+/g, '');
}

export function createGeneralWhatsAppLink(customText?: string): string {
  const number = getWhatsAppNumber();
  const text = customText || 'Bonjour 2A Business, je souhaite avoir des informations sur vos solutions solaires et électriques.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createProductWhatsAppLink(productName: string, price: number): string {
  const number = getWhatsAppNumber();
  const text = `Bonjour 2A Business, je suis intéressé par l'article : "${productName}" au prix de ${formatPrice(price)}. Est-il actuellement disponible ?`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function createCartWhatsAppLink(articles: CommandeArticle[], total: number, clientName?: string): string {
  const number = getWhatsAppNumber();
  let message = `Bonjour 2A Business,\n`;
  if (clientName) {
    message += `Je m'appelle ${clientName} et je souhaite commander les articles suivants :\n\n`;
  } else {
    message += `Je souhaite commander les articles suivants depuis votre catalogue web :\n\n`;
  }

  articles.forEach((item, index) => {
    message += `${index + 1}. *${item.nom}*\n   Quantité : ${item.quantite} x ${formatPrice(item.prix)} = ${formatPrice(item.prix * item.quantite)}\n`;
  });

  message += `\n*Montant Total Estimé : ${formatPrice(total)}*\n\nMerci de m'indiquer la disponibilité et les modalités de livraison.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

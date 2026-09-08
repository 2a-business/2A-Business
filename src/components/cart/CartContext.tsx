'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article, CommandeArticle } from '@/types';

export interface CartItem {
  article: Article;
  quantite: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (article: Article, quantite?: number) => void;
  removeFromCart: (articleId: string) => void;
  updateQuantity: (articleId: string, quantite: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getCommandeArticles: () => CommandeArticle[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '2a_cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Erreur chargement panier:', e);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Erreur sauvegarde panier:', e);
      }
    }
  }, [items, mounted]);

  const addToCart = (article: Article, quantite: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.article.id === article.id);
      if (existing) {
        return prev.map((item) =>
          item.article.id === article.id
            ? { ...item, quantite: item.quantite + quantite }
            : item
        );
      }
      return [...prev, { article, quantite }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (articleId: string) => {
    setItems((prev) => prev.filter((item) => item.article.id !== articleId));
  };

  const updateQuantity = (articleId: string, quantite: number) => {
    if (quantite <= 0) {
      removeFromCart(articleId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.article.id === articleId ? { ...item, quantite } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantite, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.article.prix * item.quantite,
    0
  );

  const getCommandeArticles = (): CommandeArticle[] => {
    return items.map((item) => ({
      id: item.article.id,
      nom: item.article.nom,
      prix: item.article.prix,
      quantite: item.quantite,
      image_url: item.article.image_url,
    }));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        getCommandeArticles,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé au sein d\'un CartProvider');
  }
  return context;
}

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@prisma/client';

interface WishlistItem {
  id: number;
  sessionId: string;
  productId: number;
  product: Product;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  isLoading: boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem('elora_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('elora_session_id', sessionId);
  }
  return sessionId;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(`/api/wishlist?sessionId=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId: number) => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          productId,
        }),
      });

      if (response.ok) {
        await fetchWishlist();
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      const response = await fetch(`/api/wishlist/${productId}?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchWishlist();
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isInWishlist = (productId: number) => {
    return items.some(item => item.productId === productId);
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      isLoading,
      itemCount,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
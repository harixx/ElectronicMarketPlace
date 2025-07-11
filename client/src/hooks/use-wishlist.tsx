import { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { WishlistContextType, WishlistItemWithProduct } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function getSessionId(): string {
  let sessionId = localStorage.getItem('elora-session-id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('elora-session-id', sessionId);
  }
  return sessionId;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [sessionId] = useState(() => getSessionId());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<WishlistItemWithProduct[]>({
    queryKey: ["/api/wishlist"],
    queryFn: async () => {
      const response = await fetch(`/api/wishlist?sessionId=${sessionId}`);
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      return response.json();
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", "/api/wishlist", {
        productId,
        sessionId
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("DELETE", `/api/wishlist/${productId}?sessionId=${sessionId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const isInWishlist = (productId: number): boolean => {
    return items.some(item => item.productId === productId);
  };

  const contextValue: WishlistContextType = {
    items,
    addToWishlist: async (productId) => {
      if (!isInWishlist(productId)) {
        await addToWishlistMutation.mutateAsync(productId);
      }
    },
    removeFromWishlist: async (productId) => {
      await removeFromWishlistMutation.mutateAsync(productId);
    },
    isInWishlist,
    isLoading,
    itemCount: items.length,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

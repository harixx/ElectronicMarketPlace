import { Product, CartItem, WishlistItem, Review } from '@shared/schema';

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

export interface ProductFilters {
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CartContextType {
  items: CartItemWithProduct[];
  addToCart: (productId: number, size: string, color: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  itemCount: number;
  total: number;
}

export interface WishlistContextType {
  items: WishlistItemWithProduct[];
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  isLoading: boolean;
  itemCount: number;
}

export interface CheckoutFormData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  paymentMethod: 'cod' | 'bank-transfer' | 'jazzcash' | 'easypaisa';
}

export interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  paymentMethod: string;
  subtotal: string;
  shippingCost: string;
  total: string;
}

export interface OrderItemData {
  productId: number;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  price: string;
}

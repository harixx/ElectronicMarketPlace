'use client';

import { Product } from '@prisma/client';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const isWishlisted = isInWishlist(product.id);
  const price = product.salePrice || product.price;
  const originalPrice = product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, selectedColor);
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>

        {/* Sale Badge */}
        {hasDiscount && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 left-2"
          >
            Sale
          </Badge>
        )}

        {/* Low Stock Badge */}
        {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 left-2"
          >
            Only {product.stockQuantity} left
          </Badge>
        )}
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-charcoal hover:text-gold transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(parseFloat(product.averageRating.toString()))
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-charcoal">
              Rs. {parseFloat(price.toString()).toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {parseFloat(originalPrice.toString()).toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Size:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Color:</span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button 
          onClick={handleAddToCart}
          className="w-full mt-4 bg-gold hover:bg-gold/90 text-black"
          disabled={product.stockQuantity === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
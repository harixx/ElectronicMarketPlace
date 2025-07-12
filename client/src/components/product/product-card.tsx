import { useState } from "react";
import { Link } from "wouter";
import { Heart, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart, isLoading: cartLoading } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const currentPrice = parseFloat(product.salePrice || product.price);
  const originalPrice = parseFloat(product.price);
  const discount = product.salePrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, selectedSize, selectedColor, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  return (
    <div className={cn("bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden", className)}>
      <Link href={`/products/${product.id}`}>
        <a className="block">
          <div className="relative overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500 image-zoom"
            />
            
            {/* Quick Actions - Responsive */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col space-y-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0 bg-white shadow-md hover:bg-royal-gold hover:text-white"
                onClick={handleWishlistToggle}
              >
                <Heart className={cn("w-3 h-3 sm:w-4 sm:h-4", isInWishlist(product.id) && "fill-current text-red-500")} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0 bg-white shadow-md hover:bg-royal-gold hover:text-white"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
            
            {/* Badges - Responsive */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col space-y-1 sm:space-y-2">
              {discount > 0 && (
                <Badge className="bg-royal-gold text-white text-xs px-2 py-1">
                  {discount}% OFF
                </Badge>
              )}
              {product.featured && (
                <Badge variant="secondary" className="bg-royal-navy text-royal-cream text-xs px-2 py-1">
                  FEATURED
                </Badge>
              )}
            </div>
            
            {/* Stock Indicator */}
            {product.stockQuantity < 5 && product.stockQuantity > 0 && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="outline" className="bg-white/90 text-charcoal">
                  Only {product.stockQuantity} left
                </Badge>
              </div>
            )}
            {product.stockQuantity === 0 && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
          
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="mb-2 sm:mb-3">
              <h3 className="font-medium text-royal-navy mb-1 text-sm sm:text-base line-clamp-1">{product.name}</h3>
              <p className="text-xs sm:text-sm text-stone line-clamp-2">{product.description}</p>
            </div>
            
            {/* Rating - Responsive */}
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="flex text-royal-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3 sm:w-4 sm:h-4",
                      i < Math.floor(parseFloat(product.averageRating))
                        ? "fill-current"
                        : "stroke-current"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-stone ml-2">({product.reviewCount} reviews)</span>
            </div>
            
            {/* Price - Responsive */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-bold text-royal-navy">
                  Rs. {currentPrice.toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-xs sm:text-sm text-stone line-through">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            
            {/* Size Selection - Responsive */}
            <div className="mb-3 sm:mb-4">
              <p className="text-xs text-stone mb-2">Size:</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={cn(
                      "w-7 h-7 sm:w-8 sm:h-8 border rounded text-xs transition-colors",
                      selectedSize === size
                        ? "border-royal-gold bg-royal-gold text-white"
                        : "border-gray-300 hover:border-royal-gold"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection - Responsive */}
            {product.colors.length > 1 && (
              <div className="mb-3 sm:mb-4">
                <p className="text-xs text-stone mb-2">Color:</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {product.colors.slice(0, 3).map((color) => (
                    <button
                      key={color}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedColor(color);
                      }}
                      className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all",
                        selectedColor === color
                          ? "border-royal-gold scale-110"
                          : "border-gray-300"
                      )}
                      style={{
                        backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                       color.toLowerCase() === 'black' ? '#000000' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'cream' ? '#f7f3f0' :
                                       color.toLowerCase() === 'blush pink' ? '#e8b4b8' :
                                       color.toLowerCase() === 'sage green' ? '#a8b5a0' :
                                       '#e5e5e5'
                      }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <span className="text-xs text-stone self-center">+{product.colors.length - 3}</span>
                  )}
                </div>
              </div>
            )}
            
            {/* Add to Cart - Responsive */}
            <Button 
              className="w-full bg-royal-navy text-royal-cream hover:bg-royal-purple transition-colors text-sm sm:text-base py-2 sm:py-3"
              onClick={handleAddToCart}
              disabled={cartLoading || product.stockQuantity === 0}
            >
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </a>
      </Link>
    </div>
  );
}

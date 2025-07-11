import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Heart, Star, Truck, RotateCcw, Shield, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SizeGuide } from "@/components/product/size-guide";
import { ReviewSection } from "@/components/reviews/review-section";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";
import { cn } from "@/lib/utils";

function ProductDetailContent() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id) : 0;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading: cartLoading } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: productId > 0,
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: product?.category }],
    enabled: !!product?.category,
    select: (data) => data.filter(p => p.id !== productId).slice(0, 4),
  });

  // Initialize selected options when product loads
  useState(() => {
    if (product) {
      if (!selectedSize && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (!selectedColor && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart(product.id, selectedSize, selectedColor, quantity);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistToggle = async () => {
    if (!product) return;
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-96 bg-gray-200 rounded-2xl" />
                <div className="flex space-x-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Product not found</h2>
            <p className="text-stone mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/products">
                <a>Browse All Products</a>
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPrice = parseFloat(product.salePrice || product.price);
  const originalPrice = parseFloat(product.price);
  const discount = product.salePrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative overflow-hidden rounded-2xl bg-white cursor-zoom-in group">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-gold text-white">
                      {discount}% OFF
                    </Badge>
                  )}
                  {product.stockQuantity < 5 && product.stockQuantity > 0 && (
                    <Badge variant="outline" className="absolute top-4 right-4 bg-white/90">
                      Only {product.stockQuantity} left
                    </Badge>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === index
                      ? "border-gold"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-stone">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex text-gold mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(parseFloat(product.averageRating))
                          ? "fill-current"
                          : "stroke-current"
                      )}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-charcoal">
                  {product.averageRating}
                </span>
              </div>
              <span className="text-stone">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-charcoal">
                Rs. {currentPrice.toLocaleString()}
              </span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-stone line-through">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-sage text-white">
                    Save Rs. {(originalPrice - currentPrice).toLocaleString()}
                  </Badge>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-charcoal">Size:</label>
                <SizeGuide />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 border rounded-lg text-sm font-medium transition-all",
                      selectedSize === size
                        ? "border-gold bg-gold text-white"
                        : "border-gray-300 text-charcoal hover:border-gold"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium text-charcoal mb-3 block">Color:</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm transition-all",
                      selectedColor === color
                        ? "border-gold bg-gold/10"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{
                        backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                       color.toLowerCase() === 'black' ? '#000000' :
                                       color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color.toLowerCase() === 'cream' ? '#f7f3f0' :
                                       color.toLowerCase() === 'blush pink' ? '#e8b4b8' :
                                       color.toLowerCase() === 'sage green' ? '#a8b5a0' :
                                       '#e5e5e5'
                      }}
                    />
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-charcoal mb-3 block">Quantity:</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-stone">
                  {product.stockQuantity > 0 
                    ? `${product.stockQuantity} in stock`
                    : "Out of stock"
                  }
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-charcoal hover:bg-gray-800"
                onClick={handleAddToCart}
                disabled={cartLoading || product.stockQuantity === 0 || !selectedSize || !selectedColor}
              >
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWishlistToggle}
                className="sm:w-auto"
              >
                <Heart className={cn("w-5 h-5 mr-2", isInWishlist(product.id) && "fill-current text-red-500")} />
                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-stone">
                <Truck className="w-4 h-4" />
                <span>Free shipping over Rs. 3,000</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-stone">
                <RotateCcw className="w-4 h-4" />
                <span>14-day returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-stone">
                <Shield className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-charcoal mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Fabric</h4>
                  <p className="text-stone">{product.fabric}</p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Available Sizes</h4>
                  <p className="text-stone">{product.sizes.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Available Colors</h4>
                  <p className="text-stone">{product.colors.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Collection</h4>
                  <p className="text-stone capitalize">{product.collection.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-charcoal mb-4">Care Instructions</h3>
              <div className="prose prose-stone max-w-none">
                <p>{product.careInstructions}</p>
                <ul className="mt-4">
                  <li>Handle with care to maintain fabric quality</li>
                  <li>Store in a cool, dry place</li>
                  <li>Iron on low heat if needed</li>
                  <li>Avoid bleach and harsh chemicals</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-2xl p-8">
              <ReviewSection productId={product.id} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-playfair text-3xl font-bold text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function ProductDetail() {
  return (
    <CartProvider>
      <WishlistProvider>
        <ProductDetailContent />
      </WishlistProvider>
    </CartProvider>
  );
}

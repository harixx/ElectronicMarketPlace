import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const price = product.salePrice || product.price;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-charcoal mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(parseFloat(product.averageRating.toString()))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-stone">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-charcoal">
                Rs. {parseFloat(price.toString()).toLocaleString()}
              </span>
              {hasDiscount && (
                <div className="flex items-center gap-2">
                  <span className="text-xl text-gray-500 line-through">
                    Rs. {parseFloat(product.price.toString()).toLocaleString()}
                  </span>
                  <Badge variant="destructive">
                    {Math.round((1 - parseFloat(product.salePrice!.toString()) / parseFloat(product.price.toString())) * 100)}% OFF
                  </Badge>
                </div>
              )}
            </div>

            <p className="text-stone text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Fabric</h3>
                <p className="text-stone">{product.fabric}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Available Sizes</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="outline" className="px-3 py-1">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-2">Available Colors</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Badge key={color} variant="outline" className="px-3 py-1">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-gold hover:bg-gold/90 text-black">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gold" />
                <span className="text-sm text-stone">Free shipping over Rs. 3,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gold" />
                <span className="text-sm text-stone">Quality guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-gold" />
                <span className="text-sm text-stone">Easy returns</span>
              </div>
            </div>

            {product.careInstructions && (
              <div className="bg-white/50 p-4 rounded-lg">
                <h3 className="font-semibold text-charcoal mb-2">Care Instructions</h3>
                <p className="text-stone text-sm">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-2xl font-bold text-charcoal mb-8">
              Customer Reviews
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white/50 p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-charcoal">
                        {review.customerName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-stone">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {review.title && (
                    <h5 className="font-medium text-charcoal mb-2">
                      {review.title}
                    </h5>
                  )}
                  <p className="text-stone">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
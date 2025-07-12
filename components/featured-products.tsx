'use client';

import { useQuery } from '@tanstack/react-query';
import { Product } from '@prisma/client';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/products/featured');
      if (!response.ok) throw new Error('Failed to fetch featured products');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-charcoal mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-stone max-w-2xl mx-auto">
              Discover our most loved pieces, carefully selected for their exceptional quality and style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 aspect-[3/4] rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Featured Collection
          </h2>
          <p className="text-xl text-stone max-w-2xl mx-auto">
            Discover our most loved pieces, carefully selected for their exceptional quality and style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gold text-gold hover:bg-gold hover:text-white"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
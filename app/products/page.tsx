import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    collection?: string;
    search?: string;
  };
}

async function getProducts(searchParams: ProductsPageProps['searchParams']) {
  const where: any = {};

  if (searchParams.category && searchParams.category !== 'all') {
    where.category = searchParams.category;
  }

  if (searchParams.collection && searchParams.collection !== 'all') {
    where.collection = searchParams.collection;
  }

  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
      { fabric: { contains: searchParams.search, mode: 'insensitive' } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return products;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts(searchParams);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Our Products
          </h1>
          <p className="text-stone text-lg">
            Discover our premium collection of loungewear and nightwear
          </p>
        </div>

        <Suspense fallback={<div>Loading products...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Suspense>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
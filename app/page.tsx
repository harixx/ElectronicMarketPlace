import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { FeaturedProducts } from '@/components/featured-products';
import { CollectionShowcase } from '@/components/collection-showcase';
import { BestSellers } from '@/components/best-sellers';
import { SaleSection } from '@/components/sale-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CollectionShowcase />
        <BestSellers />
        <SaleSection />
      </main>
      <Footer />
    </div>
  );
}
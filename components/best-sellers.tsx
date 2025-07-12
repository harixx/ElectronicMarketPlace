import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BestSellers() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Pakistan's Most Loved Pieces
          </h2>
          <p className="text-stone">These bestsellers are flying off our shelves - grab yours before they're gone!</p>
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
              <div className="flex items-center">
                Shop All Bestsellers
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
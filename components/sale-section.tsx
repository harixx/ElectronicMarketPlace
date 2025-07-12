import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SaleSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gold via-cream to-blush">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-charcoal">
              End of Season Sale
            </h2>
            <p className="text-xl text-stone max-w-2xl mx-auto">
              Get up to 40% off on selected items. Limited time offer on premium loungewear pieces.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all">
                <div className="flex items-center">
                  Shop Now & Save
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
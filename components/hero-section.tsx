import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-cream via-blush to-cream flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gold rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-sage rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-blush rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-charcoal leading-tight">
              Luxury
              <span className="text-gold block">Loungewear</span>
              <span className="text-sage">Collection</span>
            </h1>
            <p className="text-xl sm:text-2xl text-stone max-w-3xl mx-auto leading-relaxed">
              Discover the perfect blend of luxury and comfort with our premium loungewear collection
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold/90 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all"
              >
                <div className="flex items-center">
                  Explore Collection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="text-center p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold text-lg text-charcoal mb-2">Premium Fabrics</h3>
              <p className="text-stone text-sm">100% pure silk, linen, and cotton from the finest mills</p>
            </div>
            <div className="text-center p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-semibold text-lg text-charcoal mb-2">Free Shipping</h3>
              <p className="text-stone text-sm">Complimentary delivery on orders over Rs. 3,000</p>
            </div>
            <div className="text-center p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-semibold text-lg text-charcoal mb-2">Handcrafted Quality</h3>
              <p className="text-stone text-sm">Meticulously crafted with attention to every detail</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
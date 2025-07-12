import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Shopping Cart
          </h1>
          <p className="text-stone text-lg">
            Review your selected items before checkout
          </p>
        </div>

        {/* Cart will be populated by client-side components */}
        <div className="text-center py-12">
          <p className="text-stone text-lg mb-6">Your cart is empty</p>
          <Link href="/products">
            <Button className="bg-gold hover:bg-gold/90 text-black">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
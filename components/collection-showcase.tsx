import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CollectionShowcase() {
  const collections = [
    {
      title: 'Silk Collection',
      description: 'Luxurious mulberry silk pieces for ultimate comfort',
      href: '/products?collection=silk-collection',
      className: 'bg-gradient-to-br from-blush via-cream to-sage',
    },
    {
      title: 'Linen Loungewear',
      description: 'Breathable European linen for relaxed elegance',
      href: '/products?collection=linen-collection',
      className: 'bg-gradient-to-br from-sage via-cream to-stone',
    },
    {
      title: 'Cotton Essentials',
      description: 'Premium cotton basics for everyday comfort',
      href: '/products?collection=cotton-essentials',
      className: 'bg-gradient-to-br from-stone via-cream to-blush',
    },
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-charcoal mb-4">
            Our Collections
          </h2>
          <p className="text-xl text-stone max-w-2xl mx-auto">
            Discover our curated collections, each crafted with premium materials and timeless design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className={`${collection.className} rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">
                {collection.title}
              </h3>
              <p className="text-stone mb-6">
                {collection.description}
              </p>
              <Link href={collection.href}>
                <Button variant="outline" className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white">
                  Shop Collection
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
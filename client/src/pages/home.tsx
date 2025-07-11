import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Truck, RotateCcw, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { Product } from "@shared/schema";

function HomeContent() {
  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const collections = [
    {
      name: "Silk Collection",
      description: "Premium mulberry silk",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=silk",
      price: "From Rs. 8,500"
    },
    {
      name: "Linen Loungewear",
      description: "Stone-washed comfort",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=linen",
      price: "From Rs. 6,200"
    },
    {
      name: "Cotton Essentials",
      description: "Everyday comfort",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      href: "/products?category=cotton",
      price: "From Rs. 4,800"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over Rs. 3,000 across Pakistan"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "14-day hassle-free return policy"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Multiple payment options available"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated customer support team"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
              Luxury Comfort<br />
              <span className="text-gold">Redefined</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto opacity-90">
              Discover our premium collection of silk pajamas, linen loungewear, and cotton essentials crafted for the modern woman
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full font-semibold">
                <Link href="/products?collection=new-arrivals">
                  <a>Shop New Collection</a>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-charcoal px-8 py-4 rounded-full font-semibold">
                <Link href="/products">
                  <a>View All Products</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Featured Collections
            </h2>
            <p className="text-stone text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections designed for ultimate comfort and elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link key={collection.name} href={collection.href}>
                <a className="group block">
                  <div className="relative overflow-hidden rounded-2xl h-96 mb-4">
                    <img 
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="font-playfair text-2xl font-bold mb-2">{collection.name}</h3>
                      <p className="text-sm opacity-90">{collection.description}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-gold font-semibold">{collection.price}</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-charcoal mb-2">Featured Products</h2>
              <p className="text-stone">Handpicked favorites loved by our customers</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">
                <a className="flex items-center">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-80 rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{feature.title}</h3>
                <p className="text-sm text-stone">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest updates on new collections, exclusive offers, and style tips
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <Button className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg font-semibold">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-4">
            By subscribing, you agree to our Privacy Policy and Terms of Service
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <WishlistProvider>
        <HomeContent />
      </WishlistProvider>
    </CartProvider>
  );
}

import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star, Truck, RotateCcw, Shield, Headphones, Heart, Users, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { CartProvider } from "@/hooks/use-cart";
import { WishlistProvider } from "@/hooks/use-wishlist";
import { Product } from "@shared/schema";
import heroImage from "@assets/image_1752307657036.png";
import pajamaSetImage from "@assets/image_1752307666934.png";
import silkLoungeImage from "@assets/image_1752307687983.png";
import cottonSetImage from "@assets/image_1752307696376.png";

function HomeContent() {
  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const collections = [
    {
      name: "Pajama Sets",
      caption: "Complete Comfort",
      image: pajamaSetImage,
      href: "/products?category=sets"
    },
    {
      name: "Silk Loungewear",
      caption: "Luxurious Elegance", 
      image: silkLoungeImage,
      href: "/products?category=silk"
    },
    {
      name: "Cotton Sets",
      caption: "Breathable Style",
      image: cottonSetImage,
      href: "/products?category=cotton"
    },
    {
      name: "Night Robes",
      caption: "Cozy Sophistication",
      image: heroImage,
      href: "/products?category=robes"
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
      {/* Hero Section - Fully Responsive with Royal Colors */}
      <section className="relative h-screen min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(88, 88, 150, 0.7), rgba(45, 55, 72, 0.6)), url(/attached_assets/image_1752309298739.png)`
          }}
        />
        
        {/* Floating badges for social proof */}
        <div className="absolute top-20 left-8 z-20 hidden lg:block">
          <Badge variant="secondary" className="bg-white/90 text-charcoal px-4 py-2 shadow-lg">
            <Star className="w-4 h-4 mr-2 text-gold fill-current" />
            4.9★ (2,847 reviews)
          </Badge>
        </div>
        
        <div className="absolute top-32 right-8 z-20 hidden lg:block">
          <Badge variant="secondary" className="bg-white/90 text-charcoal px-4 py-2 shadow-lg">
            <Users className="w-4 h-4 mr-2 text-sage" />
            15K+ Happy Customers
          </Badge>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full bg-[#4d0404]">
          <div className="text-center text-white max-w-5xl mx-auto px-4">
            {/* Limited time offer banner */}
            <div className="mb-6">
              <Badge className="bg-gold/20 border border-gold text-gold px-6 py-2 text-sm font-medium animate-pulse">
                <Clock className="w-4 h-4 mr-2" />
                Limited Time: Free Shipping on All Orders
              </Badge>
            </div>
            
            <h1 className="font-playfair text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Sleep in<br />
              <span className="text-gold relative">
                Luxurious Silk
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 absolute -top-4 -right-8 text-gold animate-pulse" />
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl mb-4 font-light max-w-3xl mx-auto opacity-95">
              Transform your nights with Pakistan's most loved premium sleepwear collection
            </p>
            
            <p className="text-base md:text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Join thousands of women who've discovered the perfect blend of comfort and elegance
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all">
                <Link href="/products">
                  <a className="flex items-center">
                    Explore Collection
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-charcoal px-8 py-4 rounded-full font-semibold text-lg transition-all bg-[#fdb51c]">
                <Link href="#collections">
                  <a>See What's Popular</a>
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Secure Checkout
              </div>
              <div className="flex items-center text-sm">
                <Truck className="w-4 h-4 mr-2" />
                Same Day Delivery
              </div>
              <div className="flex items-center text-sm">
                <Heart className="w-4 h-4 mr-2" />
                Loved by 15K+ Women
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Story Section - Build Emotional Connection */}
      <section className="py-20 bg-[#f2b335]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-sage/20 text-sage px-4 py-2 mb-6">
                Our Story
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
                Every Pakistani Woman Deserves to Feel
                <span className="text-gold"> Extraordinary</span>
              </h2>
              <p className="text-lg text-stone mb-6 leading-relaxed">
                Born from the belief that comfort shouldn't compromise elegance, ELORA creates 
                premium loungewear for the modern Pakistani woman who values quality, style, and sophistication.
              </p>
              <p className="text-base text-stone mb-8">
                From our first silk nightdress to becoming Pakistan's most trusted sleepwear brand, 
                we've made it our mission to help you end each day feeling beautiful and confident.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="font-bold text-2xl text-charcoal">15K+</div>
                  <div className="text-sm text-stone">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-charcoal">5 Years</div>
                  <div className="text-sm text-stone">Trusted Quality</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-charcoal">4.9★</div>
                  <div className="text-sm text-stone">Average Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={pajamaSetImage}
                  alt="ELORA Premium Quality Pajama Sets - Pakistani Loungewear"
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    filter: 'brightness(1.05) contrast(1.1) saturate(1.1)', // Enhanced visual appeal
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg max-w-xs">
                <div className="flex items-center mb-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-stone italic">
                  "The silk quality is incredible. I feel like royalty every night!"
                </p>
                <p className="text-xs text-stone mt-2">- Ayesha K., Karachi</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Collections - 4-tile grid */}
      <section id="collections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Discover Your Perfect Style
            </h2>
            <p className="text-stone text-lg max-w-2xl mx-auto">
              Each collection crafted with love for the Pakistani woman who values comfort and elegance
            </p>
          </div>

          {/* Fully Responsive Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collections.map((collection, index) => (
              <Link key={collection.name} href={collection.href}>
                <div className="group block cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-square mb-3 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <img
                      src={collection.image}
                      alt={`${collection.name} - ${collection.caption}`}
                      loading={index > 1 ? "lazy" : "eager"} // Lazy load images below the fold
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        filter: 'brightness(0.9) contrast(1.1)', // Enhanced image quality
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300" />
                    
                    {/* Modern floating label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                        <h3 className="font-playfair text-lg font-bold mb-1 text-white">
                          {collection.name}
                        </h3>
                        <p className="text-xs text-white/90 opacity-90">
                          {collection.caption}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Customer Love Stories */}
      <section className="py-20 bg-[#4d0404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-gold/20 text-gold px-4 py-2 mb-6">
              Customer Love
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-charcoal mb-4">
              What Our Customers Say
            </h2>
            <p className="text-stone text-lg max-w-2xl mx-auto">
              Real stories from real women who've experienced the ELORA difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Fatima Ahmad",
                location: "Lahore",
                rating: 5,
                text: "I ordered the silk nightdress and I'm absolutely in love! The quality is exceptional and it feels like sleeping in luxury every night.",
                verified: true
              },
              {
                name: "Zara Sheikh",
                location: "Islamabad", 
                rating: 5,
                text: "Finally found a brand that understands Pakistani women's needs. The sizing is perfect and the fabric is so soft and breathable.",
                verified: true
              },
              {
                name: "Maryam Khan",
                location: "Karachi",
                rating: 5,
                text: "Been ordering from ELORA for 2 years now. Consistent quality, beautiful designs, and the customer service is amazing!",
                verified: true
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-gold mr-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <p className="text-stone mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-sage">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-stone">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Bestsellers with Urgency */}
      <section className="py-16 bg-[#fdb51c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Badge className="bg-gold/20 text-gold px-4 py-2 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Trending Now
              </Badge>
              <h2 className="font-playfair text-4xl font-bold text-charcoal mb-2">
                Pakistan's Most Loved Pieces
              </h2>
              <p className="text-stone">These bestsellers are flying off our shelves - grab yours before they're gone!</p>
            </div>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
              <Link href="/products">
                <a className="flex items-center bg-[#4d0404]">
                  Shop All Bestsellers
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
      {/* Final Call to Action - Irresistible Offer */}
      <section className="py-20 bg-gradient-to-r from-sage to-sage/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4d0404]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#4d0404]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-gold/20 border border-gold text-gold px-6 py-3 mb-6 text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Limited Time Offer
              </Badge>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get Your First Order
                <span className="block text-gold">FREE SHIPPING</span>
              </h2>
              <p className="text-xl mb-6 opacity-95">
                Join 15,000+ Pakistani women who've made ELORA their sleepwear of choice
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
                <h3 className="font-semibold text-lg mb-4">What You Get:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Shield className="w-5 h-5 mr-3 text-gold" />
                    Premium silk & cotton materials
                  </li>
                  <li className="flex items-center">
                    <Truck className="w-5 h-5 mr-3 text-gold" />
                    Free shipping nationwide
                  </li>
                  <li className="flex items-center">
                    <RotateCcw className="w-5 h-5 mr-3 text-gold" />
                    14-day easy returns
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 mr-3 text-gold" />
                    Satisfaction guaranteed
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transform hover:scale-105 transition-all">
                  <Link href="/products">
                    <a className="flex items-center">
                      Shop Now & Save
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-sage px-6 py-4 rounded-full font-semibold transition-all">
                  <Link href="#collections">
                    <a>Browse Collections</a>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-8">
                <h3 className="font-playfair text-2xl font-bold mb-6">
                  Join Our VIP Club
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Get exclusive early access to new collections, special discounts, and styling tips
                </p>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Button className="w-full bg-gold hover:bg-gold/90 text-white px-8 py-4 rounded-lg font-semibold">
                    Join VIP Club - FREE
                  </Button>
                </div>
                
                <div className="mt-6 flex justify-center space-x-8 text-sm opacity-80">
                  <div className="text-center">
                    <div className="font-bold text-lg">20%</div>
                    <div>VIP Discount</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">Early</div>
                    <div>Access</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">Free</div>
                    <div>Styling Tips</div>
                  </div>
                </div>
                
                <p className="text-xs opacity-75 mt-4">
                  No spam, unsubscribe anytime. Privacy guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
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

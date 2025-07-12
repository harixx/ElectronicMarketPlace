import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, MessageCircle, Youtube, Linkedin, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-royal text-royal-cream relative overflow-hidden">
      {/* Elegant Background Pattern with Royal Touch */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-royal-gold rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-royal-gold rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-royal-gold rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-royal-gold/50 rounded-full"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#fdb51c]">
        {/* Premium Newsletter Section */}
        <div className="py-16 border-b border-royal-gold/30">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-playfair text-3xl font-bold mb-4 text-shadow-royal text-[#fffbf0]">Stay Connected</h3>
            <p className="text-royal-cream/90 mb-8 text-lg">Join 15,000+ Women who get exclusive access to new collections and special offers</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-royal-cream/20 border-royal-gold/30 text-royal-cream placeholder:text-royal-cream/60 focus:border-royal-gold focus:bg-royal-cream/30"
              />
              <Button className="hover:bg-gold px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-[#4d0404] text-[#f0f0f0]">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-royal-cream/70 mt-4">
              No spam, unsubscribe anytime. 20% off your first order!
            </p>
          </div>
        </div>

        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Royal Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="font-playfair text-3xl font-bold mb-4 text-shadow-royal text-[#fffbf0]">ELORA</h3>
              <p className="text-royal-cream/90 mb-6 leading-relaxed">
                Pakistan's most trusted premium loungewear brand. Crafting comfort and elegance for the modern woman since 2019.
              </p>
              
              {/* Premium Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center text-xs text-royal-cream/90">
                  <Shield className="w-4 h-4 mr-2 text-royal-gold" />
                  <span>Secure Shopping</span>
                </div>
                <div className="flex items-center text-xs text-royal-cream/90">
                  <Truck className="w-4 h-4 mr-2 text-royal-gold" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center text-xs text-royal-cream/90">
                  <RotateCcw className="w-4 h-4 mr-2 text-royal-gold" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center text-xs text-royal-cream/90">
                  <Heart className="w-4 h-4 mr-2 text-royal-gold" />
                  <span>15K+ Happy Customers</span>
                </div>
              </div>
              
              {/* Premium Social Links */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-royal-gold">Follow Our Journey</p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="text-royal-cream/80 hover:text-royal-gold hover:bg-royal-gold/10 p-2 rounded-lg transition-all duration-200 border border-royal-gold/20">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-royal-cream/80 hover:text-royal-gold hover:bg-royal-gold/10 p-2 rounded-lg transition-all duration-200 border border-royal-gold/20">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-royal-cream/80 hover:text-royal-gold hover:bg-royal-gold/10 p-2 rounded-lg transition-all duration-200 border border-royal-gold/20">
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-royal-cream/80 hover:text-royal-gold hover:bg-royal-gold/10 p-2 rounded-lg transition-all duration-200 border border-royal-gold/20">
                    <Youtube className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

          {/* Royal Shop Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-royal-gold">Shop Collections</h4>
            <ul className="space-y-3 text-royal-cream/90">
              <li>
                <Link href="/products?collection=new-arrivals">
                  <div className="hover:text-royal-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-royal-gold rounded-full mr-2"></span>
                    New Arrivals
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=silk">
                  <div className="hover:text-royal-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-royal-gold rounded-full mr-2"></span>
                    Silk Collection
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=sets">
                  <div className="hover:text-royal-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-royal-gold rounded-full mr-2"></span>
                    Pajama Sets
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=robes">
                  <div className="hover:text-royal-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-royal-gold rounded-full mr-2"></span>
                    Night Robes
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?collection=sale">
                  <div className="hover:text-royal-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-royal-gold rounded-full mr-2 animate-pulse"></span>
                    Sale Items 🔥
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Premium Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-royal-gold">Customer Care</h4>
            <ul className="space-y-3 text-royal-cream/90">
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors cursor-pointer">Size Guide & Measurements</a>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors cursor-pointer">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors cursor-pointer">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors cursor-pointer">Care Instructions</a>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors cursor-pointer">FAQ & Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors cursor-pointer">Track Your Order</a>
              </li>
            </ul>
          </div>

          {/* Premium Contact & Business Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-royal-gold">Get in Touch</h4>
            <div className="space-y-4 text-royal-cream/90">
              <div className="flex items-center group">
                <Phone className="w-4 h-4 mr-3 text-royal-gold group-hover:text-gold transition-colors" />
                <span>+92-311-555-0610</span>
              </div>
              <div className="flex items-center group">
                <MessageCircle className="w-4 h-4 mr-3 text-royal-gold group-hover:text-gold transition-colors" />
                <span>WhatsApp: +92-300-123-4567</span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-4 h-4 mr-3 text-royal-gold group-hover:text-gold transition-colors" />
                <span>hello@elora.com.pk</span>
              </div>
              <div className="flex items-start group">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-royal-gold group-hover:text-gold transition-colors" />
                <div>
                  <span>Main Store: DHA Phase 5</span><br />
                  <span className="text-sm opacity-75">Lahore, Punjab, Pakistan</span>
                </div>
              </div>
              <div className="flex items-center group">
                <Clock className="w-4 h-4 mr-3 text-royal-gold group-hover:text-gold transition-colors" />
                <span>Daily: 9:00 AM - 9:00 PM PKT</span>
              </div>
            </div>
          </div>
          </div>

          {/* Premium Bottom Section */}
          <div className="border-t border-royal-gold/30 pt-8">
            {/* Premium Payment Methods */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-6 text-royal-gold text-center text-shadow-soft">Secure Payment Options</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-center px-4 py-3 rounded-lg border border-royal-gold/20 hover:bg-royal-cream/20 transition-all bg-[#4d0404]">
                  <span className="text-royal-cream/90 text-sm">💳 Cash on Delivery</span>
                </div>
                <div className="flex items-center justify-center px-4 py-3 rounded-lg border border-royal-gold/20 hover:bg-royal-cream/20 transition-all bg-[#4d0404]">
                  <span className="text-royal-cream/90 text-sm">🏦 Bank Transfer</span>
                </div>
                <div className="flex items-center justify-center bg-royal-cream/10 px-4 py-3 rounded-lg border border-royal-gold/20 hover:bg-royal-cream/20 transition-all">
                  <span className="text-royal-cream/90 text-sm">📱 JazzCash</span>
                </div>
                <div className="flex items-center justify-center bg-royal-cream/10 px-4 py-3 rounded-lg border border-royal-gold/20 hover:bg-royal-cream/20 transition-all">
                  <span className="text-royal-cream/90 text-sm">💸 EasyPaisa</span>
                </div>
              </div>
            </div>

            {/* Enhanced Copyright and Legal */}
            <div className="border-t border-royal-gold/30 pt-8 flex flex-col md:flex-row justify-between items-center text-royal-cream/80">
              <div className="text-center md:text-left">
                <p className="text-royal-cream/90">&copy; {currentYear} ELORA. All rights reserved.</p>
                <p className="text-xs mt-1 text-royal-gold">Made with ❤️ for Pakistani women</p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                <a href="#" className="hover:text-royal-gold transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-royal-gold transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-royal-gold transition-colors">Shipping Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

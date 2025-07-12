import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, MessageCircle, Youtube, Linkedin, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-sage rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-blush rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-playfair text-3xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-8">
              Join 15,000+ Pakistani women who get exclusive access to new collections and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-gold"
              />
              <Button className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-lg font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              No spam, unsubscribe anytime. 20% off your first order!
            </p>
          </div>
        </div>

        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <h3 className="font-playfair text-3xl font-bold mb-4 text-gold">ELORA</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Pakistan's most trusted premium loungewear brand. Crafting comfort and elegance for the modern woman since 2019.
              </p>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center text-xs">
                  <Shield className="w-4 h-4 mr-2 text-sage" />
                  <span>Secure Shopping</span>
                </div>
                <div className="flex items-center text-xs">
                  <Truck className="w-4 h-4 mr-2 text-sage" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center text-xs">
                  <RotateCcw className="w-4 h-4 mr-2 text-sage" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center text-xs">
                  <Heart className="w-4 h-4 mr-2 text-sage" />
                  <span>15K+ Happy Customers</span>
                </div>
              </div>
              
              {/* Social Links - Enhanced */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-300">Follow Us</p>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold hover:bg-gold/10 p-2 rounded-lg transition-all duration-200">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold hover:bg-gold/10 p-2 rounded-lg transition-all duration-200">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold hover:bg-gold/10 p-2 rounded-lg transition-all duration-200">
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-gold hover:bg-gold/10 p-2 rounded-lg transition-all duration-200">
                    <Youtube className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Shop Collections</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/products?collection=new-arrivals">
                  <div className="hover:text-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    New Arrivals
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=silk">
                  <div className="hover:text-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-sage rounded-full mr-2"></span>
                    Silk Collection
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=sets">
                  <div className="hover:text-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-blush rounded-full mr-2"></span>
                    Pajama Sets
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=robes">
                  <div className="hover:text-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-stone rounded-full mr-2"></span>
                    Night Robes
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?collection=sale">
                  <div className="hover:text-gold transition-colors cursor-pointer flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse"></span>
                    Sale Items 🔥
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Customer Care</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-gold transition-colors cursor-pointer">Size Guide & Measurements</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors cursor-pointer">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors cursor-pointer">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors cursor-pointer">Care Instructions</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors cursor-pointer">FAQ & Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors cursor-pointer">Track Your Order</a>
              </li>
            </ul>
          </div>

          {/* Contact & Business Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Get in Touch</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center group">
                <Phone className="w-4 h-4 mr-3 text-sage group-hover:text-gold transition-colors" />
                <span>+92-311-555-0610</span>
              </div>
              <div className="flex items-center group">
                <MessageCircle className="w-4 h-4 mr-3 text-sage group-hover:text-gold transition-colors" />
                <span>WhatsApp: +92-300-123-4567</span>
              </div>
              <div className="flex items-center group">
                <Mail className="w-4 h-4 mr-3 text-sage group-hover:text-gold transition-colors" />
                <span>hello@elora.com.pk</span>
              </div>
              <div className="flex items-start group">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-sage group-hover:text-gold transition-colors" />
                <div>
                  <span>Main Store: DHA Phase 5</span><br />
                  <span className="text-sm opacity-75">Lahore, Punjab, Pakistan</span>
                </div>
              </div>
              <div className="flex items-center group">
                <Clock className="w-4 h-4 mr-3 text-sage group-hover:text-gold transition-colors" />
                <span>Daily: 9:00 AM - 9:00 PM PKT</span>
              </div>
            </div>
          </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            {/* Payment Methods */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-6 text-white text-center">Secure Payment Options</h4>
              <div className="flex justify-center items-center space-x-8 text-gray-300 text-sm">
                <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
                  <span>💳 Cash on Delivery</span>
                </div>
                <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
                  <span>🏦 Bank Transfer</span>
                </div>
                <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
                  <span>📱 JazzCash</span>
                </div>
                <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg">
                  <span>💸 EasyPaisa</span>
                </div>
              </div>
            </div>

            {/* Copyright and Legal */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
              <div className="text-center md:text-left">
                <p>&copy; {currentYear} ELORA. All rights reserved.</p>
                <p className="text-xs mt-1">Made with ❤️ for Pakistani women</p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gold transition-colors">Shipping Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
